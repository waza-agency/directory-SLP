import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import Footer from '@/components/Footer';

export default function FestivalsPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>Local Festivities & Events - SLP Descubre</title>
        <meta name="description" content="Discover the vibrant festivals and cultural events of San Luis Potosí, with expat-friendly guides explaining traditions and customs." />
        <meta name="keywords" content="San Luis Potosí festivals, cultural events, traditional celebrations, Feria Nacional Potosina, Festival de la Luz, Día de los Muertos" />
        <meta property="og:title" content="Local Festivities & Events - SLP Descubre" />
        <meta property="og:description" content="Experience the vibrant cultural celebrations and traditions of San Luis Potosí." />
        <meta property="og:image" content="/images/festivals.jpeg" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/images/festivals.jpeg"
              alt="Traditional festival in San Luis Potosí"
              fill
              className="object-cover opacity-50"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = target.src.replace('.jpeg', '.png');
              }}
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Local Festivities & Events
              </h1>
              <p className="text-white text-lg">
                Experience the vibrant cultural celebrations and traditions of San Luis Potosí.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Cultural Calendar
              </h2>
              <p className="text-gray-600 mb-6">
                Immerse yourself in the rich cultural traditions of San Luis Potosí through our comprehensive guide to local festivals and celebrations.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Traditional Festivals
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Experience authentic local celebrations, from religious processions to traditional music and dance performances.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>Feria Nacional Potosina</li>
                    <li>Festival de la Luz</li>
                    <li>Día de los Muertos Celebrations</li>
                    <li>Semana Santa Processions</li>
                  </ul>
                  <a href="/cultural-calendar" className="text-secondary hover:text-secondary-light font-medium">
                    View Calendar →
                  </a>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Modern Cultural Events
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Discover contemporary cultural events, art exhibitions, and performances that showcase the city's vibrant arts scene.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>Contemporary Art Exhibitions</li>
                    <li>Music Festivals</li>
                    <li>Food & Wine Events</li>
                    <li>Cultural Workshops</li>
                  </ul>
                  <a href="/cultural-calendar" className="text-secondary hover:text-secondary-light font-medium">
                    View Calendar →
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/images/festivals.jpeg"
                  alt="Traditional festival in San Luis Potosí"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = target.src.replace('.jpeg', '.png');
                  }}
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">Feria Nacional Potosina</h4>
                      <span className="text-sm text-gray-500">Aug 15-30</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      The city's largest annual fair featuring traditional music, food, and cultural performances.
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">Festival de la Luz</h4>
                      <span className="text-sm text-gray-500">Sep 10-15</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      A celebration of light and culture with spectacular light shows and installations.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">Día de los Muertos</h4>
                      <span className="text-sm text-gray-500">Nov 1-2</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Traditional Day of the Dead celebrations with altars, processions, and cultural activities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer currentPage="festivals" />
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