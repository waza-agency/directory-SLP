import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

interface DebugResponse {
  step: string;
  success: boolean;
  data?: any;
  error?: string;
  environment: string;
  timestamp: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<DebugResponse[]>) {
  const results: DebugResponse[] = [];
  const timestamp = new Date().toISOString();

  // Helper function to add debug step
  const addStep = (step: string, success: boolean, data?: any, error?: string) => {
    results.push({
      step,
      success,
      data,
      error,
      environment: process.env.NODE_ENV || 'unknown',
      timestamp
    });
    console.log(`[DEBUG] ${step}: ${success ? 'SUCCESS' : 'FAILED'}`, { data, error });
  };

  try {
    addStep('1. API Called', true, { method: req.method, url: req.url });

    // Step 2: Check Environment Variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    addStep('2. Environment Check', !!(supabaseUrl && supabaseAnonKey), {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      urlStart: supabaseUrl?.substring(0, 20) + '...',
      keyStart: supabaseAnonKey?.substring(0, 10) + '...'
    });

    if (!supabaseUrl || !supabaseAnonKey) {
      return res.status(200).json(results);
    }

    // Step 3: Create Supabase Client
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false
        }
      });
      addStep('3. Supabase Client Created', true);

      // Step 4: Test Simple Connection
      try {
        const { data: authData, error: authError } = await supabase.auth.getSession();
        addStep('4. Supabase Connection Test', !authError, { hasSession: !!authData?.session }, authError?.message);
      } catch (error: any) {
        addStep('4. Supabase Connection Test', false, null, error.message);
      }

      // Step 5: Test Signup with Dummy Data (if POST request)
      if (req.method === 'POST') {
        const testEmail = `test-${Date.now()}@example.com`;
        const testPassword = 'test123456';

        try {
          const { data, error } = await supabase.auth.signUp({
            email: testEmail,
            password: testPassword,
          });

          addStep('5. Test Signup', !error, {
            userId: data?.user?.id,
            userEmail: data?.user?.email,
            needsConfirmation: !!data?.user?.email_confirmed_at
          }, error?.message);

        } catch (error: any) {
          addStep('5. Test Signup', false, null, error.message);
        }
      } else {
        addStep('5. Test Signup', true, { skipped: 'GET request' });
      }

    } catch (error: any) {
      addStep('3. Supabase Client Created', false, null, error.message);
    }

    // Step 6: Check Node.js Version and Environment
    addStep('6. Node Environment', true, {
      nodeVersion: process.version,
      platform: process.platform,
      nodeEnv: process.env.NODE_ENV,
      isVercel: !!process.env.VERCEL,
      isNetlify: !!process.env.NETLIFY
    });

  } catch (error: any) {
    addStep('ERROR', false, null, error.message);
  }

  // Return all debug results
  return res.status(200).json(results);
}