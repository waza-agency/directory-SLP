import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroBanner() {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    // Set a small delay before showing content
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Simulate background image loading
    const bgTimer = setTimeout(() => {
      setBgLoaded(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      clearTimeout(bgTimer);
    };
  }, []);

  return (
    <div className="relative bg-gray-900 h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10"></div>
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-15000 ease-in-out ${bgLoaded ? 'scale-105' : 'scale-100'}`}
        style={{ 
          backgroundImage: "url('/images/hero-background.jpg')",
          backgroundPosition: "center 30%"
        }}
      ></div>
      
      <div className="relative z-20 container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <h1 className={`font-serif text-5xl md:text-7xl text-white mb-6 leading-tight transition-all duration-1000 
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {t('hero.title', 'Descubre la Esencia de San Luis Potosí')}
            </h1>
            <p className={`text-xl md:text-2xl text-white/90 mb-10 leading-relaxed transition-all duration-1000 delay-300
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {t('hero.subtitle', 'Explorando la ciudad colonial y todos sus tesoros gastronómicos, culturales e históricos')}
            </p>
            <div className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-500
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Link href="/places" className="btn-primary shadow-lg hover-glow transition-all duration-300">
                {t('hero.explorePlaces', 'Descubrir Lugares')}
              </Link>
              <Link href="/#categories" className="btn-outline border-2 border-white text-white hover:bg-white/10 hover-scale transition-all duration-300">
                {t('hero.viewCategories', 'Explorar Categorías')}
              </Link>
            </div>
            <div className={`mt-12 flex justify-center transition-all duration-1000 delay-700
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <a 
                href="#about" 
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Scroll down"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-10 w-10 animate-float" 
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 