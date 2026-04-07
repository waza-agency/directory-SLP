import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import GlitchText from '@/components/common/GlitchText';

interface HeroSectionProps {
  glitchWords: string[];
}

export default function HeroSection({ glitchWords }: HeroSectionProps) {
  const { t } = useTranslation('common');

  return (
    <section id="hero-001" className="relative h-screen min-h-[700px] max-h-[1000px] flex items-center overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="San Luis Potosí"
          fill
          className="object-cover scale-105 opacity-60"
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>

      <div className="absolute top-20 right-20 w-64 h-64 border border-primary/20 rounded-full opacity-40 animate-pulse-slow" />
      <div className="absolute bottom-32 left-20 w-48 h-48 border border-white/10 rounded-full opacity-30 animate-float" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8 animate-fade-in">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="text-white font-medium text-sm tracking-wider uppercase">{t('homepage.hero.badge')}</span>
          </div>

          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] animate-slide-up tracking-tight">
            {t('homepage.hero.titlePrefix')} <GlitchText words={glitchWords} className="text-primary" /> {t('homepage.hero.titleSuffix')}<br />
            <span className="text-primary italic">{t('homepage.hero.title2')}</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl leading-relaxed font-light animate-fade-in" style={{animationDelay: '200ms'}}>
            {t('homepage.hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '400ms'}}>
            <Link
              href="#explore"
              className="group inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 hover:shadow-2xl"
            >
              {t('homepage.hero.cta1')}
              <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/places"
              className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-gray-900 hover:border-white"
            >
              {t('homepage.hero.cta2')}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}