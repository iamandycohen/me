import type { ChatCompletionTool } from 'openai/resources/chat/completions';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { getConfiguredSiteUrl } from '@/lib/url-helpers';

export interface McpTool {
  name: string;
  description?: string;
  inputSchema?: {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    properties?: Record<string, any>;
    required?: string[];
  };
}

export interface McpCallResponse {
  result?: {
    content: Array<{
      type: string;
      text: string;
    }>;
  };
}

// Singleton MCP client for server-side usage
let mcpClient: Client | null = null;
let clientPromise: Promise<Client> | null = null;

/**
 * Gets or creates a singleton MCP client for server-side usage
 */
async function getMcpClient(): Promise<Client> {
  const startTime = Date.now();
  console.log(`🔌 [${startTime}] MCP Client: getMcpClient() called`);

  if (mcpClient) {
    console.log(`♻️ [${Date.now()}] MCP Client: Returning existing client (+${Date.now() - startTime}ms)`);
    return mcpClient;
  }

  if (clientPromise) {
    console.log(`⏳ [${Date.now()}] MCP Client: Waiting for existing connection promise (+${Date.now() - startTime}ms)`);
    return clientPromise;
  }

  clientPromise = (async () => {
    const connectionStartTime = Date.now();
    console.log(`🚀 [${connectionStartTime}] MCP Client: Starting new connection...`);

    try {
      // For server-side usage, we need to connect to the MCP server
      // Add timeout to prevent hanging on self-referential calls
      const urlStartTime = Date.now();
      const baseUrl = getConfiguredSiteUrl();
      const mcpUrl = `${baseUrl}/api/mcp`;
      console.log(`🌐 [${Date.now()}] MCP Client: URL resolved to ${mcpUrl} (+${Date.now() - urlStartTime}ms)`);

      const transportStartTime = Date.now();
      const transport = new StreamableHTTPClientTransport(
        new URL(mcpUrl)
      );
      console.log(`🚛 [${Date.now()}] MCP Client: Transport created (+${Date.now() - transportStartTime}ms)`);

      const clientCreateStartTime = Date.now();
      const client = new Client(
        {
          name: "chat-api-client",
          version: "1.0.0"
        },
        {
          capabilities: {}
        }
      );
      console.log(`👤 [${Date.now()}] MCP Client: Client instance created (+${Date.now() - clientCreateStartTime}ms)`);

      // Add timeout to prevent hanging
      const connectStartTime = Date.now();
      console.log(`🔗 [${connectStartTime}] MCP Client: Starting connection to ${mcpUrl}...`);

      const connectPromise = client.connect(transport);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('MCP connection timeout after 5000ms')), 5000)
      );

      await Promise.race([connectPromise, timeoutPromise]);
      const connectEndTime = Date.now();
      console.log(`✅ [${connectEndTime}] MCP Client: Connection successful (+${connectEndTime - connectStartTime}ms)`);

      mcpClient = client;
      console.log(`🎉 [${connectEndTime}] MCP Client: getMcpClient() completed successfully (+${connectEndTime - startTime}ms total)`);
      return client;
    } catch (error) {
      const errorTime = Date.now();
      console.error(`❌ [${errorTime}] MCP Client: Connection failed (+${errorTime - startTime}ms):`, error);
      clientPromise = null; // Reset on error to allow retry
      throw error;
    }
  })();

  return clientPromise;
}

/**
 * Lists available MCP tools using the official MCP SDK
 */
export async function listMcpTools(): Promise<McpTool[]> {
  const startTime = Date.now();
  console.log(`🔧 [${startTime}] MCP SDK: listMcpTools() called`);

  try {
    const clientStartTime = Date.now();
    console.log(`🔌 [${clientStartTime}] MCP SDK: Getting client...`);
    const client = await getMcpClient();
    const clientEndTime = Date.now();
    console.log(`✅ [${clientEndTime}] MCP SDK: Client obtained (+${clientEndTime - clientStartTime}ms)`);

    const listToolsStartTime = Date.now();
    console.log(`📋 [${listToolsStartTime}] MCP SDK: Calling client.listTools()...`);
    const response = await client.listTools();
    const listToolsEndTime = Date.now();
    console.log(`✅ [${listToolsEndTime}] MCP SDK: listTools() completed (+${listToolsEndTime - listToolsStartTime}ms)`);

    // Convert SDK response to our interface format
    const convertStartTime = Date.now();
    const result = response.tools.map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema as McpTool['inputSchema']
    }));
    const convertEndTime = Date.now();
    console.log(`🔄 [${convertEndTime}] MCP SDK: Conversion completed (+${convertEndTime - convertStartTime}ms)`);
    console.log(`🎉 [${convertEndTime}] MCP SDK: listMcpTools() finished successfully (+${convertEndTime - startTime}ms total)`);

    return result;
  } catch (error) {
    const errorTime = Date.now();
    console.error(`❌ [${errorTime}] MCP SDK: listMcpTools() failed (+${errorTime - startTime}ms):`, error);
    throw new Error(`Failed to list MCP tools: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Calls a specific MCP tool using the official MCP SDK
 */
export async function callMcpTool(name: string, args: Record<string, unknown> = {}): Promise<McpCallResponse> {
  try {
    const client = await getMcpClient();
    const result = await client.callTool({
      name,
      arguments: args
    });

    // Convert SDK response to our interface format
    if (result.content && Array.isArray(result.content)) {
      return {
        result: {
          content: result.content
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter((item: any) => item.type === 'text' && item.text)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((item: any) => ({
              type: item.type,
              text: item.text
            }))
        }
      };
    }

    // Fallback for non-standard responses
    return {
      result: {
        content: [{
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }]
      }
    };
  } catch (error) {
    console.error(`Error calling MCP tool '${name}' via SDK:`, error);
    throw new Error(`Failed to call MCP tool '${name}': ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Converts an MCP tool to OpenAI function format
 */
export function convertMcpToolToOpenAI(tool: McpTool): ChatCompletionTool {
  return {
    type: 'function',
    function: {
      name: tool.name,
      description: tool.description || `Execute the ${tool.name} tool`,
      parameters: tool.inputSchema || {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  };
}

/**
 * Cleanup function to close the MCP client connection
 */
export async function closeMcpClient(): Promise<void> {
  if (mcpClient) {
    try {
      await mcpClient.close();
    } catch (error) {
      console.error('Error closing MCP client:', error);
    }
    mcpClient = null;
    clientPromise = null;
  }
}
