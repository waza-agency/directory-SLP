import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/lib/supabase-auth';
import { supabase } from '@/lib/supabase';

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [hasBusinessProfile, setHasBusinessProfile] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (!user && !isLoading) {
      router.push('/signin?redirect=/account');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      initializeAccountData();
    }
  }, [user]);

  const initializeAccountData = async () => {
    try {
      setError(null);
      await Promise.allSettled([
        fetchUserProfile(),
        checkBusinessProfile()
      ]);
    } catch (error) {
      console.error('Error initializing account data:', error);
      setError('Some account information could not be loaded. Please refresh the page.');
    }
  };

  const fetchUserProfile = async () => {
    if (!user?.id) {
      console.error('No user ID available for profile fetch');
      setIsLoadingProfile(false);
      return;
    }

    try {
      // Check if supabase is available
      if (!supabase) {
        throw new Error('Supabase client not available');
      }

      const { data, error } = await supabase
        .from('users')
        .select("*")
        .eq('id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116' || error.code === '42P01') {
          // User not found in users table or table doesn't exist, this is okay for some auth providers
          console.log('User profile not found in users table, using auth data');
          setProfile({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'User'
          });
        } else {
          console.error('Error fetching user profile:', error);
          // Don't throw here, just use minimal profile data
          setProfile({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'User'
          });
        }
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Exception fetching user profile:', error);
      // Fallback to basic auth data
      setProfile({
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'User'
      });
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const checkBusinessProfile = async () => {
    if (!user?.id) {
      console.error('No user ID available for business profile check');
      setHasBusinessProfile(false);
      return;
    }

    try {
      // Check if supabase is available
      if (!supabase) {
        console.log('Supabase client not available, skipping business profile check');
        setHasBusinessProfile(false);
        return;
      }

      const { data, error } = await supabase
        .from('business_profiles')
        .select("*")
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        if (error.code === '42P01') {
          // business_profiles table doesn't exist
          console.log('Business profiles table does not exist yet');
          setHasBusinessProfile(false);
          return;
        }

        console.error('Error checking business profile:', error);
        setHasBusinessProfile(false);
        return;
      }

      setHasBusinessProfile(!!data);
    } catch (error) {
      console.error('Exception checking business profile:', error);
      setHasBusinessProfile(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      // Force redirect even if signOut fails
      router.push('/');
    }
  };

  // Show loading state
  if (isLoading || (!user && isLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Show sign-in prompt if no user
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h1>
          <p className="text-gray-600 mb-6">You need to be signed in to view your account.</p>
          <Link
            href="/signin?redirect=/account"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{'My Account'} | San Luis Way</title>
        <meta name="description" content={'Manage your account, orders, and preferences'} />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {profile?.name || user.email?.split('@')[0] || 'User'}!
            </h1>
            <p className="text-gray-600 mt-2">Manage your account and view your activity</p>

            {error && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="text-sm font-medium text-yellow-800 hover:text-yellow-900 mt-2"
                    >
                      Refresh Page
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">{profile?.name || user.email}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <div className="mt-6 space-y-2">
                    <Link href="/account" className="block w-full py-2 px-3 text-sm font-medium rounded-md bg-gray-100 text-gray-900">
                      {'Dashboard'}
                    </Link>

                    {/* Only show the User Profile link if the user doesn't have a business profile */}
                    {!hasBusinessProfile && (
                      <Link href="/account/profile" className="block w-full py-2 px-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                        {'Profile'}
                      </Link>
                    )}

                    {/* Business Profile Link - Only shown if user has a business profile */}
                    {hasBusinessProfile && (
                      <Link href="/business/profile" className="block w-full py-2 px-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                        {'Business Profile'}
                      </Link>
                    )}

                    {/* Business Dashboard Link - Only shown if user has a business profile */}
                    {hasBusinessProfile && (
                      <Link href="/business/dashboard" className="block w-full py-2 px-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                        {'Business Dashboard'}
                      </Link>
                    )}

                    {/* Business Subscription Link - Show for all users */}
                    <Link href="/business/subscription" className="block w-full py-2 px-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                      {hasBusinessProfile
                        ? 'Manage Business'
                        : 'Create Business'}
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left py-2 px-3 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
                    >
                      {'Sign Out'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="md:col-span-3">
                {/* Account overview */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{'Account Overview'}</h2>

                  {isLoadingProfile ? (
                    <p>Loading profile information...</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-gray-700 mb-2">{'Account Details'}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{profile?.name || 'Not provided'}</p>
                          <p>{user.email}</p>
                          <p>{profile?.phone || 'Not provided'}</p>
                        </div>
                        <Link href={hasBusinessProfile ? "/business/profile" : "/account/profile"} className="inline-block mt-3 text-sm text-primary hover:text-primary-dark">
                          {'Edit Profile'}
                        </Link>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-700 mb-2">{'Default Address'}</h3>
                        {profile?.address ? (
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>{profile.address}</p>
                            <p>{profile.city}{profile.zip_code ? `, ${profile.zip_code}` : ''}</p>
                            <p>{profile.country || ''}</p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600">{'No address provided'}</p>
                        )}
                        <Link href={hasBusinessProfile ? "/business/profile" : "/account/profile"} className="inline-block mt-3 text-sm text-primary hover:text-primary-dark">
                          {'Update Address'}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  try {
    return {
      props: {
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps for account page:', error);
    return {
      props: {
        // Return empty translations object as fallback
        _nextI18Next: {
          initialI18nStore: {},
          initialLocale: locale,
        },
      },
    };
  }
}