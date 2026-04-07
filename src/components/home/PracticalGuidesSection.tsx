import React, { Suspense } from 'react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

const ImageCarousel = dynamic(() => import('@/components/ImageCarousel'));

interface PracticalGuide {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  badge: string;
}

interface PracticalGuidesSectionProps {
  guides: PracticalGuide[];
}

export default function PracticalGuidesSection({ guides }: PracticalGuidesSectionProps) {
  const { t } = useTranslation('common');

  return (
    <section id="practical-001" className="py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block text-primary-800 font-semibold text-sm tracking-widest uppercase mb-4">{t('homepage.practical.badge')}</span>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('homepage.practical.title')}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('homepage.practical.description')}
          </p>
        </div>

        <div className="mb-12">
          <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
            <ImageCarousel
              items={guides}
              itemsPerView={3}
              height="h-64"
              autoPlay={false}
              interval={0}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}