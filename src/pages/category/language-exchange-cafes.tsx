import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
};

const cafes = [
  {
    id: 'cafe-1',
    name: 'Café Lingua',
    description: 'Popular café hosting regular language exchange events and conversation groups.',
    image: '/images/cafes/cafe-lingua.jpg',
    location: 'Colonia del Valle',
    features: ['Language Events', 'Study Space', 'Free Wi-Fi'],
    languages: ['Spanish', 'English', 'French'],
    schedule: 'Language exchange events every Tuesday and Thursday',
  },
  // Add more cafes here
];

export default function LanguageExchangeCafes() {

  return (
    <>
      <Head>
        <title>Language Exchange Cafes in San Luis Potosí | SLP Guide</title>
        <meta 
          name="description" 
          content="Find cafes and venues where you can practice Spanish with locals and meet other expats in San Luis Potosí."
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-[400px]">
          <Image
            src="/images/practical-categories/language-exchange-cafes.jpg"
            alt="Language Exchange Cafes"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Language Exchange Cafes
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                Practice Spanish with locals and meet other expats in a relaxed environment.
              </p>
            </div>
          </div>
        </section>

        {/* Listings Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cafes.map((cafe) => (
                <div 
                  key={cafe.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={cafe.image}
                      alt={cafe.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{cafe.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{cafe.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {cafe.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {cafe.schedule}
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {cafe.features.map((feature) => (
                          <span 
                            key={feature}
                            className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cafe.languages.map((language) => (
                          <span 
                            key={language}
                            className="bg-secondary/10 text-secondary text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Why Join Language Exchange Events?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Meet New People</h3>
                <p className="text-gray-600">
                  Connect with locals and fellow expats in a friendly, social setting.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h4v4H3V5zm0 10h4v4H3v-4zm10-10h4v4h-4V5zm0 10h4v4h-4v-4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Practice Languages</h3>
                <p className="text-gray-600">
                  Improve your Spanish skills through natural conversation.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Cultural Exchange</h3>
                <p className="text-gray-600">
                  Learn about local culture and share your own experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Community Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Language Exchange Community</h2>
            <p className="text-lg text-gray-600 mb-8">
              Get updates about upcoming language exchange events and connect with fellow language learners.
            </p>
            <Link 
              href="/community" 
              className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-md transition-colors"
            >
              Join the Community
            </Link>
          </div>
        </section>
      </main>
    </>
  );
} 