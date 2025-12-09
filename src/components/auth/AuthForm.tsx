import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { logger } from '@/lib/logger';

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

type AuthMode = 'signup' | 'signin';
type AuthVariant = 'default' | 'minimal' | 'simple';

interface AuthFormProps {
  mode: AuthMode;
  variant?: AuthVariant;
  showAccountType?: boolean;
  enableRetry?: boolean;
  title?: string;
  redirectPath?: string;
}

type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
  accountType?: 'user' | 'business';
  businessCategory?: string;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function AuthForm({
  mode,
  variant = 'default',
  showAccountType = false,
  enableRetry = false,
  title,
  redirectPath
}: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const isSignUp = mode === 'signup';
  const defaultTitle = isSignUp ? 'Create Account' : 'Sign In';
  const displayTitle = title || defaultTitle;

  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormValues>({
    defaultValues: {
      accountType: 'user'
    }
  });

  const password = watch("password");
  const accountType = watch("accountType");

  const attemptAuth = async (
    email: string,
    password: string,
    retryNumber = 0
  ): Promise<any> => {
    try {
      logger.log(`Attempt ${retryNumber + 1}: Calling ${mode} API for ${email}`);

      const endpoint = isSignUp ? '/api/robust-signup' : '/api/signin';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      logger.log(`API Response status: ${response.status}`);

      const result = await response.json();
      logger.log('API result:', result);

      if (!response.ok) {
        if (enableRetry &&
            (result.error?.includes('timeout') ||
             result.error?.includes('network') ||
             response.status >= 500) &&
            retryNumber < MAX_RETRIES) {
          logger.log(`Attempt ${retryNumber + 1} failed, retrying...`);
          await sleep(RETRY_DELAY);
          return attemptAuth(email, password, retryNumber + 1);
        }

        throw new Error(result.error || `HTTP ${response.status}`);
      }

      if (result.error) {
        if (enableRetry &&
            (result.error.includes('timeout') ||
             result.error.includes('network')) &&
            retryNumber < MAX_RETRIES) {
          logger.log(`Attempt ${retryNumber + 1} failed, retrying...`);
          await sleep(RETRY_DELAY);
          return attemptAuth(email, password, retryNumber + 1);
        }

        throw new Error(result.error);
      }

      if (!result.success || (isSignUp && !result.user)) {
        throw new Error(`Failed to ${mode === 'signup' ? 'create account' : 'sign in'}`);
      }

      return {
        data: {
          user: result.user || result
        },
        error: null
      };

    } catch (error: any) {
      if (enableRetry &&
          retryNumber < MAX_RETRIES &&
          (error.message?.includes('timeout') ||
           error.message?.includes('network') ||
           error.name === 'AuthRetryableFetchError')) {
        logger.log(`Attempt ${retryNumber + 1} failed, retrying...`);
        await sleep(RETRY_DELAY);
        return attemptAuth(email, password, retryNumber + 1);
      }

      throw error;
    }
  };

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await attemptAuth(data.email, data.password);

      if (result.error) {
        setError(result.error.message || 'Authentication failed');
        toast.error(result.error.message);
        return;
      }

      setSuccess(true);

      if (isSignUp) {
        toast.success('Account created! Please check your email to verify.');
        setTimeout(() => {
          router.push(redirectPath || '/signin?message=verify-email');
        }, 2000);
      } else {
        toast.success('Signed in successfully!');
        setTimeout(() => {
          router.push(redirectPath || '/dashboard');
        }, 1000);
      }

    } catch (error: any) {
      logger.error(`${mode} error:`, error);
      const errorMessage = error.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getContainerClass = () => {
    switch (variant) {
      case 'minimal':
        return 'max-w-sm w-full mx-auto';
      case 'simple':
        return 'max-w-md w-full mx-auto';
      default:
        return 'max-w-lg w-full mx-auto';
    }
  };

  return (
    <div className={getContainerClass()}>
      <h2 className="text-3xl font-bold text-center mb-6">{displayTitle}</h2>

      {success ? (
        <div className="bg-green-50 p-4 rounded-md mb-6">
          <div className="text-green-700 text-center">
            <div className="font-medium">
              {isSignUp ? 'Account created successfully!' : 'Signed in successfully!'}
            </div>
            {isSignUp && (
              <div className="text-sm mt-1">Please check your email to verify your account.</div>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
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
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
              type="password"
              id="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password (Sign Up Only) */}
          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })}
                type="password"
                id="confirmPassword"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          )}

          {/* Account Type Selection (Optional) */}
          {isSignUp && showAccountType && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    {...register("accountType")}
                    type="radio"
                    value="user"
                    className="mr-2"
                  />
                  <span>Personal Account</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register("accountType")}
                    type="radio"
                    value="business"
                    className="mr-2"
                  />
                  <span>Business Account</span>
                </label>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </span>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>

          {/* Links */}
          <div className="text-center text-sm">
            {isSignUp ? (
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/signin" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            ) : (
              <>
                <p className="text-gray-600 mb-2">
                  Don't have an account?{' '}
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
                <Link href="/forgot-password" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
