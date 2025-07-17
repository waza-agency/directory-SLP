import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Event } from '@/types';

interface EventsCarouselProps {
  events: Event[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
}

export default function EventsCarousel({ 
  events, 
  autoPlay = true, 
  interval = 5000,
  showControls = true 
}: EventsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || events.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval, events.length]);

  const nextSlide = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
      setIsVisible(true);
    }, 300);
  };

  const prevSlide = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
      setIsVisible(true);
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsVisible(true);
    }, 300);
  };

  if (!events || events.length === 0) return null;

  const visibleEvents = events.slice(currentIndex, currentIndex + 3);
  if (visibleEvents.length < 3 && events.length > 3) {
    const remaining = 3 - visibleEvents.length;
    visibleEvents.push(...events.slice(0, remaining));
  }

  const categoryColors = {
    'arts-culture': 'bg-pink-500',
    'culinary': 'bg-orange-500',
    'music': 'bg-purple-500',
    'kids-family': 'bg-cyan-500',
    'sports': 'bg-green-500',
    'traditional': 'bg-yellow-500',
    'wellness': 'bg-teal-500',
    'community-social': 'bg-blue-500',
    'default': 'bg-gray-500'
  };

  return (
    <div className="relative">
      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleEvents.map((event, index) => (
          <div
            key={`${event.id}-${index}`}
            className={`transition-all duration-500 transform ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 carousel-item">
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.image_url || '/images/calendar/default-event.jpg'}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold ${
                    categoryColors[event.category as keyof typeof categoryColors] || categoryColors.default
                  }`}>
                    {event.category?.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{new Date(event.start_date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  
                  {event.location && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPinIcon className="w-4 h-4" />
                      <span className="truncate max-w-[100px]">{event.location}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {event.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>

                {/* Event CTA */}
                <Link
                  href={`/events/${event.category}/${event.id}`}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium text-sm transition-colors"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {showControls && events.length > 3 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 rounded-full bg-white shadow-lg hover:shadow-xl text-gray-600 hover:text-primary transition-all duration-200 hover:scale-110 z-10"
            aria-label="Previous events"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 rounded-full bg-white shadow-lg hover:shadow-xl text-gray-600 hover:text-primary transition-all duration-200 hover:scale-110 z-10"
            aria-label="Next events"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {events.length > 3 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(events.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index * 3)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / 3) === index 
                  ? 'bg-primary scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}