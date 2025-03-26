import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Brand, getAllBrands } from '@/lib/brands';

interface BrandsPageProps {
  brands: Brand[];
}

export default function BrandsPage({ brands }: BrandsPageProps) {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter brands based on search query and category
  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (brand.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                          brand.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories from brands
  const categories = ['all', ...Array.from(new Set(
    brands.map(brand => brand.category)
  ))];

  return (
    <>
      <Head>
        <title>{t('brands.title')} | SLP Tundra</title>
        <meta name="description" content={t('brands.description')} />
      </Head>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/20 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('brands.heading')}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            {t('brands.subheading')}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="w-full md:w-96">
              <input
                type="text"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex overflow-x-auto space-x-2 pb-2 w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBrands.map((brand) => (
              <div key={brand.id} className="bg-white rounded-xl overflow-hidden shadow-elegant hover-lift">
                <div className="relative h-48">
                  <Image
                    src={brand.image_url || '/images/placeholder.jpg'}
                    alt={brand.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{brand.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{brand.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span
                        className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full"
                      >
                        {brand.category}
                      </span>
                    </div>
                    <a 
                      href={`/brands/${brand.id}`}
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredBrands.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No brands found matching your search criteria.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    // Fetch brands from Supabase
    const brands = await getAllBrands();

    return {
      props: {
        brands,
        ...(await serverSideTranslations(locale || 'en', ['common'])),
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Unexpected error in getStaticProps:', error);
    return {
      props: {
        brands: [],
        ...(await serverSideTranslations(locale || 'en', ['common'])),
      },
      revalidate: 3600,
    };
  }
}; 