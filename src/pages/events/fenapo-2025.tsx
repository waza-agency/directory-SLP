import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, TicketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ }) => {
  return {
    props: {
    },
  };
};

export default function Fenapo2025() {

  return (
    <>
      <Head>
        <title>{'FENAPO 2025 - Feria Nacional Potosina | San Luis Potosí'}</title>
        <meta
          name="description"
          content={'FENAPO 2025 - The most traditional fair in Mexico. August 8-31, 2025 in San Luis Potosí. Cultural events, sports, concerts, gastronomy and much more.'}
        />
      </Head>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-800/90">
          <Image
            src="/images/events/fenapo-fair.jpg"
            alt={'FENAPO 2025'}
            fill
            className="mix-blend-overlay object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 py-24 text-white">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 bg-white/20 rounded-full backdrop-blur-sm mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <span className="font-medium">{'August 8 - 31, 2025'}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">
              {'FENAPO 2025'}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-200">
              {'Feria Nacional Potosina'}
            </h2>
            <p className="text-xl mb-8 max-w-2xl">
              {'The most traditional fair in Mexico returns to San Luis Potosí with cultural events, sports, gastronomy, concerts and entertainment for the whole family.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://fenapo.mx/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-white/90 text-blue-900 font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                {'Official Website'}
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
              </a>
              <a
                href="https://fenapo.mx/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                {'Get Tickets'}
                <TicketIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6 font-serif">{'About FENAPO'}</h2>
              <div className="prose prose-lg max-w-none mb-8">
                <p>
                  {'The Feria Nacional Potosina (FENAPO) is one of the most relevant fairs in Mexico and one of the greatest tourist attractions of San Luis Potosí. Celebrated annually during the month of August, this traditional fair brings together culture, entertainment, gastronomy and commerce in one place.'}
                </p>
                <p>
                  {'With more than 20 days of activities, FENAPO offers something for everyone: from cultural and artistic events to sports competitions, from regional gastronomy to international concerts. The fair is a perfect opportunity to experience the warmth and tradition of the Potosino people.'}
                </p>

                <h3>{'What you will find at FENAPO:'}</h3>
                <ul>
                  <li>{'Teatro del Pueblo with national and international artists'}</li>
                  <li>{'Palenque with traditional Mexican music and shows'}</li>
                  <li>{'Cultural and artistic exhibitions'}</li>
                  <li>{'Sports competitions and tournaments'}</li>
                  <li>{'Regional and international gastronomy'}</li>
                  <li>{'Commercial exhibition with local and national products'}</li>
                  <li>{'Mechanical games and family entertainment'}</li>
                  <li>{'Artisan market and local crafts'}</li>
                  <li>{'Agricultural and livestock exhibition'}</li>
                  <li>{'Children activities and family zones'}</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-3 text-blue-900">{'Fair Areas'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-blue-800">{'Teatro del Pueblo'}</h4>
                    <p className="text-gray-600 text-sm">{'Main stage with top artists'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-blue-800">{'Palenque'}</h4>
                    <p className="text-gray-600 text-sm">{'Traditional Mexican entertainment'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-blue-800">{'Gastronomic Area'}</h4>
                    <p className="text-gray-600 text-sm">{'Regional and international food'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-blue-800">{'Commercial Exhibition'}</h4>
                    <p className="text-gray-600 text-sm">{'Products and services'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-blue-800">{'Mechanical Games'}</h4>
                    <p className="text-gray-600 text-sm">{'Fun for all ages'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-blue-800">{'Cultural Pavilion'}</h4>
                    <p className="text-gray-600 text-sm">{'Art and cultural exhibitions'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">{'Event Information'}</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CalendarIcon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{'Dates'}</p>
                      <p className="text-gray-600">{'August 8 - 31, 2025'}</p>
                      <p className="text-gray-500 text-sm">{'24 days of activities'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{'Location'}</p>
                      <p className="text-gray-600">{'Recinto Ferial de la FENAPO'}</p>
                      <p className="text-gray-600">{'Av. Fco. Martinez de la Vega No. 255'}</p>
                      <p className="text-gray-600">{'San Luis Potosí, Mexico'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <TicketIcon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{'Access'}</p>
                      <div className="space-y-2 mt-2">
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium">{'General Access'}</p>
                          <p className="text-gray-600 text-sm">{'Access to fair grounds'}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium">{'Teatro del Pueblo'}</p>
                          <p className="text-gray-600 text-sm">{'Separate tickets required'}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium">{'Palenque Shows'}</p>
                          <p className="text-gray-600 text-sm">{'Check official schedules'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href="https://fenapo.mx/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-blue-800 hover:bg-blue-900 text-white font-medium px-4 py-3 rounded-lg text-center transition-colors"
                  >
                    {'Visit Official Website'}
                  </a>
                  <a
                    href="https://fenapo.mx/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-3 rounded-lg text-center transition-colors"
                  >
                    {'View Program'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-serif">{'FENAPO 2025 Highlights'}</h2>
            <p className="text-lg text-gray-600">
              {'Don\'t miss the most outstanding events of this edition of the Feria Nacional Potosina.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l6-6v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm6-5c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{'Star-Studded Lineup'}</h3>
              <p className="text-gray-600">
                {'The Teatro del Pueblo will feature renowned national and international artists throughout the fair.'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{'Regional Gastronomy'}</h3>
              <p className="text-gray-600">
                {'Enjoy the best of Potosino cuisine and discover flavors from across Mexico and the world.'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h4a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4a2 2 0 012-2h2l2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{'Cultural Events'}</h3>
              <p className="text-gray-600">
                {'Explore art exhibitions, craft demonstrations and cultural activities that celebrate our heritage.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visitor Information Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-serif">{'Visitor Information'}</h2>
            <p className="text-lg text-gray-600">
              {'Everything you need to know to make the most of your visit to FENAPO 2025.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Getting There Section */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-900">{'Getting There'}</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-primary">{'Public Transportation'}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {'The fairgrounds are accessible by city buses and taxis. Special shuttle services operate during peak hours.'}
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-primary">{'By Car'}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {'Ample parking is available. Follow signs to "FENAPO" from major avenues. Expect increased traffic during popular events.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">{'For Out-of-Town Visitors'}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {'The fairgrounds are about 15 minutes from downtown San Luis Potosí and 20 minutes from the airport.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Tips for Visitors */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-900">{'Tips for Visitors'}</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-primary">{'Best Times to Visit'}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {'Weekday afternoons are less crowded. Weekend evenings offer the best entertainment but expect larger crowds.'}
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-primary">{'What to Bring'}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {'Comfortable walking shoes, sun protection, and cash for food and souvenirs. Some vendors may not accept cards.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">{'Family Visits'}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {'Special family areas and activities are available. Check the daily schedule for children\'s programming.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-800 to-purple-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 font-serif">Don't Miss FENAPO 2025!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {'Experience the most traditional fair in Mexico. 24 days of culture, entertainment, gastronomy and fun for the whole family.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://fenapo.mx/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-white/90 text-blue-900 font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-colors"
            >
              {'Visit Official Website'}
              <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            </a>
            <Link
              href="/events"
              className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-colors"
            >
              {'View Other Events'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}