import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { BuildingOfficeIcon, UserGroupIcon, SparklesIcon, ChartBarIcon, GlobeAltIcon, MegaphoneIcon } from '@heroicons/react/24/outline';

export default function JoinDirectory() {
  return (
    <>
      <Head>
        <title>Join Our Directory - San Luis Way</title>
        <meta 
          name="description" 
          content="List your business or service in San Luis Potosí's most comprehensive directory. Reach new customers and grow your presence in the local community." 
        />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <BuildingOfficeIcon className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Join San Luis Way Directory
              </h1>
              <p className="text-xl mb-8">
                Connect with new customers and grow your presence in San Luis Potosí's most trusted local directory.
              </p>
            </div>
          </div>
        </section>

        {/* Business vs Service Provider Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Business Listing Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <BuildingOfficeIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">Business Listing</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Perfect for restaurants, shops, and other physical businesses looking to reach new customers in San Luis Potosí.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Detailed business profile
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Location on interactive map
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Customer reviews and ratings
                  </li>
                </ul>
                <Link
                  href="/submit-listing/business"
                  className="block text-center bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  List Your Business
                </Link>
              </div>

              {/* Service Provider Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4">
                    <UserGroupIcon className="w-6 h-6 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-semibold">Service Provider</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Ideal for professionals offering services like tutoring, consulting, or personal services in San Luis Potosí.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Professional service profile
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Service area coverage
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Client testimonials
                  </li>
                </ul>
                <Link
                  href="/submit-listing/service"
                  className="block text-center bg-secondary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary-dark transition-colors"
                >
                  List Your Service
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Join Our Directory?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <GlobeAltIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Increased Visibility</h3>
                <p className="text-gray-600">Reach thousands of potential customers actively looking for local businesses and services.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <ChartBarIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Business Growth</h3>
                <p className="text-gray-600">Connect with new customers and expand your presence in the local community.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MegaphoneIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Marketing Support</h3>
                <p className="text-gray-600">Get featured in our newsletters and social media channels to reach even more customers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <SparklesIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Upgrade to Premium</h2>
              <p className="text-lg text-gray-600">
                Get more visibility and features with our premium listing options.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Premium Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Featured placement in search results
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Enhanced business profile
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority customer support
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Marketing Benefits</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Featured in newsletters
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Social media promotion
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Analytics dashboard
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link
                href="/contact?subject=Premium Listing"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Learn More About Premium
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join our directory today and start reaching new customers in San Luis Potosí.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/submit-listing/business"
                className="bg-white text-secondary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                List Your Business
              </Link>
              <Link
                href="/submit-listing/service"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                List Your Service
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 