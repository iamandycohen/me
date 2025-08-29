import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { type CommunityData } from "@/types";
import { TOOL_DESCRIPTIONS } from "@/lib/mcp-tools";
import data from "../../../../content/data.json";

const handler = createMcpHandler(
  (server) => {
    // Contact tool - using shared description (no duplication!)
    server.tool(
      "contact",
      TOOL_DESCRIPTIONS.contact,
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

    // Bio tool - using shared description (no duplication!)
    server.tool(
      "bio",
      TOOL_DESCRIPTIONS.bio,
      {
        format: z
          .enum(["short", "full"])
          .optional()
          .describe("Format of bio to return - short for tagline, full for complete story"),
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

    // Resume tool - using shared description (no duplication!)
    server.tool(
      "resume",
      TOOL_DESCRIPTIONS.resume,
      {
        limit: z
          .number()
          .min(1)
          .optional()
          .describe("Maximum number of roles to return (default: all)"),
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

    // Projects tool - using shared description (no duplication!)
    server.tool(
      "projects",
      TOOL_DESCRIPTIONS.projects,
      {
        limit: z
          .number()
          .min(1)
          .optional()
          .describe("Maximum number of projects to return (default: all)"),
      },
      async ({ limit }) => {
        const projectsData = limit
          ? data.projects.slice(0, limit)
          : data.projects;
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

    // Community tool - using shared description (no duplication!)
    server.tool(
      "community",
      TOOL_DESCRIPTIONS.community,
      {
        includeExpertise: z
          .boolean()
          .optional()
          .describe("Include expertise areas and community topics (default: true)"),
      },
      async ({ includeExpertise }) => {
        const includeExp = includeExpertise !== false;
        const communityData: CommunityData = {
          mvpStatus: data.community.mvpStatus,
          mvpAwards: data.community.mvpAwards,
          mvpProfileUrl: data.community.mvpProfileUrl,
          description: data.community.description,
          presentations: data.community.presentations,
          mediaResources: data.community.mediaResources,
          featuredMedia: data.community.featuredMedia,
          ...(includeExp && { expertiseAreas: data.community.expertiseAreas }),
        };

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ community: communityData }, null, 2),
            },
          ],
        };
      }
    );

    // Full profile tool - using shared description (no duplication!)
    server.tool(
      "full-profile",
      TOOL_DESCRIPTIONS["full-profile"],
      {
        bioFormat: z
          .enum(["short", "full"])
          .optional()
          .describe("Format of bio to include in profile"),
        resumeLimit: z
          .number()
          .min(1)
          .optional()
          .describe("Maximum number of resume roles to return"),
        projectsLimit: z
          .number()
          .min(1)
          .optional()
          .describe("Maximum number of projects to return"),
      },
      async ({ bioFormat, resumeLimit, projectsLimit }) => {
        const fullBioFormat = bioFormat || "short";
        const bioData =
          fullBioFormat === "full" ? data.bio.full : data.bio.short;
        const fullResumeData = resumeLimit
          ? data.resume.slice(0, resumeLimit)
          : data.resume;
        const fullProjectsData = projectsLimit
          ? data.projects.slice(0, projectsLimit)
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
                  community: data.community,
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
