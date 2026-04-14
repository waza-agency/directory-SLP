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
  { id: 'why-slp', nameKey: 'nomadGuide.nav.whySlp' },
  { id: 'coworking', nameKey: 'nomadGuide.nav.coworking' },
  { id: 'internet', nameKey: 'nomadGuide.nav.internet' },
  { id: 'cost-of-living', nameKey: 'nomadGuide.nav.costOfLiving' },
  { id: 'visas', nameKey: 'nomadGuide.nav.visas' },
  { id: 'neighborhoods', nameKey: 'nomadGuide.nav.neighborhoods' },
  { id: 'healthcare', nameKey: 'nomadGuide.nav.healthcare' },
  { id: 'lifestyle', nameKey: 'nomadGuide.nav.lifestyle' },
  { id: 'faq', nameKey: 'nomadGuide.nav.faq' },
];

const faqItems = [
  {
    q: 'Is San Luis Potosí safe for digital nomads?',
    a: 'Yes. SLP is considered one of the safest mid-size cities in Mexico, with low crime rates compared to border cities and major tourist destinations. The historic center and residential areas like Lomas are particularly safe.',
  },
  {
    q: 'How fast is the internet in San Luis Potosí?',
    a: 'Fiber optic is widely available through Telmex and Totalplay, with speeds of 100-500 Mbps in most neighborhoods. Cafes and coworking spaces typically offer 50-100 Mbps.',
  },
  {
    q: 'Do I need a visa to work remotely from Mexico?',
    a: 'For stays up to 180 days, the FMM tourist permit is sufficient — you enter visa-free from most countries. For longer stays, apply for a Temporary Resident visa (1-4 years) which does not require a Mexican employer.',
  },
  {
    q: 'What is the cost of living for a digital nomad in SLP?',
    a: 'A comfortable lifestyle costs $1,000-$1,500 USD/month including rent ($400-$700), food ($200-$350), coworking ($80-$150), transport ($50-$100), and entertainment.',
  },
  {
    q: 'Is there a digital nomad community in SLP?',
    a: 'The community is growing. While smaller than Mexico City or Oaxaca, SLP has an active expat and remote worker scene with language exchanges, coworking events, and social meetups.',
  },
];

