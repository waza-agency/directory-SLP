import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { formatMXNPriceCompact } from '@/utils/currency';

type Order = {
  id: string;
  order_number: string;
  status: string;
  amount: number;
  items: { title: string; quantity: number; price: number }[];
  created_at: string;
};

export default function CheckoutSuccessPage() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { session_id } = router.query;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!session_id) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/checkout/get-order?session_id=${session_id}`);
        const data = await res.json();

        if (res.ok && data.order) {
          setOrder(data.order);
        } else {
          setError(data.error || 'Order not found');
        }
      } catch {
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [session_id]);

  return (
    <>
      <Head>
        <title>{t('marketplace.orderSuccess', 'Order Confirmed')} | Directory SLP</title>
      </Head>

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="mb-6">
                <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {t('marketplace.orderSuccess', 'Order Confirmed!')}
              </h1>

              {loading ? (
                <div className="animate-pulse py-8">
                  <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-32 mx-auto" />
                </div>
              ) : error ? (
                <p className="text-gray-600 mt-4">{error}</p>
              ) : order ? (
                <div className="mt-6 text-left">
                  <div className="border rounded-lg p-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-500">{t('marketplace.orderNumber', 'Order #')}</span>
                      <span className="font-mono font-medium">{order.order_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">{t('marketplace.total', 'Total')}</span>
                      <span className="font-semibold">{formatMXNPriceCompact(order.amount)}</span>
                    </div>
                  </div>

                  {order.items && order.items.length > 0 && (
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">{t('marketplace.items', 'Items')}</h3>
                      <ul className="divide-y">
                        {order.items.map((item, i) => (
                          <li key={i} className="py-2 flex justify-between text-sm">
                            <span>{item.title} x{item.quantity}</span>
                            <span>{formatMXNPriceCompact(item.price * item.quantity)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : null}

              <div className="mt-8 space-x-4">
                <Link
                  href="/shop"
                  className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  {t('marketplace.continueShopping', 'Continue Shopping')}
                </Link>
                <Link
                  href="/"
                  className="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
                >
                  {t('marketplace.goHome', 'Go Home')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
};
