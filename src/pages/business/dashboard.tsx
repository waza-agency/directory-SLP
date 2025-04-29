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

        // Fetch subscription
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

      // Update UI with test user data if current user is the test user
      if (user?.id === testUserId) {
        if (profileData) setBusinessProfile(profileData);
        if (subscriptionData) setSubscription(subscriptionData);
        if (listingsData) setListings(listingsData);
      }
    } catch (error) {
      console.error('Error fetching test user data:', error);
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
        <title>Business Dashboard | Directory SLP</title>
        <meta name="description" content="Manage your business profile, subscription, and products" />
      </Head>

      <div className="min-h-screen py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Business Dashboard</h1>

            {isLoadingData ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : !businessProfile ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <ExclamationCircleIcon className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-4">You don't have a business profile</h2>
                <p className="text-gray-600 mb-8">
                  To access all business features, you need to create a profile and subscribe to a plan.
                </p>
                <Link 
                  href="/business/subscription" 
                  className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Create Business Profile
                </Link>
              </div>
            ) : (
              <>
                {/* Business Profile & Subscription Status */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-6 md:mb-0">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">{businessProfile.business_name}</h2>
                      <p className="text-gray-600">{businessProfile.business_description || 'No description'}</p>
                      
                      <div className="mt-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {businessProfile.business_category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Subscription Status</h3>
                      
                      {subscription ? (
                        <div>
                          <div className="flex items-center mb-1">
                            <span className={`w-3 h-3 rounded-full mr-2 ${
                              subscription.status === 'active' ? 'bg-green-500' : 
                              subscription.status === 'past_due' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></span>
                            <span className="font-medium">
                              {subscription.status === 'active' ? 'Active' : 
                              subscription.status === 'past_due' ? 'Payment Due' : 'Cancelled'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Plan: {subscription.subscription_plans.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Expires: {new Date(subscription.current_period_end).toLocaleDateString()}
                          </p>
                          <div className="mt-3">
                            <div className="text-sm text-gray-600 mb-1">
                              Products: {listings.length}/{subscription.subscription_plans.max_listings}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-primary h-2.5 rounded-full" 
                                style={{ 
                                  width: `${Math.min(100, (listings.length / subscription.subscription_plans.max_listings) * 100)}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ) : businessProfile?.subscription_status === 'active' ? (
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="w-3 h-3 rounded-full mr-2 bg-green-500"></span>
                            <span className="font-medium">Active</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Active subscription confirmed
                          </p>
                          {businessProfile.subscription_end_date && (
                            <p className="text-sm text-gray-600">
                              Expires: {new Date(businessProfile.subscription_end_date).toLocaleDateString()}
                            </p>
                          )}
                          <div className="mt-3 text-sm text-gray-600">
                            <p>Products: {listings.length}/10</p>
                            <p className="mt-1 text-xs text-orange-500">Reload the page if information is incomplete</p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="w-3 h-3 rounded-full mr-2 bg-red-500"></span>
                            <span className="font-medium">No active subscription</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            You need a subscription to publish products.
                          </p>
                          <Link 
                            href="/business/subscription" 
                            className="text-sm text-primary hover:underline"
                          >
                            Subscribe now
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Business Listings */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">My Products</h2>
                    
                    {(subscription || businessProfile?.subscription_status === 'active') && 
                      (!subscription || listings.length < (subscription?.subscription_plans?.max_listings || 10)) ? (
                        <div className="flex space-x-2">
                          <Link 
                            href="/business/listings/create" 
                            className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                          >
                            <PlusIcon className="h-5 w-5 mr-1" />
                            New Product
                          </Link>
                          <Link 
                            href="/business/listings/create-service" 
                            className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                          >
                            <PlusIcon className="h-5 w-5 mr-1" />
                            New Service
                          </Link>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">
                          {subscription ? 'Product limit reached' : 'Subscription required'}
                        </span>
                      )}
                  </div>
                  
                  {listings.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-600 mb-4">You haven't published any products or services yet</p>
                      {(subscription || businessProfile?.subscription_status === 'active') && (
                        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                          <Link 
                            href="/business/listings/create" 
                            className="inline-flex items-center justify-center text-primary hover:underline"
                          >
                            <PlusIcon className="h-5 w-5 mr-1" />
                            Add a Product
                          </Link>
                          <Link 
                            href="/business/listings/create-service" 
                            className="inline-flex items-center justify-center text-blue-600 hover:underline"
                          >
                            <PlusIcon className="h-5 w-5 mr-1" />
                            Add a Service
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Product
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Category
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {listings.map((listing) => (
                            <tr key={listing.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                    {listing.images && listing.images.length > 0 ? (
                                      <div className="relative h-10 w-10 rounded-md overflow-hidden">
                                        <Image
                                          src={listing.images[0]}
                                          alt={listing.title}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                    ) : (
                                      <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                                        <span className="text-xs text-gray-500">No img</span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                      <Link href={`/listings/${listing.id}`} className="hover:underline">
                                        {listing.title}
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {listing.category}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  listing.type === 'service' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                }`}>
                                  {listing.type === 'service' ? 'Service' : 'Product'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${listing.price?.toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  listing.status === 'active' ? 'bg-green-100 text-green-800' :
                                  listing.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {listing.status === 'active' ? 'Active' :
                                  listing.status === 'pending' ? 'Pending' : 'Inactive'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(listing.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                  <Link 
                                    href={`/business/listings/edit/${listing.id}`} 
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    <PencilIcon className="h-5 w-5" />
                                  </Link>
                                  <button
                                    onClick={() => {/* TODO: Implement delete functionality */}}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <TrashIcon className="h-5 w-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Debug Information Section - Only visible in debug mode */}
                {isDebugMode && debugData && (
                  <div className="bg-gray-800 text-white rounded-lg shadow-sm p-6 mb-8 overflow-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Debug Information</h2>
                      <button 
                        onClick={() => setIsDebugMode(false)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                      >
                        Close Debug
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Current User ID: {user.id}</h3>
                        <p className="text-sm text-gray-300">Test User ID: {testUserId}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Business Profile</h3>
                        <pre className="bg-gray-900 p-3 rounded-md overflow-auto text-sm">
                          {JSON.stringify(debugData.businessProfile, null, 2)}
                        </pre>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Subscription</h3>
                        <pre className="bg-gray-900 p-3 rounded-md overflow-auto text-sm">
                          {JSON.stringify(debugData.subscription, null, 2)}
                        </pre>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">User Data</h3>
                        <pre className="bg-gray-900 p-3 rounded-md overflow-auto text-sm">
                          {JSON.stringify(debugData.user, null, 2)}
                        </pre>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Listings</h3>
                        <pre className="bg-gray-900 p-3 rounded-md overflow-auto text-sm">
                          {JSON.stringify(debugData.listings, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', ['common'])),
    },
  };
} 