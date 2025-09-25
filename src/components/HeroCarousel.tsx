import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  accent?: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  interval?: number;
}

export default function HeroCarousel({ 
  slides, 
  autoPlay = true, 
  interval = 8000 
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 100);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 100);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 100);
  };

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative h-[85vh] min-h-[750px] bg-secondary overflow-hidden">
      {/* Background Images with enhanced transitions */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1200 ease-out ${
              index === currentIndex
                ? 'opacity-100 scale-100'
                : index === (currentIndex - 1 + slides.length) % slides.length
                ? 'opacity-0 scale-105'
                : 'opacity-0 scale-95'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover brightness-[0.7] transition-all duration-1200 hover:brightness-[0.8] hover:scale-105"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}

        {/* Enhanced gradient overlays with subtle animation */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-secondary/8 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/40"></div>
      </div>

      {/* Enhanced animated decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-16 left-16 lg:top-20 lg:left-20 w-24 h-24 lg:w-32 lg:h-32 border-2 border-primary/25 rounded-full animate-float shadow-primary/20 shadow-2xl"></div>
        <div className="absolute bottom-16 right-16 lg:bottom-20 lg:right-20 w-20 h-20 lg:w-24 lg:h-24 border-2 border-secondary/25 rounded-full animate-float shadow-colored" style={{animationDelay: '1000ms'}}></div>
        <div className="absolute top-1/3 right-1/4 lg:right-1/3 w-12 h-12 lg:w-16 lg:h-16 border border-white/15 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/5 lg:left-1/4 w-16 h-16 lg:w-20 lg:h-20 border border-white/10 rounded-full animate-spin" style={{animation: 'spin 8s linear infinite'}}></div>
        <div className="absolute top-1/2 left-16 w-2 h-2 bg-primary/40 rounded-full animate-ping"></div>
        <div className="absolute top-1/4 right-1/2 w-1 h-1 bg-secondary/60 rounded-full animate-pulse"></div>
      </div>

      {/* Content with enhanced layout */}
      <div className="absolute inset-0 flex items-center">
        <div className="container-responsive">
          <div className="max-w-5xl relative z-10">
            {/* Content with enhanced entrance animation */}
            <div className={`transition-all duration-800 ease-out ${
              isTransitioning
                ? 'opacity-0 transform translate-y-12 scale-95'
                : 'opacity-100 transform translate-y-0 scale-100'
            }`}>
              {/* Enhanced accent line */}
              <div className="w-32 h-1.5 bg-gradient-to-r from-primary via-primary-light to-secondary mb-8 rounded-full shadow-primary animate-fadeInLeft"></div>

              {/* Enhanced accent badge */}
              <span className="inline-block bg-gradient-to-r from-primary/95 to-primary-dark/95 text-white px-8 py-4 rounded-2xl text-lg font-bold mb-8 backdrop-blur-md shadow-lg hover:shadow-primary/30 transition-all duration-300 animate-fadeInUp border border-white/10" style={{animationDelay: '200ms'}}>
                {currentSlide.accent || 'Your Guide to San Luis Potosí'}
              </span>

              {/* Enhanced title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-[0_6px_12px_rgba(0,0,0,0.8)] animate-fadeInUp text-balance" style={{animationDelay: '300ms'}}>
                {currentSlide.title}
              </h1>

              {/* Enhanced subtitle */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-white/95 mb-6 font-light drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] animate-fadeInUp leading-relaxed" style={{animationDelay: '400ms'}}>
                {currentSlide.subtitle}
              </h2>

              {/* Enhanced description */}
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl font-light drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)] animate-fadeInUp leading-relaxed" style={{animationDelay: '500ms'}}>
                {currentSlide.description}
              </p>

              {/* Enhanced CTA Button */}
              <Link
                href={currentSlide.ctaLink}
                className="inline-flex items-center gap-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg backdrop-blur-sm border border-white/10 animate-fadeInUp group" style={{animationDelay: '600ms'}}
              >
                {currentSlide.ctaText}
                <svg className="w-6 h-6 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={prevSlide}
          className="ml-8 p-4 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed group"
          disabled={isTransitioning}
        >
          <ChevronLeftIcon className="w-7 h-7 transform transition-transform group-hover:-translate-x-0.5" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={nextSlide}
          className="mr-8 p-4 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed group"
          disabled={isTransitioning}
        >
          <ChevronRightIcon className="w-7 h-7 transform transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Enhanced Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative transition-all duration-400 focus:outline-none group ${
              index === currentIndex
                ? 'w-8 h-3 bg-primary rounded-full scale-110 shadow-lg'
                : 'w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full hover:scale-110'
            }`}
            disabled={isTransitioning}
          >
            {index === currentIndex && (
              <div className="absolute inset-0 bg-primary rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 right-8">
        <Link href="#explore" className="block p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 border border-white/10 group">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce group-hover:animate-pulse"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}