import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAuth } from '@/lib/supabase-auth';
import { supabase } from '@/lib/supabase';

type ProfileFormValues = {
  name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
};

export default function ProfilePage() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormValues>();

  useEffect(() => {
    // Redirect if not authenticated
    if (!user && !isLoading) {
      router.push('/signin?redirect=/account/profile');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) {
        throw error;
      }

      // Reset form with user data
      reset({
        name: data.name || '',
        phone: data.phone || '',
        address: data.address || '',
        city: data.city || '',
        country: data.country || '',
        zipCode: data.zip_code || '',
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update profile');
      }

      setSubmitSuccess(true);
    } catch (error: any) {
      setSubmitError(error.message);
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render anything while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If user is not logged in, don't render anything (redirect will happen)
  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{t('profile.title', 'Edit Profile')} | Directory SLP</title>
        <meta name="description" content={t('profile.description', 'Update your profile information and address.')} />
      </Head>

      <div className="min-h-screen py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-6">
              <Link href="/account" className="text-primary hover:text-primary-dark mr-2">
                &larr; {t('profile.backToAccount', 'Back to Account')}
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">{t('profile.editProfile', 'Edit Profile')}</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                  {t('profile.profileUpdated', 'Your profile has been updated successfully')}
                </div>
              )}

              {submitError && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('profile.name', 'Full Name')}
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('profile.phone', 'Phone Number')}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('profile.address', 'Address')}
                  </label>
                  <input
                    id="address"
                    type="text"
                    {...register('address')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('profile.city', 'City')}
                    </label>
                    <input
                      id="city"
                      type="text"
                      {...register('city')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('profile.zipCode', 'Zip/Postal Code')}
                    </label>
                    <input
                      id="zipCode"
                      type="text"
                      {...register('zipCode')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('profile.country', 'Country')}
                    </label>
                    <input
                      id="country"
                      type="text"
                      {...register('country')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t('profile.saving', 'Saving...') : t('profile.saveChanges', 'Save Changes')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
} 