import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/lib/supabase-auth';
import { supabase } from '@/lib/supabase';

type Order = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items: number;
};

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
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
        fetchUserOrders(),
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
            name: user.user_metadata?.name || user.email?.split[0] || 'User'
          });
        } else {
          console.error('Error fetching user profile:', error);
          // Don't throw here, just use minimal profile data
          setProfile({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || user.email?.split[0] || 'User'
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
        name: user.user_metadata?.name || user.email?.split[0] || 'User'
      });
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const fetchUserOrders = async () => {
    if (!user?.id) {
      console.error('No user ID available for orders fetch');
      setOrders([]);
      return;
    }

    try {
      // Check if supabase is available
      if (!supabase) {
        console.log('Supabase client not available, skipping orders fetch');
        setOrders([]);
        return;
      }

      // Check if the user is a business account
      if (profile?.account_type === 'business') {
        // For business accounts, we might handle received orders differently
        // Currently, we're just showing an empty state
        setOrders([]);
        return;
      }

      // First check if orders table exists by trying a simple query
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select("*")
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5); // Limit to reduce potential issues

      if (orderError) {
        // If the error is related to the table not existing, just set empty orders
        if (orderError.code === '42P01') { // PostgreSQL code for undefined_table
          console.log('Orders table does not exist yet:', orderError);
          setOrders([]);
          return;
        }

        // For other errors, log but don't fail
        console.error('Error fetching orders:', orderError);
        setOrders([]);
        return;
      }

      if (!orderData || orderData.length === 0) {
        setOrders([]);
        return;
      }

      // Then get the count of items in each order safely
      const ordersWithItemCount = await Promise.allSettled(
        orderData.map(async (order) => {
          try {
            const { count, error: countError } = await supabase
              .from('order_items')
              .select("*")
              .eq('order_id', order.id);

            if (countError) {
              console.error('Error counting order items for order', order.id, ':', countError);
              return { ...order, items: 0 };
            }

            return { ...order, items: count || 0 };
          } catch (err) {
            console.error('Error processing order item count for order', order.id, ':', err);
            return { ...order, items: 0 };
          }
        })
      );

      // Extract successful results
      const validOrders = ordersWithItemCount
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<any>).value);

      setOrders(validOrders);
    } catch (error) {
      console.error('Exception fetching user orders:', error);
      // Set orders to empty array to avoid display issues
      setOrders([]);
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
              Welcome back, {profile?.name || user.email?.split[0] || 'User'}!
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
                    <Link href="/account/orders" className="block w-full py-2 px-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                      {'Orders'}
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

                {/* Recent orders */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {profile?.account_type === 'business'
                        ? 'Recent Received Orders'
                        : 'Recent Orders'}
                    </h2>
                    <Link href="/account/orders" className="text-sm text-primary hover:text-primary-dark">
                      {'View All'}
                    </Link>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">
                        {profile?.account_type === 'business'
                          ? "You haven't received any orders yet."
                          : 'You haven\'t placed any orders yet.'}
                      </p>
                      {profile?.account_type === 'business' ? (
                        <Link href="/business/subscription" className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
                          Subscribe your business and start receiving orders
                        </Link>
                      ) : (
                        <Link href="/marketplace" className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
                          {'Start Shopping'}
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {'Order'}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {'Date'}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {'Status'}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {'Total'}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {'Items'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orders.slice(0, 5).map((order) => (
                            <tr key={order.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary hover:text-primary-dark">
                                <Link href={`/account/orders/${order.id}`}>
                                  #{order.id.substring(0, 8)}
                                </Link>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(order.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  order.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${order.total.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.items}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

export async function getServerSideProps({ }: { locale: string }) {
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