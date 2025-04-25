import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import { Place } from '@/types';
import { searchPlaces, getRandomPlaces, getPlaces } from '@/lib/supabase';
import PlaceCard from '@/components/PlaceCard';

export default function PlacesPage() {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const PLACES_PER_PAGE = 16;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Initial load of random places
  useEffect(() => {
    const loadInitialPlaces = async () => {
      try {
        setLoading(true);
        console.log('Loading initial random places');
        const randomPlaces = await getRandomPlaces(PLACES_PER_PAGE);
        setPlaces(randomPlaces);
        console.log(`Loaded ${randomPlaces.length} random places`);
      } catch (err) {
        setError(t('error.fetching_places'));
        console.error('Error loading random places:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!isSearching) {
      loadInitialPlaces();
    }
  }, [t, isSearching]);

  // Handle load more button click
  const handleLoadMore = async () => {
    if (isSearching || loadingMore) return;
    
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      console.log(`Loading more places, page ${nextPage}`);
      
      // Get all places and paginate
      const allPlaces = await getPlaces();
      
      // Load the next set of random places without repeating any
      // We'll get IDs of current places to exclude them
      const currentIds = new Set(places.map(place => place.id));
      
      // Filter out places already shown
      const remainingPlaces = allPlaces.filter(place => !currentIds.has(place.id));
      
      // Shuffle the remaining places
      const shuffled = [...remainingPlaces];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      // Get the next batch
      const nextBatch = shuffled.slice(0, PLACES_PER_PAGE);
      
      // Check if we have more places to load after this batch
      setHasMore(remainingPlaces.length > PLACES_PER_PAGE);
      
      // Add new places to the existing ones
      setPlaces(prevPlaces => [...prevPlaces, ...nextBatch]);
      setPage(nextPage);
      
      console.log(`Added ${nextBatch.length} more random places`);
    } catch (err) {
      setError(t('error.fetching_places'));
      console.error('Error loading more places:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Handle search
  useEffect(() => {
    const performSearch = async () => {
      try {
        // If search is empty, show random places
        if (!searchQuery.trim()) {
          if (isSearching) {
            // Reset to initial state if we were previously searching
            setIsSearching(false);
            const randomPlaces = await getRandomPlaces(PLACES_PER_PAGE);
            setPlaces(randomPlaces);
            setHasMore(true);
            setPage(1);
          }
          return;
        }

        setLoading(true);
        setIsSearching(true);
        
        console.log(`Searching for: "${searchQuery}"`);
        const results = await searchPlaces(searchQuery);
        console.log(`Found ${results.length} search results`);
        
        setPlaces(results);
        setHasMore(false); // No "load more" for search results
      } catch (err) {
        setError(t('error.fetching_places'));
        console.error('Error searching places:', err);
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to prevent too many API calls while typing
    const timeoutId = setTimeout(performSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, t]);

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

        {/* Results Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading && places.length === 0 ? (
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
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {places.map((place) => (
                    <PlaceCard key={place.id} place={place} />
                  ))}
                </div>
                
                {/* Load More Button */}
                {!isSearching && hasMore && (
                  <div className="text-center mt-12">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="px-8 py-3 bg-secondary text-white rounded-full hover:bg-secondary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-secondary-dark focus:ring-opacity-50 disabled:opacity-50"
                    >
                      {loadingMore ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('loading')}
                        </span>
                      ) : (
                        t('load_more_places')
                      )}
                    </button>
                  </div>
                )}
              </>
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