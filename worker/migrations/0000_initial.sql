CREATE TABLE IF NOT EXISTS kpycc_team (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    district TEXT NOT NULL,
    assembly TEXT,
    block TEXT,
    imageUrl TEXT NOT NULL,
    activity TEXT NOT NULL,
    startYear INTEGER NOT NULL,
    bio TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    social TEXT,
    mailstone TEXT,
    level TEXT
);

CREATE TABLE IF NOT EXISTS executive_leaders (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    description TEXT NOT NULL,
    socialMedia TEXT
);

CREATE TABLE IF NOT EXISTS news (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    description TEXT NOT NULL,
    link TEXT,
    content TEXT,
    imageUrl TEXT,
    source TEXT,
    author TEXT
);

CREATE TABLE IF NOT EXISTS activities (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    date TEXT NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    location TEXT,
    fullDescription TEXT,
    stats TEXT,
    leaderId TEXT
);

CREATE TABLE IF NOT EXISTS videos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    videoId TEXT NOT NULL,
    date TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS gallery_items (
    id TEXT PRIMARY KEY,
    imageUrl TEXT NOT NULL,
    thumbnailUrl TEXT,
    alt TEXT,
    tag TEXT
);

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    hashedPassword TEXT NOT NULL,
    passwordHash TEXT,
    hash TEXT,
    salt TEXT NOT NULL,
    hashVersion INTEGER DEFAULT 1,
    role TEXT DEFAULT 'user',
    created_at TEXT DEFAULT (datetime('now')),
    iterations INTEGER DEFAULT 1,
    algorithm TEXT DEFAULT 'sha256',
    keylen INTEGER DEFAULT 32,
    digest TEXT
);

CREATE TABLE IF NOT EXISTS state_leaders (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    state TEXT NOT NULL,
    bio TEXT,
    imageUrl TEXT,
    socialMedia TEXT,
    activity TEXT NOT NULL DEFAULT '',
    milestone TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS social_media_team (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    level TEXT NOT NULL,
    placeName TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    socialMedia TEXT,
    bio TEXT
);

CREATE TABLE IF NOT EXISTS legal_team (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    bio TEXT
);
