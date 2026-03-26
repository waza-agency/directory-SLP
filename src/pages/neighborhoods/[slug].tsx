import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { neighborhoods, getNeighborhoodBySlug, getAllNeighborhoodSlugs } from '@/data/neighborhoods';
import ShareButton from '@/components/sharing/ShareButton';

interface NeighborhoodPageProps {
  neighborhood: typeof neighborhoods[0];
}

export default function NeighborhoodPage({ neighborhood }: NeighborhoodPageProps) {
  const { t, i18n } = useTranslation('common');
  const isSpanish = i18n.language === 'es';
  const description = isSpanish ? (neighborhood.descriptionEs || neighborhood.description) : neighborhood.description;

  return (
    <>
      <Head>
        <title>
          {neighborhood.name} - San Luis Potosí | San Luis Way
        </title>
        <meta name="description" content={`${description} Learn about rental prices, pros and cons, and what makes this neighborhood unique in San Luis Potosí.`} />
        <meta property="og:title" content={`${neighborhood.name} - San Luis Potosí`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-900/50" />
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-30" />
          
          <div className="container mx-auto px-4 relative z-10 pt-32">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <span className={`${neighborhood.badgeColor} text-white px-4 py-1 rounded-full text-sm font-semibold`}>
                  {neighborhood.badge}
                </span>
                {neighborhood.tags.map(tag => (
                  <span key={tag} className="bg-white/20 text-white px-3 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {neighborhood.emoji} {neighborhood.name}
              </h1>
              
              <p className="text-xl text-gray-200 mb-8">
                {description}
              </p>

              <div className="flex flex-wrap gap-4">
                <ShareButton 
                  title={`${neighborhood.name} - San Luis Potosí`} 
                  text={`Check out ${neighborhood.name} neighborhood in San Luis Potosí:`}
                  size="lg"
                />
                <Link 
                  href="/resources/neighborhoods-san-luis-potosi"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-colors"
                >
                  ← All Neighborhoods
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {neighborhood.prices[0]?.range.split(' - ')[0] || 'N/A'}
                </div>
                <div className="text-gray-600 text-sm">Starting Rent</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {neighborhood.pros?.length || 0}
                </div>
                <div className="text-gray-600 text-sm">Pros</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {neighborhood.cons?.length || 0}
                </div>
                <div className="text-gray-600 text-sm">Cons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {neighborhood.subAreas?.length || 0}
                </div>
                <div className="text-gray-600 text-sm">Sub-areas</div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">💰 Rental Prices</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {neighborhood.prices.map((price, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="text-gray-600 text-sm mb-2">{price.type}</div>
                  <div className="text-2xl font-bold text-primary">{price.range}</div>
                  <div className="text-gray-500 text-sm">MXN/month</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Pros */}
              <div>
                <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
                  ✓ Pros
                </h3>
                <ul className="space-y-4">
                  {neighborhood.pros?.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-700">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div>
                <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
                  ✗ Cons
                </h3>
                <ul className="space-y-4">
                  {neighborhood.cons?.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </span>
                      <span className="text-gray-700">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Expats Choose / Highlights */}
        {(neighborhood.whyExpatsChoose || neighborhood.schoolHighlight || neighborhood.parkHighlight) && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">🏆 Highlights</h2>
              
              {neighborhood.whyExpatsChoose && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {neighborhood.whyExpatsChoose.map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                      <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {neighborhood.schoolHighlight && (
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-4">
                  <h4 className="font-bold text-blue-900 mb-2">🎓 {neighborhood.schoolHighlight.name}</h4>
                  <p className="text-blue-800 text-sm">{neighborhood.schoolHighlight.address}</p>
                  <p className="text-blue-700 text-sm mt-2">{neighborhood.schoolHighlight.programs}</p>
                </div>
              )}

              {neighborhood.parkHighlight && (
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                  <h4 className="font-bold text-green-900 mb-2">🌳 Parque Tangamanga</h4>
                  <p className="text-green-800 text-sm">{neighborhood.parkHighlight}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Sub-areas */}
        {neighborhood.subAreas && neighborhood.subAreas.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">📍 Sub-areas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {neighborhood.subAreas.map((sub, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-2">{sub.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{sub.desc}</p>
                    <div className="text-primary font-semibold">{sub.price}/month</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Who Lives Here */}
        {neighborhood.whoLivesHere && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">👥 Who Lives Here</h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                {neighborhood.whoLivesHere}
              </p>
            </div>
          </section>
        )}

        {/* Warning */}
        {neighborhood.warning && (
          <section className="py-8 bg-amber-50">
            <div className="container mx-auto px-4">
              <div className="bg-amber-100 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <h4 className="font-bold text-amber-900 mb-1">Important Note</h4>
                    <p className="text-amber-800">{neighborhood.warning}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Finding Your Perfect Neighborhood?</h2>
            <p className="text-xl mb-8 opacity-90">
              Our team can help you find the right area for your family and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact?subject=Neighborhood%20Assistance"
                className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Personalized Help
              </Link>
              <Link 
                href="/resources/neighborhoods-san-luis-potosi"
                className="inline-flex items-center justify-center bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors"
              >
                View All Neighborhoods
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const slugs = getAllNeighborhoodSlugs();
  
  const paths = [];
  for (const locale of locales || ['en', 'es']) {
    for (const slug of slugs) {
      paths.push({ params: { slug: slug.slug }, locale });
    }
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const neighborhood = getNeighborhoodBySlug(params?.slug as string);
  
  if (!neighborhood) {
    return { notFound: true };
  }

  return {
    props: {
      ...await serverSideTranslations(locale || 'en', ['common']),
      neighborhood,
    },
    revalidate: 3600,
  };
};