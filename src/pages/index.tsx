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
import RobotMindBanner from '@/components/RobotMindBanner';
import TodayInSLP from '@/components/TodayInSLP';
import FestivalPrimaveraBanner from '@/components/FestivalPrimaveraBanner';
import CopaPotosiBanner from '@/components/CopaPotosiBanner';
import BlogCarousel from '@/components/BlogCarousel';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

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
      imageUrl: post.imageUrl || 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?q=80&w=1000',
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

  // Outdoor activities data
  const outdoorActivities = [
    {
      id: 'hiking',
      title: t('homepage.outdoors.hiking.title'),
      description: t('homepage.outdoors.hiking.description'),
      image: '/images/outdoors/hiking.jpg',
      link: '/outdoors#hiking',
      linkText: t('homepage.outdoors.hiking.linkText'),
      badge: t('homepage.outdoors.hiking.badge'),
      badgeColor: 'bg-green-500'
    },
    {
      id: 'camping',
      title: t('homepage.outdoors.camping.title'),
      description: t('homepage.outdoors.camping.description'),
      image: '/images/outdoors/camping.jpg',
      link: '/outdoors#camping',
      linkText: t('homepage.outdoors.camping.linkText'),
      badge: t('homepage.outdoors.camping.badge'),
      badgeColor: 'bg-blue-500'
    },
    {
      id: 'real-catorce',
      title: t('homepage.outdoors.realCatorce.title'),
      description: t('homepage.outdoors.realCatorce.description'),
      image: '/images/outdoors/real-de-catorce-main.jpg',
      link: '/outdoors#real-catorce',
      linkText: t('homepage.outdoors.realCatorce.linkText'),
      badge: t('homepage.outdoors.realCatorce.badge'),
      badgeColor: 'bg-purple-500'
    },
    {
      id: 'media-luna',
      title: t('homepage.outdoors.mediaLuna.title'),
      description: t('homepage.outdoors.mediaLuna.description'),
      image: '/images/outdoors/media-luna.jpg',
      link: '/outdoors#media-luna',
      linkText: t('homepage.outdoors.mediaLuna.linkText'),
      badge: t('homepage.outdoors.mediaLuna.badge'),
      badgeColor: 'bg-cyan-500'
    },
    {
      id: 'huasteca',
      title: t('homepage.outdoors.huasteca.title'),
      description: t('homepage.outdoors.huasteca.description'),
      image: '/images/outdoors/huasteca-waterfall.jpg',
      link: '/outdoors#huasteca',
      linkText: t('homepage.outdoors.huasteca.linkText'),
      badge: t('homepage.outdoors.huasteca.badge'),
      badgeColor: 'bg-teal-500'
    },
    {
      id: 'xilitla',
      title: t('homepage.outdoors.xilitla.title'),
      description: t('homepage.outdoors.xilitla.description'),
      image: '/images/outdoors/xilitla.webp',
      link: '/outdoors#xilitla',
      linkText: t('homepage.outdoors.xilitla.linkText'),
      badge: t('homepage.outdoors.xilitla.badge'),
      badgeColor: 'bg-pink-500'
    }
  ];

  // Practical guides data
  const practicalGuides = [
    {
      id: 'family',
      title: t('homepage.practical.family.title'),
      description: t('homepage.practical.family.description'),
      image: '/images/practical-categories/family-activities.webp',
      link: '/category/family-activities',
      badge: t('homepage.practical.family.badge'),
    },
    {
      id: 'rainy-day',
      title: t('homepage.practical.rainyDay.title'),
      description: t('homepage.practical.rainyDay.description'),
      image: '/images/practical-categories/activities-rainy-day.jpg',
      link: '/category/rainy-day-activities',
      badge: t('homepage.practical.rainyDay.badge'),
    },
    {
      id: 'playgrounds',
      title: t('homepage.practical.playgrounds.title'),
      description: t('homepage.practical.playgrounds.description'),
      image: '/images/practical-categories/restaurants-with-playgrounds.png',
      link: '/category/restaurants-with-playgrounds',
      badge: t('homepage.practical.playgrounds.badge'),
    },
    {
      id: 'healthcare',
      title: t('homepage.practical.healthcare.title'),
      description: t('homepage.practical.healthcare.description'),
      image: '/images/practical-categories/english-speaking-healthcare.jpg',
      link: '/category/english-speaking-healthcare',
      badge: t('homepage.practical.healthcare.badge'),
    },
    {
      id: 'markets',
      title: t('homepage.practical.markets.title'),
      description: t('homepage.practical.markets.description'),
      image: '/images/practical-categories/international-markets.jpg',
      link: '/category/international-markets',
      badge: t('homepage.practical.markets.badge'),
    },
    {
      id: 'parking',
      title: t('homepage.practical.parking.title'),
      description: t('homepage.practical.parking.description'),
      image: '/images/practical-categories/easy-parking-spots.png',
      link: '/category/easy-parking-spots',
      badge: t('homepage.practical.parking.badge'),
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

      {/* Meta Pixel Code */}
      <Script id="facebook-pixel" strategy="afterInteractive">
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

        {/* TODAY IN SLP - Daily Dashboard */}
        <TodayInSLP />

        {/* FESTIVAL DE PRIMAVERA 2026 BANNER */}
        <FestivalPrimaveraBanner />

        {/* COPA POTOSI 2026 BANNER */}
        <CopaPotosiBanner />

        {/* EVENTS PREVIEW */}
        <EventsPreview events={events} />

        {/* ROBOTMIND BANNER - Primary (after events, high visibility) */}
        <RobotMindBanner variant="primary" />

        {/* FEATURED PLACES */}
        <FeaturedPlaces places={featuredAdvertisers} />

        {/* ROBOTMIND BANNER - Slim (between places and dining) */}
        <RobotMindBanner variant="slim" />

        {/* RESTAURANTS & BARS */}
        <DiningSection />

        {/* BLOG CAROUSEL - From the Blog */}
        {blogPosts.length > 0 && (
          <BlogCarousel
            posts={blogPosts}
            title={t('blog.title', 'From the Blog')}
            subtitle={t('blog.subtitle', 'Stories, tips, and insights for life in San Luis Potosí')}
          />
        )}

        {/* ROBOTMIND BANNER - Time (after blog, before culture) */}
        <RobotMindBanner variant="time" />

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

        {/* POTOSINO BRANDS */}
        <BrandsShowcase brands={featuredBrands} />

        {/* ROBOTMIND BANNER - Sponsored */}
        <RobotMindBanner variant="growth" />

        {/* LIFESTYLE BENEFITS */}
        <LifestyleBenefits />

        {/* CIRCLE OF TRUST BANNER */}
        <CircleOfTrustBanner />

        {/* ROBOTMIND BANNER - Sponsored */}
        <RobotMindBanner variant="slim" />

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
