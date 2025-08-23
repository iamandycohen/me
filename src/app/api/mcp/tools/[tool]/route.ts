import { NextRequest } from 'next/server';
import { getMCPTool } from '@/lib/mcp-tools';
import { createSuccessResponse, createErrorResponse, createMcpResponse, createMcpError, handleApiError, handleMcpError, createOptionsResponse } from '@/lib/api-helpers';
import { executeMcpTool, validateToolParameters } from '@/lib/mcp-execution';
import data from '../../../../../../content/data.json';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tool: string }> }
) {
  try {
    const { tool } = await params;
    const url = new URL(request.url);
    const format = url.searchParams.get('format');
    const id = url.searchParams.get('id') || 1;
    
    const mcpTool = getMCPTool(tool);
    
    if (!mcpTool) {
      if (format === 'mcp') {
        return createMcpError('Tool not found', -32601, id);
      }
      return createErrorResponse('Tool not found', 404);
    }

    // Return MCP JSON-RPC format
    if (format === 'mcp') {
      return createMcpResponse(mcpTool, id);
    }

    // Default HTTP format
    return createSuccessResponse(mcpTool);
  } catch (error) {
    const url = new URL(request.url);
    const format = url.searchParams.get('format');
    const id = url.searchParams.get('id') || 1;
    
    if (format === 'mcp') {
      return handleMcpError(error, 'MCP tool schema', id);
    }
    return handleApiError(error, 'MCP tool schema');
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ tool: string }> }
) {
  try {
    const { tool } = await params;
    const body = await request.json();
    
    // Handle JSON-RPC MCP request
    if (body.jsonrpc === '2.0') {
      const { method, params: mcpParams = {}, id = 1 } = body;
      
      if (method === 'tools/call') {
        const toolName = mcpParams.name || tool;
        const parameters = mcpParams.arguments || {};
        
        const mcpTool = getMCPTool(toolName);
        if (!mcpTool) {
          return createMcpError('Tool not found', -32601, id);
        }

        // Validate parameters
        const validation = validateToolParameters(toolName, parameters);
        if (!validation.valid) {
          return createMcpError(validation.error!, -32602, id);
        }

        // Execute the tool
        const responseData = executeMcpTool(toolName, parameters, data);
        
        return createMcpResponse({
          content: [
            {
              type: 'text',
              text: JSON.stringify(responseData, null, 2)
            }
          ]
        }, id);
      }
      
      return createMcpError('Method not found', -32601, body.id);
    }

    // Handle regular HTTP request (backward compatibility)
    const mcpTool = getMCPTool(tool);
    if (!mcpTool) {
      return createErrorResponse('Tool not found', 404);
    }

    const parameters = body.parameters || {};

    // Validate parameters
    const validation = validateToolParameters(tool, parameters);
    if (!validation.valid) {
      return createErrorResponse(validation.error!, 400);
    }

    // Execute the tool
    const responseData = executeMcpTool(tool, parameters, data);

    return createSuccessResponse(responseData);
  } catch (error) {
    const body = await request.json().catch(() => ({}));
    
    if (body.jsonrpc === '2.0') {
      return handleMcpError(error, 'MCP tool execution', body.id || 1);
    }
    
    if (error instanceof Error && error.message === 'Unknown tool') {
      return createErrorResponse('Unknown tool', 400);
    }
    return handleApiError(error, 'MCP tool execution');
  }
}

export async function OPTIONS(_request: NextRequest) {
  return createOptionsResponse(['GET', 'POST', 'OPTIONS']);
}
