#!/usr/bin/env node

/**
 * Rate limit configuration checker
 * Usage: npm run ratelimits:check
 */

function getRateLimitConfig() {
  const config = {
    chat: {
      limit: parseInt(process.env.RATE_LIMIT_CHAT || '10'),
      env: 'RATE_LIMIT_CHAT',
      description: 'Chat API (expensive operations)'
    },
    mcp: {
      limit: parseInt(process.env.RATE_LIMIT_MCP || '50'),
      env: 'RATE_LIMIT_MCP', 
      description: 'MCP API (moderate load)'
    },
    api: {
      limit: parseInt(process.env.RATE_LIMIT_API || '100'),
      env: 'RATE_LIMIT_API',
      description: 'Other APIs (general usage)'
    },
    window: {
      limit: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
      env: 'RATE_LIMIT_WINDOW_MS',
      description: 'Time window in milliseconds'
    }
  };

  const redisConfigured = !!process.env.REDIS_URL;

  return { config, redisConfigured };
}

function main() {
  console.log('🚦 Rate Limiting Configuration\n');
  
  const { config, redisConfigured } = getRateLimitConfig();
  
  console.log('📊 Current Rate Limits:');
  Object.entries(config).forEach(([key, { limit, env, description }]) => {
    const isCustom = process.env[env] ? '(custom)' : '(default)';
    const unit = key === 'window' ? 'ms' : 'req/window';
    console.log(`   ${key.toUpperCase().padEnd(8)} ${limit.toString().padStart(6)} ${unit} - ${description} ${isCustom}`);
  });
  
  console.log(`\n🔄 Window Duration: ${Math.floor(config.window.limit / 1000)} seconds`);
  console.log(`🔗 Redis Enhanced: ${redisConfigured ? '✅ Yes' : '❌ No (in-memory fallback)'}`);
  
  console.log('\n🔧 To customize, set environment variables:');
  Object.entries(config).forEach(([key, { env }]) => {
    console.log(`   export ${env}=${key === 'window' ? '120000' : key === 'chat' ? '20' : key === 'mcp' ? '100' : '200'}`);
  });
  
  console.log(`\n📝 Note: Changes require server restart`);
  console.log(`🕒 Timestamp: ${new Date().toISOString()}`);
}

main();
