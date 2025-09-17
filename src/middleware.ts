import { NextRequest, NextResponse } from 'next/server';
import { createCorsResponse } from '@/lib/cors-handler';

/**
 * Simplified middleware for CORS and basic request handling
 * 
 * Rate limiting is now handled in individual API routes using the same Redis
 * instance as your MCP handler for consistency.
 */

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle CORS preflight requests for chat and MCP endpoints
  if (request.method === 'OPTIONS' && (pathname.startsWith('/api/chat') || pathname.startsWith('/api/mcp'))) {
    return createCorsResponse(request);
  }
  
  // Continue to the route (rate limiting now handled in individual API routes)
  const response = NextResponse.next();
  
  // Add CORS headers for chat and MCP endpoints
  if (pathname.startsWith('/api/chat') || pathname.startsWith('/api/mcp')) {
    return createCorsResponse(request, response);
  }
  
  return response;
}

export const config = {
  matcher: [
    '/api/chat/:path*',
    '/api/mcp/:path*', 
    '/api/docs/:path*',
  ],
};
