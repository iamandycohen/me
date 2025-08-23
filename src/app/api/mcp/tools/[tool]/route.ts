import { NextRequest } from 'next/server';
import { getMCPTool } from '@/lib/mcp-tools';
import { createSuccessResponse, createErrorResponse, handleApiError, createOptionsResponse } from '@/lib/api-helpers';
import { executeMcpTool, validateToolParameters } from '@/lib/mcp-execution';
import data from '../../../../../../content/data.json';

export async function GET(
  request: NextRequest,
  { params }: { params: { tool: string } }
) {
  try {
    const tool = getMCPTool(params.tool);
    
    if (!tool) {
      return createErrorResponse('Tool not found', 404);
    }

    return createSuccessResponse(tool);
  } catch (error) {
    return handleApiError(error, 'MCP tool schema');
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { tool: string } }
) {
  try {
    const tool = getMCPTool(params.tool);
    
    if (!tool) {
      return createErrorResponse('Tool not found', 404);
    }

    const body = await request.json();
    const parameters = body.parameters || {};

    // Validate parameters
    const validation = validateToolParameters(params.tool, parameters);
    if (!validation.valid) {
      return createErrorResponse(validation.error!, 400);
    }

    // Execute the tool
    const responseData = executeMcpTool(params.tool, parameters, data);

    return createSuccessResponse(responseData);
  } catch (error) {
    if (error instanceof Error && error.message === 'Unknown tool') {
      return createErrorResponse('Unknown tool', 400);
    }
    return handleApiError(error, 'MCP tool execution');
  }
}

export async function OPTIONS(request: NextRequest) {
  return createOptionsResponse(['GET', 'POST', 'OPTIONS']);
} 