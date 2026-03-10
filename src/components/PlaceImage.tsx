import { useState } from 'react';
import Image from 'next/image';
import { Place } from '@/types';

const LOGO_PLACEHOLDER = '/images/logo.jpeg';

interface PlaceImageProps {
  place: Place;
  className?: string;
  sizes?: string;
}

export default function PlaceImage({ place, className = '', sizes }: PlaceImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageUrl = place.image_url || place.imageUrl;
  const showLogo = !imageUrl || imageError;

  return (
    <div className={`relative h-48 w-full ${showLogo ? 'bg-[#0a1628]' : 'bg-gray-100'} ${className}`}>
      {showLogo ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={LOGO_PLACEHOLDER}
            alt="San Luis Way"
            width={140}
            height={140}
            className="object-contain opacity-80"
          />
        </div>
      ) : (
        <>
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
          <Image
            src={imageUrl!}
            alt={place.name}
            fill
            className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes={sizes}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        </>
      )}
    </div>
  );
}
