import type { Contact, Role, Bio, Project } from "@/types";

interface McpData {
  contact: Contact;
  bio: Bio;
  resume: Role[];
  projects: Project[];
}

// Execute MCP tool and return appropriate data
export function executeMcpTool(
  toolName: string,
  parameters: Record<string, any>,
  data: McpData
): any {
  switch (toolName) {
    case "contact":
      return executeContactTool(parameters, data);
    case "bio":
      return executeBioTool(parameters, data);
    case "resume":
      return executeResumeTool(parameters, data);
    case "projects":
      return executeProjectsTool(parameters, data);
    default:
      throw new Error("Unknown tool");
  }
}

// Execute contact tool
function executeContactTool(parameters: Record<string, any>, data: McpData) {
  return { contact: data.contact };
}

// Execute bio tool
function executeBioTool(parameters: Record<string, any>, data: McpData) {
  const format = parameters.format || "full";
  const bio = format === "short" ? data.bio.short : data.bio.full;
  return { bio };
}

// Execute resume tool
function executeResumeTool(parameters: Record<string, any>, data: McpData) {
  const limit = parameters.limit || data.resume.length;
  const resume = data.resume.slice(0, limit);
  return { resume };
}

// Execute projects tool
function executeProjectsTool(parameters: Record<string, any>, data: McpData) {
  const limit = parameters.limit || data.projects.length;
  const projects = data.projects.slice(0, limit);
  return { projects };
}

// Validate tool parameters
export function validateToolParameters(
  toolName: string,
  parameters: Record<string, any>
): { valid: boolean; error?: string } {
  switch (toolName) {
    case "contact":
      return { valid: true };

    case "bio":
      if (parameters.format && !["short", "full"].includes(parameters.format)) {
        return {
          valid: false,
          error: 'format must be either "short" or "full"',
        };
      }
      return { valid: true };

    case "resume":
      if (
        parameters.limit &&
        (typeof parameters.limit !== "number" || parameters.limit < 1)
      ) {
        return { valid: false, error: "limit must be a positive number" };
      }
      return { valid: true };

    case "projects":
      if (
        parameters.limit &&
        (typeof parameters.limit !== "number" || parameters.limit < 1)
      ) {
        return { valid: false, error: "limit must be a positive number" };
      }
      return { valid: true };

    default:
      return { valid: false, error: "Unknown tool" };
  }
}
