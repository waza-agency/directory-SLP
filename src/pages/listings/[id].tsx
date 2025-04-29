import { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { supabase } from '@/lib/supabase';
import BuyButton from '@/components/common/BuyButton';
import { ArrowLeftIcon, MapPinIcon, PhoneIcon, ClockIcon, GlobeAltIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Place type definition
type Place = {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string; 
  city?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  image_url?: string;
  images?: string[];  // Adding images array for places too
  hours?: string;
  // Purchase-related fields
  price?: number;
  inventory?: number;
  is_purchasable?: boolean;
  sku?: string;
  created_at: string;
};

// Business Listing type definition
type BusinessListing = {
  id: string;
  title: string;
  description: string;
  category: string;
  address?: string; 
  city?: string;
  phone?: string;
  website?: string;
  email?: string;
  hours?: {[key: string]: {open: string, close: string}};
  images?: string[];
  services?: string[];
  price?: number | string;
  status: string;
  created_at: string;
  updated_at: string;
  business_id: string;
};

type ListingDetailProps = {
  place?: Place | null;
  businessListing?: BusinessListing | null;
  type: 'place' | 'business_listing';
};

export default function ListingDetail({ place, businessListing, type }: ListingDetailProps) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle loading state and fallback
  if (router.isFallback || (!place && !businessListing)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="ml-4 text-gray-600">{t('listing.loading', 'Loading listing...')}</p>
      </div>
    );
  }

  const listing = type === 'place' ? place : businessListing;
  const name = type === 'place' ? place?.name : businessListing?.title;
  const description = listing?.description;
  
  // Get all images
  let images: string[] = [];
  if (type === 'place') {
    // For places, use image_url as first image if it exists, or use images array if available
    if (place?.image_url) {
      images = place.images ? [place.image_url, ...place.images] : [place.image_url];
    } else {
      images = place?.images || [];
    }
  } else {
    // For business listings, use the images array
    images = businessListing?.images || [];
  }

  // Ensure we have at least one image or placeholder
  if (images.length === 0) {
    images = [''];  // Empty string will trigger the placeholder display
  }

  const currentImage = images[currentImageIndex];
  const category = listing?.category;
  const price = type === 'place' 
    ? place?.price 
    : businessListing?.price 
      ? parseFloat(businessListing.price.toString()) 
      : undefined;

  const formatHours = (hours: any) => {
    if (type === 'place') return hours;
    
    if (typeof hours === 'object') {
      return Object.entries(hours)
        .filter(([_, time]) => time.open && time.close)
        .map(([day, time]) => `${day.charAt(0).toUpperCase() + day.slice(1)}: ${time.open} - ${time.close}`)
        .join(', ');
    }
    
    return '';
  };

  const handleIncreaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
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
        <title>{name} | Directory SLP</title>
        <meta name="description" content={description} />
        {currentImage && <meta property="og:image" content={currentImage} />}
      </Head>

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <Link href="/shop" className="inline-flex items-center text-primary hover:text-primary-dark mb-8 transition duration-200">
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            {t('listing.backToListings', 'Back to Shop')}
          </Link>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Product Image Gallery with 16:9 Aspect Ratio */}
              <div className="lg:w-1/2">
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                  {currentImage ? (
                    <Image
                      src={currentImage}
                      alt={`${name || ''} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-contain"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                  
                  {/* Navigation arrows - only show if there are multiple images */}
                  {images.length > 1 && (
                    <>
                      <button 
                        onClick={goToPreviousImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 transition-all duration-200"
                        aria-label="Previous image"
                      >
                        <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
                      </button>
                      <button 
                        onClick={goToNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 transition-all duration-200"
                        aria-label="Next image"
                      >
                        <ChevronRightIcon className="h-6 w-6 text-gray-700" />
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-sm px-2 py-1 rounded-md">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {images.length > 1 && (
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
                            <span className="text-xs text-gray-400">No image</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Information */}
              <div className="lg:w-1/2 p-6 lg:p-8">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Category Badge */}
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                      {category}
                    </span>
                    
                    {/* Title and Description */}
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{name}</h1>
                    <p className="text-gray-600 mb-6">{description}</p>
                    
                    {/* Price and Stock */}
                    <div className="mb-6">
                      <div className="flex items-center">
                        <span className="text-3xl font-bold text-gray-900">${(price || 100).toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2})} <span className="text-lg font-medium">MXN</span></span>
                        <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {t('listing.inStock', 'In Stock')}
                        </span>
                      </div>
                    </div>
                    
                    {/* Contact Info */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                      {listing?.address && (
                        <div className="flex items-start">
                          <MapPinIcon className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>
                            <p className="text-gray-800">{listing.address}</p>
                            {listing.city && <p className="text-gray-600">{listing.city}</p>}
                          </span>
                        </div>
                      )}
                      
                      {(type === 'place' ? place?.phone : businessListing?.phone) && (
                        <div className="flex items-center">
                          <PhoneIcon className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-800">{type === 'place' ? place?.phone : businessListing?.phone}</span>
                        </div>
                      )}
                      
                      {listing?.website && (
                        <div className="flex items-center">
                          <GlobeAltIcon className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                          <a href={listing.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {listing.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      )}
                      
                      {(type === 'place' ? place?.hours : businessListing?.hours) && (
                        <div className="flex items-start">
                          <ClockIcon className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-800">{formatHours(type === 'place' ? place?.hours : businessListing?.hours)}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Services List */}
                    {type === 'business_listing' && businessListing?.services && businessListing.services.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('listing.services', 'Services')}</h3>
                        <div className="flex flex-wrap gap-2">
                          {businessListing.services.map((service, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    {/* Quantity Selector */}
                    <div className="flex items-center mb-6">
                      <span className="text-gray-700 mr-4">{t('listing.quantity', 'Quantity')}:</span>
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={handleDecreaseQuantity}
                          disabled={quantity <= 1}
                          className="px-3 py-2 border-r border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:bg-white transition"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 font-medium">{quantity}</span>
                        <button
                          onClick={handleIncreaseQuantity}
                          disabled={quantity >= 10}
                          className="px-3 py-2 border-l border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:bg-white transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <BuyButton
                        productId={listing?.id || ''}
                        name={name || ''}
                        price={price || 100}
                        imageUrl={currentImage || undefined}
                        quantity={quantity}
                        mode="cart"
                        className="px-6 py-3 text-sm sm:flex-1 shadow-sm"
                      />
                      <BuyButton
                        productId={listing?.id || ''}
                        name={name || ''}
                        price={price || 100}
                        imageUrl={currentImage || undefined}
                        quantity={quantity}
                        mode="buy"
                        className="px-6 py-3 text-sm sm:flex-1 shadow-sm"
                      />
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

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the IDs of all places and business_listings
  const { data: places } = await supabase
    .from('places')
    .select('id');
  
  const { data: businessListings } = await supabase
    .from('business_listings')
    .select('id')
    .eq('status', 'active');
  
  // Create paths from place IDs
  const placePaths = places?.map((place) => ({
    params: { id: place.id },
  })) || [];
  
  // Create paths from business listing IDs
  const businessListingPaths = businessListings?.map((listing) => ({
    params: { id: listing.id },
  })) || [];
  
  return {
    paths: [...placePaths, ...businessListingPaths],
    fallback: true, // Show fallback UI for paths not generated at build time
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (!params?.id) {
    return {
      notFound: true,
    };
  }
  
  // Try to fetch the place by ID
  const { data: place, error: placeError } = await supabase
    .from('places')
    .select('*')
    .eq('id', params.id)
    .single();
  
  if (!placeError && place) {
    return {
      props: {
        place,
        type: 'place',
        ...(await serverSideTranslations(locale || 'es', ['common'])),
      },
      revalidate: 60, // Revalidate every minute
    };
  }
  
  // If place not found, try to fetch the business listing by ID
  const { data: businessListing, error: businessListingError } = await supabase
    .from('business_listings')
    .select('*')
    .eq('id', params.id)
    .single();
  
  if (!businessListingError && businessListing) {
    return {
      props: {
        businessListing,
        type: 'business_listing',
        ...(await serverSideTranslations(locale || 'es', ['common'])),
      },
      revalidate: 60, // Revalidate every minute
    };
  }
  
  return {
    notFound: true,
  };
}; 