import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { Place } from '@/types';
import PlaceCard from '@/components/PlaceCard';
import PlaceModal from '@/components/PlaceModal';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CalendarIcon, MegaphoneIcon, StarIcon, NewspaperIcon } from '@heroicons/react/24/outline';
import { getImageUrl } from '@/utils/image';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';
import HeroBanner from '@/components/HeroBanner';
import { Brand, getRandomPotosinoBrands } from '@/lib/brands';
import { Event } from '@/types';
import { supabase, getSafetyDateBuffer, filterUpcomingEvents } from '@/lib/supabase';
import TangamangaBanner from '@/components/TangamangaBanner';
import SEO from '@/components/common/SEO';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import AdUnit from '../components/common/AdUnit';

interface HomeProps {
  events: Event[];
  featuredBrands?: any[];
  featuredAdvertisers?: any[];
  sponsoredContent?: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    ctaUrl: string;
    sponsorLogo?: string;
    sponsorName?: string;
  }[];
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  try {
    // Use the helper function to get the safety buffer date
    const safetyDateString = getSafetyDateBuffer();

    // Fetch upcoming events from Supabase
    const { data: eventsData, error: eventsError } = await supabase
      .from('events')
      .select('*')
      .gte('end_date', safetyDateString)
      .order('start_date', { ascending: true })
      .limit(12); // Fetch more than needed for filtering

    if (eventsError) throw eventsError;

    // Use the helper to filter events and then take only the first 8
    const events = filterUpcomingEvents(eventsData).slice(0, 8);

    // Fetch random Potosino brands instead of just featured ones
    const brands = await getRandomPotosinoBrands(3);

    // Mock featured advertisers data
    const featuredAdvertisers = [
      {
        id: '1',
        name: 'San Luis Rey Tranvía',
        description: 'Experience the historic center of San Luis Potosí through guided trolley tours, departing daily from Jardín de San Juan de Dios.',
        imageUrl: '/images/tours/tranvia-san-luis-rey.jpg',
        ctaUrl: '/blog/san-luis-rey-tranvia'
      },
      {
        id: '2',
        name: 'Corazón de Xoconostle',
        description: 'Discover artisanal products and cultural experiences that celebrate Potosino heritage.',
        imageUrl: '/images/brands/corazon-de-xoconostle-logo.png',
        ctaUrl: '/blog/corazon-de-xoconostle'
      },
      {
        id: '3',
        name: 'La Gran Vía',
        description: 'Historic Spanish bakery serving artisanal pastries and bread since 1930.',
        imageUrl: '/images/food/bakery-traditional.jpg',
        ctaUrl: '/blog/la-gran-via'
      }
    ];

    // Mock sponsored content data
    const sponsoredContent = [
      {
        id: '1',
        title: 'Discover the Potosino Wine Scene',
        description: 'Explore the emerging wine regions of San Luis Potosí, local vineyards, and unique wine experiences throughout the state.',
        imageUrl: '/images/sponsored/potosino-wine.jpg',
        ctaUrl: '/guides/potosino-wine-scene',
        sponsorLogo: '/images/brands/la-gran-via-logo.jpg',
        sponsorName: 'La Gran Vía'
      },
      {
        id: '2',
        title: 'The Ultimate Foodie Guide to SLP',
        description: 'From street tacos to fine dining: Your complete guide to San Luis Potosí\'s culinary scene.',
        imageUrl: '/images/sponsored/food-guide.jpg',
        ctaUrl: '/guides/foodie-guide',
        sponsorLogo: '/images/brands/la-legendaria-logo.png',
        sponsorName: 'La Legendaria'
      },
      {
        id: '3',
        title: 'Weekend Getaways from San Luis Potosí by Corazón de Xoconostle',
        description: 'Explore the best day trips and weekend destinations within reach of the city with certified local experts.',
        imageUrl: '/images/sponsored/weekend-getaways.jpg',
        ctaUrl: '/weekend-getaways',
        sponsorLogo: '/images/brands/corazon-de-xoconostle-logo.png',
        sponsorName: 'Corazón de Xoconostle'
      }
    ];

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        events: events || [],
        featuredBrands: brands || [],
        featuredAdvertisers,
        sponsoredContent
      },
      revalidate: 600, // Revalidate every 10 minutes
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        events: [],
        featuredBrands: [],
        featuredAdvertisers: [],
        sponsoredContent: []
      },
      revalidate: 600, // Revalidate every 10 minutes
    };
  }
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
    id: 'kids-carnival',
    title: 'Summer Kids Carnival',
    date: 'June 8-9',
    category: 'kids-family',
    location: 'Parque Tangamanga I',
    image: '/images/calendar/kids-family.jpg'
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
    image: '/images/event-categories/arts-culture.jpg',
    description: 'Exhibitions, galleries, and cultural performances throughout the city.',
    color: 'pink-500'
  },
  {
    id: 'culinary',
    title: 'Culinary',
    image: '/images/event-categories/culinary.jpeg',
    description: 'Food festivals, cooking classes, and gastronomic experiences.',
    color: 'orange-500'
  },
  {
    id: 'music',
    title: 'Music',
    image: '/images/event-categories/music.webp',
    description: 'Concerts, live performances, and musical festivals.',
    color: 'purple-500'
  },
  {
    id: 'kids-family',
    title: 'Kids & Family',
    image: '/images/event-categories/kids-family.jpeg',
    description: 'Interactive workshops, shows, and activities designed for children and families.',
    color: 'cyan-500'
  },
  {
    id: 'sports',
    title: 'Sports',
    image: '/images/event-categories/sports.jpg',
    description: 'Sporting events, tournaments, and recreational activities.',
    color: 'blue-500'
  },
  {
    id: 'traditional',
    title: 'Traditional',
    image: '/images/event-categories/traditional.jpg',
    description: 'Cultural celebrations and traditional festivities.',
    color: 'red-500'
  },
  {
    id: 'wellness',
    title: 'Wellness',
    image: '/images/event-categories/wellness.webp',
    description: 'Yoga classes, wellness workshops, and health-focused events.',
    color: 'green-500'
  },
  {
    id: 'community-social',
    title: 'Community & Social',
    image: '/images/event-categories/community-social.jpg',
    description: 'Meetups, social gatherings, and community activities.',
    color: 'yellow-500'
  }
];

