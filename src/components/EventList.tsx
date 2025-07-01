import { Event } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface EventListProps {
  events: Event[];
}

// Formatear fecha de forma amigable
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
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
      bgColor = 'bg-purple-500';
    } else if (category === 'culinary') {
      bgColor = 'bg-amber-500';
    }
    
    return { 
      displayCategory: category === 'arts-culture' ? 'cultural' : category,
      bgColor 
    };
  };

  return (
    <div className="space-y-6">
      {events.map((event) => {
        const { displayCategory, bgColor } = getCategoryDisplayInfo(event);
        
        return (
          <Link
            key={event.id}
            href={`/events/${event.category}/${event.id}`}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {event.image_url && (
                <div className="w-full md:w-48 h-48 relative">
                  <Image
                    src={event.image_url}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full ${bgColor}`}></span>
                  <span className="text-sm text-gray-600 capitalize">
                    {displayCategory}
                    {event.show_in_cultural_calendar && event.category !== 'cultural' && 
                      event.category !== 'arts-culture' && event.category !== 'music' && 
                      ' (cultural calendar)'}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{event.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 text-sm mb-3">
                  <p className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    {formatDate(event.start_date)}
                    {event.end_date && event.end_date !== event.start_date && (
                      <> - {formatDate(event.end_date)}</>
                    )}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4" />
                    {event.location}
                  </p>
                </div>
                {event.description && (
                  <p className="text-gray-600 line-clamp-2">{event.description}</p>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
} 