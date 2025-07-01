import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { Place } from '@/types';
import { supabase } from '@/lib/supabase';
import PlaceCard from '@/components/PlaceCard';
import PlaceModal from '@/components/PlaceModal';
import FeaturedPlaces from '@/components/FeaturedPlaces';

interface ModernDiningPageProps {
  places: Place[];
}

const ModernDiningPage: NextPage<ModernDiningPageProps> = ({ places }) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'call' | 'website'>('description');

  // Filter featured and non-featured modern restaurants
  const featuredPlaces = places?.filter(place => place.featured) || [];
  const regularPlaces = places?.filter(place => !place.featured) || [];

  return (
    <>
      <Head>
        <title>Modern Dining - SLP Descubre</title>
        <meta
          name="description"
          content="Discover contemporary restaurants and modern dining experiences in San Luis Potosí"
        />
      </Head>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              CONTEMPORARY CUISINE
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              Modern Dining
            </h1>
            <p className="text-lg text-gray-600">
              Experience the cutting-edge culinary scene of San Luis Potosí through our curated selection
              of modern restaurants. From innovative fusion cuisine to contemporary dining experiences,
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

      {/* All Modern Restaurants */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Modern Restaurants</h2>
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
    .select('*')
    .eq('category', 'modern-dining')
    .order('featured', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching places:', error);
    return {
      props: {
        places: [],
      },
      revalidate: 60, // Revalidate every minute
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
    revalidate: 60, // Revalidate every minute
  };
};

export default ModernDiningPage;