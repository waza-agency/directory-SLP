import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { HiCheckCircle } from 'react-icons/hi';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/supabase-auth';
import { supabase } from '@/lib/supabase';

type Order = {
  order_number: string;
  created_at: string;
  amount: number;
};

const OrderConfirmationPage: NextPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOrder = async () => {
      if (!user) {
        router.push('/signin');
        return;
      }

      try {
        // Get the most recent completed order for this user
        const { data, error } = await supabase
          .from('orders')
          .select('order_number, created_at, amount')
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching order:', error);
          router.push('/');
          return;
        }

        if (data) {
          setOrder(data);
        } else {
          // No completed order found
          router.push('/');
        }
      } catch (error) {
        console.error('Error:', error);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkOrder();
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!order) {
    return null; // Will redirect in useEffect
  }

  // Format the delivery date (7 days from order date)
  const deliveryDate = new Date(order.created_at);
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Head>
        <title>Order Confirmation - San Luis Potosí</title>
        <meta name="description" content="Your order has been confirmed" />
        <meta name="robots" content="noindex" />
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
                <p className="font-medium">{order.order_number}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Estimated Delivery Date</p>
                <p className="font-medium">{formattedDeliveryDate}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Order Total</p>
                <p className="font-medium">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(order.amount)}
                </p>
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
            <Link href="/" className="bg-gray-100 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-200 transition-colors">
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