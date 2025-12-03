import { GetStaticPaths, GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Event } from '@/types';
import { supabase } from '@/lib/supabase';
import EventList from '@/components/EventList';
import EventCategoryFilter, { EventCategory } from '@/components/EventCategoryFilter';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';
import SEO from '@/components/common/SEO';
import NewsletterBanner from '@/components/NewsletterBanner';

interface EventsPageProps {
  events: Event[];
  categoryCounts: Record<string, number>;
  category: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Define the possible category paths
  // 'cultural' is an alias for 'arts-culture' to maintain backward compatibility
  const categories = ['all', 'sports', 'cultural', 'arts-culture', 'music', 'culinary', 'community-social'];

  const paths = categories.map((category) => ({
    params: { category }
  }));

  return {
    paths,
    fallback: 'blocking', // Changed from false to blocking for better handling
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const category = params?.category as string;

    // Validate category
    // 'cultural' is an alias for 'arts-culture' to maintain backward compatibility
    const validCategories = ['all', 'sports', 'cultural', 'arts-culture', 'music', 'culinary', 'community-social'];
    if (!validCategories.includes(category)) {
      return {
        notFound: true,
      };
    }

    // Obtener eventos
    const { data: eventsData, error } = await supabase
      .from('events')
      .select("*")
      .order('start_date', { ascending: true });

    if (error) throw error;

    console.log('All events found:', eventsData?.length || 0);

    const allEvents = eventsData || [];

    // Filter events based on category
    let filteredEvents = allEvents;
    if (category !== 'all') {
      // Map 'cultural' to 'arts-culture' for backward compatibility
      const filterCategory = category === 'cultural' ? 'arts-culture' : category;
      filteredEvents = allEvents.filter(event => event.category === filterCategory);
    }

    // Calcular conteo de categorías (matching database enum values)
    const artsCount = allEvents?.filter(event => event.category === 'arts-culture').length || 0;
    const categoryCounts: Record<string, number> = {
      all: allEvents?.length || 0,
      sports: allEvents?.filter(event => event.category === 'sports').length || 0,
      cultural: artsCount, // Alias for arts-culture
      'arts-culture': artsCount,
      music: allEvents?.filter(event => event.category === 'music').length || 0,
      culinary: allEvents?.filter(event => event.category === 'culinary').length || 0,
      'community-social': allEvents?.filter(event => event.category === 'community-social').length || 0,
    };

    return {
      props: {
        events: filteredEvents || [],
        categoryCounts,
        category,
      },
    };
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    return {
      props: {
        events: [],
        categoryCounts: {
          all: 0,
          sports: 0,
          cultural: 0,
          'arts-culture': 0,
          music: 0,
          culinary: 0,
          'community-social': 0
        },
        category: params?.category as string || 'all',
      },
    };
  }
};

export default function EventsPage({ events, categoryCounts, category }: EventsPageProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>(category as EventCategory);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [searchTerm, setSearchTerm] = useState('');

  // Update selected category when route changes
  useEffect(() => {
    setSelectedCategory(category as EventCategory);
  }, [category]);

  // Handle category filter changes by navigating to the appropriate route
  const handleCategoryChange = (newCategory: EventCategory) => {
    router.push(`/events/${newCategory}`);
  };

  // Filter events based on search term only (category filtering is done server-side)
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

  // Get category title
  const getCategoryTitle = (cat: string) => {
    const titles: Record<string, string> = {
      all: 'Todos los Eventos',
      sports: 'Eventos Deportivos',
      cultural: 'Eventos Culturales',
      'arts-culture': 'Arte y Cultura',
      culinary: 'Eventos Culinarios',
      other: 'Otros Eventos',
    };
    return titles[cat] || titles.all;
  };

  return (
    <>
      <SEO
        title={`${getCategoryTitle(category)} - SLP Descubre`}
        description={`Descubre los mejores ${getCategoryTitle(category).toLowerCase()} en San Luis Potosí. Agenda cultural, conciertos, festivales y más.`}
      />

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
            <h1 className="text-5xl font-bold mb-6">{getCategoryTitle(category)}</h1>
            <p className="text-xl mb-8">
              Descubre los mejores eventos en San Luis Potosí
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar eventos..."
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
            onChange={handleCategoryChange}
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron eventos</h3>
              <p className="text-gray-600 mb-6">
                No hay eventos que coincidan con tus criterios de búsqueda.
              </p>
              <button
                onClick={() => { setSearchTerm(''); router.push('/events/all'); }}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-dark transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        )}

        {/* Eventos Destacados */}
        {featuredEvents.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Eventos Destacados</h2>
              {regularEvents.length > 0 && (
                <a
                  href="#all-events"
                  className="text-primary hover:text-primary-dark font-semibold flex items-center gap-2"
                >
                  Ver todos los eventos
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
              <h2 className="text-3xl font-bold text-gray-900">Eventos Regulares</h2>
            </div>
            <EventList events={regularEvents} />
          </section>
        )}

        {/* Newsletter CTA */}
        <NewsletterBanner variant="mid-content" className="mb-16" />
      </div>
    </>
  );
}