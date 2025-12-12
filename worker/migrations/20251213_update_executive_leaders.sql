-- Migration to align executive_leaders table with frontend model
ALTER TABLE executive_leaders RENAME COLUMN bio TO description;
ALTER TABLE executive_leaders RENAME COLUMN social TO socialMedia;
