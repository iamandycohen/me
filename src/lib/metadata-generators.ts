import type { Metadata } from "next";
import type { Contact, Role, Bio } from "@/types";
import { MCPTool } from "@/types";
import { getDisplayName, formatLinkedInUrl } from "./data-helpers";
import { getBaseUrl } from "./api-helpers";

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
    name: contact.name,
    jobTitle: currentRole.title,
    worksFor: {
      "@type": "Organization",
      name: currentRole.company,
    },
    description: bio.short,
    url: getBaseUrl(),
    email: contact.email,
    sameAs: [formatLinkedInUrl(contact.linkedin)],
    knowsAbout: professional.skills,
    hasOccupation: {
      "@type": "Occupation",
      name: currentRole.title,
      occupationLocation: {
        "@type": "Place",
        name: contact.location,
      },
      skills: professional.expertise,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "MCP Server Endpoint",
        value: "/api/mcp",
      },
      {
        "@type": "PropertyValue",
        name: "Agent Documentation",
        value: "/llms.txt",
      },
      {
        "@type": "PropertyValue",
        name: "API Documentation",
        value: "/api/docs",
      },
    ],
  };
}

// Generate base metadata for all pages
export function generateBaseMetadata(
  contact: Contact,
  currentRole: Role,
  bio: Bio,
  professional: ProfessionalData
): Metadata {
  const displayName = getDisplayName(contact);

  return {
    title: {
      default: `${displayName} - AI-Native Professional Portfolio`,
      template: `%s | ${displayName}`,
    },
    description: `${currentRole.title} at ${currentRole.company}. ${bio.short}`,
    keywords: professional.keywords,
    authors: [{ name: contact.name }],

    // AI/Agent discovery meta tags
    other: {
      "ai:mcp-server": "/api/mcp",
      "ai:description":
        "Professional information accessible via MCP tools and structured data",
      "ai:type": "professional-portfolio",
      "mcp:endpoint": "/api/mcp",
      "llms:document": "/llms.txt",
      "openapi:spec": "/api/docs",
    },

    // OpenGraph for social sharing
    openGraph: {
      title: `${displayName} - AI-Native Professional Portfolio`,
      description: `${currentRole.title} building systems that scale. ${bio.short}`,
      type: "profile",
      url: getBaseUrl(),
    },

    // Additional meta
    alternates: {
      types: {
        "text/plain": [{ url: "/llms.txt", title: "LLM Agent Information" }],
        "application/json": [
          { url: "/api/mcp", title: "MCP Server Endpoint" },
          { url: "/api/docs", title: "OpenAPI Specification" },
        ],
      },
    },
  };
}

// Generate page-specific metadata
export function generatePageMetadata(
  pageTitle: string,
  description: string,
  contact: Contact,
  additional: Partial<Metadata> = {}
): Metadata {
  //const firstName = getFirstName(contact);

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: `${pageTitle} | ${contact.name}`,
      description,
      siteName: `${contact.name} - Professional Portfolio`,
    },
    ...additional,
  };
}

// Generate OpenAPI specification
export function generateOpenApiSpec(
  contact: Contact,
  currentRole: Role,
  _mcpTools: MCPTool[]
) {
  return {
    openapi: "3.0.0",
    info: {
      title: `${contact.name} - MCP Server API`,
      version: "1.0.0",
      description: `Model Context Protocol (MCP) server for accessing professional information about ${contact.name}. Implements JSON-RPC 2.0 with tools for contact, bio, resume, projects, and full profile data.`,
      contact: {
        name: contact.name,
        email: contact.email,
        url: formatLinkedInUrl(contact.linkedin),
      },
    },
    servers: [
      {
        url: getBaseUrl(),
        description: "Production/Development server",
      },
    ],
    paths: {
      "/api/mcp": {
        get: {
          summary: "Get MCP server information",
          description:
            "Returns basic information about the MCP server capabilities and available tools",
          tags: ["MCP Server"],
          responses: {
            "200": {
              description: "Server information",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      name: { type: "string", example: "andy-cohen-portfolio" },
                      version: { type: "string", example: "1.0.0" },
                      protocol: { type: "string", example: "mcp" },
                      description: { type: "string" },
                      capabilities: {
                        type: "object",
                        properties: {
                          tools: {
                            type: "object",
                            properties: {
                              listChanged: { type: "boolean", example: false },
                            },
                          },
                        },
                      },
                      tools: { type: "number", example: 5 },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Execute MCP JSON-RPC requests",
          description:
            "Handle MCP protocol requests including initialize, tools/list, and tools/call methods",
          tags: ["MCP Server"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    jsonrpc: { type: "string", example: "2.0" },
                    method: {
                      type: "string",
                      enum: ["initialize", "tools/list", "tools/call"],
                      example: "tools/list",
                    },
                    id: { type: "number", example: 1 },
                    params: { type: "object" },
                  },
                  required: ["jsonrpc", "method", "id"],
                },
                examples: {
                  initialize: {
                    summary: "Initialize MCP session",
                    value: {
                      jsonrpc: "2.0",
                      method: "initialize",
                      id: 1,
                      params: {
                        clientInfo: { name: "test-client", version: "1.0.0" },
                        protocolVersion: "2025-03-26",
                      },
                    },
                  },
                  tools_list: {
                    summary: "List available tools",
                    value: {
                      jsonrpc: "2.0",
                      method: "tools/list",
                      id: 2,
                    },
                  },
                  tools_call: {
                    summary: "Call a tool",
                    value: {
                      jsonrpc: "2.0",
                      method: "tools/call",
                      id: 3,
                      params: {
                        name: "contact",
                      },
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "JSON-RPC response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      jsonrpc: { type: "string", example: "2.0" },
                      id: { type: "number" },
                      result: { type: "object" },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Invalid JSON-RPC request",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      jsonrpc: { type: "string", example: "2.0" },
                      id: { type: "number" },
                      error: {
                        type: "object",
                        properties: {
                          code: { type: "number" },
                          message: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/mcp-test": {
        get: {
          summary: "Visual MCP testing interface",
          description:
            "Interactive web interface for testing MCP tools with live examples",
          tags: ["Testing"],
          responses: {
            "200": {
              description: "HTML testing interface",
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Contact: {
          type: "object",
          properties: {
            name: { type: "string", example: contact.name },
            email: { type: "string", example: contact.email },
            linkedin: { type: "string", example: contact.linkedin },
            location: { type: "string", example: contact.location },
          },
        },
        Bio: {
          type: "object",
          properties: {
            bio: { type: "string", example: "Professional biography..." },
          },
        },
        Resume: {
          type: "object",
          properties: {
            resume: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string", example: currentRole.title },
                  company: { type: "string", example: currentRole.company },
                  period: { type: "string", example: currentRole.period },
                  highlights: {
                    type: "array",
                    items: { type: "string" },
                    example: currentRole.highlights.slice(0, 2),
                  },
                  description: {
                    type: "string",
                    example: currentRole.description.substring(0, 50) + "...",
                  },
                },
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: "MCP Server",
        description: "Model Context Protocol server implementing JSON-RPC 2.0",
      },
      {
        name: "Testing",
        description: "Testing and documentation interfaces",
      },
    ],
  };
}
