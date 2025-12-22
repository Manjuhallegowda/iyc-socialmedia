export interface KpyccTeamMember {
  id: string;
  name: string;
  designation: string;
  district: string;
  assembly?: string;
  block?: string;
  imageUrl: string;
  activity: string[];
  startYear: number;
  bio: string;
  email: string;
  phone: string;
  social: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  mailstone: string[];
  level: 'District' | 'Assembly' | 'Block' | 'State';
}

export interface DistrictHierarchyData {
  district: string;
  president?: KpyccTeamMember;
  assemblyMembers: KpyccTeamMember[];
  blockMembers: KpyccTeamMember[];
  smTeamMembers: SocialMediaTeamMember[];
  legalTeamMembers: LegalTeamMember[];
  counts: {
    district: number;
    assembly: number;
    block: number;
    smTeam: number;
    legalTeam: number;
    totalActive: number;
  };
  statistics: {
    maleMembers: number;
    femaleMembers: number;
    youngLeaders: number; // Under 35
  };
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
