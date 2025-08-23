// MCP Tool definition
export interface MCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
  outputSchema: {
    type: string;
    properties: Record<string, any>;
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