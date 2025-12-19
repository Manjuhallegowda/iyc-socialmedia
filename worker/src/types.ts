// worker/src/types.ts

// These types are a D1-compatible representation of the frontend types.
// Complex objects and arrays are stored as JSON strings.

export interface KpyccTeamMember {
  id: string;
  name: string;
  designation: string;
  district: string;
  assembly?: string;
  block?: string;
  imageUrl: string;
  activity: string;
  startYear: number;
  bio: string;
  email: string;
  phone: string;
  social: string; // Stored as JSON string
  mailstone: string; // Stored as JSON string
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
  type: string;
  date: string;
  description: string;
  imageUrl: string;
  location?: string;
  fullDescription?: string;
  stats?: string; // Stored as JSON string
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

export interface StateLeader {
  id: string;
  name: string;
  designation: string;
  state: string;
  bio: string;
  imageUrl: string;
  socialMedia: string; // Stored as JSON string
}

export interface SocialMediaTeamMember {
    id: string;
    name: string;
    position: string;
    level: 'District' | 'Assembly' | 'Block';
    placeName: string;
    imageUrl: string;
    socialMedia: string; // JSON string
    bio?: string;
}

export interface LegalTeamMember {
    id: string;
    name: string;
    position: string;
    imageUrl: string;
    bio?: string;
}
