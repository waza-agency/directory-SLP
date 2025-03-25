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
import { CalendarIcon } from '@heroicons/react/24/outline';

interface HomeProps {
  places: Place[];
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      places: [], // Static data will be handled client-side for now
    },
  };
};

const upcomingEvents = [
  {
    id: 'art-exhibition',
    title: 'Contemporary Art Exhibition: "Potosí Reimagined"',
    date: 'Apr 15-20',
    category: 'arts-culture',
    location: 'Centro de las Artes',
    image: '/images/calendar/arts-culture.jpg'
  },
  {
    id: 'gastronomy-festival',
    title: 'Potosino Gastronomy Festival',
    date: 'May 5-7',
    category: 'culinary',
    location: 'Plaza de Armas',
    image: '/images/calendar/culinary.jpg'
  },
  {
    id: 'symphony-stars',
    title: 'Symphony Under the Stars',
    date: 'June 10',
    category: 'music',
    location: 'Calzada de Guadalupe',
    image: '/images/calendar/music.jpg'
  },
  {
    id: 'sports-tournament',
    title: 'Regional Sports Tournament',
    date: 'May 15',
    category: 'sports',
    location: 'Parque Tangamanga',
    image: '/images/calendar/sports.jpg'
  },
  {
    id: 'traditional-festival',
    title: 'Festival de la Luz',
    date: 'June 15-20',
    category: 'traditional',
    location: 'Centro Histórico',
    image: '/images/calendar/traditional.jpg'
  },
  {
    id: 'wellness-expo',
    title: 'Wellness & Health Expo',
    date: 'May 20-21',
    category: 'wellness',
    location: 'Centro de Convenciones',
    image: '/images/calendar/wellness.jpg'
  },
  {
    id: 'community-fair',
    title: 'International Community Fair',
    date: 'June 5',
    category: 'community-social',
    location: 'Parque Tangamanga',
    image: '/images/calendar/community-social.jpg'
  }
];

const eventCategories = [
  {
    id: 'arts-culture',
    title: 'Arts & Culture',
    image: '/images/calendar/arts-culture.jpg',
    description: 'Exhibitions, galleries, and cultural performances throughout the city.',
    color: 'bg-pink-500'
  },
  {
    id: 'culinary',
    title: 'Culinary',
    image: '/images/calendar/culinary.jpg',
    description: 'Food festivals, cooking classes, and gastronomic experiences.',
    color: 'bg-orange-500'
  },
  {
    id: 'music',
    title: 'Music',
    image: '/images/calendar/music.jpg',
    description: 'Concerts, live performances, and musical festivals.',
    color: 'bg-purple-500'
  },
  {
    id: 'sports',
    title: 'Sports',
    image: '/images/calendar/sports.jpg',
    description: 'Sporting events, tournaments, and recreational activities.',
    color: 'bg-blue-500'
  },
  {
    id: 'traditional',
    title: 'Traditional',
    image: '/images/calendar/traditional.jpg',
    description: 'Cultural celebrations and traditional festivities.',
    color: 'bg-red-500'
  },
  {
    id: 'wellness',
    title: 'Wellness',
    image: '/images/calendar/wellness.jpg',
    description: 'Yoga classes, wellness workshops, and health-focused events.',
    color: 'bg-green-500'
  },
  {
    id: 'community-social',
    title: 'Community & Social',
    image: '/images/calendar/community-social.jpg',
    description: 'Meetups, social gatherings, and community activities.',
    color: 'bg-yellow-500'
  }
];

