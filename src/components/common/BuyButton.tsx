import { useCart } from '@/lib/cart-context';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

type BuyButtonProps = {
  productId: string;
  name: string;
  price: number;
  imageUrl?: string;
  businessId?: string;
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
  itemType = 'product',
  shippingFee = 0,
}: BuyButtonProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleAddToCart = () => {
    addItem({
      id: productId,
      name,
      price,
      imageUrl,
      businessId,
      quantity,
      type: itemType,
      shipping_fee: shippingFee,
    });
  };

  const handleBuyNow = () => {
    addItem({
      id: productId,
      name,
      price,
      imageUrl,
      businessId,
      quantity,
      type: itemType,
      shipping_fee: shippingFee,
    });
    router.push('/checkout');
  };

  if (mode === 'buy') {
    return (
      <button
        onClick={handleBuyNow}
        className={`px-4 py-2 rounded-md font-medium bg-primary text-white hover:bg-primary/90 transition-colors ${className}`}
      >
        {t('marketplace.buyNow', 'Buy Now')}
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`px-4 py-2 rounded-md font-medium border border-primary text-primary hover:bg-primary/10 transition-colors ${className}`}
    >
      {t('marketplace.addToCart', 'Add to Cart')}
    </button>
  );
}
