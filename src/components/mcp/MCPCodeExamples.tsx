import { getConfiguredSiteUrl } from '@/lib/url-helpers';
import MCPCodeExamplesClient from './MCPCodeExamplesClient';

interface CodeExample {
  title: string;
  description: string;
  language: string;
  code: string;
  category: 'integration' | 'protocol' | 'discovery';
}

function getCodeExamples(siteUrl: string): CodeExample[] {
  return [
    {
      title: "MCP Client Integration",
      description: "How to integrate with this MCP server in your AI application",
      language: "typescript",
      category: "integration",
      code: `// Connect to Andy Cohen's MCP server
import { MCPClient } from '@modelcontextprotocol/sdk';

const client = new MCPClient({
  serverUrl: '${siteUrl}/api/mcp',
  transport: 'sse' // Server-sent events
});

// Initialize connection
await client.connect();
await client.initialize({
  clientInfo: { name: 'MyAI', version: '1.0' },
  protocolVersion: '2025-03-26'
});

// Get available tools
const tools = await client.listTools();
console.log('Available tools:', tools);

// Call a tool
const bio = await client.callTool({
  name: 'bio',
  arguments: { format: 'short' }
});

console.log('Andy's bio:', bio.content);`
  },
  {
    title: "JSON-RPC Protocol Flow",
    description: "Raw protocol communication showing MCP's JSON-RPC 2.0 implementation",
    language: "json",
    category: "protocol",
    code: `// 1. Client initializes connection
{
  "jsonrpc": "2.0",
  "method": "initialize",
  "params": {
    "clientInfo": { "name": "AI-Agent", "version": "1.0" },
    "protocolVersion": "2025-03-26",
    "capabilities": {}
  },
  "id": 1
}

// 2. Server responds with capabilities
{
  "jsonrpc": "2.0",
  "result": {
    "serverInfo": { "name": "AndyCohen-MCP", "version": "1.0" },
    "capabilities": {
      "tools": { "listChanged": true },
      "resources": {}
    }
  },
  "id": 1
}

// 3. Client calls a tool
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "resume",
    "arguments": { "limit": 3 }
  },
  "id": 2
}`
  },
  {
    title: "Agent Discovery Standards",
    description: "Multiple discovery methods for AI agents to find this server",
    language: "bash",
    category: "discovery",
    code: `# 1. LLM Agent Instructions
curl ${siteUrl}/llms.txt
# Returns: Structured instructions for AI agents

# 2. OpenAPI Specification  
curl ${siteUrl}/api/docs
# Returns: Complete REST API documentation

# 3. JSON-LD Structured Data
curl -H "Accept: application/ld+json" ${siteUrl}/
# Returns: Semantic markup with MCP server info

# 4. MCP Server Discovery
curl -H "Content-Type: application/json" \\
     -d '{"jsonrpc":"2.0","method":"tools/list","id":1}' \\
     ${siteUrl}/api/mcp
# Returns: Available MCP tools

# 5. HTTP Headers for Agent Detection
curl -I ${siteUrl}/
# Look for: X-MCP-Server: available`
  },
  {
    title: "Advanced Tool Composition",
    description: "How AI agents can chain multiple MCP tools for complex queries",
    language: "typescript",
    category: "integration",
    code: `// AI agent workflow for complex query:
// "Create an executive summary of Andy's background"

async function createExecutiveSummary() {
  // 1. Get basic info
  const contact = await mcpClient.callTool({ name: 'contact' });
  const bio = await mcpClient.callTool({ 
    name: 'bio', 
    arguments: { format: 'full' } 
  });
  
  // 2. Get recent experience
  const resume = await mcpClient.callTool({ 
    name: 'resume', 
    arguments: { limit: 5 } 
  });
  
  // 3. Get notable projects
  const projects = await mcpClient.callTool({ 
    name: 'projects', 
    arguments: { limit: 3 } 
  });
  
  // 4. Get community impact
  const community = await mcpClient.callTool({ name: 'community' });
  
  // 5. AI synthesizes all data into executive summary
  return synthesizeExecutiveSummary({
    contact, bio, resume, projects, community
  });
}

// This is exactly what happens in the chat interface!`
    }
  ];
}

export default function MCPCodeExamples() {
  const siteUrl = getConfiguredSiteUrl();
  const codeExamples = getCodeExamples(siteUrl);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Code Examples & Integration</h3>
        <p className="text-gray-600">
          See how developers and AI agents can integrate with this MCP server
        </p>
      </div>

      {/* Interactive client component */}
      <MCPCodeExamplesClient examples={codeExamples} />

      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
        <div className="flex items-start gap-3">
          <span className="text-green-600 text-lg">✨</span>
          <div>
            <h4 className="font-medium text-green-900 mb-1">Production Ready</h4>
            <p className="text-sm text-green-700">
              This MCP server is running in production right now. The chat interface above uses these exact patterns 
              to provide AI-powered assistance with real-time tool calls.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
