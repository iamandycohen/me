import type { MCPTool } from '@/types';

export const mcpTools: MCPTool[] = [
  {
    name: 'contact',
    description: `Get Andy Cohen's professional contact information including email, LinkedIn profile, and location details.`,
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    },
    outputSchema: {
      type: 'object',
      properties: {
        contact: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            linkedin: { type: 'string' },
            location: { type: 'string' }
          }
        }
      },
      required: ['contact']
    }
  },
  {
    name: 'bio',
    description: `Get Andy's professional biography. Returns either short bio (tagline) or full bio (complete professional story) based on the format parameter.`,
    inputSchema: {
      type: 'object',
      properties: {
        format: {
          type: 'string',
          enum: ['short', 'full'],
          description: 'Format of bio to return - short for tagline, full for complete story'
        }
      },
      required: []
    },
    outputSchema: {
      type: 'object',
      properties: {
        bio: { type: 'string' }
      },
      required: ['bio']
    }
  },
  {
    name: 'resume',
    description: `Get Andy's professional work experience and career history. Returns detailed information about roles, companies, achievements, and career progression spanning 14+ years.`,
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Maximum number of roles to return (default: all)',
          minimum: 1
        }
      },
      required: []
    },
    outputSchema: {
      type: 'object',
      properties: {
        resume: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              company: { type: 'string' },
              period: { type: 'string' },
              highlights: { 
                type: 'array', 
                items: { type: 'string' } 
              },
              description: { type: 'string' }
            }
          }
        }
      },
      required: ['resume']
    }
  },
  {
    name: 'projects',
    description: `Get Andy's creative engineering projects that showcase hands-on building skills and craftsmanship beyond software development. Includes personal projects like treehouse construction that demonstrate engineering mindset across different domains.`,
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Maximum number of projects to return (default: all)',
          minimum: 1
        }
      },
      required: []
    },
    outputSchema: {
      type: 'object',
      properties: {
        projects: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              period: { type: 'string' },
              description: { type: 'string' },
              highlights: { 
                type: 'array', 
                items: { type: 'string' } 
              }
            }
          }
        }
      },
      required: ['projects']
    }
  }
];

// Get a specific MCP tool by name
export function getMCPTool(toolName: string): MCPTool | undefined {
  return mcpTools.find(tool => tool.name === toolName);
} 