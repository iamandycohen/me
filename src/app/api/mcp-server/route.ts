import { NextRequest, NextResponse } from "next/server";
import data from "../../../../content/data.json";

// Define our tools directly for simplicity
const tools = [
  {
    name: "contact",
    description: `Get ${data.contact.name}'s professional contact information including email, LinkedIn profile, and location details.`,
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "bio",
    description: `Get ${data.contact.name}'s professional biography. Returns either short bio (tagline) or full bio (complete professional story) based on the format parameter.`,
    inputSchema: {
      type: "object",
      properties: {
        format: {
          type: "string",
          enum: ["short", "full"],
          description:
            "Format of bio to return - short for tagline, full for complete story",
        },
      },
      required: [],
    },
  },
  {
    name: "resume",
    description: `Get ${data.contact.name}'s professional work experience and career history. Returns detailed information about roles, companies, achievements, and career progression spanning 14+ years.`,
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          minimum: 1,
          description: "Maximum number of roles to return (default: all)",
        },
      },
      required: [],
    },
  },
  {
    name: "projects",
    description: `Get ${data.contact.name}'s creative engineering projects that showcase hands-on building skills and craftsmanship beyond software development. Includes personal projects like treehouse construction that demonstrate engineering mindset across different domains.`,
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          minimum: 1,
          description: "Maximum number of projects to return (default: all)",
        },
      },
      required: [],
    },
  },
  {
    name: "speaking",
    description: `Get ${data.contact.name}'s speaking engagements, community contributions, and thought leadership activities including MVP status, conference presentations, and expertise areas.`,
    inputSchema: {
      type: "object",
      properties: {
        includeExpertise: {
          type: "boolean",
          description:
            "Include expertise areas and speaking topics (default: true)",
        },
      },
      required: [],
    },
  },
  {
    name: "full-profile",
    description: `Get ${data.contact.name}'s complete professional profile including all available information: contact details, bio, resume, projects, speaking engagements, and community contributions.`,
    inputSchema: {
      type: "object",
      properties: {
        bioFormat: {
          type: "string",
          enum: ["short", "full"],
          description: "Format of bio to include in profile",
        },
        resumeLimit: {
          type: "number",
          minimum: 1,
          description: "Maximum number of resume roles to return",
        },
        projectsLimit: {
          type: "number",
          minimum: 1,
          description: "Maximum number of projects to return",
        },
      },
      required: [],
    },
  },
];

// Tool execution functions
async function executeTool(name: string, args: any = {}) {
  switch (name) {
    case "contact":
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ contact: data.contact }, null, 2),
          },
        ],
      };

    case "bio":
      const bioFormat = args.format || "short";
      const bio = bioFormat === "full" ? data.bio.full : data.bio.short;
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ bio }, null, 2),
          },
        ],
      };

    case "resume":
      const resumeLimit = args.limit;
      const resumeData = resumeLimit
        ? data.resume.slice(0, resumeLimit)
        : data.resume;
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ resume: resumeData }, null, 2),
          },
        ],
      };

    case "projects":
      const projectsLimit = args.limit;
      const projectsData = projectsLimit
        ? data.projects.slice(0, projectsLimit)
        : data.projects;
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ projects: projectsData }, null, 2),
          },
        ],
      };

    case "speaking":
      const includeExpertise = args.includeExpertise !== false;

      const speakingData: any = {
        mvpStatus: data.speaking.mvpStatus,
        mvpProfileUrl: data.speaking.mvpProfileUrl,
        description: data.speaking.description,
        presentations: data.speaking.presentations,
        mediaResources: data.speaking.mediaResources,
        featuredMedia: data.speaking.featuredMedia,
        ...(includeExpertise && { expertiseAreas: data.speaking.expertiseAreas }),
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ speaking: speakingData }, null, 2),
          },
        ],
      };

    case "full-profile":
      const fullBioFormat = args.bioFormat || "short";
      const fullResumeLimit = args.resumeLimit;
      const fullProjectsLimit = args.projectsLimit;

      const bioData = fullBioFormat === "full" ? data.bio.full : data.bio.short;
      const fullResumeData = fullResumeLimit
        ? data.resume.slice(0, fullResumeLimit)
        : data.resume;
      const fullProjectsData = fullProjectsLimit
        ? data.projects.slice(0, fullProjectsLimit)
        : data.projects;

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                contact: data.contact,
                professional: data.professional,
                bio: bioData,
                resume: fullResumeData,
                projects: fullProjectsData,
                speaking: data.speaking,
              },
              null,
              2
            ),
          },
        ],
      };

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    let response;

    switch (body.method) {
      case "initialize":
        response = {
          jsonrpc: "2.0",
          id: body.id,
          result: {
            protocolVersion: "2025-03-26",
            capabilities: {
              tools: {
                listChanged: false,
              },
            },
            serverInfo: {
              name: "andy-cohen-portfolio",
              version: "1.0.0",
            },
          },
        };
        break;

      case "ping":
        response = {
          jsonrpc: "2.0",
          id: body.id,
          result: {},
        };
        break;

      case "tools/list":
        response = {
          jsonrpc: "2.0",
          id: body.id,
          result: {
            tools,
          },
        };
        break;

      case "tools/call":
        try {
          const toolName = body.params?.name;
          const toolArgs = body.params?.arguments || {};

          if (!toolName) {
            response = {
              jsonrpc: "2.0",
              id: body.id,
              error: {
                code: -32602,
                message: "Invalid params: missing tool name",
              },
            };
            break;
          }

          const result = await executeTool(toolName, toolArgs);

          response = {
            jsonrpc: "2.0",
            id: body.id,
            result,
          };
        } catch (error: any) {
          // eslint-disable-line @typescript-eslint/no-explicit-any
          response = {
            jsonrpc: "2.0",
            id: body.id,
            error: {
              code: -32603,
              message: `Internal error: ${error.message}`,
            },
          };
        }
        break;

      default:
        response = {
          jsonrpc: "2.0",
          id: body.id,
          error: {
            code: -32601,
            message: "Method not found",
          },
        };
    }

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, Mcp-Session-Id",
        "Access-Control-Expose-Headers": "Mcp-Session-Id",
      },
    });
  } catch (error: any) {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    return new NextResponse(
      JSON.stringify({
        jsonrpc: "2.0",
        id: null,
        error: {
          code: -32700,
          message: `Parse error: ${error.message}`,
        },
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

export async function GET(_req: NextRequest) {
  const serverInfo = {
    name: "andy-cohen-portfolio",
    version: "1.0.0",
    protocol: "mcp",
    description: `Professional portfolio MCP server for ${data.contact.name}`,
    capabilities: {
      tools: {
        listChanged: false,
      },
    },
    tools: tools.length,
  };

  return NextResponse.json(serverInfo, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, Mcp-Session-Id",
      "Access-Control-Expose-Headers": "Mcp-Session-Id",
    },
  });
}
