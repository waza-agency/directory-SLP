import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Place } from '@/types';
import PlaceModal from '@/components/PlaceModal';
import { useState } from 'react';
import Image from 'next/image';
import { CalendarIcon, MegaphoneIcon, MapPinIcon, SparklesIcon, HeartIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Event } from '@/types';
import { supabase, getSafetyDateBuffer, filterUpcomingEvents } from '@/lib/supabase';
import SEO from '@/components/common/SEO';
import { getBlogPostsBySlugs } from '@/lib/blog';
import { getSponsoredBrands, getRandomPotosinoBrands } from '@/lib/brands';
import TangamangaBanner from '@/components/TangamangaBanner';
import ImageCarousel from '@/components/ImageCarousel';
import AdUnit from '@/components/common/AdUnit';
import NewsletterBanner from '@/components/NewsletterBanner';
import CircleOfTrustBanner from '@/components/CircleOfTrustBanner';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface HomeProps {
  events: Event[];
  featuredAdvertisers?: any[];
  featuredBrands?: any[];
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    const safetyDateString = getSafetyDateBuffer();
    const { data: eventsData, error: eventsError } = await supabase
      .from('events')
      .select("*")
      .eq('add_to_cultural_calendar', true)
      .gte('end_date', safetyDateString)
      .order('start_date', { ascending: true })
      .limit(12);

    if (eventsError) throw eventsError;
    const events = filterUpcomingEvents(eventsData).slice(0, 8);

    const advertiserSlugs = ['san-luis-rey-tranvia', 'corazon-de-xoconostle', 'la-gran-via'];
    const featuredAdvertisersData = await getBlogPostsBySlugs(advertiserSlugs);

    const featuredAdvertisers = featuredAdvertisersData.map(post => ({
      id: post.id,
      name: post.title,
      description: post.excerpt,
      imageUrl: post.imageUrl || 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?q=80&w=1000',
      ctaUrl: `/blog/${post.slug}`
    }));

    // Fetch featured brands
    const featuredBrandsData = await getRandomPotosinoBrands(6);

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        events: events || [],
        featuredAdvertisers,
        featuredBrands: featuredBrandsData || [],
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        events: [],
        featuredAdvertisers: [],
        featuredBrands: [],
      },
    };
  }
};

