import { NextRequest, NextResponse } from 'next/server';
import { mcpTools } from '@/lib/mcp-tools';
import { generateOpenApiSpec } from '@/lib/metadata-generators';
import { getCurrentRole } from '@/lib/data-helpers';
import data from '../../../../content/data.json';

// Generate OpenAPI spec using utility
const currentRole = getCurrentRole(data.resume);
const openApiSpec = generateOpenApiSpec(data.contact, currentRole, mcpTools);

export async function GET(request: NextRequest) {
  return NextResponse.json(openApiSpec);
} 