import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/lib/supabase-auth';
import { useCart } from '@/lib/cart-context';

export default function CheckoutSuccessPage() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { session_id } = router.query;
  const { user, isLoading } = useAuth();
  const { clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(true);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Clear cart on successful checkout
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  // Get order details from session ID
  useEffect(() => {
    if (session_id && user && !isLoading) {
      fetchOrderDetails();
    }
  }, [session_id, user, isLoading]);

  const fetchOrderDetails = async () => {
    try {
      // Fetch the order using the Stripe session ID
      const response = await fetch(`/api/checkout/get-order?session_id=${session_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.error) {
        console.error('Error fetching order:', data.error);
      } else if (data.order) {
        setOrderId(data.order.id);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // If user is not logged in, redirect to home
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

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
        <title>{t('checkoutSuccess.title', 'Order Confirmed')} | Directory SLP</title>
        <meta name="description" content={t('checkoutSuccess.description', 'Your order has been confirmed and is now being processed.')} />
      </Head>

      <div className="min-h-screen py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <div className="text-center">
              <CheckCircleIcon className="h-16 w-16 mx-auto text-green-500 mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('checkoutSuccess.orderConfirmed', 'Order Confirmed')}
              </h1>
              <p className="text-gray-600 mb-6">
                {t('checkoutSuccess.thankYou', 'Thank you for your purchase!')}
              </p>

              {isProcessing ? (
                <p className="text-gray-600">
                  {t('checkoutSuccess.processingOrder', 'Processing your order...')}
                </p>
              ) : (
                <div className="text-left bg-gray-50 p-4 rounded-md mb-6">
                  <p className="text-gray-600 mb-2">
                    {t('checkoutSuccess.orderDetails', 'Order Details')}:
                  </p>
                  <p className="font-medium">
                    {t('checkoutSuccess.orderNumber', 'Order Number')}: {orderId 
                      ? `#${orderId.substring(0, 8)}`
                      : t('checkoutSuccess.processing', 'Processing')
                    }
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {t('checkoutSuccess.emailConfirmation', 'A confirmation has been sent to your email.')}
                  </p>
                </div>
              )}

              <div className="flex flex-col space-y-4">
                <Link
                  href={orderId ? `/account/orders/${orderId}` : '/account/orders'}
                  className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  {t('checkoutSuccess.viewOrder', 'View Order')}
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                >
                  {t('checkoutSuccess.continueShopping', 'Continue Shopping')}
                </Link>
              </div>
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