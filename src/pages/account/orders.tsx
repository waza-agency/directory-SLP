import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAuth } from '@/lib/supabase-auth';
import { supabase } from '@/lib/supabase';

type Order = {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  items: {
    title: string;
    quantity: number;
    price: number;
  }[];
};

export default function OrdersPage() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (!user && !isLoading) {
      router.push('/signin?redirect=/account/orders');
      return;
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setIsLoadingOrders(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('orders')
        .select(`
          id,
          created_at,
          status,
          total_amount,
          items
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders. Please try again later.');
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <Head>
        <title>{t('My Orders')} | San Luis Way</title>
        <meta name="description" content={t('View your order history')} />
        <meta name="robots" content="noindex" /> {/* Prevent indexing of user-specific pages */}
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('My Orders')}</h1>

          {isLoadingOrders ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
              {error}
              <button
                onClick={fetchOrders}
                className="ml-4 text-sm font-medium text-red-800 hover:text-red-900"
              >
                {t('Try Again')}
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">{t('You haven\'t placed any orders yet.')}</p>
              <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                {t('Start Shopping')}
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">{t('Order placed')}</p>
                        <p className="font-medium">{formatDate(order.created_at)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('Order')} #{order.id}</p>
                        <p className="font-medium text-right">{formatCurrency(order.total_amount)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{t('Status')}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ locale, req }: { locale: string, req: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}