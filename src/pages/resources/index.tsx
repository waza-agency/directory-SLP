import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import B2BBanner from '@/components/B2BBanner';

interface GuideCard {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  color: string;
  icon: React.ReactNode;
}

export default function ResourcesHubPage() {
  const { t } = useTranslation('common');

  const guides: GuideCard[] = [
    {
      id: 'living-guide',
      title: 'Ultimate Living Guide',
      description: 'Your comprehensive guide to daily life in San Luis Potosí. Culture, food, shopping, entertainment, and everything you need to thrive.',
      image: '/images/expat-guide-infographic.png',
      href: '/resources/living-guide',
      color: 'from-orange-700 to-orange-500',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'arrival-checklist',
      title: 'Arrival Checklist',
      description: 'Your first 30 days in SLP. 45+ actionable items covering essentials, bureaucracy, utilities, banking, healthcare, and social integration.',
      image: '/images/cultura-3.jpg',
      href: '/resources/arrival-checklist',
      color: 'from-rose-600 to-red-500',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: 'expat-guide',
      title: 'Expat Essentials Guide',
      description: 'Essential practical information for expats. Emergency contacts, healthcare, banking, immigration, transportation, and utilities.',
      image: '/images/cultura-2.jpg',
      href: '/resources/expat-guide',
      color: 'from-teal-700 to-teal-500',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
    },
    {
      id: 'school-guide',
      title: 'Ultimate School Guide',
      description: 'Complete guide to education in SLP. From preschools to universities, international schools, curricula, and enrollment processes.',
      image: '/images/cultura-1.jpg',
      href: '/resources/school-guide',
      color: 'from-blue-600 to-blue-500',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
    },
    {
      id: 'health-guide',
      title: 'Ultimate Health Services Guide',
      description: 'Complete healthcare guide for SLP. Hospitals, clinics, specialists, insurance options, pharmacies, and wellness services.',
      image: '/images/cultura-3.jpg',
      href: '/resources/health-guide',
      color: 'from-emerald-600 to-emerald-500',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      id: 'neighborhoods-guide',
      title: 'Ultimate Neighborhoods Guide',
      description: 'Where to live in SLP? Complete guide to 7 neighborhoods with rental prices, safety ratings, schools, and insider tips for expats.',
      image: '/images/cultura-4.jpg',
      href: '/resources/neighborhoods-san-luis-potosi',
      color: 'from-purple-700 to-purple-500',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 'safety-guide',
      title: 'Is San Luis Potosí Safe?',
      description: 'Complete safety analysis with crime statistics, INEGI perception data, safe neighborhoods, expat experiences, and practical tips.',
      image: '/images/cultura-2.jpg',
      href: '/resources/safety-guide',
      color: 'from-slate-700 to-slate-500',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 'family-guide',
      title: 'Ultimate Family Life Guide',
      description: 'Complete guide for families: schools, parks, pediatric care, childcare, sports activities, and family-friendly neighborhoods.',
      image: '/images/cultura-1.jpg',
      href: '/resources/family-guide',
      color: 'from-pink-600 to-purple-500',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Resources Hub | San Luis Way - Complete Guides for Living in SLP</title>
        <meta name="description" content="Your complete resource center for living in San Luis Potosí. Comprehensive guides covering daily life, expat essentials, schools, healthcare, and more." />
        <meta name="keywords" content="San Luis Potosí resources, SLP guides, expat resources, living in Mexico guides, San Luis Potosí schools, healthcare SLP" />
        <meta property="og:title" content="Resources Hub | San Luis Way" />
        <meta property="og:description" content="Your complete resource center for living in San Luis Potosí." />
        <meta property="og:url" content="https://www.sanluisway.com/resources" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Resources Hub - San Luis Way",
              "description": "Complete resource center for living in San Luis Potosí",
              "url": "https://www.sanluisway.com/resources",
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": guides.map((guide, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "name": guide.title,
                  "url": `https://www.sanluisway.com${guide.href}`
                }))
              }
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Resources Hub
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Your complete guide to living, working, and thriving in San Luis Potosí
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm">
                  Comprehensive Guides
                </span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm">
                  Local Insights
                </span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm">
                  Updated 2025
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {guides.map((guide) => (
                <Link
                  key={guide.id}
                  href={guide.href}
                  className="group relative overflow-hidden rounded-2xl shadow-elegant hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] relative">
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${guide.color} opacity-80`} />
                  </div>
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-white/20 rounded-lg text-white">
                        {guide.icon}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white">
                        {guide.title}
                      </h2>
                    </div>
                    <p className="text-white/90 text-sm md:text-base mb-4">
                      {guide.description}
                    </p>
                    <div className="flex items-center text-white font-medium group-hover:gap-3 gap-2 transition-all">
                      <span>Explore Guide</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                What are you looking for?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Is SLP Safe?', href: '/resources/safety-guide' },
                  { label: 'Family Life', href: '/resources/family-guide' },
                  { label: 'Schools & Education', href: '/resources/school-guide' },
                  { label: 'Hospitals & Clinics', href: '/resources/health-guide' },
                  { label: 'Neighborhoods', href: '/resources/neighborhoods-san-luis-potosi' },
                  { label: 'Kids Activities', href: '/resources/family-guide#parks' },
                  { label: 'Transportation', href: '/resources/expat-guide#transportation' },
                  { label: 'Banking', href: '/resources/expat-guide#banking' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-4 py-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-primary hover:text-white transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Fact-Check Notice */}
        <section className="py-12 bg-emerald-50 border-y border-emerald-200">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-emerald-900 mb-4">
                    Compromiso con la Precisión | Commitment to Accuracy
                  </h3>

                  {/* Bilingual Content Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Spanish */}
                    <div className="bg-white/60 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🇲🇽</span>
                        <span className="font-semibold text-emerald-900">Español</span>
                      </div>
                      <p className="text-emerald-800 text-sm mb-2">
                        Todas nuestras guías pasan por un riguroso proceso de verificación. Utilizamos fuentes oficiales e investigación académica para asegurar la exactitud.
                      </p>
                      <p className="text-emerald-700 text-sm">
                        <strong>¿Encontraste un error?</strong> Queremos saberlo. Reporta cualquier información incorrecta y la corregiremos de inmediato.
                      </p>
                    </div>

                    {/* English */}
                    <div className="bg-white/60 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🇺🇸</span>
                        <span className="font-semibold text-emerald-900">English</span>
                      </div>
                      <p className="text-emerald-800 text-sm mb-2">
                        All our guides undergo rigorous fact-checking. We use official sources and academic research to ensure accuracy.
                      </p>
                      <p className="text-emerald-700 text-sm">
                        <strong>Found an error?</strong> We want to know. Report any incorrect information and we&apos;ll fix it immediately.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/blog/factchecks"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      Ver Reportes / View Reports
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Reportar Error / Report Error
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* B2B Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('b2b.card.title')}
              </h3>
              <p className="text-gray-600">
                {t('b2b.card.description')}
              </p>
            </div>
            <B2BBanner variant="compact" />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Our blog has hundreds of articles about life in San Luis Potosí. Search for specific topics or browse our latest posts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/blog"
                className="px-8 py-3 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Browse Blog
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};
