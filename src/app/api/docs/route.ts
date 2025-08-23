import { NextRequest, NextResponse } from 'next/server';
import { mcpTools } from '@/lib/mcp-tools';
import { generateOpenApiSpec } from '@/lib/metadata-generators';
import { getCurrentRole } from '@/lib/data-helpers';
import data from '../../../../content/data.json';

// Get current role for dynamic content
const currentRole = getCurrentRole(data.resume);

// Generate OpenAPI spec using utility
const openApiSpec = generateOpenApiSpec(data.contact, currentRole, mcpTools);

export async function GET(_request: NextRequest) {
  return NextResponse.json(openApiSpec);
} 