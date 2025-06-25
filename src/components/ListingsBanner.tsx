import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { BuildingStorefrontIcon, CheckBadgeIcon, MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';

const ListingsBanner: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(99, 102, 241, 0.1) 60px, rgba(99, 102, 241, 0.1) 120px)`
        }}></div>
      </div>

      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
              <BuildingStorefrontIcon className="w-4 h-4" />
              {t('listingsBanner.badge', 'Local Business Directory')}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {t('listingsBanner.title', 'Find Trusted Local Businesses')}
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              {t('listingsBanner.description', 'Connect with verified businesses and service providers in San Luis Potosí. From restaurants to professional services, discover everything you need in one place.')}
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckBadgeIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {t('listingsBanner.feature1.title', 'Verified Businesses')}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t('listingsBanner.feature1.description', 'All listings are verified and actively maintained')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <MagnifyingGlassIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {t('listingsBanner.feature2.title', 'Easy Search')}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t('listingsBanner.feature2.description', 'Filter by category and location')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <MapPinIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {t('listingsBanner.feature3.title', 'Local Focus')}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t('listingsBanner.feature3.description', 'Exclusively San Luis Potosí businesses')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <BuildingStorefrontIcon className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {t('listingsBanner.feature4.title', 'Direct Contact')}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t('listingsBanner.feature4.description', 'Phone, address, and website info')}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/listings"
                className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg group"
              >
                {t('listingsBanner.browseCTA', 'Browse Businesses')}
                <svg className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href="/business/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 text-indigo-600 font-semibold rounded-lg border-2 border-indigo-600 transition-colors"
              >
                {t('listingsBanner.listCTA', 'List Your Business')}
              </Link>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/experiences/San-Luis-Potosi-Ciudad.webp"
                alt="San Luis Potosí Local Businesses"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              {/* Floating Stats Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">100+</div>
                    <div className="text-xs text-gray-600">{t('listingsBanner.stat1', 'Businesses')}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">✓</div>
                    <div className="text-xs text-gray-600">{t('listingsBanner.stat2', 'Verified')}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">24/7</div>
                    <div className="text-xs text-gray-600">{t('listingsBanner.stat3', 'Available')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingsBanner;