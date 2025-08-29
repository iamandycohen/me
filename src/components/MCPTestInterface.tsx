"use client";

import { useState } from "react";
import MCPExplainer from "@/components/MCPExplainer";
import { getClientBaseUrl } from "@/lib/url-helpers";

export default function MCPTestInterface() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const testMCP = async (method: string, params?: Record<string, unknown>) => {
    setLoading(true);
    try {
      const body = {
        jsonrpc: "2.0",
        method,
        id: Date.now(),
        ...(params && { params }),
      };

      const res = await fetch("/api/mcp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/event-stream",
        },
        body: JSON.stringify(body),
      });

      const responseText = await res.text();

      // Handle Server-Sent Events format
      if (responseText.startsWith("event: message\ndata: ")) {
        const jsonStr = responseText
          .replace("event: message\ndata: ", "")
          .trim();
        const data = JSON.parse(jsonStr);
        setResponse(JSON.stringify(data, null, 2));
      } else {
        // Fallback for regular JSON responses
        try {
          const data = JSON.parse(responseText);
          setResponse(JSON.stringify(data, null, 2));
        } catch {
          setResponse(responseText);
        }
      }
    } catch (error) {
      setResponse(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  };

  const toolTests = [
    {
      name: "Initialize Server",
      method: "initialize",
      params: {
        clientInfo: { name: "web-tester", version: "1.0.0" },
        protocolVersion: "2025-03-26",
        capabilities: {},
      },
    },
    {
      name: "List Tools",
      method: "tools/list",
    },
    {
      name: "Contact Info",
      method: "tools/call",
      params: { name: "contact", arguments: {} },
    },
    {
      name: "Short Bio",
      method: "tools/call",
      params: { name: "bio", arguments: { format: "short" } },
    },
    {
      name: "Full Bio",
      method: "tools/call",
      params: { name: "bio", arguments: { format: "full" } },
    },
    {
      name: "Resume (Top 3)",
      method: "tools/call",
      params: { name: "resume", arguments: { limit: 3 } },
    },
    {
      name: "All Projects",
      method: "tools/call",
      params: { name: "projects", arguments: {} },
    },
    {
      name: "Full Profile",
      method: "tools/call",
      params: {
        name: "full-profile",
        arguments: { bioFormat: "short", resumeLimit: 2 },
      },
    },
    {
      name: "Community Info",
      method: "tools/call",
      params: { name: "community", arguments: {} },
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-12">
        <MCPExplainer variant="detailed" />
      </div>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Interactive MCP Testing
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Test the live MCP server implementation - see how AI agents discover and use structured data
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-blue-800">
            <strong>Server Endpoint:</strong>{" "}
            <code className="bg-blue-100 px-2 py-1 rounded">
              {getClientBaseUrl()}/api/mcp
            </code>
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Test Buttons */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Available Tests</h2>
          <div className="space-y-3">
            {toolTests.map((test, index) => (
              <button
                key={index}
                onClick={() => testMCP(test.method, test.params)}
                disabled={loading}
                className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="font-medium text-gray-900">{test.name}</div>
                <div className="text-sm text-gray-500 mt-1">
                  Method:{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    {test.method}
                  </code>
                </div>
              </button>
            ))}
          </div>

          {/* Status */}
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">
              ✅ MCP Server Status
            </h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>
                • 6 tools registered (contact, bio, resume, projects,
                community, full-profile)
              </li>
              <li>• JSON-RPC 2.0 protocol compliance</li>
              <li>• Vercel MCP Adapter integration</li>
              <li>• Server-Sent Events (SSE) support</li>
            </ul>
          </div>
        </div>

        {/* Response Display */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Response</h2>
          <div className="bg-gray-900 rounded-lg p-4 min-h-96">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : (
              <pre className="text-sm text-gray-100 whitespace-pre-wrap overflow-auto">
                {response || "Click a test button to see the response..."}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Usage Examples</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">cURL Example:</h4>
            <pre className="text-sm bg-gray-800 text-gray-100 p-3 rounded overflow-auto">
              {`curl -X POST ${getClientBaseUrl()}/api/mcp \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "id": 1,
    "params": {
      "name": "bio",
      "arguments": {"format": "short"}
    }
  }'`}
            </pre>
          </div>
          <div>
            <h4 className="font-semibold mb-2">JavaScript Example:</h4>
            <pre className="text-sm bg-gray-800 text-gray-100 p-3 rounded overflow-auto">
              {`const response = await fetch('/api/mcp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/event-stream'
  },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'tools/call',
    id: 1,
    params: {
      name: 'full-profile',
      arguments: {bioFormat: 'short', resumeLimit: 3}
    }
  })
});`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
} 