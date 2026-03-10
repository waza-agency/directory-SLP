import { Event } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import {
  formatDate,
  getDayNumber,
  getMonthShort,
  getCategoryInfo,
  getCategoryGradient,
} from '@/utils/eventHelpers';

interface EventCardProps {
  event: Event;
  variant?: 'grid' | 'compact';
}

export default function EventCard({ event, variant = 'grid' }: EventCardProps) {
  const catInfo = getCategoryInfo(event.category);
  const hasImage = !!event.image_url;

  if (variant === 'compact') {
    return <CompactCard event={event} catInfo={catInfo} />;
  }

  return (
    <Link
      href={`/events/${event.category}/${event.id}`}
      className="group flex flex-col bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden hover:-translate-y-1 h-full"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {hasImage ? (
          <Image
            src={event.image_url!}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(event.category)}`}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <CalendarIcon className="w-12 h-12 text-white/40" />
              <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">
                {getCategoryInfo(event.category).label}
              </span>
            </div>
          </div>
        )}
        {/* Date badge */}
        <div className="absolute top-3 left-3 bg-white rounded-lg px-2.5 py-1.5 shadow-lg text-center min-w-[52px]">
          <span className="block text-xs font-bold text-secondary uppercase leading-none">
            {getMonthShort(event.start_date)}
          </span>
          <span className="block text-xl font-bold text-gray-900 leading-tight">
            {getDayNumber(event.start_date)}
          </span>
        </div>
        {/* Category badge */}
        <span className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full ${catInfo.bg} ${catInfo.text}`}>
          {catInfo.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
          {event.title}
        </h3>
        <div className="space-y-1.5 text-sm text-gray-500 mb-3">
          <p className="flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">{formatDate(event.start_date)}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <MapPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </p>
        </div>
        {event.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
        )}
      </div>
    </Link>
  );
}

/** Compact horizontal card for the "Coming Up" section */
function CompactCard({
  event,
  catInfo,
}: {
  event: Event;
  catInfo: ReturnType<typeof getCategoryInfo>;
}) {
  return (
    <Link
      href={`/events/${event.category}/${event.id}`}
      className="group flex items-center gap-4 bg-white rounded-xl p-3 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
    >
      {/* Date block */}
      <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-secondary flex flex-col items-center justify-center text-white">
        <span className="text-[10px] font-bold uppercase leading-none">
          {getMonthShort(event.start_date)}
        </span>
        <span className="text-xl font-bold leading-tight">
          {getDayNumber(event.start_date)}
        </span>
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 text-sm truncate group-hover:text-secondary transition-colors">
          {event.title}
        </h4>
        <p className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
          <MapPinIcon className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </p>
      </div>
      {/* Category dot */}
      <span className={`flex-shrink-0 px-2 py-0.5 text-[10px] font-semibold rounded-full ${catInfo.bg} ${catInfo.text}`}>
        {catInfo.label}
      </span>
    </Link>
  );
}
