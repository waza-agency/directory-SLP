import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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
  const { t } = useTranslation('common');
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [hasBusinessProfile, setHasBusinessProfile] = useState(false);

  useEffect(() => {
    // Redirect if not authenticated
    if (!user && !isLoading) {
      router.push('/signin?redirect=/account');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchUserOrders();
      checkBusinessProfile();
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

      setProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const fetchUserOrders = async () => {
    try {
      // Check if the user is a business account
      if (profile?.account_type === 'business') {
        // For business accounts, we might handle received orders differently
        // Currently, we're just showing an empty state
        setOrders([]);
        return;
      }

      // First get all orders
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (orderError) {
        // If the error is related to the table not existing, just set empty orders
        if (orderError.code === '42P01') { // PostgreSQL code for undefined_table
          console.log('Orders table does not exist yet:', orderError);
          setOrders([]);
          return;
        }
        throw orderError;
      }

      if (!orderData || orderData.length === 0) {
        setOrders([]);
        return;
      }

      // Then get the count of items in each order
      const ordersWithItemCount = await Promise.all(
        orderData.map(async (order) => {
          try {
            const { count, error: countError } = await supabase
              .from('order_items')
              .select('*', { count: 'exact', head: true })
              .eq('order_id', order.id);

            if (countError) {
              console.error('Error counting order items:', countError);
              return { ...order, items: 0 };
            }

            return { ...order, items: count || 0 };
          } catch (err) {
            console.error('Error processing order item count:', err);
            return { ...order, items: 0 };
          }
        })
      );

      setOrders(ordersWithItemCount);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      // Set orders to empty array to avoid display issues
      setOrders([]);
    }
  };

  const checkBusinessProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('business_profiles')
        .select('id')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) {
        console.error('Error checking business profile:', error);
        return;
      }

      setHasBusinessProfile(!!data);
    } catch (error) {
      console.error('Error checking business profile:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
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
        <title>{t('account.title', 'My Account')} | Directory SLP</title>
        <meta name="description" content={t('account.description', 'Manage your account settings and view your order history.')} />
      </Head>

      <div className="min-h-screen py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('account.myAccount', 'My Account')}</h1>

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
                      {t('account.dashboard', 'Dashboard')}
                    </Link>
                    <Link href="/account/orders" className="block w-full py-2 px-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                      {t('account.orders', 'Orders')}
                    </Link>

                    {/* Only show the User Profile link if the user doesn't have a business profile */}
                    {!hasBusinessProfile && (
                      <Link href="/account/profile" className="block w-full py-2 px-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                        {t('account.profile', 'Profile')}
                      </Link>
                    )}

                    {/* Business Profile Link - Only shown if user has a business profile */}
                    {hasBusinessProfile && (
                      <Link href="/business/profile" className="block w-full py-2 px-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                        {t('account.businessProfile', 'Business Profile')}
                      </Link>
                    )}

                    {/* Business Dashboard Link - Only shown if user has a business profile */}
                    {hasBusinessProfile && (
                      <Link href="/business/dashboard" className="block w-full py-2 px-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                        {t('account.businessDashboard', 'Business Dashboard')}
                      </Link>
                    )}

                    {/* Business Subscription Link - Show for all users */}
                    <Link href="/business/subscription" className="block w-full py-2 px-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                      {hasBusinessProfile
                        ? t('account.manageBusiness', 'Manage Business')
                        : t('account.createBusiness', 'Create Business')}
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left py-2 px-3 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
                    >
                      {t('account.signOut', 'Sign Out')}
                    </button>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="md:col-span-3">
                {/* Account overview */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('account.accountOverview', 'Account Overview')}</h2>

                  {isLoadingProfile ? (
                    <p>Loading profile information...</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-gray-700 mb-2">{t('account.accountDetails', 'Account Details')}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{profile?.name || t('account.notProvided', 'Not provided')}</p>
                          <p>{user.email}</p>
                          <p>{profile?.phone || t('account.notProvided', 'Not provided')}</p>
                        </div>
                        <Link href={hasBusinessProfile ? "/business/profile" : "/account/profile"} className="inline-block mt-3 text-sm text-primary hover:text-primary-dark">
                          {t('account.editProfile', 'Edit Profile')}
                        </Link>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-700 mb-2">{t('account.defaultAddress', 'Default Address')}</h3>
                        {profile?.address ? (
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>{profile.address}</p>
                            <p>{profile.city}{profile.zip_code ? `, ${profile.zip_code}` : ''}</p>
                            <p>{profile.country || ''}</p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600">{t('account.noAddressProvided', 'No address provided')}</p>
                        )}
                        <Link href={hasBusinessProfile ? "/business/profile" : "/account/profile"} className="inline-block mt-3 text-sm text-primary hover:text-primary-dark">
                          {t('account.updateAddress', 'Update Address')}
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
                        : t('account.recentOrders', 'Recent Orders')}
                    </h2>
                    <Link href="/account/orders" className="text-sm text-primary hover:text-primary-dark">
                      {t('account.viewAll', 'View All')}
                    </Link>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">
                        {profile?.account_type === 'business'
                          ? "You haven't received any orders yet."
                          : t('account.noOrders', 'You haven\'t placed any orders yet.')}
                      </p>
                      {profile?.account_type === 'business' ? (
                        <Link href="/business/subscription" className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
                          Subscribe your business and start receiving orders
                        </Link>
                      ) : (
                        <Link href="/marketplace" className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
                          {t('account.startShopping', 'Start Shopping')}
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {t('account.order', 'Order')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {t('account.date', 'Date')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {t('account.status', 'Status')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {t('account.total', 'Total')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {t('account.items', 'Items')}
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

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}