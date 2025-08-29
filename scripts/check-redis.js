#!/usr/bin/env node

/**
 * Local Redis diagnostic utility - runs locally without HTTP exposure
 * Usage: npm run redis:check
 */

const { URL } = require('url');

async function checkRedisConfig() {
  const redisUrl = process.env.REDIS_URL;
  
  if (!redisUrl) {
    return { 
      configured: false, 
      error: "REDIS_URL environment variable not set" 
    };
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
  } catch (error) {
    return { 
      configured: false, 
      error: `Invalid Redis URL format: ${error.message}` 
    };
  }
}

async function main() {
  console.log('🔍 Checking Redis Configuration...\n');
  
  const config = await checkRedisConfig();
  
  if (config.configured) {
    console.log('✅ Redis Status: CONFIGURED');
    console.log(`📍 Host: ${config.host}`);
    console.log(`🔌 Port: ${config.port}`);
    console.log(`🔐 Authentication: ${config.hasAuth ? 'Yes' : 'No'}`);
    console.log(`💬 Message: ${config.message}`);
  } else {
    console.log('❌ Redis Status: NOT CONFIGURED');
    console.log(`❗ Error: ${config.error}`);
  }
  
  console.log(`\n🕒 Timestamp: ${new Date().toISOString()}`);
  console.log('📝 Note: MCP handler will use Redis for SSE transport and pub/sub when available');
}

main().catch(console.error);
