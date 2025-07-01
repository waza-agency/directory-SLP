import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

interface DiagnosticResult {
  environment: {
    nodeEnv: string;
    hasSupabaseUrl: boolean;
    hasAnonKey: boolean;
    hasServiceRoleKey: boolean;
    supabaseUrl: string | undefined;
  };
  connectionTests: {
    anonClientConnection: any;
    serviceRoleConnection: any;
  };
  tableTests: {
    usersTableExists: any;
    businessProfilesTableExists: any;
    usersTableStructure: any;
    businessProfilesTableStructure: any;
  };
  permissionTests: {
    canInsertUser: any;
    canUpdateUser: any;
    canInsertBusinessProfile: any;
  };
  authTests: {
    testAuthSignup: any;
  };
  errors: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result: DiagnosticResult = {
    environment: {
      nodeEnv: process.env.NODE_ENV || 'unknown',
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    },
    connectionTests: {},
    tableTests: {},
    permissionTests: {},
    authTests: {},
    errors: []
  };

  console.log('=== SIGNUP DIAGNOSTIC STARTED ===');

  // Test 1: Environment Variables
  if (!result.environment.hasSupabaseUrl || !result.environment.hasAnonKey) {
    result.errors.push('Missing required Supabase environment variables');
    return res.status(500).json(result);
  }

  // Test 2: Connection Tests
  try {
    const anonClient = createPagesBrowserClient();
    const { data: anonTest, error: anonError } = await anonClient
      .from('users')
      .select("*")
      .limit(1);

    result.connectionTests.anonClientConnection = {
      status: anonError ? 'error' : 'success',
      error: anonError?.message,
      data: anonTest
    };

    if (anonError) {
      result.errors.push(`Anon client connection failed: ${anonError.message}`);
    }
  } catch (error: any) {
    result.connectionTests.anonClientConnection = {
      status: 'error',
      error: error.message
    };
    result.errors.push(`Anon client connection exception: ${error.message}`);
  }

  // Test service role connection if available
  if (result.environment.hasServiceRoleKey) {
    try {
      const serviceClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      const { data: serviceTest, error: serviceError } = await serviceClient
        .from('users')
        .select("*")
        .limit(1);

      result.connectionTests.serviceRoleConnection = {
        status: serviceError ? 'error' : 'success',
        error: serviceError?.message,
        data: serviceTest
      };

      if (serviceError) {
        result.errors.push(`Service role connection failed: ${serviceError.message}`);
      }
    } catch (error: any) {
      result.connectionTests.serviceRoleConnection = {
        status: 'error',
        error: error.message
      };
      result.errors.push(`Service role connection exception: ${error.message}`);
    }
  }

  // Test 3: Table Structure Tests
  const anonClient = createPagesBrowserClient();

  // Test users table
  try {
    const { data: usersTest, error: usersError } = await anonClient
      .from('users')
      .select("*")
      .limit(0);

    result.tableTests.usersTableExists = {
      status: usersError ? 'error' : 'success',
      error: usersError?.message
    };

    if (usersError) {
      result.errors.push(`Users table access failed: ${usersError.message}`);
    }
  } catch (error: any) {
    result.tableTests.usersTableExists = {
      status: 'error',
      error: error.message
    };
    result.errors.push(`Users table test exception: ${error.message}`);
  }

  // Test business_profiles table
  try {
    const { data: businessTest, error: businessError } = await anonClient
      .from('business_profiles')
      .select("*")
      .limit(0);

    result.tableTests.businessProfilesTableExists = {
      status: businessError ? 'error' : 'success',
      error: businessError?.message
    };

    if (businessError) {
      result.errors.push(`Business profiles table access failed: ${businessError.message}`);
    }
  } catch (error: any) {
    result.tableTests.businessProfilesTableExists = {
      status: 'error',
      error: error.message
    };
    result.errors.push(`Business profiles table test exception: ${error.message}`);
  }

