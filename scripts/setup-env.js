#!/usr/bin/env node

/**
 * Environment setup script
 * Usage: npm run setup:env
 */

const fs = require('fs');
const readline = require('readline');

const TEMPLATE_FILE = '.env.local.template';
const TARGET_FILE = '.env.local';

function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function copyTemplate() {
  if (!fileExists(TEMPLATE_FILE)) {
    console.error(`❌ Template file ${TEMPLATE_FILE} not found!`);
    console.log("   Make sure you're in the project root directory.");
    process.exit(1);
  }

  if (fileExists(TARGET_FILE)) {
    console.log(`⚠️  ${TARGET_FILE} already exists.`);
    return false;
  }

  try {
    fs.copyFileSync(TEMPLATE_FILE, TARGET_FILE);
    console.log(`✅ Created ${TARGET_FILE} from template`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to copy template: ${error.message}`);
    process.exit(1);
  }
}

function showNextSteps() {
  console.log('\n📋 Next Steps:');
  console.log(
    `   1. (Optional) Edit ${TARGET_FILE} to set environment variables:`
  );
  console.log(
    '      - NEXT_PUBLIC_SITE_URL: canonical site URL (OpenGraph, sitemap, llms.txt)'
  );
  console.log('      - NEXT_PUBLIC_GA_ID: Google Analytics measurement ID');
  console.log('   2. Start the development server: npm run dev');
  console.log(
    '\n💡 The site has no required environment variables — all are optional.'
  );
  console.log(`   See ${TEMPLATE_FILE} or .env.example for the full list.`);
}

async function promptOverwrite() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`   Overwrite ${TARGET_FILE}? (y/N): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase().startsWith('y'));
    });
  });
}

async function main() {
  console.log('🚀 Environment Setup\n');

  if (fileExists(TARGET_FILE)) {
    const shouldOverwrite = await promptOverwrite();
    if (!shouldOverwrite) {
      console.log('   Setup cancelled.');
      showNextSteps();
      return;
    }

    try {
      fs.unlinkSync(TARGET_FILE);
      console.log(`   Removed existing ${TARGET_FILE}`);
    } catch (error) {
      console.error(`❌ Failed to remove existing file: ${error.message}`);
      process.exit(1);
    }
  }

  const created = copyTemplate();
  if (created) {
    showNextSteps();
  }
}

main().catch(console.error);
