import { useState, useEffect, useCallback } from 'react';
import { Event } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from '@heroicons/react/24/solid';
import { formatDate, getCategoryGradient, getCategoryInfo } from '@/utils/eventHelpers';

interface EventHeroCarouselProps {
  events: Event[];
}

export default function EventHeroCarousel({ events }: EventHeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = events.slice(0, 5);

  const goTo = useCallback(
    (idx: number) => setCurrent((idx + slides.length) % slides.length),
    [slides.length]
  );
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next, slides.length]);

  if (slides.length === 0) return null;

  const event = slides[current];
  const catInfo = getCategoryInfo(event.category);
  const hasImage = !!event.image_url;

  return (
    <section
      className="relative w-full h-[420px] md:h-[500px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      id="event-hero-carousel-001"
    >
      {/* Background */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {slide.image_url ? (
            <Image
              src={slide.image_url}
              alt={slide.title}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(slide.category)}`} />
          )}
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full container mx-auto px-4 flex items-end pb-12 md:pb-16">
        <div className="max-w-2xl animate-fade-in" key={event.id}>
          {/* Badges */}
          <div className="flex items-center gap-2 mb-4">
            {event.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-secondary-800 text-xs font-bold rounded-full uppercase tracking-wide">
                <StarIcon className="w-3 h-3" />
                Destacado
              </span>
            )}
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${catInfo.bg} ${catInfo.text}`}>
              {catInfo.label}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            {event.title}
          </h2>

          {/* Date & Location */}
          <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm md:text-base mb-6">
            <span className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-primary" />
              {formatDate(event.start_date)}
            </span>
            <span className="flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 text-primary" />
              {event.location}
            </span>
          </div>

          {/* CTA */}
          <Link
            href={`/events/${event.category}/${event.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-secondary font-bold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            Ver Evento
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Navigation arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white transition-all"
            aria-label="Anterior"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white transition-all"
            aria-label="Siguiente"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === current
                  ? 'w-8 h-2 bg-primary'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Ir al evento ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
