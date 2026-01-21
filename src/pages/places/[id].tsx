import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPlaceById, getPlaces } from '@/lib/supabase';
import type { Place } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import SEO from '@/components/common/SEO';
import B2BBanner from '@/components/B2BBanner';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function PlacePage({ place, error }: { place: Place | null; error: string | null }) {
  const router = useRouter();

  // Add debug logging
  useEffect(() => {
    console.log('PlacePage rendered with:', { place, error, path: router.asPath });

    if (error) {
      console.error('Place page error:', error);
    }
    if (place) {
      console.log('Place data:', place);
    }
  }, [place, error, router.asPath]);

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{error}</h1>
        <Link
          href="/places"
          className="text-primary hover:text-primary-dark"
        >
          Regresar a lugares
        </Link>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${place.name} | San Luis Potosí`}
        description={place.description || `Visit ${place.name} in San Luis Potosí.`}
        ogImage={place.imageUrl || '/images/placeholder.jpg'}
      />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <Image
              src={place.imageUrl || '/images/placeholder.jpg'}
              alt={place.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{place.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < (place.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {place.rating ? `${place.rating.toFixed(1)}/5` : 'Sin calificación'}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Descripción</h2>
              <p className="text-gray-600">{place.description}</p>
            </div>

            {place.address && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Dirección</h2>
                <p className="text-gray-600">{place.address}</p>
              </div>
            )}

            {place.website && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Sitio Web</h2>
                <a
                  href={place.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark"
                >
                  Visitar sitio web
                </a>
              </div>
            )}

            {place.phone && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Teléfono</h2>
                <a href={`tel:${place.phone}`} className="text-primary hover:text-primary-dark">
                  {place.phone}
                </a>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <Link
                href="/places"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Regresar a lugares
              </Link>
            </div>

            <div className="mt-6">
              <B2BBanner variant="inline" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  try {
    // Get all places
    const places = await getPlaces();

    // Get the paths we want to pre-render based on places
    const paths = places.map((place) => ({
      params: { id: place.id }
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {
      paths,
      fallback: 'blocking', // Show a loading state for new paths
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params, locale }: { params: { id: string }; locale?: string }) {
  console.log('getStaticProps called with:', { params });

  if (!params?.id) {
    console.error('No ID provided in params');
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        place: null,
        error: 'Missing place ID'
      },
    };
  }

  try {
    console.log('Fetching place with ID:', params.id);
    const place = await getPlaceById(params.id);
    console.log('Place fetch result type:', typeof place);

    if (!place) {
      console.error('Place not found:', params.id);
      return {
        notFound: true,
      };
    }

    // Make sure the place object is serializable
    const serializablePlace = JSON.parse(JSON.stringify(place));
    console.log('Serialized place:', serializablePlace);

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        place: serializablePlace,
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);

    // Add more specific error information
    let errorMessage = 'Error fetching place details';
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
      console.error('Error stack:', error.stack);
    }

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        place: null,
        error: errorMessage
      },
    };
  }
}