import { useState } from 'react';
import { Event } from '@/types';
import { ChevronDownIcon, ChevronUpIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { groupEventsByMonth } from '@/utils/eventHelpers';
import EventCard from '@/components/EventCard';

interface EventMonthlyTimelineProps {
  events: Event[];
}

/**
 * Groups events by month and displays them on a vertical timeline.
 * Each month section is collapsible and shows a grid of event cards.
 */
export default function EventMonthlyTimeline({ events }: EventMonthlyTimelineProps) {
  const grouped = groupEventsByMonth(events);
  const months = Object.keys(grouped);

  if (months.length === 0) return null;

  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-secondary/30 via-secondary/10 to-transparent" />

      <div className="space-y-10">
        {months.map((monthKey, idx) => (
          <MonthSection
            key={monthKey}
            monthLabel={monthKey}
            events={grouped[monthKey]}
            defaultOpen={idx < 3}
          />
        ))}
      </div>
    </div>
  );
}

function MonthSection({
  monthLabel,
  events,
  defaultOpen,
}: {
  monthLabel: string;
  events: Event[];
  defaultOpen: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="relative pl-14 md:pl-20">
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full border-2 border-secondary bg-white z-10 shadow-sm" />

      {/* Month header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 w-full text-left group mb-4"
      >
        <CalendarDaysIcon className="w-5 h-5 text-secondary flex-shrink-0" />
        <h3 className="font-display text-xl md:text-2xl font-bold text-gray-900 group-hover:text-secondary transition-colors">
          {monthLabel}
        </h3>
        <span className="ml-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-secondary/10 text-secondary">
          {events.length}
        </span>
        <span className="ml-auto text-gray-400">
          {isOpen ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </span>
      </button>

      {/* Events grid, collapsible */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} variant="grid" />
        ))}
      </div>
    </div>
  );
}
