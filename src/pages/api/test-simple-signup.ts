import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

interface TestResult {
  step: string;
  success: boolean;
  error?: string;
  data?: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const results: TestResult[] = [];
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'testPassword123';

  console.log('Starting simple signup test with email:', testEmail);

  try {
    // Test 1: Environment check
    results.push({
      step: 'Environment Check',
      success: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      data: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      }
    });

    // Test 2: Supabase client connection
    try {
      const { data: connectionTest, error: connectionError } = await supabase
        .from('users')
        .select("*")
        .limit(1);

      results.push({
        step: 'Supabase Connection',
        success: !connectionError,
        error: connectionError?.message,
        data: connectionTest
      });
    } catch (err: any) {
      results.push({
        step: 'Supabase Connection',
        success: false,
        error: err.message
      });
    }

    // Test 3: Simple auth signup
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      });

      results.push({
        step: 'Auth Signup',
        success: !authError && !!authData?.user,
        error: authError?.message,
        data: authData?.user ? {
          id: authData.user.id,
          email: authData.user.email,
          emailConfirmed: authData.user.email_confirmed_at !== null
        } : null
      });

      // Test 4: Check if user record exists in users table (if auth was successful)
      if (authData?.user && !authError) {
        try {
          // Wait a moment for any triggers to execute
          await new Promise(resolve => setTimeout(resolve, 1000));

          const { data: userData, error: userError } = await supabase
            .from('users')
            .select("*")
            .eq('id', authData.user.id)
            .single();

          results.push({
            step: 'User Record Check',
            success: !userError && !!userData,
            error: userError?.message,
            data: userData
          });
        } catch (err: any) {
          results.push({
            step: 'User Record Check',
            success: false,
            error: err.message
          });
        }

        // Test 5: Cleanup - remove test user
        try {
          const { error: deleteError } = await supabase.auth.admin.deleteUser(authData.user.id);
          results.push({
            step: 'Cleanup',
            success: !deleteError,
            error: deleteError?.message
          });
        } catch (err: any) {
          results.push({
            step: 'Cleanup',
            success: false,
            error: err.message
          });
        }
      }
    } catch (err: any) {
      results.push({
        step: 'Auth Signup',
        success: false,
        error: err.message
      });
    }

    // Summary
    const successCount = results.filter(r => r.success).length;
    const totalTests = results.length;

    res.status(200).json({
      summary: {
        total: totalTests,
        successful: successCount,
        failed: totalTests - successCount,
        allPassed: successCount === totalTests
      },
      testEmail,
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Test suite error:', error);
    res.status(500).json({
      error: 'Test suite failed',
      message: error.message,
      results
    });
  }
}