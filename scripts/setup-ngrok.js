#!/usr/bin/env node

/**
 * Helper script to set up ngrok for local MCP development
 * 
 * This script helps developers configure ngrok tunneling so that
 * OpenAI can reach their local MCP server for native integration.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function checkNgrokInstalled() {
  try {
    execSync('ngrok version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

function updateEnvFile(ngrokUrl) {
  const envPath = path.join(process.cwd(), '.env.local');
  let envContent = '';
  
  // Read existing .env.local if it exists
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  // Remove existing CHAT_MCP_SERVER_URL lines
  const lines = envContent.split('\n').filter(line => 
    !line.startsWith('CHAT_MCP_SERVER_URL=') && 
    !line.startsWith('# CHAT_MCP_SERVER_URL=') &&
    !line.startsWith('CHAT_MCP_SERVER_ENDPOINT=') &&
    !line.startsWith('# CHAT_MCP_SERVER_ENDPOINT=')
  );
  
  // Add new CHAT_MCP_SERVER configuration
  lines.push(`# Chat MCP Server configuration for OpenAI native integration (ngrok tunnel)`);
  lines.push(`CHAT_MCP_SERVER_URL=${ngrokUrl}`);
  lines.push(`CHAT_MCP_SERVER_ENDPOINT=/api/mcp`);
  lines.push('');
  
  // Write back to file
  fs.writeFileSync(envPath, lines.join('\n'));
}

function main() {
  console.log('🚇 Setting up ngrok for MCP development\n');
  
  // Check if ngrok is installed
  if (!checkNgrokInstalled()) {
    console.error('❌ ngrok is not installed or not in PATH');
    console.log('\n📋 Installation instructions:');
    console.log('1. Visit: https://ngrok.com/download');
    console.log('2. Download and install ngrok');
    console.log('3. Sign up for a free account');
    console.log('4. Run: ngrok config add-authtoken <your-token>');
    console.log('5. Run this script again\n');
    process.exit(1);
  }
  
  console.log('✅ ngrok is installed');
  console.log('\n🔧 Starting ngrok tunnel on port 3000...');
  console.log('📝 Make sure your Next.js dev server is running on port 3000\n');
  
  try {
    // Start ngrok and capture the URL
    console.log('⏳ Starting tunnel... (this may take a few seconds)');
    
    // Note: This is a simplified version. In practice, you'd want to:
    // 1. Start ngrok in background
    // 2. Parse the tunnel URL from ngrok's API
    // 3. Update the .env.local file automatically
    
    console.log('🚀 To complete setup:');
    console.log('1. Run: ngrok http 3000');
    console.log('2. Copy the https:// URL (e.g., https://abc123.ngrok.io)');
    console.log('3. Add to .env.local:');
    console.log('   CHAT_MCP_SERVER_URL=https://abc123.ngrok.io');
    console.log('   CHAT_MCP_SERVER_ENDPOINT=/api/mcp');
    console.log('4. Restart your Next.js dev server');
    console.log('\n💡 Pro tip: Use "ngrok http 3000 --domain=your-static-domain.ngrok.app" for a consistent URL\n');
    
  } catch (error) {
    console.error('❌ Failed to start ngrok:', error.message);
    console.log('\n🔧 Manual setup:');
    console.log('1. Run: ngrok http 3000');
    console.log('2. Add to .env.local:');
    console.log('   CHAT_MCP_SERVER_URL=https://your-ngrok-url.ngrok.io');
    console.log('   CHAT_MCP_SERVER_ENDPOINT=/api/mcp');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkNgrokInstalled, updateEnvFile };
