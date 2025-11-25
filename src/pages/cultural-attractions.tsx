import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Place } from '@/types';
import { supabase } from '@/lib/supabase';
import PlaceCard from '@/components/PlaceCard';
import PlaceModal from '@/components/PlaceModal';
import FeaturedPlaces from '@/components/FeaturedPlaces';
import SEO from '@/components/common/SEO';
import { MapPinIcon, ClockIcon, TicketIcon, StarIcon } from '@heroicons/react/24/outline';

// Categories based on actual database data
const categories = [
  {
    name: 'Museos y centros culturales',
    displayName: 'Museums & Cultural Centers',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    description: 'Art galleries, historical museums, science centers, and cultural exhibitions',
    dbCategory: 'Museos y centros culturales'
  },
  {
    name: 'Monumentos históricos y arquitectura',
    displayName: 'Historic Monuments & Architecture',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    description: 'Colonial buildings, historic plazas, and architectural heritage monuments',
    dbCategory: 'Monumentos históricos y arquitectura'
  },
  {
    name: 'churches',
    displayName: 'Churches & Temples',
    icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    description: 'Historic churches, cathedrals, temples, and religious monuments',
    dbCategory: 'churches'
  },
  {
    name: 'Experiencias culturales y recorridos',
    displayName: 'Cultural Experiences & Tours',
    icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z',
    description: 'Cultural centers, folklore groups, tourist trains, and guided cultural experiences',
    dbCategory: 'Experiencias culturales y recorridos'
  },
  {
    name: 'other-cultural',
    displayName: 'Historic Theaters & Cultural Sites',
    icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V5a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 00-2 2',
    description: 'Historic theaters, cultural centers, and other significant cultural sites',
    dbCategory: 'other'
  }
];

// Featured attractions data
const featuredAttractions = [
  {
    id: 'teatro-de-la-paz',
    name: 'Teatro de la Paz',
    description: 'This majestic neoclassical theater, built in 1894, is one of the most beautiful in Mexico. It continues to host world-class performances and cultural events.',
    image: '/images/cultural/teatro-de-la-paz.jpg',
    category: 'Theaters',
    location: 'Centro Histórico, San Luis Potosí',
    address: 'Villerías 705, Centro Histórico',
    hours: 'Tuesday to Sunday, 10:00 AM - 6:00 PM',
    admission: 'Free tours available, performance tickets vary',
    highlights: ['Neoclassical architecture', 'Historic murals', 'Live performances', 'Guided tours']
  },
  {
    id: 'museo-federico-silva',
    name: 'Museo Federico Silva',
    description: 'Housed in a former prison, this contemporary art museum showcases the monumental sculptures and artistic works of renowned Mexican sculptor Federico Silva.',
    image: '/images/cultural/museo-federico-silva.jpg',
    category: 'Museums',
    location: 'Centro Histórico',
    address: 'Álvaro Obregón 80, Centro Histórico',
    hours: 'Tuesday to Sunday, 10:00 AM - 6:00 PM',
    admission: 'Free admission',
    highlights: ['Contemporary sculptures', 'Historic prison architecture', 'Rotating exhibitions', 'Educational workshops']
  },
  {
    id: 'catedral-san-luis-potosi',
    name: 'Catedral de San Luis Potosí',
    description: 'The baroque cathedral dominates the main plaza and represents one of the finest examples of colonial religious architecture in the region.',
    image: '/images/cultural/catedral-san-luis-potosi.jpg',
    category: 'Sacred Sites',
    location: 'Plaza de Armas, Centro Histórico',
    address: 'Plaza de Armas, Centro Histórico',
    hours: 'Daily, 6:00 AM - 8:00 PM',
    admission: 'Free admission',
    highlights: ['Baroque architecture', 'Colonial altars', 'Historic plaza', 'Religious art']
  },
  {
    id: 'centro-artes',
    name: 'Centro de las Artes',
    description: 'A dynamic cultural center that promotes contemporary arts through exhibitions, workshops, performances, and community programs.',
    image: '/images/cultural/centro-artes.jpg',
    category: 'Cultural Centers',
    location: 'Centro Histórico',
    address: 'Callejón de los Cedros 1735, Centro Histórico',
    hours: 'Tuesday to Sunday, 10:00 AM - 8:00 PM',
    admission: 'Free admission to most exhibitions',
    highlights: ['Contemporary art', 'Art workshops', 'Performance space', 'Community programs']
  }
];

