import { NextResponse } from 'next/server';

// CORS headers used across multiple API routes
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Create CORS headers with custom methods
export function createCorsHeaders(methods: string[] = ['GET', 'POST', 'OPTIONS']) {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': methods.join(', '),
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// Standardized error responses
export function createErrorResponse(
  message: string,
  status: number = 500,
  customHeaders: Record<string, string> = {}
) {
  return NextResponse.json(
    { success: false, error: message },
    {
      status,
      headers: { ...corsHeaders, ...customHeaders },
    }
  );
}

// Standardized success responses
export function createSuccessResponse(
  data: any,
  customHeaders: Record<string, string> = {}
) {
  return NextResponse.json(
    { success: true, data },
    {
      headers: { ...corsHeaders, ...customHeaders },
    }
  );
}

// Handle API errors consistently
export function handleApiError(error: unknown, context: string = 'API'): NextResponse {
  console.error(`Error in ${context}:`, error);
  return createErrorResponse('Internal server error', 500);
}

// Create OPTIONS response for CORS preflight
export function createOptionsResponse(methods: string[] = ['GET', 'POST', 'OPTIONS']) {
  return new NextResponse(null, {
    status: 200,
    headers: createCorsHeaders(methods),
  });
} 