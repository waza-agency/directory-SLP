import { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Place } from '@/types';
import { supabase } from '@/lib/supabase';
import PlaceCard from '@/components/PlaceCard';
import PlaceModal from '@/components/PlaceModal';
import FeaturedPlaces from '@/components/FeaturedPlaces';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface FamilyActivitiesPageProps {
  places: Place[];
}

const FamilyActivitiesPage: NextPage<FamilyActivitiesPageProps> = ({ places }) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'call' | 'website'>('description');

  const featuredPlaces = places?.filter(place => place.featured) || [];
  const regularPlaces = places?.filter(place => !place.featured) || [];

  return (
    <>
      <Head>
        <title>Family Activities in San Luis Potosí | SLP Guide</title>
        <meta
          name="description"
          content="Discover family-friendly activities, parks, museums, and entertainment venues in San Luis Potosí."
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <section className="relative h-[400px]">
          <Image
            src="/images/practical-categories/family-activities.webp"
            alt="Family Activities"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Family Activities</h1>
              <p className="text-xl max-w-2xl mx-auto">
                Fun activities and entertainment for the whole family. Parks, museums, and more.
              </p>
            </div>
          </div>
        </section>

        {featuredPlaces.length > 0 && (
          <FeaturedPlaces
            places={featuredPlaces}
            onPlaceSelect={(place) => setSelectedPlace(place)}
          />
        )}

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">All Family Activities</h2>
            {regularPlaces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPlaces.map((place) => (
                  <PlaceCard
                    key={place.id}
                    place={place}
                    onClick={() => setSelectedPlace(place)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                No places found in this category yet. Check back soon!
              </p>
            )}
          </div>
        </section>

        {selectedPlace && (
          <PlaceModal
            place={selectedPlace}
            onClose={() => setSelectedPlace(null)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // Query places where category matches OR additional_categories contains the category
  const { data: places, error } = await supabase
    .from('places')
    .select("*")
    .or('category.eq.family-activities,additional_categories.cs.["family-activities"]')
    .order('featured', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching places:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        places: [],
      },
    };
  }

  const mappedPlaces = places?.map(place => ({
    ...place,
    imageUrl: place.image_url
  })) || [];

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
      places: mappedPlaces,
    },
    revalidate: 3600,
  };
};

export default FamilyActivitiesPage;
