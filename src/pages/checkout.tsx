import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/supabase-auth';
import { formatMXNPriceCompact } from '@/utils/currency';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function CheckoutPage() {
  const { t } = useTranslation('common');
  const { cart, removeItem, updateQuantity, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const shippingTotal = cart.reduce((sum, item) => sum + (item.shipping_fee || 0) * item.quantity, 0);
  const grandTotal = cartTotal + shippingTotal;

  const handleCheckout = async () => {
    if (!user) {
      router.push('/account/login?redirect=/checkout');
      return;
    }

    if (cart.length === 0) return;

    setIsProcessing(true);
    setError('');

    try {
      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
            businessId: item.businessId,
            type: item.type,
            shipping_fee: item.shipping_fee,
          })),
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to create checkout session');
      }

      if (data.url) {
        clearCart();
        window.location.href = data.url;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during checkout');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <Head>
          <title>{t('marketplace.checkout', 'Checkout')} | Directory SLP</title>
        </Head>
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {t('marketplace.emptyCart', 'Your cart is empty')}
            </h1>
            <Link href="/shop" className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
              {t('marketplace.continueShopping', 'Continue Shopping')}
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t('marketplace.checkout', 'Checkout')} | Directory SLP</title>
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            {t('marketplace.checkout', 'Checkout')}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center p-4 border-b last:border-b-0">
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden relative">
                      {item.imageUrl ? (
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{formatMXNPriceCompact(item.price)}</p>
                      {item.shipping_fee ? (
                        <p className="text-xs text-gray-400">
                          + {formatMXNPriceCompact(item.shipping_fee)} {t('marketplace.shipping', 'shipping')}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <FiPlus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:text-red-700"
                        aria-label="Remove item"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-lg font-semibold mb-4">
                  {t('marketplace.orderSummary', 'Order Summary')}
                </h2>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('marketplace.subtotal', 'Subtotal')}</span>
                    <span>{formatMXNPriceCompact(cartTotal)}</span>
                  </div>
                  {shippingTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('marketplace.shipping', 'Shipping')}</span>
                      <span>{formatMXNPriceCompact(shippingTotal)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold text-base">
                      <span>{t('marketplace.total', 'Total')}</span>
                      <span>{formatMXNPriceCompact(grandTotal)}</span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded">
                    {error}
                  </div>
                )}

                <button
                  id="checkout-pay-001"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full mt-6 bg-primary text-white py-3 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing
                    ? t('marketplace.processing', 'Processing...')
                    : t('marketplace.payNow', 'Pay Now')}
                </button>

                {!user && (
                  <p className="mt-3 text-xs text-gray-500 text-center">
                    {t('marketplace.loginRequired', 'You need to sign in to complete your purchase')}
                  </p>
                )}
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