export default function DigitalNomadGuidePage() {
  const [activeSection, setActiveSection] = useState('why-slp');
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
        <title>{t('nomadGuide.meta.title')}</title>
        <meta name="description" content={t('nomadGuide.meta.description')} />
        <meta name="keywords" content="digital nomad San Luis Potosí, remote work Mexico, coworking SLP, cost of living San Luis Potosí, wifi cafes SLP, nomad visa Mexico, work remotely Mexico" />
        <meta property="og:title" content={t('nomadGuide.meta.title')} />
        <meta property="og:description" content={t('nomadGuide.meta.description')} />
        <meta property="og:image" content="/images/hero-bg.jpg" />
        <meta property="og:url" content="https://www.sanluisway.com/digital-nomad-guide" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: 'Digital Nomad Guide to San Luis Potosí',
              description: 'Complete guide for digital nomads and remote workers considering San Luis Potosí, Mexico. Coworking, internet, cost of living, visas and lifestyle.',
              image: 'https://www.sanluisway.com/images/hero-bg.jpg',
              author: { '@type': 'Organization', name: 'San Luis Way' },
              publisher: { '@type': 'Organization', name: 'San Luis Way', logo: { '@type': 'ImageObject', url: 'https://www.sanluisway.com/og-image.jpg' } },
              datePublished: '2026-04-13',
              dateModified: '2026-04-13',
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
              <span className="text-gray-900">{t('nomadGuide.breadcrumb')}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative h-[40vh] min-h-[300px] bg-secondary">
          <div className="absolute inset-0">
            <Image src="/images/hero-bg.jpg" alt="San Luis Potosí for digital nomads" fill className="object-cover opacity-50" priority />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl text-white">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{t('nomadGuide.hero.title')}</h1>
              <p className="text-lg md:text-xl text-gray-200">{t('nomadGuide.hero.subtitle')}</p>
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
                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">{t('nomadGuide.nav.title')}</h3>
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
              {/* Why SLP */}
              <section id="why-slp">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('nomadGuide.whySlp.title')}</h2>
                <p className="text-gray-600 mb-6">{t('nomadGuide.whySlp.intro')}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {['timezone', 'safety', 'cost', 'culture'].map((key) => (
                    <div key={key} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">{t(`nomadGuide.whySlp.${key}.title`)}</h3>
                      <p className="text-sm text-gray-600">{t(`nomadGuide.whySlp.${key}.description`)}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Coworking */}
              <section id="coworking">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('nomadGuide.coworking.title')}</h2>
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
                  <Image src="/images/blog/cafes/cafe-sideral.jpg" alt="Cafe Sideral — coworking-friendly cafe in San Luis Potosí" fill className="object-cover" />
                </div>
                <p className="text-gray-600 mb-4">{t('nomadGuide.coworking.intro')}</p>
                <div className="grid sm:grid-cols-3 gap-3 mb-4">
                  {[
                    { src: '/images/blog/cafes/capital-coffee.jpg', alt: 'Capital Coffee SLP' },
                    { src: '/images/blog/cafes/las-castanas-new.jpg', alt: 'Las Castañas cafe' },
                    { src: '/images/blog/cafes/500-noches.jpg', alt: '500 Noches cafe' },
                  ].map((img) => (
                    <div key={img.src} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <Image src={img.src} alt={img.alt} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <Link href="/category/remote-work-cafes" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                  {t('nomadGuide.coworking.cta')} →
                </Link>
              </section>

              {/* Video: Expats & Nomads in SLP */}
              <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Co-Working Space in San Luis Potosí + Airbnb Tour</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/F9uCFB5rfmY"
                    title="Co-Working Space in San Luis Potosí + Airbnb Tour"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
              </section>

              <AdUnit placement="mid-content" />

              {/* Internet */}
              <section id="internet">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('nomadGuide.internet.title')}</h2>
                <p className="text-gray-600 mb-4">{t('nomadGuide.internet.intro')}</p>
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-gray-900">{t('nomadGuide.internet.provider')}</th>
                        <th className="text-left py-2 text-gray-900">{t('nomadGuide.internet.speed')}</th>
                        <th className="text-left py-2 text-gray-900">{t('nomadGuide.internet.price')}</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b"><td className="py-2">Telmex Infinitum</td><td>100-200 Mbps</td><td>$399-$599 MXN/mo</td></tr>
                      <tr className="border-b"><td className="py-2">Totalplay</td><td>200-500 Mbps</td><td>$499-$899 MXN/mo</td></tr>
                      <tr><td className="py-2">Izzi</td><td>100-300 Mbps</td><td>$449-$699 MXN/mo</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Cost of Living */}
              <section id="cost-of-living">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('nomadGuide.costOfLiving.title')}</h2>
                <p className="text-gray-600 mb-4">{t('nomadGuide.costOfLiving.intro')}</p>
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-gray-900">{t('nomadGuide.costOfLiving.category')}</th>
                        <th className="text-left py-2 text-gray-900">{t('nomadGuide.costOfLiving.range')}</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b"><td className="py-2">Rent (1BR furnished)</td><td>$400-$700 USD</td></tr>
                      <tr className="border-b"><td className="py-2">Food & groceries</td><td>$200-$350 USD</td></tr>
                      <tr className="border-b"><td className="py-2">Coworking / cafes</td><td>$80-$150 USD</td></tr>
                      <tr className="border-b"><td className="py-2">Transport (Uber/DiDi)</td><td>$50-$100 USD</td></tr>
                      <tr className="border-b"><td className="py-2">Entertainment</td><td>$100-$200 USD</td></tr>
                      <tr className="font-semibold text-gray-900"><td className="py-2">Total</td><td>$830-$1,500 USD</td></tr>
                    </tbody>
                  </table>
                </div>
                <Link href="/resources/living-guide" className="inline-flex items-center gap-2 text-primary font-medium hover:underline mt-4">
                  {t('nomadGuide.costOfLiving.cta')} →
                </Link>
              </section>

              {/* Visas */}
              <section id="visas">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('nomadGuide.visas.title')}</h2>
                <p className="text-gray-600 mb-4">{t('nomadGuide.visas.intro')}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-2">FMM Tourist Permit</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>Up to 180 days</li>
                      <li>No work permit needed for remote work</li>
                      <li>Free for most nationalities</li>
                      <li>Extendable at INM office</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-2">Temporary Resident Visa</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>1-4 years, renewable</li>
                      <li>Proof of income ~$2,500 USD/mo</li>
                      <li>Apply at Mexican consulate abroad</li>
                      <li>Allows opening bank accounts</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Neighborhoods */}
              <section id="neighborhoods">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('nomadGuide.neighborhoods.title')}</h2>
                <p className="text-gray-600 mb-4">{t('nomadGuide.neighborhoods.intro')}</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { key: 'lomas', img: '/images/practical-categories/easy-parking-spots.png' },
                    { key: 'centro', img: '/images/blog/centro-san-luis/centro-san-luis-potosi-home.jpg' },
                    { key: 'tangamanga', img: '/images/parque-tangamanga/hero.jpg' },
                  ].map(({ key, img }) => (
                    <div key={key} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                      <div className="relative aspect-[4/3]">
                        <Image src={img} alt={key} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{t(`nomadGuide.neighborhoods.${key}.name`)}</h3>
                        <p className="text-sm text-gray-600">{t(`nomadGuide.neighborhoods.${key}.description`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/resources/neighborhoods-san-luis-potosi" className="inline-flex items-center gap-2 text-primary font-medium hover:underline mt-4">
                  {t('nomadGuide.neighborhoods.cta')} →
                </Link>
              </section>

              <AdUnit placement="in-article" />

              {/* Healthcare */}
              <section id="healthcare">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('nomadGuide.healthcare.title')}</h2>
                <p className="text-gray-600 mb-4">{t('nomadGuide.healthcare.intro')}</p>
                <Link href="/resources/health-guide" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                  {t('nomadGuide.healthcare.cta')} →
                </Link>
              </section>

              {/* Video: SLP for Expats */}
              <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">SAN LUIS POTOSI — Expats Are Missing Out on This City!</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/eDzBdzmiMyQ"
                    title="SAN LUIS POTOSI — Expats are missing out on this city"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
              </section>

              {/* Lifestyle */}
              <section id="lifestyle">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('nomadGuide.lifestyle.title')}</h2>
                <p className="text-gray-600 mb-4">{t('nomadGuide.lifestyle.intro')}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { href: '/outdoors', labelKey: 'nomadGuide.lifestyle.outdoors' },
                    { href: '/weekend-getaways', labelKey: 'nomadGuide.lifestyle.getaways' },
                    { href: '/cultural-attractions', labelKey: 'nomadGuide.lifestyle.culture' },
                    { href: '/category/remote-work-cafes', labelKey: 'nomadGuide.lifestyle.cafes' },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-center gap-2 p-3 rounded-lg bg-white border border-gray-100 hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm shadow-sm">
                      <span className="text-primary">→</span>
                      {t(link.labelKey)}
                    </Link>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section id="faq">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('nomadGuide.faq.title')}</h2>
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
                  { href: '/resources/living-guide', label: 'Living Guide', labelEs: 'Guía de Vida' },
                  { href: '/resources/expat-guide', label: 'Expat Guide', labelEs: 'Guía para Expatriados' },
                  { href: '/category/remote-work-cafes', label: 'Remote Work Cafes', labelEs: 'Cafés para Trabajo Remoto' },
                  { href: '/visit-san-luis-potosi', label: 'Visitor Guide', labelEs: 'Guía para Visitantes' },
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
