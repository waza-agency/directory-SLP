import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { GetServerSideProps } from 'next';
import { formatMXNPrice } from '@/utils/currency';

interface BusinessListing {
  id: string;
  title: string;
  description: string;
  category: string;
  price?: string;
  images?: any;
  address?: string;
  city?: string;
  phone?: string;
  website?: string;
  email?: string;
  created_at: string;
  business_profiles: {
    id: string;
    business_name: string;
    business_category: string;
    users: {
      id: string;
      email: string;
      subscriptions: Array<{
        id: string;
        status: string;
        current_period_end: string;
      }>;
    };
  };
}

interface ListingsPageProps {
  initialListings: BusinessListing[];
}

export default function ListingsPage({ initialListings }: ListingsPageProps) {
  const [listings, setListings] = useState<BusinessListing[]>(initialListings);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'restaurants',
    'services',
    'retail',
    'health',
    'education',
    'entertainment',
    'technology',
    'other'
  ];

  const filteredListings = selectedCategory === 'all'
    ? listings
    : listings.filter(listing =>
        listing.category.toLowerCase() === selectedCategory ||
        listing.business_profiles.business_category.toLowerCase() === selectedCategory
      );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Head>
        <title>Business Listings | San Luis Way</title>
        <meta name="description" content="Browse and discover businesses in San Luis Potosí" />
      </Head>

      <main className="bg-background min-h-screen">
        {/* Hero Section with Background */}
        <section className="relative h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/listings-hero.jpg"
              alt="Local Businesses, San Luis Potosí"
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-indigo-900/60 to-blue-900/70"></div>

          {/* Content */}
          <div className="relative container mx-auto px-4 h-full flex items-center pt-20">
            <div className="max-w-4xl">
              <div className="mb-4">
                <span className="text-purple-200 text-sm font-medium uppercase tracking-wider">
                  Local Business Directory
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Discover Local Businesses in San Luis Potosí
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
                Browse and connect with trusted local businesses and service providers. From traditional markets to modern services, find everything you need in our vibrant community.
              </p>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-2xl shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-4">What You'll Find</h3>
                <ul className="space-y-3 text-purple-100">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-300 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>Verified local businesses with active subscriptions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-300 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Easy search and filtering by category</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-300 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Direct contact information and details</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-300 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Location information and addresses</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* Main Content */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {t(category, category.charAt(0).toUpperCase() + category.slice(1))}
                  </button>
                ))}
              </div>
            </div>

            {/* Listings Count */}
            <div className="mb-6">
              <p className="text-gray-600 text-center">
                {t('showing_listings', 'Showing {{count}} business listings', {
                  count: filteredListings.length
                })}
              </p>
            </div>

            {/* Listings Grid */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => {
                  const hasActiveSubscription = listing.business_profiles.users.subscriptions?.some(
                    sub => sub.status === 'active' && new Date(sub.current_period_end) > new Date()
                  );

                  return (
                    <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Business Image */}
                      <div className="relative h-48 overflow-hidden">
                        {listing.images && (
                          typeof listing.images === 'string' ? (
                            <Image
                              src={listing.images}
                              alt={listing.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : Array.isArray(listing.images) && listing.images.length > 0 ? (
                            <Image
                              src={listing.images[0]}
                              alt={listing.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                          )
                        ) || (
                          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                        )}

                        {/* Overlay with business info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                          <div className="p-4 text-white w-full">
                            <h3 className="text-lg font-semibold">{listing.business_profiles.business_name}</h3>
                            <p className="text-sm opacity-90">{listing.category}</p>
                            {hasActiveSubscription && (
                              <span className="inline-block mt-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                                ✓ Verified Business
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
                            {listing.title}
                          </h2>
                          {listing.price && (
                            <span className="text-lg font-bold text-indigo-600 ml-2 whitespace-nowrap">
                              {formatMXNPrice(listing.price)}
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {listing.description}
                        </p>

                        <div className="space-y-2 mb-4">
                          {listing.address && (
                            <p className="text-sm text-gray-500 flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {listing.address}
                              {listing.city && `, ${listing.city}`}
                            </p>
                          )}

                          {listing.phone && (
                            <p className="text-sm text-gray-500 flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              {listing.phone}
                            </p>
                          )}
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              {listing.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(listing.created_at)}
                            </span>
                          </div>

                          <Link
                            href={`/listings/${listing.id}`}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                          >
                            {'View Details'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  {'No listings found'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedCategory === 'all'
                    ? 'No business listings are currently available.'
                    : 'No listings found in this category.'
                  }
                </p>
                {selectedCategory !== 'all' && (
                  <div className="mt-6">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {'View All Listings'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Call to Action for Business Owners */}
            <div className="mt-16 bg-indigo-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {'Own a Business?'}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {'List your business and reach more customers in San Luis Potosí'}
              </p>
              <Link
                href="/business/subscription"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {'Get Started'}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ }) => {
  try {
    // First get business listings with their profiles
    const { data: listings, error } = await supabase
      .from('business_listings')
      .select(`
        id,
        title,
        description,
        category,
        price,
        images,
        address,
        city,
        phone,
        website,
        email,
        created_at,
        business_profiles!inner (
          id,
          business_name,
          business_category,
          user_id,
          subscription_status
        )
      `)
      .eq('status', 'active')
      .eq('business_profiles.subscription_status', 'active')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching listings:', error);
          return {
      props: {
        initialListings: [],
      },
    };
    }

    // Transform the data to match the expected interface
    const transformedListings = listings?.map(listing => ({
      ...listing,
      business_profiles: {
        ...listing.business_profiles,
        users: {
          id: listing.business_profiles.user_id,
          email: '', // We don't need email for display
          subscriptions: [
            {
              id: 'active',
              status: 'active',
              current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            }
          ]
        }
      }
    })) || [];

          return {
        props: {
          initialListings: transformedListings,
        },
      };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        initialListings: [],
      },
      revalidate: 300,
    };
  }
};