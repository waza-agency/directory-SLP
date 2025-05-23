import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/supabase-auth';
import { useTranslation } from 'next-i18next';

type BuyButtonProps = {
  productId: string;
  name: string;
  price: number;
  imageUrl?: string;
  businessId?: string; // Business ID that owns this product
  quantity?: number;
  className?: string;
  mode?: 'buy' | 'cart';
  itemType?: 'product' | 'listing';
  shippingFee?: number;
};

export default function BuyButton({
  productId,
  name,
  price,
  imageUrl,
  businessId,
  quantity = 1,
  className = '',
  mode = 'cart',
  itemType = 'listing',
  shippingFee = 0
}: BuyButtonProps) {
  const { t } = useTranslation('common');
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem({
      id: productId,
      name,
      price,
      imageUrl,
      businessId, // Include the business ID
      quantity,
      type: itemType,
      shipping_fee: shippingFee
    });
  };

  const handleBuyNow = async () => {
    setIsLoading(true);
    
    if (!user) {
      // Redirect to login if user is not logged in
      router.push(`/signin?redirect=${encodeURIComponent('/checkout')}`);
      return;
    }

    // Add to cart then go to checkout
    addItem({
      id: productId,
      name,
      price,
      imageUrl,
      businessId, // Include the business ID
      quantity,
      type: itemType,
      shipping_fee: shippingFee
    });
    
    router.push('/checkout');
  };

  const buttonAction = mode === 'buy' ? handleBuyNow : handleAddToCart;
  const buttonText = mode === 'buy' 
    ? isLoading ? t('item.processing', 'Processing...') : t('item.buyNow', 'Buy Now')
    : t('item.addToCart', 'Add to Cart');

  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors";
  const modeClasses = mode === 'buy' 
    ? "bg-primary text-white hover:bg-primary-dark" 
    : "bg-white border border-primary text-primary hover:bg-primary-50";
  
  return (
    <button
      onClick={buttonAction}
      disabled={isLoading}
      className={`${baseClasses} ${modeClasses} ${className} ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      {buttonText}
    </button>
  );
} 