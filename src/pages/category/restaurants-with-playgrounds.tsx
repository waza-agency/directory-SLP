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

interface RestaurantsWithPlaygroundsPageProps {
  places: Place[];
}

const RestaurantsWithPlaygroundsPage: NextPage<RestaurantsWithPlaygroundsPageProps> = ({ places }) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'call' | 'website'>('description');

  const featuredPlaces = places?.filter(place => place.featured) || [];
  const regularPlaces = places?.filter(place => !place.featured) || [];

  return (
    <>
      <Head>
        <title>Restaurants with Playgrounds in San Luis Potosí | SLP Guide</title>
        <meta
          name="description"
          content="Discover family-friendly restaurants with playgrounds in San Luis Potosí. Enjoy your meal while your children play in safe, dedicated areas."
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <section className="relative h-[400px]">
          <Image
            src="/images/practical-categories/restaurants-with-playgrounds.png"
            alt="Restaurants with Playgrounds"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Restaurants with Playgrounds
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                Enjoy a relaxed meal while your children play in dedicated, safe areas perfect for family outings.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">All Family-Friendly Restaurants</h2>
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

        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Tips for Dining with Kids</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Times to Visit</h3>
                <p className="text-gray-600">
                  Visit during off-peak hours for a more relaxed experience and better playground access.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Safety First</h3>
                <p className="text-gray-600">
                  Always supervise children in playground areas and follow posted safety guidelines.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Value for Money</h3>
                <p className="text-gray-600">
                  Look for special family deals and kids-eat-free promotions during weekdays.
                </p>
              </div>
            </div>
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
    .or('category.eq.restaurants-with-playgrounds,additional_categories.cs.["restaurants-with-playgrounds"]')
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

export default RestaurantsWithPlaygroundsPage;