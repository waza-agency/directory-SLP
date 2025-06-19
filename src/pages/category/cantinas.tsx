import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useState } from 'react';
import { Place } from '@/types';
import { supabase } from '@/lib/supabase';
import PlaceCard from '@/components/PlaceCard';
import PlaceModal from '@/components/PlaceModal';
import FeaturedPlaces from '@/components/FeaturedPlaces';

// Categories specific to traditional cantinas
const categories = [
  {
    name: 'Historic Cantinas',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    name: 'Live Music Cantinas',
    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
  },
  {
    name: 'Traditional Food Cantinas',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    name: 'Local Favorites',
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  }
];

interface CantinasPageProps {
  places: Place[];
}

const CantinasPage: NextPage<CantinasPageProps> = ({ places }) => {
  const { t } = useTranslation('common');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'call' | 'website'>('description');

  // Filter featured and non-featured cantinas
  const featuredPlaces = places?.filter(place => place.featured) || [];
  const regularPlaces = places?.filter(place => !place.featured) || [];



  return (
    <>
      <Head>
        <title>Traditional Cantinas in San Luis Potosí - SLP Descubre</title>
        <meta
          name="description"
          content="Experience the authentic Mexican cantina culture in San Luis Potosí. Discover historic cantinas, live music venues, and traditional food spots."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              AUTHENTIC MEXICAN CULTURE
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              Traditional Cantinas
            </h1>
            <p className="text-lg text-gray-600">
              Immerse yourself in the rich cultural heritage of San Luis Potosí's traditional cantinas.
              From historic venues to local favorites, experience the authentic Mexican cantina atmosphere.
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

      {/* All Cantinas */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Cantinas</h2>
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // Fetch cantinas from Supabase
  const { data: places, error } = await supabase
    .from('places')
    .select('*')
    .eq('category', 'cantinas')
    .order('featured', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching places:', error);
    return {
      props: {
        places: [],
        ...(await serverSideTranslations(locale || 'en', ['common'])),
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
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
    revalidate: 60, // Revalidate every minute
  };
};

export default CantinasPage;