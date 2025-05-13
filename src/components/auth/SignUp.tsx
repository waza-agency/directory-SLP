import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useAuth } from '@/lib/supabase-auth';
import { useTranslation } from 'next-i18next';
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
  const { t } = useTranslation('common');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter();
  const { signUp, supabase } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormValues>({
    defaultValues: {
      accountType: 'user'
    }
  });

  const password = watch("password");
  const accountType = watch("accountType");

  const attemptSignUp = async (email: string, password: string, retryNumber = 0): Promise<any> => {
    try {
      const result = await signUp(email, password);

      if (result.error) {
        // If it's a timeout or network error, and we haven't exceeded retries, try again
        if ((result.error.message?.includes('timeout') ||
             result.error.message?.includes('network') ||
             result.error instanceof Error && result.error.name === 'AuthRetryableFetchError') &&
            retryNumber < MAX_RETRIES) {
          console.log(`Signup attempt ${retryNumber + 1} failed, retrying...`);
          await sleep(RETRY_DELAY);
          return attemptSignUp(email, password, retryNumber + 1);
        }
      }

      return result;
    } catch (error) {
      if (retryNumber < MAX_RETRIES) {
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
      if (!supabase) {
        console.error('Supabase client is not available in SignUp component');
        throw new Error('Database connection unavailable. Please try again later.');
      }

      console.log('Calling signUp function with:', data.email);
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
        // Update the account type in the users table
        console.log('Updating account type to:', data.accountType);

        try {
          const updateResult = await supabase
            .from('users')
            .update({ account_type: data.accountType })
            .eq('id', result.data.user.id);

          console.log('Update result:', updateResult);

          if (updateResult.error) {
            console.error('Error updating account type:', updateResult.error);
            setError(updateResult.error.message);
            toast.error(updateResult.error.message);
            return;
          }

          // Create a business profile if account type is business
          if (data.accountType === 'business') {
            console.log('Creating business profile for user:', result.data.user.id);
            try {
              const businessResult = await supabase
                .from('business_profiles')
                .insert([
                  {
                    user_id: result.data.user.id,
                    business_name: data.name,
                    business_category: data.businessCategory,
                  }
                ]);

              console.log('Business profile creation result:', businessResult);

              if (businessResult.error) {
                console.error('Error creating business profile:', businessResult.error);
                setError(businessResult.error.message);
                toast.error(businessResult.error.message);
                return;
              }
            } catch (err: any) {
              console.error('Exception creating business profile:', err);
              setError(err.message || 'Failed to create business profile');
              toast.error(err.message || 'Failed to create business profile');
              return;
            }
          }

          toast.success(t('signup_success'));
          setSuccess(true);
        } catch (err: any) {
          console.error('Exception updating account type:', err);
          setError(err.message || 'Failed to update account type');
          toast.error(err.message || 'Failed to update account type');
        }
      } else {
        console.log('No user data returned from signUp');
        setError('User registration failed.');
        toast.error('User registration failed.');
      }
    } catch (err: any) {
      console.error('Uncaught error during signup:', err);
      setError(err.message || t('signup_error'));
      toast.error(err.message || t('signup_error'));
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
              onClick={(event) => {
                if (supabase?.auth.resend) {
                  // Add loading state for resend button
                  const btn = event?.target as HTMLButtonElement;
                  const originalText = btn.innerText;
                  btn.disabled = true;
                  btn.innerText = 'Sending...';

                  supabase.auth.resend({
                    type: 'signup',
                    email: watch('email')
                  }).then((response) => {
                    if (response.error?.message.includes('rate limit')) {
                      toast.error('Please wait a few minutes before requesting another email.');
                    } else if (response.error) {
                      toast.error(response.error.message);
                    } else {
                      toast.success('Verification email resent!');
                    }
                  }).finally(() => {
                    btn.disabled = false;
                    btn.innerText = originalText;
                  });
                }
              }}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:bg-gray-200 disabled:text-gray-500"
            >
              Resend Verification Email
            </button>
            <Link
              href="/signin"
              className="block w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>

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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('account_type')}
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${watch('accountType') === 'user' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300 hover:border-primary/50'}`}>
              <input
                type="radio"
                value="user"
                {...register('accountType')}
                className="sr-only"
              />
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">{t('individual')}</span>
              </div>
            </label>

            <label className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${watch('accountType') === 'business' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300 hover:border-primary/50'}`}>
              <input
                type="radio"
                value="business"
                {...register('accountType')}
                className="sr-only"
              />
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="font-medium">{t('business')}</span>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {watch('accountType') === 'business' ? 'Business Name' : 'Full Name'}
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Business Category (only shown for business accounts) */}
        {accountType === 'business' && (
          <div>
            <label htmlFor="businessCategory" className="block text-sm font-medium text-gray-700 mb-1">
              Business Category
            </label>
            <select
              id="businessCategory"
              {...register('businessCategory', {
                required: accountType === 'business' ? 'Business category is required' : false
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select a category</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Retail">Retail</option>
              <option value="Services">Services</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Travel & Tourism">Travel & Tourism</option>
              <option value="Technology">Technology</option>
              <option value="Marketing">Marketing</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Other">Other</option>
            </select>
            {errors.businessCategory && (
              <p className="mt-1 text-sm text-red-600">{errors.businessCategory.message}</p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? t('signing_up') : t('sign_up')}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="text-primary hover:text-primary-dark"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}