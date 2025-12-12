-- worker/schema.sql
-- D1 Database Schema for iyc-portfolio-db

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    hashedPassword TEXT NOT NULL,
    salt TEXT NOT NULL
);

-- Leaders Table
CREATE TABLE IF NOT EXISTS leaders (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    state TEXT NOT NULL,
    district TEXT,
    block TEXT,
    imageUrl TEXT NOT NULL,
    age INTEGER NOT NULL,
    education TEXT NOT NULL,
    startYear INTEGER NOT NULL,
    bio TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    social TEXT, -- Stored as JSON string
    protests TEXT, -- Stored as JSON string
    achievements TEXT -- Stored as JSON string
);

-- Executive Leaders Table
CREATE TABLE IF NOT EXISTS executive_leaders (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    bio TEXT NOT NULL,
    social TEXT -- Stored as JSON string
);

-- News Items Table
CREATE TABLE IF NOT EXISTS news (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    description TEXT NOT NULL,
    link TEXT, -- Added to match frontend interface
    content TEXT,
    imageUrl TEXT,
    source TEXT,
    author TEXT
);

-- Activities Table
CREATE TABLE IF NOT EXISTS activities (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    date TEXT NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    location TEXT,
    fullDescription TEXT,
    stats TEXT -- Stored as JSON string
);

-- Video Items Table
CREATE TABLE IF NOT EXISTS videos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    videoId TEXT UNIQUE NOT NULL,
    date TEXT NOT NULL
);

-- Gallery Items Table
CREATE TABLE IF NOT EXISTS gallery_items (
    id TEXT PRIMARY KEY,
    imageUrl TEXT NOT NULL,
    thumbnailUrl TEXT,
    alt TEXT,
    tag TEXT
);
