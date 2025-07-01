import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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

export const getStaticProps: GetStaticProps = async ({ }) => {
  // Default fallback values
  const fallbackProps = {
    props: {
      events: [],
      categoryCounts: {
        all: 0,
        sports: 0,
        cultural: 0,
        culinary: 0,
        other: 0
      },
    },
    revalidate: 600,
  };

  try {
    console.log('=== DEBUG: Getting events for /events/all ===');
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'DEFINED' : 'UNDEFINED');
    console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'DEFINED' : 'UNDEFINED');

    // Ensure supabase client exists
    if (!supabase) {
      console.error('Supabase client not available');
      return fallbackProps;
    }

    // Obtener eventos con manejo robusto de errores
    let eventsData = [];
    let error = null;

    try {
      // First try with all columns
      const result = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: true });

      if (result.error && result.error.code === '42703') {
        // Column doesn't exist, try without category
        console.log('Category column missing, trying alternative query...');
        const fallbackResult = await supabase
          .from('events')
          .select('id, title, description, start_date, end_date, location, image_url, featured, created_at, updated_at')
          .order('start_date', { ascending: true });

        if (fallbackResult.data) {
          eventsData = fallbackResult.data.map(event => ({ ...event, category: 'other' }));
        }
        error = fallbackResult.error;
      } else {
        eventsData = result.data || [];
        error = result.error;
      }
    } catch (err) {
      console.error('Error querying events table:', err);
      // Return fallback but don't fail the build
      return fallbackProps;
    }

    console.log('Supabase query error:', error);
    console.log('Events data:', eventsData?.length || 0, 'events found');

    // If there's a non-recoverable error, use fallback
    if (error && error.code !== '42703') {
      console.error('Supabase error details:', error);
      return fallbackProps;
    }

    const allEvents = eventsData || [];

    // Calcular conteo de categorías (con manejo seguro de undefined category)
    const categoryCounts: Record<string, number> = {
      all: allEvents.length,
      sports: allEvents.filter(event => event.category === 'sports').length,
      cultural: allEvents.filter(event =>
        event.category === 'cultural' ||
        event.category === 'arts-culture' ||
        event.category === 'music'
      ).length,
      culinary: allEvents.filter(event => event.category === 'culinary').length,
      other: allEvents.filter(event =>
        !event.category || (
          event.category !== 'sports' &&
          event.category !== 'cultural' &&
          event.category !== 'arts-culture' &&
          event.category !== 'music' &&
          event.category !== 'culinary'
        )
      ).length,
    };

    console.log('Category counts:', categoryCounts);

    return {
      props: {
        events: allEvents,
        categoryCounts,
      },
      revalidate: 600,
    };
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    // Always return fallback to prevent build failure
    return fallbackProps;
  }
};

export default function EventsAllPage({ events, categoryCounts }: EventsPageProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle category filter changes by navigating to the appropriate route
  const handleCategoryChange = (newCategory: EventCategory) => {
    if (newCategory === 'all') {
      // Stay on current page
      setSelectedCategory(newCategory);
    } else {
      router.push(`/events/${newCategory}`);
    }
  };

  // Filter events based on search term
  useEffect(() => {
    let result = events;

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
  }, [searchTerm, events]);

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
        <title>{t('allEvents') || 'Todos los Eventos'} - SLP Descubre</title>
        <meta
          name="description"
          content="Descubre todos los eventos en San Luis Potosí - deportivos, culturales, gastronómicos y más."
        />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-secondary text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/events/hero-events.jpg"
            alt="Eventos en San Luis Potosí"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('allEvents') || 'Todos los Eventos'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {t('eventsDescription') || 'Descubre los mejores eventos en San Luis Potosí'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/submit-listing"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 inline-flex items-center"
              >
                {t('addEvent') || 'Agregar Evento'}
                <ArrowLongRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <EventCategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            categoryCounts={categoryCounts}
          />
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder={t('searchEvents') || 'Buscar eventos...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Clear Filters */}
        {searchTerm && (
          <div className="mb-6 text-center">
            <button
              onClick={() => { setSearchTerm(''); }}
              className="text-primary hover:text-primary-dark underline"
            >
              {t('clearFilters') || 'Limpiar filtros'}
            </button>
          </div>
        )}

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t('featuredEvents') || 'Eventos Destacados'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                  <div className="relative h-48">
                    <Image
                      src={event.image_url || '/images/events/default-event.jpg'}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white px-2 py-1 rounded-md text-sm font-semibold">
                      {t('featured') || 'Destacado'}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {formatDate(event.start_date)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {event.location}
                    </div>
                    <Link
                      href={`/events/${event.category}/${event.id}`}
                      className="inline-flex items-center text-primary hover:text-primary-dark font-semibold"
                    >
                      {t('learnMore') || 'Más información'}
                      <ArrowLongRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Events */}
        {regularEvents.length > 0 ? (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {featuredEvents.length > 0 ? (t('allEvents') || 'Todos los Eventos') : (t('events') || 'Eventos')}
            </h2>
            <EventList events={regularEvents} />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">
              {searchTerm
                ? (t('noEventsFound') || 'No se encontraron eventos con esos criterios')
                : (t('noEventsYet') || 'Aún no hay eventos disponibles')
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => { setSearchTerm(''); }}
                className="text-primary hover:text-primary-dark underline"
              >
                {t('clearFilters') || 'Limpiar filtros'}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}