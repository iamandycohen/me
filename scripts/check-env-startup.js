/**
 * Environment variable startup checker
 *
 * Runs during `next dev` (via next.config.js) to surface any required env vars.
 */

function loadEnvFiles() {
  const fs = require('fs');
  const path = require('path');

  const envLocalPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envLocalPath)) {
    const envContent = fs.readFileSync(envLocalPath, 'utf8');
    envContent.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=');
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      }
    });
  }
}

function checkEnvironmentVariables() {
  if (!process.env.NEXT_PHASE) {
    loadEnvFiles();
  }

  console.log('\n🚀 Starting Next.js development server...\n');

  const warnings = [];

  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    warnings.push(
      'NEXT_PUBLIC_SITE_URL is not configured — used for canonical URLs and OpenGraph metadata.'
    );
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Configuration notes:');
    warnings.forEach((w) => console.warn(`   ${w}`));
    console.warn('');
  } else {
    console.log('✅ Environment looks good.\n');
  }
}

module.exports = { checkEnvironmentVariables };
