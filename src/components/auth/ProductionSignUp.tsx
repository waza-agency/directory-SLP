import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';

type ProductionSignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function ProductionSignUp() {
  const { t } = useTranslation('common');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ProductionSignUpFormValues>();
  const password = watch("password");

  // Add debug logging for production
  const addDebugLog = (message: string) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}`;
    console.log(logEntry);
    setDebugInfo(prev => [...prev, logEntry]);
  };

  const onSubmit = async (data: ProductionSignUpFormValues) => {
    setIsLoading(true);
    setDebugInfo([]);
    addDebugLog('Starting production signup process...');

    try {
      // Check environment first
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      addDebugLog(`Environment check - URL: ${supabaseUrl ? 'SET' : 'MISSING'}, Key: ${supabaseKey ? 'SET' : 'MISSING'}`);

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase environment variables in production');
      }

      // Use direct fetch to avoid SSR issues
      addDebugLog('Making direct API call to avoid SSR issues...');

      const response = await fetch('/api/production-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      addDebugLog(`API response status: ${response.status}`);

      if (!response.ok) {
        const errorData = await response.text();
        addDebugLog(`API error response: ${errorData}`);
        throw new Error(`HTTP ${response.status}: ${errorData}`);
      }

      const result = await response.json();
      addDebugLog(`API success response: ${JSON.stringify(result)}`);

      if (result.error) {
        addDebugLog(`Signup error: ${result.error}`);
        toast.error(result.error);
        return;
      }

      if (!result.success) {
        addDebugLog('Signup failed without specific error');
        toast.error('Failed to create account. Please try again.');
        return;
      }

      addDebugLog('Signup successful!');
      setSuccess(true);
      toast.success('Account created successfully! Please check your email to verify your account.');

      // Redirect after success
      setTimeout(() => {
        addDebugLog('Redirecting to signin...');
        window.location.href = '/signin-simple?message=check-email';
      }, 2000);

    } catch (error: any) {
      addDebugLog(`Unexpected error: ${error.message}`);
      console.error('Production signup error:', error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Account Created!</h3>
          <p className="text-sm text-gray-500 mb-4">
            Please check your email to verify your account before signing in.
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t('signup.title', 'Create Account')}</h2>
        <p className="mt-2 text-sm text-gray-600">
          {t('signup.subtitle', 'Production-ready signup')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {t('email', 'Email')}
          </label>
          <input
            {...register('email', {
              required: t('email_required', 'Email is required'),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t('email_invalid', 'Invalid email address'),
              },
            })}
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t('email_placeholder', 'Enter your email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            {t('password', 'Password')}
          </label>
          <input
            {...register('password', {
              required: t('password_required', 'Password is required'),
              minLength: {
                value: 6,
                message: t('password_min_length', 'Password must be at least 6 characters'),
              },
            })}
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t('password_placeholder', 'Enter your password')}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            {t('confirm_password', 'Confirm Password')}
          </label>
          <input
            {...register('confirmPassword', {
              required: t('confirm_password_required', 'Please confirm your password'),
              validate: (value) =>
                value === password || t('passwords_dont_match', 'Passwords do not match'),
            })}
            type="password"
            id="confirmPassword"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t('confirm_password_placeholder', 'Confirm your password')}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {t('creating_account', 'Creating Account...')}
            </div>
          ) : (
            t('create_account', 'Create Account')
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {t('already_have_account', 'Already have an account?')}{' '}
          <Link href="/signin-simple" className="text-blue-600 hover:text-blue-500 font-medium">
            {t('signin', 'Sign In')}
          </Link>
        </p>
      </div>

      {/* Debug Information in Development */}
      {process.env.NODE_ENV !== 'production' && debugInfo.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Debug Info:</h4>
          <div className="text-xs text-gray-600 max-h-32 overflow-y-auto">
            {debugInfo.map((log, index) => (
              <div key={index} className="font-mono">{log}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}