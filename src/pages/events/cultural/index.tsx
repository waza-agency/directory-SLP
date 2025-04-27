import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import EventList from '@/components/EventList';
import { Event } from '@/types';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, ClockIcon, TicketIcon, ShareIcon } from '@heroicons/react/24/outline';

interface CulturalEventsProps {
  events: Event[];
}

// Helper function to format date consistently
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    // Calculate the safety buffer date - 7 days in the past
    const safetyDateBuffer = new Date();
    safetyDateBuffer.setDate(safetyDateBuffer.getDate() - 7);
    const safetyDateString = safetyDateBuffer.toISOString();
    
    // Get all events regardless of category to maximize what we show in the cultural section
    const { data: eventsData, error } = await supabase
      .from('events')
      .select('*')
      .gte('end_date', safetyDateString)
      .order('start_date', { ascending: true });

    if (error) throw error;

    console.log('All events found:', eventsData?.length || 0);

    // Filter on the client side for cultural events (including arts-culture and music)
    // Or any event with show_in_cultural_calendar flag
    const culturalEvents = eventsData ? eventsData.filter(event => 
      // Include events with cultural categories
      event.category === 'cultural' || 
      event.category === 'arts-culture' || 
      event.category === 'music' ||
      // Or events marked for the cultural calendar
      event.show_in_cultural_calendar === true
    ) : [];

    console.log('Cultural events found after filtering:', culturalEvents.length);

    // Apply additional client-side filtering to ensure we only show upcoming or current events
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set to start of day
    
    const events = culturalEvents.filter(event => {
      // Parse the start date to properly compare regardless of format
      const eventStartDate = new Date(event.start_date);
      eventStartDate.setHours(0, 0, 0, 0); // Set to start of day
      
      // Keep events that start today or in the future, or ongoing events
      return eventStartDate >= currentDate || new Date(event.end_date) >= currentDate;
    });

    // For debugging - log what we found
    console.log('Cultural events after date filtering:', events.length);
    events.forEach(event => {
      console.log(`${event.title} | Category: ${event.category} | Cultural Calendar: ${event.show_in_cultural_calendar ? 'Yes' : 'No'}`);
    });

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        events,
      },
      revalidate: 60, // Revalidate every minute for testing
    };
  } catch (error) {
    console.error('Error fetching events:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        events: [],
      },
      revalidate: 60,
    };
  }
};

export default function CulturalEvents({ events }: CulturalEventsProps) {
  const { t } = useTranslation('common');

  const featuredEvents = events.filter(event => event.featured);
  const regularEvents = events.filter(event => !event.featured);

  const getCategoryDisplayInfo = (event: Event) => {
    // Determine category display based on the event category OR if it's marked for cultural calendar
    let category = event.category;
    let bgColor = 'bg-gray-500';
    
    // Override category display if explicitly marked for cultural calendar
    if (event.show_in_cultural_calendar) {
      category = 'cultural';
    }
    
    // Set color based on category or cultural calendar flag
    if (category === 'sports') {
      bgColor = 'bg-blue-500';
    } else if (category === 'cultural' || category === 'arts-culture' || category === 'music') {
      bgColor = 'bg-amber-500'; // Changed to amber for cultural events
    } else if (category === 'culinary') {
      bgColor = 'bg-amber-500';
    }
    
    return { 
      displayCategory: category === 'arts-culture' ? 'cultural' : category,
      bgColor 
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Yellow/Gold Vibrant Version */}
      <div className="relative bg-gradient-to-r from-amber-500 to-yellow-400 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/cultural/cultural-default.jpg"
            alt="Cultural Events"
            fill
            className="object-cover opacity-30 mix-blend-multiply"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/30 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 drop-shadow-md">{t('culturalEvents')}</h1>
            <p className="text-xl mb-8 drop-shadow">
              Experience the rich cultural tapestry of San Luis Potosí through festivals, exhibitions, concerts, and performances that celebrate local and international arts and heritage.
            </p>
            <div className="flex gap-4">
              <Link
                href="#featured-events"
                className="bg-white text-amber-600 px-6 py-3 rounded-full font-semibold hover:bg-amber-50 transition-colors shadow-md"
              >
                View Featured Events
              </Link>
              <Link
                href="#all-events"
                className="border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors shadow-md"
              >
                Browse All Events
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Events Section */}
        {featuredEvents.length > 0 && (
          <section id="featured-events" className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">{t('featuredEvents')}</h2>
              <Link
                href="#all-events"
                className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-2"
              >
                View All Events
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.category}/${event.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    {event.image_url && (
                      <div className="relative h-56">
                        <Image
                          src={event.image_url}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                            <ShareIcon className="w-5 h-5 text-gray-700" />
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          Featured
                        </span>
                      </div>
                      <h2 className="text-xl font-bold mb-3 group-hover:text-amber-600 transition-colors">
                        {event.title}
                      </h2>
                      <div className="space-y-3 text-gray-600">
                        <p className="flex items-center gap-2">
                          <CalendarIcon className="w-5 h-5" />
                          {formatDate(event.start_date)}
                          {event.end_date && event.end_date !== event.start_date && (
                            <> - {formatDate(event.end_date)}</>
                          )}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPinIcon className="w-5 h-5" />
                          {event.location}
                        </p>
                      </div>
                      <p className="mt-4 text-gray-700 line-clamp-2">{event.description}</p>
                      <div className="mt-6 flex items-center justify-between">
                        <button className="text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-1">
                          Learn More
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <button className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors flex items-center gap-2">
                          <TicketIcon className="w-5 h-5" />
                          Get Tickets
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Regular Events Section - amber/gold version */}
        {regularEvents.length > 0 && (
          <section id="all-events" className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">{t('allEvents')}</h2>
              <div className="flex gap-4">
                <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                  Filter
                </button>
                <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                  Sort
                </button>
              </div>
            </div>
            <div className="grid gap-6">
              <EventList events={regularEvents} />
            </div>
          </section>
        )}

        {events.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Found</h3>
              <p className="text-gray-600 mb-6">
                There are no upcoming cultural events at the moment. Check back later for new events!
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-amber-600 hover:bg-amber-700 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 