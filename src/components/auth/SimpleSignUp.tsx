import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';
import { supabase } from '@/lib/supabase';

type SimpleSignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SimpleSignUp() {
  const { t } = useTranslation('common');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<SimpleSignUpFormValues>();
  const password = watch("password");

  const onSubmit = async (data: SimpleSignUpFormValues) => {
    setIsLoading(true);

    try {
      console.log('Starting simple signup process...');

      // Step 1: Create auth user (this is the ONLY critical operation)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        console.error('Auth signup error:', authError);
        toast.error(authError.message || 'Error creating account');
        return;
      }

      if (!authData?.user) {
        toast.error('Failed to create account');
        return;
      }

      console.log('Auth signup successful:', authData.user.id);

      // Step 2: Show success message
      setSuccess(true);
      toast.success('Account created successfully! Please check your email to verify your account.');

      // Step 3: Redirect to verification page
      setTimeout(() => {
        router.push('/signin?message=check-email');
      }, 2000);

    } catch (error: any) {
      console.error('Unexpected signup error:', error);
      toast.error('An unexpected error occurred. Please try again.');
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
          {t('signup.subtitle', 'Join our community today')}
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
          <Link href="/signin" className="text-blue-600 hover:text-blue-500 font-medium">
            {t('signin', 'Sign In')}
          </Link>
        </p>
      </div>
    </div>
  );
}