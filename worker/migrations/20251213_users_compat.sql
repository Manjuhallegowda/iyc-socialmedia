-- worker/migrations/20251213_users_compat.sql
PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;

-- create a compatible users table
CREATE TABLE IF NOT EXISTS users_new (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  hashedPassword TEXT NOT NULL,
  passwordHash TEXT,        -- alternate name some code may expect
  hash TEXT,                -- alternate name some code may expect
  salt TEXT NOT NULL,
  hashVersion INTEGER DEFAULT 1,
  role TEXT DEFAULT 'user',
  created_at TEXT DEFAULT (datetime('now'))
);

-- copy existing rows, mapping hashedPassword to new fields too
INSERT INTO users_new (id, username, hashedPassword, passwordHash, hash, salt, hashVersion, role, created_at)
SELECT
  id,
  username,
  hashedPassword,
  hashedPassword,   -- populate passwordHash from existing hashedPassword
  hashedPassword,   -- populate hash from existing hashedPassword
  salt,
  1,
  'user',
  datetime('now')
FROM users;

-- replace old table
DROP TABLE users;
ALTER TABLE users_new RENAME TO users;

COMMIT;
PRAGMA foreign_keys = ON;