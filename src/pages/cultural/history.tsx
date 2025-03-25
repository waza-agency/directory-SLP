import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import Footer from '@/components/Footer';

export default function HistoryPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>History for Newcomers - SLP Descubre</title>
        <meta name="description" content="Discover the rich history of San Luis Potosí, from its colonial past to its mining heritage. Learn about the city's cultural evolution and historical landmarks." />
        <meta name="keywords" content="San Luis Potosí history, colonial heritage, mining history, historical landmarks, cultural heritage" />
        <meta property="og:title" content="History for Newcomers - SLP Descubre" />
        <meta property="og:description" content="Explore the rich historical heritage of San Luis Potosí, from colonial architecture to mining traditions." />
        <meta property="og:image" content="/images/history.jpg" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/images/history.jpg"
              alt="Historical architecture in San Luis Potosí"
              fill
              className="object-cover opacity-50"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = target.src.replace('.jpg', '.png');
              }}
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                History for Newcomers
              </h1>
              <p className="text-white text-lg">
                Discover the rich historical heritage of San Luis Potosí.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Colonial Heritage
              </h2>
              <p className="text-gray-600 mb-6">
                Founded in 1592, San Luis Potosí played a crucial role in the Spanish colonial expansion. The city's historic center, a UNESCO World Heritage site, showcases magnificent colonial architecture and religious buildings.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Historical Landmarks
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Explore the city's most significant historical sites and architectural treasures.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>Plaza de Armas</li>
                    <li>Catedral Metropolitana</li>
                    <li>Palacio de Gobierno</li>
                    <li>Museo del Virreinato</li>
                  </ul>
                  <a href="/historical-tours" className="text-secondary hover:text-secondary-light font-medium">
                    Book a Tour →
                  </a>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Cultural Heritage
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Learn about the traditions and customs that have shaped the city's cultural identity.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>Indigenous Heritage</li>
                    <li>Colonial Traditions</li>
                    <li>Religious Festivals</li>
                    <li>Artistic Legacy</li>
                  </ul>
                  <a href="/cultural-heritage" className="text-secondary hover:text-secondary-light font-medium">
                    Learn More →
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/images/history.jpg"
                  alt="Historical architecture in San Luis Potosí"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = target.src.replace('.jpg', '.png');
                  }}
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Historical Timeline
                </h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">1592</h4>
                      <span className="text-sm text-gray-500">Foundation</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      The city was founded as a Spanish colonial settlement.
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">17th Century</h4>
                      <span className="text-sm text-gray-500">Mining Boom</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      The discovery of silver mines led to rapid growth and prosperity.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">2010</h4>
                      <span className="text-sm text-gray-500">UNESCO Recognition</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Historic center declared a World Heritage site.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer currentPage="history" />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}; 