export default function Home({ places = [] }: HomeProps) {
  const { t } = useTranslation('common');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'call' | 'website'>('description');
  
  const featuredPlaces = places?.filter(place => place.featured) || [];
  const restaurants = places?.filter(place => place.category === 'restaurant') || [];
  const cafes = places?.filter(place => place.category === 'cafe') || [];
  const localBrands = places?.filter(place => place.category === 'shop' && place.tags?.includes('local')) || [];
  const potosinoBrands = places?.filter(place => place.category === 'shop' && place.tags?.includes('potosino')) || [];

  // Featured Potosino Brands
  const featuredPotosinoBrands = [
    {
      id: 'botanas-provi',
      name: 'Botanas Provi',
      description: 'Traditional Mexican snacks and treats made with authentic recipes passed down through generations.',
      image: '/images/brands/botanas-provi.jpg',
      category: 'food',
      tags: ['potosino', 'snacks', 'traditional'],
      featured: true
    },
    {
      id: 'panaderia-la-superior',
      name: 'Panaderías La Superior',
      description: 'Artisanal bakery offering fresh bread, pastries, and traditional Mexican baked goods since 1950.',
      image: '/images/brands/panaderia-la-superior.jpg',
      category: 'food',
      tags: ['potosino', 'bakery', 'traditional'],
      featured: true
    },
    {
      id: 'aguas-de-lourdes',
      name: 'Aguas de Lourdes',
      description: 'Refreshing traditional Mexican aguas frescas and beverages made with natural ingredients.',
      image: '/images/brands/aguas-de-lourdes.jpg',
      category: 'beverages',
      tags: ['potosino', 'drinks', 'traditional'],
      featured: true
    }
  ];

  // Function to get upcoming events for a category
  const getUpcomingEventsForCategory = (categoryId: string) => {
    return upcomingEvents.filter(event => event.category === categoryId).slice(0, 2);
  };

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
              <div className="bg-white rounded-xl p-8 shadow-elegant text-center hover-lift flex flex-col">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{t('welcome.card1.title')}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{t('welcome.card1.description')}</p>
                <a href="/contact?service=cultural" className="btn-primary text-white py-2 px-4 rounded-md text-sm inline-block mt-auto">
                  {t('welcome.card1.cta')}
                </a>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-elegant text-center hover-lift flex flex-col">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{t('expatServices.cultural.title')}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{t('expatServices.cultural.description')}</p>
                <a href="/contact?service=experiences" className="btn-primary text-white py-2 px-4 rounded-md text-sm inline-block mt-auto">
                  {t('expatServices.cultural.cta')}
                </a>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-elegant text-center hover-lift flex flex-col">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{t('welcome.card3.title')}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{t('welcome.card3.description')}</p>
                <a href="/contact?service=relocation" className="btn-primary text-white py-2 px-4 rounded-md text-sm inline-block mt-auto">
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

              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">{t('expatServices.family.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('expatServices.family.description')}</p>
                <a 
                  href="/contact?service=family" 
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                >
                  {t('expatServices.family.cta')}
                </a>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">{t('expatServices.petcare.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('expatServices.petcare.description')}</p>
                <a 
                  href="/contact?service=petcare" 
                  className="block text-center bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                >
                  {t('expatServices.petcare.cta')}
                </a>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">{t('expatServices.wellness.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('expatServices.wellness.description')}</p>
                <a 
                  href="/contact?service=wellness" 
                  className="block text-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                >
                  {t('expatServices.wellness.cta')}
                </a>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">{t('expatServices.homeservices.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('expatServices.homeservices.description')}</p>
                <a 
                  href="/contact?service=homeservices" 
                  className="block text-center bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                >
                  {t('expatServices.homeservices.cta')}
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

        {/* Potosino Brands Section */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                DISCOVER LOCAL CRAFTSMANSHIP
              </span>
              <h2 className="font-serif text-4xl font-bold text-gray-900 mt-2 mb-6">
                Potosino Brands
              </h2>
              <p className="text-lg text-gray-600">
                Explore authentic brands born in San Luis Potosí, showcasing the creativity and craftsmanship of local artisans and entrepreneurs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPotosinoBrands.map((brand) => (
                <div key={brand.id} className="bg-white rounded-xl overflow-hidden shadow-elegant hover-lift">
                  <div className="relative h-48">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{brand.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{brand.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                          {brand.category}
                        </span>
                      </div>
                      <button 
                        onClick={() => setSelectedPlace(brand as any)}
                        className="text-primary hover:text-primary-dark transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <a 
                href="/brands" 
                className="inline-block btn-primary text-white py-3 px-8 rounded-md font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                View All Potosino Brands
              </a>
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

        {/* Events Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Upcoming Events</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Discover the vibrant cultural scene of San Luis Potosí with our curated calendar of events and local experiences.
            </p>

            {/* Event Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button className="bg-primary text-white px-6 py-2 rounded-full">All Events</button>
              <button className="bg-white text-gray-700 px-6 py-2 rounded-full hover:bg-gray-100">Arts & Culture</button>
              <button className="bg-white text-gray-700 px-6 py-2 rounded-full hover:bg-gray-100">Culinary</button>
              <button className="bg-white text-gray-700 px-6 py-2 rounded-full hover:bg-gray-100">Music</button>
              <button className="bg-white text-gray-700 px-6 py-2 rounded-full hover:bg-gray-100">Sports</button>
              <button className="bg-white text-gray-700 px-6 py-2 rounded-full hover:bg-gray-100">Traditional</button>
            </div>

            {/* Event Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Art Exhibition Event */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/images/events/upcoming/art-exhibition-potosi.jpg"
                    alt="Contemporary Art Exhibition: Potosí Reimagined"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Arts & Culture
                  </div>
                  <div className="absolute top-4 right-4 bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    Apr 15-20
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">Contemporary Art Exhibition: "Potosí Reimagined"</h3>
                  <p className="text-gray-600 text-sm mb-4">A showcase of local artists reimagining the cultural heritage of San Luis Potosí through modern artistic expression.</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Centro de las Artes
                  </div>
                </div>
              </div>

              {/* Gastronomy Festival Event */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/images/events/upcoming/gastronomy-festival.jpg"
                    alt="Potosino Gastronomy Festival"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Culinary
                  </div>
                  <div className="absolute top-4 right-4 bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    May 5-7
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">Potosino Gastronomy Festival</h3>
                  <p className="text-gray-600 text-sm mb-4">Experience the rich culinary traditions of San Luis Potosí with tastings, cooking demonstrations, and food markets.</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Plaza de Armas
                  </div>
                </div>
              </div>

              {/* Symphony Event */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/images/events/upcoming/symphony-stars.jpg"
                    alt="Symphony Under the Stars"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Music
                  </div>
                  <div className="absolute top-4 right-4 bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    June 10
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">Symphony Under the Stars</h3>
                  <p className="text-gray-600 text-sm mb-4">An enchanting evening of classical music performed by the San Luis Potosí Symphony Orchestra in the open air.</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Calzada de Guadalupe
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Event Categories</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Explore events by category and discover the diverse experiences San Luis Potosí has to offer.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventCategories.map((category) => {
                const categoryEvents = getUpcomingEventsForCategory(category.id);
                return (
                  <div 
                    key={category.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                  >
                    <div className="relative h-48">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className={`absolute top-4 left-4 ${category.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                        {category.title}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                      <p className="text-gray-600 mb-4">{category.description}</p>
                      
                      {/* Latest Events Preview */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          <span>Upcoming Events</span>
                        </div>
                        {categoryEvents.length > 0 ? (
                          <div className="space-y-2">
                            {categoryEvents.map((event) => (
                              <div key={event.id} className="text-sm">
                                <div className="font-medium text-gray-900">{event.title}</div>
                                <div className="flex items-center justify-between text-gray-500 mt-1">
                                  <span>{event.date}</span>
                                  <span>{event.location}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-600">
                            No upcoming events in this category
                          </div>
                        )}
                      </div>
                      
                      <button 
                        className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                        onClick={() => {/* Add navigation to category page */}}
                      >
                        View All Events
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Potosinos Section - NEW */}
        <section className="py-24 px-4 bg-white border-t border-gray-100">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <span className="text-secondary text-sm font-medium uppercase tracking-wider">
                COMMUNITY SPOTLIGHT
              </span>
              <h2 className="font-serif text-4xl font-bold text-gray-900 mt-2 mb-4">
                Featured Potosinos
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Meet the remarkable individuals who contribute to San Luis Potosí's vibrant culture, entrepreneurial spirit, and rich heritage.
              </p>
              <p className="text-sm text-secondary mt-3 max-w-xl mx-auto">
                <span className="inline-block bg-secondary/10 px-3 py-1 rounded-full">From yesterday and today, honoring tradition while shaping the future</span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {/* Person 1 */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-5 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <Image
                    src="/images/potosinos/potosino-1.jpg"
                    alt="María González"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                </div>
                <h3 className="font-medium text-xl text-gray-900 mb-1">María González</h3>
                <p className="text-primary font-medium text-sm mb-3">Chef & Cultural Ambassador</p>
                <p className="text-gray-600 text-sm mb-4 px-2">
                  Preserving traditional Potosino cuisine while innovating the local gastronomy scene through her award-winning restaurant.
                </p>
                <a href="/community/maria-gonzalez" className="text-secondary hover:text-secondary-dark text-sm font-medium">
                  Read her story →
                </a>
              </div>
              
              {/* Person 2 */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-5 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <Image
                    src="/images/potosinos/potosino-2.jpg"
                    alt="Carlos Ramírez"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                </div>
                <h3 className="font-medium text-xl text-gray-900 mb-1">Carlos Ramírez</h3>
                <p className="text-primary font-medium text-sm mb-3">Artisan & Master Craftsman</p>
                <p className="text-gray-600 text-sm mb-4 px-2">
                  Creating stunning traditional pottery that honors the region's artistic legacy while mentoring the next generation of artisans.
                </p>
                <a href="/community/carlos-ramirez" className="text-secondary hover:text-secondary-dark text-sm font-medium">
                  Read his story →
                </a>
              </div>
              
              {/* Person 3 */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-5 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <Image
                    src="/images/potosinos/potosino-3.jpg"
                    alt="Alejandra Vega"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                </div>
                <h3 className="font-medium text-xl text-gray-900 mb-1">Alejandra Vega</h3>
                <p className="text-primary font-medium text-sm mb-3">Entrepreneur & Innovator</p>
                <p className="text-gray-600 text-sm mb-4 px-2">
                  Transforming the local tech scene through her startup incubator while creating opportunities for young Potosinos in technology.
                </p>
                <a href="/community/alejandra-vega" className="text-secondary hover:text-secondary-dark text-sm font-medium">
                  Read her story →
                </a>
              </div>
              
              {/* Person 4 */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-5 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <Image
                    src="/images/potosinos/potosino-4.jpg"
                    alt="Miguel Ortiz"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                </div>
                <h3 className="font-medium text-xl text-gray-900 mb-1">Miguel Ortiz</h3>
                <p className="text-primary font-medium text-sm mb-3">Historian & Cultural Guide</p>
                <p className="text-gray-600 text-sm mb-4 px-2">
                  Sharing the rich history of San Luis Potosí through immersive tours and educational programs that bring the past to life.
                </p>
                <a href="/community/miguel-ortiz" className="text-secondary hover:text-secondary-dark text-sm font-medium">
                  Read his story →
                </a>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <a href="/community" className="inline-flex items-center justify-center space-x-2 bg-white border border-secondary text-secondary px-6 py-3 rounded-md shadow-sm hover:bg-secondary hover:text-white transition-colors font-medium">
                <span>Meet More Remarkable Potosinos</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <p className="text-sm text-gray-500 mt-6 max-w-xl mx-auto">
                Know someone who deserves to be featured? <a href="/contact?subject=Community Nomination" className="text-primary hover:underline">Nominate them here</a>
              </p>
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
                      <a href="/cultural/history" className="block hover:opacity-80 transition-opacity">
                        <h3 className="font-medium text-gray-900 mb-2">
                          {t('cultural.history.expatTitle')}
                        </h3>
                        <p className="text-gray-600">
                          {t('cultural.history.expatDescription')}
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                      </svg>
                    </div>
                    <div>
                      <a href="/cultural/festivals" className="block hover:opacity-80 transition-opacity">
                        <h3 className="font-medium text-gray-900 mb-2">
                          {t('cultural.festivals.title')}
                        </h3>
                        <p className="text-gray-600">
                          {t('cultural.festivals.description')}
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <a href="/cultural/language" className="block hover:opacity-80 transition-opacity">
                        <h3 className="font-medium text-gray-900 mb-2">
                          {t('cultural.language.title')}
                        </h3>
                        <p className="text-gray-600">
                          {t('cultural.language.description')}
                        </p>
                      </a>
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
                      src="/images/cultura-1.jpg"
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
                      src="/images/cultura-3.jpg"
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

        {/* Practical Categories for Expats & Families - NEW */}
        <section className="py-20 px-4 bg-white border-t border-gray-100">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                CURATED FOR REAL NEEDS
              </span>
              <h2 className="font-serif text-3xl font-bold text-gray-900 mt-2 mb-4">
                Local Gems By Practical Categories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover places in San Luis Potosí that meet your specific needs as a newcomer, family, or expat - details you won't easily find elsewhere.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Practical Category 1 */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-44">
                  <Image
                    src="/images/practical/practical-kids.jpg"
                    alt="Family-Friendly Restaurants"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Restaurants with Playgrounds</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Enjoy a relaxed meal while your children play in dedicated, safe areas. Perfect for family outings.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>8 locations</span>
                    </div>
                    <a href="/category/restaurants-with-playgrounds" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Practical Category 2 */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-44">
                  <Image
                    src="/images/practical/practical-meetings.jpg"
                    alt="Business Venues"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Restaurants with Private Rooms</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Ideal venues for business meetings, private celebrations, or quiet dining experiences away from the crowd.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>12 locations</span>
                    </div>
                    <a href="/category/private-dining-rooms" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Practical Category 3 */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-44">
                  <Image
                    src="/images/practical/practical-spanish.jpg"
                    alt="Language Practice Spots"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Language Exchange Spots</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Cafés and venues where you can practice Spanish with locals and meet other expats in a relaxed environment.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>5 locations</span>
                    </div>
                    <a href="/category/language-exchange-cafes" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Practical Category 4 */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-44">
                  <Image
                    src="/images/practical/practical-wifi.jpg"
                    alt="Remote Work Spots"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Best Remote Work Spots</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Offices with reliable Wi-Fi, ample power outlets, and a work-friendly atmosphere for digital nomads and remote workers.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>15 locations</span>
                    </div>
                    <a href="/category/remote-work-cafes" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Practical Category 5 */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-44">
                  <Image
                    src="/images/practical/practical-parking.jpg"
                    alt="Easy Parking Venues"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Easy Parking Venues</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Find parking spots easily in San Luis Potosí with these convenient locations.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>10 locations</span>
                    </div>
                    <a href="/category/easy-parking" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </a>
                  </div>
                </div>
              </div>

              {/* Practical Category 6 - International Markets */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-44">
                  <Image
                    src="/images/practical/practical-markets.jpg"
                    alt="International Markets"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">International Markets</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Find imported goods and international products from your home country at these specialty markets and stores.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>7 locations</span>
                    </div>
                    <a href="/category/international-markets" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </a>
                  </div>
                </div>
              </div>

              {/* Practical Category 7 - Healthcare Services */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-44">
                  <Image
                    src="/images/practical/practical-healthcare.jpg"
                    alt="Healthcare Services"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">English-Speaking Healthcare</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Medical facilities, clinics, and pharmacies with English-speaking staff and international insurance acceptance.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>9 locations</span>
                    </div>
                    <a href="/category/english-healthcare" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </a>
                  </div>
                </div>
              </div>

              {/* Practical Category 8 - Family Activities */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-44">
                  <Image
                    src="/images/practical/practical-family.jpg"
                    alt="Family Activities"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Family Activities</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Kid-friendly venues, entertainment centers, and educational activities perfect for families with children.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>14 locations</span>
                    </div>
                    <a href="/category/family-activities" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </a>
                  </div>
                </div>
              </div>

              {/* Practical Category 9 - Sports & Fitness */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-44">
                  <Image
                    src="/images/practical/practical-sports.jpg"
                    alt="Sports & Fitness"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Sports & Fitness</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Gyms, sports clubs, and recreational facilities with English-speaking trainers and international atmosphere.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>11 locations</span>
                    </div>
                    <a href="/category/sports-fitness" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </a>
                  </div>
                </div>
              </div>

              {/* Practical Category 10 - Outdoor Activities */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-44">
                  <Image
                    src="/images/practical/practical-outdoor.jpeg"
                    alt="Outdoor Activities"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpeg', '.jpg').replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Outdoor Adventures</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    From hiking trails and rock climbing spots to scenic picnic locations and mountain biking routes - discover the best outdoor activities in and around SLP.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>16 locations</span>
                    </div>
                    <a href="/category/outdoor-activities" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </a>
                  </div>
                </div>
              </div>

              {/* Practical Category 11 - Rainy Day Activities */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-44">
                  <Image
                    src="/images/practical/practical-rainy.jpg"
                    alt="Rainy Day Activities"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Rainy Day Escapes</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Indoor entertainment venues, museums, art galleries, and cozy cafés perfect for those unexpected rainy days in San Luis Potosí.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>13 locations</span>
                    </div>
                    <a href="/category/rainy-day-activities" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </a>
                  </div>
                </div>
              </div>

              {/* Practical Category 12 - Local and Organic Product Shops */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-44">
                  <Image
                    src="/images/practical/practical-organic.jpg"
                    alt="Local and Organic Products"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Local & Organic Shops</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Discover shops offering fresh local produce, organic products, and sustainable goods. Perfect for health-conscious shoppers and eco-friendly living.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>10 locations</span>
                    </div>
                    <a href="/category/local-organic-shops" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Restaurants and Bars Section - NEW */}
        <section className="py-20 px-4 bg-white border-t border-gray-100">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                CULINARY DELIGHTS
              </span>
              <h2 className="font-serif text-3xl font-bold text-gray-900 mt-2 mb-4">
                Best Restaurants & Bars
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From traditional Potosino cuisine to modern fusion restaurants and trendy cocktail bars - discover the finest dining and drinking spots in San Luis Potosí.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Traditional Restaurants */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-52">
                  <Image
                    src="/images/dining/traditional.jpg"
                    alt="Traditional Restaurants"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    quality={90}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Traditional Cuisine</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Authentic Potosino restaurants serving traditional dishes like enchiladas potosinas, zacahuil, and other regional specialties.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>12 locations</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Open daily 8:00 AM - 10:00 PM</span>
                    </div>
                  </div>
                  <a href="/category/traditional-restaurants" className="text-primary font-medium text-sm hover:underline mt-4 inline-block">
                    View all traditional restaurants →
                  </a>
                </div>
              </div>

              {/* Modern Restaurants */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-52">
                  <Image
                    src="/images/dining/modern.jpg"
                    alt="Modern Restaurants"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    quality={90}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Modern Dining</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Contemporary restaurants offering fusion cuisine, farm-to-table experiences, and innovative culinary creations.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>8 locations</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Open daily 1:00 PM - 11:00 PM</span>
                    </div>
                  </div>
                  <a href="/category/modern-restaurants" className="text-primary font-medium text-sm hover:underline mt-4 inline-block">
                    View all modern restaurants →
                  </a>
                </div>
              </div>

              {/* Cocktail Bars */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-52">
                  <Image
                    src="/images/dining/cocktails.jpg"
                    alt="Cocktail Bars"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    quality={90}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Cocktail Bars</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Trendy bars and lounges featuring craft cocktails, local mezcal, and a vibrant nightlife scene.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>15 locations</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Open daily 6:00 PM - 2:00 AM</span>
                    </div>
                  </div>
                  <a href="/category/cocktail-bars" className="text-primary font-medium text-sm hover:underline mt-4 inline-block">
                    View all cocktail bars →
                  </a>
                </div>
              </div>

              {/* Terraces */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-52">
                  <Image
                    src="/images/dining/terraces.jpg"
                    alt="Terraces"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    quality={90}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Terraces & Rooftops</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Enjoy dining and drinks with stunning city views at these beautiful terrace and rooftop venues.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>6 locations</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Open daily 4:00 PM - 11:00 PM</span>
                    </div>
                  </div>
                  <a href="/category/terraces" className="text-primary font-medium text-sm hover:underline mt-4 inline-block">
                    View all terraces →
                  </a>
                </div>
              </div>

              {/* Cantinas */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-52">
                  <Image
                    src="/images/dining/cantinas.jpg"
                    alt="Cantinas"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    quality={90}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Traditional Cantinas</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Experience authentic Mexican cantinas with traditional snacks, cold beers, and local atmosphere.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>10 locations</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Open daily 12:00 PM - 10:00 PM</span>
                    </div>
                  </div>
                  <a href="/category/cantinas" className="text-primary font-medium text-sm hover:underline mt-4 inline-block">
                    View all cantinas →
                  </a>
                </div>
              </div>

              {/* Live Music Venues */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-52">
                  <Image
                    src="/images/dining/live-music.jpg"
                    alt="Live Music Venues"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    quality={90}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Live Music Venues</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Enjoy live music performances ranging from traditional Mexican bands to contemporary artists while dining or drinking.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>8 locations</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Open daily 7:00 PM - 2:00 AM</span>
                    </div>
                  </div>
                  <a href="/category/live-music" className="text-primary font-medium text-sm hover:underline mt-4 inline-block">
                    View all live music venues →
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <a 
                href="/dining" 
                className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-md transition-colors"
              >
                Explore All Dining Spots
              </a>
              <p className="text-sm text-gray-500 mt-4">
                Looking for specific cuisine or atmosphere? <a href="/contact" className="text-primary hover:underline">Contact us</a> for personalized recommendations.
              </p>
            </div>
          </div>
        </section>

        {/* Unique Meeting Spots Section - NEW */}
        <section className="py-20 px-4 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <span className="text-secondary text-sm font-medium uppercase tracking-wider">
                EXTRAORDINARY VENUES
              </span>
              <h2 className="font-serif text-3xl font-bold text-gray-900 mt-2 mb-4">
                Unique Meeting Spots
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover extraordinary locations in San Luis Potosí perfect for memorable meetings, creative sessions, or special occasions that go beyond the conventional office space.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Presa San José */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-52">
                  <Image
                    src="/images/meeting-spots/presa.jpg"
                    alt="Presa San José"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    quality={90}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Presa San José</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Meet by the serene waters of this historic reservoir. Ideal for outdoor strategy sessions or team-building activities with a scenic backdrop.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>Presa San José</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Available during daylight hours</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Japanese Garden */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-52">
                  <Image
                    src="/images/meeting-spots/japanese-garden.jpg"
                    alt="Japanese Garden"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    quality={90}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Japanese Garden</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    A serene garden setting ideal for peaceful gatherings and cultural appreciation.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>Parque Tangamanga I</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Available 8:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tangamanga Park Zoo */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-52">
                  <Image
                    src="/images/meeting-spots/zoo.jpg"
                    alt="Tangamanga Park Zoo"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    quality={90}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = target.src.replace('.jpg', '.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Tangamanga Park Zoo</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    An engaging venue surrounded by wildlife. Perfect for educational meetings, team building activities, and nature-inspired gatherings.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>Tangamanga I Park</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Open daily 9:00 AM - 5:00 PM</span>
                    </div>
                  </div>
                  <a href="/category/meeting-spots#zoo" className="text-primary font-medium text-sm hover:underline mt-4 inline-block">
                    Learn more about the zoo →
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <a 
                href="/unique-meeting-spots" 
                className="inline-block bg-secondary hover:bg-secondary-dark text-white font-medium px-8 py-3 rounded-md transition-colors"
              >
                View All Unique Meeting Spots
              </a>
              <p className="text-sm text-gray-500 mt-4">
                Want to book a unique venue? <a href="/contact" className="text-primary hover:underline">Contact us</a> for assistance with reservations and special arrangements.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}