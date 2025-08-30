/**
 * Environment variable startup checker
 * 
 * This module checks environment variables and displays warnings/errors
 * during development server startup. Called from next.config.js.
 */

// Load environment variables from .env files (like Next.js does)
function loadEnvFiles() {
  const fs = require('fs');
  const path = require('path');
  
  // Load .env.local (highest priority)
  const envLocalPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envLocalPath)) {
    const envContent = fs.readFileSync(envLocalPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=');
          // Only set if not already in process.env (system env takes precedence)
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      }
    });
  }
}

function checkEnvironmentVariables() {
  // Load environment files when running manually (Next.js does this automatically)
  if (!process.env.NEXT_PHASE) {
    loadEnvFiles();
  }
  console.log('\n🚀 Starting Next.js development server...\n');
  
  const warnings = [];
  const errors = [];
  
  // Check OPENAI_API_KEY (required)
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    errors.push('OPENAI_API_KEY is not configured - OpenAI API key for chat functionality');
    errors.push('  Setup: Get your API key from https://platform.openai.com/api-keys');
  }
  
  // Check REDIS_URL (optional)
  if (!process.env.REDIS_URL) {
    warnings.push('REDIS_URL is not configured - Redis URL for enhanced rate limiting and caching');
    warnings.push('  Setup: For local development: redis://localhost:6379');
  }
  
  // Display results
  console.log('🔍 [ENV-CHECK] Environment Variable Status:\n');
  
  if (warnings.length > 0) {
    console.warn('⚠️  Configuration Warnings:');
    warnings.forEach(warning => console.warn(`   ${warning}`));
    console.warn('   App will run with reduced functionality.\n');
  }
  
  if (errors.length > 0) {
    console.error('❌ Configuration Errors:');
    errors.forEach(error => console.error(`   ${error}`));
    console.error('   Some features may not work properly.\n');
  }
  
  if (warnings.length > 0 || errors.length > 0) {
    console.log('📋 Quick Setup:');
    console.log('   1. Copy .env.local.template to .env.local');
    console.log('   2. Add your environment variable values');
    console.log('   3. Restart the development server');
    console.log('   See .env.example for all available options\n');
  } else {
    console.log('✅ All environment variables are properly configured!\n');
  }
}

module.exports = {
  checkEnvironmentVariables
};
