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
  const [debugInfo, setDebugInfo] = useState<any[]>([]);
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ProductionSignUpFormValues>();
  const password = watch("password");

  const addDebugLog = (message: string) => {
    const timestamp = new Date().toISOString();
    setDebugInfo(prev => [...prev, `${timestamp}: ${message}`]);
    console.log(`[PRODUCTION-SIGNUP] ${message}`);
  };

  const onSubmit = async (data: ProductionSignUpFormValues) => {
    setIsLoading(true);
    setDebugInfo([]);
    addDebugLog('Starting production signup with robust API...');

    try {
      // Use the robust signup endpoint for production reliability
      addDebugLog('Making API call to robust-signup endpoint...');

      const response = await fetch('/api/robust-signup', {
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

      const result = await response.json();
      addDebugLog(`API response received: ${JSON.stringify({ success: result.success, hasUser: !!result.user })}`);

      if (!response.ok) {
        addDebugLog(`API error response: ${result.error}`);
        throw new Error(result.error || `HTTP ${response.status}`);
      }

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
        router.push('/signin?message=check-email');
      }, 2000);

    } catch (error: any) {
      console.error('❌ Production signup error:', error);
      addDebugLog(`Signup failed with error: ${error.message}`);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Production Signup</h2>

      {success ? (
        <div className="bg-green-50 p-4 rounded-md mb-6">
          <div className="text-green-700 text-center">
            <div className="font-medium">Account created successfully!</div>
            <div className="text-sm mt-1">Please check your email to verify your account.</div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('email')}
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format"
                }
              })}
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t('password')}
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Choose a strong password"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              {t('confirm_password')}
            </label>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: value => value === password || "Passwords do not match"
              })}
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Account...
              </div>
            ) : (
              t('sign_up')
            )}
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              {t('already_have_account')} {' '}
              <Link href="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                {t('sign_in')}
              </Link>
            </span>
          </div>
        </form>
      )}

      {/* Debug Information (Development Only) */}
      {process.env.NODE_ENV === 'development' && debugInfo.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Debug Log:</h4>
          <div className="text-xs text-gray-600 space-y-1 max-h-40 overflow-y-auto">
            {debugInfo.map((log, index) => (
              <div key={index} className="font-mono">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}