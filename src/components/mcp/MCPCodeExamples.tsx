'use client';

import { useState } from 'react';

interface CodeExample {
  title: string;
  description: string;
  language: string;
  code: string;
  category: 'integration' | 'protocol' | 'discovery';
}

const CODE_EXAMPLES: CodeExample[] = [
  {
    title: "MCP Client Integration",
    description: "How to integrate with this MCP server in your AI application",
    language: "typescript",
    category: "integration",
    code: `// Connect to Andy Cohen's MCP server
import { MCPClient } from '@modelcontextprotocol/sdk';

const client = new MCPClient({
  serverUrl: 'https://iamandycohen.com/api/mcp',
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
curl https://iamandycohen.com/llms.txt
# Returns: Structured instructions for AI agents

# 2. OpenAPI Specification  
curl https://iamandycohen.com/api/docs
# Returns: Complete REST API documentation

# 3. JSON-LD Structured Data
curl -H "Accept: application/ld+json" https://iamandycohen.com/
# Returns: Semantic markup with MCP server info

# 4. MCP Server Discovery
curl -H "Content-Type: application/json" \\
     -d '{"jsonrpc":"2.0","method":"tools/list","id":1}' \\
     https://iamandycohen.com/api/mcp
# Returns: Available MCP tools

# 5. HTTP Headers for Agent Detection
curl -I https://iamandycohen.com/
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

export default function MCPCodeExamples() {
  const [activeCategory, setActiveCategory] = useState<'integration' | 'protocol' | 'discovery'>('integration');
  const [activeExample, setActiveExample] = useState(0);

  const filteredExamples = CODE_EXAMPLES.filter(ex => ex.category === activeCategory);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Code Examples & Integration</h3>
        <p className="text-gray-600">
          See how developers and AI agents can integrate with this MCP server
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'integration' as const, label: '🔧 Integration', desc: 'Client code' },
          { key: 'protocol' as const, label: '📡 Protocol', desc: 'JSON-RPC' },
          { key: 'discovery' as const, label: '🔍 Discovery', desc: 'Agent finding' }
        ].map(({ key, label, desc }) => (
          <button
            key={key}
            onClick={() => {
              setActiveCategory(key);
              setActiveExample(0);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === key
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {label}
            <div className="text-xs opacity-75">{desc}</div>
          </button>
        ))}
      </div>

      {/* Example Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filteredExamples.map((example, index) => (
          <button
            key={index}
            onClick={() => setActiveExample(index)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              activeExample === index
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {example.title}
          </button>
        ))}
      </div>

      {/* Active Example */}
      {filteredExamples[activeExample] && (
        <div>
          <div className="mb-3">
            <h4 className="font-semibold text-gray-900 mb-1">
              {filteredExamples[activeExample].title}
            </h4>
            <p className="text-sm text-gray-600">
              {filteredExamples[activeExample].description}
            </p>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between bg-gray-900 text-white px-4 py-2 rounded-t-lg">
              <span className="text-sm font-mono">
                {filteredExamples[activeExample].language}
              </span>
              <button 
                onClick={() => navigator.clipboard.writeText(filteredExamples[activeExample].code)}
                className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
              >
                Copy
              </button>
            </div>
            <pre className="bg-gray-50 p-4 rounded-b-lg overflow-x-auto text-sm">
              <code className="language-typescript">
                {filteredExamples[activeExample].code}
              </code>
            </pre>
          </div>
        </div>
      )}

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
