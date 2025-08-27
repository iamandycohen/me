import { generatePageMetadata } from "@/lib/metadata-generators";
import { getDisplayName } from "@/lib/data-helpers";
import MCPTestInterface from "@/components/MCPTestInterface";
import data from "../../../content/data.json";

const displayName = getDisplayName(data.contact);

export const metadata = generatePageMetadata(
  "MCP Server Test",
  `Test interface for Model Context Protocol server implementation by ${data.contact.name} - interactive testing tools for MCP endpoints and API responses.`,
  data.contact,
  {
    other: {
      "ai:tool-type": "testing,development,api",
      "ai:protocol": "model-context-protocol,json-rpc",
      "technical:api-testing": "true",
      "developer:mcp-server": "true",
    },
    openGraph: {
      title: `${displayName}'s MCP Server - Testing Interface`,
      description: `Interactive testing interface for Model Context Protocol server implementation. Test MCP endpoints, view API responses, and validate server functionality.`,
      type: "website",
    },
  },
  "/mcp-test",
);

export default function MCPTestPage() {
  return <MCPTestInterface />;
}
