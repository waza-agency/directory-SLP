import React, { useState, Suspense, lazy, useMemo } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import { Place, Event as DirectoryEvent } from '@/types';
import SEO from '@/components/common/SEO';
import {
  HeroSection,
  EventsPreview,
  FeaturedPlaces,
  DiningSection,
  CultureSection,
  OutdoorsSection,
  PracticalGuidesSection,
  BrandsShowcase,
  LifestyleBenefits,
  FinalCTA
} from '@/components/home';
import { supabase, getSafetyDateBuffer, filterUpcomingEvents } from '@/lib/supabase';
import { getBlogPostsBySlugs, getBlogPosts, SupportedLocale } from '@/lib/blog';
import { getRandomPotosinoBrands } from '@/lib/brands';
import TangamangaBanner from '@/components/TangamangaBanner';
import CentroHistoricoBanner from '@/components/CentroHistoricoBanner';
import { logger } from '@/lib/logger';
import NewsletterBanner from '@/components/NewsletterBanner';
import CircleOfTrustBanner from '@/components/CircleOfTrustBanner';
import BetaBanner from '@/components/BetaBanner';
import CollaborationBanner from '@/components/CollaborationBanner';
import GlamLocalBanner from '@/components/GlamLocalBanner';
import AgentConnectBanner from '@/components/AgentConnectBanner';
import TodayInSLP from '@/components/TodayInSLP';
import EventCarouselBanner from '@/components/EventCarouselBanner';
import FamilyActivitiesBanner from '@/components/FamilyActivitiesBanner';
import BlogCarousel from '@/components/BlogCarousel';
import AdUnit from '@/components/common/AdUnit';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { outdoorActivities as outdoorData } from '@/data/outdoor';
import { guides as guidesData } from '@/data/guides';

// Lazy load heavy components for better performance
const PlaceModal = lazy(() => import('@/components/PlaceModal'));
const ImageCarousel = lazy(() => import('@/components/ImageCarousel'));

interface HomeProps {
  events: DirectoryEvent[];
  featuredAdvertisers?: any[];
  featuredBrands?: any[];
  blogPosts?: any[];
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

    const blogLocale = (locale || 'en') as SupportedLocale;

    const advertiserSlugs = ['san-luis-rey-tranvia', 'corazon-de-xoconostle', 'la-gran-via'];
    const featuredAdvertisersData = await getBlogPostsBySlugs(advertiserSlugs, blogLocale);

    const featuredAdvertisers = featuredAdvertisersData.map(post => ({
      id: post.id,
      name: post.title,
      description: post.excerpt,
      imageUrl: post.imageUrl || '/images/hero-bg.jpg',
      ctaUrl: `/blog/${post.slug}`
    }));

    // Fetch featured brands
    const featuredBrandsData = await getRandomPotosinoBrands(6);

    // Fetch blog posts for carousel
    const blogPostsData = await getBlogPosts(blogLocale);

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        events: events || [],
        featuredAdvertisers,
        featuredBrands: featuredBrandsData || [],
        blogPosts: blogPostsData.slice(0, 6) || [],
      },
      revalidate: 300,
    };
  } catch (error) {
    logger.error('Error fetching data:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        events: [],
        featuredAdvertisers: [],
        featuredBrands: [],
        blogPosts: [],
      },
      revalidate: 60,
    };
  }
};

