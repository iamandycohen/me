/**
 * Redis Rate Limiting using the same Redis instance as MCP handler
 * 
 * This uses your existing REDIS_URL to ensure consistency across your app
 */

import Redis from 'ioredis';

// Shared Redis client instance (same as your MCP handler uses)
let redisClient: Redis | null = null;

function getRedisClient(): Redis | null {
  const redisUrl = process.env.REDIS_URL;
  
  if (!redisUrl) {
    console.warn('[RATE-LIMIT] No REDIS_URL found');
    return null;
  }

  if (!redisClient) {
    redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      connectTimeout: 5000,
      commandTimeout: 3000,
    });

    redisClient.on('error', (error) => {
      console.warn('[RATE-LIMIT] Redis connection error:', error);
    });
  }

  return redisClient;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  headers: Record<string, string>;
}

export async function checkRateLimit(
  identifier: string,
  endpoint: string,
  maxRequests: number = 100,
  windowMs: number = 60000
): Promise<RateLimitResult> {
  
  const redis = getRedisClient();
  
  if (!redis) {
    // Fallback when Redis not available
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      resetTime: Math.floor((Date.now() + windowMs) / 1000),
      headers: {
        'X-RateLimit-Limit': maxRequests.toString(),
        'X-RateLimit-Remaining': (maxRequests - 1).toString(),
        'X-RateLimit-Reset': Math.floor((Date.now() + windowMs) / 1000).toString(),
        'X-RateLimit-Source': 'fallback',
      },
    };
  }

  try {
    const window = Math.floor(Date.now() / windowMs);
    const key = `ratelimit:${endpoint}:${identifier}:${window}`;
    const ttlSeconds = Math.ceil(windowMs / 1000);

    // Atomic operations using pipeline
    console.log(`[RATE-LIMIT] Redis INCR ${key} with TTL ${ttlSeconds}s`);
    const pipeline = redis.pipeline();
    pipeline.incr(key);
    pipeline.expire(key, ttlSeconds);
    
    const results = await pipeline.exec();
    
    if (!results || results.length < 2) {
      throw new Error('Redis pipeline failed');
    }

    const count = results[0]?.[1] as number || 1;
    const remaining = Math.max(0, maxRequests - count);
    const resetTime = Math.floor((Date.now() + windowMs) / 1000);

    console.log(`[RATE-LIMIT] ${endpoint}:${identifier} -> ${count}/${maxRequests} (${remaining} remaining)`);

    return {
      success: count <= maxRequests,
      limit: maxRequests,
      remaining,
      resetTime,
      headers: {
        'X-RateLimit-Limit': maxRequests.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': resetTime.toString(),
        'X-RateLimit-Source': 'redis',
      },
    };

  } catch (error) {
    console.warn('[RATE-LIMIT] Redis operation failed:', error);
    
    // Fallback to allowing request if Redis fails
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      resetTime: Math.floor((Date.now() + windowMs) / 1000),
      headers: {
        'X-RateLimit-Limit': maxRequests.toString(),
        'X-RateLimit-Remaining': (maxRequests - 1).toString(),
        'X-RateLimit-Reset': Math.floor((Date.now() + windowMs) / 1000).toString(),
        'X-RateLimit-Source': 'error-fallback',
      },
    };
  }
}

// Helper function to get client IP from request
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare
  
  return forwarded?.split(',')[0]?.trim() || 
         realIP || 
         cfConnectingIP || 
         'anonymous';
}

// Pre-configured rate limiters for different endpoints
export const rateLimiters = {
  chat: (ip: string) => checkRateLimit(ip, 'chat', 10, 60000),    // 10/min
  mcp: (ip: string) => checkRateLimit(ip, 'mcp', 50, 60000),     // 50/min  
  docs: (ip: string) => checkRateLimit(ip, 'docs', 100, 60000),  // 100/min
  api: (ip: string) => checkRateLimit(ip, 'api', 100, 60000),    // 100/min
};
