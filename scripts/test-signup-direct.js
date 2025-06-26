#!/usr/bin/env node

/**
 * Direct Signup Test Script
 * Attempts to import and test signup page components directly
 */

const fs = require('fs');
const path = require('path');

// Colors for output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testSignupPage() {
  log('🔍 Testing Signup Page Components', 'bold');
  log('=' .repeat(50), 'blue');

  // Test 1: Check if signup file exists
  const signupPath = path.join(__dirname, '../src/pages/signup.tsx');
  if (!fs.existsSync(signupPath)) {
    log('❌ signup.tsx file not found!', 'red');
    return;
  }
  log('✅ signup.tsx file exists', 'green');

  // Test 2: Read and analyze file content
  try {
    const content = fs.readFileSync(signupPath, 'utf8');
    log(`📄 File size: ${content.length} characters`, 'blue');

    // Check for common issues
    const issues = [];

    if (content.includes('import') && !content.includes('from')) {
      issues.push('Invalid import statements detected');
    }

    if (content.includes('process.env.') && !content.includes('typeof window')) {
      issues.push('Server-side environment access without browser checks');
    }

    if (content.includes('window.') && !content.includes('typeof window')) {
      issues.push('Direct window access without browser checks');
    }

    if (content.includes('document.') && !content.includes('typeof document')) {
      issues.push('Direct document access without browser checks');
    }

    // Check for syntax issues
    const lines = content.split('\n');
    let openBraces = 0;
    let closeBraces = 0;
    let openParens = 0;
    let closeParens = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      openBraces += (line.match(/{/g) || []).length;
      closeBraces += (line.match(/}/g) || []).length;
      openParens += (line.match(/\(/g) || []).length;
      closeParens += (line.match(/\)/g) || []).length;
    }

    if (openBraces !== closeBraces) {
      issues.push(`Unbalanced braces: ${openBraces} open, ${closeBraces} close`);
    }

    if (openParens !== closeParens) {
      issues.push(`Unbalanced parentheses: ${openParens} open, ${closeParens} close`);
    }

    // Report issues
    if (issues.length > 0) {
      log('\n🚨 POTENTIAL ISSUES FOUND:', 'red');
      issues.forEach(issue => log(`  • ${issue}`, 'yellow'));
    } else {
      log('✅ No obvious syntax issues detected', 'green');
    }

    // Show key sections
    log('\n📋 KEY IMPORTS:', 'blue');
    const imports = lines.filter(line => line.trim().startsWith('import'));
    imports.slice(0, 10).forEach(imp => log(`  ${imp.trim()}`, 'yellow'));
    if (imports.length > 10) {
      log(`  ... and ${imports.length - 10} more imports`, 'blue');
    }

    log('\n📋 EXPORT DEFAULT:', 'blue');
    const exportDefault = lines.find(line => line.includes('export default'));
    if (exportDefault) {
      log(`  ${exportDefault.trim()}`, 'yellow');
    } else {
      log('  ❌ No export default found', 'red');
    }

    log('\n📋 getStaticProps/getServerSideProps:', 'blue');
    const hasGetStaticProps = content.includes('getStaticProps');
    const hasGetServerSideProps = content.includes('getServerSideProps');
    log(`  getStaticProps: ${hasGetStaticProps ? '✅' : '❌'}`, hasGetStaticProps ? 'green' : 'red');
    log(`  getServerSideProps: ${hasGetServerSideProps ? '✅' : '❌'}`, hasGetServerSideProps ? 'green' : 'red');

  } catch (error) {
    log(`❌ Error reading signup file: ${error.message}`, 'red');
  }

  // Test 3: Check dependencies
  log('\n🔍 Checking Dependencies:', 'blue');
  const packagePath = path.join(__dirname, '../package.json');
  try {
    const packageContent = fs.readFileSync(packagePath, 'utf8');
    const packageJson = JSON.parse(packageContent);

    const requiredDeps = [
      'next',
      'react',
      '@supabase/supabase-js',
      'next-i18next'
    ];

    requiredDeps.forEach(dep => {
      const hasInDeps = packageJson.dependencies && packageJson.dependencies[dep];
      const hasInDevDeps = packageJson.devDependencies && packageJson.devDependencies[dep];

      if (hasInDeps || hasInDevDeps) {
        log(`  ✅ ${dep}: ${hasInDeps || hasInDevDeps}`, 'green');
      } else {
        log(`  ❌ ${dep}: MISSING`, 'red');
      }
    });

  } catch (error) {
    log(`❌ Error reading package.json: ${error.message}`, 'red');
  }

  // Test 4: Check if build files exist
  log('\n🏗️ Checking Build Output:', 'blue');
  const buildPaths = [
    '../.next/server/pages/signup.js',
    '../.next/server/pages/signup.html',
    '../.next/static'
  ];

  buildPaths.forEach(buildPath => {
    const fullPath = path.join(__dirname, buildPath);
    const exists = fs.existsSync(fullPath);
    log(`  ${exists ? '✅' : '❌'} ${buildPath}`, exists ? 'green' : 'red');
  });

  log('\n🎯 RECOMMENDATIONS:', 'bold');
  log('1. Check server logs for detailed error messages', 'blue');
  log('2. Ensure all imports are valid and dependencies installed', 'blue');
  log('3. Verify environment variables are accessible', 'blue');
  log('4. Test the page component in isolation', 'blue');

  log('\n🏁 Analysis completed!', 'bold');
}

// Run the test
testSignupPage().catch(console.error);