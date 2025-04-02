import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { BuildingOfficeIcon, UserGroupIcon, HeartIcon, MapIcon, UsersIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function JoinDirectory() {
  return (
    <>
      <Head>
        <title>Join Our Community Network - San Luis Way</title>
        <meta 
          name="description" 
          content="Be part of San Luis Potosí's welcoming community network. Connect with locals, grow your business, and help newcomers discover the magic of our city." 
        />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <HeartIcon className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Grow Your Business While Building Community
              </h1>
              <p className="text-xl mb-8">
                Join our network of passionate locals who help newcomers discover the magic of our city. Share your business, connect with the community, and be part of making San Luis Potosí feel like home for everyone - while reaching new customers and growing your presence.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <UsersIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're more than just a directory - we're a community of locals who love sharing the best of San Luis Potosí with newcomers. Whether you're a business owner, service provider, or passionate local, join us in making our city more welcoming while growing your business and reaching new customers.
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
                  Share your business with newcomers and locals alike. Help them discover the authentic experiences and services that make San Luis Potosí special while growing your customer base.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Connect with newcomers and locals
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Reach new customers
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Build lasting community connections
                  </li>
                </ul>
                <Link
                  href="/submit-listing/business"
                  className="block text-center bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  Share Your Business
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
                  Offer your expertise to help newcomers settle in and thrive. Whether you're a tutor, consultant, or service provider, be part of their journey while expanding your client base.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Help newcomers adapt
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Grow your client base
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Build trust in the community
                  </li>
                </ul>
                <Link
                  href="/submit-listing/service"
                  className="block text-center bg-secondary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary-dark transition-colors"
                >
                  Share Your Service
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Join Our Community?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MapIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Share Local Knowledge</h3>
                <p className="text-gray-600">Help newcomers discover the hidden gems and authentic experiences that make San Luis Potosí special while showcasing your business.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CurrencyDollarIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Grow Your Business</h3>
                <p className="text-gray-600">Connect with new customers and expand your presence in the local community while building lasting relationships.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <HeartIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Make a Difference</h3>
                <p className="text-gray-600">Help newcomers feel at home and contribute to making San Luis Potosí a more welcoming city while growing your brand.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Grow Your Business & Make a Difference?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join our community today and help make San Luis Potosí feel like home for everyone while expanding your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/submit-listing/business"
                className="bg-white text-secondary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Share Your Business
              </Link>
              <Link
                href="/submit-listing/service"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Share Your Service
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 