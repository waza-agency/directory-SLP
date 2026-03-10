import { Event } from '@/types';
import { ClockIcon } from '@heroicons/react/24/outline';
import { getUpcomingEvents } from '@/utils/eventHelpers';
import EventCard from '@/components/EventCard';

interface EventComingUpProps {
  events: Event[];
  count?: number;
}

/**
 * "Coming Up Next" section showing the next N upcoming events
 * in a compact horizontal card format.
 */
export default function EventComingUp({ events, count = 5 }: EventComingUpProps) {
  const upcoming = getUpcomingEvents(events, count);

  if (upcoming.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-5">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
          <ClockIcon className="w-4 h-4 text-primary-dark" />
        </div>
        <h2 className="font-display text-2xl font-bold text-gray-900">
          Próximamente
        </h2>
      </div>

      <div className="space-y-3">
        {upcoming.map((event) => (
          <EventCard key={event.id} event={event} variant="compact" />
        ))}
      </div>
    </section>
  );
}
