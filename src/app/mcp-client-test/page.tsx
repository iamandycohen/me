'use client';

import { useState, useEffect } from 'react';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';
import { getConfiguredSiteUrl } from '@/lib/url-helpers';

interface Tool {
  name: string;
  description?: string;
  inputSchema?: any;
}

interface ToolResult {
  content?: Array<{
    type: string;
    text: string;
  }>;
}

function DevOnlyWrapper({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <h1 className="text-2xl font-bold text-red-900 mb-2">
              🚫 Development Only
            </h1>
            <p className="text-red-700">
              This MCP Client Test page is only available in development mode.
            </p>
          </div>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

function MCPClientTestPageContent() {
  const [client, setClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, any>>({});
  const [logs, setLogs] = useState<string[]>([]);

  const log = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const connectToMCP = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const siteUrl = getConfiguredSiteUrl();
      log(`Connecting to MCP server at ${siteUrl}/api/mcp`);
      
      // Create SSE transport
      const transport = new SSEClientTransport(
        new URL(`${siteUrl}/api/mcp`)
      );
      
      // Create client
      const mcpClient = new Client(
        {
          name: "MCP-Test-Client",
          version: "1.0.0"
        },
        {
          capabilities: {}
        }
      );
      
      // Connect
      await mcpClient.connect(transport);
      log('Connected to MCP server');
      
      setClient(mcpClient);
      setConnected(true);
      
      // List available tools
      const toolsList = await mcpClient.listTools();
      log(`Found ${toolsList.tools.length} tools`);
      setTools(toolsList.tools);
      
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(`Connection failed: ${errorMsg}`);
      log(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const callTool = async (toolName: string, args: Record<string, any> = {}) => {
    if (!client) return;
    
    setLoading(true);
    log(`Calling tool: ${toolName} with args: ${JSON.stringify(args)}`);
    
    try {
      const result = await client.callTool({
        name: toolName,
        arguments: args
      });
      
      setResults(prev => ({
        ...prev,
        [toolName]: result
      }));
      
      log(`Tool ${toolName} completed successfully`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(`Tool call failed: ${errorMsg}`);
      log(`Tool ${toolName} failed: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    if (client) {
      client.close();
      setClient(null);
      setConnected(false);
      setTools([]);
      setResults({});
      log('Disconnected from MCP server');
    }
  };

  useEffect(() => {
    return () => {
      if (client) {
        client.close();
      }
    };
  }, [client]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            MCP Client SDK Test
          </h1>
          <p className="text-gray-600 mb-6">
            Testing real MCP client connection using @modelcontextprotocol/sdk
          </p>

          {/* Connection Controls */}
          <div className="flex gap-4 items-center mb-6">
            {!connected ? (
              <button
                onClick={connectToMCP}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? 'Connecting...' : 'Connect to MCP Server'}
              </button>
            ) : (
              <button
                onClick={disconnect}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Disconnect
              </button>
            )}
            
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span className="text-sm text-gray-600">
                {connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
        </div>

        {connected && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Available Tools */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Available Tools ({tools.length})
              </h2>
              
              <div className="space-y-3">
                {tools.map((tool) => (
                  <div key={tool.name} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{tool.name}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => callTool(tool.name)}
                          disabled={loading}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-sm font-medium disabled:opacity-50"
                        >
                          Call
                        </button>
                        {tool.name === 'bio' && (
                          <button
                            onClick={() => callTool(tool.name, { format: 'full' })}
                            disabled={loading}
                            className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded text-sm font-medium disabled:opacity-50"
                          >
                            Full Bio
                          </button>
                        )}
                        {tool.name === 'resume' && (
                          <button
                            onClick={() => callTool(tool.name, { limit: 3 })}
                            disabled={loading}
                            className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded text-sm font-medium disabled:opacity-50"
                          >
                            Recent
                          </button>
                        )}
                      </div>
                    </div>
                    {tool.description && (
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Tool Results
              </h2>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {Object.entries(results).map(([toolName, result]) => (
                  <div key={toolName} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      {toolName}
                    </h3>
                    <div className="bg-gray-50 rounded p-3">
                      <pre className="text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto">
                        {result.content 
                          ? result.content.map((item: any) => item.text).join('\n')
                          : JSON.stringify(result, null, 2)
                        }
                      </pre>
                    </div>
                  </div>
                ))}
                
                {Object.keys(results).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No results yet. Try calling some tools!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Connection Logs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Connection Logs
          </h2>
          
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
            {logs.length === 0 && (
              <div className="text-gray-500">No logs yet...</div>
            )}
          </div>
        </div>

        {/* SDK Info */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6 mt-6">
          <div className="flex items-start gap-3">
            <span className="text-blue-600 text-lg">⚡</span>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Using Official MCP SDK</h4>
              <p className="text-sm text-blue-700">
                This page demonstrates the real <code>@modelcontextprotocol/sdk</code> package 
                connecting to your live MCP server via Server-Sent Events transport.
              </p>
            </div>
          </div>
        </div>

        {/* Built-in CLI Tool Info */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6 mt-6">
          <div className="flex items-start gap-3">
            <span className="text-green-600 text-lg">🔧</span>
            <div>
              <h4 className="font-medium text-green-900 mb-2">Built-in Interactive CLI Client</h4>
              <p className="text-sm text-green-700 mb-3">
                The MCP SDK includes a powerful interactive CLI client for testing. Run it in your terminal:
              </p>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                <div className="text-gray-400"># In your project directory:</div>
                <div>node node_modules/@modelcontextprotocol/sdk/dist/esm/examples/client/simpleStreamableHttp.js</div>
                <div className="text-gray-400 mt-2"># Then try commands like:</div>
                <div>connect {getConfiguredSiteUrl()}/api/mcp</div>
                <div>list-tools</div>
                <div>call-tool bio {`{"format": "short"}`}</div>
                <div>call-tool resume {`{"limit": 3}`}</div>
              </div>
              <p className="text-xs text-green-600 mt-2">
                Much more powerful than this web interface - includes error handling, session management, and all MCP features!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MCPClientTestPage() {
  return (
    <DevOnlyWrapper>
      <MCPClientTestPageContent />
    </DevOnlyWrapper>
  );
}
