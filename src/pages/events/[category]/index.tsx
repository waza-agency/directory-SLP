import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Event } from '@/types';
import { supabase } from '@/lib/supabase';
import EventList from '@/components/EventList';
import EventCategoryFilter, { EventCategory } from '@/components/EventCategoryFilter';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';

interface EventsPageProps {
  events: Event[];
  categoryCounts: Record<string, number>;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    // Calculate the safety buffer date - 7 days in the past
    const safetyDateBuffer = new Date();
    safetyDateBuffer.setDate(safetyDateBuffer.getDate() - 7);
    const safetyDateString = safetyDateBuffer.toISOString();

    // Obtener eventos
    const { data: eventsData, error } = await supabase
      .from('events')
      .select('*')
      // Removed date filter temporarily
      .order('start_date', { ascending: true });

    if (error) throw error;

    console.log('All events found:', eventsData?.length || 0); // Log for debugging

    // Skip the date filtering temporarily
    const events = eventsData || [];

    // Calcular conteo de categorías
    const categoryCounts: Record<string, number> = {
      all: events?.length || 0,
      sports: events?.filter(event => event.category === 'sports').length || 0,
      cultural: events?.filter(event =>
        event.category === 'cultural' ||
        event.category === 'arts-culture' ||
        event.category === 'music'
      ).length || 0,
      culinary: events?.filter(event => event.category === 'culinary').length || 0,
      other: events?.filter(event =>
        event.category !== 'sports' &&
        event.category !== 'cultural' &&
        event.category !== 'arts-culture' &&
        event.category !== 'music' &&
        event.category !== 'culinary'
      ).length || 0,
    };

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        events: events || [],
        categoryCounts,
      },
      revalidate: 600, // Revalidar cada 10 minutos
    };
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        events: [],
        categoryCounts: {
          all: 0,
          sports: 0,
          cultural: 0,
          culinary: 0,
          other: 0
        },
      },
      revalidate: 600, // Revalidar cada 10 minutos
    };
  }
};

export default function EventsPage({ events, categoryCounts }: EventsPageProps) {
  const { t } = useTranslation('common');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar eventos cuando cambia la categoría o el término de búsqueda
  useEffect(() => {
    let result = events;

    // Ensure cultural events are marked for cultural calendar for consistent filtering
    // This doesn't change the database, just the client-side state
    result = result.map(event => {
      if (event.category === 'cultural' ||
          event.category === 'arts-culture' ||
          event.category === 'music') {
        return { ...event, show_in_cultural_calendar: true };
      }
      return event;
    });

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'cultural') {
        // For cultural category, include arts-culture and music events too
        // as well as any marked for cultural calendar
        result = result.filter(event =>
          event.category === 'cultural' ||
          event.category === 'arts-culture' ||
          event.category === 'arts culture' ||
          event.category === 'music' ||
          event.show_in_cultural_calendar === true
        );
      } else if (selectedCategory === 'arts-culture') {
        // Arts-culture filter should also work (direct URL navigation)
        result = result.filter(event =>
          event.category === 'arts-culture' ||
          event.category === 'arts culture'
        );
      } else {
        // For other categories, filter exactly
        result = result.filter(event => event.category === selectedCategory);
      }
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(event =>
        event.title.toLowerCase().includes(term) ||
        (event.description?.toLowerCase() || '').includes(term) ||
        event.location.toLowerCase().includes(term)
      );
    }

    setFilteredEvents(result);
  }, [selectedCategory, searchTerm, events]);

  // Separar eventos destacados de los regulares
  const featuredEvents = filteredEvents.filter(event => event.featured);
  const regularEvents = filteredEvents.filter(event => !event.featured);

  // Formatear fecha de forma amigable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Head>
        <title>{t('events')} - SLP Descubre</title>
        <meta
          name="description"
          content="Descubre los mejores eventos en San Luis Potosí: deportes, cultura, conciertos y más."
        />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-secondary text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/events/events-hero.jpg"
            alt="Eventos en San Luis Potosí"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">{t('events')}</h1>
            <p className="text-xl mb-8">
              {t('eventsDescription')}
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder={t('searchEvents')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <button className="text-primary p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <EventCategoryFilter
            selectedCategory={selectedCategory}
            onChange={setSelectedCategory}
            showCounts={true}
            counts={categoryCounts}
          />
        </div>

        {/* Mensaje si no hay eventos */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noEventsFound')}</h3>
              <p className="text-gray-600 mb-6">
                {t('noEventsFoundDescription')}
              </p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchTerm(''); }}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-dark transition-colors"
              >
                {t('clearFilters')}
              </button>
            </div>
          </div>
        )}

        {/* Eventos Destacados */}
        {featuredEvents.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">{t('featuredEvents')}</h2>
              {regularEvents.length > 0 && (
                <a
                  href="#all-events"
                  className="text-primary hover:text-primary-dark font-semibold flex items-center gap-2"
                >
                  {t('viewAllEvents')}
                  <ArrowLongRightIcon className="w-5 h-5" />
                </a>
              )}
            </div>
            <EventList events={featuredEvents} />
          </section>
        )}

        {/* Eventos Regulares */}
        {regularEvents.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">{t('regularEvents')}</h2>
            </div>
            <EventList events={regularEvents} />
          </section>
        )}
      </div>
    </>
  );
}