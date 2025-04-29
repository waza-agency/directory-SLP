import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { HiCheckCircle } from 'react-icons/hi';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const OrderConfirmationPage: NextPage = () => {
  const router = useRouter();
  
  // Generate a random order number
  const orderNumber = React.useMemo(() => {
    return 'SLP-' + Math.floor(100000 + Math.random() * 900000);
  }, []);
  
  // Mock delivery date (7 days from now)
  const deliveryDate = React.useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }, []);

  // Redirect to home if user navigates directly to this page without checkout flow
  React.useEffect(() => {
    const hasOrderData = sessionStorage.getItem('completed_checkout');
    
    if (!hasOrderData) {
      router.push('/');
    } else {
      // Clear the flag after successful navigation
      sessionStorage.removeItem('completed_checkout');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Order Confirmation - San Luis Potosí</title>
        <meta name="description" content="Your order has been confirmed" />
      </Head>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <HiCheckCircle className="text-green-500 text-7xl" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your order has been received and is being processed.
          </p>
          
          <div className="border border-gray-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <div className="space-y-4 text-left">
              <div>
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-medium">{orderNumber}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Estimated Delivery Date</p>
                <p className="font-medium">{deliveryDate}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Shipping Method</p>
                <p className="font-medium">Standard Shipping</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">Credit Card</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">
            A confirmation email has been sent to your email address.
            You can track your order status in your account.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/account/orders" className="bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark transition-colors">
              View Order Status
            </Link>
            <Link href="/products" className="bg-gray-100 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-200 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about your order, please contact our customer service team.
          </p>
          <Link href="/contact" className="text-primary hover:underline">
            Contact Customer Service
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage; 