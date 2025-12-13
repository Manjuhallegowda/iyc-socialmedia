// worker/src/index.ts
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { cors } from 'hono/cors';
import { jwt, sign } from 'hono/jwt';
import type { Context, Next } from 'hono';
import { Leader, NewsItem, Activity, VideoItem, GalleryItem, ExecutiveLeader } from './types';

// Define the environment bindings
export type Env = {
  DB: D1Database;
  BUCKET: R2Bucket;
  CORS_ALLOWED_ORIGIN: string;
  JWT_SECRET: string;
};

// Define the User type for authentication
interface User {
  id: string;
  username: string;
  hashedPassword: string;
  salt: string;
  // Optionally: hashVersion, iterations, algorithm — helpful for future migration
  hashVersion?: number;
  iterations?: number;
  algorithm?: string;
}

const app = new Hono<{ Bindings: Env }>();
const api = new Hono<{ Bindings: Env }>();

// --- MIDDLEWARE ---

// CORS middleware factory (uses env at runtime)
app.use('*', async (c, next) => {
  const corsMiddleware = cors({
    origin: c.env.CORS_ALLOWED_ORIGIN || '*',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
  });
  return await corsMiddleware(c, next);
});

// JWT middleware — creates per-request jwt middleware so it can read env
const jwtMiddleware = async (c: Context, next: Next) => {
  const secret = c.env.JWT_SECRET;
  if (!secret) {
    return c.json({ error: 'Server misconfiguration: JWT_SECRET missing' }, 500);
  }
  // create and run the Hono jwt middleware using the secret
  return await jwt({ secret })(c, next);
};



// --- HELPERS ---

const generateUUID = () => crypto.randomUUID();

/**
 * PBKDF2-based password hashing using WebCrypto.
 * Returns { hashHex, salt, iterations, version, algorithm }
 * - salt: base64 string
 * - hashHex: hex string of derived key
 */
const hashPassword = async (password: string, saltBase64: string, iterations = 150_000) => {
  const encoder = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const salt = Uint8Array.from(atob(saltBase64), (c) => c.charCodeAt(0));

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations,
      hash: 'SHA-256',
    },
    passwordKey,
    256 // 256 bits = 32 bytes
  );

  const hashArray = Array.from(new Uint8Array(derivedBits));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  return {
    hashHex,
    salt: saltBase64,
    iterations,
    version: 1,
    algorithm: 'PBKDF2-SHA256',
  };
};

const generateSaltBase64 = (len = 16) => {
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  // base64 encode
  let binary = '';
  for (let i = 0; i < arr.length; i++) binary += String.fromCharCode(arr[i]);
  return btoa(binary);
};

// --- AUTHENTICATION ---

const auth = new Hono<{ Bindings: Env }>();

