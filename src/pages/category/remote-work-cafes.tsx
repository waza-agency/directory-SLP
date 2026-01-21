import { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Place } from '@/types';
import { supabase } from '@/lib/supabase';
import PlaceCard from '@/components/PlaceCard';
import PlaceModal from '@/components/PlaceModal';
import FeaturedPlaces from '@/components/FeaturedPlaces';
import B2BBanner from '@/components/B2BBanner';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface RemoteWorkCafesPageProps {
  places: Place[];
}

const RemoteWorkCafesPage: NextPage<RemoteWorkCafesPageProps> = ({ places }) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'call' | 'website'>('description');

  const featuredPlaces = places?.filter(place => place.featured) || [];
  const regularPlaces = places?.filter(place => !place.featured) || [];

  return (
    <>
      <Head>
        <title>Remote Work Cafes in San Luis Potosí | SLP Guide</title>
        <meta
          name="description"
          content="Find the best cafes and workspaces for digital nomads and remote workers in San Luis Potosí."
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-[400px]">
          <Image
            src="/images/practical-categories/remote-work-cafes.avif"
            alt="Remote Work Cafes"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Remote Work Cafes
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                Cafes and coworking spaces with reliable Wi-Fi, power outlets, and a work-friendly atmosphere for digital nomads.
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

        {/* All Places */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">All Remote Work Spaces</h2>
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

        {/* B2B Banner */}
        <B2BBanner />

        {/* Place Details Modal */}
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
  const { data: places, error } = await supabase
    .from('places')
    .select("*")
    .eq('category', 'remote-work-cafes')
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

export default RemoteWorkCafesPage;
