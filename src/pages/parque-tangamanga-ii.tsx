import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import {
  ClockIcon,
  MapPinIcon,
  TicketIcon,
  SparklesIcon,
  TrophyIcon,
  CalendarIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '@/components/common/SEO';
import GuideCTA from '@/components/common/GuideCTA';
import LastUpdated from '@/components/common/LastUpdated';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
};

const tangamanga2StructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Park',
  name: 'Parque Tangamanga II',
  alternateName: 'Parque Tangamanga 2',
  description:
    'Parque Tangamanga II is a 189-hectare sports park in San Luis Potosí built over the city\'s old municipal airport. Home to archery, auto racing, running loops, sports courts, pet zone and kids area.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Salvador Nava Martínez',
    addressLocality: 'San Luis Potosí',
    addressRegion: 'SLP',
    postalCode: '78260',
    addressCountry: 'MX',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 22.1344,
    longitude: -101.0256,
  },
  telephone: '+52-444-811-5396',
  url: 'https://www.sanluisway.com/parque-tangamanga-ii',
  dateCreated: '1985',
  isAccessibleForFree: true,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Archery club' },
    { '@type': 'LocationFeatureSpecification', name: 'Auto racing track' },
    { '@type': 'LocationFeatureSpecification', name: 'Sports courts' },
    { '@type': 'LocationFeatureSpecification', name: 'Running loops' },
    { '@type': 'LocationFeatureSpecification', name: 'Pet zone' },
    { '@type': 'LocationFeatureSpecification', name: 'Kids zone' },
  ],
};

export default function ParqueTangamanga2() {
  const { t } = useTranslation('common');

  const faqs = [
    { q: t('tangamanga2.faq.q1'), a: t('tangamanga2.faq.a1') },
    { q: t('tangamanga2.faq.q2'), a: t('tangamanga2.faq.a2') },
    { q: t('tangamanga2.faq.q3'), a: t('tangamanga2.faq.a3') },
    { q: t('tangamanga2.faq.q4'), a: t('tangamanga2.faq.a4') },
    { q: t('tangamanga2.faq.q5'), a: t('tangamanga2.faq.a5') },
  ];

  const attractions = [
    { icon: '🏹', titleKey: 'archeryTitle', descKey: 'archeryDesc' },
    { icon: '🏁', titleKey: 'racingTitle', descKey: 'racingDesc' },
    { icon: '⚽', titleKey: 'sportsTitle', descKey: 'sportsDesc' },
    { icon: '🐕', titleKey: 'petTitle', descKey: 'petDesc' },
    { icon: '🎠', titleKey: 'kidsTitle', descKey: 'kidsDesc' },
    { icon: '🏃', titleKey: 'runningTitle', descKey: 'runningDesc' },
  ];

  return (
    <>
      <SEO
        title={t('tangamanga2.seo.title')}
        description={t('tangamanga2.seo.description')}
        keywords={t('tangamanga2.seo.keywords')}
        ogImage="/images/parque-tangamanga/hero.jpg"
        structuredData={tangamanga2StructuredData}
      />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                'radial-gradient(2px 2px at 20px 30px,white,transparent),radial-gradient(2px 2px at 60px 80px,white,transparent),radial-gradient(1px 1px at 120px 50px,white,transparent),radial-gradient(1px 1px at 180px 100px,white,transparent)',
              backgroundSize: '200px 130px',
            }}
          />
          <div className="relative container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <span className="inline-block bg-blue-400/20 border border-blue-300/40 rounded-full px-3 py-1 text-xs font-semibold text-blue-100 mb-4">
                🏃 {t('tangamanga2.hero.badge')}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('tangamanga2.title')}</h1>
              <LastUpdated date="2026-04-17" className="text-blue-200 mb-4" />
              <p className="text-xl text-blue-100 max-w-2xl">{t('tangamanga2.subtitle')}</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-sm">
                  <TrophyIcon className="w-4 h-4 text-blue-300" />
                  <span className="font-semibold">{t('tangamanga2.hero.size')}</span>
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-sm">
                  <TicketIcon className="w-4 h-4 text-blue-300" />
                  <span className="font-semibold">{t('tangamanga2.hero.admission')}</span>
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-sm">
                  <CalendarIcon className="w-4 h-4 text-blue-300" />
                  <span className="font-semibold">{t('tangamanga2.hero.year')}</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Quick Facts */}
            <section className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('tangamanga2.quickFacts.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Location</p>
                    <p className="text-sm text-gray-900">{t('tangamanga2.quickFacts.location')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Address</p>
                    <p className="text-sm text-gray-900">{t('tangamanga2.quickFacts.address')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneIcon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</p>
                    <p className="text-sm text-gray-900">{t('tangamanga2.quickFacts.phone')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarIcon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Inaugurated</p>
                    <p className="text-sm text-gray-900">{t('tangamanga2.quickFacts.inaugurated')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <ClockIcon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Hours</p>
                    <p className="text-sm text-gray-900">{t('tangamanga2.quickFacts.hours')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* History */}
            <section className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <SparklesIcon className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">{t('tangamanga2.history.title')}</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">{t('tangamanga2.history.body')}</p>
            </section>

            {/* Attractions */}
            <section className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <TrophyIcon className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">{t('tangamanga2.attractions.title')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {attractions.map(({ icon, titleKey, descKey }) => (
                  <div key={titleKey} className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl" aria-hidden>
                        {icon}
                      </span>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">
                          {t(`tangamanga2.attractions.${titleKey}`)}
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {t(`tangamanga2.attractions.${descKey}`)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Compare vs Tangamanga I */}
            <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 rounded-2xl shadow-lg p-8 border-2 border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('tangamanga2.compare.title')}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{t('tangamanga2.compare.body')}</p>
              <Link
                href="/parque-tangamanga"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-5 py-2.5 transition-colors"
              >
                {t('tangamanga2.compare.cta')} <span aria-hidden>→</span>
              </Link>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('tangamanga2.faq.title')}</h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <details key={index} className="group bg-gray-50 rounded-xl">
                    <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-gray-900">
                      {faq.q}
                      <span className="ml-2 text-gray-500 group-open:rotate-180 transition-transform">
                        &#9660;
                      </span>
                    </summary>
                    <div className="px-4 pb-4 text-gray-700">{faq.a}</div>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-12">
          <GuideCTA
            relatedLinks={[
              { href: '/parque-tangamanga', label: 'Parque Tangamanga I', labelEs: 'Parque Tangamanga I' },
              { href: '/events/maraton-tangamanga-2026', label: 'BMW Marathon 2026', labelEs: 'Maratón BMW 2026' },
              { href: '/family-friendly-activities', label: 'Family Activities', labelEs: 'Actividades Familiares' },
              { href: '/places', label: 'All Places', labelEs: 'Todos los Lugares' },
            ]}
          />
        </div>
      </div>
    </>
  );
}
