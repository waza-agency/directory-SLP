import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import { Place } from '@/types';
import { searchPlaces } from '@/lib/supabase';
import PlaceCard from '@/components/PlaceCard';

// Place categories for filtering
const categories = [
  { id: 'all', name: 'All Places' },
  { id: 'restaurant', name: 'Restaurants' },
  { id: 'cafe', name: 'Cafes' },
  { id: 'bar', name: 'Bars' },
  { id: 'hotel', name: 'Hotels' },
  { id: 'museum', name: 'Museums' },
  { id: 'park', name: 'Parks' },
  { id: 'shop', name: 'Shops' },
  { id: 'service', name: 'Services' },
  { id: 'live-music', name: 'Live Music' },
  { id: 'other', name: 'Other' }
];

export default function PlacesPage() {
  const { t } = useTranslation('common');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const results = await searchPlaces(searchQuery, activeCategory === 'all' ? undefined : activeCategory);
        setPlaces(results);
      } catch (err) {
        setError(t('error.fetching_places'));
        console.error('Error fetching places:', err);
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to prevent too many API calls while typing
    const timeoutId = setTimeout(fetchPlaces, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, activeCategory, t]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search will be triggered by the useEffect when searchQuery changes
  };

  return (
    <>
      <Head>
        <title>{t('site_title')}</title>
        <meta name="description" content={t('site_description')} />
        <meta name="keywords" content="San Luis Potosí places, attractions, restaurants, shopping, parks, museums" />
        <meta property="og:title" content={t('site_title')} />
        <meta property="og:description" content={t('site_description')} />
        <meta property="og:image" content="/images/attraction.jpg" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Section with Search */}
        <section className="relative h-[50vh] min-h-[400px] bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/images/attraction.jpg"
              alt="San Luis Potosí cityscape"
              fill
              className="object-cover opacity-50"
              priority
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
              {t('hero.explorePlaces')}
            </h1>
            <p className="text-white text-lg mb-8 text-center max-w-2xl">
              {t('hero.description')}
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="w-full max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('search_placeholder')}
                  className="w-full px-6 py-4 rounded-full shadow-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-secondary text-white px-6 py-2 rounded-full hover:bg-secondary-dark transition-colors"
                >
                  {t('search_button')}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-0 bg-white shadow-md z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex overflow-x-auto space-x-4 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                    activeCategory === category.id
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t(`categories.${category.id}`)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
                <p className="mt-4 text-gray-600">{t('loading')}</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
              </div>
            ) : places.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">{t('no_places_found')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {places.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}; 