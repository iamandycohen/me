// Contact information
export interface Contact {
  name: string;
  email: string;
  linkedin: string;
  location: string;
}

// Professional information
export interface Professional {
  keywords: string[];
  expertise: string[];
  skills: string[];
}

// Biography information
export interface Bio {
  tagline: string;
  short: string;
  full: string;
}

// Resume/work experience entry
export interface Role {
  title: string;
  company: string;
  period: string;
  highlights: string[];
  description: string;
}

// Project entry
export interface Project {
  title: string;
  period: string;
  description: string;
  link?: string;
  highlights: string[];
}

// Presentation entry for community engagements
export interface Presentation {
  title: string;
  organization: string;
  location: string;
  date: string;
  sessionTitle: string;
  topics: string[];
  description: string;
  videoUrl?: string;
  sessionizeUrl?: string;
  documentationUrl?: string;
  documentationQuote?: string;
  documentationSource?: string;
  isLiveDemo?: boolean;
  isHistoric?: boolean;
  isUpcoming?: boolean;
}

// Expertise area structure
export interface ExpertiseArea {
  category: string;
  topics: string[];
}

// MVP Award entry
export interface MVPAward {
  year: string;
  type: string;
  status: string;
  description: string;
  announcementUrl?: string;
  quote?: string;
  quoteSource?: string;
}

// Community data structure
export interface CommunityData {
  mvpStatus: string;
  mvpAwards?: MVPAward[];
  mvpProfileUrl: string;
  description: string;
  presentations: Presentation[];
  featuredMedia: {
    title: string;
    episode: string;
    description: string;
    blogUrl: string;
    podcastUrl: string;
    videoUrl?: string;
  };
  mediaResources: {
    podcasts: Array<{
      title: string;
      url: string;
      description: string;
    }>;
  };
  expertiseAreas?: ExpertiseArea[];
}

// Thought Leadership entry
export interface ThoughtLeadership {
  title: string;
  url: string;
  platform: string;
  type: string;
  date: string;
  summary: string;
  highlights: string[];
  topics: string[];
}
