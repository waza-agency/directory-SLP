import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import CityLightsEffect from './CityLightsEffect';
import GlitchEffect from './GlitchEffect';
import VectorLineEffect from './VectorLineEffect';

export default function HeroBanner() {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-[75vh] min-h-[600px] bg-secondary">
      {/* Background Image with increased brightness */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="San Luis Potosí"
          fill
          className="object-cover brightness-90"
          priority
          sizes="100vw"
          onLoad={() => setIsBackgroundLoaded(true)}
        />
        {/* Gradient overlays - adjusted for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        
        {/* Animated effects as overlays - reduced opacity */}
        <div className="absolute inset-0 opacity-40">
          <CityLightsEffect />
          <GlitchEffect />
          <VectorLineEffect />
        </div>
      </div>
      
      {/* Content - enhanced text readability */}
      <div className="absolute inset-0">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <span className={`bg-primary/95 text-white px-6 py-3 rounded-full text-xl font-bold mb-6 backdrop-blur-md transform hover:scale-105 transition-transform duration-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-1000 shadow-lg`}>
            {t('hero.expatGuide')}
          </span>
          <h1 className={`text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-1000 delay-200`}>
            {t('hero.title')}
          </h1>
          <p className={`text-xl md:text-2xl text-white mb-4 max-w-3xl font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-1000 delay-400`}>
            {t('hero.description')}
          </p>
          <p className={`text-lg md:text-xl text-white/90 mb-8 max-w-2xl font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-1000 delay-600`}>
            {t('hero.personalTouch')}
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-1000 delay-800`}>
            <Link href="/contact" className="btn-primary text-white px-8 py-3 rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
              {t('hero.connectWithUs')}
            </Link>
            <Link href="/services" className="bg-white/95 text-secondary px-8 py-3 rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
              {t('hero.ourServices')}
            </Link>
          </div>
          <div className={`mt-12 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-1000 delay-1000`}>
            <Link 
              href="#discover" 
              className="text-white hover:text-white transition-colors group drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              aria-label="Scroll down"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 animate-bounce group-hover:animate-none" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 