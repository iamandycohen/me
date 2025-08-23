import { NextRequest } from 'next/server';
import { mcpTools } from '@/lib/mcp-tools';
import { createSuccessResponse, handleApiError, createOptionsResponse } from '@/lib/api-helpers';
import data from '../../../../../content/data.json';

export async function GET(_request: NextRequest) {
  try {
    const response = {
      tools: mcpTools,
      version: '1.0.0',
      description: `${data.contact.name}'s personal MCP tools for agent integration. Access professional information programmatically through standardized tool interfaces.`,
    };
    
    return createSuccessResponse(response);
  } catch (error) {
    return handleApiError(error, 'MCP tools discovery');
  }
}

export async function OPTIONS(_request: NextRequest) {
  return createOptionsResponse(['GET', 'OPTIONS']);
} 