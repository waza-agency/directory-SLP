import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { generateBrandSlug } from '@/lib/brands';

interface Brand {
  id: number;
  name: string;
  description: string;
  image_url: string;
  slug: string;
  category?: string;
  city?: string;
}

interface BrandsShowcaseProps {
  brands: Brand[];
}

export default function BrandsShowcase({ brands }: BrandsShowcaseProps) {
  const { t } = useTranslation('common');

  return (
    <section id="brands-001" className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block text-primary-800 font-semibold text-sm tracking-widest uppercase mb-4">{t('homepage.brands.badge')}</span>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('homepage.brands.title')}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('homepage.brands.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.slice(0, 6).map((brand) => (
            <article key={brand.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={brand.image_url || "/images/placeholder.jpg"}
                  alt={brand.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                {brand.category && (
                  <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-gray-900">{brand.category}</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {brand.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                  {brand.description}
                </p>
                <Link
                  href={`/brands/${brand.slug || generateBrandSlug(brand.name, brand.category || '', brand.city)}`}
                  className="inline-flex items-center gap-2 text-primary-800 font-semibold hover:gap-3 transition-all"
                  aria-label={`${t('homepage.brands.discoverBrand')}: ${brand.name}`}
                >
                  {t('homepage.brands.discoverBrand')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/brands"
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-secondary px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {t('homepage.brands.exploreAll')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}