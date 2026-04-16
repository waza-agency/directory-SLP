import { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import { Place } from '@/types';
import { supabase } from '@/lib/supabase';
import PlaceCard from '@/components/PlaceCard';
import PlaceModal from '@/components/PlaceModal';
import FeaturedPlaces from '@/components/FeaturedPlaces';
import SEO from '@/components/common/SEO';
import AdUnit from '@/components/common/AdUnit';

interface RestaurantsPageProps {
  places: Place[];
}

const RestaurantsPage: NextPage<RestaurantsPageProps> = ({ places }) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'call' | 'website'>('description');

  // Filter featured and non-featured modern restaurants
  const featuredPlaces = places?.filter(place => place.featured) || [];
  const regularPlaces = places?.filter(place => !place.featured) || [];

  const restaurantsListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Restaurants in San Luis Potosí',
    description:
      'Curated list of restaurants and dining experiences in San Luis Potosí, Mexico.',
    numberOfItems: places.length,
    itemListElement: places.slice(0, 20).map((place, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Restaurant',
        name: place.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'San Luis Potosí',
          addressRegion: 'SLP',
          addressCountry: 'MX',
        },
        ...(place.imageUrl ? { image: place.imageUrl } : {}),
      },
    })),
  };

  return (
    <>
      <SEO
        title="Best Restaurants in San Luis Potosí: Where to Eat in SLP"
        description="Discover the best restaurants in San Luis Potosí — from authentic Potosino cuisine to modern international dining. Curated picks with reviews, photos, and locations across Centro, Lomas, and more."
        keywords="restaurants san luis potosi, best restaurants slp, where to eat san luis potosi, restaurantes san luis potosi, dining san luis potosi, potosino food, expat restaurants mexico"
        structuredData={restaurantsListSchema}
      />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Explore Our Cuisine
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              All Restaurants
            </h1>
            <p className="text-lg text-gray-600">
              Discover the best culinary scene of San Luis Potosí through our curated selection
              of restaurants. From innovative fusion cuisine to contemporary dining experiences,
              discover the city's most exciting culinary destinations.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Places Section */}
      {featuredPlaces.length > 0 && (
        <FeaturedPlaces
          places={featuredPlaces}
          onPlaceSelect={(place) => setSelectedPlace(place)}
        />
      )}

      {/* AdSense Banner */}
      <section className="py-4 px-4">
        <div className="container mx-auto">
          <AdUnit placement="top-banner" />
        </div>
      </section>

      {/* All Modern Restaurants */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                onClick={() => setSelectedPlace(place)}
              />
            ))}
          </div>

          <div className="mt-12">
            <AdUnit placement="matched" />
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
  // Fetch modern dining places from Supabase
  const { data: places, error } = await supabase
    .from('places')
    .select("*")
    .eq('category', 'restaurant')
    .order('featured', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching places:', error);
    return {
      props: {
        places: [],
      },
    };
  }

  // Map the data to correct field names
  const mappedPlaces = places?.map(place => ({
    ...place,
    imageUrl: place.image_url // Map image_url to imageUrl
  })) || [];

  // Log the places data to debug image URLs
  console.log('Fetched places:', JSON.stringify(mappedPlaces, null, 2));

  // Log each place's image URL
  mappedPlaces?.forEach(place => {
    console.log(`Place: ${place.name}`);
    console.log(`Image URL: ${place.imageUrl}`);
    console.log('---');
  });

  return {
    props: {
      places: mappedPlaces,
    },
  };
};

export default RestaurantsPage;