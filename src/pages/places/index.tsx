import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { Place, Service } from '@/types';
import { supabase } from '@/lib/supabase';
import SEO from '@/components/common/SEO';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MapPinIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const PLACEHOLDER_IMAGE = '/images/placeholder-place.jpg';

interface PlacesPageProps {
  places: Place[];
  featuredPlaces: Place[];
  services: Service[];
  featuredServices: Service[];
}

const PlaceImage = ({ src, alt, className, sizes }: { src: string; alt: string; className?: string; sizes?: string }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc('/images/cultura-1.jpg');
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={className || 'object-cover'}
      sizes={sizes}
      onError={handleError}
    />
  );
};

const PlacesPage: React.FC<PlacesPageProps> = ({ places, featuredPlaces, services, featuredServices }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'places' | 'services'>('places');

  // Get unique categories based on active tab
  const categories = useMemo(() => {
    const items = activeTab === 'places' ? places : services;
    const cats = Array.from(new Set(items.map(item => item.category)));
    return ['all', ...cats.sort()];
  }, [places, services, activeTab]);

  // Filter items based on active tab
  const filteredPlaces = useMemo(() => {
    return places.filter(place => {
      const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (place.description && place.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [places, searchTerm, selectedCategory]);

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [services, searchTerm, selectedCategory]);

  // Reset category when switching tabs
  const handleTabChange = (tab: 'places' | 'services') => {
    setActiveTab(tab);
    setSelectedCategory('all');
    setSearchTerm('');
  };

  const currentItems = activeTab === 'places' ? filteredPlaces : filteredServices;
  const totalItems = activeTab === 'places' ? places.length : services.length;
  const currentFeatured = activeTab === 'places' ? featuredPlaces : featuredServices;

  return (
    <>
      <SEO
        title={activeTab === 'places'
          ? "Places to Visit in San Luis Potosí | SLP Descubre"
          : "Local Services in San Luis Potosí | SLP Descubre"
        }
        description={activeTab === 'places'
          ? "Discover the best places to visit in San Luis Potosí. From historic sites to modern attractions, find your next adventure."
          : "Find trusted local service providers in San Luis Potosí. From healthcare to home maintenance, connect with reliable professionals."
        }
      />

      <main className="bg-background min-h-screen">
        {/* Hero Section with Background */}
        <section className={`relative h-screen overflow-hidden ${
          activeTab === 'places'
            ? 'bg-gradient-to-br from-orange-900 via-red-900 to-pink-900'
            : 'bg-gradient-to-br from-green-900 via-teal-900 to-blue-900'
        }`}>
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={activeTab === 'places'
                ? "/images/cultural/san-luis-potosi-cathedral.jpg"
                : "/images/cultural/museo-federico-silva.jpg"
              }
              alt="San Luis Potosí"
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 ${
            activeTab === 'places'
              ? 'bg-gradient-to-r from-orange-900/70 via-red-900/60 to-pink-900/70'
              : 'bg-gradient-to-r from-green-900/70 via-teal-900/60 to-blue-900/70'
          }`}></div>

          {/* Content */}
          <div className="relative container mx-auto px-4 h-full flex items-center pt-20">
            <div className="max-w-4xl">
              {/* Toggle Switch */}
              <div className="mb-8">
                <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
                  <button
                    onClick={() => handleTabChange('places')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      activeTab === 'places'
                        ? 'bg-white text-gray-900 shadow-lg'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <MapPinIcon className="w-5 h-5" />
                    Places
                  </button>
                  <button
                    onClick={() => handleTabChange('services')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      activeTab === 'services'
                        ? 'bg-white text-gray-900 shadow-lg'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <BuildingOfficeIcon className="w-5 h-5" />
                    Services
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <span className={`text-sm font-medium uppercase tracking-wider ${
                  activeTab === 'places' ? 'text-orange-200' : 'text-green-200'
                }`}>
                  {activeTab === 'places' ? 'Discover Amazing Places' : 'Trusted Local Providers'}
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {activeTab === 'places'
                  ? "Explore San Luis Potosí's Hidden Gems"
                  : "Your Personal Guide to Local Services"
                }
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                {activeTab === 'places'
                  ? "From historic landmarks to modern attractions, discover the places that make San Luis Potosí truly special."
                  : "We connect you with reliable local service providers who have a good reputation in our community."
                }
              </p>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-2xl shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {activeTab === 'places' ? "What You'll Discover" : "How We Help You"}
                </h3>
                <ul className={`space-y-3 ${activeTab === 'places' ? 'text-orange-100' : 'text-green-100'}`}>
                  {activeTab === 'places' ? (
                    <>
                      <li className="flex items-start">
                        <svg className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${activeTab === 'places' ? 'text-orange-300' : 'text-green-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>Historic landmarks and colonial architecture</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-300 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>Cultural centers and museums</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-300 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span>Parks, restaurants, and outdoor spaces</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Vetted providers trusted by our community</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Healthcare, legal, home services & more</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Direct contact with service providers</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* Featured Section */}
        {currentFeatured.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <span className="text-primary text-sm font-medium uppercase tracking-wider">
                  {activeTab === 'places' ? 'Must-Visit Destinations' : 'Trusted Local Providers'}
                </span>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4 mt-2">
                  {activeTab === 'places' ? 'Featured Places' : 'Featured Services'}
                </h2>
                <p className="text-lg text-gray-600">
                  {activeTab === 'places'
                    ? 'Our top recommendations for experiencing the best of San Luis Potosí'
                    : 'Vetted and recommended local service providers we trust'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentFeatured.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl p-6 shadow-elegant hover:shadow-lg transition-shadow">
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                      <PlaceImage
                        src={item.image_url || '/images/cultura-1.jpg'}
                        alt={item.name}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-xl text-gray-900">{item.name}</h3>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {item.category}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                    )}
                    <div className="space-y-2 text-sm text-gray-600">
                      {item.phone && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a href={`tel:${item.phone}`} className="hover:text-primary">{item.phone}</a>
                        </div>
                      )}
                      {item.website && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          <a href={item.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            Visit Website
                          </a>
                        </div>
                      )}
                      {(item.address || ('location' in item && item.location)) && (
                        <div className="flex items-start">
                          <svg className="w-4 h-4 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-xs">{item.address || ('location' in item ? item.location : '')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Items Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Secondary Toggle for easy switching */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex bg-white rounded-full p-1 shadow-md border border-gray-200">
                  <button
                    onClick={() => handleTabChange('places')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                      activeTab === 'places'
                        ? 'bg-primary text-white shadow'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <MapPinIcon className="w-4 h-4" />
                    Places ({places.length})
                  </button>
                  <button
                    onClick={() => handleTabChange('services')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                      activeTab === 'services'
                        ? 'bg-primary text-white shadow'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <BuildingOfficeIcon className="w-4 h-4" />
                    Services ({services.length})
                  </button>
                </div>
              </div>

              <div className="text-center mb-12">
                <span className="text-primary text-sm font-medium uppercase tracking-wider">
                  Complete Directory
                </span>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4 mt-2">
                  {activeTab === 'places'
                    ? 'All Places in San Luis Potosí'
                    : 'All Services in San Luis Potosí'
                  }
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  {activeTab === 'places'
                    ? 'Browse our complete directory of places to visit, eat, shop, and explore'
                    : 'Find trusted local businesses and service providers in San Luis Potosí'
                  }
                </p>

                {/* Search and Filter Controls */}
                <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={`Search ${activeTab}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results count */}
              <div className="mb-6">
                <p className="text-gray-600 text-center">
                  Showing {currentItems.length} of {totalItems} {activeTab}
                </p>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden bg-gray-100">
                      <PlaceImage
                        src={item.image_url || '/images/cultura-1.jpg'}
                        alt={item.name}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg text-gray-900 flex-1">{item.name}</h3>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs ml-2 capitalize">
                        {item.category}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">{item.description}</p>
                    )}
                    <div className="space-y-2 text-sm text-gray-600">
                      {item.phone && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a href={`tel:${item.phone}`} className="hover:text-primary">{item.phone}</a>
                        </div>
                      )}
                      {item.website && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          <a href={item.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            Website
                          </a>
                        </div>
                      )}
                      {(item.address || ('location' in item && item.location)) && (
                        <div className="flex items-start">
                          <svg className="w-4 h-4 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-xs">{item.address || ('location' in item ? item.location : '')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {currentItems.length === 0 && (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No {activeTab} found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    // Fetch all places
    const { data: places, error: placesError } = await supabase
      .from('places')
      .select("*")
      .order('created_at', { ascending: false });

    if (placesError) {
      console.error('Error fetching places:', placesError);
    }

    // Fetch featured places
    const { data: featuredPlaces, error: featuredPlacesError } = await supabase
      .from('places')
      .select("*")
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(6);

    if (featuredPlacesError) {
      console.error('Error fetching featured places:', featuredPlacesError);
    }

    // Fetch all services
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select("*")
      .order('created_at', { ascending: false });

    if (servicesError) {
      console.error('Error fetching services:', servicesError);
    }

    // Fetch featured services
    const { data: featuredServices, error: featuredServicesError } = await supabase
      .from('services')
      .select("*")
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(6);

    if (featuredServicesError) {
      console.error('Error fetching featured services:', featuredServicesError);
    }

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        places: places || [],
        featuredPlaces: featuredPlaces || [],
        services: services || [],
        featuredServices: featuredServices || [],
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        places: [],
        featuredPlaces: [],
        services: [],
        featuredServices: [],
      },
    };
  }
};

export default PlacesPage;
