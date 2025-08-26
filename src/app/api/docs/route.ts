import { NextRequest, NextResponse } from "next/server";
import data from "../../../../content/data.json";
import { formatLinkedInUrl } from "@/lib/data-helpers";

// Generate OpenAPI spec for the new MCP server
function generateMcpServerOpenApiSpec() {
  return {
    openapi: "3.0.0",
    info: {
      title: `${data.contact.name} - MCP Server API`,
      version: "1.0.0",
      description: `Model Context Protocol (MCP) server providing programmatic access to ${data.contact.name}'s professional information. Built with the official MCP SDK and compliant with JSON-RPC 2.0 protocol.`,
      contact: {
        name: data.contact.name,
        email: data.contact.email,
        url: formatLinkedInUrl(data.contact.linkedin),
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "/api/mcp",
        description: "MCP Server Endpoint",
      },
    ],
    paths: {
      "/api/mcp": {
        get: {
          summary: "Get MCP Server Information",
          description:
            "Returns basic information about the MCP server, including capabilities and available tools count.",
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
                              listChanged: { type: "boolean" },
                            },
                          },
                        },
                      },
                      tools: { type: "number", example: 6 },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "MCP JSON-RPC 2.0 Endpoint",
          description:
            "Main MCP server endpoint supporting JSON-RPC 2.0 protocol. Handles initialization, tool discovery, and tool execution.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    jsonrpc: { type: "string", enum: ["2.0"] },
                    method: {
                      type: "string",
                      enum: ["initialize", "tools/list", "tools/call"],
                      description: "The MCP method to execute",
                    },
                    id: {
                      oneOf: [{ type: "string" }, { type: "number" }],
                      description: "Request identifier for matching responses",
                    },
                    params: {
                      type: "object",
                      description: "Method-specific parameters",
                    },
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
                        clientInfo: { name: "my-client", version: "1.0.0" },
                        protocolVersion: "2025-03-26",
                      },
                    },
                  },
                  toolsList: {
                    summary: "List available tools",
                    value: {
                      jsonrpc: "2.0",
                      method: "tools/list",
                      id: 2,
                    },
                  },
                  toolCall: {
                    summary: "Execute a tool",
                    value: {
                      jsonrpc: "2.0",
                      method: "tools/call",
                      id: 3,
                      params: {
                        name: "bio",
                        arguments: { format: "short" },
                      },
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "JSON-RPC 2.0 response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      jsonrpc: { type: "string", enum: ["2.0"] },
                      id: {
                        oneOf: [{ type: "string" }, { type: "number" }],
                      },
                      result: {
                        type: "object",
                        description: "Success result (varies by method)",
                      },
                      error: {
                        type: "object",
                        properties: {
                          code: { type: "number" },
                          message: { type: "string" },
                          data: {},
                        },
                        description: "Error details (if request failed)",
                      },
                    },
                    required: ["jsonrpc", "id"],
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        MCPTools: {
          type: "object",
          description:
            "Available MCP tools for accessing professional information",
          properties: {
            contact: {
              type: "object",
              description: "Get professional contact information",
              properties: {
                inputSchema: {
                  type: "object",
                  properties: {},
                  description: "No parameters required",
                },
                outputSchema: {
                  type: "object",
                  properties: {
                    contact: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        email: { type: "string", format: "email" },
                        linkedin: { type: "string" },
                        location: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
            bio: {
              type: "object",
              description: "Get professional biography",
              properties: {
                inputSchema: {
                  type: "object",
                  properties: {
                    format: {
                      type: "string",
                      enum: ["short", "full"],
                      description: "Format of bio to return",
                    },
                  },
                },
                outputSchema: {
                  type: "object",
                  properties: {
                    bio: { type: "string" },
                  },
                },
              },
            },
            resume: {
              type: "object",
              description: "Get professional work experience",
              properties: {
                inputSchema: {
                  type: "object",
                  properties: {
                    limit: {
                      type: "number",
                      minimum: 1,
                      description: "Maximum number of roles to return",
                    },
                  },
                },
                outputSchema: {
                  type: "object",
                  properties: {
                    resume: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: { type: "string" },
                          company: { type: "string" },
                          period: { type: "string" },
                          highlights: {
                            type: "array",
                            items: { type: "string" },
                          },
                          description: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
            projects: {
              type: "object",
              description: "Get creative engineering projects",
              properties: {
                inputSchema: {
                  type: "object",
                  properties: {
                    limit: {
                      type: "number",
                      minimum: 1,
                      description: "Maximum number of projects to return",
                    },
                  },
                },
                outputSchema: {
                  type: "object",
                  properties: {
                    projects: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: { type: "string" },
                          period: { type: "string" },
                          description: { type: "string" },
                          highlights: {
                            type: "array",
                            items: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "full-profile": {
              type: "object",
              description: "Get complete professional profile",
              properties: {
                inputSchema: {
                  type: "object",
                  properties: {
                    bioFormat: {
                      type: "string",
                      enum: ["short", "full"],
                      description: "Format of bio to include",
                    },
                    resumeLimit: {
                      type: "number",
                      minimum: 1,
                      description: "Maximum number of resume roles to include",
                    },
                    projectsLimit: {
                      type: "number",
                      minimum: 1,
                      description: "Maximum number of projects to include",
                    },
                  },
                },
                outputSchema: {
                  type: "object",
                  properties: {
                    contact: {
                      $ref: "#/components/schemas/MCPTools/properties/contact/properties/outputSchema/properties/contact",
                    },
                    bio: { type: "string" },
                    resume: {
                      $ref: "#/components/schemas/MCPTools/properties/resume/properties/outputSchema/properties/resume",
                    },
                    projects: {
                      $ref: "#/components/schemas/MCPTools/properties/projects/properties/outputSchema/properties/projects",
                    },
                  },
                },
              },
            },
            community: {
              type: "object",
              description:
                "Get community leadership and contributions including MVP awards, conference presentations, media appearances, and thought leadership activities",
              properties: {
                inputSchema: {
                  type: "object",
                  properties: {
                    includeExpertise: {
                      type: "boolean",
                      description:
                        "Include expertise areas and community topics (default: true)",
                    },
                  },
                },
                outputSchema: {
                  type: "object",
                  properties: {
                    community: {
                      type: "object",
                      properties: {
                        mvpStatus: { type: "string" },
                        mvpAwards: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              year: { type: "string" },
                              type: { type: "string" },
                              status: { type: "string" },
                              description: { type: "string" },
                              announcementUrl: { type: "string" },
                              quote: { type: "string" },
                              quoteSource: { type: "string" },
                            },
                          },
                        },
                        mvpProfileUrl: { type: "string" },
                        description: { type: "string" },
                        presentations: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              title: { type: "string" },
                              organization: { type: "string" },
                              location: { type: "string" },
                              date: { type: "string" },
                              sessionTitle: { type: "string" },
                              topics: {
                                type: "array",
                                items: { type: "string" },
                              },
                              description: { type: "string" },
                              videoUrl: { type: "string" },
                              sessionizeUrl: { type: "string" },
                              documentationUrl: { type: "string" },
                              documentationQuote: { type: "string" },
                              documentationSource: { type: "string" },
                              isLiveDemo: { type: "boolean" },
                              isHistoric: { type: "boolean" },
                              isUpcoming: { type: "boolean" },
                            },
                          },
                        },
                        featuredMedia: {
                          type: "object",
                          properties: {
                            title: { type: "string" },
                            episode: { type: "string" },
                            description: { type: "string" },
                            blogUrl: { type: "string" },
                            podcastUrl: { type: "string" },
                            videoUrl: { type: "string" },
                          },
                        },
                        mediaResources: {
                          type: "object",
                          properties: {
                            podcasts: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  title: { type: "string" },
                                  url: { type: "string" },
                                  description: { type: "string" },
                                },
                              },
                            },
                          },
                        },
                        expertiseAreas: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              category: { type: "string" },
                              topics: {
                                type: "array",
                                items: { type: "string" },
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
          },
        },
      },
    },
    tags: [
      {
        name: "MCP Server",
        description: `Model Context Protocol server for ${data.contact.name}'s professional portfolio`,
      },
      {
        name: "Professional Information",
        description:
          "Access to contact details, biography, work experience, and projects",
      },
    ],
  };
}

export async function GET(_request: NextRequest) {
  const openApiSpec = generateMcpServerOpenApiSpec();
  return NextResponse.json(openApiSpec);
}
