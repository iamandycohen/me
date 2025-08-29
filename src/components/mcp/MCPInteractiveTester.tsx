"use client";

import { useState } from "react";
import { getClientBaseUrl } from "@/lib/url-helpers";

export default function MCPInteractiveTester() {
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

      if (res.headers.get("content-type")?.includes("text/event-stream")) {
        // Handle SSE response
        const lines = responseText.split("\n");
        let jsonResponse = "";
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data !== "[DONE]") {
              jsonResponse += data;
            }
          }
        }
        setResponse(jsonResponse || "No data received");
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
      name: "Resume (Latest 3)",
      method: "tools/call",
      params: { name: "resume", arguments: { limit: 3 } },
    },
    {
      name: "Projects",
      method: "tools/call",
      params: { name: "projects", arguments: {} },
    },
    {
      name: "Community",
      method: "tools/call",
      params: { name: "community", arguments: {} },
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Interactive Testing Interface
        </h2>
        <p className="text-lg text-gray-600 mb-6">
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

        {/* Test Buttons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {toolTests.map((test, index) => (
            <button
              key={index}
              onClick={() => testMCP(test.method, test.params)}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 text-sm font-medium transition-colors"
              title={`Test: ${test.method}`}
            >
              {loading ? "..." : test.name}
            </button>
          ))}
        </div>

        {/* Response Display */}
        <div className="bg-gray-50 border border-gray-300 rounded-lg">
          <div className="bg-gray-200 px-4 py-2 border-b border-gray-300 flex justify-between items-center">
            <span className="font-medium text-gray-700">Response:</span>
            {response && (
              <button
                onClick={() => navigator.clipboard.writeText(response)}
                className="text-sm bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded"
              >
                Copy
              </button>
            )}
          </div>
          <div className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-gray-600">Testing MCP server...</span>
              </div>
            ) : (
              <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words max-h-96 overflow-auto">
                {response || "Click a test button to see the response..."}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Simple Usage Examples */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Examples</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">cURL:</h4>
            <pre className="text-sm bg-gray-800 text-gray-100 p-3 rounded overflow-auto">
              {`curl -X POST ${getClientBaseUrl()}/api/mcp \\
  -H "Content-Type: application/json" \\
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
            <h4 className="font-semibold mb-2">JavaScript:</h4>
            <pre className="text-sm bg-gray-800 text-gray-100 p-3 rounded overflow-auto">
              {`const response = await fetch('/api/mcp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
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
