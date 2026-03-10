import { Event } from '@/types';

/** Format a date string to a user-friendly Spanish locale format */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/** Format a short date (e.g. "15 Mar") */
export const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
};

/** Get day number from a date string */
export const getDayNumber = (dateString: string): string => {
  return new Date(dateString).getDate().toString();
};

/** Get short month name in Spanish */
export const getMonthShort = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('es-ES', { month: 'short' }).toUpperCase();
};

/** Get full month + year in Spanish (e.g. "Marzo 2026") */
export const getMonthYear = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.toLocaleDateString('es-ES', { month: 'long' });
  return `${month.charAt(0).toUpperCase() + month.slice(1)} ${date.getFullYear()}`;
};

/** Category display info: label, color scheme, and Tailwind classes */
export const getCategoryInfo = (category: string) => {
  const map: Record<string, { label: string; bg: string; text: string; accent: string }> = {
    sports: { label: 'Deportes', bg: 'bg-emerald-50', text: 'text-emerald-700', accent: 'border-emerald-500' },
    cultural: { label: 'Cultural', bg: 'bg-violet-50', text: 'text-violet-700', accent: 'border-violet-500' },
    'arts-culture': { label: 'Arte y Cultura', bg: 'bg-violet-50', text: 'text-violet-700', accent: 'border-violet-500' },
    music: { label: 'Música', bg: 'bg-rose-50', text: 'text-rose-700', accent: 'border-rose-500' },
    culinary: { label: 'Gastronomía', bg: 'bg-amber-50', text: 'text-amber-700', accent: 'border-amber-500' },
    'community-social': { label: 'Comunidad', bg: 'bg-sky-50', text: 'text-sky-700', accent: 'border-sky-500' },
  };
  return map[category] || { label: category, bg: 'bg-gray-50', text: 'text-gray-700', accent: 'border-gray-400' };
};

/** Category gradient backgrounds for events without images */
export const getCategoryGradient = (category: string): string => {
  const gradients: Record<string, string> = {
    sports: 'from-emerald-600 to-teal-800',
    cultural: 'from-violet-600 to-purple-800',
    'arts-culture': 'from-violet-600 to-purple-800',
    music: 'from-rose-600 to-pink-800',
    culinary: 'from-amber-600 to-orange-800',
    'community-social': 'from-sky-600 to-blue-800',
  };
  return gradients[category] || 'from-secondary to-secondary-light';
};

/** Group events by month-year key */
export const groupEventsByMonth = (events: Event[]): Record<string, Event[]> => {
  const grouped: Record<string, Event[]> = {};
  events.forEach((event) => {
    const key = getMonthYear(event.start_date);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(event);
  });
  return grouped;
};

/** Get the next N upcoming events from today */
export const getUpcomingEvents = (events: Event[], count: number): Event[] => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return events
    .filter((e) => new Date(e.start_date) >= now)
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
    .slice(0, count);
};

/** Category title for the page heading */
export const getCategoryTitle = (cat: string): string => {
  const titles: Record<string, string> = {
    all: 'Todos los Eventos',
    sports: 'Eventos Deportivos',
    cultural: 'Eventos Culturales',
    'arts-culture': 'Arte y Cultura',
    music: 'Eventos Musicales',
    culinary: 'Eventos Gastronómicos',
    'community-social': 'Eventos Comunitarios',
  };
  return titles[cat] || titles.all;
};
