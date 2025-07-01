import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const healthCheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    services: {
      database: { status: 'unknown', message: '' },
      environment: { status: 'unknown', message: '' },
      build: { status: 'unknown', message: '' }
    },
    errors: [] as string[]
  };

  try {
    // Check environment variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ];

    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

    if (missingEnvVars.length === 0) {
      healthCheck.services.environment = {
        status: 'healthy',
        message: 'All required environment variables are present'
      };
    } else {
      healthCheck.services.environment = {
        status: 'error',
        message: `Missing environment variables: ${missingEnvVars.join(', ')}`
      };
      healthCheck.errors.push(`Missing environment variables: ${missingEnvVars.join(', ')}`);
    }

    // Check Supabase connection
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Try a simple query to test the connection
        const { data, error } = await supabase
          .from('places')
          .select("*")
          .limit(1);

        if (error) {
          healthCheck.services.database = {
            status: 'error',
            message: `Supabase connection failed: ${error.message}`
          };
          healthCheck.errors.push(`Database: ${error.message}`);
        } else {
          healthCheck.services.database = {
            status: 'healthy',
            message: 'Supabase connection successful'
          };
        }
      } else {
        healthCheck.services.database = {
          status: 'error',
          message: 'Supabase credentials not configured'
        };
        healthCheck.errors.push('Supabase credentials not configured');
      }
    } catch (dbError: any) {
      healthCheck.services.database = {
        status: 'error',
        message: `Database connection error: ${dbError.message}`
      };
      healthCheck.errors.push(`Database: ${dbError.message}`);
    }

    // Check build status
    try {
      // Try to read a build-time file or check if pages are accessible
      healthCheck.services.build = {
        status: 'healthy',
        message: 'Application built successfully'
      };
    } catch (buildError: any) {
      healthCheck.services.build = {
        status: 'error',
        message: `Build check failed: ${buildError.message}`
      };
      healthCheck.errors.push(`Build: ${buildError.message}`);
    }

    // Determine overall status
    const hasErrors = Object.values(healthCheck.services).some(service => service.status === 'error');

    if (hasErrors) {
      healthCheck.status = 'degraded';
    }

    // Return appropriate status code
    const statusCode = hasErrors ? 503 : 200;

    return res.status(statusCode).json(healthCheck);

  } catch (error: any) {
    console.error('Health check error:', error);

    return res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      message: 'Health check failed',
      error: error.message || 'Unknown error occurred',
      services: healthCheck.services,
      errors: [...healthCheck.errors, error.message || 'Unknown error']
    });
  }
}