#!/usr/bin/env node

/**
 * Production Diagnostic Script
 * Tests various endpoints to identify deployment/infrastructure issues
 */

const https = require('https');
const http = require('http');

const PRODUCTION_URL = 'https://sanluisway.com';
const TIMEOUT = 10000;

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

function makeRequest(url, expectedStatusCode = 200) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      timeout: TIMEOUT,
      headers: {
        'User-Agent': 'SLP-Diagnostic-Script/1.0'
      }
    };

    const req = client.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          url,
          statusCode: res.statusCode,
          headers: res.headers,
          data: data.substring(0, 500), // First 500 chars
          success: res.statusCode === expectedStatusCode,
          size: data.length
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

    req.end();
  });
}

async function testEndpoint(path, description, expectedStatus = 200) {
  const url = `${PRODUCTION_URL}${path}`;
  log(`\nTesting: ${description}`, 'blue');
  log(`URL: ${url}`, 'yellow');

  const result = await makeRequest(url, expectedStatus);

  if (result.success) {
    log(`✅ SUCCESS - Status: ${result.statusCode}`, 'green');
    if (result.data.includes('{"')) {
      log(`📄 Response: JSON data (${result.size} bytes)`, 'blue');
    } else if (result.data.includes('<!DOCTYPE html>')) {
      log(`📄 Response: HTML page (${result.size} bytes)`, 'blue');
    } else {
      log(`📄 Response: ${result.data.substring(0, 100)}...`, 'blue');
    }
  } else {
    log(`❌ FAILED - Status: ${result.statusCode}`, 'red');
    if (result.error) {
      log(`💥 Error: ${result.error}`, 'red');
    }
    if (result.data) {
      log(`📄 Response preview: ${result.data.substring(0, 200)}...`, 'yellow');
    }
  }

  return result;
}

async function runDiagnostic() {
  log('🔍 Starting Production Diagnostic for SanLuisWay.com', 'bold');
  log('=' .repeat(60), 'blue');

  const tests = [
    // Basic connectivity
    { path: '/', description: 'Homepage', status: 200 },
    { path: '/about', description: 'About page', status: 200 },

    // The problematic pages
    { path: '/signup', description: 'Signup page (PROBLEM)', status: 200 },

    // API endpoints
    { path: '/api/health-check', description: 'Health check API', status: 200 },
    { path: '/api/debug-supabase', description: 'Supabase debug API (PROBLEM)', status: 200 },

    // Other API endpoints to compare
    { path: '/api/contact', description: 'Contact API (comparison)', status: 405 }, // Should be Method Not Allowed for GET

    // Static assets
    { path: '/favicon.ico', description: 'Favicon', status: 200 },
    { path: '/_next/static/', description: 'Next.js static assets', status: 404 }, // Expected 404 for directory
  ];

  const results = [];

  for (const test of tests) {
    const result = await testEndpoint(test.path, test.description, test.status);
    results.push({ ...test, result });

    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Summary
  log('\n' + '=' .repeat(60), 'blue');
  log('📊 DIAGNOSTIC SUMMARY', 'bold');
  log('=' .repeat(60), 'blue');

  const successful = results.filter(r => r.result.success);
  const failed = results.filter(r => !r.result.success);

  log(`\n✅ Successful tests: ${successful.length}/${results.length}`, 'green');
  log(`❌ Failed tests: ${failed.length}/${results.length}`, failed.length > 0 ? 'red' : 'green');

  if (failed.length > 0) {
    log('\n🚨 FAILED TESTS:', 'red');
    failed.forEach(test => {
      log(`  • ${test.description} (${test.path}) - Status: ${test.result.statusCode}`, 'red');
    });
  }

  // Analysis
  log('\n🔬 ANALYSIS:', 'bold');

  const apiFailures = failed.filter(test => test.path.startsWith('/api/'));
  const pageFailures = failed.filter(test => !test.path.startsWith('/api/') && !test.path.includes('.'));

  if (apiFailures.length > 0) {
    log('• API endpoints are failing - possible Next.js API routes not being served', 'yellow');
  }

  if (pageFailures.length > 0) {
    log('• Page routes are failing - possible SSR/deployment issues', 'yellow');
  }

  const homepageResult = results.find(r => r.path === '/');
  if (homepageResult?.result.success) {
    log('• Homepage works - basic Next.js deployment is functional', 'green');
  }

  const healthResult = results.find(r => r.path === '/api/health-check');
  if (healthResult?.result.success) {
    log('• Health check API works - API routes are partially functional', 'green');
  } else if (healthResult?.result.statusCode === 404) {
    log('• Health check API 404 - API routes may not be deployed correctly', 'red');
  }

  log('\n🎯 NEXT STEPS:', 'bold');
  if (failed.length === 0) {
    log('• All tests passed! The issue may be intermittent or resolved.', 'green');
  } else {
    log('• Check server logs for detailed error messages', 'blue');
    log('• Verify Next.js build output includes all API routes', 'blue');
    log('• Check if server is properly serving the .next directory', 'blue');
    log('• Verify environment variables are loaded at runtime', 'blue');
  }

  log('\n🏁 Diagnostic completed!', 'bold');
}

// Run the diagnostic
runDiagnostic().catch(console.error);