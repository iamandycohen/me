import type { Metadata } from 'next';
import type { Contact, Role, Bio } from '@/types';
import { MCPTool } from '@/types';
import { getFirstName, formatLinkedInUrl } from './data-helpers';

// Professional data interface for type safety
interface ProfessionalData {
  keywords: string[];
  expertise: string[];
  skills: string[];
}

// Generate JSON-LD structured data
export function generateJsonLd(
  contact: Contact, 
  currentRole: Role, 
  bio: Bio, 
  professional: ProfessionalData
) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": contact.name,
    "jobTitle": currentRole.title,
    "worksFor": {
      "@type": "Organization",
      "name": currentRole.company
    },
    "description": bio.short,
    "url": process.env.SITE_URL || 'http://localhost:3000',
    "email": contact.email,
    "sameAs": [
      formatLinkedInUrl(contact.linkedin)
    ],
    "knowsAbout": professional.skills,
    "hasOccupation": {
      "@type": "Occupation",
      "name": currentRole.title,
      "occupationLocation": {
        "@type": "Place",
        "name": contact.location
      },
      "skills": professional.expertise
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "MCP Tools Endpoint",
        "value": "/api/mcp/tools"
      },
      {
        "@type": "PropertyValue", 
        "name": "Agent Documentation",
        "value": "/llms.txt"
      },
      {
        "@type": "PropertyValue",
        "name": "API Documentation", 
        "value": "/api/docs"
      }
    ]
  };
}

// Generate base metadata for all pages
export function generateBaseMetadata(
  contact: Contact, 
  currentRole: Role, 
  bio: Bio,
  professional: ProfessionalData
): Metadata {
  const firstName = getFirstName(contact);
  
  return {
    title: {
      default: `${firstName} - AI-Native Professional Portfolio`,
      template: `%s | ${firstName}`
    },
    description: `${currentRole.title} at ${currentRole.company}. ${bio.short}`,
    keywords: professional.keywords,
    authors: [{ name: contact.name }],
    
    // AI/Agent discovery meta tags
    other: {
      'ai:tools': '/api/mcp/tools',
      'ai:description': 'Professional information accessible via MCP tools and structured data',
      'ai:type': 'professional-portfolio',
      'mcp:endpoint': '/api/mcp/tools',
      'llms:document': '/llms.txt',
      'openapi:spec': '/api/docs',
    },
    
    // OpenGraph for social sharing
    openGraph: {
      title: `${firstName} - AI-Native Professional Portfolio`,
      description: `${currentRole.title} building systems that scale. ${bio.short}`,
      type: 'profile',
      url: process.env.SITE_URL || 'http://localhost:3000',
    },
    
    // Additional meta
    alternates: {
      types: {
        'text/plain': [
          { url: '/llms.txt', title: 'LLM Agent Information' }
        ],
        'application/json': [
          { url: '/api/mcp/tools', title: 'MCP Tools Discovery' },
          { url: '/api/docs', title: 'OpenAPI Specification' }
        ]
      }
    }
  };
}

// Generate page-specific metadata
export function generatePageMetadata(
  pageTitle: string,
  description: string,
  contact: Contact,
  additional: Partial<Metadata> = {}
): Metadata {
  const firstName = getFirstName(contact);
  
  return {
    title: pageTitle,
    description,
    openGraph: {
      title: `${pageTitle} | ${firstName}`,
      description,
      siteName: `${firstName} - Professional Portfolio`,
    },
    ...additional
  };
}

// Generate OpenAPI specification
export function generateOpenApiSpec(
  contact: Contact,
  currentRole: Role,
  mcpTools: MCPTool[]
) {
  return {
    openapi: '3.0.0',
    info: {
      title: `${contact.name} - MCP Tools API`,
      version: '1.0.0',
      description: `Model Context Protocol (MCP) tools for accessing professional information about ${contact.name}`,
      contact: {
        name: contact.name,
        email: contact.email,
        url: formatLinkedInUrl(contact.linkedin)
      }
    },
    servers: [
      {
        url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
        description: 'Production/Development server'
      }
    ],
    paths: {
      '/api/mcp/tools': {
        get: {
          summary: 'Discover available MCP tools',
          description: 'Returns list of all available tools with their schemas for agent discovery',
          tags: ['MCP Tools'],
          responses: {
            '200': {
              description: 'List of available tools',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      tools: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            name: { type: 'string' },
                            description: { type: 'string' },
                            inputSchema: { type: 'object' },
                            outputSchema: { type: 'object' }
                          }
                        }
                      },
                      version: { type: 'string' },
                      description: { type: 'string' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/mcp/tools/{tool}': {
        get: {
          summary: 'Get tool schema',
          description: 'Returns the schema definition for a specific tool',
          tags: ['MCP Tools'],
          parameters: [
            {
              name: 'tool',
              in: 'path',
              required: true,
              schema: { type: 'string', enum: mcpTools.map(t => t.name) },
              description: 'Name of the tool to get schema for'
            }
          ],
          responses: {
            '200': {
              description: 'Tool schema',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          description: { type: 'string' },
                          inputSchema: { type: 'object' },
                          outputSchema: { type: 'object' }
                        }
                      }
                    }
                  }
                }
              }
            },
            '404': {
              description: 'Tool not found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      error: { type: 'string' }
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: 'Execute tool',
          description: 'Execute a specific MCP tool with provided parameters',
          tags: ['MCP Tools'],
          parameters: [
            {
              name: 'tool',
              in: 'path',
              required: true,
              schema: { type: 'string', enum: mcpTools.map(t => t.name) },
              description: 'Name of the tool to execute'
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    parameters: { type: 'object' }
                  }
                },
                examples: {
                  contact: {
                    summary: 'Get contact information',
                    value: { parameters: {} }
                  },
                  bio_short: {
                    summary: 'Get short bio',
                    value: { parameters: { format: 'short' } }
                  },
                  bio_full: {
                    summary: 'Get full bio',
                    value: { parameters: { format: 'full' } }
                  },
                  resume: {
                    summary: 'Get resume',
                    value: { parameters: { limit: 5 } }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Tool execution result',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: { type: 'object' }
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid request',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      error: { type: 'string' }
                    }
                  }
                }
              }
            },
            '404': {
              description: 'Tool not found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      error: { type: 'string' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        Contact: {
          type: 'object',
          properties: {
            name: { type: 'string', example: contact.name },
            email: { type: 'string', example: contact.email },
            linkedin: { type: 'string', example: contact.linkedin },
            location: { type: 'string', example: contact.location }
          }
        },
        Bio: {
          type: 'object',
          properties: {
            bio: { type: 'string', example: 'Professional biography...' }
          }
        },
        Resume: {
          type: 'object',
          properties: {
            resume: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string', example: currentRole.title },
                  company: { type: 'string', example: currentRole.company },
                  period: { type: 'string', example: currentRole.period },
                  highlights: {
                    type: 'array',
                    items: { type: 'string' },
                    example: currentRole.highlights.slice(0, 2)
                  },
                  description: { type: 'string', example: currentRole.description.substring(0, 50) + '...' }
                }
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'MCP Tools',
        description: 'Model Context Protocol tools for agent integration'
      }
    ]
  };
} 