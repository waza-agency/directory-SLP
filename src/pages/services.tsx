import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Service } from '@/types';
import { supabase } from '@/lib/supabase';
import AdUnit from '../components/common/AdUnit';

interface ServicesPageProps {
  services: Service[];
  featuredServices: Service[];
}

const ServicesPage: NextPage<ServicesPageProps> = ({ services, featuredServices }) => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(services.map(service => service.category)));
    return ['all', ...cats.sort()];
  }, [services]);

  // Filter services
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [services, searchTerm, selectedCategory]);

  return (
    <>
      <Head>
        <title>{t('expatServices.title')} | SLP Descubre</title>
        <meta name="description" content={t('expatServices.description')} />
      </Head>

      <main className="bg-background min-h-screen">
        {/* Hero Section with Background */}
        <section className="relative h-screen bg-gradient-to-br from-green-900 via-blue-900 to-teal-900 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/cultural/museo-federico-silva.jpg"
              alt="Museo Federico Silva, San Luis Potosí"
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-blue-900/60 to-teal-900/70"></div>

          {/* Content */}
          <div className="relative container mx-auto px-4 h-full flex items-center pt-20">
            <div className="max-w-4xl">
              <div className="mb-4">
                <span className="text-green-200 text-sm font-medium uppercase tracking-wider">
                  {t('expatServices.subtitle')}
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Your Personal Guide to San Luis Potosí
              </h1>
              <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
                We believe in personalized solutions. Our approach starts with understanding your unique needs, preferences, and goals. Whether you're moving to San Luis Potosí for work, family, or adventure, we're here to make your transition smooth and successful.
              </p>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-2xl shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-4">How We Help You</h3>
                <ul className="space-y-3 text-green-100">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We listen to your specific needs and preferences</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We match you with the best local service providers</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We handle all the arrangements and introductions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We provide ongoing support throughout your journey</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* Featured Services Section */}
        {featuredServices.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <span className="text-primary text-sm font-medium uppercase tracking-wider">
                  Trusted Local Providers
                </span>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4 mt-2">
                  Featured Services in San Luis Potosí
                </h2>
                <p className="text-lg text-gray-600">
                  Vetted and recommended local service providers we trust to serve our community
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredServices.map((service) => (
                  <div key={service.id} className="bg-white rounded-xl p-6 shadow-elegant hover:shadow-lg transition-shadow">
                    {service.image_url && (
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                        <img
                          src={service.image_url}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-xl text-gray-900">{service.name}</h3>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {service.category}
                      </span>
                    </div>
                    {service.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                    )}
                    <div className="space-y-2 text-sm text-gray-600">
                      {service.phone && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a href={`tel:${service.phone}`} className="hover:text-primary">{service.phone}</a>
                        </div>
                      )}
                      {service.website && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          <a href={service.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            Website
                          </a>
                        </div>
                      )}
                      {service.location && (
                        <div className="flex items-start">
                          <svg className="w-4 h-4 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-xs">{service.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-primary text-sm font-medium uppercase tracking-wider">
                  Local Service Directory
                </span>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4 mt-2">
                  All Local Services & Providers
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Complete directory of trusted local businesses and service providers in San Luis Potosí
                </p>

                {/* Search and Filter Controls */}
                <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results count */}
              <div className="mb-6">
                <p className="text-gray-600 text-center">
                  Showing {filteredServices.length} of {services.length} services
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <div key={service.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    {service.image_url && (
                      <div className="w-full h-40 mb-4 rounded-lg overflow-hidden">
                        <img
                          src={service.image_url}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg text-gray-900 flex-1">{service.name}</h3>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs ml-2 capitalize">
                        {service.category}
                      </span>
                    </div>
                    {service.description && (
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">{service.description}</p>
                    )}
                    <div className="space-y-2 text-sm text-gray-600">
                      {service.phone && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a href={`tel:${service.phone}`} className="hover:text-primary">{service.phone}</a>
                        </div>
                      )}
                      {service.website && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          <a href={service.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            Website
                          </a>
                        </div>
                      )}
                      {service.location && (
                        <div className="flex items-start">
                          <svg className="w-4 h-4 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-xs">{service.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredServices.length === 0 && (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No services found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                Need Help Finding the Right Service?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our team can help you find exactly what you're looking for. Get personalized recommendations based on your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors">
                  Get Personalized Help
                </Link>
                <Link href="/submit-listing/service" className="inline-flex items-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary bg-transparent hover:bg-primary/10 transition-colors">
                  List Your Service
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Unit */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <AdUnit style={{ display: 'block', margin: '0 auto', maxWidth: '728px' }} />
          </div>
        </section>
      </main>
    </>
  );
};

export async function getStaticProps({ locale = 'en' }: { locale?: string }) {
  try {
    // Fetch all services
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (servicesError) {
      console.error('Error fetching services:', servicesError);
    }

    // Fetch featured services
    const { data: featuredServices, error: featuredError } = await supabase
      .from('services')
      .select('*')
      .eq('status', 'active')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(6);

    if (featuredError) {
      console.error('Error fetching featured services:', featuredError);
    }

    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        services: services || [],
        featuredServices: featuredServices || [],
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        services: [],
        featuredServices: [],
      },
      revalidate: 3600,
    };
  }
}

export default ServicesPage;