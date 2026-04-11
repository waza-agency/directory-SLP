import { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import { Place } from '@/types';
import { supabase } from '@/lib/supabase';
import PlaceCard from '@/components/PlaceCard';
import PlaceModal from '@/components/PlaceModal';
import FeaturedPlaces from '@/components/FeaturedPlaces';
import SEO from '@/components/common/SEO';
import GuideCTA from '@/components/common/GuideCTA';

interface TraditionalCuisinePageProps {
  places: Place[];
}

const TraditionalCuisinePage: NextPage<TraditionalCuisinePageProps> = ({ places }) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'call' | 'website'>('description');

  // Filter featured and non-featured traditional restaurants
  const featuredPlaces = places?.filter(place => place.featured) || [];
  const regularPlaces = places?.filter(place => !place.featured) || [];

  const traditionalCuisineSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Traditional Potosino Restaurants in San Luis Potosí',
    description:
      'Authentic restaurants serving traditional Potosino dishes: enchiladas potosinas, asado de boda, gorditas, and regional specialties.',
    numberOfItems: places.length,
    itemListElement: places.slice(0, 20).map((place, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Restaurant',
        name: place.name,
        servesCuisine: 'Potosino, Mexican',
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
        title="Traditional Potosino Cuisine: Authentic Restaurants in San Luis Potosí"
        description="Taste the authentic flavors of San Luis Potosí. From enchiladas potosinas and asado de boda to gorditas and tacos potosinos, these traditional restaurants serve the real thing."
        keywords="comida potosina, enchiladas potosinas, asado de boda, traditional restaurants san luis potosi, potosino cuisine, mexican food slp, authentic mexican food"
        structuredData={traditionalCuisineSchema}
      />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              AUTHENTIC FLAVORS
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              Traditional Cuisine
            </h1>
            <p className="text-lg text-gray-600">
              Experience the authentic flavors of San Luis Potosí through our carefully curated selection
              of traditional restaurants. From enchiladas potosinas to regional specialties, discover the
              rich culinary heritage of our city.
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

      {/* All Traditional Restaurants */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Traditional Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                onClick={() => setSelectedPlace(place)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* GuideCTA */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <GuideCTA relatedLinks={[
            { href: '/breakfast-spots-san-luis-potosi', label: 'Best Breakfast Spots', labelEs: 'Mejores Desayunos' },
            { href: '/food-festivals-san-luis-potosi', label: 'Food Festivals', labelEs: 'Festivales Gastronómicos' },
            { href: '/restaurants', label: 'All Restaurants', labelEs: 'Restaurantes' },
            { href: '/farmers-markets-san-luis-potosi', label: 'Farmers Markets', labelEs: 'Tianguis' },
          ]} />
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
  // Fetch traditional cuisine places from Supabase
  const { data: places, error } = await supabase
    .from('places')
    .select("*")
    .eq('category', 'traditional-cuisine')
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

export default TraditionalCuisinePage;