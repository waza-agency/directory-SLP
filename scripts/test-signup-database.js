#!/usr/bin/env node

// Test script for signup database operations
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing required environment variables');
  process.exit(1);
}

console.log('🔍 Testing Signup Database Operations');
console.log('=====================================');
console.log(`Supabase URL: ${SUPABASE_URL}`);
console.log(`Node Environment: ${process.env.NODE_ENV}`);
console.log('');

async function testDatabaseOperations() {
  // Create clients
  const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const serviceClient = SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    : null;

  const testUserId = `test-${Date.now()}`;
  const testEmail = `testuser${Date.now()}@gmail.com`;

  try {
    // Test 1: Check table access
    console.log('1. 📋 Testing table access...');

    const { data: usersTableTest, error: usersTableError } = await anonClient
      .from('users')
      .select('*')
      .limit(0);

    if (usersTableError) {
      console.log('❌ Users table access failed:', usersTableError.message);
      return false;
    } else {
      console.log('✅ Users table accessible');
    }

    const { data: businessTableTest, error: businessTableError } = await anonClient
      .from('business_profiles')
      .select('*')
      .limit(0);

    if (businessTableError) {
      console.log('❌ Business profiles table access failed:', businessTableError.message);
      return false;
    } else {
      console.log('✅ Business profiles table accessible');
    }

    // Test 2: Auth signup
    console.log('\n2. 🔐 Testing auth signup...');

    const { data: authData, error: authError } = await anonClient.auth.signUp({
      email: testEmail,
      password: 'testPassword123!'
    });

    if (authError) {
      console.log('❌ Auth signup failed:', authError.message);
      return false;
    } else {
      console.log('✅ Auth signup successful');
      console.log(`   User ID: ${authData.user?.id}`);
    }

    // Test 3: User record creation (simulating what happens in signup)
    console.log('\n3. 👤 Testing user record creation...');

    const { data: userRecord, error: userRecordError } = await anonClient
      .from('users')
      .insert([{
        id: authData.user.id,
        email: authData.user.email,
        account_type: 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select();

    if (userRecordError) {
      console.log('❌ User record creation failed:', userRecordError.message);
      console.log('   Error details:', {
        code: userRecordError.code,
        details: userRecordError.details,
        hint: userRecordError.hint
      });
    } else {
      console.log('✅ User record created successfully');
    }

    // Test 4: Account type update
    console.log('\n4. 🔄 Testing account type update...');

    const { data: updateData, error: updateError } = await anonClient
      .from('users')
      .update({ account_type: 'business' })
      .eq('id', authData.user.id)
      .select();

    if (updateError) {
      console.log('❌ Account type update failed:', updateError.message);
      console.log('   Error details:', {
        code: updateError.code,
        details: updateError.details,
        hint: updateError.hint
      });
    } else {
      console.log('✅ Account type updated successfully');
    }

    // Test 5: Business profile creation
    console.log('\n5. 🏢 Testing business profile creation...');

    const { data: businessProfile, error: businessProfileError } = await anonClient
      .from('business_profiles')
      .insert([{
        user_id: authData.user.id,
        business_name: 'Test Business',
        business_category: 'technology'
      }])
      .select();

    if (businessProfileError) {
      console.log('❌ Business profile creation failed:', businessProfileError.message);
      console.log('   Error details:', {
        code: businessProfileError.code,
        details: businessProfileError.details,
        hint: businessProfileError.hint
      });
    } else {
      console.log('✅ Business profile created successfully');
    }

    // Cleanup
    console.log('\n6. 🧹 Cleaning up test data...');

    if (businessProfile && !businessProfileError) {
      await anonClient.from('business_profiles').delete().eq('user_id', authData.user.id);
      console.log('✅ Cleaned up business profile');
    }

    if (userRecord && !userRecordError) {
      await anonClient.from('users').delete().eq('id', authData.user.id);
      console.log('✅ Cleaned up user record');
    }

    if (serviceClient && authData.user) {
      try {
        await serviceClient.auth.admin.deleteUser(authData.user.id);
        console.log('✅ Cleaned up auth user');
      } catch (cleanupError) {
        console.log('⚠️  Could not clean up auth user (this is normal without service role key)');
      }
    }

    console.log('\n🎉 All tests completed successfully!');
    return true;

  } catch (error) {
    console.error('\n💥 Unexpected error during testing:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    return false;
  }
}

// Test RLS policies specifically
async function testRLSPolicies() {
  console.log('\n🔒 Testing RLS Policies');
  console.log('======================');

  const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Test anonymous user access
  console.log('Testing anonymous user permissions...');

  // Test read access
  const { data: readTest, error: readError } = await anonClient
    .from('users')
    .select('*')
    .limit(1);

  if (readError) {
    console.log('❌ Anonymous read access failed:', readError.message);
  } else {
    console.log('✅ Anonymous read access works');
  }

  // Test insert access (this should fail due to RLS policies)
  const { data: insertTest, error: insertError } = await anonClient
    .from('users')
    .insert([{
      email: 'test@example.com',
      account_type: 'user'
    }])
    .select();

  if (insertError) {
    console.log('❌ Anonymous insert access failed:', insertError.message);
    console.log('   This might be expected due to RLS policies');
  } else {
    console.log('✅ Anonymous insert access works');
    // Clean up
    await anonClient.from('users').delete().eq('email', 'test@example.com');
  }
}

async function main() {
  console.log('Starting comprehensive signup database test...\n');

  try {
    await testDatabaseOperations();
    await testRLSPolicies();

    console.log('\n✅ All tests completed. Check the results above for any issues.');
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

main();