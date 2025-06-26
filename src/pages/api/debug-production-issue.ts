import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

interface DebugStep {
  step: string;
  success: boolean;
  data?: any;
  error?: string;
  timestamp: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const steps: DebugStep[] = [];
  const startTime = Date.now();

  // Helper to add debug step
  const addStep = (step: string, success: boolean, data?: any, error?: string) => {
    steps.push({
      step,
      success,
      data,
      error,
      timestamp: new Date().toISOString()
    });
    console.log(`[DEBUG-PRODUCTION] ${step}: ${success ? '✅' : '❌'}`, { data, error });
  };

  try {
    addStep('API Endpoint Called', true, {
      method: req.method,
      userAgent: req.headers['user-agent'],
      host: req.headers.host
    });

    // Step 1: Check basic Node.js environment
    addStep('Node.js Environment Check', true, {
      nodeVersion: process.version,
      platform: process.platform,
      nodeEnv: process.env.NODE_ENV,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime()
    });

    // Step 2: Check critical environment variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'NODE_ENV'
    ];

    const envCheck: any = {};
    requiredEnvVars.forEach(envVar => {
      const value = process.env[envVar];
      envCheck[envVar] = {
        exists: !!value,
        length: value?.length || 0,
        preview: value ? `${value.substring(0, 20)}...` : 'undefined'
      };
    });

    const allEnvVarsPresent = requiredEnvVars.every(envVar => !!process.env[envVar]);
    addStep('Environment Variables Check', allEnvVarsPresent, envCheck);

    if (!allEnvVarsPresent) {
      return res.status(200).json({
        summary: 'Environment variables missing - this is likely the root cause',
        steps,
        recommendations: [
          'Check your production hosting platform environment variables',
          'Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set',
          'Verify environment variables are available at runtime, not just build time'
        ]
      });
    }

    // Step 3: Test Supabase client creation
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false
        }
      });
      addStep('Supabase Client Creation', true, {
        clientCreated: true,
        url: `${supabaseUrl.substring(0, 30)}...`
      });

      // Step 4: Test basic Supabase connection
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        addStep('Supabase Auth Connection Test', !sessionError, {
          hasSession: !!sessionData?.session,
          connectionWorking: true
        }, sessionError?.message);
      } catch (connectionError: any) {
        addStep('Supabase Auth Connection Test', false, null, connectionError.message);
      }

      // Step 5: Test signup functionality (if this is a POST request)
      if (req.method === 'POST') {
        const testEmail = `debug-${Date.now()}@example.com`;
        const testPassword = 'DebugPassword123!';

        try {
          const { data: signupData, error: signupError } = await supabase.auth.signUp({
            email: testEmail,
            password: testPassword,
          });

          addStep('Test Signup Operation', !signupError, {
            userCreated: !!signupData?.user,
            userId: signupData?.user?.id,
            emailConfirmationRequired: !signupData?.user?.email_confirmed_at
          }, signupError?.message);

          // Clean up test user if created successfully
          if (signupData?.user && !signupError) {
            try {
              // Attempt to delete test user (may not have permissions, that's ok)
              await supabase.auth.admin.deleteUser(signupData.user.id);
            } catch (cleanupError) {
              // Ignore cleanup errors
            }
          }
        } catch (signupError: any) {
          addStep('Test Signup Operation', false, null, signupError.message);
        }
      }

    } catch (clientError: any) {
      addStep('Supabase Client Creation', false, null, clientError.message);
    }

    // Step 6: Check Next.js specific environment
    addStep('Next.js Environment Check', true, {
      isServerSide: typeof window === 'undefined',
      hasNext: typeof process.env.__NEXT_PROCESSED_ENV !== 'undefined',
      buildTime: process.env.BUILD_TIME || 'unknown',
      deploymentPlatform: {
        vercel: !!process.env.VERCEL,
        netlify: !!process.env.NETLIFY,
        railway: !!process.env.RAILWAY_ENVIRONMENT,
        render: !!process.env.RENDER,
        heroku: !!process.env.DYNO
      }
    });

    // Step 7: Test file system access (sometimes production environments are read-only)
    try {
      const canAccessFs = typeof require !== 'undefined';
      addStep('File System Access', canAccessFs, {
        nodeModulesAccessible: canAccessFs,
        readOnlyEnvironment: false
      });
    } catch (fsError: any) {
      addStep('File System Access', false, null, fsError.message);
    }

    const executionTime = Date.now() - startTime;
    const successfulSteps = steps.filter(s => s.success).length;
    const totalSteps = steps.length;

    return res.status(200).json({
      summary: {
        overallHealth: successfulSteps === totalSteps ? 'HEALTHY' : 'ISSUES_DETECTED',
        successfulSteps: `${successfulSteps}/${totalSteps}`,
        executionTime: `${executionTime}ms`,
        environment: process.env.NODE_ENV || 'unknown'
      },
      steps,
      recommendations: generateRecommendations(steps),
      nextSteps: [
        'If all steps are successful, the 500 error might be intermittent',
        'If environment variables are missing, check your hosting platform configuration',
        'If Supabase connection fails, check your Supabase project status',
        'If signup test fails, check Supabase auth configuration and RLS policies'
      ]
    });

  } catch (criticalError: any) {
    addStep('Critical Error Occurred', false, null, criticalError.message);

    return res.status(500).json({
      summary: {
        overallHealth: 'CRITICAL_ERROR',
        error: criticalError.message,
        stack: criticalError.stack?.split('\n').slice(0, 5)
      },
      steps,
      recommendations: [
        'This critical error is likely the cause of your 500 errors',
        'Check the error message and stack trace above',
        'Verify your production environment configuration'
      ]
    });
  }
}

function generateRecommendations(steps: DebugStep[]): string[] {
  const recommendations: string[] = [];

  const envStep = steps.find(s => s.step === 'Environment Variables Check');
  if (envStep && !envStep.success) {
    recommendations.push('❌ CRITICAL: Environment variables are missing. This is likely the root cause of your 500 error.');
    recommendations.push('📝 ACTION: Check your hosting platform (Vercel, Netlify, etc.) environment variable configuration.');
  }

  const supabaseStep = steps.find(s => s.step === 'Supabase Client Creation');
  if (supabaseStep && !supabaseStep.success) {
    recommendations.push('❌ Supabase client creation failed. Check your Supabase URL and key format.');
  }

  const connectionStep = steps.find(s => s.step === 'Supabase Auth Connection Test');
  if (connectionStep && !connectionStep.success) {
    recommendations.push('❌ Supabase connection failed. Check your Supabase project status and network connectivity.');
  }

  const signupStep = steps.find(s => s.step === 'Test Signup Operation');
  if (signupStep && !signupStep.success) {
    recommendations.push('❌ Signup operation failed. Check Supabase auth settings and RLS policies.');
  }

  if (recommendations.length === 0) {
    recommendations.push('✅ All checks passed. The 500 error might be intermittent or already resolved.');
    recommendations.push('🧪 Try testing the actual signup page to confirm the fix.');
  }

  return recommendations;
}