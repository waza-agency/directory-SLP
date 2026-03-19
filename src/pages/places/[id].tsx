import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { getPlaceById, getPlaces } from '@/lib/supabase';
import type { Place } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import SEO from '@/components/common/SEO';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { PlaceDetailSkeleton } from '@/components/common/Skeleton';
import B2BBanner from '@/components/B2BBanner';
import ReviewForm from '@/components/ReviewForm';
import ReviewList from '@/components/ReviewList';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CATEGORY_TO_SCHEMA: Record<string, string> = {
  restaurant: 'Restaurant',
  cafe: 'CafeOrCoffeeShop',
  bar: 'BarOrPub',
  hotel: 'Hotel',
  museum: 'Museum',
  park: 'Park',
  shop: 'Store',
  'live-music': 'MusicVenue',
};

function buildPlaceStructuredData(place: Place) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sanluisway.com';
  const schemaType = CATEGORY_TO_SCHEMA[place.category] || 'LocalBusiness';

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": place.name,
    "url": `${siteUrl}/places/${place.id}`,
    ...(place.description && { "description": place.description }),
    ...(place.imageUrl && { "image": place.imageUrl }),
    ...(place.phone && { "telephone": place.phone }),
    ...(place.website && { "url": place.website }),
    "address": {
      "@type": "PostalAddress",
      ...(place.address && { "streetAddress": place.address }),
      "addressLocality": "San Luis Potosí",
      "addressRegion": "SLP",
      "addressCountry": "MX",
    },
  };

  if (place.latitude && place.longitude) {
    data.geo = {
      "@type": "GeoCoordinates",
      "latitude": place.latitude,
      "longitude": place.longitude,
    };
  }

  if (place.rating && place.review_count) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": place.rating,
      "bestRating": 5,
      "reviewCount": place.review_count,
    };
  }

  if (place.hours) {
    data.openingHours = place.hours;
  }

  return data;
}

export default function PlacePage({ place, error }: { place: Place | null; error: string | null }) {
  const router = useRouter();
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const fetchReviews = useCallback(async () => {
    if (!place) return;
    setReviewsLoading(true);
    try {
      const res = await fetch(`/api/reviews/list?placeId=${place.id}`);
      if (res.ok) setReviews(await res.json());
    } catch { /* non-critical */ }
    finally { setReviewsLoading(false); }
  }, [place]);

  useEffect(() => {
    if (place) fetchReviews();
  }, [place, fetchReviews]);

  if (router.isFallback || !place) {
    return <PlaceDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{error}</h1>
        <Link href="/places" className="text-primary hover:text-primary-dark">
          Back to places
        </Link>
      </div>
    );
  }

  const categoryLabel = place.category
    ? place.category.charAt(0).toUpperCase() + place.category.slice(1).replace('-', ' ')
    : 'Place';

  return (
    <>
      <SEO
        title={`${place.name} — ${categoryLabel} in San Luis Potosí`}
        description={place.description || `Discover ${place.name} in San Luis Potosí. ${place.address ? `Located at ${place.address}.` : ''} Find hours, reviews, and more on San Luis Way.`}
        keywords={`${place.name}, ${place.category || 'place'}, San Luis Potosí, SLP, ${place.tags?.join(', ') || ''}`}
        ogImage={place.imageUrl || '/images/logo.jpeg'}
        structuredData={buildPlaceStructuredData(place)}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Breadcrumbs items={[
            { label: 'Places', href: '/places' },
            { label: categoryLabel, href: `/places?category=${place.category}` },
            { label: place.name, href: `/places/${place.id}` },
          ]} />
        </div>

        {/* Hero Image */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className={`relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden ${!place.imageUrl ? 'bg-[#0a1628]' : ''}`}>
            {place.imageUrl ? (
              <Image
                src={place.imageUrl}
                alt={`${place.name} — ${categoryLabel} in San Luis Potosí`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src="/images/logo.jpeg" alt="San Luis Way" width={200} height={200} className="object-contain opacity-80" />
              </div>
            )}
            {/* Category badge on image */}
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-1.5 rounded-full text-sm font-semibold capitalize">
                {categoryLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Content: 2-column layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title + Rating */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{place.name}</h1>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`h-5 w-5 ${i < (place.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {place.rating ? `${place.rating.toFixed(1)}/5` : 'No rating yet'}
                    </span>
                  </div>
                  {place.tags && place.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {place.tags.map((tag, i) => (
                        <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {place.description && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
                  <p className="text-gray-600 leading-relaxed">{place.description}</p>
                </div>
              )}

              {/* Reviews */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews</h2>
                <ReviewList reviews={reviews} isLoading={reviewsLoading} />
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <ReviewForm placeId={place.id} onReviewSubmitted={fetchReviews} />
                </div>
              </div>

              <B2BBanner variant="inline" />
            </div>

            {/* Sidebar — Contact & Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24 space-y-5">
                <h3 className="text-lg font-semibold text-gray-900">Details</h3>

                {place.address && (
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Address</p>
                      <p className="text-sm text-gray-600">{place.address}</p>
                      <a
                        href={`https://maps.google.com/maps?q=${encodeURIComponent(place.address + ', San Luis Potosí')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline mt-1 inline-block"
                      >
                        View on map
                      </a>
                    </div>
                  </div>
                )}

                {place.phone && (
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <a href={`tel:${place.phone}`} className="text-sm text-primary hover:underline">{place.phone}</a>
                    </div>
                  </div>
                )}

                {place.website && (
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Website</p>
                      <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                        Visit website
                      </a>
                    </div>
                  </div>
                )}

                {place.hours && (
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Hours</p>
                      <p className="text-sm text-gray-600">{place.hours}</p>
                    </div>
                  </div>
                )}

                {place.instagram && (
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Instagram</p>
                      <a href={`https://instagram.com/${place.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                        @{place.instagram.replace('@', '')}
                      </a>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  {place.address && (
                    <a
                      href={`https://maps.google.com/maps?q=${encodeURIComponent(place.address + ', San Luis Potosí')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      Get Directions
                    </a>
                  )}
                  <Link
                    href="/places"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Browse all places
                  </Link>
                </div>
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