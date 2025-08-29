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
  if (mcpClient) {
    return mcpClient;
  }

  if (clientPromise) {
    return clientPromise;
  }

  clientPromise = (async () => {
    try {
      const baseUrl = getConfiguredSiteUrl();
      
      const transport = new StreamableHTTPClientTransport(
        new URL(`${baseUrl}/api/mcp`)
      );
      
      const client = new Client(
        {
          name: "chat-api-client",
          version: "1.0.0"
        },
        {
          capabilities: {}
        }
      );
      
      await client.connect(transport);
      mcpClient = client;
      return client;
    } catch (error) {
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
  try {
    const client = await getMcpClient();
    const response = await client.listTools();
    
    // Convert SDK response to our interface format
    return response.tools.map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema as McpTool['inputSchema']
    }));
  } catch (error) {
    console.error('Error listing MCP tools via SDK:', error);
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
