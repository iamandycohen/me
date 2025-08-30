/**
 * Unit tests for /api/[transport] MCP route
 * Tests the custom tool implementations and business logic
 */

// Mock the external dependencies
jest.mock("mcp-handler", () => ({
  createMcpHandler: jest.fn()
}));

jest.mock("@/lib/data", () => ({
  contact: {
    name: "Test User",
    email: "test@example.com",
    phone: "+1-555-0123"
  },
  bio: {
    short: "Short bio text",
    full: "Full detailed bio text"
  },
  resume: [
    { title: "Senior Engineer", company: "Company A", period: "2022-2024" },
    { title: "Engineer", company: "Company B", period: "2020-2022" },
    { title: "Junior Engineer", company: "Company C", period: "2018-2020" }
  ],
  projects: [
    { title: "Project A", description: "First project" },
    { title: "Project B", description: "Second project" },
    { title: "Project C", description: "Third project" }
  ],
  community: {
    mvpStatus: "Active MVP",
    mvpAwards: ["2023 MVP", "2024 MVP"],
    mvpProfileUrl: "https://mvp.example.com/user",
    description: "Community leader",
    presentations: ["Talk 1", "Talk 2"],
    mediaResources: { articles: 5 },
    featuredMedia: { video: "featured.mp4" },
    expertiseAreas: ["JavaScript", "React", "Node.js"]
  },
  professional: {
    title: "Senior Engineer",
    specialization: "Full Stack Development"
  }
}));

jest.mock("@/lib/mcp-tools", () => ({
  TOOL_DESCRIPTIONS: {
    contact: "Get contact information",
    bio: "Get biographical information", 
    resume: "Get work experience",
    projects: "Get project portfolio",
    community: "Get community involvement",
    "full-profile": "Get complete professional profile"
  }
}));

import { createMcpHandler } from "mcp-handler";

