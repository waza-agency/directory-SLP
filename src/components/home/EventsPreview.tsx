import React from 'react';
import Link from 'next/link';
import { Event } from '@/types';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

interface EventsPreviewProps {
  events: Event[];
  locale?: string;
}

export default function EventsPreview({ events }: EventsPreviewProps) {
  const { t } = useTranslation('common');
  const { locale } = useRouter();

  if (events.length === 0) return null;

  return (
    <section id="events-001" className="py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="inline-block text-primary-800 font-semibold text-sm tracking-widest uppercase mb-4">{t('homepage.events.badge')}</span>
            <h2 className="font-serif text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {t('homepage.events.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('homepage.events.description')}
            </p>
          </div>
          <Link
            href="/events/all"
            className="hidden md:inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-primary transition-colors group"
          >
            {t('homepage.events.viewAll')}
            <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 animate-carousel"
            style={{ animation: 'scroll 40s linear infinite' }}
          >
            {[...events.slice(0, 8), ...events.slice(0, 8)].map((event, index) => (
              <article
                key={`${event.id}-${index}`}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 flex-shrink-0 w-[400px]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-center">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-3 min-w-[70px]">
                      <div className="text-2xl font-bold text-primary-900">
                        {new Date(event.start_date).toLocaleDateString(locale, { day: 'numeric' })}
                      </div>
                      <div className="text-xs font-semibold text-gray-600 uppercase">
                        {new Date(event.start_date).toLocaleDateString(locale, { month: 'short' })}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>

                    {event.description && (
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    <div className="space-y-1.5 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <MapPinIcon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>

                      {new Date(event.start_date).toDateString() !== new Date(event.end_date).toDateString() && (
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span>
                            {t('homepage.events.until')} {new Date(event.end_date).toLocaleDateString(locale, { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      )}

                      {event.category && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary-900 capitalize">
                          {event.category.replace('-', ' ')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>

        <div className="mt-12 text-center md:hidden">
          <Link
            href="/events/all"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all"
          >
            {t('homepage.events.viewAll')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}