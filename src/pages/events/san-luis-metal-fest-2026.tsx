import Link from 'next/link';
import { CalendarIcon, MapPinIcon, TicketIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';
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

const DAY1_BANDS = ['marduk', 'metalChurch', 'possessed', 'grave', 'hirax', 'bloodFeast'];
const DAY2_BANDS = ['armoredSaint', 'crimsonGlory', 'pestilence', 'sacrifice', 'hellripper'];

export default function SanLuisMetalFest2026() {
  const { t } = useTranslation('common');

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MusicEvent',
        name: 'San Luis Metal Fest 2026',
        startDate: '2026-05-16',
        endDate: '2026-05-17',
        isAccessibleForFree: true,
        location: {
          '@type': 'Place',
          name: 'Teatro del Pueblo — Recinto FENAPO',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'San Luis Potosí',
            addressRegion: 'SLP',
            addressCountry: 'MX',
          },
        },
        performer: [
          { '@type': 'MusicGroup', name: 'Marduk' },
          { '@type': 'MusicGroup', name: 'Metal Church' },
          { '@type': 'MusicGroup', name: 'Possessed' },
          { '@type': 'MusicGroup', name: 'Grave' },
          { '@type': 'MusicGroup', name: 'Armored Saint' },
          { '@type': 'MusicGroup', name: 'Crimson Glory' },
          { '@type': 'MusicGroup', name: 'Pestilence' },
          { '@type': 'MusicGroup', name: 'Sacrifice' },
          { '@type': 'MusicGroup', name: 'Hirax' },
          { '@type': 'MusicGroup', name: 'Hellripper' },
          { '@type': 'MusicGroup', name: 'Blood Feast' },
        ],
        organizer: { '@type': 'Organization', name: 'San Luis Way', url: 'https://www.sanluisway.com' },
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        url: 'https://www.sanluisway.com/events/san-luis-metal-fest-2026',
      },
      {
        '@type': 'FAQPage',
        mainEntity: Array.from({ length: 8 }, (_, i) => ({
          '@type': 'Question',
          name: t(`metalFest2026.faq.q${i + 1}`),
          acceptedAnswer: { '@type': 'Answer', text: t(`metalFest2026.faq.a${i + 1}`) },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sanluisway.com' },
          { '@type': 'ListItem', position: 2, name: 'Events', item: 'https://www.sanluisway.com/events' },
          { '@type': 'ListItem', position: 3, name: 'San Luis Metal Fest 2026', item: 'https://www.sanluisway.com/events/san-luis-metal-fest-2026' },
        ],
      },
    ],
  };

  const stats = [
    { value: t('metalFest2026.stats.daysValue'), label: t('metalFest2026.stats.days') },
    { value: t('metalFest2026.stats.bandsValue'), label: t('metalFest2026.stats.bands') },
    { value: t('metalFest2026.stats.attendeesValue'), label: t('metalFest2026.stats.attendees') },
    { value: t('metalFest2026.stats.countriesValue'), label: t('metalFest2026.stats.countries') },
    { value: t('metalFest2026.stats.priceValue'), label: t('metalFest2026.stats.price') },
  ];

  return (
    <>
      <SEO
        title={t('metalFest2026.seo.title')}
        description={t('metalFest2026.seo.description')}
        keywords={t('metalFest2026.seo.keywords')}
        ogImage="/images/events/metal-fest-stage.jpg"
        structuredData={structuredData as Record<string, unknown>}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-950 via-red-950 to-purple-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(2px 2px at 20px 30px,white,transparent),radial-gradient(2px 2px at 60px 80px,white,transparent),radial-gradient(1px 1px at 120px 50px,white,transparent),radial-gradient(1px 1px at 180px 100px,white,transparent)',
            backgroundSize: '200px 130px',
          }}
        />
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-300 text-xs font-bold uppercase tracking-widest">
                {t('metalFest2026.hero.badge')}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-2 text-red-300">
              <CalendarIcon className="w-5 h-5" />
              <span className="font-medium">{t('metalFest2026.hero.date')}</span>
            </div>
            <div className="flex items-center gap-3 mb-3 text-red-300/80">
              <MapPinIcon className="w-5 h-5" />
              <span className="text-sm">{t('metalFest2026.hero.location')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-3">
              {t('metalFest2026.hero.title')}
            </h1>
            <h2 className="text-xl md:text-2xl text-red-300 font-semibold mb-5">
              {t('metalFest2026.hero.subtitle')}
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mb-8">
              {t('metalFest2026.hero.description')}
            </p>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-10 max-w-2xl">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://sanluismetalfest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                {t('metalFest2026.hero.cta')}
                <TicketIcon className="w-5 h-5" />
              </a>
              <a
                href="#lineup"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                {t('metalFest2026.hero.ctaLineup')}
                <MusicalNoteIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lineup */}
      <section id="lineup" className="py-16 px-4 bg-gray-950 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-3">{t('metalFest2026.lineup.title')}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t('metalFest2026.lineup.subtitle')}</p>
            <p className="text-red-400 text-sm mt-2">{t('metalFest2026.lineup.scheduleTbc')}</p>
          </div>

          {[
            { label: t('metalFest2026.lineup.day1'), bands: DAY1_BANDS },
            { label: t('metalFest2026.lineup.day2'), bands: DAY2_BANDS },
          ].map((day) => (
            <div key={day.label} className="mb-12">
              <h3 className="text-xl font-bold text-red-400 mb-5 border-b border-red-900/50 pb-2">{day.label}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {day.bands.map((bandKey) => (
                  <div
                    key={bandKey}
                    className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-red-800 transition-colors"
                  >
                    <p className="text-lg font-bold text-white mb-2">
                      {t(`metalFest2026.lineup.bands.${bandKey}.name`)}
                    </p>
                    <span className="inline-block text-xs font-medium bg-red-900/50 text-red-300 rounded-full px-3 py-1 mb-1">
                      {t(`metalFest2026.lineup.bands.${bandKey}.genre`)}
                    </span>
                    <p className="text-gray-500 text-sm">{t(`metalFest2026.lineup.bands.${bandKey}.country`)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Registration */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-3">{t('metalFest2026.registration.title')}</h2>
            <p className="text-gray-400">{t('metalFest2026.registration.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="bg-gray-800 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-bold text-lg mb-2">{t(`metalFest2026.registration.step${step}Title`)}</h3>
                <p className="text-gray-400 text-sm">{t(`metalFest2026.registration.step${step}Desc`)}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-red-400 text-sm font-medium">{t('metalFest2026.registration.note')}</p>
        </div>
      </section>

      {/* Attendee Guide */}
      <section className="py-16 px-4 bg-gray-950 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-3">{t('metalFest2026.attendeeGuide.title')}</h2>
            <p className="text-gray-400">{t('metalFest2026.attendeeGuide.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="font-bold text-lg text-green-400 mb-4">{t('metalFest2026.attendeeGuide.bringTitle')}</h3>
              <ul className="space-y-2">
                {t('metalFest2026.attendeeGuide.bringItems').split(',').map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {item.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="font-bold text-lg text-red-400 mb-4">{t('metalFest2026.attendeeGuide.prohibitedTitle')}</h3>
              <ul className="space-y-2">
                {t('metalFest2026.attendeeGuide.prohibitedItems').split(',').map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-red-500 mt-0.5">✕</span>
                    {item.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="font-bold text-lg text-purple-400 mb-4">{t('metalFest2026.attendeeGuide.tipsTitle')}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{t('metalFest2026.attendeeGuide.tipsDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Food & Culture */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-3">{t('metalFest2026.culture.title')}</h2>
            <p className="text-gray-400">{t('metalFest2026.culture.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="text-3xl mb-4">🌮</div>
              <h3 className="font-bold text-xl mb-3 text-amber-400">{t('metalFest2026.culture.gastroTitle')}</h3>
              <p className="text-gray-300">{t('metalFest2026.culture.gastroDesc')}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="text-3xl mb-4">🎭</div>
              <h3 className="font-bold text-xl mb-3 text-purple-400">{t('metalFest2026.culture.huastecaTitle')}</h3>
              <p className="text-gray-300">{t('metalFest2026.culture.huastecaDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-16 px-4 bg-gray-950 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-2">{t('metalFest2026.gettingThere.title')}</h2>
            <div className="flex items-center justify-center gap-2 text-gray-400 mt-2">
              <MapPinIcon className="w-5 h-5" />
              <span>{t('metalFest2026.gettingThere.venue')}</span>
            </div>
            <p className="text-gray-500 text-sm mt-1">{t('metalFest2026.gettingThere.address')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { title: t('metalFest2026.gettingThere.byCarTitle'), desc: t('metalFest2026.gettingThere.byCarDesc'), icon: '🚗' },
              { title: t('metalFest2026.gettingThere.byTransitTitle'), desc: t('metalFest2026.gettingThere.byTransitDesc'), icon: '🚌' },
              { title: t('metalFest2026.gettingThere.byPlaneTitle'), desc: t('metalFest2026.gettingThere.byPlaneDesc'), icon: '✈️' },
              { title: t('metalFest2026.gettingThere.hotelsTitle'), desc: t('metalFest2026.gettingThere.hotelsDesc'), icon: '🏨' },
            ].map((card) => (
              <div key={card.title} className="bg-gray-900 rounded-xl p-5 flex gap-4">
                <span className="text-2xl">{card.icon}</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{card.title}</h3>
                  <p className="text-gray-400 text-sm">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold font-serif mb-10 text-center">{t('metalFest2026.faq.title')}</h2>
          <div className="space-y-7">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="border-b border-gray-800 pb-7">
                <p className="font-bold text-white mb-2">{t(`metalFest2026.faq.q${i + 1}`)}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{t(`metalFest2026.faq.a${i + 1}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-red-950 via-gray-950 to-purple-950 text-white">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold font-serif mb-4">{t('metalFest2026.cta.title')}</h2>
          <p className="text-white/80 mb-8">{t('metalFest2026.cta.description')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://sanluismetalfest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-colors"
            >
              {t('metalFest2026.cta.register')}
              <TicketIcon className="w-5 h-5" />
            </a>
            <Link
              href="/events/all"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-full transition-colors"
            >
              {t('metalFest2026.cta.moreEvents')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
