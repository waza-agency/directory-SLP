import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export default function DiningSection() {
  const { t } = useTranslation('common');

  const diningCategories = [
    {
      key: 'traditional',
      image: '/images/restaurants-and-bars/traditional-restaurants.jpg',
      link: '/traditional-cuisine'
    },
    {
      key: 'modern',
      image: '/images/restaurants-and-bars/modern-restaurants.webp',
      link: '/restaurants'
    },
    {
      key: 'cocktails',
      image: '/images/restaurants-and-bars/cocktail-bars.webp',
      link: '/category/cocktail-bars'
    },
    {
      key: 'terraces',
      image: '/images/restaurants-and-bars/terraces.webp',
      link: '/category/terraces'
    },
    {
      key: 'cantinas',
      image: '/images/restaurants-and-bars/cantinas.jpg',
      link: '/category/cantinas'
    },
    {
      key: 'liveMusic',
      image: '/images/restaurants-and-bars/live-music.jpg',
      link: '/category/live-music'
    }
  ];

  return (
    <section id="dining-001" className="py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block text-primary-800 font-semibold text-sm tracking-widest uppercase mb-4">{t('homepage.dining.badge')}</span>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('homepage.dining.title')}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('homepage.dining.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diningCategories.map((category) => (
            <article key={category.key} className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category.image}
                  alt={t(`homepage.dining.${category.key}.title`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl font-bold text-white">{t(`homepage.dining.${category.key}.title`)}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {t(`homepage.dining.${category.key}.description`)}
                </p>
                <Link
                  href={category.link}
                  className="inline-flex items-center gap-2 text-primary-800 font-semibold hover:gap-3 transition-all"
                  aria-label={`${t(`homepage.dining.${category.key}.link`)}: ${t(`homepage.dining.${category.key}.title`)}`}
                >
                  {t(`homepage.dining.${category.key}.link`)} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}