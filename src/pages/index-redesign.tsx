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
import AdUnit from '../components/common/AdUnit';
import Testimonials from '@/components/Testimonials';
import { getBlogPostsBySlugs } from '@/lib/blog';
import { getSponsoredBrands } from '@/lib/brands';

interface HomeProps {
  events: Event[];
  featuredAdvertisers?: any[];
}

export const getStaticProps: GetStaticProps = async ({ }) => {
  try {
    const safetyDateString = getSafetyDateBuffer();
    const { data: eventsData, error: eventsError } = await supabase
      .from('events')
      .select("*")
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
      imageUrl: post.imageUrl || '/images/placeholder.jpg',
      ctaUrl: `/blog/${post.slug}`
    }));

    return {
      props: {
        events: events || [],
        featuredAdvertisers,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        events: [],
        featuredAdvertisers: [],
      },
    };
  }
};

export default function Home({ events = [], featuredAdvertisers = [] }: HomeProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  return (
    <div className="slp-root bg-white">
      <SEO
        title="San Luis Way - Your Elegant Guide to Living in San Luis Potosí"
        description="Discover the art of living in San Luis Potosí. Your sophisticated guide for expats and travelers seeking authentic experiences in Mexico's hidden gem."
        keywords="San Luis Potosí, SLP, expat guide, luxury travel, Mexico living, cultural experiences, digital nomad"
        ogImage="/og-image.jpg"
      />

      <Head>
        <title>Living in San Luis Potosí | Your Elegant Expat Guide 2025</title>
        <meta name="description" content="Experience the refined lifestyle of San Luis Potosí. Curated recommendations for discerning expats and travelers." />
      </Head>

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

        {/* TESTIMONIALS - Social Proof */}
        <section id="testimonials-001" className="py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">What People Say</span>
              <h2 className="font-serif text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Stories from Our Community
              </h2>
              <p className="text-xl text-gray-600">
                Real experiences from expats who've made San Luis Potosí their home
              </p>
            </div>

            <Testimonials />
          </div>
        </section>

        {/* EVENTS PREVIEW - Magazine Style */}
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

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.slice(0, 4).map((event, index) => (
                <article key={event.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.image_url || '/images/placeholder.jpg'}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />

                    {/* Date Badge */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-gray-900">
                          {new Date(event.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      {event.location}
                    </p>
                  </div>
                </article>
              ))}
            </div>

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
          isOpen={!!selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
}
