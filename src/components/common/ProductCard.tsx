import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BuyButton from './BuyButton';
import { formatMXNPriceCompact } from '@/utils/currency';

type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  shipping_fee?: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
  shipping_fee
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/shop/${id}`} className="block">
        <div className="relative h-48">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">No image</span>
            </div>
          )}

          {category && (
            <span className="absolute top-2 right-2 bg-primary/80 text-white text-xs px-2 py-1 rounded">
              {category}
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/shop/${id}`} className="block">
          <h3 className="text-lg font-semibold mb-1 hover:text-primary">{name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        </Link>

        <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
            <span className="text-xl font-bold">{formatMXNPriceCompact(price)}</span>
            <Link
              href={`/shop/${id}`}
              className="text-primary text-sm hover:underline"
            >
              View Details
            </Link>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <BuyButton
              productId={id}
              name={name}
              price={price}
              imageUrl={imageUrl}
              mode="cart"
              className="text-sm py-1.5 flex-1"
              shippingFee={shipping_fee || 0}
            />
            <BuyButton
              productId={id}
              name={name}
              price={price}
              imageUrl={imageUrl}
              mode="buy"
              className="text-sm py-1.5 flex-1"
              shippingFee={shipping_fee || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;