import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function HeroBanner() {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-[75vh] min-h-[600px] bg-secondary">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="San Luis Potosí"
          fill
          className="object-cover brightness-90"
          priority
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
      </div>
      
      {/* Content */}
      <div className="absolute inset-0">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <span className="bg-primary/95 text-white px-6 py-3 rounded-full text-xl font-bold mb-6 backdrop-blur-md shadow-lg">
            {t('hero.expatGuide')}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-4 max-w-3xl font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {t('hero.description')}
          </p>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {t('hero.personalTouch')}
          </p>
          <Link
            href="#explore"
            className="block mt-12"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="mx-auto animate-bounce"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 