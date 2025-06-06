import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
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

      <main className="bg-background min-h-screen py-12">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                {t('expatServices.subtitle')}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                Your Personal Guide to San Luis Potosí
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We believe in personalized solutions. Our approach starts with understanding your unique needs, preferences, and goals. Whether you're moving to San Luis Potosí for work, family, or adventure, we're here to make your transition smooth and successful.
              </p>
              <div className="bg-white p-6 rounded-lg border border-primary/20 max-w-2xl mx-auto shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How We Help You</h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We listen to your specific needs and preferences</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We match you with the best local service providers</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We handle all the arrangements and introductions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We provide ongoing support throughout your journey</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
                    {service.provider && (
                      <p className="text-sm text-primary font-medium mb-2">{service.provider}</p>
                    )}
                    {service.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                    )}
                    <div className="space-y-1 text-xs text-gray-600">
                      {service.phone && (
                        <div className="flex items-center">
                          <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a href={`tel:${service.phone}`} className="hover:text-primary">{service.phone}</a>
                        </div>
                      )}
                      {service.email && (
                        <div className="flex items-center">
                          <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <a href={`mailto:${service.email}`} className="hover:text-primary">{service.email}</a>
                        </div>
                      )}
                      {service.website && (
                        <div className="flex items-center">
                          <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          <a href={service.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary text-xs">
                            Visit Website
                          </a>
                        </div>
                      )}
                      {service.price && service.price !== '0' && (
                        <div className="flex items-center">
                          <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span className="text-green-600 font-medium">{service.price === '0' ? 'Free' : `$${service.price}`}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2 mt-4">
                      {service.facebook && (
                        <a href={service.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                      )}
                      {service.instagram && (
                        <a href={service.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.897 3.744 13.407 3.744 11.729c0-1.678.454-3.168 1.382-4.462.875-.807 2.026-1.297 3.323-1.297 1.297 0 2.448.49 3.323 1.297.928 1.294 1.382 2.784 1.382 4.462 0 1.678-.454 3.168-1.382 4.462-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297-1.297 0-2.448-.49-3.323-1.297-.928-1.294-1.382-2.784-1.382-4.462 0-1.678.454-3.168 1.382-4.462.875-.807 2.026-1.297 3.323-1.297 1.297 0 2.448.49 3.323 1.297.928 1.294 1.382 2.784 1.382 4.462 0 1.678-.454 3.168-1.382 4.462z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredServices.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="btn-primary text-white py-2 px-4 rounded-md"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Ad after services section */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <AdUnit
              adSlot="1234567890"
              style={{ display: 'block', textAlign: 'center', margin: '20px 0' }}
            />
          </div>
        </section>

        {/* Consultation Process Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                Our Consultation Process
              </h2>
              <p className="text-lg text-gray-600">
                We take the time to understand your needs and provide tailored solutions that work best for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">Initial Consultation</h3>
                <p className="text-gray-600">
                  We start by understanding your needs, preferences, and goals through a detailed consultation.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">Personalized Plan</h3>
                <p className="text-gray-600">
                  We create a customized plan that matches your specific requirements and timeline.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">Implementation & Support</h3>
                <p className="text-gray-600">
                  We handle all arrangements and provide ongoing support throughout your journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className="border-t border-gray-200"></div>

        {/* Consultation Services Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-secondary text-sm font-medium uppercase tracking-wider">
                San Luis Way Services
              </span>
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4 mt-2">
                Our Personalized Consultation Services
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Professional consultation and support services exclusively offered by San Luis Way
              </p>
              <div className="max-w-3xl mx-auto bg-secondary/5 rounded-lg p-6 border border-secondary/20">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> These are our specialized consultation services designed specifically for expatriates and newcomers.
                  We personally guide you through your relocation journey and connect you with the trusted local providers listed above.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Relocation Services */}
              <div className="bg-white rounded-xl p-8 shadow-elegant hover-lift">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">{t('expatServices.relocation.title')}</h3>
                <p className="text-gray-600 mb-6">{t('expatServices.relocation.description')}</p>
                <Link href="/san-luis-potosi-relocation-support" className="btn-primary text-white py-3 px-6 rounded-md inline-block">
                  {t('expatServices.relocation.cta')}
                </Link>
              </div>

              {/* Housing Services */}
              <div className="bg-white rounded-xl p-8 shadow-elegant hover-lift">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">{t('expatServices.housing.title')}</h3>
                <p className="text-gray-600 mb-6">{t('expatServices.housing.description')}</p>
                <Link href="/san-luis-potosi-housing-services" className="btn-primary text-white py-3 px-6 rounded-md inline-block">
                  {t('expatServices.housing.cta')}
                </Link>
              </div>

              {/* Legal Services */}
              <div className="bg-white rounded-xl p-8 shadow-elegant hover-lift">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">{t('expatServices.legal.title')}</h3>
                <p className="text-gray-600 mb-6">{t('expatServices.legal.description')}</p>
                <Link href="/san-luis-potosi-legal-administrative" className="btn-primary text-white py-3 px-6 rounded-md inline-block">
                  {t('expatServices.legal.cta')}
                </Link>
              </div>

              {/* Community Services */}
              <div className="bg-white rounded-xl p-8 shadow-elegant hover-lift">
                <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">{t('expatServices.community.title')}</h3>
                <p className="text-gray-600 mb-6">{t('expatServices.community.description')}</p>
                <Link href="/san-luis-potosi-community-integration" className="btn-primary text-white py-3 px-6 rounded-md inline-block">
                  {t('expatServices.community.cta')}
                </Link>
              </div>

              {/* Family Services */}
              <div className="bg-white rounded-xl p-8 shadow-elegant hover-lift">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">{t('expatServices.family.title')}</h3>
                <p className="text-gray-600 mb-6">{t('expatServices.family.description')}</p>
                <Link href="/san-luis-potosi-family-support" className="btn-primary text-white py-3 px-6 rounded-md inline-block">
                  {t('expatServices.family.cta')}
                </Link>
              </div>

              {/* Pet Care Services */}
              <div className="bg-white rounded-xl p-8 shadow-elegant hover-lift">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">{t('expatServices.petcare.title')}</h3>
                <p className="text-gray-600 mb-6">{t('expatServices.petcare.description')}</p>
                <Link href="/san-luis-potosi-pet-care" className="btn-primary text-white py-3 px-6 rounded-md inline-block">
                  {t('expatServices.petcare.cta')}
                </Link>
              </div>

              {/* Wellness Services */}
              <div className="bg-white rounded-xl p-8 shadow-elegant hover-lift">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">{t('expatServices.wellness.title')}</h3>
                <p className="text-gray-600 mb-6">{t('expatServices.wellness.description')}</p>
                <Link href="/san-luis-potosi-wellness-services" className="btn-primary text-white py-3 px-6 rounded-md inline-block">
                  {t('expatServices.wellness.cta')}
                </Link>
              </div>

              {/* Home Services */}
              <div className="bg-white rounded-xl p-8 shadow-elegant hover-lift">
                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">{t('expatServices.homeservices.title')}</h3>
                <p className="text-gray-600 mb-6">{t('expatServices.homeservices.description')}</p>
                <Link href="/san-luis-potosi-home-services" className="btn-primary text-white py-3 px-6 rounded-md inline-block">
                  {t('expatServices.homeservices.cta')}
                </Link>
              </div>

              {/* Cultural Experiences */}
              <div className="bg-white rounded-xl p-8 shadow-elegant hover-lift">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">{t('expatServices.cultural.title')}</h3>
                <p className="text-gray-600 mb-6">{t('expatServices.cultural.description')}</p>
                <Link href="/san-luis-potosi-cultural-services" className="btn-primary text-white py-3 px-6 rounded-md inline-block">
                  {t('expatServices.cultural.cta')}
                </Link>
              </div>

              {/* Exclusive Experiences */}
              <div className="bg-white rounded-xl p-8 shadow-elegant hover-lift">
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">{t('expatServices.experiences.title')}</h3>
                <p className="text-gray-600 mb-6">{t('expatServices.experiences.description')}</p>
                <Link href="/san-luis-potosi-experiences" className="btn-primary text-white py-3 px-6 rounded-md inline-block">
                  {t('expatServices.experiences.cta')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Ad before testimonials */}
        <section className="py-6 bg-gray-50">
          <div className="container mx-auto px-4">
            <AdUnit
              adSlot="1234567891"
              adFormat="rectangle"
              style={{
                display: 'block',
                textAlign: 'center',
                margin: '20px auto',
                maxWidth: '750px'
              }}
            />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-gray-600">
                Hear from expatriates who have successfully settled in San Luis Potosí with our help.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-xl p-6 shadow-elegant">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <span className="text-primary font-semibold">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">John Davis</h4>
                    <p className="text-sm text-gray-600">Software Engineer from Canada</p>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">
                  "The team's personalized approach made all the difference. They helped me find the perfect apartment in a great neighborhood and connected me with local tech communities. I couldn't have asked for better support!"
                </p>
                <div className="flex text-amber-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-xl p-6 shadow-elegant">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <span className="text-primary font-semibold">MS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Maria Smith</h4>
                    <p className="text-sm text-gray-600">Family from Spain</p>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">
                  "Moving with children was our biggest concern, but they made everything so smooth! From finding an international school to setting up our home, they thought of every detail. The family support services were invaluable."
                </p>
                <div className="flex text-amber-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-xl p-6 shadow-elegant">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <span className="text-primary font-semibold">AK</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Alex Kim</h4>
                    <p className="text-sm text-gray-600">Business Professional from South Korea</p>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">
                  "The cultural immersion experiences they arranged were incredible. From local cooking classes to historical tours, they helped me truly connect with the city. Their network of local contacts is impressive!"
                </p>
                <div className="flex text-amber-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us today to learn more about our services and how we can help you settle into life in San Luis Potosí.
            </p>
            <Link href="/contact" className="btn-primary text-white py-4 px-8 rounded-md inline-block text-lg">
              {t('expatServices.contactCta')}
            </Link>
          </div>
        </section>

        {/* Bottom ad before footer */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <AdUnit
              adSlot="1234567892"
              style={{ display: 'block', textAlign: 'center', margin: '20px 0' }}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export async function getStaticProps({ locale = 'en' }: { locale?: string }) {
  console.log('Supabase env vars (development mode):', {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'DEFINED' : 'UNDEFINED',
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'DEFINED' : 'UNDEFINED'
  });

  try {
    console.log('Supabase client created successfully:', !!supabase);

    // Fetch all services
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .order('name');

    if (servicesError) {
      console.error('Error fetching services:', servicesError);
      return {
        props: {
          ...(await serverSideTranslations(locale, ['common'])),
          services: [],
          featuredServices: [],
        },
      };
    }

    // Filter featured services (featured can be string "true" or boolean true)
    const featuredServices = services?.filter(service =>
      service.featured === true || service.featured === 'true'
    ) || [];

    console.log(`Fetched ${services?.length || 0} services, ${featuredServices.length} featured`);

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        services: services || [],
        featuredServices,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        services: [],
        featuredServices: [],
      },
    };
  }
}

export default ServicesPage;