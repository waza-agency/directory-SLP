import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/supabase-auth';
import { supabase } from '@/lib/supabase';

const CheckoutPage: NextPage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { cart, removeItem, updateQuantity, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Mexico',
    paymentMethod: 'card',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const cartTotal = getCartTotal();

  // Prefill form with user data if available
  useState(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setFormData(prev => ({
            ...prev,
            firstName: data.name?.split(' ')[0] || '',
            lastName: data.name?.split(' ').slice(1).join(' ') || '',
            email: data.email || user.email || '',
            address: data.address || '',
            city: data.city || '',
            zipCode: data.zip_code || '',
            country: data.country || 'Mexico',
          }));
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };
    
    fetchUserProfile();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // Required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        errors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    // ZIP code validation
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      errors.zipCode = 'Please enter a valid ZIP code';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            userId: user?.id,
            status: 'pending',
            total: cartTotal,
            shippingAddress: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}`,
          }
        ])
        .select()
        .single();
        
      if (orderError) throw orderError;
      
      // Add order items
      const orderItems = cart.map(item => ({
        orderId: order.id,
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        itemType: item.type || 'listing',
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
        
      if (itemsError) throw itemsError;
      
      // Update inventory for listings
      for (const item of cart) {
        if (item.type === 'listing') {
          const { error: updateError } = await supabase
            .from('places')
            .update({ 
              inventory: supabase.sql`inventory - ${item.quantity}`
            })
            .eq('id', item.id)
            .gt('inventory', 0);
            
          if (updateError) {
            console.error(`Error updating inventory for listing ${item.id}:`, updateError);
          }
        }
      }
      
      // Clear cart after successful order
      clearCart();
      
      // Set flag to indicate successful checkout
      sessionStorage.setItem('completed_checkout', 'true');
      sessionStorage.setItem('order_id', order.id);
      
      // Redirect to order confirmation
      router.push('/order-confirmation');
    } catch (error) {
      console.error('Error processing order:', error);
      setIsSubmitting(false);
    }
  };

  // Calculate shipping fee and taxes for display
  const shippingFee = 5.99;
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
        <meta name="description" content={t('checkout.description', 'Complete your purchase from San Luis Potosí vendors.')} />
      </Head>

      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('checkout.heading', 'Checkout')}
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout Form */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('checkout.shippingInformation', 'Shipping Information')}
                </h2>
                
                <form onSubmit={handleSubmit}>
                  {/* Customer Information */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {t('checkout.customerInformation', 'Customer Information')}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('checkout.firstName', 'First Name')} *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-md ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formErrors.firstName && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.firstName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('checkout.lastName', 'Last Name')} *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-md ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formErrors.lastName && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.lastName}</p>
                        )}
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('checkout.email', 'Email Address')} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-md ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Shipping Address */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {t('checkout.shippingAddress', 'Shipping Address')}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('checkout.address', 'Street Address')} *
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-md ${formErrors.address ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formErrors.address && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.address}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('checkout.city', 'City')} *
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-md ${formErrors.city ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {formErrors.city && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.city}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('checkout.state', 'State')} *
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-md ${formErrors.state ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {formErrors.state && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.state}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('checkout.zipCode', 'ZIP / Postal Code')} *
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-md ${formErrors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {formErrors.zipCode && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.zipCode}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('checkout.country', 'Country')}
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="Mexico">Mexico</option>
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                          </select>
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
                        <p className="text-sm text-gray-500">
                          Payment details would be collected securely by our payment processor.
                          This is a demo checkout page, so no actual payment will be processed.
                        </p>
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
                      {isSubmitting ? 'Processing...' : `Place Order - $${orderTotal.toFixed(2)}`}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('checkout.orderSummary', 'Order Summary')}
                </h2>
                
                {/* Cart Items */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    {t('checkout.items', 'Items')} ({cart.length})
                  </h3>
                  
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-start">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-xs text-gray-500">No image</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                          <div className="flex justify-between mt-1">
                            <p className="text-sm text-gray-500">${item.price.toFixed(2)} × {item.quantity}</p>
                            <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <div className="flex items-center mt-2">
                            <label htmlFor={`qty-${item.id}`} className="sr-only">Quantity</label>
                            <select
                              id={`qty-${item.id}`}
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                              className="text-xs border-gray-300 rounded-md mr-2"
                            >
                              {[...Array(10).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                  {num + 1}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-xs text-red-500 hover:text-red-700"
                            >
                              {t('checkout.remove', 'Remove')}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">{t('checkout.subtotal', 'Subtotal')}</span>
                    <span className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">{t('checkout.shipping', 'Shipping')}</span>
                    <span className="text-sm font-medium text-gray-900">${shippingFee.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">{t('checkout.tax', 'Tax')} (16%)</span>
                    <span className="text-sm font-medium text-gray-900">${taxAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
                    <span className="text-base font-medium text-gray-900">{t('checkout.total', 'Total')}</span>
                    <span className="text-base font-medium text-gray-900">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default CheckoutPage; 