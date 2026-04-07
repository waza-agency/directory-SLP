import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

interface FeaturedPlace {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  ctaUrl: string;
}

interface FeaturedPlacesProps {
  places: FeaturedPlace[];
}

export default function FeaturedPlaces({ places }: FeaturedPlacesProps) {
  const { t } = useTranslation('common');

  return (
    <section id="places-001" className="py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="inline-block text-primary-800 font-semibold text-sm tracking-widest uppercase mb-4">{t('homepage.places.badge')}</span>
            <h2 className="font-serif text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {t('homepage.places.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('homepage.places.description')}
            </p>
          </div>
          <Link
            href="/places"
            className="hidden md:inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-primary transition-colors group"
          >
            {t('homepage.places.viewAll')}
            <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {places.slice(0, 3).map((place) => (
            <article key={place.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={place.imageUrl}
                  alt={place.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-xs font-semibold text-gray-900">{t('homepage.places.featured')}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {place.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                  {place.description}
                </p>
                <Link
                  href={place.ctaUrl}
                  className="inline-flex items-center gap-2 text-primary-800 font-semibold hover:gap-3 transition-all"
                  aria-label={`${t('homepage.places.discoverMore')}: ${place.name}`}
                >
                  {t('homepage.places.discoverMore')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link
            href="/places"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all"
          >
            {t('homepage.places.viewAll')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}