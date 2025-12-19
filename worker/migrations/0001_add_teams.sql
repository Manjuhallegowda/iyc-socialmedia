-- Add Social Media Team Table
CREATE TABLE IF NOT EXISTS social_media_team (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    level TEXT NOT NULL,
    placeName TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    socialMedia TEXT, -- Stored as JSON string
    bio TEXT
);

-- Add Legal Team Table
CREATE TABLE IF NOT EXISTS legal_team (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    bio TEXT
);
