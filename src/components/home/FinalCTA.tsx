import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function FinalCTA() {
  const { t } = useTranslation('common');

  return (
    <section id="cta-001" className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="absolute top-20 right-20 w-64 h-64 border border-primary/20 rounded-full opacity-30 animate-pulse-slow" />
      <div className="absolute bottom-20 left-20 w-48 h-48 border border-white/10 rounded-full opacity-20 animate-float" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            {t('homepage.cta.title1')}<br />{t('homepage.cta.title2')}
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            {t('homepage.cta.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-secondary px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {t('homepage.cta.assistance')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-gray-900"
            >
              {t('homepage.cta.community')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}