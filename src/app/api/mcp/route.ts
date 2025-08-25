import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import data from "../../../../content/data.json";

const handler = createMcpHandler(
  (server) => {
    // Contact tool
    server.tool(
      "contact",
      `Get ${data.contact.name}'s professional contact information including email, LinkedIn profile, and location details.`,
      {},
      async () => ({
        content: [
          {
            type: "text",
            text: JSON.stringify({ contact: data.contact }, null, 2),
          },
        ],
      })
    );

    // Bio tool
    server.tool(
      "bio",
      `Get ${data.contact.name}'s professional biography. Returns either short bio (tagline) or full bio (complete professional story) based on the format parameter.`,
      {
        format: z.enum(["short", "full"]).optional().describe("Format of bio to return - short for tagline, full for complete story"),
      },
      async ({ format }) => {
        const bioFormat = format || "short";
        const bio = bioFormat === "full" ? data.bio.full : data.bio.short;
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ bio }, null, 2),
            },
          ],
        };
      }
    );

    // Resume tool
    server.tool(
      "resume",
      `Get ${data.contact.name}'s professional work experience and career history. Returns detailed information about roles, companies, achievements, and career progression spanning 14+ years.`,
      {
        limit: z.number().min(1).optional().describe("Maximum number of roles to return (default: all)"),
      },
      async ({ limit }) => {
        const resumeData = limit ? data.resume.slice(0, limit) : data.resume;
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ resume: resumeData }, null, 2),
            },
          ],
        };
      }
    );

    // Projects tool
    server.tool(
      "projects",
      `Get ${data.contact.name}'s creative engineering projects that showcase hands-on building skills and craftsmanship beyond software development. Includes personal projects like treehouse construction that demonstrate engineering mindset across different domains.`,
      {
        limit: z.number().min(1).optional().describe("Maximum number of projects to return (default: all)"),
      },
      async ({ limit }) => {
        const projectsData = limit ? data.projects.slice(0, limit) : data.projects;
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ projects: projectsData }, null, 2),
            },
          ],
        };
      }
    );

    // Speaking tool
    server.tool(
      "speaking",
      `Get ${data.contact.name}'s speaking engagements, community contributions, and thought leadership activities including MVP status, conference presentations, and expertise areas.`,
      {
        includeExpertise: z.boolean().optional().describe("Include expertise areas and speaking topics (default: true)"),
      },
      async ({ includeExpertise }) => {
        const includeExp = includeExpertise !== false;
        const speakingData: any = {
          mvpStatus: data.speaking.mvpStatus,
          mvpProfileUrl: data.speaking.mvpProfileUrl,
          description: data.speaking.description,
          presentations: data.speaking.presentations,
          mediaResources: data.speaking.mediaResources,
          featuredMedia: data.speaking.featuredMedia,
          ...(includeExp && { expertiseAreas: data.speaking.expertiseAreas }),
        };

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ speaking: speakingData }, null, 2),
            },
          ],
        };
      }
    );

    // Full profile tool
    server.tool(
      "full-profile",
      `Get ${data.contact.name}'s complete professional profile including all available information: contact details, bio, resume, projects, speaking engagements, and community contributions.`,
      {
        bioFormat: z.enum(["short", "full"]).optional().describe("Format of bio to include in profile"),
        resumeLimit: z.number().min(1).optional().describe("Maximum number of resume roles to return"),
        projectsLimit: z.number().min(1).optional().describe("Maximum number of projects to return"),
      },
      async ({ bioFormat, resumeLimit, projectsLimit }) => {
        const fullBioFormat = bioFormat || "short";
        const bioData = fullBioFormat === "full" ? data.bio.full : data.bio.short;
        const fullResumeData = resumeLimit ? data.resume.slice(0, resumeLimit) : data.resume;
        const fullProjectsData = projectsLimit ? data.projects.slice(0, projectsLimit) : data.projects;

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
      }
    );
  },
  {
    // Optional server options
  },
  {
    // Configuration options
    basePath: "/api",
    maxDuration: 60,
    verboseLogs: true,
  }
);

export { handler as GET, handler as POST }; 