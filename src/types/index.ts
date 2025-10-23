// MCP Tool definition
export interface MCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, unknown>;
    required: string[];
  };
  outputSchema: {
    type: string;
    properties: Record<string, unknown>;
    required: string[];
  };
}

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
    videoUrl: string;
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

// API Response types
export interface ContactResponse {
  contact: Contact;
}

export interface BioResponse {
  bio: string;
}

export interface ResumeResponse {
  resume: Role[];
}

export interface ProjectsResponse {
  projects: Project[];
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

// API Input types
export interface BioInput {
  format?: 'short' | 'full';
}

export interface ResumeInput {
  limit?: number;
}

export interface ProjectsInput {
  limit?: number;
} 