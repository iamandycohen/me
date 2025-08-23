import { NextRequest } from 'next/server';
import { mcpTools } from '@/lib/mcp-tools';
import { createSuccessResponse, createMcpResponse, handleApiError, handleMcpError, createOptionsResponse } from '@/lib/api-helpers';
import { getCurrentRole } from '@/lib/data-helpers';
import data from '../../../../content/data.json';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const format = url.searchParams.get('format');
    const id = url.searchParams.get('id') || 1;
    
    const currentRole = getCurrentRole(data.resume);
    
    const serverInfo = {
      name: `${data.contact.name} MCP Server`,
      version: '1.0.0',
      protocol: {
        version: '2024-11-05',
        capabilities: {
          tools: {
            listChanged: false
          },
          streaming: true
        }
      },
      server: {
        name: `${data.contact.name} Professional Portfolio`,
        version: '1.0.0',
        description: `MCP server providing programmatic access to ${data.contact.name}'s professional information`,
        author: data.contact.name,
        contact: data.contact.email
      },
      tools: {
        available: mcpTools.length,
        list: mcpTools.map(tool => tool.name)
      },
      endpoints: {
        tools: '/api/mcp/tools',
        discovery: '/api/mcp/tools',
        execution: '/api/mcp/tools/{tool}',
        docs: '/api/docs',
        streaming: true
      },
      meta: {
        profession: currentRole.title,
        company: currentRole.company,
        location: data.contact.location,
        expertise: data.professional.expertise,
        lastUpdated: new Date().toISOString()
      }
    };

    // Return MCP JSON-RPC format
    if (format === 'mcp') {
      return createMcpResponse(serverInfo, id);
    }

    // Default HTTP format
    return createSuccessResponse(serverInfo);
  } catch (error) {
    const format = new URL(request.url).searchParams.get('format');
    const id = new URL(request.url).searchParams.get('id') || 1;
    
    if (format === 'mcp') {
      return handleMcpError(error, 'MCP server info', id);
    }
    return handleApiError(error, 'MCP server info');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Handle JSON-RPC MCP requests
    if (body.jsonrpc === '2.0') {
      const { method, id = 1 } = body;
      
      switch (method) {
        case 'initialize':
          const serverInfo = {
            protocolVersion: '2024-11-05',
            capabilities: {
              tools: {
                listChanged: false
              },
              streaming: true
            },
            serverInfo: {
              name: `${data.contact.name} MCP Server`,
              version: '1.0.0',
              description: `Professional information server for ${data.contact.name}`
            }
          };
          return createMcpResponse(serverInfo, id);
          
        case 'ping':
          return createMcpResponse({ status: 'pong' }, id);
          
        case 'tools/list':
          // Redirect to tools endpoint
          const toolsList = {
            tools: mcpTools.map(tool => ({
              name: tool.name,
              description: tool.description,
              inputSchema: tool.inputSchema
            }))
          };
          return createMcpResponse(toolsList, id);
          
        default:
          return createMcpResponse({
            error: {
              code: -32601,
              message: 'Method not found',
              data: { 
                availableMethods: ['initialize', 'ping', 'tools/list'],
                suggestion: 'Use /api/mcp/tools for tool-specific operations'
              }
            }
          }, id);
      }
    }

    // Fallback for HTTP requests
    return createSuccessResponse({
      message: 'MCP Server Root',
      description: `Model Context Protocol server for ${data.contact.name}`,
      endpoints: {
        tools: '/api/mcp/tools',
        docs: '/api/docs'
      }
    });
  } catch (error) {
    return handleApiError(error, 'MCP server');
  }
}

export async function OPTIONS(_request: NextRequest) {
  return createOptionsResponse(['GET', 'POST', 'OPTIONS']);
} 