export default function Home({ events = [], featuredBrands = [], featuredAdvertisers = [], sponsoredContent = [] }: HomeProps) {
  const { t } = useTranslation('common');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'call' | 'website'>('description');

  // Agregar efecto para mantener la posición de desplazamiento cuando se refresca la página
  useEffect(() => {
    // Función para guardar la posición del scroll
    const saveScrollPosition = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    // Restaurar la posición del scroll cuando la página se carga
    const restoreScrollPosition = () => {
      const scrollPosition = sessionStorage.getItem('scrollPosition');
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
      }
    };

    // Agregar listener para guardar la posición antes de refrescar
    window.addEventListener('beforeunload', saveScrollPosition);

    // Restaurar la posición después de que el componente se monta
    restoreScrollPosition();

    // Limpiar listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, []);

  const featuredPlaces = [] as Place[];
  const restaurants = [] as Place[];
  const cafes = [] as Place[];
  const localBrands = [] as Place[];
  const potosinoBrands = [] as Place[];

  // Function to get upcoming events for a category
  const getUpcomingEventsForCategory = (categoryId: string) => {
    return events.filter(event => event.category === categoryId).slice(0, 2);
  };

  const getGradientClass = (color: string) => {
    const gradientMap: { [key: string]: string } = {
      'pink-500': 'from-pink-500',
      'orange-500': 'from-orange-500',
      'purple-500': 'from-purple-500',
      'cyan-500': 'from-cyan-500',
      'blue-500': 'from-blue-500',
      'red-500': 'from-red-500',
      'green-500': 'from-green-500',
      'yellow-500': 'from-yellow-500'
    };
    return gradientMap[color] || 'from-primary';
  };

  // Helper function to format date consistently
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="slp-root slp-pattern-bg">
      <SEO
        title="San Luis Way - Your Insider Guide to San Luis Potosí"
        description="Discover San Luis Potosí with San Luis Way - your comprehensive guide for expats and locals. Find the best places, events, and cultural experiences in SLP."
        keywords="San Luis Potosí, SLP, expat guide, local guide, places, events, culture, travel, expatriate community, Mexico"
        ogImage="/og-image.jpg"
      />

      <Head>
        <title>San Luis Potosí - Your Insider Guide</title>
        <meta name="description" content="Discover San Luis Potosí with San Luis Way - your comprehensive guide for expats and locals. Find the best places, events, and cultural experiences in SLP." />
        <meta name="keywords" content="San Luis Potosí, SLP, expat guide, local guide, places, events, culture, travel, expatriate community, Mexico" />
        <meta property="og:title" content="San Luis Potosí - Your Insider Guide" />
        <meta property="og:description" content="Discover San Luis Potosí with San Luis Way - your comprehensive guide for expats and locals. Find the best places, events, and cultural experiences in SLP." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://sanluisway.com" />
        <meta name="twitter:title" content="San Luis Potosí - Your Insider Guide" />
        <meta name="twitter:description" content="Discover San Luis Potosí with San Luis Way - your comprehensive guide for expats and locals. Find the best places, events, and cultural experiences in SLP." />
        <meta name="twitter:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <HeroBanner />

        {/* Ad after hero section */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <AdUnit
              style={{ display: 'block', textAlign: 'center', margin: '20px 0' }}
            />
          </div>
        </section>

        {/* City Recognition Announcement */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-8 border-y border-primary/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-6 flex-wrap md:flex-nowrap">
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 rounded-full p-3 animate-float">
                  <MegaphoneIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-1 animate-slide-in animate-retro-strobe">
                    San Luis Potosí: Mexico's 2nd Best City to Live In!
                  </h2>
                  <p className="text-gray-600 animate-slide-in [animation-delay:200ms]">
                    According to IMCO (Instituto Mexicano para la Competencia), our beautiful city has been recognized as the second-best city to live in Mexico!
                  </p>
                </div>
              </div>
              <Link
                href="/about#rankings"
                className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full font-medium transition-all duration-300 group animate-slide-in [animation-delay:400ms]"
              >
                Learn More
                <svg
                  className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Advertisers Banner */}
        <section className="bg-background-alt py-8 relative slp-corner-accent overflow-hidden">
          <div className="absolute inset-0 z-0" style={{
            backgroundImage: `url('/images/advertisers/plaza-san-luis.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15
          }}></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{t('featuredAdvertisers.title', 'Featured Advertisers')}</h2>
              <Link href="/advertise" className="text-sm text-primary hover:text-primary-dark">
                {t('featuredAdvertisers.advertise', 'Advertise with us')} →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredAdvertisers?.map((advertiser) => (
                <div key={advertiser.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">{advertiser.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{advertiser.description}</p>
                  <Link href={advertiser.ctaUrl} className="text-primary hover:text-primary-dark text-sm font-medium">
                    Learn More →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Festival del Vino 2025 Highlight */}
        <section className="py-16 px-4 slp-gradient-bg relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-secondary opacity-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary opacity-10"></div>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/events/festival-del-vino.jpg"
                  alt={t('festivalVino.title', 'International Wine Festival 2025')}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarIcon className="w-5 h-5" />
                    <span className="font-medium">{t('festivalVino.date', 'June 6 & 7, 2025')}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full font-medium text-sm mb-4">
                  Featured Event
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 font-serif">
                  {t('festivalVino.title', 'International Wine Festival of San Luis Potosí')}
                </h2>
                <div className="prose prose-lg mb-8 text-gray-600 slp-accent-border">
                  <p>
                    {t('festivalVino.description', 'The Arts Center, a historic venue in our state, serves as the setting for one of the most important weekends for wine and gastronomy in our country. Enjoy a unique sensory experience with more than 500 wines from around the world.')}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>{t('festivalVino.feature1', 'More than 500 wines from around the world')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>{t('festivalVino.feature2', 'National and international wineries')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>{t('festivalVino.feature3', 'Gastronomic experiences and premium tastings')}</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/events/festival-del-vino-2025"
                  className="bg-red-800 hover:bg-red-900 text-white font-medium px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
                >
                  {t('festivalVino.learnMore', 'Learn More')}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Blue Background Section */}
        <section className="py-16 px-4 bg-secondary/5 relative">
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-secondary/10 to-transparent"></div>
          <div className="absolute inset-0"
               style={{
                 backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(0, 0, 122, 0.03) 100px, rgba(0, 0, 122, 0.03) 200px)`,
               }}>
          </div>
          <div className="container mx-auto relative">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block bg-secondary text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                {t('localExperiences.connect', 'Connect with San Luis Potosí')}
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('localExperiences.title', 'Discover unique local experiences')}</h2>
              <p className="text-lg text-gray-600">
                {t('localExperiences.description', 'Explore the best of San Luis Potosí with our complete guide to services, events, and places to visit.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="slp-card p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('localExperiences.expatCommunity.title', 'Expat Community')}</h3>
                <p className="text-gray-600 mb-6">{t('localExperiences.expatCommunity.description', 'Connect with other expatriates and share experiences in San Luis Potosí.')}</p>
                <Link href="/community" className="inline-flex items-center text-secondary font-medium">
                  {t('localExperiences.expatCommunity.cta', 'Learn more')}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="slp-card p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('localExperiences.discoverPlaces.title', 'Discover Places')}</h3>
                <p className="text-gray-600 mb-6">{t('localExperiences.discoverPlaces.description', 'Find the best restaurants, shops, and leisure spaces in the city.')}</p>
                <Link href="/places" className="inline-flex items-center text-primary font-medium">
                  {t('localExperiences.discoverPlaces.cta', 'Explore')}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="slp-card p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('localExperiences.culturalEvents.title', 'Cultural Events')}</h3>
                <p className="text-gray-600 mb-6">{t('localExperiences.culturalEvents.description', 'Stay up to date with festivals, concerts, and exhibitions in San Luis.')}</p>
                <Link href="/events" className="inline-flex items-center text-secondary font-medium">
                  {t('localExperiences.culturalEvents.cta', 'View calendar')}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Welcome/About Section */}
        <section id="discover" className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                {t('welcome.subtitle')}
              </span>
              <h2 className="font-serif text-4xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
                {t('welcome.title')}
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {t('welcome.description')}
              </p>
              <p className="text-lg text-primary font-medium bg-white/80 px-6 py-3 rounded-full inline-block shadow-lg">
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
                <Link href="/local-connections" className="btn-primary text-white py-2 px-4 rounded-md text-sm inline-block mt-auto">
                  {t('welcome.card1.cta')}
                </Link>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-elegant text-center hover-lift flex flex-col">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{t('expatServices.cultural.title')}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{t('expatServices.cultural.description')}</p>
                <Link href="/cultural-experiences" className="btn-primary text-white py-2 px-4 rounded-md text-sm inline-block mt-auto">
                  {t('expatServices.cultural.cta')}
                </Link>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-elegant text-center hover-lift flex flex-col">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{t('welcome.card3.title')}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{t('welcome.card3.description')}</p>
                <Link href="/san-luis-potosi-relocation-support" className="btn-primary text-white py-2 px-4 rounded-md text-sm inline-block mt-auto">
                  {t('welcome.card3.cta')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Expat Services Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                {t('expatServices.subtitle')}
              </span>
              <h2 className="font-serif text-4xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
                {t('expatServices.title')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('expatServices.description')}
              </p>
              <div className="mt-8 bg-white p-6 rounded-xl border border-primary/20 max-w-2xl mx-auto shadow-lg">
                <p className="text-lg text-gray-800 italic">
                  We connect you with trusted local professionals and service providers, serving as your personal intermediary to navigate bureaucracy and language barriers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift group">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 8a3 3 0 11-6 0 3 3 0 016 0zm-3 11a8 8 0 100-16 8 8 0 000 16zm0 0v3m0-3h3m-3 0h-3m3 0v-3" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">{t('expatServices.experiences.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('expatServices.experiences.description')}</p>
                <Link
                  href="/san-luis-potosi-experiences"
                  className="block text-center bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  {t('expatServices.experiences.cta')}
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift group">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">{t('expatServices.housing.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('expatServices.housing.description')}</p>
                <Link
                  href="/san-luis-potosi-housing-services"
                  className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  {t('expatServices.housing.cta')}
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift group">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">{t('expatServices.legal.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('expatServices.legal.description')}</p>
                <Link
                  href="/san-luis-potosi-legal-administrative"
                  className="block text-center bg-secondary hover:bg-secondary-light text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  {t('expatServices.legal.cta')}
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift group">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">{t('expatServices.community.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('expatServices.community.description')}</p>
                <Link
                  href="/san-luis-potosi-community-integration"
                  className="block text-center bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  {t('expatServices.community.cta')}
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift group">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">{t('expatServices.family.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('expatServices.family.description')}</p>
                <Link
                  href="/san-luis-potosi-family-support"
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  {t('expatServices.family.cta')}
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift group">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">{t('expatServices.petcare.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('expatServices.petcare.description')}</p>
                <Link
                  href="/san-luis-potosi-pet-care"
                  className="block text-center bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  {t('expatServices.petcare.cta')}
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift group">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">{t('expatServices.wellness.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('expatServices.wellness.description')}</p>
                <Link
                  href="/san-luis-potosi-wellness-services"
                  className="block text-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  {t('expatServices.wellness.cta')}
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift group">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">{t('expatServices.homeservices.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('expatServices.homeservices.description')}</p>
                <Link
                  href="/san-luis-potosi-home-services"
                  className="block text-center bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  {t('expatServices.homeservices.cta')}
                </Link>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/contact"
                className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-md transition-colors"
              >
                {t('expatServices.contactCta')}
              </Link>
              <p className="text-sm text-gray-500 mt-4 max-w-xl mx-auto">
                {t('expatServices.feeDisclosure')}
              </p>
            </div>
          </div>
        </section>

        {/* Outdoors Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Outdoor Adventures</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover San Luis Potosí's natural wonders and outdoor activities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Hiking Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/outdoors/hiking.jpg"
                    alt="Hiking trails in San Luis Potosí"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                    priority={false}
                    quality={85}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Hiking Trails</h3>
                  <p className="text-gray-600 mb-4">
                    Explore scenic trails in the Sierra de Álvarez and Huasteca Potosina
                  </p>
                  <Link href="/outdoors#hiking" className="text-secondary hover:text-secondary-light font-medium">
                    Learn more →
                  </Link>
                </div>
              </div>

              {/* Running Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/outdoors/running.webp"
                    alt="Running groups in San Luis Potosí"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                    priority={false}
                    quality={85}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Running Groups</h3>
                  <p className="text-gray-600 mb-4">
                    Join local running communities and discover the best routes
                  </p>
                  <Link href="/outdoors#running" className="text-secondary hover:text-secondary-light font-medium">
                    Learn more →
                  </Link>
                </div>
              </div>

              {/* Camping Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/outdoors/camping.jpg"
                    alt="Camping spots in San Luis Potosí"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                    priority={false}
                    quality={85}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Camping Spots</h3>
                  <p className="text-gray-600 mb-4">
                    Find the perfect camping locations in natural areas
                  </p>
                  <Link href="/outdoors#camping" className="text-secondary hover:text-secondary-light font-medium">
                    Learn more →
                  </Link>
                </div>
              </div>

              {/* Adventures Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/outdoors/adventures.jpg"
                    alt="Outdoor adventures in San Luis Potosí"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                    priority={false}
                    quality={85}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">More Adventures</h3>
                  <p className="text-gray-600 mb-4">
                    Discover rock climbing, cycling, and other outdoor activities
                  </p>
                  <Link href="/outdoors#adventures" className="text-secondary hover:text-secondary-light font-medium">
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/outdoors"
                className="inline-block bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-light transition-colors"
              >
                Explore All Outdoor Activities
              </Link>
            </div>
          </div>
        </section>

        {/* Parque Tangamanga Banner */}
        <TangamangaBanner />

        {/* Pedestrian Street Banner - MOVED HERE */}
        <section className="py-12 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-100">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/pedestrian-street.jpg"
                  alt="San Luis Potosí's Historic Pedestrian Street"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2 text-white/90 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>Centro Histórico</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  URBAN DISTINCTION
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  America's Longest Pedestrian Street
                </h2>
                <p className="text-gray-600 mb-6">
                  Experience the vibrant heart of San Luis Potosí along our historic pedestrian corridor, where colonial architecture meets modern life. This remarkable street showcases local artisans, cafes, and cultural landmarks.
                </p>
                <div className="flex gap-6 mb-6">
                  <div className="bg-white/80 rounded-lg px-4 py-2 shadow-sm">
                    <div className="text-xl font-bold text-primary mb-0.5">2.5 km</div>
                    <div className="text-sm text-gray-600">Total Length</div>
                  </div>
                  <div className="bg-white/80 rounded-lg px-4 py-2 shadow-sm">
                    <div className="text-xl font-bold text-primary mb-0.5">100+</div>
                    <div className="text-sm text-gray-600">Local Businesses</div>
                  </div>
                </div>
                <Link
                  href="/attractions/pedestrian-street-guide"
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium group"
                >
                  Explore the Street
                  <svg className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Categories Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
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
              {/* Practical Category 1 - Restaurants with Playgrounds */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-48">
                  <ResponsiveImage
                    src="/images/practical-categories/restaurants-with-playgrounds.png"
                    alt="Restaurants with Playgrounds"
                    height="192px"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Restaurants with Playgrounds</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Enjoy a relaxed meal while your children play in dedicated, safe areas perfect for family outings.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>17 locations</span>
                    </div>
                    <Link href="/category/restaurants-with-playgrounds" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Practical Category 2 - Private Dining Rooms */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-48">
                  <ResponsiveImage
                    src="/images/practical-categories/private-dining-rooms.jpg"
                    alt="Private Dining Rooms"
                    height="192px"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Private Dining Rooms</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Ideal venues for business meetings, private celebrations, or quiet dining away from the crowd.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>14 locations</span>
                    </div>
                    <Link href="/category/private-dining-rooms" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Practical Category 3 - Language Exchange Cafes */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-48">
                  <ResponsiveImage
                    src="/images/practical-categories/language-exchange-cafes.jpg"
                    alt="Language Exchange Cafes"
                    height="192px"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Language Exchange Cafes</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Cafes and venues where you can practice Spanish with locals and meet other expats in a relaxed environment.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>8 locations</span>
                    </div>
                    <Link href="/category/language-exchange-cafes" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Practical Category 4 - Remote Work Cafes */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-48">
                  <ResponsiveImage
                    src="/images/practical-categories/remote-work-cafes.avif"
                    alt="Remote Work Cafes"
                    height="192px"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Remote Work Cafes</h3>
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
                      <span>19 locations</span>
                    </div>
                    <Link href="/category/remote-work-cafes" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Practical Category 5 - Easy Parking Spots */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-48">
                  <ResponsiveImage
                    src="/images/practical-categories/easy-parking-spots.png"
                    alt="Easy Parking Spots"
                    height="192px"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Easy Parking Spots</h3>
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
                      <span>16 locations</span>
                    </div>
                    <Link href="/category/easy-parking-spots" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Practical Category 6 - International Markets */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-48">
                  <ResponsiveImage
                    src="/images/practical-categories/international-markets.jpg"
                    alt="International Markets"
                    height="192px"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
                    <Link href="/category/international-markets" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Practical Category 7 - English-Speaking Healthcare */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-48">
                  <ResponsiveImage
                    src="/images/practical-categories/english-speaking-healthcare.jpg"
                    alt="English-Speaking Healthcare"
                    height="192px"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
                      <span>5 locations</span>
                    </div>
                    <Link href="/category/english-speaking-healthcare" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Practical Category 8 - Family Activities */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-48">
                  <ResponsiveImage
                    src="/images/practical-categories/family-activities.webp"
                    alt="Family Activities"
                    height="192px"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
                    <Link href="/category/family-activities" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Practical Category 9 - Sports & Fitness */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-48">
                  <ResponsiveImage
                    src="/images/practical-categories/sports-fitness.webp"
                    alt="Sports & Fitness"
                    height="192px"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Sports & Fitness</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Gyms, sports clubs, and fitness centers with international standards and English-speaking trainers.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>11 locations</span>
                    </div>
                    <Link href="/category/sports-fitness" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Practical Category 10 - Outdoors */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-48">
                  <ResponsiveImage
                    src="/images/practical-categories/outdoors.jpeg"
                    alt="Outdoors"
                    height="192px"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Outdoors</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Parks, hiking trails, outdoor activities, and nature spots perfect for exploring San Luis Potosí's natural beauty.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>8 locations</span>
                    </div>
                    <Link href="/category/outdoors" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Practical Category 11 - Activities for a Rainy Day */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-48">
                  <ResponsiveImage
                    src="/images/practical-categories/activities-rainy-day.jpg"
                    alt="Activities for a Rainy Day"
                    height="192px"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Activities for a Rainy Day</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Indoor entertainment options including museums, escape rooms, bowling alleys, and indoor play centers for all ages.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>12 locations</span>
                    </div>
                    <Link href="/category/rainy-day-activities" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Practical Category 12 - Local and Organic Products */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-48">
                  <ResponsiveImage
                    src="/images/practical-categories/local-organic-products.jpeg"
                    alt="Local and Organic Products"
                    height="192px"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Local and Organic Products</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Farmers markets, organic stores, and local producers offering fresh, sustainable, and locally sourced products.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>10 locations</span>
                    </div>
                    <Link href="/category/local-organic-products" className="text-primary font-medium text-sm hover:underline">
                      View all →
                    </Link>
                  </div>
                </div>
              </div>
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
              {/* Featured Potosino Brands */}
              {featuredBrands.slice(0, 3).map(brand => (
                <div key={brand.id} className="bg-white rounded-xl overflow-hidden shadow-elegant hover-lift">
                  <div className="relative h-48">
                    <Image
                      src={brand.image_url || "/images/placeholder.jpg"}
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
                      <Link
                        href={`/brands/${brand.id}`}
                        className="text-primary hover:text-primary-dark transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/brands"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-primary shadow-sm hover:bg-primary-dark transition-colors"
              >
                Explore all brands
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Sponsored Content Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Sponsored Content</h2>
              <Link href="/sponsor" className="text-primary hover:text-primary-dark">
                Become a Sponsor →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sponsoredContent?.map((content) => (
                <div key={content.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative" style={{ aspectRatio: '16/9', height: '200px' }}>
                    <Image
                      src={content.imageUrl}
                      alt={content.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-yellow-400 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                        <span className="text-sm text-gray-600">Sponsored</span>
                      </div>
                      {content.sponsorLogo && (
                        <div className="flex items-center">
                          <Image
                            src={content.sponsorLogo}
                            alt={content.sponsorName || 'Sponsor'}
                            width={80}
                            height={30}
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{content.title}</h3>
                    <p className="text-gray-600 mb-4">{content.description}</p>
                    <Link href={content.ctaUrl} className="text-primary hover:text-primary-dark font-medium">
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
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
              <Link
                href="/city-hacks"
                className="mt-6 md:mt-0 inline-block text-secondary hover:text-secondary-light font-medium"
              >
                {t('cityHacks.viewAll')} →
              </Link>
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
                  <Link href="/city-hacks/transport" className="text-secondary hover:text-secondary-light font-medium text-sm">
                    {t('common.readMore')} →
                  </Link>
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
                  <Link href="/city-hacks/shopping" className="text-secondary hover:text-secondary-light font-medium text-sm">
                    {t('common.readMore')} →
                  </Link>
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
                  <Link href="/city-hacks/language" className="text-secondary hover:text-secondary-light font-medium text-sm">
                    {t('common.readMore')} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Categories Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                DISCOVER WHAT'S HAPPENING
              </span>
              <h2 className="font-serif text-3xl font-bold text-gray-900 mt-2 mb-4">
                Event Categories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore different types of events and activities happening in San Luis Potosí.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {eventCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative h-48">
                    <ResponsiveImage
                      src={category.image}
                      alt={category.title}
                      height="192px"
                      objectFit="cover"
                      className="w-full h-full"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${getGradientClass(category.color)} to-transparent opacity-60`} />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-medium text-xl">{category.title}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        <span>{getUpcomingEventsForCategory(category.id).length} upcoming</span>
                      </div>
                      <Link href={`/events/${category.id}`} className="text-primary font-medium text-sm hover:underline">
                        View events →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                MARK YOUR CALENDAR
              </span>
              <h2 className="font-serif text-3xl font-bold text-gray-900 mt-2 mb-4">
                Upcoming Events
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Don't miss out on these exciting events happening in San Luis Potosí.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative h-48">
                    <Image
                      src={event.image_url || '/images/events/default.jpg'}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs text-white bg-${eventCategories.find(cat => cat.id === event.category)?.color || 'primary'} mb-2`}>
                        {eventCategories.find(cat => cat.id === event.category)?.title || event.category}
                      </span>
                      <h3 className="text-white font-medium text-lg leading-tight">{event.title}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        <span>{formatDate(event.start_date)}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <Link href={`/events/${event.id}`} className="text-primary font-medium text-sm hover:underline">
                      Learn more →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Potosinos Section */}
        <section className="py-24 px-4 bg-white border-t border-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 z-0" style={{
            backgroundImage: `url('/images/backgrounds/blue-pattern.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2
          }}></div>
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="text-secondary text-sm font-medium uppercase tracking-wider bg-white px-6 py-2 rounded-full shadow-md">
                COMMUNITY SPOTLIGHT
              </span>
              <h2 className="font-serif text-4xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
                Featured Potosinos
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Meet the remarkable individuals who contribute to San Luis Potosí's vibrant culture, entrepreneurial spirit, and rich heritage.
              </p>
              <p className="text-sm text-gray-600 mt-3 max-w-xl mx-auto">
                <span className="inline-block bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">From yesterday and today, honoring tradition while shaping the future</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Person 1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex justify-center pt-8 pb-4 bg-blue-50">
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src="/images/potosinos/maria-gonzalez.jpg"
                      alt="María González"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                      priority
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/potosinos/placeholder.jpg';
                      }}
                    />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-medium text-xl text-gray-900 mb-1">María González</h3>
                  <p className="text-primary font-medium text-sm mb-4">Chef & Cultural Ambassador</p>
                  <div className="h-24 overflow-hidden">
                    <p className="text-gray-600 text-sm">
                      Preserving traditional Potosino cuisine while innovating the local gastronomy scene through her award-winning restaurant.
                    </p>
                  </div>
                  <Link href="/community/maria-gonzalez" className="inline-flex items-center text-primary hover:text-primary-dark text-sm font-medium mt-4 group">
                    Read her story
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Person 2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex justify-center pt-8 pb-4 bg-blue-50">
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src="/images/potosinos/carlos-ramirez.jpeg"
                      alt="Carlos Ramírez"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/potosinos/placeholder.jpg';
                      }}
                    />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-medium text-xl text-gray-900 mb-1">Carlos Ramírez</h3>
                  <p className="text-primary font-medium text-sm mb-4">Artisan & Master Craftsman</p>
                  <div className="h-24 overflow-hidden">
                    <p className="text-gray-600 text-sm">
                      Creating stunning traditional pottery that honors the region's artistic legacy while mentoring the next generation of artisans.
                    </p>
                  </div>
                  <Link href="/community/carlos-ramirez" className="inline-flex items-center text-primary hover:text-primary-dark text-sm font-medium mt-4 group">
                    Read his story
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Person 3 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex justify-center pt-8 pb-4 bg-blue-50">
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src="/images/potosinos/alejandra-vega.jpeg"
                      alt="Alejandra Vega"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                      priority
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/potosinos/placeholder.jpg';
                      }}
                    />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-medium text-xl text-gray-900 mb-1">Alejandra Vega</h3>
                  <p className="text-primary font-medium text-sm mb-4">Entrepreneur & Innovator</p>
                  <div className="h-24 overflow-hidden">
                    <p className="text-gray-600 text-sm">
                      Transforming the local tech scene through her startup incubator while creating opportunities for young Potosinos in technology.
                    </p>
                  </div>
                  <Link href="/community/alejandra-vega" className="inline-flex items-center text-primary hover:text-primary-dark text-sm font-medium mt-4 group">
                    Read her story
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Person 4 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex justify-center pt-8 pb-4 bg-blue-50">
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src="/images/potosinos/miguel-ortiz.jpeg"
                      alt="Miguel Ortiz"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/potosinos/placeholder.jpg';
                      }}
                    />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-medium text-xl text-gray-900 mb-1">Miguel Ortiz</h3>
                  <p className="text-primary font-medium text-sm mb-4">Historian & Cultural Guide</p>
                  <div className="h-24 overflow-hidden">
                    <p className="text-gray-600 text-sm">
                      Sharing the rich history of San Luis Potosí through immersive tours and educational programs that bring the past to life.
                    </p>
                  </div>
                  <Link href="/community/miguel-ortiz" className="inline-flex items-center text-primary hover:text-primary-dark text-sm font-medium mt-4 group">
                    Read his story
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link href="/community" className="inline-flex items-center justify-center space-x-3 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-medium text-lg">
                <span>Meet More Remarkable Potosinos</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <p className="text-sm text-gray-600 mt-8 max-w-xl mx-auto">
                Know someone who deserves to be featured? <Link href="/contact?subject=Community Nomination" className="text-primary hover:text-primary-dark font-medium">Nominate them here</Link>
              </p>
            </div>
          </div>
        </section>

        {/* Cultural Heritage Section - Updated for Expats */}
        <section className="py-24 px-4 bg-gray-50 border-t-4 border-secondary">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-primary text-sm font-medium uppercase tracking-wider bg-gradient-to-r from-emerald-100 to-teal-100 px-6 py-2 rounded-full">
                  CULTURAL HERITAGE
                </span>
                <h2 className="font-serif text-4xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
                  Cultural Heritage & Traditions
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
                      <Link href="/cultural/history" className="block hover:opacity-80 transition-opacity">
                        <h3 className="font-medium text-gray-900 mb-2">
                          {t('cultural.history.expatTitle')}
                        </h3>
                        <p className="text-gray-600">
                          {t('cultural.history.expatDescription')}
                        </p>
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                      </svg>
                    </div>
                    <div>
                      <Link href="/cultural/festivals" className="block hover:opacity-80 transition-opacity">
                        <h3 className="font-medium text-gray-900 mb-2">
                          {t('cultural.festivals.title')}
                        </h3>
                        <p className="text-gray-600">
                          {t('cultural.festivals.description')}
                        </p>
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <Link href="/cultural/language" className="block hover:opacity-80 transition-opacity">
                        <h3 className="font-medium text-gray-900 mb-2">
                          {t('cultural.language.title')}
                        </h3>
                        <p className="text-gray-600">
                          {t('cultural.language.description')}
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/events/cultural"
                    className="btn-primary"
                  >
                    {t('cultural.viewCalendar')}
                  </Link>
                  <Link
                    href="/cultural-tours"
                    className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:border-gray-300 transition-colors text-center"
                  >
                    {t('cultural.bookTour')}
                  </Link>
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
                      priority
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

        {/* Pedestrian Street Banner - MOVED HERE (AFTER CULTURAL HERITAGE) */}
        <section className="py-12 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-100">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/pedestrian-street.jpg"
                  alt="San Luis Potosí's Historic Pedestrian Street"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2 text-white/90 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>Centro Histórico</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  URBAN DISTINCTION
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  America's Longest Pedestrian Street
                </h2>
                <p className="text-gray-600 mb-6">
                  Experience the vibrant heart of San Luis Potosí along our historic pedestrian corridor, where colonial architecture meets modern life. This remarkable street showcases local artisans, cafes, and cultural landmarks.
                </p>
                <div className="flex gap-6 mb-6">
                  <div className="bg-white/80 rounded-lg px-4 py-2 shadow-sm">
                    <div className="text-xl font-bold text-primary mb-0.5">2.5 km</div>
                    <div className="text-sm text-gray-600">Total Length</div>
                  </div>
                  <div className="bg-white/80 rounded-lg px-4 py-2 shadow-sm">
                    <div className="text-xl font-bold text-primary mb-0.5">100+</div>
                    <div className="text-sm text-gray-600">Local Businesses</div>
                  </div>
                </div>
                <Link
                  href="/attractions/pedestrian-street-guide"
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium group"
                >
                  Explore the Street
                  <svg className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
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
                    src="/images/restaurants-and-bars/traditional-restaurants.jpg"
                    alt="Traditional Restaurants"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    quality={75}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.endsWith('.jpg')) {
                        target.src = target.src.replace('.jpg', '.webp');
                      } else if (target.src.endsWith('.webp')) {
                        target.src = target.src.replace('.webp', '.png');
                      }
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
                  <Link href="/traditional-cuisine" className="text-primary font-medium text-sm hover:underline mt-4 inline-block">
                    View all traditional restaurants →
                  </Link>
                </div>
              </div>

              {/* Modern Restaurants */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-52">
                  <Image
                    src="/images/restaurants-and-bars/modern-restaurants.webp"
                    alt="Modern Restaurants"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    quality={75}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.endsWith('.jpg')) {
                        target.src = target.src.replace('.jpg', '.webp');
                      } else if (target.src.endsWith('.webp')) {
                        target.src = target.src.replace('.webp', '.png');
                      }
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
                  <Link href="/modern-dining" className="text-primary font-medium text-sm hover:underline mt-4 inline-block">
                    View all modern restaurants →
                  </Link>
                </div>
              </div>

              {/* Cocktail Bars */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-52">
                  <Image
                    src="/images/restaurants-and-bars/cocktail-bars.webp"
                    alt="Cocktail Bars"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    quality={75}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.endsWith('.jpg')) {
                        target.src = target.src.replace('.jpg', '.webp');
                      } else if (target.src.endsWith('.webp')) {
                        target.src = target.src.replace('.webp', '.png');
                      }
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
                  <Link href="/category/cocktail-bars" className="text-primary font-medium text-sm hover:underline mt-4 inline-block">
                    View all cocktail bars →
                  </Link>
                </div>
              </div>

              {/* Terraces */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-52">
                  <Image
                    src="/images/restaurants-and-bars/terraces.webp"
                    alt="Terraces"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    quality={75}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.endsWith('.jpg')) {
                        target.src = target.src.replace('.jpg', '.webp');
                      } else if (target.src.endsWith('.webp')) {
                        target.src = target.src.replace('.webp', '.png');
                      }
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
                  <Link href="/category/terraces" className="text-primary font-medium text-sm hover:underline mt-4 inline-block">
                    View all terraces →
                  </Link>
                </div>
              </div>

              {/* Cantinas */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-52">
                  <Image
                    src="/images/restaurants-and-bars/cantinas.jpg"
                    alt="Cantinas"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    quality={75}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.endsWith('.jpg')) {
                        target.src = target.src.replace('.jpg', '.webp');
                      } else if (target.src.endsWith('.webp')) {
                        target.src = target.src.replace('.webp', '.png');
                      }
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
                  <Link href="/category/cantinas" className="text-primary font-medium text-sm hover:underline mt-4 inline-block">
                    View all cantinas →
                  </Link>
                </div>
              </div>

              {/* Live Music Venues */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-52">
                  <Image
                    src="/images/restaurants-and-bars/live-music.jpg"
                    alt="Live Music Venues"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    quality={75}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.endsWith('.jpg')) {
                        target.src = target.src.replace('.jpg', '.webp');
                      } else if (target.src.endsWith('.webp')) {
                        target.src = target.src.replace('.webp', '.png');
                      }
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
                  <Link href="/category/live-music" className="text-primary font-medium text-sm hover:underline mt-4 inline-block">
                    View all live music venues →
                  </Link>
                </div>
              </div>

              {/* Open For Breakfast */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative h-52">
                  <Image
                    src="/images/restaurants-and-bars/breakfast.webp"
                    alt="Breakfast Restaurants"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    quality={75}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.endsWith('.jpg')) {
                        target.src = target.src.replace('.jpg', '.webp');
                      } else if (target.src.endsWith('.webp')) {
                        target.src = target.src.replace('.webp', '.png');
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Open For Breakfast</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Start your day with delicious breakfast options from traditional Mexican morning fare to international cuisine and cozy cafés.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>9 locations</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Open early 7:00 AM - 12:00 PM</span>
                    </div>
                  </div>
                  <Link href="/category/open-for-breakfast" className="text-primary font-medium text-sm hover:underline mt-4 inline-block">
                    View all breakfast spots →
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/dining"
                className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-md transition-colors"
              >
                Explore All Dining Spots
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                Looking for specific cuisine or atmosphere? <Link href="/contact" className="text-primary hover:underline">Contact us</Link> for personalized recommendations.
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
                    src="/images/meeting-spots/presa-san-jose.jpg"
                    alt="Presa San José"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    quality={75}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.endsWith('.jpg')) {
                        target.src = target.src.replace('.jpg', '.webp');
                      } else if (target.src.endsWith('.webp')) {
                        target.src = target.src.replace('.webp', '.png');
                      }
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    quality={75}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.endsWith('.jpg')) {
                        target.src = target.src.replace('.jpg', '.webp');
                      } else if (target.src.endsWith('.webp')) {
                        target.src = target.src.replace('.webp', '.png');
                      }
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
                    src="/images/meeting-spots/tangamanga-zoo.jpg"
                    alt="Tangamanga Park Zoo"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    quality={75}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.endsWith('.jpg')) {
                        target.src = target.src.replace('.jpg', '.webp');
                      } else if (target.src.endsWith('.webp')) {
                        target.src = target.src.replace('.webp', '.png');
                      }
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
                  <Link href="/category/meeting-spots#zoo" className="text-primary font-medium text-sm hover:underline mt-4 inline-block">
                    Learn more about the zoo →
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/unique-meeting-spots"
                className="inline-block bg-secondary hover:bg-secondary-dark text-white font-medium px-10 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
              >
                View All Unique Meeting Spots
              </Link>
              <p className="text-sm text-gray-500 mt-8">
                Want to book a unique venue? <Link href="/contact" className="text-primary hover:text-primary-dark font-medium">Contact us</Link> for assistance with reservations and special arrangements.
              </p>
            </div>
          </div>
        </section>

        {/* Ad Banners Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Partner With Us Banner */}
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start space-x-6">
                <div className="w-12 h-12 flex-shrink-0 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Partner With Us</h3>
                  <p className="text-gray-600 mb-4">Share your business with our engaged community of expats and locals.</p>
                  <Link href="/advertise" className="text-amber-500 hover:text-amber-600 font-medium inline-flex items-center">
                    Learn about advertising
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* List Your Business Banner */}
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start space-x-6">
                <div className="w-12 h-12 flex-shrink-0 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">List your business or service</h3>
                  <p className="text-gray-600 mb-4">Join our directory of authentic Potosino businesses and reach new customers.</p>
                  <Link href="/join-directory" className="text-indigo-500 hover:text-indigo-600 font-medium inline-flex items-center">
                    Join the directory
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup with CTA */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <NewspaperIcon className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Stay Updated with SLP Descubre</h2>
              <p className="text-lg mb-8">Get weekly updates on the best events, places, and experiences in San Luis Potosí.</p>
              <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                />
                <button
                  type="submit"
                  className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Business Growth Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-white">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="md:w-2/3 mb-8 md:mb-0">
                    <h2 className="text-3xl font-bold mb-4">Grow Your Business in San Luis Potosí</h2>
                    <p className="text-lg mb-6">Join San Luis Way's premium business directory and connect with thousands of potential customers. Get featured placement, priority support, and exclusive marketing opportunities.</p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Featured placement in search results
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Priority customer support
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Exclusive marketing opportunities
                      </li>
                    </ul>
                    <Link
                      href="/business-growth"
                      className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Learn More About Premium Benefits
                    </Link>
                  </div>
                  <div className="md:w-1/3">
                    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                      <h3 className="text-xl font-semibold mb-4">Premium Features</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Custom Business Profile
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Analytics Dashboard
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Direct Customer Messaging
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Sponsorship Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sponsor Local Events</h2>
              <p className="text-lg text-gray-600 mb-8">Connect with our engaged community through event sponsorship opportunities</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <CalendarIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Event Sponsorship</h3>
                </div>
                <p className="text-gray-600 mb-6">Get your brand in front of thousands of engaged locals and visitors at our featured events.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Logo placement on event materials
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Social media promotion
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    VIP event access
                  </li>
                </ul>
                <Link
                  href="/event-sponsorship"
                  className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  Learn More
                </Link>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <MegaphoneIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Digital Advertising</h3>
                </div>
                <p className="text-gray-600 mb-6">Reach your target audience with precision through our digital advertising platform.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Targeted audience reach
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Performance analytics
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Flexible campaign options
                  </li>
                </ul>
                <Link
                  href="/digital-advertising"
                  className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Local Insights for Expats Section */}
        {/* ... existing code ... */}
      </main>

      {/* Bottom Advertisement */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <AdUnit
            adSlot="YOUR_SECOND_AD_SLOT_ID_HERE"
            adFormat="rectangle"
            style={{
              display: 'block',
              textAlign: 'center',
              minHeight: '250px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '1rem'
            }}
          />
        </div>
      </section>

      {/* Floating Contact Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link
          href="/contact"
          className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
          aria-label="Contact Us"
        >
          <svg
            className="w-8 h-8 transform group-hover:rotate-12 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
