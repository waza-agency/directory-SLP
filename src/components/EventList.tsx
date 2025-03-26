import { Event } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, MapPinIcon, TicketIcon, ShareIcon } from '@heroicons/react/24/outline';

interface EventListProps {
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

export default function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No events found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
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
  );
} 