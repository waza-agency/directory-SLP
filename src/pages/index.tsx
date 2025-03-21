import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Place } from '@/types';
import { fetchPlacesFromSheet } from '@/lib/api/google-sheets';
import PlaceCard from '@/components/PlaceCard';
import PlaceModal from '@/components/PlaceModal';
import { useState } from 'react';
import Image from 'next/image';
import HeroBanner from '@/components/HeroBanner';
import FeaturedPlaces from '@/components/FeaturedPlaces';

interface HomeProps {
  places: Place[];
}

export default function Home({ places }: HomeProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'call' | 'website'>('description');
  
  const featuredPlaces = places.filter(place => place.featured);
  const restaurants = places.filter(place => place.category === 'restaurant');
  const cafes = places.filter(place => place.category === 'cafe');
  const localBrands = places.filter(place => place.category === 'shop' && place.tags?.includes('local'));
  
  // Filter for unique business meeting locations
  const uniqueMeetingPlaces = places.filter(place => 
    (place.category === 'park' || place.category === 'museum' || place.category === 'attraction') &&
    (place.name.includes('Jardín Japonés') || 
     place.name.includes('Presa San José') || 
     place.name.includes('Tangamanga') || 
     place.tags?.includes('unique') || 
     place.tags?.includes('scenic'))
  );

  return (
    <>
      <Head>
        <title>SLP Descubre - Your Expat Guide to San Luis Potosí</title>
        <meta name="description" content="The essential resource for expatriates and newcomers in San Luis Potosí - discover local insights, services, and community" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroBanner />

      {featuredPlaces.length > 0 && (
        <FeaturedPlaces 
          places={featuredPlaces}
          onPlaceSelect={setSelectedPlace}
        />
      )}

      <section className="py-16" id="welcome">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-3 uppercase tracking-wide">YOUR PERSONAL CONCIERGE</p>
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">We've Got Your Back in San Luis Potosí</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Getting set up in a new city can be overwhelming, especially in a foreign country. That's why we've built relationships with all the right people - so you don't have to.
            </p>
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
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    const places = await fetchPlacesFromSheet();
    
    return {
      props: {
        places,
      },
      revalidate: 60 * 60, // Revalidate at most once per hour
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        places: [],
      },
      revalidate: 60 * 5, // Try again more frequently if it failed
    };
  }
}; 