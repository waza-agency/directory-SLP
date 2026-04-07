import React, { Suspense } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

const ImageCarousel = dynamic(() => import('@/components/ImageCarousel'));

interface OutdoorActivity {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  linkText: string;
  badge: string;
  badgeColor: string;
}

interface OutdoorsSectionProps {
  activities: OutdoorActivity[];
}

export default function OutdoorsSection({ activities }: OutdoorsSectionProps) {
  const { t } = useTranslation('common');

  return (
    <section id="outdoors-001" className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary-800 font-semibold text-sm tracking-widest uppercase mb-4">{t('homepage.outdoors.badge')}</span>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('homepage.outdoors.title')}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('homepage.outdoors.description')}
          </p>
        </div>

        <div className="mb-12">
          <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
            <ImageCarousel
              items={activities}
              itemsPerView={4}
              height="h-64"
              interval={6000}
            />
          </Suspense>
        </div>

        <div className="text-center">
          <Link
            href="/outdoors"
            className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary-light text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {t('homepage.outdoors.cta')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}