auth.post('/login', async (c) => {
  try {
    const body = await c.req.json();
    const username = body?.username;
    const password = body?.password;

    if (!username || !password) {
      return c.json({ error: 'Username and password are required' }, 400);
    }

    // Check if any user exists
    const userCountRow = await c.env.DB.prepare('SELECT COUNT(*) AS count FROM users').first<{ count: number }>();
    const userCount = userCountRow ? Number(userCountRow.count) : 0;

    let user: User | null = null;

    // If no users exist, create the first user as admin
    if (userCount === 0) {
      console.log('No users found. Creating first admin user.');
      const id = generateUUID();
      const salt = generateSaltBase64();
      const hashed = await hashPassword(password, salt);
      const hashedPassword = hashed.hashHex;

      user = { id, username, hashedPassword, salt, hashVersion: hashed.version, iterations: hashed.iterations, algorithm: hashed.algorithm };

      await c.env.DB.prepare(
        'INSERT INTO users (id, username, hashedPassword, salt, hashVersion, iterations, algorithm) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).bind(id, username, hashedPassword, salt, hashed.version, hashed.iterations, hashed.algorithm).run();

      console.log('Admin user created successfully.');
    } else {
      // Normal authentication flow
      const fetched = await c.env.DB.prepare('SELECT * FROM users WHERE username = ?').bind(username).first<User>();
      if (!fetched) {
        return c.json({ error: 'Invalid credentials' }, 401);
      }
      user = fetched;

      // Verify the password
      const hashed = await hashPassword(password, user.salt, user.iterations || 150_000);
      if (hashed.hashHex !== user.hashedPassword) {
        return c.json({ error: 'Invalid credentials' }, 401);
      }
    }

    // Create JWT for the successfully authenticated or newly created user
    const payload = {
      sub: user.id,
      // expires in 24 hours
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    };

    const token = await sign(payload, c.env.JWT_SECRET);

    return c.json({ token });
  } catch (err: any) {
    console.error('Login error:', err);
    return c.json({ error: err.message || 'Login failed' }, 500);
  }
});

auth.post('/change-password', jwtMiddleware, async (c) => {
  try {
    const payload = c.get('jwtPayload') as any;
    if (!payload || typeof payload.sub !== 'string') {
      return c.json({ error: 'Invalid token payload' }, 401);
    }
    const userId = payload.sub;

    const { currentPassword, newPassword } = await c.req.json();

    if (!currentPassword || !newPassword) {
      return c.json({ error: 'Current password and new password are required' }, 400);
    }

    const user = await c.env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first<User>();
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    const currentHashed = await hashPassword(currentPassword, user.salt, user.iterations || 150_000);
    if (currentHashed.hashHex !== user.hashedPassword) {
      return c.json({ error: 'Incorrect current password' }, 403);
    }

    // Create new salt and hash new password
    const newSalt = generateSaltBase64();
    const newHashed = await hashPassword(newPassword, newSalt);

    await c.env.DB.prepare('UPDATE users SET hashedPassword = ?, salt = ?, hashVersion = ?, iterations = ?, algorithm = ? WHERE id = ?')
      .bind(newHashed.hashHex, newSalt, newHashed.version, newHashed.iterations, newHashed.algorithm, userId)
      .run();

    return c.json({ message: 'Password updated successfully' });
  } catch (err: any) {
    console.error('Change password error:', err);
    return c.json({ error: err.message || 'Failed to change password' }, 500);
  }
});

app.route('/auth', auth);

// --- USER MANAGEMENT (CRUD) ---

const users = new Hono<{ Bindings: Env }>();

// All user management routes require authentication
users.use('/*', jwtMiddleware);

// GET all users (id and username only)
users.get('/', async (c) => {
  try {
    const res = await c.env.DB.prepare('SELECT id, username FROM users').all();
    // D1 `.all()` usually returns results in `.results`
    // but the `.all()` return shape may vary by environment — guard for both.
    // If res.results exists, use it, otherwise fall back to res.
    const results = (res as any).results ?? res;
    return c.json(results);
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

// POST (create) a new user
users.post('/', async (c) => {
  try {
    const { username, password } = await c.req.json<{ username: string; password: string }>();

    if (!username || !password) {
      return c.json({ error: 'Username and password are required' }, 400);
    }

    // Check for duplicate username
    const existingUser = await c.env.DB.prepare('SELECT id FROM users WHERE username = ?').bind(username).first();
    if (existingUser) {
      return c.json({ error: 'Username already taken' }, 409);
    }

    const id = generateUUID();
    const salt = generateSaltBase64();
    const hashed = await hashPassword(password, salt);

    await c.env.DB.prepare(
      'INSERT INTO users (id, username, hashedPassword, salt, hashVersion, iterations, algorithm) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(id, username, hashed.hashHex, salt, hashed.version, hashed.iterations, hashed.algorithm).run();

    return c.json({ id, username }, 201);
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

// DELETE a user
users.delete('/:id', async (c) => {
  try {
    const userIdToDelete = c.req.param('id');
    const payload = c.get('jwtPayload') as any;
    const currentUserId = payload?.sub;

    if (userIdToDelete === currentUserId) {
      return c.json({ error: 'You cannot delete yourself.' }, 403);
    }

    const result = await c.env.DB.prepare('DELETE FROM users WHERE id = ?').bind(userIdToDelete).run();
    if (!result || result.meta?.changes === 0) {
      return c.json({ error: 'User not found' }, 404);
    }

    return new Response(null, { status: 204 });
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

// Mount the user management router under the main API
api.route('/users', users);

// Generic error response helper
const errorResponse = (message: string, status: number = 500) => {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
};

// --- GENERIC CRUD FACTORY ---

type TableName = 'leaders' | 'news' | 'activities' | 'videos' | 'gallery_items' | 'executive_leaders';

interface CrudOptions<T> {
  beforeSave?: (item: T | Omit<T, 'id'>) => any;
  afterFetch?: (item: any) => T;
}

const createCrudEndpoints = <T extends { id: string }>(
  router: Hono<{ Bindings: Env }>,
  tableName: TableName,
  options: CrudOptions<T> = {}
) => {
  const basePath = `/${tableName}`;

  const transformAfterFetch = (item: any): T => {
    return options.afterFetch ? options.afterFetch(item) : item;
  };

  const transformBeforeSave = (item: any): any => {
    return options.beforeSave ? options.beforeSave(item) : item;
  };

  // GET all items
  router.get(basePath, async (c) => {
    try {
      const res = await c.env.DB.prepare(`SELECT * FROM ${tableName}`).all<any>();
      const rows = (res as any).results ?? res;
      const transformedResults = (rows || []).map(transformAfterFetch);
      return c.json(transformedResults);
    } catch (e: any) {
      console.error(`Error in GET ${basePath}:`, e);
      return c.json({ error: e.message, stack: e.stack }, 500);
    }
  });

  // GET item by ID
  router.get(`${basePath}/:id`, async (c) => {
    const id = c.req.param('id');
    try {
      const item = await c.env.DB.prepare(`SELECT * FROM ${tableName} WHERE id = ?`).bind(id).first<any>();
      if (!item) return c.json({ error: 'Not Found' }, 404);
      return c.json(transformAfterFetch(item));
    } catch (e: any) {
      return c.json({ error: e.message }, 500);
    }
  });

  // POST (create) a new item
  router.post(basePath, jwtMiddleware, async (c) => {
    try {
      const body = await c.req.json<Omit<T, 'id'>>();
      const transformedBody = transformBeforeSave(body);
      const newItem = { ...transformedBody, id: generateUUID() };

      // Filter out undefined keys and build columns/values safely
      const keys = Object.keys(newItem).filter((k) => typeof (newItem as any)[k] !== 'undefined');
      const placeholders = keys.map(() => '?').join(', ');
      const values = keys.map((k) => (newItem as any)[k]);

      const fields = keys.join(', ');
      await c.env.DB.prepare(`INSERT INTO ${tableName} (${fields}) VALUES (${placeholders})`).bind(...values).run();
      return c.json(transformAfterFetch(newItem), 201);
    } catch (e: any) {
      return c.json({ error: e.message }, 500);
    }
  });

  // PUT (update) an item by ID
  router.put(`${basePath}/:id`, jwtMiddleware, async (c) => {
    const id = c.req.param('id');
    try {
      const body = await c.req.json<T>();
      if (id !== body.id) {
        return c.json({ error: 'ID in URL and body do not match' }, 400);
      }

      const transformedBody = transformBeforeSave(body);

      // Build update set while filtering undefined and not updating id column
      const entries = Object.entries(transformedBody).filter(([k, v]) => k !== 'id' && typeof v !== 'undefined');
      if (entries.length === 0) {
        return c.json({ error: 'No updatable fields provided' }, 400);
      }

      const fields = entries.map(([k]) => `${k} = ?`).join(', ');
      const values = entries.map(([, v]) => v);

      const stmnt = await c.env.DB.prepare(`UPDATE ${tableName} SET ${fields} WHERE id = ?`).bind(...values, id).run();

      if (!stmnt || stmnt.meta?.changes === 0) {
        return c.json({ error: 'Not Found' }, 404);
      }
      return c.json(transformAfterFetch(transformedBody));
    } catch (e: any) {
      return c.json({ error: e.message }, 500);
    }
  });

  // DELETE an item by ID
  router.delete(`${basePath}/:id`, jwtMiddleware, async (c) => {
    const id = c.req.param('id');
    try {
      const stmnt = await c.env.DB.prepare(`DELETE FROM ${tableName} WHERE id = ?`).bind(id).run();
      if (!stmnt || stmnt.meta?.changes === 0) {
        return c.json({ error: 'Not Found' }, 404);
      }
      return new Response(null, { status: 204 });
    } catch (e: any) {
      return c.json({ error: e.message }, 500);
    }
  });
};

// --- DATA TRANSFORMATIONS ---

const leaderTransforms: CrudOptions<Leader> = {
  beforeSave: (leader) => ({
    ...leader,
    social: JSON.stringify((leader as any).social || {}),
    protests: JSON.stringify((leader as any).protests || []),
    achievements: JSON.stringify((leader as any).achievements || []),
  }),
  afterFetch: (leader: any) => ({
    ...leader,
    social: JSON.parse(leader.social || '{}'),
    protests: JSON.parse(leader.protests || '[]'),
    achievements: JSON.parse(leader.achievements || '[]'),
  }),
};

const activityTransforms: CrudOptions<Activity> = {
  beforeSave: (activity) => ({
    ...activity,
    stats: JSON.stringify((activity as any).stats || []),
  }),
  afterFetch: (activity: any) => ({
    ...activity,
    stats: JSON.parse(activity.stats || '[]'),
  }),
};

const executiveLeaderTransforms: CrudOptions<ExecutiveLeader> = {
  beforeSave: (executiveLeader) => ({
    ...executiveLeader,
    socialMedia: JSON.stringify((executiveLeader as any).socialMedia || {}),
  }),
  afterFetch: (executiveLeader: any) => ({
    ...executiveLeader,
    socialMedia: JSON.parse(executiveLeader.socialMedia || '{}'),
  }),
};

// --- REGISTER ALL ENDPOINTS ---

createCrudEndpoints<Leader>(api, 'leaders', leaderTransforms);
createCrudEndpoints<NewsItem>(api, 'news');
createCrudEndpoints<Activity>(api, 'activities', activityTransforms);
createCrudEndpoints<VideoItem>(api, 'videos');
createCrudEndpoints<GalleryItem>(api, 'gallery_items');
createCrudEndpoints<ExecutiveLeader>(api, 'executive_leaders', executiveLeaderTransforms);

// --- R2 DIRECT UPLOAD ENDPOINT ---
// For local development, you must have your R2 bucket configured correctly.
// Run `npx wrangler dev --r2 <BUCKET_NAME>` and ensure you have credentials.
// See Cloudflare R2 documentation for local development setup.
api.post('/upload', jwtMiddleware, async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return c.json({ error: 'File not provided' }, 400);
    }

    const safeFilename = file.name.replace(/[^a-zA-Z0-9_.-]/g, '') || 'file';
    // store the file name as <uuid>-<safeFilename> inside images/
    const storedFilename = `${generateUUID()}-${safeFilename}`;
    const key = `images/${storedFilename}`;

    await c.env.BUCKET.put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type || 'application/octet-stream' },
    });

    // Return a path clients can use with the worker image-serving route
    const publicUrl = `/images/${encodeURIComponent(storedFilename)}`;
    return c.json({ publicUrl });
  } catch (e: any) {
    console.error('Upload error:', e);
    return c.json({ error: e.message || 'Failed to upload file' }, 500);
  }
});

// --- R2 IMAGE SERVING (PUBLIC) ---
// This route serves images directly from the R2 bucket without JWT authentication.
app.get('/images/:filename', async (c) => {
  try {
    const filename = c.req.param('filename');
    if (!filename) return c.json({ error: 'Filename required' }, 400);

    const object = await c.env.BUCKET.get(`images/${filename}`);
    if (!object) {
      return c.json({ error: 'Image not found' }, 404);
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    if (object.httpEtag) headers.set('etag', object.httpEtag);

    return new Response(object.body, {
      headers,
    });
  } catch (e: any) {
    console.error('Error serving image:', e);
    return c.json({ error: e.message || 'Failed to serve image' }, 500);
  }
});

// Mount the protected API router under / to avoid clobbering root routes
app.route('/', api);

// --- HEALTH CHECK & DEFAULT ROUTE ---
app.get('/', (c) => c.text('IYC Portfolio API is running!'));

app.onError((err, c) => {
  console.error(`${err}`);
  if (err instanceof HTTPException) {
    // Use the status from the HTTP exception, but return a JSON response
    return c.json({ error: err.message }, err.status);
  }
  // For all other errors, it's a true 500
  return c.json({ error: 'Internal Server Error' }, 500);
});

export default app;
