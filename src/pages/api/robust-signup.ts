import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

interface SignupRequest {
  email: string;
  password: string;
}

interface SignupResponse {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    email: string;
    emailConfirmed: boolean;
  };
  debug?: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<SignupResponse>) {
  // Set proper headers for production
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  const debugInfo: any = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    requestId: Math.random().toString(36).substring(7)
  };

  try {
    console.log(`[ROBUST-SIGNUP] Starting signup process - Request ID: ${debugInfo.requestId}`);

    // Step 1: Validate request body
    const { email, password }: SignupRequest = req.body || {};

    if (!email || !password) {
      console.log(`[ROBUST-SIGNUP] ${debugInfo.requestId}: Missing email or password`);
      return res.status(400).json({
        success: false,
        error: 'Email and password are required',
        debug: process.env.NODE_ENV !== 'production' ? debugInfo : undefined
      });
    }

    // Step 2: Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log(`[ROBUST-SIGNUP] ${debugInfo.requestId}: Invalid email format - ${email}`);
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
        debug: process.env.NODE_ENV !== 'production' ? debugInfo : undefined
      });
    }

    // Step 3: Validate password strength
    if (password.length < 6) {
      console.log(`[ROBUST-SIGNUP] ${debugInfo.requestId}: Password too short`);
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long',
        debug: process.env.NODE_ENV !== 'production' ? debugInfo : undefined
      });
    }

    // Step 4: Check environment variables with detailed logging
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    debugInfo.environmentCheck = {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      urlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'undefined',
      keyPreview: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'undefined'
    };

    console.log(`[ROBUST-SIGNUP] ${debugInfo.requestId}: Environment check`, debugInfo.environmentCheck);

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error(`[ROBUST-SIGNUP] ${debugInfo.requestId}: Missing Supabase environment variables`);
      return res.status(500).json({
        success: false,
        error: 'Server configuration error - missing environment variables',
        debug: process.env.NODE_ENV !== 'production' ? debugInfo : undefined
      });
    }

    // Step 5: Validate Supabase URL format
    if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
      console.error(`[ROBUST-SIGNUP] ${debugInfo.requestId}: Invalid Supabase URL format`);
      return res.status(500).json({
        success: false,
        error: 'Server configuration error - invalid Supabase URL',
        debug: process.env.NODE_ENV !== 'production' ? debugInfo : undefined
      });
    }

    // Step 6: Create Supabase client with robust configuration
    console.log(`[ROBUST-SIGNUP] ${debugInfo.requestId}: Creating Supabase client`);

    let supabase;
    try {
      supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
          flowType: 'pkce'
        },
        global: {
          headers: {
            'X-Client-Info': 'directory-slp-robust-signup'
          }
        }
      });

      debugInfo.supabaseClientCreated = true;
      console.log(`[ROBUST-SIGNUP] ${debugInfo.requestId}: Supabase client created successfully`);
    } catch (clientError: any) {
      console.error(`[ROBUST-SIGNUP] ${debugInfo.requestId}: Failed to create Supabase client`, clientError);
      return res.status(500).json({
        success: false,
        error: 'Failed to initialize authentication service',
        debug: process.env.NODE_ENV !== 'production' ? { ...debugInfo, clientError: clientError.message } : undefined
      });
    }

    // Step 7: Clean and prepare email
    const cleanEmail = email.trim().toLowerCase();
    debugInfo.cleanEmail = cleanEmail;

    // Step 8: Attempt signup with retry logic
    console.log(`[ROBUST-SIGNUP] ${debugInfo.requestId}: Attempting signup for ${cleanEmail}`);

    let signupResult;
    let signupError;
    const maxRetries = 2;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[ROBUST-SIGNUP] ${debugInfo.requestId}: Signup attempt ${attempt}/${maxRetries}`);

        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: password,
          options: {
            emailRedirectTo: undefined, // Prevent redirect issues
            data: {} // Empty metadata to avoid serialization issues
          }
        });

        signupResult = data;
        signupError = error;

        if (!error) {
          console.log(`[ROBUST-SIGNUP] ${debugInfo.requestId}: Signup successful on attempt ${attempt}`);
          break;
        } else {
          console.log(`[ROBUST-SIGNUP] ${debugInfo.requestId}: Signup failed on attempt ${attempt}:`, error.message);
          if (attempt < maxRetries && (error.message.includes('timeout') || error.message.includes('network'))) {
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            continue;
          }
        }
      } catch (attemptError: any) {
        console.error(`[ROBUST-SIGNUP] ${debugInfo.requestId}: Signup attempt ${attempt} threw error:`, attemptError);
        signupError = attemptError;

        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          continue;
        }
      }
    }

    // Step 9: Handle signup result
    if (signupError) {
      console.error(`[ROBUST-SIGNUP] ${debugInfo.requestId}: Final signup error:`, signupError);

      // Map common Supabase errors to user-friendly messages
      let userError = signupError.message || 'Signup failed';

      if (signupError.message?.includes('User already registered')) {
        userError = 'An account with this email already exists';
      } else if (signupError.message?.includes('rate limit')) {
        userError = 'Too many signup attempts. Please wait a few minutes before trying again';
      } else if (signupError.message?.includes('timeout')) {
        userError = 'Request timed out. Please try again';
      } else if (signupError.message?.includes('network')) {
        userError = 'Network error. Please check your connection and try again';
      }

      return res.status(400).json({
        success: false,
        error: userError,
        debug: process.env.NODE_ENV !== 'production' ? {
          ...debugInfo,
          originalError: signupError.message,
          errorCode: signupError.status,
          errorName: signupError.name
        } : undefined
      });
    }

    if (!signupResult?.user) {
      console.error(`[ROBUST-SIGNUP] ${debugInfo.requestId}: No user data returned from signup`);
      return res.status(400).json({
        success: false,
        error: 'Failed to create user account',
        debug: process.env.NODE_ENV !== 'production' ? debugInfo : undefined
      });
    }

    // Step 10: Success response
    console.log(`[ROBUST-SIGNUP] ${debugInfo.requestId}: Signup completed successfully for user ${signupResult.user.id}`);

    debugInfo.success = true;
    debugInfo.userId = signupResult.user.id;

    return res.status(200).json({
      success: true,
      user: {
        id: signupResult.user.id,
        email: signupResult.user.email || cleanEmail,
        emailConfirmed: !!signupResult.user.email_confirmed_at
      },
      debug: process.env.NODE_ENV !== 'production' ? debugInfo : undefined
    });

  } catch (criticalError: any) {
    console.error(`[ROBUST-SIGNUP] ${debugInfo.requestId}: Critical error:`, criticalError);

    debugInfo.criticalError = {
      message: criticalError.message,
      name: criticalError.name,
      stack: criticalError.stack?.split('\n').slice(0, 3)
    };

    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred',
      debug: process.env.NODE_ENV !== 'production' ? debugInfo : undefined
    });
  }
}