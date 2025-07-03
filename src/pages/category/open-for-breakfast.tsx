import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Place } from '@/types';
import { supabase } from '@/lib/supabase';
import PlaceCard from '@/components/PlaceCard';
import PlaceModal from '@/components/PlaceModal';

interface OpenForBreakfastPageProps {
  places: Place[];
}

export const getStaticProps: GetStaticProps = async ({ }) => {
  // Query places that are open for breakfast
  const { data: places, error } = await supabase
    .from('places')
    .select("*")
    .like('tags', '%breakfast%')
    .order('name');

  if (error) {
    console.error('Error fetching breakfast places:', error);
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
  console.log('Fetched breakfast places:', JSON.stringify(mappedPlaces, null, 2));

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

const OpenForBreakfastPage: React.FC<OpenForBreakfastPageProps> = ({ places }) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'call' | 'website'>('description');

  return (
    <>
      <Head>
        <title>Open For Breakfast - SLP Directory</title>
        <meta
          name="description"
          content="Discover the best breakfast spots in San Luis Potosí, from traditional Mexican breakfast to international options and coffee houses."
        />
      </Head>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Open For Breakfast</h1>
          <p className="text-xl text-gray-600">
            Start your day right with these breakfast spots in San Luis Potosí. From traditional Mexican morning fare to international options and cozy coffee houses.
          </p>
        </div>

        {places.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                onClick={() => setSelectedPlace(place)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No breakfast places found. Check back soon as we add more locations!</p>
          </div>
        )}

        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
            <h2 className="font-bold text-xl mb-3 text-gray-900">About Breakfast in San Luis Potosí</h2>
            <p className="text-gray-700 mb-4">
              San Luis Potosí offers a variety of breakfast options from traditional Mexican breakfasts like chilaquiles and huevos rancheros to international fare.
              Many places open early to cater to locals and visitors looking for a great start to their day.
            </p>
            <p className="text-gray-700">
              The breakfast culture in San Luis Potosí is vibrant, with many cafes and restaurants specializing in morning meals. Whether you're looking for a quick coffee and pastry or a full breakfast experience, you'll find many options throughout the city.
            </p>
          </div>
        </div>
      </div>

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

export default OpenForBreakfastPage;