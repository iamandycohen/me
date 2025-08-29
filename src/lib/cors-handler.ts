import { NextRequest, NextResponse } from 'next/server';
import { getConfiguredSiteUrl } from '@/lib/url-helpers';

// CORS policies differentiated by endpoint:
// - Chat API: Restricted to trusted domains only (your website)  
// - MCP API: Wide open for external AI agents and tools
// - Other APIs: Default to trusted domains only

export function createCorsResponse(
  request: NextRequest, 
  response?: NextResponse
): NextResponse {
  const origin = request.headers.get('origin');
  const { pathname } = request.nextUrl;
  
  // Get trusted domains
  const configuredSiteUrl = getConfiguredSiteUrl();
  const trustedDomains = new Set([
    configuredSiteUrl,
    // Support both www and non-www variants automatically
    ...(configuredSiteUrl.includes('www.') 
      ? [configuredSiteUrl.replace('https://www.', 'https://')]
      : [configuredSiteUrl.replace('https://', 'https://www.')]),
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [])
  ]);
  
  let allowedOrigin: string;
  let allowCredentials = false;
  
  // Different CORS policies based on endpoint
  if (pathname.startsWith('/api/chat')) {
    // CHAT API: Restricted to your own domains only
    if (!origin || (origin && trustedDomains.has(origin))) {
      // Allow same-origin requests (no origin header) and trusted domains
      allowedOrigin = origin || configuredSiteUrl;
      allowCredentials = true;
    } else {
      // Block external access to chat API
      allowedOrigin = 'null';
    }
  } else if (pathname.startsWith('/api/mcp')) {
    // MCP API: Wide open for AI agents and external tools
    if (!origin || (origin && trustedDomains.has(origin))) {
      // Your own domain (including same-origin) gets credentials
      allowedOrigin = origin || configuredSiteUrl;
      allowCredentials = true;
    } else {
      // External domains get open access but no credentials
      allowedOrigin = '*';
    }
  } else {
    // Other APIs: Default to trusted domains only
    if (origin && trustedDomains.has(origin)) {
      allowedOrigin = origin;
      allowCredentials = true;
    } else {
      allowedOrigin = 'null';
    }
  }
  
  const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent, X-Requested-With, X-API-Key',
    'Access-Control-Max-Age': '86400',
  };
  
  // Only add credentials header when needed (can't use with '*' origin)
  if (allowCredentials && allowedOrigin !== '*') {
    corsHeaders['Access-Control-Allow-Credentials'] = 'true';
  }
  
  if (response) {
    // Add headers to existing response
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  } else {
    // Create new response (for OPTIONS)
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    });
  }
}
