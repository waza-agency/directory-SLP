import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import Footer from '@/components/Footer';

export default function LanguagePage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>Language and Communication - SLP Descubre</title>
        <meta name="description" content="Master Spanish communication in San Luis Potosí with our comprehensive language resources, classes, and cultural exchange programs." />
        <meta name="keywords" content="Spanish classes, language exchange, translation services, cultural communication, San Luis Potosí language" />
        <meta property="og:title" content="Language and Communication - SLP Descubre" />
        <meta property="og:description" content="Learn Spanish and connect with the local community through our language programs and cultural exchange opportunities." />
        <meta property="og:image" content="/images/language.jpg" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/images/language.jpg"
              alt="Language learning in San Luis Potosí"
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
                Language and Communication
              </h1>
              <p className="text-white text-lg">
                Master Spanish and connect with the local community.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Language Resources
              </h2>
              <p className="text-gray-600 mb-6">
                Whether you're just starting or looking to improve your Spanish, we provide comprehensive language resources and programs to help you communicate effectively in San Luis Potosí.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Spanish Classes
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Structured language courses designed for expatriates, from beginner to advanced levels.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>Small group classes</li>
                    <li>Private tutoring</li>
                    <li>Business Spanish</li>
                    <li>Cultural immersion</li>
                  </ul>
                  <a href="/language-classes" className="text-secondary hover:text-secondary-light font-medium">
                    Book Classes →
                  </a>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Translation Services
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Professional translation and interpretation services for various needs.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>Document translation</li>
                    <li>Legal interpretation</li>
                    <li>Medical translation</li>
                    <li>Business communication</li>
                  </ul>
                  <a href="/translation-services" className="text-secondary hover:text-secondary-light font-medium">
                    Get Help →
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/images/language.jpg"
                  alt="Language learning in San Luis Potosí"
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
                  Language Exchange
                </h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">Conversation Groups</h4>
                      <span className="text-sm text-gray-500">Weekly</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Practice Spanish in a relaxed, social setting with native speakers and fellow learners.
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">Cultural Workshops</h4>
                      <span className="text-sm text-gray-500">Monthly</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Learn language through cultural activities, cooking classes, and local traditions.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">Language Partners</h4>
                      <span className="text-sm text-gray-500">Ongoing</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Connect with language exchange partners for one-on-one practice sessions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer currentPage="language" />
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