export default function Home({ events = [], featuredAdvertisers = [], featuredBrands = [] }: HomeProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  // Outdoor activities data
  const outdoorActivities = [
    {
      id: 'hiking',
      title: 'Hiking Trails',
      description: 'Explore scenic mountain trails and natural landscapes',
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

  // Practical guides data
  const practicalGuides = [
    {
      id: 'family',
      title: 'Family Activities',
      description: 'Fun things to do with kids in San Luis Potosí',
      image: '/images/practical-categories/family-activities.webp',
      link: '/category/family-activities',
      badge: 'Family',
    },
    {
      id: 'rainy-day',
      title: 'Rainy Day Activities',
      description: 'Indoor fun for when the weather turns',
      image: '/images/practical-categories/activities-rainy-day.jpg',
      link: '/category/rainy-day-activities',
      badge: 'Indoor',
    },
    {
      id: 'playgrounds',
      title: 'Restaurants with Playgrounds',
      description: 'Dining spots where kids can play safely',
      image: '/images/practical-categories/restaurants-with-playgrounds.png',
      link: '/category/restaurants-with-playgrounds',
      badge: 'Dining',
    },
    {
      id: 'healthcare',
      title: 'English-Speaking Healthcare',
      description: 'Medical services for the international community',
      image: '/images/practical-categories/english-speaking-healthcare.jpg',
      link: '/category/english-speaking-healthcare',
      badge: 'Health',
    },
    {
      id: 'markets',
      title: 'International Markets',
      description: 'Where to find imported goods and specialty foods',
      image: '/images/practical-categories/international-markets.jpg',
      link: '/category/international-markets',
      badge: 'Shopping',
    },
    {
      id: 'parking',
      title: 'Easy Parking Spots',
      description: 'Guide to parking in the city center',
      image: '/images/practical-categories/easy-parking-spots.png',
      link: '/category/easy-parking-spots',
      badge: 'Practical',
    }
  ];

  return (
    <div className="slp-root bg-white">
      <SEO
        title="Living in San Luis Potosí | Your Elegant Expat Guide 2025"
        description="Experience the refined lifestyle of San Luis Potosí. Curated recommendations for discerning expats and travelers seeking authentic experiences in Mexico's hidden gem."
        keywords="San Luis Potosí, SLP, expat guide, luxury travel, Mexico living, cultural experiences, digital nomad"
        ogImage="/og-image.jpg"
      />

      <main className="min-h-screen">

        {/* HERO SECTION - Full Screen Immersive */}
        <section id="hero-001" className="relative h-screen min-h-[700px] max-h-[1000px] flex items-center overflow-hidden bg-gray-900">
          {/* Background Image with Parallax Effect */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="San Luis Potosí"
              fill
              className="object-cover scale-105 opacity-60"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          </div>

          {/* Elegant Decorative Elements */}
          <div className="absolute top-20 right-20 w-64 h-64 border border-primary/20 rounded-full opacity-40 animate-pulse-slow" />
          <div className="absolute bottom-32 left-20 w-48 h-48 border border-white/10 rounded-full opacity-30 animate-float" />

          {/* Hero Content */}
          <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="max-w-4xl">

              {/* Refined Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8 animate-fade-in">
                <SparklesIcon className="w-5 h-5 text-primary" />
                <span className="text-white font-medium text-sm tracking-wider uppercase">Trusted by 1,000+ Expats</span>
              </div>

              {/* Elegant Typography */}
              <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] animate-slide-up tracking-tight">
                Your Refined Life in<br />
                <span className="text-primary italic">San Luis Potosí</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl leading-relaxed font-light animate-fade-in" style={{animationDelay: '200ms'}}>
                Discover a sophisticated lifestyle where colonial charm meets modern comfort. Your curated guide to living, exploring, and thriving in Mexico's hidden gem.
              </p>

              {/* Elegant CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '400ms'}}>
                <Link
                  href="#explore"
                  className="group inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 hover:shadow-2xl"
                >
                  Start Exploring
                  <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/places"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-gray-900 hover:border-white"
                >
                  View Places
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* LIFESTYLE BENEFITS - Why SLP */}
        <section id="benefits-001" className="py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">Why San Luis Potosí</span>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                A Life Well Lived
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience the perfect blend of affordability, culture, and quality of life in Mexico's second-best city
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

              {/* Benefit 1 */}
              <div className="group relative bg-white rounded-3xl p-10 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2">
                <div className="absolute -top-6 left-10 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4 mt-6">Affordable Excellence</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Enjoy a sophisticated lifestyle at a fraction of the cost. Quality housing, dining, and services that don't break the bank.
                </p>
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <p className="text-sm text-gray-500 font-medium">Average monthly cost: $1,200-$2,000</p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="group relative bg-white rounded-3xl p-10 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2">
                <div className="absolute -top-6 left-10 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <HeartIcon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4 mt-6">Rich Cultural Heritage</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Immerse yourself in centuries of history, colonial architecture, and vibrant traditions that make every day special.
                </p>
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <p className="text-sm text-gray-500 font-medium">UNESCO World Heritage nearby</p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="group relative bg-white rounded-3xl p-10 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2">
                <div className="absolute -top-6 left-10 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <UserGroupIcon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4 mt-6">Welcoming Community</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Join a growing expat community while experiencing authentic Mexican hospitality and warm local connections.
                </p>
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <p className="text-sm text-gray-500 font-medium">1,000+ active expat members</p>
                </div>
              </div>
            </div>

            {/* Recognition Banner */}
            <div className="mt-20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl p-10 border border-primary/20">
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <MegaphoneIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                    Mexico's 2nd Best City to Live
                  </h3>
                  <p className="text-gray-700 text-lg">
                    Recognized by IMCO for quality of life, safety, and opportunity
                  </p>
                </div>
                <Link
                  href="/about#rankings"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CIRCLE OF TRUST BANNER */}
        <CircleOfTrustBanner />

        {/* Ad Placement 1 */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-8">
          <AdUnit style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }} />
        </div>

        {/* FEATURED PLACES - Editorial Style */}
        <section id="places-001" className="py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">

            {/* Section Header */}
            <div className="flex justify-between items-end mb-16">
              <div className="max-w-2xl">
                <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">Curated Experiences</span>
                <h2 className="font-serif text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Discover Hidden Gems
                </h2>
                <p className="text-xl text-gray-600">
                  Handpicked by locals and expats who know the city best
                </p>
              </div>
              <Link
                href="/places"
                className="hidden md:inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-primary transition-colors group"
              >
                View All Places
                <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Places Grid - Editorial Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Featured Place Card Template */}
              {featuredAdvertisers.slice(0, 3).map((place, index) => (
                <article key={place.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={place.imageUrl}
                      alt={place.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Floating Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-xs font-semibold text-gray-900">Featured</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {place.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                      {place.description}
                    </p>
                    <Link
                      href={place.ctaUrl}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                    >
                      Discover More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile View All Link */}
            <div className="mt-12 text-center md:hidden">
              <Link
                href="/places"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all"
              >
                View All Places
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Ad Placement 2 */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-8">
          <AdUnit style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }} />
        </div>

        {/* EVENTS PREVIEW - Magazine Style - Only show if there are events */}
        {events.length > 0 && (
          <section id="events-001" className="py-32 bg-white">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">

              {/* Section Header */}
              <div className="flex justify-between items-end mb-16">
                <div className="max-w-2xl">
                  <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">What's Happening</span>
                  <h2 className="font-serif text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    Cultural Calendar
                  </h2>
                  <p className="text-xl text-gray-600">
                    From art exhibitions to traditional festivals
                  </p>
                </div>
                <Link
                  href="/events"
                  className="hidden md:inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-primary transition-colors group"
                >
                  View All Events
                  <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Events Carousel - Horizontal Auto-Scroll */}
              <div className="relative overflow-hidden">
                <div
                  className="flex gap-6 animate-carousel"
                  style={{
                    animation: 'scroll 40s linear infinite',
                  }}
                >
                  {/* Duplicate events for seamless loop */}
                  {[...events.slice(0, 8), ...events.slice(0, 8)].map((event, index) => (
                    <article
                      key={`${event.id}-${index}`}
                      className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 flex-shrink-0 w-[400px]"
                    >
                      <div className="flex items-start gap-4">
                        {/* Date Badge */}
                        <div className="flex-shrink-0 text-center">
                          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-3 min-w-[70px]">
                            <div className="text-2xl font-bold text-primary">
                              {new Date(event.start_date).toLocaleDateString('en-US', { day: 'numeric' })}
                            </div>
                            <div className="text-xs font-semibold text-gray-600 uppercase">
                              {new Date(event.start_date).toLocaleDateString('en-US', { month: 'short' })}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>

                          {event.description && (
                            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                              {event.description}
                            </p>
                          )}

                          <div className="space-y-1.5 text-xs text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <MapPinIcon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>

                            {new Date(event.start_date).toDateString() !== new Date(event.end_date).toDateString() && (
                              <div className="flex items-center gap-1.5">
                                <CalendarIcon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                <span>
                                  Until {new Date(event.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                              </div>
                            )}

                            {event.category && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                                {event.category.replace('-', ' ')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Gradient Overlays for fade effect */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
              </div>

              <style jsx>{`
                @keyframes scroll {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-50%);
                  }
                }
              `}</style>

              {/* Mobile View All Link */}
              <div className="mt-12 text-center md:hidden">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all"
                >
                  View All Events
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Ad Placement 3 */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-8">
          <AdUnit style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }} />
        </div>

        {/* NEWSLETTER BANNER - Mid Content */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <NewsletterBanner variant="mid-content" />
        </div>

        {/* CULTURAL HERITAGE - Traditions & History */}
        <section id="culture-001" className="py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Content Side */}
              <div>
                <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4 bg-gradient-to-r from-emerald-100 to-teal-100 px-6 py-2 rounded-full">
                  Cultural Heritage
                </span>
                <h2 className="font-serif text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Traditions & History
                </h2>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                  Explore San Luis Potosí's rich cultural heritage and traditions that make this city truly special
                </p>

                {/* Cultural Features */}
                <div className="space-y-6 mb-12">

                  {/* Historical Heritage */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <Link href="/cultural/history" className="block hover:opacity-80 transition-opacity">
                        <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                          Historical Heritage
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          Discover the colonial architecture and historical significance of this UNESCO-adjacent city
                        </p>
                      </Link>
                    </div>
                  </div>

                  {/* Cultural Festivals */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                      </svg>
                    </div>
                    <div>
                      <Link href="/cultural/festivals" className="block hover:opacity-80 transition-opacity">
                        <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                          Cultural Festivals
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          Year-round celebrations and traditional events that bring the community together
                        </p>
                      </Link>
                    </div>
                  </div>

                  {/* Local Language */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-600/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <Link href="/cultural/language" className="block hover:opacity-80 transition-opacity">
                        <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                          Local Language
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          Spanish language resources and cultural nuances to help you integrate
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/events/cultural"
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    View Event Calendar
                    <CalendarIcon className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/cultural-tours"
                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    Book Cultural Tour
                  </Link>
                </div>
              </div>

              {/* Images Grid Side */}
              <div className="grid grid-cols-12 gap-4">
                {/* Main Large Image */}
                <div className="col-span-7">
                  <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 group">
                    <Image
                      src="/images/cultura-1.jpg"
                      alt="Cultural Heritage San Luis Potosí"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-white font-semibold text-lg">Colonial Architecture</span>
                    </div>
                  </div>
                </div>

                {/* Two Stacked Images */}
                <div className="col-span-5 space-y-4">
                  {/* Top Image */}
                  <div className="aspect-square relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 group">
                    <Image
                      src="/images/cultura-2.jpg"
                      alt="Traditional Festivals"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="text-white text-sm font-medium">Traditional Festivals</span>
                    </div>
                  </div>

                  {/* Bottom Image */}
                  <div className="aspect-square relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 group">
                    <Image
                      src="/images/cultura-3.jpg"
                      alt="Local Artisans"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="text-white text-sm font-medium">Local Artisans</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* OUTDOOR ADVENTURES - Elegant Nature Section */}
        <section id="outdoors-001" className="py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">Beyond the City</span>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Natural Wonders Await
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                From mystical ghost towns to tropical waterfalls, discover the extraordinary landscapes surrounding San Luis Potosí
              </p>
            </div>

            {/* Outdoor Activities Carousel */}
            <div className="mb-12">
              <ImageCarousel
                items={outdoorActivities}
                itemsPerView={4}
                height="h-64"
                interval={6000}
              />
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link
                href="/outdoors"
                className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary-light text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                Explore All Adventures
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* PARQUE TANGAMANGA BANNER */}
        <TangamangaBanner />

        {/* RESTAURANTS & BARS - Culinary Excellence */}
        <section id="dining-001" className="py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">Culinary Scene</span>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Savor the Flavors
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                From traditional Potosino cuisine to modern fusion restaurants and trendy cocktail bars
              </p>
            </div>

            {/* Dining Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Traditional Restaurants */}
              <article className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/restaurants-and-bars/traditional-restaurants.jpg"
                    alt="Traditional Cuisine"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-2xl font-bold text-white">Traditional Cuisine</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Authentic Potosino restaurants serving enchiladas potosinas, zacahuil, and regional specialties
                  </p>
                  <Link href="/traditional-cuisine" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                    Explore Traditional →
                  </Link>
                </div>
              </article>

              {/* Modern Dining */}
              <article className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/restaurants-and-bars/modern-restaurants.webp"
                    alt="Modern Dining"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-2xl font-bold text-white">Modern Dining</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Contemporary restaurants with fusion cuisine, farm-to-table experiences, and innovative creations
                  </p>
                  <Link href="/modern-dining" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                    View Modern Spots →
                  </Link>
                </div>
              </article>

              {/* Cocktail Bars */}
              <article className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/restaurants-and-bars/cocktail-bars.webp"
                    alt="Cocktail Bars"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-2xl font-bold text-white">Cocktail Bars</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Trendy bars featuring craft cocktails, local mezcal, and vibrant nightlife
                  </p>
                  <Link href="/category/cocktail-bars" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                    Find Your Bar →
                  </Link>
                </div>
              </article>

              {/* Terraces */}
              <article className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/restaurants-and-bars/terraces.webp"
                    alt="Rooftop Terraces"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-2xl font-bold text-white">Rooftop Terraces</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Stunning rooftop venues with panoramic city views and al fresco dining
                  </p>
                  <Link href="/category/terraces" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                    See Terraces →
                  </Link>
                </div>
              </article>

              {/* Cantinas */}
              <article className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/restaurants-and-bars/cantinas.jpg"
                    alt="Traditional Cantinas"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-2xl font-bold text-white">Cantinas</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Authentic cantinas with traditional atmosphere, complimentary botanas, and mariachi
                  </p>
                  <Link href="/category/cantinas" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                    Visit Cantinas →
                  </Link>
                </div>
              </article>

              {/* Live Music */}
              <article className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/restaurants-and-bars/live-music.jpg"
                    alt="Live Music Venues"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-2xl font-bold text-white">Live Music</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Venues featuring live performances from jazz to rock, mariachi to electronic
                  </p>
                  <Link href="/category/live-music" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                    Find Live Music →
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* POTOSINO BRANDS - Local Craftsmanship */}
        <section id="brands-001" className="py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">Made in SLP</span>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Potosino Brands
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Authentic brands born in San Luis Potosí, showcasing local creativity and craftsmanship
              </p>
            </div>

            {/* Brands Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBrands.slice(0, 6).map((brand) => (
                <article key={brand.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={brand.image_url || "/images/placeholder.jpg"}
                      alt={brand.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                    {brand.category && (
                      <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold text-gray-900">{brand.category}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                      {brand.description}
                    </p>
                    <Link
                      href={`/brands/${brand.slug}`}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                    >
                      Discover Brand
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* View All CTA */}
            <div className="text-center mt-16">
              <Link
                href="/brands"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                Explore All Brands
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Ad Placement 4 */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-8">
          <AdUnit style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }} />
        </div>

        {/* FAMILY & PRACTICAL GUIDES - Useful Resources */}
        <section id="practical-001" className="py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">Useful Resources</span>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Practical Guides
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Essential information for families and daily life in San Luis Potosí
              </p>
            </div>

            {/* Practical Guides Carousel */}
            <div className="mb-12">
              <ImageCarousel
                items={practicalGuides}
                itemsPerView={3}
                height="h-64"
                autoPlay={false}
                interval={0} // Disable auto-scroll for practical guides
              />
            </div>
          </div>
        </section>

        {/* NEWSLETTER HERO BANNER */}
        <NewsletterBanner variant="hero" />

        {/* FINAL CTA - Elegant Call to Action */}
        <section id="cta-001" className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-64 h-64 border border-primary/20 rounded-full opacity-30 animate-pulse-slow" />
          <div className="absolute bottom-20 left-20 w-48 h-48 border border-white/10 rounded-full opacity-20 animate-float" />

          <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                Ready to Begin Your<br />San Luis Potosí Journey?
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Join our community of expats and travelers discovering the art of living in Mexico's hidden gem
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  Get Personalized Assistance
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/community"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-gray-900"
                >
                  Join the Community
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-16 pt-12 border-t border-white/10">
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-gray-400">Verified Businesses</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">1,000+</div>
                    <div className="text-sm text-gray-400">Active Members</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">#2</div>
                    <div className="text-sm text-gray-400">Best City in Mexico</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Place Modal */}
      {selectedPlace && (
        <PlaceModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
}
