import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import AdUnit from '@/components/common/AdUnit';
import AffiliateGrid from '@/components/affiliate/AffiliateGrid';
import NewsletterBanner from '@/components/NewsletterBanner';
import LastUpdated from '@/components/common/LastUpdated';
import GuideCTA from '@/components/common/GuideCTA';
import VisitQuickFacts from '@/components/guides/VisitQuickFacts';
import ExtendedItinerary from '@/components/guides/ExtendedItinerary';
import WhereToStay from '@/components/guides/WhereToStay';
import GettingAround from '@/components/guides/GettingAround';
import MoneyAndCosts from '@/components/guides/MoneyAndCosts';
import SafetyTips from '@/components/guides/SafetyTips';
import PhotoSpots from '@/components/guides/PhotoSpots';
import ToursAndExperiences from '@/components/guides/ToursAndExperiences';
import SouvenirGuide from '@/components/guides/SouvenirGuide';
import PueblosMagicos from '@/components/guides/PueblosMagicos';
import WeatherCalendar from '@/components/guides/WeatherCalendar';

const sections = [
  { id: 'attractions', nameKey: 'visitGuide.nav.attractions', fallback: 'Top Attractions' },
  { id: 'itinerary', nameKey: 'visitGuide.nav.itinerary', fallback: 'Itinerary' },
  { id: 'where-to-stay', fallback: 'Where to Stay' },
  { id: 'getting-around', fallback: 'Getting Around' },
  { id: 'food', nameKey: 'visitGuide.nav.food', fallback: 'Food' },
  { id: 'money', fallback: 'Money & Costs' },
  { id: 'tours', fallback: 'Tours & Experiences' },
  { id: 'photo-spots', fallback: 'Photo Spots' },
  { id: 'day-trips', nameKey: 'visitGuide.nav.dayTrips', fallback: 'Day Trips' },
  { id: 'pueblos-magicos', fallback: 'Pueblos Mágicos' },
  { id: 'culture', nameKey: 'visitGuide.nav.culture', fallback: 'Culture' },
  { id: 'souvenirs', fallback: 'Souvenirs' },
  { id: 'safety', fallback: 'Safety Tips' },
  { id: 'getting-here', nameKey: 'visitGuide.nav.gettingHere', fallback: 'Getting Here' },
  { id: 'best-time', nameKey: 'visitGuide.nav.bestTime', fallback: 'Best Time' },
  { id: 'faq', nameKey: 'visitGuide.nav.faq', fallback: 'FAQ' },
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
        <section className="relative h-[60vh] min-h-[460px] bg-secondary overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/cultura-1.jpg"
              alt="San Luis Potosí historic center"
              fill
              className="object-cover scale-105"
              priority
            />
            {/* Stronger layered overlays so title always pops */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/95" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-end pb-12 md:pb-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full px-4 py-1.5 text-xs font-semibold text-white mb-5 shadow-lg">
                <span>🧭</span>
                <span>Travel Guide</span>
                <span className="opacity-60">·</span>
                <span className="opacity-90">San Luis Potosí</span>
              </div>
              <h1
                className="font-serif text-5xl md:text-7xl font-extrabold mb-5 leading-[1.05] tracking-tight"
                style={{ textShadow: '0 4px 24px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.5)' }}
              >
                <span className="block text-white">Visit</span>
                <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  San Luis Potosí
                </span>
              </h1>
              <p
                className="text-lg md:text-2xl text-white/95 max-w-2xl leading-relaxed font-light"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}
              >
                {t('visitGuide.hero.subtitle')}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-6">
                <span className="inline-flex items-center gap-1.5 bg-amber-500 text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-lg ring-1 ring-amber-300/50">
                  ✨ UNESCO World Heritage
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-lg ring-1 ring-emerald-300/50">
                  ⏱ 12 min read
                </span>
                <LastUpdated
                  date="2026-04-13"
                  className="!mt-0 !text-white bg-white/15 backdrop-blur-md border border-white/30 rounded-full px-3.5 py-2 text-xs font-semibold shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick facts strip */}
        <VisitQuickFacts />

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-xl shadow-sm p-4 border border-gray-100 max-h-[calc(100vh-7rem)] overflow-y-auto">
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
                      {s.nameKey ? t(s.nameKey) : s.fallback}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-3 space-y-14">
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
                    <Link key={a.href} href={a.href} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image src={a.img} alt={t(a.nameKey)} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">{t(a.nameKey)}</h3>
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

              {/* Extended 3-day itinerary */}
              <ExtendedItinerary />

              {/* Where to stay */}
              <WhereToStay />

              <AdUnit placement="mid-content" />

              {/* Getting around */}
              <GettingAround />

              {/* Food & Dining */}
              <section id="food">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('visitGuide.food.title')}</h2>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { src: '/images/food/enchiladas-potosinas.jpg', alt: 'Enchiladas Potosinas' },
                    { src: '/images/food/asado-de-boda.jpg', alt: 'Asado de Boda' },
                    { src: '/images/food/street-food-main.jpg', alt: 'Street food in SLP' },
                  ].map((img) => (
                    <div key={img.src} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                      <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
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
                    <Link key={link.href} href={link.href} className="flex items-center gap-2 p-3 rounded-lg bg-white border border-gray-100 hover:bg-gray-50 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 text-gray-700 font-medium text-sm shadow-sm">
                      <span className="text-primary">→</span>
                      {t(link.labelKey)}
                    </Link>
                  ))}
                </div>
              </section>

              {/* Money & costs */}
              <MoneyAndCosts />

              {/* Tours & experiences */}
              <ToursAndExperiences />

              <AdUnit placement="in-article" />

              {/* Photo spots */}
              <PhotoSpots />

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
                    <div key={key} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image src={img} alt={t(`visitGuide.dayTrips.${key}.name`)} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
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

              {/* Pueblos Mágicos */}
              <PueblosMagicos />

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
                <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-4 group">
                  <Image src="/images/cultural/teatro-de-la-paz.jpg" alt="Teatro de la Paz — San Luis Potosí" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <p className="text-gray-600 mb-4">{t('visitGuide.culture.intro')}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { href: '/cultural/festivals', labelKey: 'visitGuide.culture.festivals' },
                    { href: '/cultural/music-dance', labelKey: 'visitGuide.culture.music' },
                    { href: '/cultural/culinary-traditions', labelKey: 'visitGuide.culture.culinary' },
                    { href: '/events/all', labelKey: 'visitGuide.culture.events' },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-center gap-2 p-3 rounded-lg bg-white border border-gray-100 hover:bg-gray-50 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 text-gray-700 font-medium text-sm shadow-sm">
                      <span className="text-primary">→</span>
                      {t(link.labelKey)}
                    </Link>
                  ))}
                </div>
              </section>

              {/* Souvenirs */}
              <SouvenirGuide />

              {/* Safety & practical tips */}
              <SafetyTips />

              {/* Getting Here */}
              <section id="getting-here">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('visitGuide.gettingHere.title')}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    <div className="text-2xl mb-2">✈️</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('visitGuide.gettingHere.byAir.title')}</h3>
                    <p className="text-sm text-gray-600">{t('visitGuide.gettingHere.byAir.description')}</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    <div className="text-2xl mb-2">🚌</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('visitGuide.gettingHere.byBus.title')}</h3>
                    <p className="text-sm text-gray-600">{t('visitGuide.gettingHere.byBus.description')}</p>
                  </div>
                </div>
              </section>

              {/* Best Time to Visit */}
              <section id="best-time">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('visitGuide.bestTime.title')}</h2>
                <p className="text-gray-600 mb-5">{t('visitGuide.bestTime.intro')}</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {['octDec', 'janMar', 'aprJun', 'julSep'].map((key) => (
                    <div key={key} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                      <h3 className="font-semibold text-gray-900 mb-1">{t(`visitGuide.bestTime.${key}.title`)}</h3>
                      <p className="text-sm text-gray-600">{t(`visitGuide.bestTime.${key}.description`)}</p>
                    </div>
                  ))}
                </div>
                <WeatherCalendar />
              </section>

              {/* FAQ */}
              <section id="faq">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('visitGuide.faq.title')}</h2>
                <div className="space-y-4">
                  {faqItems.map((item, i) => (
                    <details key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm group hover:shadow-md transition-shadow">
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

              <AffiliateGrid
                productIds={[
                  'dubery-lentes-polarizados',
                  'termo-acero-inoxidable',
                  'columbia-tenis-senderismo',
                  'mochila-hidratacion-tactica',
                ]}
              />

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