interface CulturalAttractionsPageProps {
  places: Place[];
}

const CulturalAttractionsPage: NextPage<CulturalAttractionsPageProps> = ({ places }) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'call' | 'website'>('description');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Filter cultural attractions from places based on actual database categories
  const culturalDbCategories = [
    'Museos y centros culturales',
    'Monumentos históricos y arquitectura',
    'Experiencias culturales y recorridos',
    'churches',
    'other'
  ];

  const culturalKeywords = ['museum', 'teatro', 'theater', 'cultural', 'art', 'gallery', 'heritage', 'historic', 'cathedral', 'church', 'temple', 'chapel', 'monument', 'centro'];

  const culturalPlaces = places?.filter(place => {
    // Include if category is specifically cultural
    if (culturalDbCategories.includes(place.category)) {
      return true;
    }

    // Include if description/name contains cultural keywords
    const searchText = `${place.name} ${place.description || ''}`.toLowerCase();
    return culturalKeywords.some(keyword => searchText.includes(keyword));
  }) || [];

  // Filter featured and non-featured places
  const featuredPlaces = culturalPlaces?.filter(place => place.featured) || [];
  const regularPlaces = culturalPlaces?.filter(place => !place.featured) || [];

  // Categories without counts
  const updatedCategories = categories;

  // Filter places by selected category
  const filteredPlaces = selectedCategory === 'all'
    ? regularPlaces
    : regularPlaces.filter(place => {
        const selectedCat = updatedCategories.find(cat => cat.name === selectedCategory);
        if (!selectedCat) return true;

        if (selectedCat.dbCategory === 'other') {
          // For 'other' category, filter cultural places specifically
          const searchText = `${place.name} ${place.description || ''}`.toLowerCase();
          return place.category === 'other' && culturalKeywords.some(keyword => searchText.includes(keyword));
        }
        return place.category === selectedCat.dbCategory;
      });

  return (
    <>
      <SEO
        title="Cultural Attractions in San Luis Potosí - Museums, Theaters & Heritage Sites"
        description="Discover the rich cultural heritage of San Luis Potosí through its museums, theaters, historical sites, and cultural centers. Explore art galleries, colonial architecture, and sacred sites."
        keywords="San Luis Potosí museums, theaters, cultural attractions, historical sites, art galleries, heritage monuments, colonial architecture, sacred sites, cultural centers"
        ogImage="/images/cultural/cultural-attractions-hero.jpg"
        ogType="website"
      />

      <Head>
        <title>Cultural Attractions in San Luis Potosí - SLP Descubre</title>
        <meta
          name="description"
          content="Explore the rich cultural heritage of San Luis Potosí through its museums, theaters, historical sites, and cultural centers. Discover art, history, and traditions."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0">
          <Image
            src="/images/cultural/cultural-attractions-hero.jpg"
            alt="Cultural attractions in San Luis Potosí"
            fill
            className="object-cover mix-blend-overlay opacity-50"
            unoptimized
            loading="eager"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/cultural/san-luis-potosi-cathedral.jpg';
              target.onerror = null;
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <span className="text-amber-400 text-sm font-medium uppercase tracking-wider mb-4 block">
              CULTURAL HERITAGE OF SAN LUIS POTOSÍ
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Cultural Attractions</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Immerse yourself in centuries of history, art, and tradition through our comprehensive guide to
              San Luis Potosí's most significant cultural sites.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-amber-300">
                <StarIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">UNESCO World Heritage Site</span>
              </div>
              <div className="flex items-center text-amber-300">
                <TicketIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">Free Admission to Most Sites</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              A Journey Through Time and Culture
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              San Luis Potosí's cultural landscape reflects over 400 years of history, from its indigenous
              roots through Spanish colonization to modern artistic expression. As part of the UNESCO World
              Heritage "Camino Real de Tierra Adentro," the city preserves and celebrates this rich heritage
              through its museums, theaters, and historical monuments.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-gray-600">Museums & Galleries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-gray-600">Historic Theaters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600">Heritage Buildings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">400+</div>
                <div className="text-gray-600">Years of History</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost of Living Callout */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Thinking About Moving to SLP?</h3>
                  <p className="text-gray-700 mb-3">
                    Living in San Luis Potosí means enjoying world-class culture at fraction of the cost. Our comprehensive cost of living guide helps you budget for your new lifestyle, including entertainment and cultural activities.
                  </p>
                  <a
                    href="/blog/costo-de-vida-san-luis-potosi-2025"
                    className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold transition-colors"
                  >
                    Explore Real Cost of Living in SLP →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Attractions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Must-Visit Cultural Attractions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Start your cultural journey with these iconic landmarks that define San Luis Potosí's heritage
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredAttractions.map((attraction) => (
              <div key={attraction.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={attraction.image}
                    alt={attraction.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/cultural/cultural-default.jpg';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {attraction.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{attraction.name}</h3>
                  <p className="text-gray-600 mb-4">{attraction.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPinIcon className="w-4 h-4 mr-2" />
                      <span>{attraction.address}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      <span>{attraction.hours}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <TicketIcon className="w-4 h-4 mr-2" />
                      <span>{attraction.admission}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {attraction.highlights.map((highlight) => (
                        <span key={highlight} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/places/${attraction.id}`}
                    className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore by Category</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Discover cultural attractions organized by type to find exactly what interests you most
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updatedCategories.map((category) => (
              <div
                key={category.name}
                className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer ${
                  selectedCategory === category.name.toLowerCase() ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedCategory(category.name.toLowerCase())}
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={category.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{category.displayName}</h3>
                  </div>
                </div>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Attractions from Database */}
      {featuredPlaces.length > 0 && (
        <FeaturedPlaces
          places={featuredPlaces}
          onPlaceSelect={(place) => setSelectedPlace(place)}
        />
      )}

      {/* Filter and List Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">All Cultural Attractions</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name.toLowerCase())}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.name.toLowerCase()
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.displayName} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {filteredPlaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onClick={() => setSelectedPlace(place)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No attractions found</h3>
              <p className="text-gray-600">
                {selectedCategory === 'all'
                  ? 'We are currently updating our cultural attractions database. Please check back soon!'
                  : `No ${selectedCategory} attractions found. Try selecting a different category.`
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Cultural Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cultural Resources</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Additional resources to enhance your cultural experience in San Luis Potosí
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cultural Events</h3>
              <p className="text-gray-600 mb-4">
                Stay updated with ongoing exhibitions, performances, and cultural festivals happening around the city.
              </p>
              <Link href="/events/cultural" className="text-primary font-medium hover:underline">
                View Cultural Events →
              </Link>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cultural Tours</h3>
              <p className="text-gray-600 mb-4">
                Join guided tours to gain deeper insights into the history and significance of cultural sites.
              </p>
              <Link href="/cultural-tours" className="text-primary font-medium hover:underline">
                Book a Tour →
              </Link>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cultural Guides</h3>
              <p className="text-gray-600 mb-4">
                Learn about local customs, traditions, and cultural practices to better understand the city's heritage.
              </p>
              <Link href="/cultural" className="text-primary font-medium hover:underline">
                Read Cultural Guides →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Place Details Modal */}
      {selectedPlace && (
        <PlaceModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ }) => {
  try {
    const { data: places, error } = await supabase
      .from('places')
      .select("*")
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching places:', error);
      return {
        props: {
          places: [],
        },
      };
    }

    // Transform the data to match the Place interface
    const transformedPlaces = places?.map(place => ({
      id: place.id,
      name: place.name,
      category: place.category,
      address: place.address || '',
      city: place.city || null,
      phone: place.phone || null,
      website: place.website || null,
      instagram: place.instagram || null,
      latitude: place.latitude || null,
      longitude: place.longitude || null,
      description: place.description || '',
      imageUrl: place.image_url || null,
      hours: place.hours || null,
      featured: Boolean(place.featured),
      rating: place.rating || null,
      priceLevel: place.price_level || null,
      reviews: [],
      photos: [],
      tags: place.tags || []
    })) || [];

    return {
      props: {
        places: transformedPlaces,
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        places: [],
      },
    };
  }
};

export default CulturalAttractionsPage;
