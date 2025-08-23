import { NextRequest } from 'next/server';
import { mcpTools } from '@/lib/mcp-tools';
import { createSuccessResponse, createMcpResponse, createMcpError, handleApiError, handleMcpError, createOptionsResponse } from '@/lib/api-helpers';
import data from '../../../../../content/data.json';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const format = url.searchParams.get('format'); // 'mcp' for JSON-RPC or 'http' (default)
    const id = url.searchParams.get('id') || 1;

    const response = {
      tools: mcpTools,
      version: '1.0.0',
      description: `${data.contact.name}'s personal MCP tools for agent integration. Access professional information programmatically through standardized tool interfaces.`,
      protocol: 'mcp',
      capabilities: {
        tools: {
          listChanged: false
        }
      }
    };

    // Return MCP JSON-RPC format for actual MCP clients
    if (format === 'mcp') {
      return createMcpResponse(response, id);
    }

    // Default HTTP format for browsers/testing
    return createSuccessResponse(response);
  } catch (error) {
    const format = new URL(request.url).searchParams.get('format');
    const id = new URL(request.url).searchParams.get('id') || 1;
    
    if (format === 'mcp') {
      return handleMcpError(error, 'MCP tools discovery', id);
    }
    return handleApiError(error, 'MCP tools discovery');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Handle JSON-RPC MCP request
    if (body.jsonrpc === '2.0') {
      const { method, id = 1 } = body;
      
      if (method === 'tools/list') {
        const response = {
          tools: mcpTools.map(tool => ({
            name: tool.name,
            description: tool.description,
            inputSchema: tool.inputSchema
          }))
        };
        
        return createMcpResponse(response, id);
      }
      
      return createMcpError('Method not found', -32601, id);
    }

    // Fallback to regular HTTP response
    const response = {
      tools: mcpTools,
      version: '1.0.0',
      description: `${data.contact.name}'s personal MCP tools for agent integration.`
    };
    
    return createSuccessResponse(response);
  } catch (error) {
    return handleApiError(error, 'MCP tools request');
  }
}

export async function OPTIONS(_request: NextRequest) {
  return createOptionsResponse(['GET', 'POST', 'OPTIONS']);
} 