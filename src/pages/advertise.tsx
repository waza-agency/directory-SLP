import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { MegaphoneIcon, ChartBarIcon, UserGroupIcon, GlobeAltIcon, SparklesIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

export default function Advertise() {
  return (
    <>
      <Head>
        <title>Advertise with San Luis Way - Reach New Residents & Expats in SLP</title>
        <meta name="description" content="Connect with new residents and expats in San Luis Potosí through San Luis Way. Reach an audience actively looking to discover and support local businesses." />
        <meta name="keywords" content="advertise, business, marketing, San Luis Potosí, expats, new residents, local business" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <MegaphoneIcon className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Reach New Customers in San Luis Potosí
              </h1>
              <p className="text-xl mb-8">
                Connect with expats and new residents who are actively looking to discover and support local businesses. Our audience is ready to become your customers.
              </p>
              <Link
                href="/contact?subject=Advertising Inquiry"
                className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </section>

        {/* Why Advertise Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose San Luis Way?</h2>
              <p className="text-lg text-gray-600">
                We connect you with an audience that's actively looking to discover new businesses and services in San Luis Potosí.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <UserGroupIcon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">New Customer Base</h3>
                <p className="text-gray-600">
                  Reach expats and new residents who are actively looking to discover local businesses. These customers are ready to try new services and establish new relationships.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <BuildingOfficeIcon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Growing Market</h3>
                <p className="text-gray-600">
                  San Luis Potosí is attracting new residents and businesses. Position yourself to capture this growing market of newcomers looking for local services.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <GlobeAltIcon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Trusted Guide</h3>
                <p className="text-gray-600">
                  New residents trust San Luis Way as their go-to resource for discovering local businesses. Be among the first businesses they discover.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Advertising Options */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Advertising Options</h2>
              <p className="text-lg text-gray-600">
                Choose how you want to connect with new residents and expats in San Luis Potosí
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <SparklesIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Premium Listing</h3>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Featured placement in newcomer guides
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Enhanced business profile for new customers
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support for new customer inquiries
                  </li>
                </ul>
                <Link
                  href="/contact?subject=Premium Listing Inquiry"
                  className="block text-center bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  Learn More
                </Link>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <MegaphoneIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Digital Advertising</h3>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Target new residents and expats specifically
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Track new customer acquisition
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom campaigns for new market segments
                  </li>
                </ul>
                <Link
                  href="/contact?subject=Digital Advertising Inquiry"
                  className="block text-center bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
              <p className="text-lg text-gray-600">
                See how businesses have grown by reaching new residents and expats
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">La Antigua Restaurant</h3>
                </div>
                <p className="text-gray-600">
                  "San Luis Way helped us reach new residents and expats who were looking for authentic dining experiences. Our customer base has grown significantly with these new customers who are eager to discover local restaurants."
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Hotel Real de Minas</h3>
                </div>
                <p className="text-gray-600">
                  "Through San Luis Way, we've connected with new residents looking for temporary accommodations and expats planning their move. These new customers have become some of our most loyal guests."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Reach New Customers?</h2>
              <p className="text-xl mb-8">
                Connect with expats and new residents who are actively looking to discover local businesses like yours.
              </p>
              <Link
                href="/contact?subject=Advertising Inquiry"
                className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us Now
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 