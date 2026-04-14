import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import AdUnit from '@/components/common/AdUnit';
import NewsletterBanner from '@/components/NewsletterBanner';
import LastUpdated from '@/components/common/LastUpdated';
import GuideCTA from '@/components/common/GuideCTA';

const sections = [
  { id: 'attractions', nameKey: 'visitGuide.nav.attractions' },
  { id: 'itinerary', nameKey: 'visitGuide.nav.itinerary' },
  { id: 'food', nameKey: 'visitGuide.nav.food' },
  { id: 'day-trips', nameKey: 'visitGuide.nav.dayTrips' },
  { id: 'culture', nameKey: 'visitGuide.nav.culture' },
  { id: 'getting-here', nameKey: 'visitGuide.nav.gettingHere' },
  { id: 'best-time', nameKey: 'visitGuide.nav.bestTime' },
  { id: 'faq', nameKey: 'visitGuide.nav.faq' },
];

const faqItems = [
  {
    q: 'How do I get to San Luis Potosí?',
    a: 'SLP has its own international airport (BJX/SLP) with direct flights from Mexico City, Monterrey, Dallas, Houston and Chicago. By bus, it is 4-5 hours from Mexico City, 3 hours from Querétaro, and 5 hours from Monterrey via Primera Plus or ETN.',
  },
  {
    q: 'How many days do I need in San Luis Potosí?',
    a: 'A minimum of 2-3 days covers the historic center, main museums and local cuisine. For day trips to Huasteca Potosina, Real de Catorce or Xilitla, plan 5-7 days total.',
  },
  {
    q: 'Is San Luis Potosí safe for tourists?',
    a: 'Yes. The historic center and tourist areas are well-patrolled and generally very safe. SLP is considered one of the safest mid-size cities in Mexico. Standard precautions apply as in any city.',
  },
  {
    q: 'What is the best time to visit?',
    a: 'October to April offers the most pleasant weather (18-25°C). The Feria Nacional Potosina (FENAPO) in August is the biggest festival. Holy Week (Semana Santa) features spectacular processions.',
  },
  {
    q: 'Do I need to speak Spanish?',
    a: 'Basic Spanish helps, especially outside the city center. Hotels, major restaurants and tourist attractions often have English-speaking staff. Learning a few phrases will enrich your experience significantly.',
  },
];

