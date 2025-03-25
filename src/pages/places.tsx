import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { useState } from 'react';

// Place categories for filtering
const categories = [
  { id: 'all', name: 'All Places' },
  { id: 'attractions', name: 'Attractions' },
  { id: 'restaurants', name: 'Restaurants' },
  { id: 'shopping', name: 'Shopping' },
  { id: 'parks', name: 'Parks & Nature' },
  { id: 'museums', name: 'Museums' }
];

export default function PlacesPage() {
  const { t } = useTranslation('common');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Head>
        <title>Explore San Luis Potosí - SLP Descubre</title>
        <meta name="description" content="Discover the best places in San Luis Potosí, from historic attractions to modern restaurants. Find hidden gems and popular spots in the city." />
        <meta name="keywords" content="San Luis Potosí places, attractions, restaurants, shopping, parks, museums" />
        <meta property="og:title" content="Explore San Luis Potosí - SLP Descubre" />
        <meta property="og:description" content="Your comprehensive guide to the best places in San Luis Potosí." />
        <meta property="og:image" content="/images/attraction.jpg" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Section with Search */}
        <section className="relative h-[50vh] min-h-[400px] bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/images/attraction.jpg"
              alt="San Luis Potosí cityscape"
              fill
              className="object-cover opacity-50"
              priority
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
              Explore San Luis Potosí
            </h1>
            <p className="text-white text-lg mb-8 text-center max-w-2xl">
              Discover the best places, hidden gems, and local favorites in the city
            </p>
            
            {/* Search Bar */}
            <div className="w-full max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search places..."
                  className="w-full px-6 py-4 rounded-full shadow-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-secondary text-white px-6 py-2 rounded-full hover:bg-secondary-dark transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-0 bg-white shadow-md z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex overflow-x-auto space-x-4 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                    activeCategory === category.id
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Places</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Featured Place Cards */}
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src="/images/attraction.jpg"
                      alt="Featured place"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Historic Center</h3>
                    <p className="text-gray-600 mb-4">UNESCO World Heritage site featuring colonial architecture and historic landmarks.</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-400">★</span>
                        <span className="text-gray-700">4.8</span>
                      </div>
                      <a href="/places/historic-center" className="text-secondary hover:text-secondary-dark font-medium">
                        Learn More →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.slice(1).map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">Explore →</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-[400px]">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Interactive Map Coming Soon</p>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore on Map</h2>
                <p className="text-gray-600 mb-4">
                  View all places on an interactive map. Filter by category, rating, and more.
                </p>
                <button className="bg-secondary text-white px-6 py-2 rounded-md hover:bg-secondary-dark transition-colors">
                  Open Map View
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive updates about new places, special events, and local tips.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-white text-secondary px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}; 