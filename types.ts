export interface Protest {
  title: string;
  location: string;
  date: string;
  description: string;
}

export interface Leader {
  id:string;
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

export interface StateLeader {
  id: string;
  name: string;
  designation: string;
  state: string;
  bio: string;
  imageUrl: string;
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

export type Activity = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type: string;
  date: string;
  location: string;
  fullDescription?: string;
  stats?: { value: string; label: string }[];
};

export interface SocialMediaTeamMember {
  id: string;
  name: string;
  position: string;
  level: 'District' | 'Assembly' | 'Block';
  placeName: string;
  imageUrl: string;
  socialMedia: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
  };
  bio?: string;
}

export interface LegalTeamMember {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
  bio?: string;
}

