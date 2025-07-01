import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('🔍 Debug Minimal Signup called');

  try {
    // Get environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('Environment check:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      method: req.method
    });

    if (!supabaseUrl || !supabaseAnonKey) {
      return res.status(500).json({
        error: 'Missing environment variables',
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseAnonKey
      });
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      }
    });

    console.log('Supabase client created');

    // Test data
    const testEmail = `debug-test-${Date.now()}@example.com`;
    const testPassword = 'debug123456';

    console.log('Attempting signup with:', { email: testEmail, passwordLength: testPassword.length });

    // Try the signup
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });

    console.log('Signup result:', {
      hasData: !!data,
      hasUser: !!data?.user,
      userId: data?.user?.id,
      userEmail: data?.user?.email,
      hasError: !!error,
      errorMessage: error?.message,
      errorStatus: error?.status,
      errorName: error?.name
    });

    // Return detailed response
    return res.status(200).json({
      success: !error,
      testEmail: testEmail,
      supabaseResponse: {
        data: data ? {
          user: data.user ? {
            id: data.user.id,
            email: data.user.email,
            emailConfirmed: !!data.user.email_confirmed_at,
            createdAt: data.user.created_at
          } : null,
          session: !!data.session
        } : null,
        error: error ? {
          message: error.message,
          status: error.status,
          name: error.name,
          __isAuthError: error.__isAuthError
        } : null
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        nodeVersion: process.version,
        platform: process.platform
      },
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('💥 Unexpected error:', error);

    return res.status(500).json({
      success: false,
      error: 'Unexpected server error',
      details: {
        message: error.message,
        stack: error.stack?.split.slice(0, 5), // First 5 lines of stack
        name: error.name,
        cause: error.cause
      },
      timestamp: new Date().toISOString()
    });
  }
}