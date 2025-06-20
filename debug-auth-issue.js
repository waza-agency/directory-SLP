#!/usr/bin/env node

/**
 * Authentication Issue Diagnostic Script
 *
 * This script helps diagnose and fix the 500 Internal Server Error
 * that occurs during login/account page access.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sanluisway.com';

console.log('🔍 Starting Authentication Issue Diagnosis');
console.log('==========================================\n');

async function checkEnvironmentVariables() {
  console.log('1. 🔧 Checking Environment Variables...');

  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];

  const envIssues = [];

  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (!value) {
      envIssues.push(`❌ ${varName} is not set`);
    } else {
      console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
    }
  });

  if (envIssues.length > 0) {
    console.log('\n⚠️  Environment Variable Issues:');
    envIssues.forEach(issue => console.log(`   ${issue}`));

    console.log('\n📝 To fix environment issues:');
    console.log('   1. Check your .env.local file');
    console.log('   2. Ensure all Supabase variables are correctly set');
    console.log('   3. Restart your server after making changes');
    return false;
  }

  console.log('✅ All required environment variables are set\n');
  return true;
}

async function testSupabaseConnection() {
  console.log('2. 🔗 Testing Supabase Connection...');

  try {
    const response = await makeRequest(`${SITE_URL}/api/debug-login`);

    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);

      console.log('✅ Debug endpoint accessible');
      console.log(`   Environment: ${data.environment}`);
      console.log(`   Supabase URL: ${data.environmentVariables.NEXT_PUBLIC_SUPABASE_URL}`);
      console.log(`   Supabase Key: ${data.environmentVariables.NEXT_PUBLIC_SUPABASE_ANON_KEY}`);

      if (data.supabaseTest && data.supabaseTest.status === 'success') {
        console.log('✅ Supabase connection successful');
      } else {
        console.log('❌ Supabase connection failed');
        if (data.supabaseTest?.error) {
          console.log(`   Error: ${data.supabaseTest.error}`);
        }
        return false;
      }
    } else {
      console.log(`❌ Debug endpoint returned status: ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Failed to test Supabase connection: ${error.message}`);
    return false;
  }

  console.log('');
  return true;
}

async function testAccountPage() {
  console.log('3. 🏠 Testing Account Page...');

  try {
    const response = await makeRequest(`${SITE_URL}/account`);

    if (response.statusCode === 200) {
      console.log('✅ Account page loads successfully');
      console.log('   This means the 500 error might be session-specific');
    } else if (response.statusCode === 500) {
      console.log('❌ Account page returns 500 error');
      console.log('   This confirms the server-side rendering issue');

      // Check if it's a specific pattern in the error
      if (response.body.includes('getStaticProps')) {
        console.log('   🔍 Detected getStaticProps issue - check for SSG/SSR conflicts');
      }
      if (response.body.includes('Supabase')) {
        console.log('   🔍 Detected Supabase-related error in response');
      }
      if (response.body.includes('auth')) {
        console.log('   🔍 Detected authentication-related error');
      }

      return false;
    } else if (response.statusCode === 302 || response.statusCode === 307) {
      console.log('✅ Account page redirects (expected for non-authenticated users)');
    } else {
      console.log(`⚠️  Account page returned unexpected status: ${response.statusCode}`);
    }
  } catch (error) {
    console.log(`❌ Failed to test account page: ${error.message}`);
    return false;
  }

  console.log('');
  return true;
}

async function checkDatabaseTables() {
  console.log('4. 🗄️  Checking Database Tables...');

  // Check if we can access critical tables
  const criticalTables = ['users', 'business_profiles', 'orders'];

  try {
    const response = await makeRequest(`${SITE_URL}/api/health-check`);

    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);

      if (data.services && data.services.supabase) {
        if (data.services.supabase.status === 'healthy') {
          console.log('✅ Database connection healthy');
        } else {
          console.log('❌ Database connection issues detected');
          if (data.services.supabase.error) {
            console.log(`   Error: ${data.services.supabase.error}`);
          }
          return false;
        }
      }
    } else {
      console.log('⚠️  Could not check database health');
    }
  } catch (error) {
    console.log(`⚠️  Could not check database health: ${error.message}`);
  }

  console.log('');
  return true;
}

function generateFixSuggestions(issues) {
  console.log('🔧 RECOMMENDED FIXES');
  console.log('==================');

  if (issues.length === 0) {
    console.log('✅ No major issues detected. The 500 error might be intermittent or user-specific.');
    console.log('\n📋 General recommendations:');
    console.log('   1. Check server logs for specific error details');
    console.log('   2. Monitor the application during login attempts');
    console.log('   3. Consider implementing additional error boundaries');
    return;
  }

  console.log('\n🚨 Issues found that likely cause the 500 error:\n');

  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue}`);
  });

  console.log('\n📋 Step-by-step fix instructions:');
  console.log('\n1. Environment Variables:');
  console.log('   - Copy .env.example to .env.local');
  console.log('   - Fill in your Supabase credentials');
  console.log('   - Restart your development server');

  console.log('\n2. Database Connection:');
  console.log('   - Verify your Supabase project is active');
  console.log('   - Check if your API keys have the correct permissions');
  console.log('   - Run database migrations if needed');

  console.log('\n3. Account Page Issues:');
  console.log('   - The updated code includes better error handling');
  console.log('   - Deploy the latest changes to fix SSR issues');
  console.log('   - Monitor logs for specific error patterns');

  console.log('\n4. Testing:');
  console.log('   - Try logging in after making these changes');
  console.log('   - Check browser console for client-side errors');
  console.log('   - Use the debug endpoint to verify configuration');
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Auth-Diagnostic-Tool/1.0'
      },
      timeout: 10000
    };

    const req = (urlObj.protocol === 'https:' ? https : require('http')).request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function main() {
  const issues = [];

  try {
    const envOk = await checkEnvironmentVariables();
    if (!envOk) {
      issues.push('Environment variables not properly configured');
    }

    const supabaseOk = await testSupabaseConnection();
    if (!supabaseOk) {
      issues.push('Supabase connection failing');
    }

    const accountOk = await testAccountPage();
    if (!accountOk) {
      issues.push('Account page returning 500 error');
    }

    const dbOk = await checkDatabaseTables();
    if (!dbOk) {
      issues.push('Database connection or table access issues');
    }

    generateFixSuggestions(issues);

  } catch (error) {
    console.error('❌ Diagnostic script failed:', error.message);
  }

  console.log('\n🏁 Diagnosis complete!');
  console.log('   Run this script again after applying fixes to verify the resolution.');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };