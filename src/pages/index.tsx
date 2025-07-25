import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
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
import HeroCarousel from '@/components/HeroCarousel';
import EventsCarousel from '@/components/EventsCarousel';
import ImageCarousel from '@/components/ImageCarousel';
import AnimatedSection from '@/components/AnimatedSection';
import { Brand, getRandomPotosinoBrands, getSponsoredBrands } from '@/lib/brands';
import { BlogPost, getBlogPostsBySlugs } from '@/lib/blog';
import { Event } from '@/types';
import { supabase, getSafetyDateBuffer, filterUpcomingEvents } from '@/lib/supabase';
import TangamangaBanner from '@/components/TangamangaBanner';
import SEO from '@/components/common/SEO';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import AdUnit from '../components/common/AdUnit';
import ListingsBanner from '@/components/ListingsBanner';

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

export const getStaticProps: GetStaticProps = async ({ }) => {
  try {
    // Use the helper function to get the safety buffer date
    const safetyDateString = getSafetyDateBuffer();

    // Fetch upcoming events from Supabase
    const { data: eventsData, error: eventsError } = await supabase
      .from('events')
      .select("*")
      .gte('end_date', safetyDateString)
      .order('start_date', { ascending: true })
      .limit(12); // Fetch more than needed for filtering

    if (eventsError) throw eventsError;

    // Use the helper to filter events and then take only the first 8
    const events = filterUpcomingEvents(eventsData).slice(0, 8);

    // Fetch REAL data for advertisers and sponsored content
    const advertiserSlugs = ['san-luis-rey-tranvia', 'corazon-de-xoconostle', 'la-gran-via'];
    const featuredAdvertisersData = await getBlogPostsBySlugs(advertiserSlugs);
    const sponsoredContentData = await getSponsoredBrands(3);

    const featuredAdvertisers = featuredAdvertisersData.map(post => ({
      id: post.id,
      name: post.title,
      description: post.excerpt,
      imageUrl: post.imageUrl || '/images/placeholder.jpg',
      ctaUrl: `/blog/${post.slug}`
    }));

    // Map sponsored content data to the expected format
    const sponsoredContent = sponsoredContentData.map(brand => ({
      id: brand.id,
      title: `Discover ${brand.name}`,
      description: brand.description || `Explore the best of ${brand.name}.`,
      imageUrl: brand.image_url || '/images/sponsored/weekend-getaways.jpg',
      ctaUrl: `/brands/${brand.slug}`,
      sponsorLogo: brand.image_url || '/images/placeholder.jpg',
      sponsorName: brand.name
    }));

    return {
      props: {
        events: events || [],
        featuredBrands: [], // This was fetching random brands, now advertisers do, so we can clear it.
        featuredAdvertisers,
        sponsoredContent
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        events: [],
        featuredBrands: [],
        featuredAdvertisers: [],
        sponsoredContent: []
      },
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
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'call' | 'website'>('description');

  // Hero carousel slides
  const heroSlides = [
    {
      id: 'discover',
      title: 'Discover San Luis Potosí',
      subtitle: 'Your complete guide to living, working, and exploring this beautiful Mexican city',
      description: 'From local insider tips to practical expat advice',
      image: '/images/hero-bg.jpg',
      ctaText: 'Start Exploring',
      ctaLink: '#explore',
      accent: 'Your Guide to San Luis Potosí'
    },
    {
      id: 'events',
      title: 'Upcoming Events',
      subtitle: 'Discover the vibrant cultural scene of San Luis Potosí',
      description: 'From art exhibitions to traditional festivals, never miss what\'s happening in the city',
      image: '/images/events/festival.jpg',
      ctaText: 'View All Events',
      ctaLink: '/events',
      accent: 'What\'s Happening'
    },
    {
      id: 'places',
      title: 'Hidden Gems',
      subtitle: 'Find the best restaurants, cafes, and local spots',
      description: 'Curated recommendations from locals who know the city best',
      image: '/images/pedestrian-street.jpg',
      ctaText: 'Explore Places',
      ctaLink: '/places',
      accent: 'Local Favorites'
    },
    {
      id: 'culture',
      title: 'Rich Culture',
      subtitle: 'Immerse yourself in San Luis Potosí\'s traditions and heritage',
      description: 'Learn about local customs, history, and the people that make this city special',
      image: '/images/cultural/san-luis-potosi-cathedral.jpg',
      ctaText: 'Learn More',
      ctaLink: '/cultural',
      accent: 'Cultural Heritage'
    }
  ];

  // Outdoor activities for carousel
  const outdoorActivities = [
    {
      id: 'hiking',
      title: 'Hiking Trails',
      description: 'Explore scenic mountain trails and natural landscapes around San Luis Potosí',
      image: '/images/outdoors/hiking.jpg',
      link: '/outdoors#hiking',
      linkText: 'Find Trails',
      badge: 'Adventure',
      badgeColor: 'bg-green-500'
    },
    {
      id: 'camping',
      title: 'Camping Sites',
      description: 'Discover beautiful camping spots in the Sierra Madre Oriental',
      image: '/images/outdoors/camping.jpg',
      link: '/outdoors#camping',
      linkText: 'View Sites',
      badge: 'Nature',
      badgeColor: 'bg-blue-500'
    },
    {
      id: 'real-catorce',
      title: 'Real de Catorce',
      description: 'Visit this historic ghost town and UNESCO World Heritage site',
      image: '/images/outdoors/real-de-catorce-main.jpg',
      link: '/outdoors#real-catorce',
      linkText: 'Plan Visit',
      badge: 'Historic',
      badgeColor: 'bg-purple-500'
    },
    {
      id: 'media-luna',
      title: 'Media Luna',
      description: 'Crystal clear waters perfect for swimming and snorkeling',
      image: '/images/outdoors/media-luna.jpg',
      link: '/outdoors#media-luna',
      linkText: 'Learn More',
      badge: 'Swimming',
      badgeColor: 'bg-cyan-500'
    },
    {
      id: 'huasteca',
      title: 'Huasteca Potosina',
      description: 'Tropical paradise with waterfalls and jungle adventures',
      image: '/images/outdoors/huasteca-waterfall.jpg',
      link: '/outdoors#huasteca',
      linkText: 'Explore',
      badge: 'Waterfalls',
      badgeColor: 'bg-teal-500'
    },
    {
      id: 'xilitla',
      title: 'Xilitla',
      description: 'Surreal gardens and architectural wonders in the cloud forest',
      image: '/images/outdoors/xilitla.webp',
      link: '/outdoors#xilitla',
      linkText: 'Discover',
      badge: 'Surreal',
      badgeColor: 'bg-pink-500'
    }
  ];

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
        <HeroCarousel slides={heroSlides} />

        {/* Ad after hero section */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <AdUnit
              style={{ display: 'block', textAlign: 'center', margin: '20px 0' }}
            />
          </div>
        </section>

        {/* City Recognition Announcement */}
        <AnimatedSection animationType="fadeInUp" delay={200}>
          <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-8 border-y border-primary/20 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 w-16 h-16 border-2 border-primary/20 rounded-full animate-spinSlow"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border border-secondary/20 rounded-full animate-float"></div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex items-center justify-between gap-6 flex-wrap md:flex-nowrap">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 rounded-full p-3 animate-float">
                    <MegaphoneIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-1 animate-fadeInLeft delay-300">
                      San Luis Potosí: Mexico's 2nd Best City to Live In!
                    </h2>
                    <p className="text-gray-600 animate-fadeInLeft delay-500">
                      According to IMCO (Instituto Mexicano para la Competencia), our beautiful city has been recognized as the second-best city to live in Mexico!
                    </p>
                  </div>
                </div>
                <Link
                  href="/about#rankings"
                  className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full font-medium transition-all duration-300 group animate-fadeInRight delay-700 hover:scale-105"
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
        </AnimatedSection>

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
              <h2 className="text-lg font-semibold text-gray-900">{'Featured Advertisers'}</h2>
              <Link href="/advertise" className="text-sm text-primary hover:text-primary-dark">
                {'Advertise with us'} →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredAdvertisers?.map((advertiser) => (
                <div key={advertiser.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow max-w-sm mx-auto">
                  {advertiser.imageUrl && (
                    <div className="relative h-32 w-full">
                      <Image
                        src={advertiser.imageUrl}
                        alt={advertiser.name}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="font-semibold text-base mb-2">{advertiser.name}</h3>
                    <p className="text-gray-600 text-xs mb-3">{advertiser.description}</p>
                    <Link href={advertiser.ctaUrl} className="text-primary hover:text-primary-dark text-xs font-medium">
                      Learn More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FENAPO 2025 Highlight */}
        <section className="py-16 px-4 slp-gradient-bg relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-secondary opacity-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary opacity-10"></div>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/events/fenapo-fair.jpg"
                  alt={'FENAPO 2025'}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarIcon className="w-5 h-5" />
                    <span className="font-medium">{'August 8 - 31, 2025'}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium text-sm mb-4">
                  Featured Event
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 font-serif">
                  {'FENAPO 2025'}
                </h2>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-800">
                  {'Feria Nacional Potosina'}
                </h3>
                <div className="prose prose-lg mb-8 text-gray-600 slp-accent-border">
                  <p>
                    {'The most traditional fair in Mexico returns to San Luis Potosí with 24 days of cultural events, sports, gastronomy, concerts and entertainment for the whole family.'}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{'Teatro del Pueblo with national and international artists'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{'Traditional Mexican palenque shows'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{'Regional and international gastronomy'}</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/events/fenapo-2025"
                  className="bg-blue-800 hover:bg-blue-900 text-white font-medium px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
                >
                  {'Learn More'}
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
                {'Connect with San Luis Potosí'}
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{'Discover unique local experiences'}</h2>
              <p className="text-lg text-gray-600">
                {'Explore the best of San Luis Potosí with our complete guide to services, events, and places to visit.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="slp-card p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">{'Expat Community'}</h3>
                <p className="text-gray-600 mb-6">{'Connect with other expatriates and share experiences in San Luis Potosí.'}</p>
                <Link href="/community" className="inline-flex items-center text-secondary font-medium">
                  {'Learn more'}
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
                <h3 className="text-xl font-semibold mb-4">{'Discover Places'}</h3>
                <p className="text-gray-600 mb-6">{'Find the best restaurants, shops, and leisure spaces in the city.'}</p>
                <Link href="/places" className="inline-flex items-center text-primary font-medium">
                  {'Explore'}
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
                <h3 className="text-xl font-semibold mb-4">{'Cultural Events'}</h3>
                <p className="text-gray-600 mb-6">{'Stay up to date with festivals, concerts, and exhibitions in San Luis.'}</p>
                <Link href="/events" className="inline-flex items-center text-secondary font-medium">
                  {'View calendar'}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Listings Banner */}
        <ListingsBanner />

        {/* Welcome/About Section */}
        <section id="discover" className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                Your Gateway to San Luis Potosí
              </span>
              <h2 className="font-serif text-4xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
                Discover the Heart of Mexico
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Connect with local experiences, find trusted services, and make San Luis Potosí your home
              </p>
              <p className="text-lg text-primary font-medium bg-white/80 px-6 py-3 rounded-full inline-block shadow-lg">
                We serve as your personal intermediary for a seamless experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white rounded-xl p-8 shadow-elegant text-center hover-lift flex flex-col">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">Local Connections</h3>
                <p className="text-gray-600 mb-4 flex-grow">Connect with trusted locals and build your network in San Luis Potosí</p>
                <Link href="/local-connections" className="btn-primary text-white py-2 px-4 rounded-md text-sm inline-block mt-auto">
                  Start Connecting
                </Link>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-elegant text-center hover-lift flex flex-col">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">Cultural Experiences</h3>
                <p className="text-gray-600 mb-4 flex-grow">Immerse yourself in the rich culture and traditions of San Luis Potosí</p>
                <Link href="/cultural-experiences" className="btn-primary text-white py-2 px-4 rounded-md text-sm inline-block mt-auto">
                  Explore Culture
                </Link>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-elegant text-center hover-lift flex flex-col">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">Relocation Support</h3>
                <p className="text-gray-600 mb-4 flex-grow">Get professional assistance with your move and settling into San Luis Potosí</p>
                <Link href="/san-luis-potosi-relocation-support" className="btn-primary text-white py-2 px-4 rounded-md text-sm inline-block mt-auto">
                  Get Support
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Expat Services Section */}
        <AnimatedSection animationType="fadeInUp" delay={500}>
          <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-24 left-24 w-24 h-24 border-2 border-primary/8 rounded-full animate-float"></div>
              <div className="absolute bottom-24 right-24 w-32 h-32 border border-secondary/8 rounded-full animate-spinSlow"></div>
              <div className="absolute top-2/3 left-1/3 w-18 h-18 border border-primary/5 rounded-full animate-pulse"></div>
            </div>
            
            <div className="container mx-auto relative z-10">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <span className="text-primary text-sm font-medium uppercase tracking-wider animate-fadeInUp">
                  Comprehensive Support
                </span>
                <h2 className="font-serif text-4xl font-bold text-gray-900 mt-4 mb-6 leading-tight animate-fadeInUp delay-200">
                  Expat Services for Every Need
                </h2>
                <p className="text-xl text-gray-600 animate-fadeInUp delay-300">
                  From housing to healthcare, we connect you with trusted professionals for all your expat needs
                </p>
                <div className="mt-8 bg-white p-6 rounded-xl border border-primary/20 max-w-2xl mx-auto shadow-lg animate-fadeInUp delay-400">
                  <p className="text-lg text-gray-800 italic">
                    We connect you with trusted local professionals and service providers, serving as your personal intermediary to navigate bureaucracy and language barriers.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 staggered-animation">
              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift group">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 8a3 3 0 11-6 0 3 3 0 016 0zm-3 11a8 8 0 100-16 8 8 0 000 16zm0 0v3m0-3h3m-3 0h-3m3 0v-3" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">Local Experiences</h3>
                <p className="text-gray-600 text-sm mb-4">Discover unique activities and connect with the local community</p>
                <Link
                  href="/san-luis-potosi-experiences"
                  className="block text-center bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  Explore Now
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift group">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">Housing Services</h3>
                <p className="text-gray-600 text-sm mb-4">Find the perfect home with our rental and purchase assistance</p>
                <Link
                  href="/san-luis-potosi-housing-services"
                  className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  Find Housing
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift group">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">Legal & Administrative</h3>
                <p className="text-gray-600 text-sm mb-4">Get help with visa, permits, and legal documentation</p>
                <Link
                  href="/san-luis-potosi-legal-administrative"
                  className="block text-center bg-secondary hover:bg-secondary-light text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Help
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift group">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">Community Integration</h3>
                <p className="text-gray-600 text-sm mb-4">Connect with local communities and social groups</p>
                <Link
                  href="/san-luis-potosi-community-integration"
                  className="block text-center bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  Join Community
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift group">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">Family Support</h3>
                <p className="text-gray-600 text-sm mb-4">Resources for families moving to San Luis Potosí</p>
                <Link
                  href="/san-luis-potosi-family-support"
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  Family Resources
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift group">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">Pet Care Services</h3>
                <p className="text-gray-600 text-sm mb-4">Find veterinarians and pet care services</p>
                <Link
                  href="/san-luis-potosi-pet-care"
                  className="block text-center bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  Pet Services
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift group">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">Health & Wellness</h3>
                <p className="text-gray-600 text-sm mb-4">Healthcare providers and wellness services</p>
                <Link
                  href="/san-luis-potosi-wellness-services"
                  className="block text-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  Health Services
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-elegant hover-lift group">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">Home Services</h3>
                <p className="text-gray-600 text-sm mb-4">Utilities, maintenance, and home setup services</p>
                <Link
                  href="/san-luis-potosi-home-services"
                  className="block text-center bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  Home Help
                </Link>
              </div>
            </div>

              <div className="mt-12 text-center animate-fadeInUp delay-1000">
                <Link
                  href="/contact"
                  className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-md transition-colors hover:scale-105 duration-300"
                >
                  Need Personal Assistance?
                </Link>
                <p className="text-sm text-gray-500 mt-4 max-w-xl mx-auto">
                  Some services may charge fees. We'll always inform you beforehand.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Outdoors Section */}
        <AnimatedSection animationType="fadeInUp" delay={400}>
          <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-16 right-16 w-28 h-28 border-2 border-green-500/10 rounded-full animate-float"></div>
              <div className="absolute bottom-16 left-16 w-32 h-32 border border-blue-500/10 rounded-full animate-spinSlow"></div>
              <div className="absolute top-1/3 left-1/3 w-20 h-20 border border-teal-500/5 rounded-full animate-pulse"></div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fadeInUp">
                  Outdoor Adventures
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fadeInUp delay-200">
                  Discover San Luis Potosí's natural wonders and outdoor activities
                </p>
              </div>

              <div className="animate-fadeInUp delay-400">
                <ImageCarousel 
                  items={outdoorActivities} 
                  itemsPerView={4}
                  height="h-64"
                  interval={6000}
                />
              </div>

              <div className="text-center mt-12 animate-fadeInUp delay-600">
                <Link
                  href="/outdoors"
                  className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary-light text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Explore All Outdoor Activities
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </AnimatedSection>

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
                        href={`/brands/${brand.slug}`}
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
              <h2 className="text-2xl font-bold text-gray-900">Potosino Brands</h2>
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
                  Local Tips
                </span>
                <h2 className="font-serif text-4xl font-bold text-gray-900 mt-2 mb-6">
                  City Hacks & Local Insights
                </h2>
                <p className="text-lg text-gray-600">
                  Essential tips from locals to help you navigate San Luis Potosí like a pro
                </p>
              </div>
              <Link
                href="/city-hacks"
                className="mt-6 md:mt-0 inline-block text-secondary hover:text-secondary-light font-medium"
              >
                View All Tips →
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
                    Transportation
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Best ways to get around the city
                  </p>
                  <Link href="/city-hacks/transport" className="text-secondary hover:text-secondary-light font-medium text-sm">
                    Read More →
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
                    Shopping
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Where to find the best deals and local products
                  </p>
                  <Link href="/city-hacks/shopping" className="text-secondary hover:text-secondary-light font-medium text-sm">
                    Read More →
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
                    Language Tips
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Spanish phrases and communication tips
                  </p>
                  <Link href="/city-hacks/language" className="text-secondary hover:text-secondary-light font-medium text-sm">
                    Read More →
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
        <AnimatedSection animationType="fadeInUp" delay={300} id="explore">
          <section className="py-20 px-4 bg-white relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-20 w-20 h-20 border-2 border-primary/10 rounded-full animate-float"></div>
              <div className="absolute bottom-20 right-20 w-24 h-24 border border-secondary/10 rounded-full animate-spinSlow"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-primary/5 rounded-full animate-pulse"></div>
            </div>
            
            <div className="container mx-auto relative z-10">
              <div className="text-center mb-12">
                <span className="text-primary text-sm font-medium uppercase tracking-wider animate-fadeInUp">
                  MARK YOUR CALENDAR
                </span>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mt-2 mb-4 animate-fadeInUp delay-200">
                  Upcoming Events
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fadeInUp delay-300">
                  Don't miss out on these exciting events happening in San Luis Potosí.
                </p>
              </div>

              <div className="animate-fadeInUp delay-500">
                <EventsCarousel events={events} />
              </div>

              {/* View All Events Button */}
              <div className="text-center mt-12 animate-fadeInUp delay-700">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  View All Events
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/*
        ============================================================
        FEATURED POTOSINOS SECTION - TEMPORARILY DISABLED
        ============================================================
        This section showcases remarkable individuals from San Luis Potosí.
        To re-enable: Remove this comment block and restore the section below.

        Section included:
        - Featured Potosinos header with community spotlight
        - 4 profile cards (María González, Carlos Ramírez, Alejandra Vega, Miguel Ortiz)
        - "Meet More Remarkable Potosinos" CTA button
        - Community nomination link

        Location: Between Event Categories and Cultural Heritage sections
        ============================================================
        */}

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
                  Explore San Luis Potosí's rich cultural heritage and traditions
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
                          Historical Heritage
                        </h3>
                        <p className="text-gray-600">
                          Discover the colonial architecture and historical significance
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
                          Cultural Festivals
                        </h3>
                        <p className="text-gray-600">
                          Year-round celebrations and traditional events
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
                          Local Language
                        </h3>
                        <p className="text-gray-600">
                          Spanish language resources and cultural nuances
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
                    View Event Calendar
                  </Link>
                  <Link
                    href="/cultural-tours"
                    className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:border-gray-300 transition-colors text-center"
                  >
                    Book Cultural Tour
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
                      <span className="text-white text-sm font-medium">Historic downtown San Luis Potosí</span>
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
                      <span className="text-white text-sm font-medium">Traditional festivals and celebrations</span>
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
                      <span className="text-white text-sm font-medium">Local artisans and crafts</span>
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

        {/* Digital Advertising Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Advertise with San Luis Way</h2>
              <p className="text-lg text-gray-600 mb-8">Reach your target audience and grow your business in San Luis Potosí</p>
            </div>
            <div className="flex justify-center">
              <div className="bg-white rounded-xl p-8 shadow-md max-w-md">
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
                  href="/advertise"
                  className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  Learn More
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
              adSlot="9795283286"
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
