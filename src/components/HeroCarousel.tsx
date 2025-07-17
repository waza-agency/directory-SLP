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
    <section className="relative h-[80vh] min-h-[700px] bg-secondary overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover brightness-75"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
      </div>

      {/* Animated decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-primary/30 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-secondary/30 rounded-full animate-float delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 border border-white/10 rounded-full animate-spinSlow"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            {/* Content with entrance animation */}
            <div className={`transition-all duration-700 ${
              isTransitioning ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
            }`}>
              {/* Accent line */}
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mb-6 animate-fadeInLeft"></div>
              
              {/* Accent badge */}
              <span className="inline-block bg-primary/95 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 backdrop-blur-md shadow-lg animate-fadeInUp delay-200">
                {currentSlide.accent || 'Your Guide to San Luis Potosí'}
              </span>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] animate-fadeInUp delay-300">
                {currentSlide.title}
              </h1>

              {/* Subtitle */}
              <h2 className="text-2xl md:text-3xl text-white mb-4 font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] animate-fadeInUp delay-400">
                {currentSlide.subtitle}
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] animate-fadeInUp delay-500">
                {currentSlide.description}
              </p>

              {/* CTA Button */}
              <Link
                href={currentSlide.ctaLink}
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fadeInUp delay-600"
              >
                {currentSlide.ctaText}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={prevSlide}
          className="ml-6 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110"
          disabled={isTransitioning}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={nextSlide}
          className="mr-6 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110"
          disabled={isTransitioning}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8">
        <Link href="#explore" className="block animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}