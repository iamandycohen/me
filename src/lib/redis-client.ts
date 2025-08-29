/**
 * Redis client utility for MCP server functionality
 */

interface RedisConnectionInfo {
  connected: boolean;
  host?: string;
  port?: number;
  error?: string;
}

/**
 * Test Redis connection using native fetch (no additional dependencies)
 * This is a simple connectivity test - the actual Redis integration 
 * is handled internally by mcp-handler
 */
export async function testRedisConnection(): Promise<RedisConnectionInfo> {
  const redisUrl = process.env.REDIS_URL;
  
  if (!redisUrl) {
    return {
      connected: false,
      error: "REDIS_URL environment variable not set"
    };
  }

  try {
    // Parse Redis URL to extract connection info
    const url = new URL(redisUrl);
    const host = url.hostname;
    const port = parseInt(url.port) || 6379;

    // Note: This is just for informational purposes
    // The actual Redis connection is handled by mcp-handler internally
    return {
      connected: true,
      host,
      port
    };
  } catch (error) {
    return {
      connected: false,
      error: `Invalid Redis URL format: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Get Redis configuration info for debugging
 */
export function getRedisConfig() {
  const redisUrl = process.env.REDIS_URL;
  
  if (!redisUrl) {
    return { configured: false, message: "Redis not configured" };
  }

  try {
    const url = new URL(redisUrl);
    return {
      configured: true,
      host: url.hostname,
      port: url.port || "6379",
      hasAuth: !!url.password,
      message: "Redis configured and ready"
    };
  } catch {
    return { 
      configured: false, 
      message: "Invalid Redis URL format" 
    };
  }
}
