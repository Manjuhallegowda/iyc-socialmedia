// worker/src/types.ts

// These types are a D1-compatible representation of the frontend types.
// Complex objects and arrays are stored as JSON strings.

export interface Protest {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface Leader {
  id: string;
  name: string;
  designation:
    | 'State SM Chair'
    | 'District SM Coordinator'
    | 'Assembly SM Coordinator';
  state: string;
  district?: string;
  block?: string;
  imageUrl: string;
  age: number;
  education: string;
  startYear: number;
  bio: string;
  email: string;
  phone: string;
  social: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  protests: Protest[];
  achievements: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  description: string;
  link?: string; // Added to match backend schema and frontend usage
  content?: string;
  imageUrl?: string;
  source?: string;
  author?: string;
}

export interface Activity {
  id: string;
  title: string;
  type: 'Campaign' | 'Workshop' | 'Protest';
  date: string;
  description: string;
  imageUrl: string;
  location?: string;
  fullDescription?: string;
  stats?: string; // JSON string
}

export interface VideoItem {
  id: string;
  title: string;
  videoId: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  thumbnailUrl?: string;
  alt?: string;
  tag?: string;
}

export interface ExecutiveLeader {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  description: string;
  socialMedia: string; // Stored as JSON string
}
