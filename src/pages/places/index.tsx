import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { Place } from '@/types';
import { getPlaces, searchPlaces } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlassIcon, MapPinIcon, PhoneIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

interface PlacesPageProps {
  initialPlaces: Place[];
}

export default function PlacesPage({ initialPlaces }: PlacesPageProps) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [error, setError] = useState('');

  // Get unique categories from places
  const categories = ['all', ...new Set(places.map(place => place.category))];

  // Handle search
  const handleSearch = async (term: string, category: string) => {
    setIsLoading(true);
    setError('');

    try {
      const results = await searchPlaces(term, category === 'all' ? undefined : category);
      setPlaces(results);
    } catch (err: any) {
      console.error('Error searching places:', err);
      setError('Failed to search places. Please try again.');
      setPlaces(initialPlaces);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    handleSearch(searchTerm, category);
  };

  // Handle search input change
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    handleSearch(term, selectedCategory);
  };

  // Filter places for display
  const filteredPlaces = places.filter(place => {
    const matchesSearch = !searchTerm ||
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPlaces = filteredPlaces.filter(place => place.featured);
  const regularPlaces = filteredPlaces.filter(place => !place.featured);

  return (
    <>
      <Head>
        <title>{t('places.title', 'Lugares en San Luis Potosí')} | Directory SLP</title>
        <meta
          name="description"
          content={t('places.description', 'Descubre los mejores lugares, restaurantes, cafés, hoteles y atracciones en San Luis Potosí.')}
        />
        <meta name="keywords" content="San Luis Potosí, lugares, restaurantes, cafés, hoteles, turismo, atracciones" />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('places.title', 'Lugares en San Luis Potosí')}
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              {t('places.description', 'Descubre los mejores lugares, restaurantes, cafés, hoteles y atracciones en nuestra hermosa ciudad.')}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('places.searchPlaceholder', 'Buscar lugares...')}
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Category Filter */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('places.filterByCategory', 'Filtrar por categoría')}</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                  }`}
                >
                  {category === 'all'
                    ? t('places.allCategories', 'Todas las categorías')
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-gray-600">{t('places.loading', 'Cargando lugares...')}</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
              {error}
            </div>
          )}

          {/* No Results */}
          {!isLoading && !error && filteredPlaces.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {searchTerm
                  ? t('places.noSearchResults', 'No se encontraron lugares que coincidan con tu búsqueda.')
                  : t('places.noPlaces', 'No hay lugares disponibles en este momento.')}
              </p>
            </div>
          )}

          {/* Featured Places */}
          {featuredPlaces.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                {t('places.featured', 'Lugares Destacados')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Places */}
          {regularPlaces.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                {featuredPlaces.length > 0
                  ? t('places.allPlaces', 'Todos los Lugares')
                  : t('places.places', 'Lugares')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {regularPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Place Card Component
function PlaceCard({ place }: { place: Place }) {
  const { t } = useTranslation('common');

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/places/${place.id}`} className="block">
        <div className="relative h-48">
          {place.imageUrl ? (
            <Image
              src={place.imageUrl}
              alt={place.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">{t('places.noImage', 'Sin imagen')}</span>
            </div>
          )}

          {place.featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {t('places.featured', 'Destacado')}
              </span>
            </div>
          )}

          <div className="absolute top-3 right-3">
            <span className="bg-primary/90 text-white text-xs px-2 py-1 rounded-full">
              {place.category.charAt(0).toUpperCase() + place.category.slice(1)}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/places/${place.id}`} className="block">
          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
            {place.name}
          </h3>
        </Link>

        {place.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {place.description}
          </p>
        )}

        <div className="space-y-2">
          {place.address && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPinIcon className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{place.address}</span>
            </div>
          )}

          {place.phone && (
            <div className="flex items-center text-sm text-gray-500">
              <PhoneIcon className="h-4 w-4 mr-2 flex-shrink-0" />
              <a href={`tel:${place.phone}`} className="hover:text-primary">
                {place.phone}
              </a>
            </div>
          )}

          {place.website && (
            <div className="flex items-center text-sm text-gray-500">
              <GlobeAltIcon className="h-4 w-4 mr-2 flex-shrink-0" />
              <a
                href={place.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary truncate"
              >
                {t('places.visitWebsite', 'Visitar sitio web')}
              </a>
            </div>
          )}
        </div>

        {place.rating && (
          <div className="mt-3 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(place.rating!) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {place.rating.toFixed(1)}/5
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  try {
    const places = await getPlaces();

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        initialPlaces: places,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching places:', error);

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        initialPlaces: [],
      },
      revalidate: 3600,
    };
  }
}