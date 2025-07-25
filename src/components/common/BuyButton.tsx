
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
  className = '',
}: BuyButtonProps) {

  return (
    <button
      disabled
      className={`px-4 py-2 rounded-md font-medium bg-gray-300 text-gray-500 cursor-not-allowed ${className}`}
      title="Marketplace temporalmente desactivado"
    >
      {'Marketplace Desactivado'}
    </button>
  );
}