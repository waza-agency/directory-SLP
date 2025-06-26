import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { toast } from 'react-toastify';

// Add retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  accountType: 'user' | 'business';
  businessCategory?: string;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormValues>({
    defaultValues: {
      accountType: 'user'
    }
  });

  const password = watch("password");
  const accountType = watch("accountType");

  const attemptSignUp = async (email: string, password: string, retryNumber = 0): Promise<any> => {
    try {
      console.log(`🚀 Attempt ${retryNumber + 1}: Calling robust signup API for ${email}`);

      const response = await fetch('/api/robust-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log(`📡 API Response status: ${response.status}`);

      const result = await response.json();
      console.log('✅ Signup API result:', result);

      if (!response.ok) {
        // If it's a timeout or network error, and we haven't exceeded retries, try again
        if ((result.error?.includes('timeout') ||
             result.error?.includes('network') ||
             response.status >= 500) &&
            retryNumber < MAX_RETRIES) {
          console.log(`Signup attempt ${retryNumber + 1} failed, retrying...`);
          await sleep(RETRY_DELAY);
          return attemptSignUp(email, password, retryNumber + 1);
        }

        throw new Error(result.error || `HTTP ${response.status}`);
      }

      if (result.error) {
        // If it's a timeout or network error, and we haven't exceeded retries, try again
        if ((result.error.includes('timeout') ||
             result.error.includes('network')) &&
            retryNumber < MAX_RETRIES) {
          console.log(`Signup attempt ${retryNumber + 1} failed, retrying...`);
          await sleep(RETRY_DELAY);
          return attemptSignUp(email, password, retryNumber + 1);
        }

        throw new Error(result.error);
      }

      if (!result.success || !result.user) {
        throw new Error('Failed to create user account');
      }

      return {
        data: {
          user: result.user
        },
        error: null
      };

    } catch (error: any) {
      if (retryNumber < MAX_RETRIES &&
          (error.message?.includes('timeout') ||
           error.message?.includes('network') ||
           error.name === 'AuthRetryableFetchError')) {
        console.log(`Signup attempt ${retryNumber + 1} failed with error, retrying...`, error);
        await sleep(RETRY_DELAY);
        return attemptSignUp(email, password, retryNumber + 1);
      }
      throw error;
    }
  };

  const onSubmit = async (data: SignUpFormValues) => {
    console.log('Sign up form submitted', data);
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setRetryCount(0);

    try {
      console.log('Calling robust signup API with:', data.email);
      const result = await attemptSignUp(data.email, data.password);
      console.log('SignUp result:', result);

      if (result.error) {
        console.error('SignUp error:', result.error);

        // Handle different types of errors
        if (result.error.message?.includes('rate limit') || result.error.status === 429) {
          setError('Too many signup attempts. Please wait a few minutes before trying again.');
          toast.error('Please wait a few minutes before trying to sign up again.');
        } else if (result.error.message?.includes('timeout') || result.error instanceof Error && result.error.name === 'AuthRetryableFetchError') {
          setError('The signup service is currently experiencing delays. Please try again in a few moments.');
          toast.error('Connection timeout. Please try again.');
        } else {
          toast.error(result.error.message || 'An error occurred during signup');
          setError(result.error.message || 'An error occurred during signup');
        }
        return;
      }

      if (result.data?.user) {
        console.log('User created:', result.data.user);

        // Note: Business profile creation is moved to a separate flow
        // since the robust-signup API only handles basic user creation
        console.log('Basic user signup successful. Business profile setup can be done later.');

        // Show success
        toast.success('Account created successfully!');
        setSuccess(true);

        // Navigate to account page after a brief delay to show success message
        setTimeout(() => {
          try {
            if (data.accountType === 'business') {
              // Redirect to business profile setup
              router.push('/business/profile?setup=true');
            } else {
              router.push('/account');
            }
          } catch (routerError) {
            console.error('Router navigation failed, falling back to window.location:', routerError);
            window.location.href = '/account';
          }
        }, 2000);

      } else {
        console.log('No user data returned from signUp');
        setError('User registration failed.');
        toast.error('User registration failed.');
      }
    } catch (err: any) {
      console.error('Uncaught error during signup:', err);
      setError(err.message || 'An error occurred during signup');
      toast.error(err.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-auto text-center relative">
          <div className="mb-6">
            <svg className="mx-auto h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Verify Your Email</h2>
          <div className="space-y-4 text-left">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 font-medium mb-2">Important Email Information:</p>
              <ul className="text-blue-700 text-sm space-y-2">
                <li>• From: <span className="font-medium">Supabase Auth</span></li>
                <li>• Subject: <span className="font-medium">SAN LUIS WAY needs you to Confirm Your Signup</span></li>
              </ul>
            </div>
            <p className="text-gray-600">
              We've sent a verification email to your inbox. Please click the link in the email to verify your account.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg mt-4">
              <p className="text-yellow-800 text-sm">
                <span className="font-medium">Can't find the email?</span> Check your:
              </p>
              <ul className="text-yellow-700 text-sm mt-2 space-y-1">
                <li>• Spam/Junk folder</li>
                <li>• Promotions tab (if using Gmail)</li>
                <li>• Updates/Social tabs</li>
                <li>• All Mail folder</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4 mt-6">
            <button
              onClick={() => {
                // For now, just show a message since we'd need to implement resend in the robust API
                toast.info('To resend verification email, please try signing up again.');
              }}
              className="w-full bg-blue-50 text-blue-600 border border-blue-200 py-2 px-4 rounded-md hover:bg-blue-100 transition-colors"
            >
              Resend Verification Email
            </button>
            <button
              onClick={() => router.push('/signin')}
              className="w-full bg-gray-100 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          <div className="font-medium">{error}</div>
          {error?.includes('rate limit') && (
            <div className="mt-2 text-sm">
              This error occurs when too many signup attempts have been made. Please:
              <ul className="list-disc list-inside mt-1">
                <li>Wait for 5-10 minutes</li>
                <li>Make sure you're using the correct email address</li>
                <li>Check if you already have an account</li>
              </ul>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Account Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Account Type
          </label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                {...register("accountType")}
                type="radio"
                value="user"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm">Personal Account</span>
            </label>
            <label className="flex items-center">
              <input
                {...register("accountType")}
                type="radio"
                value="business"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm">Business Account</span>
            </label>
          </div>
        </div>

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            {accountType === 'business' ? 'Business Name' : 'Full Name'}
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder={accountType === 'business' ? 'Your business name' : 'Your full name'}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        {/* Business Category (conditional) */}
        {accountType === 'business' && (
          <div>
            <label htmlFor="businessCategory" className="block text-sm font-medium text-gray-700">
              Business Category
            </label>
            <select
              {...register("businessCategory", { required: accountType === 'business' ? "Business category is required" : false })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a category</option>
              <option value="restaurant">Restaurant</option>
              <option value="retail">Retail</option>
              <option value="service">Service</option>
              <option value="technology">Technology</option>
              <option value="other">Other</option>
            </select>
            {errors.businessCategory && <p className="mt-1 text-sm text-red-600">{errors.businessCategory.message}</p>}
          </div>
        )}

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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
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

        {/* Confirm Password Field */}
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
        </div>

        {/* Submit Button */}
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
            'Sign Up'
          )}
        </button>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Already have an account? {' '}
            <Link href="/signin" className="font-medium text-blue-600 hover:text-blue-500">
              Sign In
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}