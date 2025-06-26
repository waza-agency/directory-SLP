import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { toast } from 'react-toastify';

type SimpleSignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SimpleSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<SimpleSignUpFormValues>();
  const password = watch("password");

  const onSubmit = async (data: SimpleSignUpFormValues) => {
    setIsLoading(true);

    try {
      console.log('🚀 Starting simple signup with robust API...');

      // Use the robust signup endpoint for reliable production signup
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

      console.log('📡 API Response status:', response.status);

      const result = await response.json();
      console.log('✅ Signup result:', result);

      if (!response.ok) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (!result.success) {
        toast.error('Failed to create account. Please try again.');
        return;
      }

      // Success!
      setSuccess(true);
      toast.success('Account created! Please check your email to verify.');

      // Redirect after success
      setTimeout(() => {
        router.push('/signin?message=verify-email');
      }, 2000);

    } catch (error: any) {
      console.error('❌ Simple signup error:', error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Simple Signup</h2>

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
      )}

      {/* Simple signup info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h4 className="text-sm font-medium text-blue-800 mb-1">📝 Simple Signup</h4>
        <p className="text-xs text-blue-700">
          This is a basic signup form that creates a user account without additional profile data.
        </p>
      </div>
    </div>
  );
}