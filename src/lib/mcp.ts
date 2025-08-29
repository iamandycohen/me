import type { ChatCompletionTool } from 'openai/resources/chat/completions';

export interface McpTool {
  name: string;
  description?: string;
  inputSchema?: {
    type: string;
    properties?: Record<string, any>;
    required?: string[];
  };
}

export interface McpToolsResponse {
  result?: {
    tools: McpTool[];
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

/**
 * Lists available MCP tools from the /api/mcp endpoint
 */
export async function listMcpTools(): Promise<McpTool[]> {
  // Use relative URL when running server-side, absolute URL when client-side
  const isServerSide = typeof window === 'undefined';
  const url = isServerSide 
    ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/mcp`
    : '/api/mcp';
  

  
  try {
    const body = {
      jsonrpc: "2.0",
      method: 'tools/list',
      id: Date.now(),
      params: {},
    };



    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream',
      },
      body: JSON.stringify(body),
    });



    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ MCP Error response:', errorText);
      throw new Error(`Failed to list MCP tools: ${response.status} - ${errorText}`);
    }

    const responseText = await response.text();
    
    let data: McpToolsResponse;

    try {
      // Handle Server-Sent Events format (matching MCPTestInterface pattern)
      if (responseText.startsWith("event: message\ndata: ")) {
        const jsonStr = responseText
          .replace("event: message\ndata: ", "")
          .trim();

        data = JSON.parse(jsonStr);
      } else {
        // Fallback for regular JSON responses

        data = JSON.parse(responseText);
      }
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      console.error('❌ Failed to parse response:', responseText);
      throw new Error(`Failed to parse MCP response: ${parseError instanceof Error ? parseError.message : 'Unknown parse error'}`);
    }


    return data.result?.tools || [];
  } catch (error) {
    console.error('Error listing MCP tools:', error);
    throw new Error(`Failed to communicate with MCP server: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Calls a specific MCP tool with the given arguments
 */
export async function callMcpTool(name: string, args: Record<string, unknown> = {}): Promise<McpCallResponse> {
  // Use relative URL when running server-side, absolute URL when client-side  
  const isServerSide = typeof window === 'undefined';
  const url = isServerSide 
    ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/mcp`
    : '/api/mcp';
  
  try {
    const body = {
      jsonrpc: "2.0",
      method: 'tools/call',
      id: Date.now(),
      params: {
        name,
        arguments: args,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to call MCP tool '${name}': ${response.status}`);
    }

    const responseText = await response.text();
    let data: McpCallResponse;

    // Handle Server-Sent Events format (matching MCPTestInterface pattern)
    if (responseText.startsWith("event: message\ndata: ")) {
      const jsonStr = responseText
        .replace("event: message\ndata: ", "")
        .trim();
      data = JSON.parse(jsonStr);
    } else {
      // Fallback for regular JSON responses
      data = JSON.parse(responseText);
    }

    return (data as any).result || data;
  } catch (error) {
    console.error(`Error calling MCP tool '${name}':`, error);
    throw new Error(`Failed to call MCP tool '${name}': ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Converts MCP tool schema to OpenAI function tool format
 */
export function convertMcpToolToOpenAI(mcpTool: McpTool): ChatCompletionTool {
  return {
    type: 'function',
    function: {
      name: mcpTool.name,
      description: mcpTool.description || `Calls the ${mcpTool.name} tool`,
      parameters: mcpTool.inputSchema || {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  };
}
