import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAuth } from '@/lib/supabase-auth';
import { supabase } from '@/lib/supabase';
import { PlusIcon, PencilIcon, TrashIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

// Types
type BusinessProfile = {
  id: string;
  user_id: string;
  business_name: string;
  business_description?: string;
  business_category: string;
  logo_url?: string;
  active_listings_count: number;
  subscription_status?: string;
  subscription_end_date?: string;
  created_at: string;
};

type Subscription = {
  id: string;
  status: string;
  plan_id: string;
  current_period_end: string;
  subscription_plans: {
    max_listings: number;
    name: string;
  };
};

type BusinessListing = {
  id: string;
  title: string;
  description: string;
  category: string;
  images?: string[];
  price?: number;
  status: string;
  created_at: string;
  type: string;
};

export default function BusinessDashboardPage() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [listings, setListings] = useState<BusinessListing[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [debugData, setDebugData] = useState<any>(null);
  const [isDebugMode, setIsDebugMode] = useState(false);

  // For testing with a specific user ID
  const testUserId = 'd6e52249-d9a5-40c1-a0db-555f861345f6';

  useEffect(() => {
    // Redirect if not authenticated
    if (!user && !isLoading) {
      router.push('/signin?redirect=/business/dashboard');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      fetchBusinessData();

      // Additional check for the specified test user
      if (router.query.debug === 'true' || user.id === testUserId) {
        setIsDebugMode(true);
        fetchTestUserData();
      }
    }
  }, [user, router.query]);

  const fetchBusinessData = async () => {
    setIsLoadingData(true);
    try {
      // Fetch business profile
      const { data: profileData, error: profileError } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching business profile:', profileError);
      }

      if (profileData) {
        setBusinessProfile(profileData);

        // Check subscription status directly from Stripe
        try {
          const { data: stripeStatusData } = await axios.post('/api/subscriptions/stripe-status', {
            userId: user?.id
          });
          
          if (stripeStatusData.active && stripeStatusData.subscriptionDetails) {
            // Use the subscription details directly from Stripe
            const { data: planData } = await supabase
              .from('subscription_plans')
              .select('*')
              .eq('id', stripeStatusData.subscriptionDetails.plan_id || profileData.plan_id)
              .single();
              
            if (planData) {
              // Create subscription object using real-time Stripe data
              const stripeSubscription = {
                id: stripeStatusData.subscriptionDetails.id,
                status: stripeStatusData.subscriptionDetails.status,
                plan_id: stripeStatusData.subscriptionDetails.plan_id || profileData.plan_id,
                current_period_end: stripeStatusData.subscriptionDetails.current_period_end,
                subscription_plans: planData
              };
              
              setSubscription(stripeSubscription);
              
              // Log for debugging
              console.log('Using real-time Stripe subscription data', stripeSubscription);
            }
          } else {
            // Fallback to database query if no active subscription found in Stripe
            const { data: subscriptionData, error: subscriptionError } = await supabase
              .from('subscriptions')
              .select('*, subscription_plans(*)')
              .eq('user_id', user?.id)
              .eq('status', 'active')
              .single();

            if (subscriptionError && subscriptionError.code !== 'PGRST116') {
              console.error('Error fetching subscription:', subscriptionError);
            }

            if (subscriptionData) {
              setSubscription(subscriptionData);
            } else if (profileData.subscription_status === 'active') {
              // If no active subscription was found in the subscriptions table, but business_profile indicates active subscription
              // Fetch the subscription plan details to create a fallback subscription object
              const { data: planData } = await supabase
                .from('subscription_plans')
                .select('*')
                .single();
                
              if (planData) {
                // Create a fallback subscription object using business_profile data
                const fallbackSubscription = {
                  id: profileData.subscription_id || 'fallback-id',
                  status: 'active',
                  plan_id: planData.id,
                  current_period_end: profileData.subscription_end_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                  subscription_plans: planData
                };
                
                setSubscription(fallbackSubscription);
                
                // Log this situation for debugging
                console.log('Using fallback subscription data from business_profile', fallbackSubscription);
              }
            }
          }
        } catch (stripeError) {
          console.error('Error checking Stripe subscription status:', stripeError);
          
          // Fallback to original subscription checking logic
          const { data: subscriptionData, error: subscriptionError } = await supabase
            .from('subscriptions')
            .select('*, subscription_plans(*)')
            .eq('user_id', user?.id)
            .eq('status', 'active')
            .single();

          if (subscriptionError && subscriptionError.code !== 'PGRST116') {
            console.error('Error fetching subscription:', subscriptionError);
          }

          if (subscriptionData) {
            setSubscription(subscriptionData);
          } else if (profileData.subscription_status === 'active') {
            // Fallback to business profile data if necessary
            const { data: planData } = await supabase
              .from('subscription_plans')
              .select('*')
              .single();
              
            if (planData) {
              const fallbackSubscription = {
                id: profileData.subscription_id || 'fallback-id',
                status: 'active',
                plan_id: planData.id,
                current_period_end: profileData.subscription_end_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                subscription_plans: planData
              };
              
              setSubscription(fallbackSubscription);
              console.log('Using fallback subscription data after Stripe API error', fallbackSubscription);
            }
          }
        }

        // Fetch business listings
        const { data: listingsData, error: listingsError } = await supabase
          .from('business_listings')
          .select('*')
          .eq('business_id', profileData.id)
          .order('created_at', { ascending: false });

        if (listingsError) {
          console.error('Error fetching business listings:', listingsError);
        }

        if (listingsData) {
          setListings(listingsData);
        }
      }
    } catch (error) {
      console.error('Error loading business data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const fetchTestUserData = async () => {
    try {
      // Fetch business profile for test user
      const { data: profileData, error: profileError } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', testUserId)
        .single();

      // Get subscription data for test user
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('*, subscription_plans(*)')
        .eq('user_id', testUserId)
        .maybeSingle();

      // Get user data
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', testUserId)
        .single();

      // Get business listings for test user
      let listingsData = null;
      let listingsError = null;
      
      if (profileData) {
        const result = await supabase
          .from('business_listings')
          .select('*')
          .eq('business_id', profileData.id)
          .order('created_at', { ascending: false });
          
        listingsData = result.data;
        listingsError = result.error;
      }

      // Compile debug data
      setDebugData({
        businessProfile: {
          data: profileData,
          error: profileError
        },
        subscription: {
          data: subscriptionData,
          error: subscriptionError
        },
        user: {
          data: userData,
          error: userError
        },
        listings: {
          data: listingsData,
          error: listingsError
        }
      });
    } catch (error) {
      console.error('Error in debug mode:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDeleteListing = async (listingId: string) => {
    if (confirm(t('confirm_delete_listing'))) {
      try {
        const { error } = await supabase
          .from('business_listings')
          .delete()
          .eq('id', listingId);
          
        if (error) {
          console.error('Error deleting listing:', error);
          alert(t('error_deleting_listing'));
        } else {
          // Refresh listings
          fetchBusinessData();
        }
      } catch (error) {
        console.error('Error deleting listing:', error);
        alert(t('error_deleting_listing'));
      }
    }
  };

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  const canCreateListing = businessProfile && subscription && 
    (listings.length < subscription.subscription_plans.max_listings || 
    subscription.subscription_plans.max_listings === -1);

  return (
    <>
      <Head>
        <title>{t('business_dashboard')} | Directory SLP</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t('business_dashboard')}</h1>
            {businessProfile && (
              <p className="mt-2 text-lg text-gray-600">
                {t('welcome_business', { business: businessProfile.business_name })}
              </p>
            )}
          </div>

          {/* Business Profile Card */}
          {businessProfile && (
            <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div className="flex items-center">
                    {businessProfile.logo_url ? (
                      <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                        <Image 
                          src={businessProfile.logo_url} 
                          alt={businessProfile.business_name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl font-semibold text-indigo-800">
                          {businessProfile.business_name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h2 className="text-xl font-semibold">{businessProfile.business_name}</h2>
                      <p className="text-gray-600">{businessProfile.business_category}</p>
                    </div>
                  </div>
                  
                  <Link 
                    href="/business/profile" 
                    className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    {t('edit_profile')}
                  </Link>
                </div>
                
                {businessProfile.business_description && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">{t('business_description')}</h3>
                    <p className="text-gray-900">{businessProfile.business_description}</p>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">{t('subscription_details')}</h3>
                  
                  {subscription ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">{t('plan')}</div>
                        <div className="font-medium">{subscription.subscription_plans.name}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{t('status')}</div>
                        <div className="font-medium">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {subscription.status === 'active' ? t('active') : t('inactive')}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{t('renewal_date')}</div>
                        <div className="font-medium">
                          {subscription.current_period_end 
                            ? formatDate(subscription.current_period_end) 
                            : t('not_available')}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-yellow-600">
                      <ExclamationCircleIcon className="h-5 w-5" />
                      <span>{t('no_active_subscription')}</span>
                      <Link 
                        href="/business/subscription" 
                        className="text-indigo-600 font-medium hover:text-indigo-900"
                      >
                        {t('get_subscription')}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Listings Section */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{t('your_listings')}</h2>
                
                <div className="flex items-center space-x-2">
                  {subscription && (
                    <p className="text-sm text-gray-600">
                      {subscription.subscription_plans.max_listings === -1 
                        ? t('unlimited_listings_available')
                        : t('listings_count', { 
                            current: listings.length, 
                            max: subscription.subscription_plans.max_listings 
                          })
                      }
                    </p>
                  )}
                  
                  <Link
                    href="/business/listings/create"
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      !canCreateListing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    aria-disabled={!canCreateListing}
                    onClick={e => {
                      if (!canCreateListing) {
                        e.preventDefault();
                        alert(t('max_listings_reached'));
                      }
                    }}
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    {t('create_listing')}
                  </Link>
                </div>
              </div>
            </div>
            
            {listings.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {listings.map(listing => (
                  <li key={listing.id} className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex-1 md:mr-8">
                        <h3 className="text-lg font-medium text-indigo-600 mb-1">
                          {listing.title}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2">
                            {listing.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(listing.created_at)}
                          </span>
                        </p>
                        <p className="text-gray-900 line-clamp-3 mb-4">
                          {listing.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/business/listings/edit/${listing.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          >
                            <PencilIcon className="h-4 w-4 mr-1" />
                            {t('edit')}
                          </Link>
                          <button
                            onClick={() => handleDeleteListing(listing.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-red-500"
                          >
                            <TrashIcon className="h-4 w-4 mr-1" />
                            {t('delete')}
                          </button>
                          <Link
                            href={`/listings/${listing.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t('view_public')}
                          </Link>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex-shrink-0">
                        {listing.images && listing.images.length > 0 ? (
                          <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-md overflow-hidden">
                            <Image
                              src={listing.images[0]}
                              alt={listing.title}
                              width={128}
                              height={128}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-24 w-24 sm:h-32 sm:w-32 bg-gray-100 rounded-md flex items-center justify-center">
                            <span className="text-gray-400">
                              {t('no_image')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-10 text-center">
                <p className="text-gray-600 mb-6">
                  {t('no_listings_yet')}
                </p>
                <Link
                  href="/business/listings/create"
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    !canCreateListing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  aria-disabled={!canCreateListing}
                  onClick={e => {
                    if (!canCreateListing) {
                      e.preventDefault();
                      alert(t('max_listings_reached'));
                    }
                  }}
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  {t('create_first_listing')}
                </Link>
              </div>
            )}
          </div>
          
          {/* Debug Data (only shown in debug mode) */}
          {isDebugMode && debugData && (
            <div className="mt-8 bg-gray-100 rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-gray-200 font-mono">
                <h2 className="text-lg font-bold">Debug Data</h2>
                <p className="text-xs text-gray-700">Test User ID: {testUserId}</p>
              </div>
              <div className="p-4 overflow-auto">
                <pre className="text-xs">{JSON.stringify(debugData, null, 2)}</pre>
              </div>
            </div>
          )}
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