  // Test 4: Permission Tests (simulated with test data)
  const testUserId = '00000000-0000-0000-0000-000000000001';

  // Test user insertion permissions
  try {
    const { data: insertTest, error: insertError } = await anonClient
      .from('users')
      .insert([{
        id: testUserId,
        email: 'test@example.com',
        account_type: 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select();

    result.permissionTests.canInsertUser = {
      status: insertError ? 'error' : 'success',
      error: insertError?.message,
      data: insertTest
    };

    if (insertError && !insertError.message.includes('duplicate')) {
      result.errors.push(`User insertion failed: ${insertError.message}`);
    }

    // Clean up test data if successful
    if (!insertError) {
      await anonClient.from('users').delete().eq('id', testUserId);
    }
  } catch (error: any) {
    result.permissionTests.canInsertUser = {
      status: 'error',
      error: error.message
    };
    result.errors.push(`User insertion test exception: ${error.message}`);
  }

  // Test user update permissions
  try {
    const { data: updateTest, error: updateError } = await anonClient
      .from('users')
      .update({ account_type: 'business' })
      .eq('id', testUserId)
      .select();

    result.permissionTests.canUpdateUser = {
      status: updateError ? 'error' : 'success',
      error: updateError?.message,
      data: updateTest
    };

    if (updateError) {
      result.errors.push(`User update failed: ${updateError.message}`);
    }
  } catch (error: any) {
    result.permissionTests.canUpdateUser = {
      status: 'error',
      error: error.message
    };
    result.errors.push(`User update test exception: ${error.message}`);
  }

  // Test business profile insertion
  try {
    const { data: businessInsertTest, error: businessInsertError } = await anonClient
      .from('business_profiles')
      .insert([{
        user_id: testUserId,
        business_name: 'Test Business',
        business_category: 'test'
      }])
      .select();

    result.permissionTests.canInsertBusinessProfile = {
      status: businessInsertError ? 'error' : 'success',
      error: businessInsertError?.message,
      data: businessInsertTest
    };

    if (businessInsertError) {
      result.errors.push(`Business profile insertion failed: ${businessInsertError.message}`);
    }

    // Clean up test data if successful
    if (!businessInsertError) {
      await anonClient.from('business_profiles').delete().eq('user_id', testUserId);
    }
  } catch (error: any) {
    result.permissionTests.canInsertBusinessProfile = {
      status: 'error',
      error: error.message
    };
    result.errors.push(`Business profile insertion test exception: ${error.message}`);
  }

  // Test 5: Auth Signup Test (if this is a POST request with test credentials)
  if (req.method === 'POST' && req.body.testAuth) {
    try {
      const testEmail = `test+${Date.now()}@example.com`;
      const testPassword = 'testPassword123!';

      const { data: authTest, error: authError } = await anonClient.auth.signUp({
        email: testEmail,
        password: testPassword
      });

      result.authTests.testAuthSignup = {
        status: authError ? 'error' : 'success',
        error: authError?.message,
        hasUser: !!authTest?.user,
        hasSession: !!authTest?.session
      };

      if (authError) {
        result.errors.push(`Auth signup test failed: ${authError.message}`);
      }

      // Clean up test user if successful
      if (authTest?.user && !authError) {
        try {
          await anonClient.auth.admin.deleteUser(authTest.user.id);
        } catch (cleanupError) {
          console.log('Could not clean up test user (this is normal)');
        }
      }
    } catch (error: any) {
      result.authTests.testAuthSignup = {
        status: 'error',
        error: error.message
      };
      result.errors.push(`Auth signup test exception: ${error.message}`);
    }
  }

  console.log('=== SIGNUP DIAGNOSTIC COMPLETED ===');
  console.log('Errors found:', result.errors.length);

  const statusCode = result.errors.length > 0 ? 500 : 200;
  return res.status(statusCode).json(result);
}