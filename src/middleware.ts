import { NextRequest, NextResponse } from 'next/server';
import { createCorsResponse } from '@/lib/cors-handler';

// Simple in-memory rate limiting (consider Redis for production)
interface RateLimit {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimit>();

function isRateLimited(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(key);
  
  if (!limit || now > limit.resetTime) {
    // Reset or create new limit
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs
    });
    return false;
  }
  
  if (limit.count >= maxRequests) {
    return true; // Rate limited
  }
  
  // Increment count
  limit.count++;
  return false;
}

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, limit] of rateLimitStore.entries()) {
    if (now > limit.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60 * 1000); // Clean up every minute

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle CORS preflight requests for chat and MCP endpoints
  if (request.method === 'OPTIONS' && (pathname.startsWith('/api/chat') || pathname.startsWith('/api/mcp'))) {
    return createCorsResponse(request);
  }
  
  // Get client IP for rate limiting
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'anonymous';

  // Apply different rate limits based on endpoint
  let maxRequests: number;
  const windowMs: number = 60 * 1000; // 1 minute window
  let rateLimitKey: string;

  if (pathname.startsWith('/api/chat')) {
    maxRequests = 10; // Lower limit for expensive chat endpoint
    rateLimitKey = `chat:${ip}`;
  } else if (pathname.startsWith('/api/mcp')) {
    maxRequests = 50; // Moderate limit for MCP endpoints
    rateLimitKey = `mcp:${ip}`;
  } else if (pathname.startsWith('/api/')) {
    maxRequests = 100; // Higher limit for other API endpoints
    rateLimitKey = `api:${ip}`;
  } else {
    // Continue without rate limiting for non-API routes
    return NextResponse.next();
  }

  // Check if rate limited
  if (isRateLimited(rateLimitKey, maxRequests, windowMs)) {
    const resetTime = Math.floor((Date.now() + windowMs) / 1000);
    
    return NextResponse.json(
      { 
        error: 'Too Many Requests', 
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: 60
      },
      { 
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': resetTime.toString(),
        }
      }
    );
  }
  
  // Continue to the route
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
    // Note: sse and websocket paths don't exist in your current setup
  ],
};
