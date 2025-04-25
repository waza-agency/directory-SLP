import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import EventList from '@/components/EventList';
import { Event } from '@/types';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, ClockIcon, TicketIcon, ShareIcon } from '@heroicons/react/24/outline';

interface SportsEventsProps {
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
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .eq('category', 'sports')
      .gte('end_date', new Date().toISOString())
      .order('start_date', { ascending: true });

    if (error) throw error;

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        events: events || [],
      },
      revalidate: 600,
    };
  } catch (error) {
    console.error('Error fetching events:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        events: [],
      },
      revalidate: 600,
    };
  }
};

export default function SportsEvents({ events }: SportsEventsProps) {
  const { t } = useTranslation('common');

  const featuredEvents = events.filter(event => event.featured);
  const regularEvents = events.filter(event => !event.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/events/sports-hero.png"
            alt="Sports Events"
            fill
            className="object-cover opacity-20"
            priority
            onError={(e) => {
              // Fallback to jpg if png fails to load
              const target = e.target as HTMLImageElement;
              target.src = '/images/events/sports-hero.jpg';
            }}
          />
        </div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">{t('sportsEvents')}</h1>
            <p className="text-xl mb-8">
              Discover exciting sports events, tournaments, and activities in San Luis Potosí. 
              From local matches to international competitions, find your next sporting adventure.
            </p>
            <div className="flex gap-4">
              <Link
                href="#featured-events"
                className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
              >
                View Featured Events
              </Link>
              <Link
                href="#all-events"
                className="border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
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
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
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
                  href={`/events/sports/${event.id}`}
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
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          Featured
                        </span>
                      </div>
                      <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
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
                        <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">
                          Learn More
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2">
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

        {/* Regular Events Section */}
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
                There are no upcoming sports events at the moment. Check back later for new events!
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors"
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