import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { ArrowLeftIcon, MapPinIcon, PhoneIcon, ClockIcon, GlobeAltIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { formatMXNPrice } from '@/utils/currency';

// Business Listing type definition
type BusinessListing = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  address?: string;
  city?: string;
  phone?: string;
  website?: string;
  email?: string;
  hours?: {[key: string]: {open: string, close: string}};
  images?: string[];
  services?: string[];
  price?: string;
  status: string;
  created_at: string;
  updated_at: string;
  business_id: string;
  business_profiles?: {
    business_name: string;
    phone?: string;
    website?: string;
    instagram_handle?: string;
    facebook_url?: string;
    address?: string;
    city?: string;
  };
};

type ListingDetailProps = {
  businessListing: BusinessListing | null;
};

export default function BusinessListingDetail({ businessListing }: ListingDetailProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle loading state and fallback
  if (router.isFallback || !businessListing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="ml-4 text-gray-600">Cargando negocio...</p>
      </div>
    );
  }

  // Get all images
  const images = businessListing.images || [''];
  const currentImage = images[currentImageIndex];

  const formatHours = (hours: any) => {
    if (typeof hours === 'object' && hours) {
      return Object.entries(hours)
        .filter(([_, time]: [string, any]) => time?.open && time?.close)
        .map(([day, time]: [string, any]) => `${day.charAt(0).toUpperCase() + day.slice(1)}: ${time.open} - ${time.close}`)
        .join(', ');
    }
    return '';
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Head>
        <title>{businessListing.title} | Directory SLP</title>
        <meta name="description" content={businessListing.description} />
        {currentImage && <meta property="og:image" content={currentImage} />}
      </Head>

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <Link href="/listings" className="inline-flex items-center text-primary hover:text-primary-dark mb-8 transition duration-200">
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            {'Volver a Negocios'}
          </Link>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Gallery */}
              <div className="lg:w-1/2">
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  {currentImage && currentImage !== '' ? (
                    <Image
                      src={currentImage}
                      alt={`${businessListing.title} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">{'Sin imagen disponible'}</span>
                    </div>
                  )}

                  {/* Navigation arrows - only show if there are multiple images */}
                  {images.length > 1 && images[0] !== '' && (
                    <>
                      <button
                        onClick={goToPreviousImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 transition-all duration-200"
                        aria-label="Imagen anterior"
                      >
                        <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
                      </button>
                      <button
                        onClick={goToNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 transition-all duration-200"
                        aria-label="Siguiente imagen"
                      >
                        <ChevronRightIcon className="h-6 w-6 text-gray-700" />
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  {images.length > 1 && images[0] !== '' && (
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-sm px-2 py-1 rounded-md">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {images.length > 1 && images[0] !== '' && (
                  <div className="flex overflow-x-auto py-3 gap-2 px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                          currentImageIndex === index ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        {img ? (
                          <Image
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <span className="text-xs text-gray-400">Sin imagen</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Business Information */}
              <div className="lg:w-1/2 p-6 lg:p-8">
                <div className="flex flex-col h-full">
                  {/* Category and Type Badges */}
                  <div className="flex gap-2 mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {businessListing.category}
                    </span>
                    {businessListing.type && (
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {businessListing.type === 'service' ? 'Service' : 'Product'}
                      </span>
                    )}
                  </div>

                  {/* Title and Business Name */}
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{businessListing.title}</h1>
                  {businessListing.business_profiles?.business_name && (
                    <p className="text-lg text-gray-600 mb-4">{businessListing.business_profiles.business_name}</p>
                  )}

                  {/* Description */}
                  <p className="text-gray-600 mb-6">{businessListing.description}</p>

                  {/* Price */}
                  {businessListing.price && (
                    <div className="mb-6">
                      <span className="text-2xl font-bold text-green-600">{formatMXNPrice(businessListing.price)}</span>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{'Información de Contacto'}</h3>
                    <div className="space-y-3">
                      {/* Address */}
                      {(businessListing.address || businessListing.business_profiles?.address) && (
                        <div className="flex items-start">
                          <MapPinIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-gray-800">{businessListing.address || businessListing.business_profiles?.address}</p>
                            {(businessListing.city || businessListing.business_profiles?.city) && (
                              <p className="text-gray-600">{businessListing.city || businessListing.business_profiles?.city}</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Phone */}
                      {(businessListing.phone || businessListing.business_profiles?.phone) && (
                        <div className="flex items-center">
                          <PhoneIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                          <a
                            href={`tel:${businessListing.phone || businessListing.business_profiles?.phone}`}
                            className="text-primary hover:underline font-medium"
                          >
                            {businessListing.phone || businessListing.business_profiles?.phone}
                          </a>
                        </div>
                      )}

                      {/* Email */}
                      {businessListing.email && (
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <a
                            href={`mailto:${businessListing.email}`}
                            className="text-primary hover:underline font-medium"
                          >
                            {businessListing.email}
                          </a>
                        </div>
                      )}

                      {/* Website */}
                      {(businessListing.website || businessListing.business_profiles?.website) && (
                        <div className="flex items-center">
                          <GlobeAltIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                          <a
                            href={businessListing.website || businessListing.business_profiles?.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-medium"
                          >
                            {(businessListing.website || businessListing.business_profiles?.website)?.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      )}

                      {/* Instagram */}
                      {businessListing.business_profiles?.instagram_handle && (
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.988-5.367 11.988-11.988C24.005 5.367 18.638.001 12.017.001zM8.449 16.988c-1.297 0-2.343-1.046-2.343-2.343s1.046-2.343 2.343-2.343 2.343 1.046 2.343 2.343-1.046 2.343-2.343 2.343zm7.136 0c-1.297 0-2.343-1.046-2.343-2.343s1.046-2.343 2.343-2.343 2.343 1.046 2.343 2.343-1.046 2.343-2.343 2.343z"/>
                          </svg>
                          <a
                            href={`https://instagram.com/${businessListing.business_profiles.instagram_handle.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-medium"
                          >
                            @{businessListing.business_profiles.instagram_handle.replace('@', '')}
                          </a>
                        </div>
                      )}

                      {/* Facebook */}
                      {businessListing.business_profiles?.facebook_url && (
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          <a
                            href={businessListing.business_profiles.facebook_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-medium"
                          >
                            Facebook
                          </a>
                        </div>
                      )}

                      {/* Hours */}
                      {businessListing.hours && (
                        <div className="flex items-start">
                          <ClockIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-800">{formatHours(businessListing.hours)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Services List */}
                  {businessListing.services && businessListing.services.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{'Servicios'}</h3>
                      <div className="flex flex-wrap gap-2">
                        {businessListing.services.map((service, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Action Buttons */}
                  <div className="mt-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Call Button */}
                      {(businessListing.phone || businessListing.business_profiles?.phone) && (
                        <a
                          href={`tel:${businessListing.phone || businessListing.business_profiles?.phone}`}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-center font-medium transition-colors flex items-center justify-center"
                        >
                          <PhoneIcon className="h-5 w-5 mr-2" />
                          {'Llamar'}
                        </a>
                      )}

                      {/* Email Button */}
                      {businessListing.email && (
                        <a
                          href={`mailto:${businessListing.email}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-center font-medium transition-colors flex items-center justify-center"
                        >
                          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Email
                        </a>
                      )}

                      {/* Website Button */}
                      {(businessListing.website || businessListing.business_profiles?.website) && (
                        <a
                          href={businessListing.website || businessListing.business_profiles?.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md text-center font-medium transition-colors flex items-center justify-center sm:col-span-2"
                        >
                          <GlobeAltIcon className="h-5 w-5 mr-2" />
                          {'Visitar Sitio Web'}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, locale = 'en' }) => {
  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  // Fetch business listing by ID with business profile info
  const { data: businessListing, error: businessListingError } = await supabase
    .from('business_listings')
    .select(`
      *,
      business_profiles (
        business_name,
        phone,
        website,
        instagram_handle,
        facebook_url,
        address,
        city,
        subscription_status,
        user_id,
        id
      )
    `)
    .eq('id', params.id)
    .eq('status', 'active')
    .single();

  if (businessListingError || !businessListing) {
    return {
      notFound: true,
    };
  }

  // Check subscription status
  if (businessListing.business_profiles?.subscription_status !== 'active') {
    try {
      // Double-check with the subscriptions table
      const { data: subscriptionData } = await supabase
        .from('subscriptions')
        .select("*")
        .eq('user_id', businessListing.business_profiles.user_id)
        .eq('status', 'active')
        .maybeSingle();

      if (subscriptionData?.status === 'active') {
        // Update the business profile in the background
        supabase
          .from('business_profiles')
          .update({ subscription_status: 'active' })
          .eq('user_id', businessListing.business_profiles.user_id)
          .then(({ error }) => {
            if (error) {
              console.error('Error updating business profile subscription status:', error);
            }
          });
      } else {
        // No active subscription found, return not found
        return {
          notFound: true,
        };
      }
    } catch (error) {
      console.error('Error checking subscription status:', error);
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {
      businessListing,
    },
  };
};