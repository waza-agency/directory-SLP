import { GetStaticPaths, GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Event } from '@/types';
import { supabase } from '@/lib/supabase';
import EventHeroCarousel from '@/components/EventHeroCarousel';
import EventCategoryFilter, { EventCategory } from '@/components/EventCategoryFilter';
import EventSearchBar from '@/components/EventSearchBar';
import EventComingUp from '@/components/EventComingUp';
import EventList from '@/components/EventList';
import EventMonthlyTimeline from '@/components/EventMonthlyTimeline';
import EventEmptyState from '@/components/EventEmptyState';
import SEO from '@/components/common/SEO';
import NewsletterBanner from '@/components/NewsletterBanner';
import { getCategoryTitle } from '@/utils/eventHelpers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface EventsPageProps {
  events: Event[];
  allEvents: Event[];
  categoryCounts: Record<string, number>;
  category: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = ['all', 'sports', 'cultural', 'arts-culture', 'music', 'culinary', 'community-social'];
  const paths = categories.map((category) => ({ params: { category } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  try {
    const category = params?.category as string;
    const validCategories = ['all', 'sports', 'cultural', 'arts-culture', 'music', 'culinary', 'community-social'];
    if (!validCategories.includes(category)) return { notFound: true };

    const { data: eventsData, error } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: true });
    if (error) throw error;

    const allEvents = eventsData || [];
    let filteredEvents = allEvents;
    if (category !== 'all') {
      const filterCategory = category === 'cultural' ? 'arts-culture' : category;
      filteredEvents = allEvents.filter((e) => e.category === filterCategory);
    }

    const artsCount = allEvents.filter((e) => e.category === 'arts-culture').length;
    const categoryCounts: Record<string, number> = {
      all: allEvents.length,
      sports: allEvents.filter((e) => e.category === 'sports').length,
      cultural: artsCount,
      'arts-culture': artsCount,
      music: allEvents.filter((e) => e.category === 'music').length,
      culinary: allEvents.filter((e) => e.category === 'culinary').length,
      'community-social': allEvents.filter((e) => e.category === 'community-social').length,
    };

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        events: filteredEvents,
        allEvents,
        categoryCounts,
        category,
      },
    };
  } catch (error) {
    console.error('Error fetching events:', error);
    const empty = { all: 0, sports: 0, cultural: 0, 'arts-culture': 0, music: 0, culinary: 0, 'community-social': 0 };
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        events: [],
        allEvents: [],
        categoryCounts: empty,
        category: (params?.category as string) || 'all',
      },
    };
  }
};

export default function EventsPage({ events, allEvents, categoryCounts, category }: EventsPageProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>(category as EventCategory);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => setSelectedCategory(category as EventCategory), [category]);

  const handleCategoryChange = (newCategory: EventCategory) => {
    router.push(`/events/${newCategory}`);
  };

  useEffect(() => {
    if (!searchTerm) {
      setFilteredEvents(events);
      return;
    }
    const term = searchTerm.toLowerCase();
    setFilteredEvents(
      events.filter(
        (e) =>
          e.title.toLowerCase().includes(term) ||
          (e.description?.toLowerCase() || '').includes(term) ||
          e.location.toLowerCase().includes(term)
      )
    );
  }, [searchTerm, events]);

  const handleClearFilters = () => {
    setSearchTerm('');
    router.push('/events/all');
  };

  // Featured events for the hero carousel (use all events to always show something)
  const heroEvents = allEvents.filter((e) => e.featured).slice(0, 5);
  const hasHero = heroEvents.length > 0;

  return (
    <>
      <SEO
        title={`${getCategoryTitle(category)} en San Luis Potosí - SLP Descubre`}
        description={`Descubre los mejores ${getCategoryTitle(category).toLowerCase()} en San Luis Potosí. Agenda cultural, conciertos, festivales y más.`}
      />

      {/* Hero Carousel (featured / sponsored events) */}
      {hasHero && <EventHeroCarousel events={heroEvents} />}

      {/* Main Content */}
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-6">
          {/* Page heading + Search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
              {getCategoryTitle(category)}
            </h1>
            <EventSearchBar value={searchTerm} onChange={setSearchTerm} className="md:w-80" />
          </div>

          {/* Category Filter */}
          <EventCategoryFilter
            selectedCategory={selectedCategory}
            onChange={handleCategoryChange}
            showCounts
            counts={categoryCounts}
          />

          {/* Empty state */}
          {filteredEvents.length === 0 && (
            <div className="mt-8">
              <EventEmptyState onClear={handleClearFilters} />
            </div>
          )}

          {/* Coming Up Next */}
          {filteredEvents.length > 0 && (
            <div className="mt-8">
              <EventComingUp events={filteredEvents} count={5} />
            </div>
          )}

          {/* Monthly Timeline */}
          {filteredEvents.length > 0 && (
            <section className="mb-12">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 pl-14 md:pl-20">
                Calendario de Eventos
              </h2>
              <EventMonthlyTimeline events={filteredEvents} />
            </section>
          )}

          {/* Newsletter CTA */}
          <NewsletterBanner variant="mid-content" className="mb-12" />
        </div>
      </div>
    </>
  );
}
