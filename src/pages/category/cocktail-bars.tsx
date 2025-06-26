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

// Categories specific to cocktail bars
const categories = [
  {
    name: 'Craft Cocktail Bars',
    icon: 'M12 5v14M5 5h14M5 19h14M8 9h.01M16 9h.01M8 13h.01M16 13h.01M12 9v4',
  },
  {
    name: 'Rooftop Bars',
    icon: 'M3 21h18M3 18h18M3 15h18M19 9V3H5v6m7-3v6m0 0l-3-3m3 3l3-3',
  },
  {
    name: 'Speakeasy Bars',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  },
  {
    name: 'Wine Bars',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  }
];

interface CocktailBarsPageProps {
  places: Place[];
}

const CocktailBarsPage: NextPage<CocktailBarsPageProps> = ({ places }) => {
  const { t } = useTranslation('common');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'call' | 'website'>('description');

  // Filter featured and non-featured cocktail bars
  const featuredPlaces = places?.filter(place => place.featured) || [];
  const regularPlaces = places?.filter(place => !place.featured) || [];



  return (
    <>
      <Head>
        <title>Cocktail Bars in San Luis Potosí - SLP Descubre</title>
        <meta
          name="description"
          content="Discover the best cocktail bars in San Luis Potosí. From craft cocktails to rooftop bars, find the perfect spot for sophisticated drinks."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              CRAFT COCKTAILS & AMBIANCE
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              Cocktail Bars
            </h1>
            <p className="text-lg text-gray-600">
              Experience the sophisticated nightlife of San Luis Potosí. From intimate speakeasies to
              stunning rooftop bars, discover the city's finest cocktail destinations.
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

      {/* All Cocktail Bars */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Cocktail Bars</h2>
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

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  // Fetch cocktail bars from Supabase
  const { data: places, error } = await supabase
    .from('places')
    .select('*')
    .eq('category', 'cocktail-bars')
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

export default CocktailBarsPage;