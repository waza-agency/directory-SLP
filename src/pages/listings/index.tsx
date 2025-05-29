import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

// Business Listing type definition
type BusinessListing = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  price?: string;
  images?: any;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  city?: string;
  hours?: any;
  services?: any;
  status: string;
  created_at: string;
  business_profiles?: {
    business_name: string;
    phone?: string;
    website?: string;
    instagram?: string;
    facebook?: string;
    address?: string;
    city?: string;
  };
};

export default function ListingsPage() {
  const { t } = useTranslation('common');
  const [listings, setListings] = useState<BusinessListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Fetch listings on component mount
  useEffect(() => {
    fetchListings();
  }, []);

  // Function to fetch business listings from subscribed businesses
  const fetchListings = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Query business listings from subscribed businesses
      // First, let's try a simpler query to debug the issue
      const { data, error } = await supabase
        .from('business_listings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setListings(data || []);
    } catch (err: any) {
      console.error('Error fetching business listings:', err);
      setError('Failed to load business listings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter listings by category
  const filteredListings = activeCategory === 'all'
    ? listings
    : listings.filter(listing => listing.category === activeCategory);

  // Get unique categories from listings
  const categories = ['all', ...new Set(listings.map(listing => listing.category))];

  return (
    <>
      <Head>
        <title>{t('listings.title', 'Business Listings')} | Directory SLP</title>
        <meta name="description" content={t('listings.description', 'Browse and discover businesses in San Luis Potosí.')} />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-primary text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {t('listings.title', 'Negocios Locales')} - San Luis Potosí
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              {t('listings.description', 'Descubre productos y servicios de negocios locales. Contacta directamente para más información.')}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Category Filter */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t('listings.filterBy', 'Filter by Category')}</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category === 'all'
                    ? t('listings.allCategories', 'All Categories')
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-gray-600">{t('listings.loading', 'Loading listings...')}</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
              {error}
            </div>
          )}

          {/* No Listings State */}
          {!isLoading && !error && filteredListings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {activeCategory === 'all'
                  ? t('listings.noListings', 'No listings available at the moment. Please check back later.')
                  : t('listings.noCategoryListings', 'No listings available in this category.')}
              </p>
            </div>
          )}

                    {/* Listings Grid */}
          {!isLoading && !error && filteredListings.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredListings.map((listing) => {
                const imageUrl = listing.images && listing.images.length > 0
                  ? (typeof listing.images[0] === 'string' ? listing.images[0] : listing.images[0]?.url)
                  : null;

                return (
                  <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <Link href={`/listings/${listing.id}`} className="block">
                      <div className="relative h-48">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={listing.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <span className="text-gray-400">{t('listings.noImageAvailable', 'Sin imagen')}</span>
                          </div>
                        )}

                        {listing.category && (
                          <span className="absolute top-2 right-2 bg-primary/80 text-white text-xs px-2 py-1 rounded">
                            {listing.category}
                          </span>
                        )}

                        {listing.type && (
                          <span className="absolute top-2 left-2 bg-blue-500/80 text-white text-xs px-2 py-1 rounded">
                            {listing.type === 'service' ? t('listings.service', 'Servicio') : t('listings.product', 'Producto')}
                          </span>
                        )}
                      </div>
                    </Link>

                    <div className="p-4">
                      <Link href={`/listings/${listing.id}`} className="block">
                        <h3 className="text-lg font-semibold mb-1 hover:text-primary">{listing.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{listing.business_profiles?.business_name}</p>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{listing.description}</p>
                      </Link>

                      <div className="space-y-2">
                        {listing.price && (
                          <p className="text-lg font-semibold text-green-600">{listing.price}</p>
                        )}

                        <div className="flex flex-col space-y-2">
                          <Link
                            href={`/contact/${listing.id}`}
                            className="bg-primary text-white px-4 py-2 rounded-md text-center text-sm hover:bg-primary/90 transition-colors"
                          >
                            {t('listings.viewDetailsAndContact', 'Ver Detalles y Contactar')}
                          </Link>

                          {(listing.phone || listing.business_profiles?.phone) && (
                            <a
                              href={`tel:${listing.phone || listing.business_profiles?.phone}`}
                              className="bg-green-600 text-white px-4 py-2 rounded-md text-center text-sm hover:bg-green-700 transition-colors"
                            >
                              📞 {t('listings.callBusiness', 'Llamar')}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    },
  };
}