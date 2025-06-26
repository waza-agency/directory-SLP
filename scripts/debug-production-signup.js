#!/usr/bin/env node

/**
 * Production Signup Debug Script
 * Tests the signup functionality to identify 500 error causes
 */

const https = require('https');
const http = require('http');

// Configuration
const PRODUCTION_URL = process.env.PRODUCTION_URL || 'https://sanluisway.com';
const DEBUG_MODE = process.env.DEBUG_MODE === 'true';

// Colors for console output
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

function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https://') ? https : http;
    const urlObj = new URL(url);

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (url.startsWith('https://') ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'debug-production-signup/1.0',
        'Accept': 'application/json'
      },
      timeout: 15000
    };

    if (data && method === 'POST') {
      const postData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = protocol.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = responseData ? JSON.parse(responseData) : null;
          resolve({
            success: res.statusCode >= 200 && res.statusCode < 300,
            statusCode: res.statusCode,
            headers: res.headers,
            data: parsedData,
            rawData: responseData
          });
        } catch (parseError) {
          resolve({
            success: res.statusCode >= 200 && res.statusCode < 300,
            statusCode: res.statusCode,
            headers: res.headers,
            data: null,
            rawData: responseData,
            parseError: parseError.message
          });
        }
      });
    });

    req.on('error', (error) => {
      reject({
        success: false,
        error: error.message,
        code: error.code
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject({
        success: false,
        error: 'Request timeout',
        code: 'TIMEOUT'
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
  log(`   URL: ${url}`, 'blue');

  try {
    const result = await makeRequest(url, method, data);

    if (result.success) {
      log(`   ✅ Success (${result.statusCode})`, 'green');
      if (DEBUG_MODE && result.data) {
        log(`   📄 Response: ${JSON.stringify(result.data, null, 2)}`, 'blue');
      }
    } else {
      log(`   ❌ Failed (${result.statusCode})`, 'red');
      if (result.rawData) {
        log(`   📄 Error Response: ${result.rawData.substring(0, 200)}...`, 'red');
      }
    }

    return result;
  } catch (error) {
    log(`   💥 Request Failed: ${error.error}`, 'red');
    return error;
  }
}

async function runDiagnostic() {
  log('🚨 PRODUCTION SIGNUP DIAGNOSTIC', 'bold');
  log('=' .repeat(50), 'yellow');
  log(`🎯 Target: ${PRODUCTION_URL}`, 'blue');
  log(`🐛 Debug Mode: ${DEBUG_MODE ? 'ON' : 'OFF'}`, 'blue');
  log('=' .repeat(50), 'yellow');

  const results = {};

  // Test 1: Debug production issue endpoint
  log('\n1️⃣ TESTING PRODUCTION DEBUG ENDPOINT', 'bold');
  results.productionDebug = await testEndpoint('/api/debug-production-issue', 'Production Issue Debug');

  // Test 2: Test existing signup endpoints
  log('\n2️⃣ TESTING EXISTING SIGNUP ENDPOINTS', 'bold');
  results.minimalSignup = await testEndpoint('/api/minimal-signup', 'Minimal Signup API', 'GET');
  results.productionSignup = await testEndpoint('/api/production-signup', 'Production Signup API', 'GET');

  // Test 3: Test new robust signup endpoint
  log('\n3️⃣ TESTING NEW ROBUST SIGNUP ENDPOINT', 'bold');
  results.robustSignup = await testEndpoint('/api/robust-signup', 'Robust Signup API', 'GET');

  // Test 4: Test actual signup functionality
  log('\n4️⃣ TESTING ACTUAL SIGNUP FUNCTIONALITY', 'bold');
  const testSignupData = {
    email: `test-${Date.now()}@example.com`,
    password: 'TestPassword123!'
  };

  results.actualSignup = await testEndpoint('/api/robust-signup', 'Actual Signup Test', 'POST', testSignupData);

  // Test 5: Test signup pages
  log('\n5️⃣ TESTING SIGNUP PAGES', 'bold');
  results.signupPage = await testEndpoint('/signup', 'Main Signup Page');
  results.minimalSignupPage = await testEndpoint('/signup-minimal', 'Minimal Signup Page');
  results.productionSignupPage = await testEndpoint('/signup-production', 'Production Signup Page');

  // Analysis
  log('\n📊 DIAGNOSTIC ANALYSIS', 'bold');
  log('=' .repeat(50), 'blue');

  const issues = [];
  const recommendations = [];

  // Check for 500 errors
  const has500Errors = Object.values(results).some(r => r.statusCode === 500);
  if (has500Errors) {
    issues.push('❌ 500 Internal Server Errors detected');
    recommendations.push('Check server logs for detailed error information');
  }

  // Check API endpoint health
  const apiEndpoints = ['productionDebug', 'minimalSignup', 'productionSignup', 'robustSignup'];
  const failedApis = apiEndpoints.filter(endpoint => !results[endpoint]?.success);

  if (failedApis.length > 0) {
    issues.push(`❌ ${failedApis.length}/${apiEndpoints.length} API endpoints failing`);
    recommendations.push('Check environment variables and Supabase configuration');
  }

  // Check signup functionality
  if (!results.actualSignup?.success) {
    issues.push('❌ Signup functionality is broken');
    recommendations.push('Check the robust signup response for specific error details');
  } else {
    log('✅ Signup functionality is working with the new robust endpoint!', 'green');
  }

  // Check page accessibility
  const pageEndpoints = ['signupPage', 'minimalSignupPage', 'productionSignupPage'];
  const failedPages = pageEndpoints.filter(page => !results[page]?.success);

  if (failedPages.length > 0) {
    issues.push(`❌ ${failedPages.length}/${pageEndpoints.length} signup pages failing`);
    recommendations.push('Check for SSR issues and environment variable access in page components');
  }

  // Display findings
  log('\n🔍 FINDINGS:', 'bold');
  if (issues.length === 0) {
    log('✅ No critical issues detected!', 'green');
    log('The new robust signup endpoint should resolve your production issues.', 'green');
  } else {
    issues.forEach(issue => log(`   ${issue}`, 'red'));
  }

  log('\n💡 RECOMMENDATIONS:', 'bold');
  if (recommendations.length === 0) {
    recommendations.push('✅ Use the new robust signup endpoint: /api/robust-signup');
    recommendations.push('✅ Update your signup form to use the new endpoint');
    recommendations.push('✅ Test the signup functionality manually');
  }
  recommendations.forEach(rec => log(`   • ${rec}`, 'yellow'));

  // Specific debugging info
  if (results.productionDebug?.data) {
    log('\n🔧 PRODUCTION DEBUG INFO:', 'bold');
    const debugData = results.productionDebug.data;

    if (debugData.summary) {
      log(`   Overall Health: ${debugData.summary.overallHealth}`,
          debugData.summary.overallHealth === 'HEALTHY' ? 'green' : 'red');
      log(`   Successful Steps: ${debugData.summary.successfulSteps}`, 'blue');
    }

    if (debugData.recommendations) {
      log('\n   Server Recommendations:', 'yellow');
      debugData.recommendations.forEach(rec => log(`   • ${rec}`, 'yellow'));
    }
  }

  // Next steps
  log('\n🚀 IMMEDIATE NEXT STEPS:', 'bold');
  log('1. If the robust signup endpoint works, update your frontend to use it', 'green');
  log('2. Check the production debug response for environment variable issues', 'yellow');
  log('3. If issues persist, check your hosting platform environment configuration', 'yellow');
  log('4. Monitor server logs during signup attempts', 'yellow');

  log('\n🎯 CONCLUSION:', 'bold');
  if (results.actualSignup?.success) {
    log('✅ The new robust signup endpoint successfully resolves your 500 error!', 'green');
    log('Update your signup form to use /api/robust-signup and the issue should be fixed.', 'green');
  } else {
    log('❌ Signup is still failing. Check the debug information above for specific issues.', 'red');
    log('The most likely causes are missing environment variables or Supabase configuration issues.', 'yellow');
  }
}

// Run the diagnostic
runDiagnostic().catch(error => {
  log('\n💥 DIAGNOSTIC SCRIPT FAILED:', 'red');
  log(error.message, 'red');
  process.exit(1);
});