import Link from 'next/link';
import {
  CalendarIcon,
  MapPinIcon,
  TicketIcon,
  MusicalNoteIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
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

const AREA_KEYS = ['teatro', 'palenque', 'gastro', 'commercial', 'rides', 'cultural', 'livestock', 'kids'] as const;
const AREA_ICONS: Record<string, string> = {
  teatro: '🎭', palenque: '🤠', gastro: '🌮', commercial: '🛍️',
  rides: '🎡', cultural: '🎨', livestock: '🐄', kids: '🎠',
};

export default function Fenapo2026() {
  const { t } = useTranslation('common');

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Festival',
        name: 'FENAPO 2026 — Feria Nacional Potosina',
        startDate: '2026-08-01',
        endDate: '2026-08-31',
        location: {
          '@type': 'Place',
          name: 'Recinto Ferial de la FENAPO',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Av. Fco. Martinez de la Vega No. 255',
            addressLocality: 'San Luis Potosí',
            addressRegion: 'SLP',
            addressCountry: 'MX',
          },
        },
        organizer: { '@type': 'Organization', name: 'Gobierno de San Luis Potosí' },
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        url: 'https://www.sanluisway.com/events/fenapo-2026',
      },
      {
        '@type': 'FAQPage',
        mainEntity: Array.from({ length: 12 }, (_, i) => ({
          '@type': 'Question',
          name: t(`fenapo2026.faq.q${i + 1}`),
          acceptedAnswer: { '@type': 'Answer', text: t(`fenapo2026.faq.a${i + 1}`) },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sanluisway.com' },
          { '@type': 'ListItem', position: 2, name: 'Events', item: 'https://www.sanluisway.com/events' },
          { '@type': 'ListItem', position: 3, name: 'FENAPO 2026', item: 'https://www.sanluisway.com/events/fenapo-2026' },
        ],
      },
    ],
  };

  const stats = [
    { value: t('fenapo2026.stats.daysValue'), label: t('fenapo2026.stats.days') },
    { value: t('fenapo2026.stats.artistsValue'), label: t('fenapo2026.stats.artists') },
    { value: t('fenapo2026.stats.entryValue'), label: t('fenapo2026.stats.entry') },
    { value: t('fenapo2026.stats.zonesValue'), label: t('fenapo2026.stats.zones') },
  ];

  return (
    <>
      <SEO
        title={t('fenapo2026.seo.title')}
        description={t('fenapo2026.seo.description')}
        keywords={t('fenapo2026.seo.keywords')}
        ogImage="/images/events/fenapo-2026.jpg"
        structuredData={structuredData as Record<string, unknown>}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-950 via-purple-900 to-indigo-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(2px 2px at 20px 30px,white,transparent),radial-gradient(2px 2px at 60px 80px,white,transparent),radial-gradient(1px 1px at 120px 50px,white,transparent),radial-gradient(1px 1px at 180px 100px,white,transparent)',
            backgroundSize: '200px 130px',
          }}
        />
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-purple-300 text-xs font-bold uppercase tracking-widest">
                {t('fenapo2026.hero.badge')}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-3 text-purple-300">
              <CalendarIcon className="w-5 h-5" />
              <span className="font-medium">{t('fenapo2026.hero.date')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-3">
              {t('fenapo2026.hero.title')}
            </h1>
            <h2 className="text-xl md:text-2xl text-purple-300 font-semibold mb-5">
              {t('fenapo2026.hero.subtitle')}
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mb-4">
              {t('fenapo2026.hero.description')}
            </p>
            {/* TBC Notice */}
            <div className="flex items-start gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-4 py-3 mb-8 max-w-2xl">
              <InformationCircleIcon className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <p className="text-yellow-300 text-sm">{t('fenapo2026.hero.note')}</p>
            </div>
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
                href="https://fenapo.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                {t('fenapo2026.hero.cta')}
                <TicketIcon className="w-5 h-5" />
              </a>
              <a
                href="#artists"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                {t('fenapo2026.hero.ctaArtists')}
                <MusicalNoteIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 px-4 bg-gray-950 text-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold font-serif mb-8 text-center">{t('fenapo2026.about.title')}</h2>
          <div className="space-y-5 text-gray-300 leading-relaxed mb-12">
            <p>{t('fenapo2026.about.p1')}</p>
            <p>{t('fenapo2026.about.p2')}</p>
            <p>{t('fenapo2026.about.p3')}</p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-6 md:p-8">
            <h3 className="font-bold text-lg text-purple-400 mb-5">{t('fenapo2026.about.highlights.title')}</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Array.from({ length: 8 }, (_, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                  <span className="text-purple-400 mt-0.5 font-bold shrink-0">✓</span>
                  {t(`fenapo2026.about.highlights.item${i + 1}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Confirmed Artists */}
      <section id="artists" className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-3">{t('fenapo2026.artists.title')}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t('fenapo2026.artists.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Teatro del Pueblo */}
            <div className="bg-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-purple-300">{t('fenapo2026.artists.teatroTitle')}</h3>
                <span className="text-xs bg-green-900/50 text-green-400 border border-green-800 rounded-full px-3 py-1">
                  {t('fenapo2026.artists.teatroNote')}
                </span>
              </div>
              <ul className="space-y-3">
                {(['sinBandera', 'losAcosta'] as const).map((key) => (
                  <li key={key} className="flex items-center gap-3">
                    <MusicalNoteIcon className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="font-semibold">{t(`fenapo2026.artists.${key}`)}</span>
                  </li>
                ))}
                <li className="text-gray-500 text-sm italic pt-1">{t('fenapo2026.artists.tbc')}</li>
              </ul>
            </div>
            {/* Palenque */}
            <div className="bg-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-amber-300">{t('fenapo2026.artists.palenqueTitle')}</h3>
                <span className="text-xs bg-amber-900/50 text-amber-400 border border-amber-800 rounded-full px-3 py-1">
                  {t('fenapo2026.artists.palenqueNote')}
                </span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <MusicalNoteIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold">{t('fenapo2026.artists.grupoFirme')}</span>
                </li>
                <li className="text-gray-500 text-sm italic pt-1">{t('fenapo2026.artists.tbc')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fair Areas */}
      <section className="py-16 px-4 bg-gray-950 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-3">{t('fenapo2026.areas.title')}</h2>
            <p className="text-gray-400">{t('fenapo2026.areas.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AREA_KEYS.map((key) => (
              <div key={key} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-purple-800 transition-colors">
                <span className="text-3xl mb-3 block">{AREA_ICONS[key]}</span>
                <h3 className="font-bold text-white mb-2 text-sm">{t(`fenapo2026.areas.${key}.name`)}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{t(`fenapo2026.areas.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visitor Guide */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-3">{t('fenapo2026.visitorGuide.title')}</h2>
            <p className="text-gray-400">{t('fenapo2026.visitorGuide.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {(
              [
                { titleKey: 'bestDaysTitle', descKey: 'bestDaysDesc', color: 'text-blue-400', icon: '📅' },
                { titleKey: 'bringTitle', descKey: 'bringDesc', color: 'text-green-400', icon: '🎒' },
                { titleKey: 'safetyTitle', descKey: 'safetyDesc', color: 'text-yellow-400', icon: '🛡️' },
                { titleKey: 'familyTitle', descKey: 'familyDesc', color: 'text-pink-400', icon: '👨‍👩‍👧‍👦' },
              ] as const
            ).map((item) => (
              <div key={item.titleKey} className="bg-gray-800 rounded-xl p-5 flex gap-4">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className={`font-bold mb-2 ${item.color}`}>{t(`fenapo2026.visitorGuide.${item.titleKey}`)}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{t(`fenapo2026.visitorGuide.${item.descKey}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-16 px-4 bg-gray-950 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-2">{t('fenapo2026.gettingThere.title')}</h2>
            <div className="flex items-center justify-center gap-2 text-gray-400 mt-2">
              <MapPinIcon className="w-5 h-5" />
              <span>{t('fenapo2026.gettingThere.venue')}</span>
            </div>
            <p className="text-gray-500 text-sm mt-1">{t('fenapo2026.gettingThere.address')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {(
              [
                { titleKey: 'byCarTitle', descKey: 'byCarDesc', icon: '🚗' },
                { titleKey: 'byTransitTitle', descKey: 'byTransitDesc', icon: '🚌' },
                { titleKey: 'byPlaneTitle', descKey: 'byPlaneDesc', icon: '✈️' },
                { titleKey: 'distanceTitle', descKey: 'distanceDesc', icon: '🏛️' },
              ] as const
            ).map((card) => (
              <div key={card.titleKey} className="bg-gray-900 rounded-xl p-5 flex gap-4">
                <span className="text-2xl shrink-0">{card.icon}</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{t(`fenapo2026.gettingThere.${card.titleKey}`)}</h3>
                  <p className="text-gray-400 text-sm">{t(`fenapo2026.gettingThere.${card.descKey}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-3">{t('fenapo2026.accommodation.title')}</h2>
            <p className="text-gray-400">{t('fenapo2026.accommodation.description')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(
              [
                { titleKey: 'nearbyTitle', descKey: 'nearbyDesc', icon: '📍' },
                { titleKey: 'centroTitle', descKey: 'centroDesc', icon: '🏛️' },
                { titleKey: 'budgetTitle', descKey: 'budgetDesc', icon: '💡' },
              ] as const
            ).map((card) => (
              <div key={card.titleKey} className="bg-gray-800 rounded-xl p-5">
                <span className="text-2xl mb-3 block">{card.icon}</span>
                <h3 className="font-bold text-white mb-2">{t(`fenapo2026.accommodation.${card.titleKey}`)}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t(`fenapo2026.accommodation.${card.descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-950 text-white">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold font-serif mb-10 text-center">{t('fenapo2026.faq.title')}</h2>
          <div className="space-y-7">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="border-b border-gray-800 pb-7">
                <p className="font-bold text-white mb-2">{t(`fenapo2026.faq.q${i + 1}`)}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{t(`fenapo2026.faq.a${i + 1}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-950 via-purple-950 to-indigo-950 text-white">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold font-serif mb-4">{t('fenapo2026.cta.title')}</h2>
          <p className="text-white/80 mb-8">{t('fenapo2026.cta.description')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://fenapo.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-colors"
            >
              {t('fenapo2026.cta.official')}
              <TicketIcon className="w-5 h-5" />
            </a>
            <Link
              href="/newsletter"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-full transition-colors"
            >
              {t('fenapo2026.cta.newsletter')}
            </Link>
            <Link
              href="/events"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-full transition-colors"
            >
              {t('fenapo2026.cta.moreEvents')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
