import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../lib/cart-context';
import { FiShoppingCart, FiPlus, FiMinus, FiX } from 'react-icons/fi';
import { useAuth } from '@/lib/supabase-auth';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeItem, updateItemQuantity, clearCart, cartTotal, cartCount } = useCart();
  const router = useRouter();
  const { user } = useAuth();

  // Close cart when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckout = () => {
    if (!user) {
      // Redirect to login if user is not authenticated
      router.push('/account/login?redirect=/checkout');
      return;
    }
    
    // Navigate to checkout page
    router.push('/checkout');
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      {/* Cart Button */}
      <button
        onClick={toggleCart}
        className="flex items-center justify-center p-2 text-gray-700 hover:text-primary transition-colors relative"
        aria-label="Cart"
      >
        <FiShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {/* Cart Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleCart}
            aria-hidden="true"
          />

          {/* Cart Panel */}
          <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Your Cart ({cartCount})</h2>
              <button 
                onClick={toggleCart}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close cart"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <FiShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <Link href="/products" passHref>
                    <span className="text-primary hover:underline cursor-pointer">
                      Continue shopping
                    </span>
                  </Link>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <ul className="divide-y">
                    {cart.map((item) => (
                      <li key={item.id} className="py-4 flex">
                        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded overflow-hidden relative">
                          {item.image ? (
                            <Image 
                              src={item.image} 
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <span className="text-gray-400 text-xs">No image</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium">{item.name}</h3>
                            <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                          </div>
                          
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center border rounded">
                              <button 
                                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 text-gray-600"
                                aria-label="Decrease quantity"
                              >
                                <FiMinus className="w-3 h-3" />
                              </button>
                              <span className="px-2 py-1">{item.quantity}</span>
                              <button 
                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-gray-600"
                                aria-label="Increase quantity"
                              >
                                <FiPlus className="w-3 h-3" />
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                              aria-label="Remove item"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Cart Summary */}
                  <div className="mt-6 border-t pt-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-semibold">Total:</span>
                      <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                    </div>
                    
                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors mb-3"
                    >
                      Checkout
                    </button>
                    
                    <div className="flex justify-between">
                      <button 
                        onClick={clearCart}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Clear cart
                      </button>
                      
                      <button 
                        onClick={toggleCart}
                        className="text-primary text-sm hover:underline"
                      >
                        Continue shopping
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 