import { useState } from 'react';
import Image from 'next/image';
import { Place } from '@/types';

interface PlaceImageProps {
  place: Place;
  className?: string;
  sizes?: string;
}

export default function PlaceImage({ place, className = '', sizes }: PlaceImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Function to get default image URL based on category - ONLY used if imageURL fails to load
  const getDefaultImage = (category: string) => {
    switch (category.toLowerCase()) {
      case 'restaurant':
        return 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000';
      case 'cafe':
        return 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000';
      case 'bar':
        return 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?q=80&w=1000';
      case 'hotel':
        return 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000';
      case 'museum':
        return 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1000';
      case 'park':
        return 'https://images.unsplash.com/photo-1494810586627-0fdb86a76655?q=80&w=1000';
      case 'shop':
        return 'https://images.unsplash.com/photo-1555529771-7888783a18d3?q=80&w=1000';
      case 'service':
        return 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1000';
      default:
        return 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?q=80&w=1000';
    }
  };
  
  // Directly use the image URL from place data without any validation
  const imageUrl = place.imageUrl || getDefaultImage(place.category);
  
  // Debug info
  console.log(`Rendering image for ${place.name}: ${imageUrl}`);
  
  return (
    <div className={`relative h-48 w-full bg-gray-100 ${className}`}>
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      
      <Image
        src={imageUrl}
        alt={place.name}
        fill
        className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        sizes={sizes}
        unoptimized={true}
        onLoad={() => setImageLoaded(true)}
        onError={(e) => {
          console.error(`Image error for ${place.name}: ${imageUrl}`);
          setImageError(true);
          
          // If the image fails to load, try to load the default image instead
          if (imageUrl !== getDefaultImage(place.category)) {
            const img = e.target as HTMLImageElement;
            img.src = getDefaultImage(place.category);
          } else {
            setImageLoaded(true); // Just show empty state
          }
        }}
      />
    </div>
  );
} 