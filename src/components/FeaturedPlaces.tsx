import { Place } from '@/types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import PlaceCard from './PlaceCard';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface FeaturedPlacesProps {
  places: Place[];
  onPlaceSelect?: (place: Place) => void;
}

export default function FeaturedPlaces({ places, onPlaceSelect }: FeaturedPlacesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  if (!places || places.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100 shadow-inner">
        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h3 className="text-xl font-medium text-gray-700 mb-2">No featured places have been added yet.</h3>
        <p className="text-md text-gray-500 max-w-md mx-auto">
          Check that you have marked businesses as featured in your data source.
        </p>
      </div>
    );
  }

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % places.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + places.length) % places.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    // Auto advance slides every 6 seconds if more than one place
    if (places.length <= 1) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [places.length, currentIndex]);

  return (
    <section 
      ref={sectionRef} 
      className={`py-20 bg-gray-50 transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container mx-auto px-6">
        <div className={`flex flex-col md:flex-row justify-between items-center mb-12 ${isVisible ? 'animate-fadeInUp' : ''}`}>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Featured Destinations
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Explore these handpicked gems that showcase the best of San Luis Potosí's culture, cuisine, and hospitality.
            </p>
          </div>
          
          {places.length > 1 && (
            <div className="flex space-x-2 mt-6 md:mt-0">
              <button 
                onClick={prevSlide}
                disabled={isAnimating}
                aria-label="Previous"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-gray-200 text-gray-600 hover-scale hover:border-primary hover:text-primary transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                disabled={isAnimating}
                aria-label="Next"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-gray-200 text-gray-600 hover-scale hover:border-primary hover:text-primary transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
        
        <div 
          ref={carouselRef} 
          className={`relative overflow-hidden ${isVisible ? 'animate-fadeIn delay-300' : ''}`}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {places.map((place, index) => (
              <div 
                key={place.id} 
                className="w-full flex-shrink-0 px-4"
              >
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 staggered-animation`}>
                  {places.slice(index * 3, index * 3 + 3).map((featuredPlace, i) => (
                    <div 
                      key={featuredPlace.id} 
                      className={`animate-fadeInUp`}
                    >
                      <PlaceCard 
                        place={featuredPlace} 
                        featured={true}
                        onClick={() => onPlaceSelect && onPlaceSelect(featuredPlace)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {places.length > 1 && (
            <div className="flex justify-center mt-8">
              {places.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (isAnimating) return;
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 hover:bg-primary ${
                    currentIndex === index ? 'bg-primary scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 