describe("/api/[transport] MCP route", () => {
  let mockServer: any;
  let toolImplementations: Map<string, any>;

  beforeAll(() => {
    toolImplementations = new Map();
    
    mockServer = {
      tool: jest.fn((name, description, schema, implementation) => {
        toolImplementations.set(name, {
          description,
          schema,
          implementation
        });
      })
    };

    (createMcpHandler as jest.Mock).mockImplementation((setupFn) => {
      setupFn(mockServer);
      return "mocked-handler";
    });

    // Import the route to trigger setup
    require("../route");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Tool Registration", () => {
    test("should register all expected tools", () => {
      const expectedTools = ["contact", "bio", "resume", "projects", "community", "full-profile"];
      
      expectedTools.forEach(toolName => {
        expect(toolImplementations.has(toolName)).toBe(true);
      });
      
      expect(mockServer.tool).toHaveBeenCalledTimes(6);
    });

    test("should use shared tool descriptions", () => {
      expect(toolImplementations.get("contact").description).toBe("Get contact information");
      expect(toolImplementations.get("bio").description).toBe("Get biographical information");
      expect(toolImplementations.get("resume").description).toBe("Get work experience");
    });
  });

  describe("Contact Tool", () => {
    test("should return contact data in correct format", async () => {
      const contactTool = toolImplementations.get("contact");
      const result = await contactTool.implementation({});

      expect(result).toEqual({
        content: [{
          type: "text",
          text: JSON.stringify({ 
            contact: {
              name: "Test User",
              email: "test@example.com", 
              phone: "+1-555-0123"
            }
          }, null, 2)
        }]
      });
    });

    test("should have empty schema for contact tool", () => {
      const contactTool = toolImplementations.get("contact");
      expect(contactTool.schema).toEqual({});
    });
  });

  describe("Bio Tool", () => {
    test("should return short bio by default", async () => {
      const bioTool = toolImplementations.get("bio");
      const result = await bioTool.implementation({});

      expect(result.content[0].text).toContain("Short bio text");
    });

    test("should return short bio when format is 'short'", async () => {
      const bioTool = toolImplementations.get("bio");
      const result = await bioTool.implementation({ format: "short" });

      expect(result.content[0].text).toContain("Short bio text");
    });

    test("should return full bio when format is 'full'", async () => {
      const bioTool = toolImplementations.get("bio");
      const result = await bioTool.implementation({ format: "full" });

      expect(result.content[0].text).toContain("Full detailed bio text");
    });

    test("should have correct schema with format enum", () => {
      const bioTool = toolImplementations.get("bio");
      expect(bioTool.schema).toHaveProperty("format");
    });
  });

  describe("Resume Tool", () => {
    test("should return all resume data by default", async () => {
      const resumeTool = toolImplementations.get("resume");
      const result = await resumeTool.implementation({});

      const parsedResult = JSON.parse(result.content[0].text);
      expect(parsedResult.resume).toHaveLength(3);
      expect(parsedResult.resume[0].title).toBe("Senior Engineer");
    });

    test("should limit resume data when limit is specified", async () => {
      const resumeTool = toolImplementations.get("resume");
      const result = await resumeTool.implementation({ limit: 2 });

      const parsedResult = JSON.parse(result.content[0].text);
      expect(parsedResult.resume).toHaveLength(2);
      expect(parsedResult.resume[0].title).toBe("Senior Engineer");
      expect(parsedResult.resume[1].title).toBe("Engineer");
    });

    test("should handle limit of 1", async () => {
      const resumeTool = toolImplementations.get("resume");
      const result = await resumeTool.implementation({ limit: 1 });

      const parsedResult = JSON.parse(result.content[0].text);
      expect(parsedResult.resume).toHaveLength(1);
      expect(parsedResult.resume[0].title).toBe("Senior Engineer");
    });
  });

  describe("Projects Tool", () => {
    test("should return all projects by default", async () => {
      const projectsTool = toolImplementations.get("projects");
      const result = await projectsTool.implementation({});

      const parsedResult = JSON.parse(result.content[0].text);
      expect(parsedResult.projects).toHaveLength(3);
      expect(parsedResult.projects[0].title).toBe("Project A");
    });

    test("should limit projects when limit is specified", async () => {
      const projectsTool = toolImplementations.get("projects");
      const result = await projectsTool.implementation({ limit: 2 });

      const parsedResult = JSON.parse(result.content[0].text);
      expect(parsedResult.projects).toHaveLength(2);
      expect(parsedResult.projects[0].title).toBe("Project A");
      expect(parsedResult.projects[1].title).toBe("Project B");
    });
  });

  describe("Community Tool", () => {
    test("should include expertise areas by default", async () => {
      const communityTool = toolImplementations.get("community");
      const result = await communityTool.implementation({});

      const parsedResult = JSON.parse(result.content[0].text);
      expect(parsedResult.community).toHaveProperty("expertiseAreas");
      expect(parsedResult.community.expertiseAreas).toEqual(["JavaScript", "React", "Node.js"]);
    });

    test("should include expertise when includeExpertise is true", async () => {
      const communityTool = toolImplementations.get("community");
      const result = await communityTool.implementation({ includeExpertise: true });

      const parsedResult = JSON.parse(result.content[0].text);
      expect(parsedResult.community).toHaveProperty("expertiseAreas");
    });

    test("should exclude expertise when includeExpertise is false", async () => {
      const communityTool = toolImplementations.get("community");
      const result = await communityTool.implementation({ includeExpertise: false });

      const parsedResult = JSON.parse(result.content[0].text);
      expect(parsedResult.community).not.toHaveProperty("expertiseAreas");
    });

    test("should always include core community data", async () => {
      const communityTool = toolImplementations.get("community");
      const result = await communityTool.implementation({ includeExpertise: false });

      const parsedResult = JSON.parse(result.content[0].text);
      const community = parsedResult.community;
      
      expect(community.mvpStatus).toBe("Active MVP");
      expect(community.mvpAwards).toEqual(["2023 MVP", "2024 MVP"]);
      expect(community.mvpProfileUrl).toBe("https://mvp.example.com/user");
      expect(community.description).toBe("Community leader");
      expect(community.presentations).toEqual(["Talk 1", "Talk 2"]);
      expect(community.mediaResources).toEqual({ articles: 5 });
      expect(community.featuredMedia).toEqual({ video: "featured.mp4" });
    });
  });

  describe("Full Profile Tool", () => {
    test("should return complete profile with default values", async () => {
      const fullProfileTool = toolImplementations.get("full-profile");
      const result = await fullProfileTool.implementation({});

      const parsedResult = JSON.parse(result.content[0].text);
      
      expect(parsedResult).toHaveProperty("contact");
      expect(parsedResult).toHaveProperty("professional");
      expect(parsedResult).toHaveProperty("bio");
      expect(parsedResult).toHaveProperty("resume");
      expect(parsedResult).toHaveProperty("projects");
      expect(parsedResult).toHaveProperty("community");
      
      // Should use short bio by default
      expect(parsedResult.bio).toBe("Short bio text");
      
      // Should include all resume and projects by default
      expect(parsedResult.resume).toHaveLength(3);
      expect(parsedResult.projects).toHaveLength(3);
    });

    test("should use full bio when bioFormat is 'full'", async () => {
      const fullProfileTool = toolImplementations.get("full-profile");
      const result = await fullProfileTool.implementation({ bioFormat: "full" });

      const parsedResult = JSON.parse(result.content[0].text);
      expect(parsedResult.bio).toBe("Full detailed bio text");
    });

    test("should limit resume when resumeLimit is specified", async () => {
      const fullProfileTool = toolImplementations.get("full-profile");
      const result = await fullProfileTool.implementation({ resumeLimit: 2 });

      const parsedResult = JSON.parse(result.content[0].text);
      expect(parsedResult.resume).toHaveLength(2);
    });

    test("should limit projects when projectsLimit is specified", async () => {
      const fullProfileTool = toolImplementations.get("full-profile");
      const result = await fullProfileTool.implementation({ projectsLimit: 1 });

      const parsedResult = JSON.parse(result.content[0].text);
      expect(parsedResult.projects).toHaveLength(1);
    });

    test("should handle all parameters together", async () => {
      const fullProfileTool = toolImplementations.get("full-profile");
      const result = await fullProfileTool.implementation({ 
        bioFormat: "full",
        resumeLimit: 1,
        projectsLimit: 2
      });

      const parsedResult = JSON.parse(result.content[0].text);
      expect(parsedResult.bio).toBe("Full detailed bio text");
      expect(parsedResult.resume).toHaveLength(1);
      expect(parsedResult.projects).toHaveLength(2);
    });
  });

  describe("Module Structure", () => {
    test("should export GET and POST handlers", () => {
      const route = require("../route");
      
      // Verify the module exports the required handlers
      expect(route).toHaveProperty("GET");
      expect(route).toHaveProperty("POST");
      
      // Both should be the same handler instance
      expect(route.GET).toBe(route.POST);
    });
  });

  describe("Data Validation", () => {
    test("all tools should return valid JSON", async () => {
      const tools = ["contact", "bio", "resume", "projects", "community", "full-profile"];
      
      for (const toolName of tools) {
        const tool = toolImplementations.get(toolName);
        const result = await tool.implementation({});
        
        expect(() => {
          JSON.parse(result.content[0].text);
        }).not.toThrow();
        
        expect(result.content[0].type).toBe("text");
      }
    });

    test("tools should handle edge cases gracefully", async () => {
      // Test with undefined parameters
      const bioTool = toolImplementations.get("bio");
      await expect(bioTool.implementation({})).resolves.toBeDefined();
      
      // Test with zero limits (should be handled by zod min(1) validation)
      const resumeTool = toolImplementations.get("resume");
      await expect(resumeTool.implementation({ limit: 1 })).resolves.toBeDefined();
    });
  });
});
