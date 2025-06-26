#!/usr/bin/env node

/**
 * Production Signup 500 Error Diagnostic Script
 * Specifically tests the signup functionality that works in dev but fails in production
 */

const https = require('https');
const http = require('http');

const PRODUCTION_URL = 'https://sanluisway.com';
const TIMEOUT = 15000;

// Color codes for console output
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

function makeRequest(url, method = 'GET', data = null, headers = {}) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: method,
      timeout: TIMEOUT,
      headers: {
        'User-Agent': 'SLP-Signup-Diagnostic/1.0',
        'Accept': 'application/json, text/html, */*',
        'Content-Type': method === 'POST' ? 'application/json' : 'text/html',
        ...headers
      }
    };

    if (data && method === 'POST') {
      const payload = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(payload);
    }

    const req = client.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        resolve({
          url,
          statusCode: res.statusCode,
          headers: res.headers,
          data: responseData,
          success: res.statusCode < 400,
          size: responseData.length
        });
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        statusCode: 'TIMEOUT',
        error: 'Request timeout',
        success: false
      });
    });

    req.on('error', (error) => {
      resolve({
        url,
        statusCode: 'ERROR',
        error: error.message,
        success: false
      });
    });

    if (data && method === 'POST') {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function testEndpoint(path, description, method = 'GET', data = null) {
  const url = `${PRODUCTION_URL}${path}`;
  log(`\n🔍 Testing: ${description}`, 'blue');
  log(`📍 URL: ${url}`, 'yellow');
  log(`📡 Method: ${method}`, 'yellow');

  const result = await makeRequest(url, method, data);

  if (result.success) {
    log(`✅ SUCCESS - Status: ${result.statusCode}`, 'green');
  } else {
    log(`❌ FAILED - Status: ${result.statusCode}`, 'red');
    if (result.error) {
      log(`💥 Error: ${result.error}`, 'red');
    }

    // Log response data for 500 errors
    if (result.statusCode === 500) {
      log(`🚨 500 ERROR DETAILS:`, 'red');
      if (result.data) {
        // Try to extract useful error information
        if (result.data.includes('Error:')) {
          const errorMatch = result.data.match(/Error: ([^<\n]+)/);
          if (errorMatch) {
            log(`   Error Message: ${errorMatch[1]}`, 'red');
          }
        }

        if (result.data.includes('at ')) {
          const stackLines = result.data.split('\n').filter(line => line.includes('at '));
          if (stackLines.length > 0) {
            log(`   Stack trace (first 3 lines):`, 'yellow');
            stackLines.slice(0, 3).forEach(line => {
              log(`     ${line.trim()}`, 'yellow');
            });
          }
        }

        // Show first 500 characters for analysis
        log(`   Response preview (first 500 chars):`, 'yellow');
        log(`   ${result.data.substring(0, 500)}...`, 'yellow');
      }
    }
  }

  return result;
}

async function runSignupDiagnostic() {
  log('🚨 SIGNUP 500 ERROR DIAGNOSTIC', 'bold');
  log('=====================================', 'red');
  log('🎯 Focus: Dev works ✅ | Production fails ❌', 'yellow');
  log('=====================================', 'red');

  // Test 1: Basic signup page load
  log('\n1️⃣ TESTING SIGNUP PAGE LOAD', 'bold');
  const signupPageResult = await testEndpoint('/signup', 'Signup page load');

  // Test 2: Auth API endpoints
  log('\n2️⃣ TESTING AUTH API ENDPOINTS', 'bold');

  // Test signup API endpoint directly
  const testSignupData = {
    email: 'test@example.com',
    password: 'TestPassword123!',
    account_type: 'individual'
  };

  const signupApiResult = await testEndpoint(
    '/api/auth/signup',
    'Signup API endpoint',
    'POST',
    testSignupData
  );

  // Test 3: Environment-specific API endpoints
  log('\n3️⃣ TESTING ENVIRONMENT DETECTION', 'bold');
  const debugSupabaseResult = await testEndpoint('/api/debug-supabase', 'Supabase debug info');
  const debugSignupResult = await testEndpoint('/api/debug-signup', 'Signup debug info');

  // Test 4: Health checks
  log('\n4️⃣ TESTING INFRASTRUCTURE', 'bold');
  const healthResult = await testEndpoint('/health', 'Basic health check');
  const apiHealthResult = await testEndpoint('/api/health-check', 'API health check');

  // Analysis
  log('\n📊 DIAGNOSTIC ANALYSIS', 'bold');
  log('=' .repeat(50), 'blue');

  const results = {
    signupPage: signupPageResult,
    signupApi: signupApiResult,
    debugSupabase: debugSupabaseResult,
    debugSignup: debugSignupResult,
    health: healthResult,
    apiHealth: apiHealthResult
  };

  // Check patterns
  const has500Errors = Object.values(results).some(r => r.statusCode === 500);
  const hasApiIssues = Object.values(results).filter(r =>
    r.url.includes('/api/') && !r.success
  ).length > 0;

  log('\n🔍 FINDINGS:', 'bold');

  if (has500Errors) {
    log('❌ 500 errors detected in production', 'red');
    log('🎯 This confirms the dev vs production issue', 'yellow');
  } else {
    log('✅ No 500 errors found - issue might be intermittent', 'green');
  }

  if (hasApiIssues) {
    log('❌ API endpoints have issues', 'red');
    log('💡 Likely causes:', 'yellow');
    log('   • Environment variables not loaded in production', 'yellow');
    log('   • Supabase connection issues', 'yellow');
    log('   • Next.js API routes not properly built/deployed', 'yellow');
  }

  // Environment comparison
  if (debugSupabaseResult.success && debugSupabaseResult.data) {
    try {
      const debugData = JSON.parse(debugSupabaseResult.data);
      log('\n🌍 PRODUCTION ENVIRONMENT:', 'bold');
      log(`   Node ENV: ${debugData.environment || 'unknown'}`, 'blue');
      log(`   Supabase URL: ${debugData.environmentVariables?.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING'}`,
          debugData.environmentVariables?.NEXT_PUBLIC_SUPABASE_URL ? 'green' : 'red');
      log(`   Supabase Key: ${debugData.environmentVariables?.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'MISSING'}`,
          debugData.environmentVariables?.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'green' : 'red');
    } catch (e) {
      log('⚠️  Could not parse debug response', 'yellow');
    }
  }

  // Recommendations
  log('\n💡 RECOMMENDED ACTIONS:', 'bold');
  log('=' .repeat(30), 'blue');

  if (has500Errors) {
    log('1. Check production server logs immediately', 'yellow');
    log('2. Verify all environment variables are set in production', 'yellow');
    log('3. Compare .env.local (dev) vs production environment', 'yellow');
    log('4. Check if Supabase policies differ between projects', 'yellow');
    log('5. Verify Next.js build includes all API routes', 'yellow');
  }

  if (results.signupPage.statusCode === 500) {
    log('🚨 SIGNUP PAGE 500 ERROR - CRITICAL', 'red');
    log('   This is likely an SSR (Server-Side Rendering) issue', 'yellow');
    log('   Check for environment variables used during page render', 'yellow');
  }

  if (results.signupApi.statusCode === 500) {
    log('🚨 SIGNUP API 500 ERROR - CRITICAL', 'red');
    log('   This is likely a database/authentication issue', 'yellow');
    log('   Check Supabase connection and RLS policies', 'yellow');
  }

  log('\n🔧 IMMEDIATE DEBUG COMMANDS:', 'bold');
  log('# Check production logs:', 'blue');
  log('docker logs --tail=100 sanluisway-app', 'green');
  log('\n# Test environment in production container:', 'blue');
  log('docker exec sanluisway-app env | grep SUPABASE', 'green');
  log('\n# Test database connection:', 'blue');
  log('docker exec sanluisway-app node -e "console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)"', 'green');

  log('\n🎯 CONCLUSION:', 'bold');
  if (has500Errors) {
    log('The 500 error is confirmed in production.', 'red');
    log('This is a production-specific configuration issue.', 'yellow');
  } else {
    log('No errors detected in this test.', 'green');
    log('The issue might be intermittent or recently resolved.', 'yellow');
  }
}

// Run the diagnostic
runSignupDiagnostic().catch(console.error);