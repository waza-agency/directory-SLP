import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { Place } from '@/types';
import { fetchPlacesFromSheet } from '@/lib/api/google-sheets';
import PlaceCard from '@/components/PlaceCard';
import PlaceModal from '@/components/PlaceModal';
import { useState } from 'react';
import Image from 'next/image';

interface HomeProps {
  places: Place[];
}

export default function Home({ places }: HomeProps) {
  const { t } = useTranslation('common');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'call' | 'website'>('description');
  
  const featuredPlaces = places.filter(place => place.featured);
  const restaurants = places.filter(place => place.category === 'restaurant');
  const cafes = places.filter(place => place.category === 'cafe');
  const localBrands = places.filter(place => place.category === 'shop' && place.tags?.includes('local'));

  return (
    <>
      <Head>
        <title>SLP Descubre - Discover San Luis Potosí</title>
        <meta name="description" content="Your gateway to discovering the magic of San Luis Potosí - its colonial architecture, rich traditions, and local treasures" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[600px] bg-secondary">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="San Luis Potosí"
              fill
              className="object-cover opacity-50"
              priority
              sizes="100vw"
            />
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <span className="bg-primary/80 text-white px-4 py-2 rounded-full text-xl font-bold mb-6 backdrop-blur-sm">
                {t('hero.expatGuide')}
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl">
                {t('hero.description')}
              </p>
              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl">
                {t('hero.personalTouch')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contact" className="btn-primary text-white px-8 py-3 rounded-md font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  {t('hero.connectWithUs')}
                </a>
                <a href="/services" className="bg-secondary text-white px-8 py-3 rounded-md font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  {t('hero.ourServices')}
                </a>
              </div>
              <div className="mt-16">
                <a 
                  href="#discover" 
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Scroll down"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-10 w-10 animate-bounce" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Welcome/About Section */}
        <section id="discover" className="py-24 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                {t('welcome.subtitle')}
              </span>
              <h2 className="font-serif text-4xl font-bold text-gray-900 mt-2 mb-6">
                {t('welcome.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                {t('welcome.description')}
              </p>
              <p className="text-md text-primary font-medium">
                {t('welcome.intermediary')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white rounded-xl p-8 shadow-elegant text-center hover-lift">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{t('welcome.card1.title')}</h3>
                <p className="text-gray-600 mb-4">{t('welcome.card1.description')}</p>
                <a href="/contact?service=cultural" className="btn-primary text-white py-2 px-4 rounded-md text-sm inline-block">
                  {t('welcome.card1.cta')}
                </a>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-elegant text-center hover-lift">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{t('welcome.card2.title')}</h3>
                <p className="text-gray-600 mb-4">{t('welcome.card2.description')}</p>
                <a href="/contact?service=dining" className="btn-primary text-white py-2 px-4 rounded-md text-sm inline-block">
                  {t('welcome.card2.cta')}
                </a>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-elegant text-center hover-lift">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{t('welcome.card3.title')}</h3>
                <p className="text-gray-600 mb-4">{t('welcome.card3.description')}</p>
                <a href="/contact?service=community" className="btn-primary text-white py-2 px-4 rounded-md text-sm inline-block">
                  {t('welcome.card3.cta')}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Expat Services Section - NEW */}
        <section className="py-24 px-4 bg-secondary/5">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                {t('expatServices.subtitle')}
              </span>
              <h2 className="font-serif text-4xl font-bold text-gray-900 mt-2 mb-6">
                {t('expatServices.title')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('expatServices.description')}
              </p>
              <div className="mt-4 bg-white p-4 rounded-lg border border-primary/20 max-w-2xl mx-auto">
                <p className="text-sm text-gray-800 italic">
                  We connect you with trusted local professionals and service providers, serving as your personal intermediary to navigate bureaucracy and language barriers.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">{t('expatServices.relocation.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('expatServices.relocation.description')}</p>
                <a 
                  href="/contact?service=relocation" 
                  className="block text-center bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                >
                  {t('expatServices.relocation.cta')}
                </a>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">{t('expatServices.housing.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('expatServices.housing.description')}</p>
                <a 
                  href="/contact?service=housing" 
                  className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                >
                  {t('expatServices.housing.cta')}
                </a>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">{t('expatServices.legal.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('expatServices.legal.description')}</p>
                <a 
                  href="/contact?service=legal" 
                  className="block text-center bg-secondary hover:bg-secondary-light text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                >
                  {t('expatServices.legal.cta')}
                </a>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">{t('expatServices.community.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('expatServices.community.description')}</p>
                <a 
                  href="/contact?service=community" 
                  className="block text-center bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                >
                  {t('expatServices.community.cta')}
                </a>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <a 
                href="/contact" 
                className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-md transition-colors"
              >
                {t('expatServices.contactCta')}
              </a>
              <p className="text-sm text-gray-500 mt-4 max-w-xl mx-auto">
                {t('expatServices.feeDisclosure')}
              </p>
            </div>
          </div>
        </section>

        {/* City Hacks Section - NEW */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <div className="max-w-2xl">
                <span className="text-secondary text-sm font-medium uppercase tracking-wider">
                  {t('cityHacks.subtitle')}
                </span>
                <h2 className="font-serif text-4xl font-bold text-gray-900 mt-2 mb-6">
                  {t('cityHacks.title')}
                </h2>
                <p className="text-lg text-gray-600">
                  {t('cityHacks.description')}
                </p>
              </div>
              <a 
                href="/city-hacks" 
                className="mt-6 md:mt-0 inline-block text-secondary hover:text-secondary-light font-medium"
              >
                {t('cityHacks.viewAll')} →
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-elegant hover-lift">
                <div className="relative h-48">
                  <Image
                    src="/images/transport-hack.jpg"
                    alt="Transport Hacks"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                    {t('cityHacks.transport.title')}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {t('cityHacks.transport.description')}
                  </p>
                  <a href="/city-hacks/transport" className="text-secondary hover:text-secondary-light font-medium text-sm">
                    {t('common.readMore')} →
                  </a>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-elegant hover-lift">
                <div className="relative h-48">
                  <Image
                    src="/images/shopping-hack.jpg"
                    alt="Shopping Hacks"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                    {t('cityHacks.shopping.title')}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {t('cityHacks.shopping.description')}
                  </p>
                  <a href="/city-hacks/shopping" className="text-secondary hover:text-secondary-light font-medium text-sm">
                    {t('common.readMore')} →
                  </a>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-elegant hover-lift">
                <div className="relative h-48">
                  <Image
                    src="/images/language-hack.jpeg"
                    alt="Language Hacks"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                    {t('cityHacks.language.title')}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {t('cityHacks.language.description')}
                  </p>
                  <a href="/city-hacks/language" className="text-secondary hover:text-secondary-light font-medium text-sm">
                    {t('common.readMore')} →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Calendar Section - NEW */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                WHAT'S HAPPENING IN SLP
              </span>
              <h2 className="font-serif text-4xl font-bold text-gray-900 mt-2 mb-4">
                Upcoming Events
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the vibrant cultural scene of San Luis Potosí with our curated calendar of events and local experiences.
              </p>
            </div>
            
            <div className="mb-10 flex justify-center">
              <div className="inline-flex flex-wrap justify-center gap-2 md:gap-3">
                <button className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium transition-colors">
                  All Events
                </button>
                <button className="bg-white hover:bg-primary/5 border border-gray-200 text-gray-700 hover:border-primary hover:text-primary px-5 py-2 rounded-full text-sm font-medium transition-colors">
                  Arts & Culture
                </button>
                <button className="bg-white hover:bg-primary/5 border border-gray-200 text-gray-700 hover:border-primary hover:text-primary px-5 py-2 rounded-full text-sm font-medium transition-colors">
                  Culinary
                </button>
                <button className="bg-white hover:bg-primary/5 border border-gray-200 text-gray-700 hover:border-primary hover:text-primary px-5 py-2 rounded-full text-sm font-medium transition-colors">
                  Music
                </button>
                <button className="bg-white hover:bg-primary/5 border border-gray-200 text-gray-700 hover:border-primary hover:text-primary px-5 py-2 rounded-full text-sm font-medium transition-colors">
                  Sports
                </button>
                <button className="bg-white hover:bg-primary/5 border border-gray-200 text-gray-700 hover:border-primary hover:text-primary px-5 py-2 rounded-full text-sm font-medium transition-colors">
                  Traditional
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Event Card 1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="relative h-52">
                  <Image
                    src="/images/event-arts.jpg"
                    alt="Art Exhibition"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-rose-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                        Arts & Culture
                      </span>
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                        Apr 15-20
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-xl text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    Contemporary Art Exhibition: "Potosí Reimagined"
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    A showcase of local artists reimagining the cultural heritage of San Luis Potosí through modern artistic expression.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      Centro de las Artes
                    </div>
                    <a href="/events/contemporary-art" className="text-primary font-medium text-sm hover:underline">
                      View details
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Event Card 2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="relative h-52">
                  <Image
                    src="/images/event-culinary.jpg"
                    alt="Culinary Festival"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                        Culinary
                      </span>
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                        May 5-7
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-xl text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    Potosino Gastronomy Festival
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Experience the rich culinary traditions of San Luis Potosí with tastings, cooking demonstrations, and food markets.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      Plaza de Armas
                    </div>
                    <a href="/events/gastronomy-festival" className="text-primary font-medium text-sm hover:underline">
                      View details
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Event Card 3 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="relative h-52">
                  <Image
                    src="/images/event-music.jpg"
                    alt="Music Festival"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-indigo-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                        Music
                      </span>
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                        June 10
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-xl text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    Symphony Under the Stars
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    An enchanting evening of classical music performed by the San Luis Potosí Symphony Orchestra in the open air.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      Calzada de Guadalupe
                    </div>
                    <a href="/events/symphony" className="text-primary font-medium text-sm hover:underline">
                      View details
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <a 
                href="/events" 
                className="inline-flex items-center justify-center space-x-2 bg-white border border-primary text-primary px-6 py-3 rounded-md shadow-sm hover:bg-primary hover:text-white transition-colors font-medium"
              >
                <span>View All Events</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <div className="mt-6 flex items-center space-x-2 text-sm text-gray-500">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Want to add your event? <a href="/contact" className="text-primary hover:underline">Contact us</a></span>
              </div>
            </div>
          </div>
        </section>

        {/* Cultural Heritage Section - Updated for Expats */}
        <section className="py-24 px-4 bg-gray-50 border-t-4 border-secondary">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-primary text-sm font-medium uppercase tracking-wider">
                  {t('cultural.subtitle')}
                </span>
                <h2 className="font-serif text-4xl font-bold text-gray-900 mt-2 mb-6">
                  {t('cultural.title')}
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {t('cultural.expatDescription')}
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        {t('cultural.history.expatTitle')}
                      </h3>
                      <p className="text-gray-600">
                        {t('cultural.history.expatDescription')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        {t('cultural.festivals.title')}
                      </h3>
                      <p className="text-gray-600">
                        {t('cultural.festivals.description')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        {t('cultural.language.title')}
                      </h3>
                      <p className="text-gray-600">
                        {t('cultural.language.description')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/cultural-calendar" 
                    className="btn-primary"
                  >
                    {t('cultural.viewCalendar')}
                  </a>
                  <a 
                    href="/cultural-tours" 
                    className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:border-gray-300 transition-colors text-center"
                  >
                    {t('cultural.bookTour')}
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-7">
                  <div className="aspect-[4/5] relative rounded-xl overflow-hidden shadow-elegant">
                    <Image
                      src="/images/coulture-1.jpg"
                      alt="Cultura Potosina"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-4 px-4">
                      <span className="text-white text-sm font-medium">{t('cultural.imageCaption1')}</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-5 flex flex-col gap-4">
                  <div className="aspect-[4/5] relative rounded-xl overflow-hidden shadow-elegant">
                    <Image
                      src="/images/cultura-2.jpg"
                      alt="Tradiciones Potosinas"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-4 px-4">
                      <span className="text-white text-sm font-medium">{t('cultural.imageCaption2')}</span>
                    </div>
                  </div>
                  <div className="aspect-[4/5] relative rounded-xl overflow-hidden shadow-elegant">
                    <Image
                      src="/images/coulture-3.jpg"
                      alt="Arquitectura Potosina"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-4 px-4">
                      <span className="text-white text-sm font-medium">{t('cultural.imageCaption3')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Places Section */}
        {featuredPlaces.length > 0 && (
          <section className="py-20 px-4 bg-gray-50">
            <div className="container mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
                    Featured Destinations
                  </h2>
                  <p className="text-gray-600 max-w-2xl">
                    Explore these handpicked gems that showcase the best of San Luis Potosí's culture, cuisine, and hospitality.
                  </p>
                </div>
                <button className="text-primary hover:text-primary-dark font-medium">
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPlaces.slice(0, 3).map((place) => (
                  <div
                    key={place.id}
                    onClick={() => setSelectedPlace(place)}
                    className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48">
                      {place.imageUrl ? (
                        <Image
                          src={place.imageUrl}
                          alt={place.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="text-sm font-medium px-3 py-1 rounded-full bg-white shadow-sm">
                          {place.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                        {place.name}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 mb-4">
                        {place.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {place.address}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Expat-Focused Categories */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                {t('categories.subtitle')}
              </span>
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
                {t('categories.popularTitle')}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('categories.popularDescription')}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[
                'essentials', 
                'healthcare', 
                'accommodation', 
                'education', 
                'recreation', 
                'transportation', 
                'services', 
                'community'
              ].map((category) => {
                // Define icons for each category
                const categoryIcons: Record<string, React.ReactNode> = {
                  essentials: (
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  healthcare: (
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ),
                  accommodation: (
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  ),
                  education: (
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  ),
                  recreation: (
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  transportation: (
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  ),
                  services: (
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  community: (
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )
                };
                
                return (
                  <a
                    key={category}
                    href={`/category/${category}`}
                    className="group p-6 bg-white rounded-xl shadow-elegant hover:shadow-md transition-all duration-300 text-center hover-lift"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      {categoryIcons[category] || (
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      )}
                    </div>
                    <h3 className="font-medium text-lg text-gray-900 group-hover:text-primary transition-colors mb-2">
                      {t(`categories.expat.${category}.title`)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {t(`categories.expat.${category}.description`)}
                    </p>
                    <span className="inline-block text-primary text-sm font-medium group-hover:underline">
                      {t('common.viewAll')} →
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Marcas Potosinas with enhanced cultural focus */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary font-medium mb-2 block">
                SUPPORT LOCAL
              </span>
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                Potosino Brands & Artisans
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover and support local artisans, creators, and entrepreneurs who embody the spirit and traditions of San Luis Potosí.
              </p>
              <p className="text-sm text-primary mt-2">
                Each purchase supports the local economy and helps preserve cultural traditions.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {localBrands.map((brand) => (
                <div
                  key={brand.id}
                  onClick={() => setSelectedPlace(brand)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-shadow">
                    {brand.imageUrl ? (
                      <Image
                        src={brand.imageUrl}
                        alt={brand.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {brand.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Additions */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
                  New Discoveries
                </h2>
                <p className="text-gray-600">
                  The latest treasures that have been added to our growing community of businesses and Potosino brands.
                </p>
              </div>
              <button className="text-primary hover:text-primary-dark font-medium">
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {places.slice(-4).map((place) => (
                <div
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className="group cursor-pointer"
                >
                  <div className="relative h-48 rounded-xl overflow-hidden bg-gray-100">
                    {place.imageUrl ? (
                      <Image
                        src={place.imageUrl}
                        alt={place.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm">
                        {place.category}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                      {place.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {place.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Place Modal */}
        {selectedPlace && (
          <PlaceModal
            place={selectedPlace}
            onClose={() => setSelectedPlace(null)}
          />
        )}

        {/* Floating CTA Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <a 
            href="/contact"
            className="bg-primary hover:bg-primary-dark text-white font-medium px-5 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{t('cta.needHelp')}</span>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const places = await fetchPlacesFromSheet();
  
  // Default to English if locale is not provided
  const currentLocale = locale || 'en';
  
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ['common'])),
      places,
    },
    revalidate: 3600, // Revalidate every hour
  };
}; 