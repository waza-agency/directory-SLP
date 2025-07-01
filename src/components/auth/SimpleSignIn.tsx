import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { simpleAuth } from '@/lib/simple-auth';

type SimpleSignInFormValues = {
  email: string;
  password: string;
};

export default function SimpleSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<SimpleSignInFormValues>();

  const onSubmit = async (data: SimpleSignInFormValues) => {
    setIsLoading(true);

    try {
      console.log('Starting simple signin process...');

      const result = await simpleAuth.signIn(data.email, data.password);

      if (!result.success) {
        toast.error(result.error || 'Failed to sign in');
        return;
      }

      console.log('Signin successful, redirecting...');
      toast.success('Signed in successfully!');

      // Redirect to account or intended page
      const redirectTo = router.query.redirect as string || '/account';
      router.push(redirectTo);

    } catch (error: any) {
      console.error('Unexpected signin error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{'Sign In'}</h2>
        <p className="mt-2 text-sm text-gray-600">
          {'Welcome back!'}
        </p>
      </div>

      {/* Email verification message */}
      {router.query.message === 'check-email' && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-700">
            Please check your email and click the verification link before signing in.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {'Email'}
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={'Enter your email'}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            {'Password'}
          </label>
          <input
            {...register('password', {
              required: 'Password is required',
            })}
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={'Enter your password'}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
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
              {'Signing In...'}
            </div>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <div className="mt-6 text-center space-y-2">
        <p className="text-sm text-gray-600">
          {t('dont_have_account', "Don't have an account?")}{' '}
          <Link href="/signup-simple" className="text-blue-600 hover:text-blue-500 font-medium">
            {'Create Account'}
          </Link>
        </p>
        <p className="text-sm">
          <Link href="/forgot-password" className="text-blue-600 hover:text-blue-500">
            {'Forgot your password?'}
          </Link>
        </p>
      </div>
    </div>
  );
}