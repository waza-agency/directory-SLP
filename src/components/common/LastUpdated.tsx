import { useRouter } from 'next/router';

interface LastUpdatedProps {
  // ISO date string (YYYY-MM-DD). The date the page content was last
  // reviewed by an editor. Exposed to Google via a <time> element under
  // the h1 — both a user-facing freshness signal and a machine-readable
  // hook for search quality.
  date: string;
  className?: string;
}

const LOCALE_MAP: Record<string, string> = {
  en: 'en-US',
  es: 'es-MX',
};

const LABELS: Record<string, string> = {
  en: 'Reviewed on',
  es: 'Revisado el',
};

export default function LastUpdated({ date, className = '' }: LastUpdatedProps) {
  const { locale } = useRouter();
  const activeLocale = locale && LOCALE_MAP[locale] ? locale : 'en';
  const intlLocale = LOCALE_MAP[activeLocale];
  const label = LABELS[activeLocale];

  const parsed = new Date(`${date}T00:00:00Z`);
  const formatted = new Intl.DateTimeFormat(intlLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(parsed);

  return (
    <p className={`text-sm text-gray-500 mt-2 ${className}`}>
      {label}{' '}
      <time dateTime={date} className="font-medium">
        {formatted}
      </time>
    </p>
  );
}
