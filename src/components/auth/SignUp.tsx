import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useAuth } from '@/lib/supabase-auth';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';

type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  accountType: 'user' | 'business';
  businessCategory?: string;
};

export default function SignUp() {
  const { t } = useTranslation('common');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { signUp, supabase } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormValues>({
    defaultValues: {
      accountType: 'user'
    }
  });
  
  const password = watch("password");
  const accountType = watch("accountType");

  const onSubmit = async (data: SignUpFormValues) => {
    console.log('Sign up form submitted', data);
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Check if supabase is available
      if (!supabase) {
        console.error('Supabase client is not available in SignUp component');
        throw new Error('Database connection unavailable. Please try again later.');
      }
      
      console.log('Calling signUp function with:', data.email);
      const result = await signUp(data.email, data.password);
      console.log('SignUp result:', result);
      
      if (result.error) {
        console.error('SignUp error:', result.error);
        toast.error(result.error.message);
        setError(result.error.message);
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
          if (data.accountType === 'business') {
            console.log('Redirecting to business subscription page');
            router.push('/business/subscription');
          } else {
            console.log('Redirecting to account profile page');
            router.push('/account/profile');
          }
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
      <div className="max-w-md w-full mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Check your email</h2>
        <p className="mb-4">
          We&apos;ve sent you an email with a link to confirm your account.
        </p>
        <p className="text-sm text-gray-600 mb-6">
          If you don&apos;t see it, check your spam folder.
        </p>
        <Link
          href="/signin"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
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