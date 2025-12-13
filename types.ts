export interface Protest {
  title: string;
  location: string;
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
  id: string; // Changed to string
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
  id: string; // Changed to string
  title: string;
  type: 'Campaign' | 'Workshop' | 'Protest';
  date: string;
  description: string;
  imageUrl: string;
  location?: string;
  fullDescription?: string;
  stats?: { label: string; value: string }[];
}

export interface VideoItem {
  id: string;
  title: string;
  videoId: string; // YouTube Video ID
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
  description?: string;
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

export interface User {
  id: string;
  username: string;
}
