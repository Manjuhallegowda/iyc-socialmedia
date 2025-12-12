-- worker/migrations/20251213_add_password_fields.sql
PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;

-- add missing password-related columns (safe; SQLite allows ADD COLUMN)
ALTER TABLE users ADD COLUMN iterations INTEGER DEFAULT 1;
ALTER TABLE users ADD COLUMN algorithm TEXT DEFAULT 'sha256';
ALTER TABLE users ADD COLUMN keylen INTEGER DEFAULT 32;
ALTER TABLE users ADD COLUMN digest TEXT;

COMMIT;
PRAGMA foreign_keys = ON;
