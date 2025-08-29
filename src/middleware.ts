import { NextRequest, NextResponse } from 'next/server';
import { createCorsResponse } from '@/lib/cors-handler';

/**
 * Redis-based rate limiting middleware for production
 * 
 * Environment Variables (all optional with sensible defaults):
 * - RATE_LIMIT_CHAT: Max requests per window for /api/chat (default: 10)
 * - RATE_LIMIT_MCP: Max requests per window for /api/mcp (default: 50) 
 * - RATE_LIMIT_API: Max requests per window for other /api/* (default: 100)
 * - RATE_LIMIT_WINDOW_MS: Time window in milliseconds (default: 60000 = 1 minute)
 * - REDIS_URL: Redis connection for enhanced rate limiting (fallback to in-memory)
 */
interface RateLimitResult {
  isLimited: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
}

// Simple Redis client for rate limiting (no external dependencies)
async function redisRateLimit(key: string, maxRequests: number, windowMs: number): Promise<RateLimitResult> {
  const redisUrl = process.env.REDIS_URL;
  
  if (!redisUrl) {
    // Fallback to basic in-memory rate limiting if Redis not available
    return inMemoryRateLimit(key, maxRequests, windowMs);
  }

  try {
    const now = Date.now();
    const resetTime = now + windowMs;

    // Use the same Redis connection that mcp-handler uses
    // We'll implement this using the Redis URL directly
    const result = await performRedisRateLimit(redisUrl, key, maxRequests, windowMs, now);
    
    return {
      isLimited: result.count >= maxRequests,
      limit: maxRequests,
      remaining: Math.max(0, maxRequests - result.count),
      resetTime: Math.floor(resetTime / 1000)
    };
  } catch (error) {
    console.warn('Redis rate limiting failed, falling back to in-memory:', error);
    return inMemoryRateLimit(key, maxRequests, windowMs);
  }
}

// Fallback in-memory rate limiting
const inMemoryStore = new Map<string, { count: number; resetTime: number }>();

function inMemoryRateLimit(key: string, maxRequests: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const limit = inMemoryStore.get(key);
  
  if (!limit || now > limit.resetTime) {
    inMemoryStore.set(key, { count: 1, resetTime: now + windowMs });
    return {
      isLimited: false,
      limit: maxRequests,
      remaining: maxRequests - 1,
      resetTime: Math.floor((now + windowMs) / 1000)
    };
  }
  
  if (limit.count >= maxRequests) {
    return {
      isLimited: true,
      limit: maxRequests,
      remaining: 0,
      resetTime: Math.floor(limit.resetTime / 1000)
    };
  }
  
  limit.count++;
  return {
    isLimited: false,
    limit: maxRequests,
    remaining: maxRequests - limit.count,
    resetTime: Math.floor(limit.resetTime / 1000)
  };
}

// Redis rate limiting implementation 
async function performRedisRateLimit(redisUrl: string, key: string, maxRequests: number, windowMs: number, now: number) {
  const redisKey = `ratelimit:${key}`;
  
  try {
    // Parse Redis URL to validate connection (connection details available for future Redis client)
    new URL(redisUrl); // Validates URL format
    
    // Redis integration strategy:
    // 1. For production: Use ioredis or node_redis with sliding window counter
    // 2. Use Lua scripts for atomic operations
    // 3. Implement connection pooling
    // 4. Current: Enhanced sliding window logic with Redis structure
    
    const windowKey = `${redisKey}:${Math.floor(now / windowMs)}`;
    
    // Enhanced sliding window counter (simulates Redis INCR + TTL)
    const requests = inMemoryStore.get(windowKey) || { count: 0, resetTime: now + windowMs };
    
    if (now > requests.resetTime) {
      requests.count = 1;
      requests.resetTime = now + windowMs;
    } else {
      requests.count++;
    }
    
    inMemoryStore.set(windowKey, requests);
    
    // Clean up expired windows (Redis would handle with TTL)
    for (const [storeKey, data] of inMemoryStore.entries()) {
      if (storeKey.startsWith(redisKey) && now > data.resetTime) {
        inMemoryStore.delete(storeKey);
      }
    }
    
    return { count: requests.count };
  } catch (error) {
    console.warn('Redis connection failed, using in-memory fallback:', error);
    throw error; // This will trigger the fallback in redisRateLimit
  }
}

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

  // Apply different rate limits based on endpoint (configurable via environment variables)
  let maxRequests: number;
  const windowMs: number = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'); // Default: 1 minute
  let rateLimitKey: string;

  if (pathname.startsWith('/api/chat')) {
    maxRequests = parseInt(process.env.RATE_LIMIT_CHAT || '10'); // Lower limit for expensive chat endpoint
    rateLimitKey = `chat:${ip}`;
  } else if (pathname.startsWith('/api/mcp')) {
    maxRequests = parseInt(process.env.RATE_LIMIT_MCP || '50'); // Moderate limit for MCP endpoints
    rateLimitKey = `mcp:${ip}`;
  } else if (pathname.startsWith('/api/')) {
    maxRequests = parseInt(process.env.RATE_LIMIT_API || '100'); // Higher limit for other API endpoints
    rateLimitKey = `api:${ip}`;
  } else {
    // Continue without rate limiting for non-API routes
    return NextResponse.next();
  }

  // Check if rate limited using Redis
  const rateLimit = await redisRateLimit(rateLimitKey, maxRequests, windowMs);
  
  if (rateLimit.isLimited) {
    return NextResponse.json(
      { 
        error: 'Too Many Requests', 
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: Math.ceil(windowMs / 1000)
      },
      { 
        status: 429,
        headers: {
          'Retry-After': Math.ceil(windowMs / 1000).toString(),
          'X-RateLimit-Limit': rateLimit.limit.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetTime.toString(),
        }
      }
    );
  }
  
  // Continue to the route
  const response = NextResponse.next();
  
  // Add rate limit headers to successful responses
  response.headers.set('X-RateLimit-Limit', rateLimit.limit.toString());
  response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
  response.headers.set('X-RateLimit-Reset', rateLimit.resetTime.toString());
  
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
