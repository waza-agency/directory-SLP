import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useAuth } from '@/lib/supabase-auth';

type SignInFormValues = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { signIn } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormValues>();

  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true);
    setError(null);
    
    console.log('SignIn component: submitting with email:', data.email);

    try {
      console.log('SignIn component: calling signIn function');
      const response = await signIn(data.email, data.password);
      console.log('SignIn component: received response:', {
        success: !!response.data?.user,
        error: response.error ? 'present' : 'none'
      });
      
      if (response.error) {
        console.error('SignIn component: authentication error:', response.error);
        setError(response.error.message);
        return;
      }

      if (!response.data?.user) {
        console.error('SignIn component: missing user in response');
        setError('Failed to authenticate. Please try again.');
        return;
      }

      // The signIn function in supabase-auth.tsx now handles redirection
      // We don't need to do anything here as the page will be redirected
      console.log('SignIn successful, waiting for redirection...');
      
    } catch (err: any) {
      console.error('SignIn component: caught exception:', err);
      setError(err.message || 'An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            {...register('password', { required: 'Password is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Link 
            href="/forgot-password"
            className="text-sm text-primary hover:text-primary-dark"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link 
            href="/signup"
            className="text-primary hover:text-primary-dark"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
} 