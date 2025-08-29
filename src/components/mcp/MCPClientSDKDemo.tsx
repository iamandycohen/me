'use client';

import { useState, useEffect, useCallback } from 'react';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { getConfiguredSiteUrl } from '@/lib/url-helpers';

interface Tool {
  name: string;
  description?: string;
  inputSchema?: Record<string, unknown>;
}

// Use any for MCP SDK result to avoid complex type issues
interface ToolResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any[];
  [key: string]: unknown;
}

export default function MCPClientSDKDemo() {
  const [client, setClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, unknown>>({});
  const [logs, setLogs] = useState<string[]>([]);

  const log = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-4), `${timestamp}: ${message}`]);
  };

  const connect = useCallback(async () => {
    if (connected) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const siteUrl = getConfiguredSiteUrl();
      log('Connecting to MCP server...');
      
      const transport = new StreamableHTTPClientTransport(
        new URL(`${siteUrl}/api/mcp`)
      );
      
      const mcpClient = new Client(
        {
          name: "AI-Tools-Demo-Client",
          version: "1.0.0"
        },
        {
          capabilities: {}
        }
      );
      
      await mcpClient.connect(transport);
      log('✅ Connected to MCP server');
      
      // List tools
      const toolsList = await mcpClient.listTools();
      log(`📋 Found ${toolsList.tools.length} tools`);
      
      setClient(mcpClient);
      setTools(toolsList.tools);
      setConnected(true);
      
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      log(`❌ Connection failed: ${errorMsg}`);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [connected]);

  const disconnect = async () => {
    if (client) {
      try {
        await client.close();
        log('Disconnected from MCP server');
      } catch (err) {
        console.error('Error during disconnect:', err);
      }
    }
    
    setClient(null);
    setConnected(false);
    setTools([]);
    setResults({});
  };

  const callTool = async (toolName: string, args: Record<string, unknown> = {}) => {
    if (!client || !connected) return;
    
    setLoading(true);
    try {
      log(`🔧 Calling ${toolName}...`);
      
      const result: ToolResult = await client.callTool({
        name: toolName,
        arguments: args
      });
      
      // Extract text content from result
      let resultText = '';
      if (result.content && Array.isArray(result.content)) {
        resultText = result.content
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((item: any) => item.type === 'text' && item.text)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((item: any) => item.text)
          .join('\n');
      }
      
      setResults(prev => ({
        ...prev,
        [`${toolName}${Object.keys(args).length ? ` (${JSON.stringify(args)})` : ''}`]: resultText || 'No result'
      }));
      
      log(`✅ ${toolName} completed`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      log(`❌ ${toolName} failed: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  // Auto-connect on mount
  useEffect(() => {
    connect();
  }, [connect]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">MCP Client SDK Test</h3>
            <p className="text-sm text-gray-600 mt-1">
              Testing real MCP client connection using <code>@modelcontextprotocol/sdk</code>
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {connected ? (
              <>
                <button
                  onClick={disconnect}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Disconnect
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-700 font-medium">Connected</span>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={connect}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  {loading ? 'Connecting...' : 'Connect'}
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Disconnected</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="text-red-800 font-medium">Connection Error</div>
            <div className="text-red-700 text-sm mt-1">{error}</div>
          </div>
        )}

        <div className="flex gap-8 w-full max-h-[70vh] min-h-[600px]">
          {/* Available Tools */}
          <div className="flex flex-col w-1/4 min-h-0">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex-shrink-0">
              Available Tools ({tools.length})
            </h4>
            
            {connected && tools.length > 0 ? (
              <div className="flex-1 min-h-0 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
                {tools.map((tool) => (
                  <div key={tool.name} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow flex-shrink-0">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{tool.name}</h5>
                      <div className="flex gap-2">
                        <button
                          onClick={() => callTool(tool.name)}
                          disabled={loading}
                          className="px-3 py-1 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-800 disabled:text-gray-500 text-sm rounded font-medium transition-colors"
                        >
                          Call
                        </button>
                        {tool.name === 'bio' && (
                          <button
                            onClick={() => callTool(tool.name, { format: 'full' })}
                            disabled={loading}
                            className="px-3 py-1 bg-purple-100 hover:bg-purple-200 disabled:bg-gray-100 text-purple-800 disabled:text-gray-500 text-sm rounded font-medium transition-colors"
                          >
                            Full Bio
                          </button>
                        )}
                        {tool.name === 'resume' && (
                          <button
                            onClick={() => callTool(tool.name, { limit: 3 })}
                            disabled={loading}
                            className="px-3 py-1 bg-green-100 hover:bg-green-200 disabled:bg-gray-100 text-green-800 disabled:text-gray-500 text-sm rounded font-medium transition-colors"
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
            ) : (
              <div className="flex-1 min-h-0 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-2">🔧</div>
                  <div>{connected ? 'No tools available' : 'Connect to view available tools'}</div>
                </div>
              </div>
            )}
          </div>

          {/* Tool Results */}
          <div className="flex flex-col flex-1 min-h-0">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex-shrink-0">Tool Results</h4>
            
            {Object.keys(results).length > 0 ? (
              <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="space-y-3">
                  {Object.entries(results).reverse().map(([call, result]) => (
                    <div key={call} className="border border-gray-200 rounded-lg bg-white flex-shrink-0 shadow-sm">
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-3 border-b border-gray-200 rounded-t-lg">
                        <div className="font-medium text-blue-900">{call}</div>
                      </div>
                      <div className="p-0">
                        <div className="bg-gray-50 rounded-b-lg overflow-hidden w-full">
                          <pre className="text-sm text-gray-800 p-6 overflow-auto max-h-96 leading-relaxed font-mono whitespace-pre-wrap w-full break-words">
                            {(() => {
                              try {
                                const parsed = JSON.parse(String(result));
                                return JSON.stringify(parsed, null, 2);
                              } catch {
                                return String(result);
                              }
                            })()}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 min-h-0 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <div>Call a tool to see results here</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Connection Logs */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Connection Logs</h4>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-32 overflow-y-auto">
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
                This demonstrates the real <code>@modelcontextprotocol/sdk</code> package 
                connecting to your live MCP server via StreamableHTTP transport.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
