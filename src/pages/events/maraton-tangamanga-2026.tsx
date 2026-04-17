import Link from 'next/link';
import { CalendarIcon, MapPinIcon, TrophyIcon, ClockIcon } from '@heroicons/react/24/outline';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SEO from '@/components/common/SEO';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
};

const DISTANCES = ['fiveK', 'tenK', 'halfMarathon', 'marathon'] as const;
const DISTANCE_COLORS = [
  'border-emerald-700 bg-emerald-950/60',
  'border-teal-700 bg-teal-950/60',
  'border-blue-700 bg-blue-950/60',
  'border-indigo-700 bg-indigo-950/60',
] as const;
const DISTANCE_ACCENTS = ['text-emerald-400', 'text-teal-400', 'text-blue-400', 'text-indigo-400'] as const;

export default function MaratonTangamanga2026() {
  const { t } = useTranslation('common');

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SportsEvent',
        name: 'BMW Maratón Internacional Tangamanga 2026 — 40 Aniversario',
        startDate: '2026-06-28',
        endDate: '2026-06-28',
        sport: 'Running',
        location: {
          '@type': 'Place',
          name: 'Parque Tangamanga I',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'San Luis Potosí',
            addressRegion: 'SLP',
            addressCountry: 'MX',
          },
          geo: { '@type': 'GeoCoordinates', latitude: 22.1367, longitude: -101.0134 },
        },
        organizer: { '@type': 'Organization', name: 'Maratón Tangamanga', url: 'https://maratontangamanga.com/' },
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        maximumAttendeeCapacity: 17000,
        url: 'https://www.sanluisway.com/events/maraton-tangamanga-2026',
      },
      {
        '@type': 'FAQPage',
        mainEntity: Array.from({ length: 10 }, (_, i) => ({
          '@type': 'Question',
          name: t(`maraton2026.faq.q${i + 1}`),
          acceptedAnswer: { '@type': 'Answer', text: t(`maraton2026.faq.a${i + 1}`) },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sanluisway.com' },
          { '@type': 'ListItem', position: 2, name: 'Events', item: 'https://www.sanluisway.com/events' },
          { '@type': 'ListItem', position: 3, name: 'Maratón Tangamanga 2026', item: 'https://www.sanluisway.com/events/maraton-tangamanga-2026' },
        ],
      },
    ],
  };

  const stats = [
    { value: t('maraton2026.stats.editionValue'), label: t('maraton2026.stats.edition') },
    { value: t('maraton2026.stats.runnersValue'), label: t('maraton2026.stats.runners') },
    { value: t('maraton2026.stats.distancesValue'), label: t('maraton2026.stats.distances') },
    { value: t('maraton2026.stats.certifiedValue'), label: t('maraton2026.stats.certified') },
  ];

  return (
    <>
      <SEO
        title={t('maraton2026.seo.title')}
        description={t('maraton2026.seo.description')}
        keywords={t('maraton2026.seo.keywords')}
        ogImage="/images/events/maraton-runners.jpg"
        structuredData={structuredData as Record<string, unknown>}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-teal-900 to-blue-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(2px 2px at 20px 30px,white,transparent),radial-gradient(2px 2px at 60px 80px,white,transparent),radial-gradient(1px 1px at 120px 50px,white,transparent),radial-gradient(1px 1px at 180px 100px,white,transparent)',
            backgroundSize: '200px 130px',
          }}
        />
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-6">
              <TrophyIcon className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-xs font-bold uppercase tracking-widest">
                {t('maraton2026.hero.badge')}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-2 text-emerald-300">
              <CalendarIcon className="w-5 h-5" />
              <span className="font-medium">{t('maraton2026.hero.date')}</span>
            </div>
            <div className="flex items-center gap-3 mb-3 text-emerald-300/80">
              <MapPinIcon className="w-5 h-5" />
              <span className="text-sm">{t('maraton2026.hero.location')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-3">
              {t('maraton2026.hero.title')}
            </h1>
            <h2 className="text-xl md:text-2xl text-emerald-300 font-semibold mb-5">
              {t('maraton2026.hero.subtitle')}
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mb-8">
              {t('maraton2026.hero.description')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://maratontangamanga.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                {t('maraton2026.hero.cta')}
                <TrophyIcon className="w-5 h-5" />
              </a>
              <a
                href="#route"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                {t('maraton2026.hero.ctaRoute')}
                <MapPinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Distances */}
      <section className="py-16 px-4 bg-gray-950 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-3">{t('maraton2026.distances.title')}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t('maraton2026.distances.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DISTANCES.map((key, i) => (
              <div key={key} className={`border rounded-xl p-5 ${DISTANCE_COLORS[i]}`}>
                <p className={`text-xl font-bold mb-2 ${DISTANCE_ACCENTS[i]}`}>
                  {t(`maraton2026.distances.${key}.name`)}
                </p>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {t(`maraton2026.distances.${key}.description`)}
                </p>
                <div className="space-y-1 text-xs text-gray-400">
                  <p>{t(`maraton2026.distances.${key}.age`)}</p>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-3.5 h-3.5" />
                    <span>{t(`maraton2026.distances.${key}.start`)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Route Map */}
      <section id="route" className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-serif mb-3">{t('maraton2026.route.title')}</h2>
            <p className="text-gray-400">{t('maraton2026.route.subtitle')}</p>
          </div>
          <p className="text-gray-300 mb-8 leading-relaxed text-center max-w-2xl mx-auto">
            {t('maraton2026.route.description')}
          </p>
          <div className="mb-8 rounded-xl overflow-hidden border border-gray-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3695.5!2d-101.0134!3d22.1367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842a9e26d90a4b93%3A0x5f6b2a2a2a2a2a2a!2sParque%20Tangamanga%20I!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Parque Tangamanga I — Maratón Tangamanga 2026"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: '💧', text: t('maraton2026.route.hydration') },
              { icon: '🏥', text: t('maraton2026.route.medical') },
              { icon: '📍', text: t('maraton2026.route.landmarks') },
            ].map((item) => (
              <div key={item.icon} className="bg-gray-800 rounded-xl p-5 flex gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Runner's Guide */}
      <section className="py-16 px-4 bg-gray-950 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-3">{t('maraton2026.runnerGuide.title')}</h2>
            <p className="text-gray-400">{t('maraton2026.runnerGuide.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { titleKey: 'altitudeTitle', descKey: 'altitudeDesc', icon: '⛰️', color: 'text-blue-400' },
              { titleKey: 'weatherTitle', descKey: 'weatherDesc', icon: '☀️', color: 'text-amber-400' },
              { titleKey: 'hydrationTitle', descKey: 'hydrationDesc', icon: '💧', color: 'text-cyan-400' },
              { titleKey: 'warmupTitle', descKey: 'warmupDesc', icon: '🏃', color: 'text-emerald-400' },
            ].map((card) => (
              <div key={card.titleKey} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className={`font-bold text-base mb-2 ${card.color}`}>
                  {t(`maraton2026.runnerGuide.${card.titleKey}`)}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t(`maraton2026.runnerGuide.${card.descKey}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Runner's Kit */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-3">{t('maraton2026.kit.title')}</h2>
            <p className="text-gray-400">{t('maraton2026.kit.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold text-lg text-emerald-400 mb-4">{t('maraton2026.kit.includes')}</h3>
              <ul className="space-y-2">
                {t('maraton2026.kit.includesList').split(',').map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    {item.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold text-lg text-teal-400 mb-4">{t('maraton2026.kit.pickupTitle')}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{t('maraton2026.kit.pickupDesc')}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold text-lg text-blue-400 mb-4">{t('maraton2026.kit.docsTitle')}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{t('maraton2026.kit.docsDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Spectator Info */}
      <section className="py-16 px-4 bg-gray-950 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-3">{t('maraton2026.spectators.title')}</h2>
            <p className="text-gray-400">{t('maraton2026.spectators.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { titleKey: 'viewingTitle', descKey: 'viewingDesc', icon: '👁️' },
              { titleKey: 'parkingTitle', descKey: 'parkingDesc', icon: '🅿️' },
              { titleKey: 'activitiesTitle', descKey: 'activitiesDesc', icon: '🎯' },
            ].map((item) => (
              <div key={item.titleKey} className="bg-gray-900 rounded-xl p-5 flex gap-4">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-white mb-2">{t(`maraton2026.spectators.${item.titleKey}`)}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{t(`maraton2026.spectators.${item.descKey}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodation & Transport */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold font-serif mb-10 text-center">{t('maraton2026.accommodation.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { titleKey: 'airportTitle', descKey: 'airportDesc', icon: '✈️' },
              { titleKey: 'busTitle', descKey: 'busDesc', icon: '🚌' },
              { titleKey: 'hotelsTitle', descKey: 'hotelsDesc', icon: '🏨' },
            ].map((item) => (
              <div key={item.titleKey} className="bg-gray-800 rounded-xl p-5 flex gap-4">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{t(`maraton2026.accommodation.${item.titleKey}`)}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{t(`maraton2026.accommodation.${item.descKey}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-950 text-white">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold font-serif mb-10 text-center">{t('maraton2026.faq.title')}</h2>
          <div className="space-y-7">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="border-b border-gray-800 pb-7">
                <p className="font-bold text-white mb-2">{t(`maraton2026.faq.q${i + 1}`)}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{t(`maraton2026.faq.a${i + 1}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-950 via-teal-900 to-blue-950 text-white">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold font-serif mb-4">{t('maraton2026.cta.title')}</h2>
          <p className="text-white/80 mb-8">{t('maraton2026.cta.description')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://maratontangamanga.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-colors"
            >
              {t('maraton2026.cta.register')}
              <TrophyIcon className="w-5 h-5" />
            </a>
            <Link
              href="/events/all"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-full transition-colors"
            >
              {t('maraton2026.cta.moreEvents')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
