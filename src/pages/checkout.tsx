import { useState, useEffect, FormEvent } from 'react';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FaShoppingBag, FaCreditCard } from 'react-icons/fa';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/supabase-auth';
import { supabase } from '@/lib/supabase';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutPage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { cart, removeItem, updateQuantity, clearCart, getCartTotal } = useCart();
  const { user, isLoading, supabase: supabaseClientFromContext, session } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const cartTotal = getCartTotal();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Mexico',
    paymentMethod: 'card',
  });

  // Initialize form with user data if available
  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  // Fetch user details for pre-filling the form
  const fetchUserDetails = async () => {
    if (!user || typeof user !== 'object' || !('id' in user)) return;
    try {
      const { data, error } = await supabase
        .from('users')
        .select('name, email, address, city, country, zip_code')
        .eq('id', (user as any).id)
        .single();
      if (error) throw error;
      if (data) {
        setFormData(prev => ({
          ...prev,
          name: data.name || '',
          email: data.email || '',
          address: data.address || '',
          city: data.city || '',
          country: data.country || 'Mexico',
          zipCode: data.zip_code || '',
        }));
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear validation error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  // Add this above validateForm
  const validations = {
    name: (value: string) => value && value.trim().length > 0,
    email: (value: string) => /\S+@\S+\.\S+/.test(value),
    address: (value: string) => value && value.trim().length > 0,
    city: (value: string) => value && value.trim().length > 0,
    state: (value: string) => value && value.trim().length > 0,
    zipCode: (value: string) => value && value.trim().length > 0,
    country: (value: string) => value && value.trim().length > 0,
    paymentMethod: (value: string) => value === 'card' || value === 'cash',
  };

  // Validate the form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    let isValid = true;

    // Validate each field
    for (const [field, validator] of Object.entries(validations)) {
      if (!validator((formData as any)[field])) {
        errors[field] = t(`checkout.validation.${field}`, `Please enter a valid ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (!user || typeof user !== 'object' || !('id' in user)) throw new Error('User not found');
      // Use supabase client from context if available
      const supabaseClient = supabaseClientFromContext || supabase;
      // Log user and session for debugging
      console.log('Order creation: user.id', user.id, 'session', session);
      // Create order in database
      const { data: order, error: orderError } = await supabaseClient
        .from('orders')
        .insert([
          {
            user_id: user.id, // Always use the authenticated user's id
            status: 'pending',
            total: cartTotal,
            shipping_address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}`,
          }
        ])
        .select()
        .single();

      if (orderError) {
        console.error('Order creation error:', orderError, 'user_id:', user.id, 'session:', session);
        throw orderError;
      }

      // Add order items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        listing_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      console.log('Order Items Payload:', orderItems);

      const { error: itemsError } = await supabaseClient
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Update inventory for listings (only for type 'listing')
      for (const item of cart) {
        if (item.type === 'listing') {
          // Optionally update inventory if you have such a column
          // Remove supabase.sql usage if not supported
          // You may need to update this logic based on your DB setup
        }
      }

      // If card payment is selected, redirect to Stripe checkout
      if (formData.paymentMethod === 'card') {
        await processRegularPayment(order.id);
      } else {
        // For cash payment, just clear cart and redirect
        clearCart();
        sessionStorage.setItem('completed_checkout', 'true');
        sessionStorage.setItem('order_id', order.id);
        router.push('/order-confirmation');
      }
    } catch (error) {
      console.error('Error processing order:', error);
      setIsSubmitting(false);
    }
  };

  // Wait for Stripe.js to load before using it
  const waitForStripe = () => {
    return new Promise((resolve, reject) => {
      if (window.Stripe) {
        resolve(window.Stripe);
      } else {
        // Check if Stripe.js script is present
        const stripeScript = document.querySelector('script[src*="stripe.com/v3"]');
        if (!stripeScript) {
          // If script is not present, add it dynamically
          const script = document.createElement('script');
          script.src = 'https://js.stripe.com/v3/';
          script.async = true;
          document.body.appendChild(script);
        }

        const interval = setInterval(() => {
          if (window.Stripe) {
            clearInterval(interval);
            resolve(window.Stripe);
          }
        }, 100);

        // Timeout after 10 seconds
        setTimeout(() => {
          clearInterval(interval);
          reject(new Error('Stripe.js failed to load within 10 seconds.'));
        }, 10000);
      }
    });
  };

  // Process regular payment for non-marketplace items
  const processRegularPayment = async (orderId: string) => {
    setPaymentError(null);
    try {
      const items = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        shipping_fee: item.shipping_fee || 0
      }));

      // Ensure we have the publishable key
      const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      if (!stripePublishableKey) {
        throw new Error('Stripe publishable key is not configured');
      }

      // Ensure the URL ends with a trailing slash to match Next.js config
      const response = await fetch('/api/checkout/create-session/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          items,
          customerEmail: formData.email,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || errorData.message || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      if (!sessionId) {
        throw new Error('No sessionId returned from server');
      }

      // Initialize Stripe
      const stripe = await loadStripe(stripePublishableKey);
      if (!stripe) {
        throw new Error('Failed to initialize Stripe');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        throw error;
      }
    } catch (err: any) {
      console.error('Payment processing error:', err);
      setPaymentError(err.message || 'An unexpected error occurred while processing your payment.');
      setIsSubmitting(false);
    }
  };

  // Calculate shipping fee for physical items only
  const shippingFee = cart.reduce((sum, item) => {
    const fee = item.shipping_fee !== undefined && item.shipping_fee !== null ? Number(item.shipping_fee) : 0;
    return sum + fee * (item.quantity || 1);
  }, 0);
  const taxRate = 0.16; // 16% tax rate
  const taxAmount = cartTotal * taxRate;
  const orderTotal = cartTotal + shippingFee + taxAmount;

  if (!user || cart.length === 0) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{t('checkout.title', 'Checkout')} | Directory SLP</title>
        <meta name="description" content={t('checkout.description', 'Complete your purchase from San Luis Potosí vendors.') || 'Complete your purchase from San Luis Potosí vendors.'} />
      </Head>

      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('checkout.heading', 'Checkout')}
          </h1>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Checkout Form */}
            <div className="md:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <form onSubmit={handleSubmit}>
                  {/* Customer Information */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {t('checkout.customerInformation', 'Customer Information')}
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('checkout.fullName', 'Full Name')}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md py-2 px-3 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-primary focus:border-primary`}
                        />
                        {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('checkout.email', 'Email Address')}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md py-2 px-3 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-primary focus:border-primary`}
                        />
                        {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {t('checkout.shippingInformation', 'Shipping Information')}
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('checkout.address', 'Street Address')}
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md py-2 px-3 border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-primary focus:border-primary`}
                        />
                        {formErrors.address && <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('checkout.city', 'City')}
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`block w-full rounded-md py-2 px-3 border ${formErrors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-primary focus:border-primary`}
                          />
                          {formErrors.city && <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>}
                        </div>

                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('checkout.state', 'State/Province')}
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className={`block w-full rounded-md py-2 px-3 border ${formErrors.state ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-primary focus:border-primary`}
                          />
                          {formErrors.state && <p className="mt-1 text-sm text-red-600">{formErrors.state}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('checkout.zipCode', 'ZIP / Postal Code')}
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className={`block w-full rounded-md py-2 px-3 border ${formErrors.zipCode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-primary focus:border-primary`}
                          />
                          {formErrors.zipCode && <p className="mt-1 text-sm text-red-600">{formErrors.zipCode}</p>}
                        </div>

                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('checkout.country', 'Country')}
                          </label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className={`block w-full rounded-md py-2 px-3 border ${formErrors.country ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-primary focus:border-primary`}
                          />
                          {formErrors.country && <p className="mt-1 text-sm text-red-600">{formErrors.country}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {t('checkout.paymentMethod', 'Payment Method')}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="card"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                          Credit / Debit Card
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="cash"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <label htmlFor="cash" className="ml-3 block text-sm font-medium text-gray-700">
                          Cash on Delivery
                        </label>
                      </div>
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-md">
                        {t('checkout.cardPaymentInfo', 'Payment details will be securely collected by our payment processor Stripe.')}
                      </div>
                    )}
                  </div>

                  {/* Place Order Button */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-70"
                    >
                      {isSubmitting ? t('checkout.processing', 'Processing...') : `${t('checkout.placeOrder', 'Place Order')} - $${orderTotal.toFixed(2)}`}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {t('checkout.orderSummary', 'Order Summary')}
                </h3>

                <div className="divide-y divide-gray-200">
                  {/* Cart Items */}
                  <div className="py-4">
                    <ul className="space-y-4">
                      {cart.map((item) => (
                        <li key={item.id} className="flex items-start">
                          <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center mr-4">
                            {/* No image rendering */}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                            <div className="flex justify-between mt-1">
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Order Details */}
                  <div className="py-4">
                    <div className="flex justify-between mb-2">
                      <p className="text-sm text-gray-600">{t('checkout.subtotal', 'Subtotal')}</p>
                      <p className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm text-gray-600">{t('checkout.shipping', 'Shipping')}</p>
                      <p className="text-sm font-medium text-gray-900">${shippingFee.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm text-gray-600">{t('checkout.tax', 'Tax (16%)')}</p>
                      <p className="text-sm font-medium text-gray-900">${taxAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="py-4">
                    <div className="flex justify-between">
                      <p className="text-base font-medium text-gray-900">{t('checkout.total', 'Total')}</p>
                      <p className="text-base font-bold text-gray-900">${orderTotal.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {paymentError && (
            <div className="text-red-600 mt-2 text-center">{paymentError}</div>
          )}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default CheckoutPage;