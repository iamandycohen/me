import { NextRequest, NextResponse } from "next/server";
import data from "@/lib/data";
import { formatLinkedInUrl } from "@/lib/data-helpers";

// Generate OpenAPI spec for the new MCP server
function generateMcpServerOpenApiSpec() {
  return {
    openapi: "3.0.0",
    info: {
      title: `${data.contact.name} - MCP Server API`,
      version: "1.0.0",
      description: `Model Context Protocol (MCP) server providing programmatic access to ${data.contact.name}'s professional information. Built with the official MCP SDK and compliant with JSON-RPC 2.0 protocol.

## Supported Transports

This MCP server supports multiple transport mechanisms for maximum client compatibility:

### 1. Streamable HTTP (Recommended)
- **Endpoint**: \`POST /api/mcp\`
- **Content-Type**: \`application/json\`
- **Description**: Modern bidirectional transport using chunked transfer encoding
- **Features**: Sessions, streaming, serverless-friendly

### 2. Server-Sent Events (SSE) Fallback
- **Endpoint**: \`GET /api/mcp\` with \`Accept: text/event-stream\`
- **Description**: Legacy transport for clients requiring SSE
- **Features**: Sessions, real-time streaming
- **Status**: Supported for backward compatibility

### 3. Dynamic Transport Selection
- **Pattern**: \`/api/[transport]\` where transport can be \`mcp\`, \`sse\`, etc.
- **Description**: Automatic transport detection based on HTTP method and headers

## Session Management

Sessions are automatically managed using the \`Mcp-Session-Id\` header:
- Server generates unique session ID on initialization
- Client includes \`Mcp-Session-Id\` header in subsequent requests
- Sessions persist in Redis (with in-memory fallback)
- Sessions timeout after 60 seconds of inactivity`,
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
        description: "Primary MCP Server Endpoint (Streamable HTTP + SSE fallback)",
      },
      {
        url: "/api/sse",
        description: "Legacy SSE Transport Endpoint (backward compatibility)",
      },
    ],
    paths: {
      "/api/mcp": {
        get: {
          summary: "MCP Server Information / SSE Transport",
          description:
            "Dual-purpose endpoint: Returns server information with Accept: application/json, or establishes SSE stream with Accept: text/event-stream. For SSE transport, this endpoint receives server-to-client messages.",
          parameters: [
            {
              name: "Accept",
              in: "header",
              description: "Content type preference: application/json for server info, text/event-stream for SSE transport",
              schema: {
                type: "string",
                enum: ["application/json", "text/event-stream"],
                default: "application/json"
              }
            },
            {
              name: "Mcp-Session-Id",
              in: "header",
              description: "Session identifier for maintaining state across requests (optional for server info, required for SSE)",
              schema: {
                type: "string"
              }
            }
          ],
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
                "text/event-stream": {
                  schema: {
                    type: "string",
                    description: "Server-Sent Events stream for real-time MCP messages",
                    example: "data: {\"jsonrpc\":\"2.0\",\"method\":\"notifications/message\",\"params\":{...}}\n\n"
                  }
                },
              },
            },
          },
        },
        post: {
          summary: "MCP JSON-RPC 2.0 Endpoint",
          description:
            "Main MCP server endpoint supporting JSON-RPC 2.0 protocol. Handles initialization, tool discovery, and tool execution. Supports both Streamable HTTP transport (recommended) and traditional request-response patterns. Sessions are automatically managed via Mcp-Session-Id header.",
          parameters: [
            {
              name: "Mcp-Session-Id",
              in: "header",
              description: "Session identifier for maintaining state. Generated by server on initialization, required for subsequent requests.",
              schema: {
                type: "string"
              }
            },
            {
              name: "Content-Type",
              in: "header",
              required: true,
              description: "Must be application/json for JSON-RPC requests",
              schema: {
                type: "string",
                enum: ["application/json"]
              }
            }
          ],
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
              headers: {
                "Mcp-Session-Id": {
                  description: "Session identifier returned on initialization, used for subsequent requests",
                  schema: {
                    type: "string"
                  }
                },
                "Content-Type": {
                  description: "Response content type",
                  schema: {
                    type: "string",
                    enum: ["application/json", "text/event-stream"]
                  }
                }
              },
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
      "/api/sse": {
        get: {
          summary: "Legacy SSE Transport Stream",
          description: "Legacy Server-Sent Events endpoint for backward compatibility. Establishes persistent connection for server-to-client messages. Use /api/mcp with Accept: text/event-stream header instead.",
          deprecated: true,
          parameters: [
            {
              name: "Mcp-Session-Id",
              in: "header",
              required: true,
              description: "Session identifier from initialization",
              schema: {
                type: "string"
              }
            }
          ],
          responses: {
            "200": {
              description: "SSE stream established",
              content: {
                "text/event-stream": {
                  schema: {
                    type: "string",
                    description: "Server-Sent Events stream",
                    example: "data: {\"jsonrpc\":\"2.0\",\"method\":\"notifications/message\",\"params\":{...}}\n\n"
                  }
                }
              }
            }
          }
        }
      },
      "/api/sse/messages": {
        post: {
          summary: "Legacy SSE Message Endpoint",
          description: "Legacy endpoint for sending client-to-server messages in SSE transport. Use /api/mcp POST endpoint instead.",
          deprecated: true,
          parameters: [
            {
              name: "Mcp-Session-Id",
              in: "header",
              required: true,
              description: "Session identifier from initialization",
              schema: {
                type: "string"
              }
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/paths/~1api~1mcp/post/requestBody/content/application~1json/schema"
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Message accepted",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string", example: "accepted" }
                    }
                  }
                }
              }
            }
          }
        }
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
