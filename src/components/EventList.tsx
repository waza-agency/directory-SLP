import { Event } from '@/types';
import { CalendarIcon } from '@heroicons/react/24/outline';
import EventCard from '@/components/EventCard';

interface EventListProps {
  events: Event[];
  variant?: 'grid' | 'compact';
}

/**
 * Responsive event grid: 3 columns desktop, 2 tablet, 1 mobile.
 * Supports "grid" (full cards) and "compact" (horizontal list) variants.
 */
export default function EventList({ events, variant = 'grid' }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No se encontraron eventos</p>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="space-y-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} variant="compact" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} variant="grid" />
      ))}
    </div>
  );
}
