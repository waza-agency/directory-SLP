import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAuth } from '@/lib/supabase-auth';
import { supabase } from '@/lib/supabase';
import { PlusIcon, PencilIcon, TrashIcon, ExclamationCircleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

// Types
type BusinessProfile = {
  id: string;
  user_id: string;
  business_name: string;
  description?: string;
  business_category: string;
  logo_url?: string;
  cover_image_url?: string;
  active_listings_count: number;
  subscription_status?: string;
  subscription_id?: string;
  subscription_start_date?: string;
  subscription_end_date?: string;
  plan_id?: string;
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
    description?: string;
    price_monthly?: number;
    price_yearly?: number;
    features?: any;
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
  const dropdownRef1 = useRef<HTMLDivElement>(null);
  const dropdownRef2 = useRef<HTMLDivElement>(null);
  const buttonRef1 = useRef<HTMLButtonElement>(null);
  const buttonRef2 = useRef<HTMLButtonElement>(null);

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

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // For the first dropdown
      if (dropdownRef1.current && buttonRef1.current && 
          !dropdownRef1.current.contains(event.target as Node) && 
          !buttonRef1.current.contains(event.target as Node)) {
        const menu = document.getElementById('create-listing-dropdown');
        if (menu && !menu.classList.contains('hidden')) {
          menu.classList.add('hidden');
        }
      }
      
      // For the second dropdown
      if (dropdownRef2.current && buttonRef2.current && 
          !dropdownRef2.current.contains(event.target as Node) && 
          !buttonRef2.current.contains(event.target as Node)) {
        const menu = document.getElementById('create-first-listing-dropdown');
        if (menu && !menu.classList.contains('hidden')) {
          menu.classList.add('hidden');
        }
      }
    }
    
    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Remove event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchBusinessData = async () => {
    try {
      setIsLoadingData(true);
      
      // Fetch business profile
      const { data: profileData, error: profileError } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      if (profileError) {
        if (profileError.code === 'PGRST116') {
          // No profile found, likely need to create one
          console.log('No business profile found');
          setIsLoadingData(false);
          return;
        }
        
        throw profileError;
      }
      
      setBusinessProfile(profileData);
      console.log('Business profile:', profileData);
      
      let subscriptionFound = false;
      
      // Check if there's subscription data in the business profile
      if (profileData.subscription_status && profileData.subscription_id) {
        console.log('Found subscription info in business profile');
        
        // Get the plan ID from the business profile
        const planId = profileData.plan_id;
        
        if (planId) {
          const { data: planData } = await supabase
            .from('subscription_plans')
            .select('*')
            .eq('id', planId)
            .single();
          
          if (planData) {
            // Create subscription object from business profile data
            const subscriptionObj = {
              id: profileData.subscription_id,
              status: profileData.subscription_status,
              plan_id: planId,
              current_period_end: profileData.subscription_end_date || '',
              subscription_plans: planData
            };
            
            setSubscription(subscriptionObj);
            subscriptionFound = true;
            
            console.log('Using business profile subscription data', subscriptionObj);
          }
        }
      }
      
      // First try to check Stripe directly
      if (!subscriptionFound) {
        try {
          const response = await fetch('/api/subscriptions/stripe-status', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user?.id }),
          });

          if (response.ok) {
            const stripeStatusData = await response.json();
            console.log('Stripe subscription check:', stripeStatusData);
            
            if (stripeStatusData.active && stripeStatusData.subscriptionDetails) {
              // Get the plan data
              const { data: planData } = await supabase
                .from('subscription_plans')
                .select('*')
                .eq('id', stripeStatusData.subscriptionDetails.plan_id || profileData.plan_id)
                .single();
                
              if (planData) {
                // Create subscription object using real-time Stripe data
                const stripeSubscription = {
                  id: stripeStatusData.subscriptionDetails.id,
                  status: 'active', // Force active status
                  plan_id: stripeStatusData.subscriptionDetails.plan_id || profileData.plan_id,
                  current_period_end: stripeStatusData.subscriptionDetails.current_period_end,
                  subscription_plans: planData
                };
                
                setSubscription(stripeSubscription);
                subscriptionFound = true;
                console.log('Using real-time Stripe subscription data', stripeSubscription);
                
                // Update the business profile with the correct status
                const { error: updateError } = await supabase
                  .from('business_profiles')
                  .update({
                    subscription_status: 'active',
                    subscription_id: stripeStatusData.subscriptionDetails.stripe_subscription_id || stripeStatusData.subscriptionDetails.id,
                    subscription_start_date: stripeStatusData.subscriptionDetails.current_period_start,
                    subscription_end_date: stripeStatusData.subscriptionDetails.current_period_end,
                    plan_id: stripeStatusData.subscriptionDetails.plan_id || profileData.plan_id
                  })
                  .eq('id', profileData.id);
                
                if (updateError) {
                  console.error('Error updating business profile with Stripe data:', updateError);
                } else {
                  console.log('Updated business profile with Stripe subscription data');
                }
              }
            }
          }
        } catch (err) {
          console.error('Error checking Stripe subscription status:', err);
        }
      }
      
      // If we couldn't build subscription from business profile or Stripe, try the regular subscription table
      if (!subscriptionFound) {
        // Check subscription status directly
        try {
          const { data: subscriptionData, error: subscriptionError } = await supabase
            .from('subscriptions')
            .select('*, subscription_plans(*)')
            .eq('user_id', user?.id)
            .eq('status', 'active')
            .maybeSingle();
          
          if (!subscriptionError && subscriptionData) {
            setSubscription(subscriptionData);
            console.log('Using subscription table data', subscriptionData);
            
            // If we found an active subscription in the subscriptions table
            // but the business profile status is not active, let's fix it
            if (profileData.subscription_status !== 'active') {
              console.log('Found mismatch in subscription status - updating business profile');
              
              // Update the business profile with the correct status
              const { error: updateError } = await supabase
                .from('business_profiles')
                .update({
                  subscription_status: 'active',
                  subscription_id: subscriptionData.stripe_subscription_id,
                  subscription_start_date: subscriptionData.current_period_start,
                  subscription_end_date: subscriptionData.current_period_end,
                  plan_id: subscriptionData.plan_id
                })
                .eq('id', profileData.id);
              
              if (updateError) {
                console.error('Error updating business profile subscription status:', updateError);
              } else {
                console.log('Successfully updated business profile subscription status');
              }
            }
            
            subscriptionFound = true;
          }
        } catch (err) {
          console.error('Error fetching subscription:', err);
        }
      }

      // Always fetch business listings regardless of subscription status
      const { data: listingsData, error: listingsError } = await supabase
        .from('business_listings')
        .select('*')
        .eq('business_id', profileData.id);

      if (listingsError) {
        console.error('Error fetching business listings:', listingsError);
      }

      if (listingsData && listingsData.length > 0) {
        console.log(`Found ${listingsData.length} listings for business profile ${profileData.id}`);
        setListings(listingsData);
        
        // If we found listings but no subscription, create a fallback subscription
        // This ensures the listings will be displayed in the UI
        if (!subscriptionFound) {
          console.log('Creating fallback subscription from listings data');
          
          // Get default subscription plan
          const { data: defaultPlan } = await supabase
            .from('subscription_plans')
            .select('*')
            .single();
            
          if (defaultPlan) {
            const fallbackSubscription = {
              id: 'fallback-' + Date.now(),
              status: 'active',
              plan_id: defaultPlan.id,
              current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              subscription_plans: defaultPlan
            };
            
            setSubscription(fallbackSubscription);
            console.log('Using fallback subscription to display listings', fallbackSubscription);
            
            // Also update the profile to avoid this issue in the future
            const { error: updateError } = await supabase
              .from('business_profiles')
              .update({
                subscription_status: 'active',
                plan_id: defaultPlan.id
              })
              .eq('id', profileData.id);
              
            if (updateError) {
              console.error('Error updating profile with fallback subscription:', updateError);
            }
          }
        }
      } else {
        setListings([]);
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
    if (confirm(t('confirm_delete_listing', 'Are you sure you want to delete this listing?'))) {
      try {
        const { error } = await supabase
          .from('business_listings')
          .delete()
          .eq('id', listingId);
          
        if (error) {
          console.error('Error deleting listing:', error);
          alert(t('error_deleting_listing', 'There was an error deleting this listing. Please try again.'));
        } else {
          // Refresh listings
          fetchBusinessData();
        }
      } catch (error) {
        console.error('Error deleting listing:', error);
        alert(t('error_deleting_listing', 'There was an error deleting this listing. Please try again.'));
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

  // Determine if the user can create listings based on their subscription
  const canCreateListing = businessProfile && subscription && 
    (subscription.subscription_plans.max_listings === -1 || 
     (listings.length < subscription.subscription_plans.max_listings));

  return (
    <>
      <Head>
        <title>Business Dashboard | Directory SLP</title>
        <meta name="description" content="Manage your business listings and subscriptions" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('business_dashboard', 'Business Dashboard')}</h1>
              {businessProfile && (
                <p className="mt-2 text-lg text-gray-600">
                  {t('welcome_business', 'Welcome, {{business}}', { business: businessProfile.business_name })}
                </p>
              )}
            </div>
          </div>

          {/* Business Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">{businessProfile?.business_name || 'Your Business'}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                
                <div className="mt-6 space-y-2">
                  <Link href="/business/dashboard" className="block w-full py-2 px-3 text-sm font-medium rounded-md bg-gray-100 text-gray-900">
                    {t('business.dashboard', 'Dashboard')}
                  </Link>
                  <Link href="/business/profile" className="block w-full py-2 px-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                    {t('business.profile', 'Business Profile')}
                  </Link>
                  <Link href="/business/subscription" className="block w-full py-2 px-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                    {t('business.subscription', 'Subscription')}
                  </Link>
                  <Link href="/account" className="block w-full py-2 px-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                    {t('business.backToAccount', 'Back to Account')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div className="mb-4 md:mb-0">
                  <p className="text-gray-600">
                    {t('manage_business_description', 'Manage your business listings and subscription')}
                  </p>
                </div>
                
                <div className="flex flex-col xs:flex-row gap-2">
                  {/* Create Listing dropdown */}
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        ref={buttonRef1}
                        type="button"
                        className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                          !canCreateListing ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        id="create-listing-menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                        onClick={(e) => {
                          if (!canCreateListing) {
                            e.preventDefault();
                            alert(t('max_listings_reached', 'You have reached the maximum number of listings for your subscription plan.'));
                          } else {
                            const menu = document.getElementById('create-listing-dropdown');
                            if (menu && buttonRef1.current) {
                              // Position the menu below the button using the ref
                              const buttonRect = buttonRef1.current.getBoundingClientRect();
                              menu.style.top = `${buttonRect.bottom + window.scrollY}px`;
                              menu.style.left = `${buttonRect.right - menu.offsetWidth + window.scrollX}px`;
                              menu.classList.toggle('hidden');
                            }
                          }
                        }}
                      >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        {t('create_listing', 'Create Listing')}
                      </button>
                    </div>
                  </div>
                </div>
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
                    </div>
                    
                    <Link 
                      href="/business/profile" 
                      className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <PencilIcon className="h-4 w-4 mr-2" />
                      {t('edit_profile', 'Edit Profile')}
                    </Link>
                    
                    {/* Business Description */}
                    {businessProfile.description && (
                      <div className="mb-8">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">{t('business_description', 'Business Description')}</h3>
                        <p className="text-gray-900">{businessProfile.description}</p>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">{t('subscription_details', 'Subscription Details')}</h3>
                      
                      {subscription ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">{t('plan', 'Plan')}</div>
                            <div className="font-medium">{subscription.subscription_plans.name}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">{t('status', 'Status')}</div>
                            <div className="font-medium">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {subscription.status === 'active' ? t('active', 'Active') : t('inactive', 'Inactive')}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">{t('renewal_date', 'Renewal Date')}</div>
                            <div className="font-medium">
                              {subscription.current_period_end 
                                ? formatDate(subscription.current_period_end) 
                                : t('not_available', 'Not available')}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-yellow-600">
                          <ExclamationCircleIcon className="h-5 w-5" />
                          <span>{t('no_active_subscription', 'No active subscription')}</span>
                          <Link 
                            href="/business/subscription" 
                            className="text-indigo-600 font-medium hover:text-indigo-900"
                          >
                            {t('get_subscription', 'Get Subscription')}
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
                    <h2 className="text-xl font-semibold">{t('your_listings', 'Your Listings')}</h2>
                    
                    <div className="flex items-center space-x-2">
                      {subscription && (
                        <p className="text-sm text-gray-600">
                          {subscription.subscription_plans.max_listings === -1 
                            ? t('unlimited_listings_available', 'Unlimited listings available')
                            : t('listings_count', '{{current}}/{{max}} listings', { 
                                current: listings.length, 
                                max: subscription.subscription_plans.max_listings 
                              })
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {!subscription && (
                  <div className="p-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                      <ExclamationCircleIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">{t('no_subscription', 'No Active Subscription')}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {t('subscription_required', 'You need an active subscription to create business listings.')}
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/business/subscription"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {t('get_subscription', 'Get Subscription')}
                      </Link>
                    </div>
                  </div>
                )}
                
                {subscription && listings.length === 0 && (
                  <div className="p-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                      <PlusIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">{t('no_listings', 'No listings yet')}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {t('get_started_creating', 'Get started by creating your first listing.')}
                    </p>
                    {canCreateListing && (
                      <div className="mt-6">
                        <Link
                          href="/business/listings/create"
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                          {t('new_listing', 'New Listing')}
                        </Link>
                      </div>
                    )}
                  </div>
                )}
                
                {subscription && listings.length > 0 ? (
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
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mr-2">
                                {listing.type === 'service' ? t('service', 'Service') : t('product', 'Product')}
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
                                {t('edit', 'Edit')}
                              </Link>
                              <button
                                onClick={() => handleDeleteListing(listing.id)}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-red-500"
                              >
                                <TrashIcon className="h-4 w-4 mr-1" />
                                {t('delete', 'Delete')}
                              </button>
                              <Link
                                href={`/listings/${listing.id}`}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {t('view_public', 'View Public')}
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
                                  {t('no_image', 'No image')}
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
                      {t('no_listings_yet', 'You haven\'t created any listings yet.')}
                    </p>
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          ref={buttonRef2}
                          type="button"
                          className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                            !canCreateListing ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          id="create-first-listing-menu-button"
                          aria-expanded="true"
                          aria-haspopup="true"
                          onClick={(e) => {
                            if (!canCreateListing) {
                              e.preventDefault();
                              alert(t('max_listings_reached', 'You have reached the maximum number of listings for your subscription plan.'));
                            } else {
                              const menu = document.getElementById('create-first-listing-dropdown');
                              if (menu && buttonRef2.current) {
                                // Position the menu below the button using the ref
                                const buttonRect = buttonRef2.current.getBoundingClientRect();
                                menu.style.top = `${buttonRect.bottom + window.scrollY}px`;
                                menu.style.left = `${buttonRect.left + (buttonRect.width/2) - (menu.offsetWidth/2) + window.scrollX}px`;
                                menu.classList.toggle('hidden');
                              }
                            }
                          }}
                        >
                          <PlusIcon className="h-4 w-4 mr-2" />
                          {t('create_first_listing', 'Create your first listing')}
                        </button>
                      </div>
                    </div>
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
        </div>
      </div>

      {/* Portal-like dropdowns attached at the root level of the document 
           to prevent them from being cut off by parent containers */}
      <div 
        ref={dropdownRef1}
        id="create-listing-dropdown"
        className="hidden fixed origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        role="menu" 
        aria-orientation="vertical" 
        aria-labelledby="create-listing-menu-button" 
        tabIndex={-1}
        style={{ width: '12rem' }} // Match w-48
      >
        <div className="py-1" role="none">
          <Link 
            href="/business/listings/create" 
            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" 
            role="menuitem" 
            tabIndex={-1} 
            id="create-listing-menu-item-0"
            onClick={(e) => {
              const menu = document.getElementById('create-listing-dropdown');
              if (menu) menu.classList.add('hidden');
            }}
          >
            {t('create_product', 'Create Product')}
          </Link>
          <Link 
            href="/business/listings/create-service" 
            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" 
            role="menuitem" 
            tabIndex={-1} 
            id="create-listing-menu-item-1"
            onClick={(e) => {
              const menu = document.getElementById('create-listing-dropdown');
              if (menu) menu.classList.add('hidden');
            }}
          >
            {t('create_service', 'Create Service')}
          </Link>
        </div>
      </div>

      <div 
        ref={dropdownRef2}
        id="create-first-listing-dropdown"
        className="hidden fixed origin-top-center rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        role="menu" 
        aria-orientation="vertical" 
        aria-labelledby="create-first-listing-menu-button" 
        tabIndex={-1}
        style={{ width: '12rem' }} // Match w-48
      >
        <div className="py-1" role="none">
          <Link 
            href="/business/listings/create" 
            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" 
            role="menuitem" 
            tabIndex={-1} 
            id="create-first-listing-menu-item-0"
            onClick={(e) => {
              const menu = document.getElementById('create-first-listing-dropdown');
              if (menu) menu.classList.add('hidden');
            }}
          >
            {t('create_product', 'Create Product')}
          </Link>
          <Link 
            href="/business/listings/create-service" 
            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" 
            role="menuitem" 
            tabIndex={-1} 
            id="create-first-listing-menu-item-1"
            onClick={(e) => {
              const menu = document.getElementById('create-first-listing-dropdown');
              if (menu) menu.classList.add('hidden');
            }}
          >
            {t('create_service', 'Create Service')}
          </Link>
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