import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { cultureSites } from '@/data/culture';

// Icons are presentation-only — keyed by slug from the shared data
const cultureIcons: Record<string, React.ReactNode> = {
  history: (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  festivals: (
    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
    </svg>
  ),
  language: (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
};

export default function CultureSection() {
  const { t } = useTranslation('common');

  const culturalFeatures = cultureSites.map((site) => ({
    key: site.slug,
    icon: cultureIcons[site.slug],
    link: site.path,
  }));

  const images = [
    { src: cultureSites[0]?.image ?? '/images/cultura-1.jpg', altKey: 'colonialArch', colSpan: 'col-span-7' },
    { src: cultureSites[1]?.image ?? '/images/cultura-2.jpg', altKey: 'traditionalFestivals', colSpan: 'col-span-5' },
    { src: cultureSites[2]?.image ?? '/images/cultura-3.jpg', altKey: 'localArtisans', colSpan: 'col-span-5' },
  ];

  return (
    <section id="culture-001" className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-emerald-900 font-semibold text-sm tracking-widest uppercase mb-4 bg-gradient-to-r from-emerald-100 to-teal-100 px-6 py-2 rounded-full">
              {t('homepage.culture.badge')}
            </span>
            <h2 className="font-serif text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t('homepage.culture.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              {t('homepage.culture.description')}
            </p>

            <div className="space-y-6 mb-12">
              {culturalFeatures.map((feature) => (
                <div key={feature.key} className="flex items-start gap-4 group">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${
                    feature.key === 'history' ? 'bg-gradient-to-br from-primary/20 to-primary/10' :
                    feature.key === 'festivals' ? 'bg-gradient-to-br from-amber-400/20 to-orange-500/10' :
                    'bg-gradient-to-br from-blue-500/20 to-indigo-600/10'
                  }`}>
                    {feature.icon}
                  </div>
                  <div>
                    <Link href={feature.link} className="block hover:opacity-80 transition-opacity">
                      <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                        {t(`homepage.culture.${feature.key}.title`)}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {t(`homepage.culture.${feature.key}.description`)}
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/events/cultural"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-secondary px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {t('homepage.culture.viewCalendar')}
                <CalendarIcon className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="/cultural-tours"
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-primary hover:text-primary transition-all duration-300"
              >
                {t('homepage.culture.bookTour')}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-7">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 group">
                <Image
                  src={images[0].src}
                  alt={t(`homepage.culture.${images[0].altKey}`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-white font-semibold text-lg">{t(`homepage.culture.${images[0].altKey}`)}</span>
                </div>
              </div>
            </div>
            <div className="col-span-5 space-y-4">
              {images.slice(1).map((img, idx) => (
                <div key={idx} className="aspect-square relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 group">
                  <Image
                    src={img.src}
                    alt={t(`homepage.culture.${img.altKey}`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-white text-sm font-medium">{t(`homepage.culture.${img.altKey}`)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}