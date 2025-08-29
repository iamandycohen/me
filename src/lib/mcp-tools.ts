import data from "@/lib/data";

// Shared tool descriptions to eliminate duplication between MCP server and chat API
export const TOOL_DESCRIPTIONS = {
  contact: `Get ${data.contact.name}'s professional contact information including email, LinkedIn profile, and location details.`,
  bio: `Get ${data.contact.name}'s professional biography. Returns either short bio (tagline) or full bio (complete professional story) based on the format parameter.`,
  resume: `Get ${data.contact.name}'s professional work experience and career history. Returns detailed information about roles, companies, achievements, and career progression spanning 14+ years.`,
  projects: `Get ${data.contact.name}'s creative engineering projects that showcase hands-on building skills and craftsmanship beyond software development. Includes personal projects like treehouse construction that demonstrate engineering mindset across different domains.`,
  community: `Get ${data.contact.name}'s community leadership and contributions including MVP awards, conference presentations, media appearances, and thought leadership activities.`,
  "full-profile": `Get ${data.contact.name}'s complete professional profile including all available information: contact details, bio, resume, projects, community contributions, and thought leadership activities.`,
} as const;

// For the chat system message - simple array format
export const MCP_TOOLS = Object.entries(TOOL_DESCRIPTIONS).map(([name, description]) => ({
  name,
  description,
}));
