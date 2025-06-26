import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Environment variables check
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log('Environment Check:');
    console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');
    console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Set' : '❌ Missing');

    if (!supabaseUrl || !supabaseAnonKey) {
      return res.status(500).json({
        error: 'Missing Supabase environment variables',
        details: {
          url: !!supabaseUrl,
          anonKey: !!supabaseAnonKey,
          serviceKey: !!supabaseServiceKey
        }
      });
    }

    // Test anon client connection
    const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);

    console.log('Testing anon client connection...');
    const { data: anonTest, error: anonError } = await supabaseAnon
      .from('users')
      .select('count')
      .limit(1);

    console.log('Anon test result:', { data: anonTest, error: anonError });

    // Test service role client if available
    let serviceTest = null;
    let serviceError = null;

    if (supabaseServiceKey) {
      const supabaseService = createClient(supabaseUrl, supabaseServiceKey);
      console.log('Testing service role client...');

      const result = await supabaseService
        .from('users')
        .select('count')
        .limit(1);

      serviceTest = result.data;
      serviceError = result.error;
      console.log('Service test result:', { data: serviceTest, error: serviceError });
    }

    // Auth test
    console.log('Testing auth...');
    const { data: authData, error: authError } = await supabaseAnon.auth.getSession();
    console.log('Auth test result:', { session: !!authData?.session, error: authError });

    return res.status(200).json({
      status: 'Supabase Connection Test',
      timestamp: new Date().toISOString(),
      environment: {
        url: !!supabaseUrl,
        anonKey: !!supabaseAnonKey,
        serviceKey: !!supabaseServiceKey,
        nodeEnv: process.env.NODE_ENV
      },
      tests: {
        anonClient: {
          success: !anonError,
          error: anonError?.message,
          data: anonTest
        },
        serviceClient: supabaseServiceKey ? {
          success: !serviceError,
          error: serviceError?.message,
          data: serviceTest
        } : 'Service key not configured',
        auth: {
          success: !authError,
          error: authError?.message,
          hasSession: !!authData?.session
        }
      }
    });

  } catch (error) {
    console.error('Debug API Error:', error);
    return res.status(500).json({
      error: 'Diagnostic failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}