#!/usr/bin/env node

const https = require('https');
const http = require('http');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sanluisway.com';
const LOCAL_URL = 'http://localhost:3007';

console.log('🔍 Deployment Verification Script');
console.log('================================');

// Function to make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;

    const req = client.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

// Test endpoints
async function testEndpoint(url, description) {
  console.log(`\n📡 Testing: ${description}`);
  console.log(`   URL: ${url}`);

  try {
    const response = await makeRequest(url);
    console.log(`   ✅ Status: ${response.statusCode}`);

    if (response.statusCode >= 400) {
      console.log(`   ❌ Error response: ${response.data.substring(0, 200)}...`);
    }

    return response;
  } catch (error) {
    console.log(`   ❌ Failed: ${error.message}`);
    return null;
  }
}

// Test health endpoint
async function testHealth(baseUrl) {
  const response = await testEndpoint(`${baseUrl}/health`, 'Health Check');

  if (response && response.statusCode === 200) {
    try {
      const healthData = JSON.parse(response.data);
      console.log(`   📊 Health Status: ${healthData.status}`);
      console.log(`   🌍 Environment: ${healthData.environment}`);
      console.log(`   🔧 Development Mode: ${healthData.developmentMode}`);
      console.log(`   📦 Build ID Present: ${healthData.hasBuildId}`);
    } catch (e) {
      console.log('   ⚠️  Could not parse health response');
    }
  }

  return response;
}

// Test debug login endpoint
async function testDebugLogin(baseUrl) {
  const response = await testEndpoint(`${baseUrl}/api/debug-login`, 'Debug Login Info');

  if (response && response.statusCode === 200) {
    try {
      const debugData = JSON.parse(response.data);
      console.log(`   🌍 Environment: ${debugData.environment}`);
      console.log(`   🔑 Supabase URL: ${debugData.environmentVariables.NEXT_PUBLIC_SUPABASE_URL}`);
      console.log(`   🔑 Supabase Key: ${debugData.environmentVariables.NEXT_PUBLIC_SUPABASE_ANON_KEY}`);
      console.log(`   🔗 Supabase Test: ${debugData.supabaseTest?.status || 'unknown'}`);

      if (debugData.errors && debugData.errors.length > 0) {
        console.log(`   ❌ Errors found:`);
        debugData.errors.forEach(error => console.log(`      - ${error}`));
      }
    } catch (e) {
      console.log('   ⚠️  Could not parse debug response');
    }
  }

  return response;
}

// Test health check endpoint
async function testHealthCheck(baseUrl) {
  const response = await testEndpoint(`${baseUrl}/api/health-check`, 'Health Check API');

  if (response && response.statusCode === 200) {
    try {
      const healthData = JSON.parse(response.data);
      console.log(`   📊 Overall Status: ${healthData.status}`);
      console.log(`   🗄️  Database: ${healthData.services?.database?.status || 'unknown'}`);
      console.log(`   🌍 Environment: ${healthData.services?.environment?.status || 'unknown'}`);
      console.log(`   🔨 Build: ${healthData.services?.build?.status || 'unknown'}`);

      if (healthData.errors && healthData.errors.length > 0) {
        console.log(`   ❌ Errors found:`);
        healthData.errors.forEach(error => console.log(`      - ${error}`));
      }
    } catch (e) {
      console.log('   ⚠️  Could not parse health check response');
    }
  }

  return response;
}

// Test sign in page
async function testSignInPage(baseUrl) {
  const response = await testEndpoint(`${baseUrl}/signin`, 'Sign In Page');

  if (response && response.statusCode === 200) {
    const hasSignInForm = response.data.includes('Sign In') || response.data.includes('signin');
    console.log(`   📝 Has Sign In Form: ${hasSignInForm ? 'Yes' : 'No'}`);

    const hasSupabaseScript = response.data.includes('supabase') || response.data.includes('auth');
    console.log(`   🔐 Has Auth Scripts: ${hasSupabaseScript ? 'Yes' : 'No'}`);
  }

  return response;
}

// Main verification function
async function verifyDeployment() {
  console.log(`🎯 Target URL: ${SITE_URL}`);
  console.log(`🏠 Local URL: ${LOCAL_URL}`);

  // Test production deployment
  console.log('\n🌐 PRODUCTION DEPLOYMENT TESTS');
  console.log('==============================');

  await testEndpoint(SITE_URL, 'Main Site');
  await testHealth(SITE_URL);
  await testHealthCheck(SITE_URL);
  await testDebugLogin(SITE_URL);
  await testSignInPage(SITE_URL);

  // Test local deployment if available
  console.log('\n🏠 LOCAL DEPLOYMENT TESTS');
  console.log('=========================');

  try {
    await testEndpoint(LOCAL_URL, 'Local Site');
    await testHealth(LOCAL_URL);
    await testDebugLogin(LOCAL_URL);
  } catch (error) {
    console.log('   ⚠️  Local deployment not available or not running');
  }

  // Environment check
  console.log('\n🔧 ENVIRONMENT VARIABLES');
  console.log('========================');

  const envVars = [
    'NODE_ENV',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXT_PUBLIC_SITE_URL'
  ];

  envVars.forEach(envVar => {
    const value = process.env[envVar];
    console.log(`   ${envVar}: ${value ? '✅ Set' : '❌ Missing'}`);
  });

  console.log('\n🎉 Verification Complete!');
  console.log('\nNext steps if issues found:');
  console.log('1. Check environment variables in deployment');
  console.log('2. Verify Supabase configuration');
  console.log('3. Check Docker container logs');
  console.log('4. Test authentication endpoints directly');
}

// Run verification
verifyDeployment().catch(error => {
  console.error('❌ Verification failed:', error);
  process.exit(1);
});