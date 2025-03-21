import { useState, useEffect } from 'react';
import { Place } from '@/types';
import PlaceCard from './PlaceCard';

interface FeaturedCarouselProps {
  places: Place[];
}

export default function FeaturedCarousel({ places }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      // After fade out, change slide and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev === places.length - 1 ? 0 : prev + 1));
        setIsVisible(true);
      }, 500); // Match this with the transition duration
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [places.length]);

  return (
    <div className="relative bg-gradient-to-r from-gray-50 to-white py-8 rounded-xl shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8">
        {places.slice(currentIndex, currentIndex + 4).map((place, index) => (
          <div
            key={`${place.id}-${index}`}
            className={`transition-opacity duration-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <PlaceCard place={place} featured />
          </div>
        ))}
      </div>
    </div>
  );
} 