export default function VisitSanLuisPotosiPage() {
  const [activeSection, setActiveSection] = useState('attractions');
  const { t } = useTranslation('common');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>{t('visitGuide.meta.title')}</title>
        <meta name="description" content={t('visitGuide.meta.description')} />
        <meta name="keywords" content="visit San Luis Potosí, things to do SLP, San Luis Potosí travel guide, tourist attractions SLP, Huasteca Potosina, Real de Catorce, colonial Mexico, UNESCO heritage" />
        <meta property="og:title" content={t('visitGuide.meta.title')} />
        <meta property="og:description" content={t('visitGuide.meta.description')} />
        <meta property="og:image" content="/images/cultura-1.jpg" />
        <meta property="og:url" content="https://www.sanluisway.com/visit-san-luis-potosi" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TouristDestination',
              name: 'San Luis Potosí',
              description: 'Colonial city in central Mexico known for baroque architecture, rich cultural heritage, and gateway to the Huasteca Potosina region.',
              url: 'https://www.sanluisway.com/visit-san-luis-potosi',
              image: 'https://www.sanluisway.com/images/cultura-1.jpg',
              geo: { '@type': 'GeoCoordinates', latitude: 22.1565, longitude: -100.9855 },
              includesAttraction: [
                { '@type': 'TouristAttraction', name: 'Centro Histórico', sameAs: 'https://www.sanluisway.com/centro-historico' },
                { '@type': 'TouristAttraction', name: 'Parque Tangamanga', sameAs: 'https://www.sanluisway.com/parque-tangamanga' },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }),
          }}
        />
      </Head>

      <main className="bg-background min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-primary">Home</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">{t('visitGuide.breadcrumb')}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative h-[40vh] min-h-[300px] bg-secondary">
          <div className="absolute inset-0">
            <Image src="/images/cultura-1.jpg" alt="San Luis Potosí historic center" fill className="object-cover opacity-50" priority />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl text-white">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{t('visitGuide.hero.title')}</h1>
              <p className="text-lg md:text-xl text-gray-200">{t('visitGuide.hero.subtitle')}</p>
              <LastUpdated date="2026-04-13" className="mt-4" />
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">{t('visitGuide.nav.title')}</h3>
                <nav className="space-y-1">
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === s.id ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {t(s.nameKey)}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Top Attractions */}
              <section id="attractions">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('visitGuide.attractions.title')}</h2>
                <p className="text-gray-600 mb-6">{t('visitGuide.attractions.intro')}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { href: '/centro-historico', nameKey: 'visitGuide.attractions.centro', descKey: 'visitGuide.attractions.centroDesc', img: '/images/blog/centro-san-luis/hero-Centro-Historico.jpg' },
                    { href: '/parque-tangamanga', nameKey: 'visitGuide.attractions.tangamanga', descKey: 'visitGuide.attractions.tangamangaDesc', img: '/images/parque-tangamanga/hero.jpg' },
                    { href: '/cultural-attractions', nameKey: 'visitGuide.attractions.museums', descKey: 'visitGuide.attractions.museumsDesc', img: '/images/cultural/museo-federico-silva.jpg' },
                    { href: '/cultural/history', nameKey: 'visitGuide.attractions.history', descKey: 'visitGuide.attractions.historyDesc', img: '/images/cultural/san-luis-potosi-cathedral.jpg' },
                  ].map((a) => (
                    <Link key={a.href} href={a.href} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative aspect-[16/10]">
                        <Image src={a.img} alt={t(a.nameKey)} fill className="object-cover" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-gray-900 mb-2">{t(a.nameKey)}</h3>
                        <p className="text-sm text-gray-600">{t(a.descKey)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Video: SLP Travel Guide */}
              <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Descubriendo los secretos de San Luis Potosí</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/cUmwjwnMf48"
                    title="Descubriendo los secretos de San Luis Potosí, México"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
              </section>

              {/* 48-Hour Itinerary */}
              <section id="itinerary">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('visitGuide.itinerary.title')}</h2>
                <div className="space-y-6">
                  {['day1', 'day2'].map((day) => (
                    <div key={day} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-3">{t(`visitGuide.itinerary.${day}.title`)}</h3>
                      <div className="space-y-2">
                        {['morning', 'afternoon', 'evening'].map((time) => (
                          <div key={time} className="flex gap-3 text-sm">
                            <span className="font-medium text-primary min-w-[80px] capitalize">{t(`visitGuide.itinerary.${time}`)}</span>
                            <span className="text-gray-600">{t(`visitGuide.itinerary.${day}.${time}`)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <AdUnit placement="mid-content" />

              {/* Food & Dining */}
              <section id="food">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('visitGuide.food.title')}</h2>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { src: '/images/food/enchiladas-potosinas.jpg', alt: 'Enchiladas Potosinas' },
                    { src: '/images/food/asado-de-boda.jpg', alt: 'Asado de Boda' },
                    { src: '/images/food/street-food-main.jpg', alt: 'Street food in SLP' },
                  ].map((img) => (
                    <div key={img.src} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <Image src={img.src} alt={img.alt} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{t('visitGuide.food.intro')}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { href: '/restaurants', labelKey: 'visitGuide.food.restaurants' },
                    { href: '/guides/foodie-guide', labelKey: 'visitGuide.food.foodie' },
                    { href: '/traditional-cuisine', labelKey: 'visitGuide.food.traditional' },
                    { href: '/breakfast-spots-san-luis-potosi', labelKey: 'visitGuide.food.breakfast' },
                    { href: '/farmers-markets-san-luis-potosi', labelKey: 'visitGuide.food.markets' },
                    { href: '/food-festivals-san-luis-potosi', labelKey: 'visitGuide.food.festivals' },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-center gap-2 p-3 rounded-lg bg-white border border-gray-100 hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm shadow-sm">
                      <span className="text-primary">→</span>
                      {t(link.labelKey)}
                    </Link>
                  ))}
                </div>
              </section>

              {/* Day Trips */}
              <section id="day-trips">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('visitGuide.dayTrips.title')}</h2>
                <p className="text-gray-600 mb-4">{t('visitGuide.dayTrips.intro')}</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { key: 'huasteca', img: '/images/outdoors/huasteca-waterfall.jpg' },
                    { key: 'realDeCatorce', img: '/images/outdoors/real-de-catorce-main.jpg' },
                    { key: 'xilitla', img: '/images/outdoors/xilitla.webp' },
                  ].map(({ key, img }) => (
                    <div key={key} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                      <div className="relative aspect-[4/3]">
                        <Image src={img} alt={t(`visitGuide.dayTrips.${key}.name`)} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{t(`visitGuide.dayTrips.${key}.name`)}</h3>
                        <p className="text-sm text-gray-600 mb-1">{t(`visitGuide.dayTrips.${key}.description`)}</p>
                        <span className="text-xs text-gray-400">{t(`visitGuide.dayTrips.${key}.distance`)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/weekend-getaways" className="inline-flex items-center gap-2 text-primary font-medium hover:underline mt-4">
                  {t('visitGuide.dayTrips.cta')} →
                </Link>
              </section>

              {/* Video: Pueblos Mágicos */}
              <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Pueblos Mágicos de San Luis Potosí</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/deqYC4PSPEo"
                    title="Pueblos Mágicos de San Luis Potosí"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
              </section>

              {/* Cultural Experiences */}
              <section id="culture">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('visitGuide.culture.title')}</h2>
                <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-4">
                  <Image src="/images/cultural/teatro-de-la-paz.jpg" alt="Teatro de la Paz — San Luis Potosí" fill className="object-cover" />
                </div>
                <p className="text-gray-600 mb-4">{t('visitGuide.culture.intro')}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { href: '/cultural/festivals', labelKey: 'visitGuide.culture.festivals' },
                    { href: '/cultural/music-dance', labelKey: 'visitGuide.culture.music' },
                    { href: '/cultural/culinary-traditions', labelKey: 'visitGuide.culture.culinary' },
                    { href: '/events', labelKey: 'visitGuide.culture.events' },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-center gap-2 p-3 rounded-lg bg-white border border-gray-100 hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm shadow-sm">
                      <span className="text-primary">→</span>
                      {t(link.labelKey)}
                    </Link>
                  ))}
                </div>
              </section>

              <AdUnit placement="in-article" />

              {/* Getting Here */}
              <section id="getting-here">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('visitGuide.gettingHere.title')}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-2">{t('visitGuide.gettingHere.byAir.title')}</h3>
                    <p className="text-sm text-gray-600">{t('visitGuide.gettingHere.byAir.description')}</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-2">{t('visitGuide.gettingHere.byBus.title')}</h3>
                    <p className="text-sm text-gray-600">{t('visitGuide.gettingHere.byBus.description')}</p>
                  </div>
                </div>
              </section>

              {/* Best Time to Visit */}
              <section id="best-time">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('visitGuide.bestTime.title')}</h2>
                <p className="text-gray-600 mb-4">{t('visitGuide.bestTime.intro')}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {['octDec', 'janMar', 'aprJun', 'julSep'].map((key) => (
                    <div key={key} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-1">{t(`visitGuide.bestTime.${key}.title`)}</h3>
                      <p className="text-sm text-gray-600">{t(`visitGuide.bestTime.${key}.description`)}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section id="faq">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('visitGuide.faq.title')}</h2>
                <div className="space-y-4">
                  {faqItems.map((item, i) => (
                    <details key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm group">
                      <summary className="px-5 py-4 cursor-pointer font-medium text-gray-900 flex items-center justify-between">
                        {item.q}
                        <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <p className="px-5 pb-4 text-gray-600 text-sm">{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>

              <NewsletterBanner />

              <GuideCTA
                relatedLinks={[
                  { href: '/centro-historico', label: 'Centro Histórico', labelEs: 'Centro Histórico' },
                  { href: '/restaurants', label: 'Restaurants', labelEs: 'Restaurantes' },
                  { href: '/weekend-getaways', label: 'Weekend Getaways', labelEs: 'Escapadas de Fin de Semana' },
                  { href: '/digital-nomad-guide', label: 'Digital Nomad Guide', labelEs: 'Guía para Nómadas Digitales' },
                ]}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});