export default function Home({ events = [], featuredAdvertisers = [], featuredBrands = [], blogPosts = [] }: HomeProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const { t } = useTranslation('common');
  const { locale } = useRouter();

  const glitchWords = useMemo(() => [
    t('homepage.hero.glitchWords.word1'),
    t('homepage.hero.glitchWords.word2'),
    t('homepage.hero.glitchWords.word3'),
    t('homepage.hero.glitchWords.word4'),
    t('homepage.hero.glitchWords.word5'),
    t('homepage.hero.glitchWords.word6'),
    t('homepage.hero.glitchWords.word7'),
    t('homepage.hero.glitchWords.word8'),
    t('homepage.hero.glitchWords.word9'),
    t('homepage.hero.glitchWords.word10'),
    t('homepage.hero.glitchWords.word11'),
    t('homepage.hero.glitchWords.word12'),
    t('homepage.hero.glitchWords.word13'),
    t('homepage.hero.glitchWords.word14'),
  ], [t]);

  // Outdoor activities data — resolved from shared data file
  const outdoorActivities = outdoorData.map((a) => ({
    id: a.slug,
    title: t(a.titleKey),
    description: t(a.descriptionKey),
    image: a.image,
    link: a.path,
    linkText: t(a.linkTextKey),
    badge: t(a.badgeKey),
    badgeColor: a.badgeColor,
  }));

  // Practical guides data — resolved from shared data file (only category guides)
  const practicalGuides = guidesData
    .filter((g) => g.path.startsWith('/category/'))
    .map((g) => ({
      id: g.slug,
      title: t(g.titleKey),
      description: t(g.descriptionKey),
      image: g.image,
      link: g.path,
      badge: t(g.badgeKey),
    }));

  return (
    <div className="slp-root bg-white">
      <SEO
        title="San Luis Potosí Guide: Explore, Live & Thrive in SLP"
        description="Your complete guide to San Luis Potosí, Mexico. Curated restaurants, events, neighborhoods, cultural attractions and resources for travelers, digital nomads and expats."
        keywords="San Luis Potosí, SLP, expat guide San Luis Potosi, things to do san luis potosi, living in san luis potosi, Mexico expat, cultural experiences, digital nomad mexico, digital nomad San Luis Potosi, visit San Luis Potosi, travel guide SLP, coworking San Luis Potosi, remote work Mexico"
        ogImage="/og-image.jpg"
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              '@id': 'https://www.sanluisway.com/#organization',
              name: 'San Luis Way',
              url: 'https://www.sanluisway.com',
              logo: 'https://www.sanluisway.com/og-image.jpg',
              description: 'Editorial guide to San Luis Potosí, Mexico — for travelers, digital nomads and expats. Restaurants, places, events, neighborhoods and practical resources.',
              areaServed: {
                '@type': 'City',
                name: 'San Luis Potosí',
                sameAs: 'https://www.wikidata.org/wiki/Q204271',
              },
              sameAs: [
                'https://www.wikidata.org/wiki/Q139031973',
                'https://www.wikidata.org/wiki/Q204271',
                'https://en.wikipedia.org/wiki/San_Luis_Potos%C3%AD_(city)',
              ],
            },
            {
              '@type': 'TouristInformationCenter',
              '@id': 'https://www.sanluisway.com/#tic',
              name: 'San Luis Way — San Luis Potosí Travel, Nomad & Expat Guide',
              url: 'https://www.sanluisway.com',
              image: 'https://www.sanluisway.com/og-image.jpg',
              description: 'Curated information for travelers, digital nomads and expats in San Luis Potosí, S.L.P., Mexico. Restaurants, cultural attractions, events, neighborhoods and practical resources.',
              priceRange: 'Free',
              areaServed: [
                { '@type': 'City', name: 'San Luis Potosí' },
                { '@type': 'State', name: 'San Luis Potosí' },
                { '@type': 'Country', name: 'Mexico' },
              ],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'San Luis Potosí',
                addressRegion: 'SLP',
                addressCountry: 'MX',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 22.1565,
                longitude: -100.9855,
              },
              hasMap: 'https://www.google.com/maps/place/San+Luis+Potos%C3%AD,+S.L.P.',
              isAccessibleForFree: true,
              publicAccess: true,
              parentOrganization: { '@id': 'https://www.sanluisway.com/#organization' },
            },
            {
              '@type': 'WebSite',
              '@id': 'https://www.sanluisway.com/#website',
              url: 'https://www.sanluisway.com',
              name: 'San Luis Way',
              publisher: { '@id': 'https://www.sanluisway.com/#organization' },
              inLanguage: ['en', 'es'],
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.sanluisway.com/places?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            },
          ],
        }}
      />

      {/* Meta Pixel Code — lazyOnload to avoid blocking interactivity */}
      <Script id="facebook-pixel" strategy="lazyOnload">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1916912242550142');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1916912242550142&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      <main className="min-h-screen">

        {/* BETA BANNER */}
        <BetaBanner />

        {/* HERO SECTION */}
        <HeroSection glitchWords={glitchWords} />

        {/* AGENT CONNECT BANNER - Terminal Dark */}
        <AgentConnectBanner />

        {/* TODAY IN SLP - Daily Dashboard */}
        <TodayInSLP />

        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-6">
          <AdUnit placement="top-banner" />
        </div>

        {/* EVENT CAROUSEL BANNER */}
        <EventCarouselBanner />

        {/* EVENTS PREVIEW */}
        <EventsPreview events={events} />

        {/* ROBOTMIND BANNER - Primary (after events, high visibility) */}
        <GlamLocalBanner variant="primary" />

        {/* FEATURED PLACES */}
        <FeaturedPlaces places={featuredAdvertisers} />

        {/* FAMILY FRIENDLY ACTIVITIES BANNER */}
        <FamilyActivitiesBanner />

        {/* ROBOTMIND BANNER - Slim (between places and dining) */}
        <GlamLocalBanner variant="slim" />

        {/* RESTAURANTS & BARS */}
        <DiningSection />

        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-6">
          <AdUnit placement="mid-content" />
        </div>

        {/* BLOG CAROUSEL - From the Blog */}
        {blogPosts.length > 0 && (
          <BlogCarousel
            posts={blogPosts}
            title={t('blog.title', 'From the Blog')}
            subtitle={t('blog.subtitle', 'Stories, tips, and insights for life in San Luis Potosí')}
          />
        )}

        {/* ROBOTMIND BANNER - Time (after blog, before culture) */}
        <GlamLocalBanner variant="time" />

        {/* CULTURAL HERITAGE */}
        <CultureSection />

        {/* OUTDOOR ADVENTURES */}
        <OutdoorsSection activities={outdoorActivities} />

        {/* PARQUE TANGAMANGA BANNER */}
        <TangamangaBanner />

        {/* CENTRO HISTORICO BANNER */}
        <CentroHistoricoBanner />

        {/* FAMILY & PRACTICAL GUIDES */}
        <PracticalGuidesSection guides={practicalGuides} />

        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-6">
          <AdUnit placement="matched" />
        </div>

        {/* POTOSINO BRANDS */}
        <BrandsShowcase brands={featuredBrands} />

        {/* ROBOTMIND BANNER - Sponsored */}
        <GlamLocalBanner variant="growth" />

        {/* LIFESTYLE BENEFITS */}
        <LifestyleBenefits />

        {/* CIRCLE OF TRUST BANNER */}
        <CircleOfTrustBanner />

        {/* ROBOTMIND BANNER - Sponsored */}
        <GlamLocalBanner variant="slim" />

        {/* NEWSLETTER BANNER - Mid Content */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <NewsletterBanner variant="mid-content" />
        </div>

        {/* NEWSLETTER HERO BANNER */}
        <NewsletterBanner variant="hero" />

        {/* COLLABORATION BANNER */}
        <CollaborationBanner />

        {/* DISCLAIMER SECTION */}
        <section id="disclaimer-001" className="py-12 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm text-gray-500 leading-relaxed">
                <span className="font-semibold text-gray-600">{t('homepage.disclaimer.title')}</span>{' '}
                {t('homepage.disclaimer.text')}
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <FinalCTA />

      </main>

      {/* Place Modal */}
      {selectedPlace && (
        <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"><div className="bg-white p-8 rounded-lg">Loading...</div></div>}>
          <PlaceModal
            place={selectedPlace}
            onClose={() => setSelectedPlace(null)}
          />
        </Suspense>
      )}
    </div>
  );
}
