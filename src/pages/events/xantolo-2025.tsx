import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, TicketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { GetStaticProps } from 'next';
import SEO from '@/components/common/SEO';

export const getStaticProps: GetStaticProps = async ({ }) => {
  return {
    props: {
    },
  };
};

export default function Xantolo2025() {

  return (
    <>
      <SEO
        title="Xantolo 2025 - Day of the Dead in San Luis Potosí | Huasteca Tradition"
        description="Xantolo 2025 - The most authentic Day of the Dead celebration in Huasteca Potosina. October 31 to November 2. Ancestral rituals, traditional dances, offerings, and typical gastronomy."
        keywords="Xantolo 2025, Day of the Dead San Luis Potosí, Huasteca Potosina traditions, Xantolo festival, Dia de Muertos Mexico"
        ogImage="/images/events/xantolo-image-1.jpg"
      />

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 to-purple-900/90">
          <Image
            src="/images/events/xantolo-image-1.jpg"
            alt={'Xantolo 2025 - Danza de los Huehues'}
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
                <span className="font-medium">{'October 31 - November 2, 2025'}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">
              {'Xantolo 2025'}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-orange-200">
              {'Day of the Dead in Huasteca Potosina'}
            </h2>
            <p className="text-xl mb-8 max-w-2xl">
              {'Experience the most authentic and ancestral Day of the Dead celebration in Mexico. A unique experience where pre-Hispanic traditions come to life through rituals, dances, music, and offerings.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://slp.gob.mx/turismo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-white/90 text-orange-900 font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                {'Official Information'}
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
              </a>
              <Link
                href="/cultural/festivals"
                className="bg-orange-700 hover:bg-orange-800 text-white font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                {'Discover More Traditions'}
                <TicketIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6 font-serif">{'About Xantolo'}</h2>
              <div className="prose prose-lg max-w-none mb-8">
                <p>
                  {'Xantolo is the most important Day of the Dead celebration in the Huasteca region of San Luis Potosí. This millenary festivity, whose name comes from the Latin "Sanctorum" (All Saints), represents a unique fusion between pre-Hispanic and Catholic traditions, creating one of the richest and most authentic cultural expressions in Mexico.'}
                </p>
                <p>
                  {'During these sacred days, the communities of Huasteca Potosina open their doors to share their ancestral traditions. The living and the dead reunite in a celebration full of color, music, dance, and deep spiritual meaning. It is a moment when the veil between the world of the living and the dead becomes thinner, allowing communion with departed loved ones.'}
                </p>

                <h3>{'What you will find at Xantolo:'}</h3>
                <ul>
                  <li>{'Traditional altars and offerings with marigold flowers'}</li>
                  <li>{'Dance of the Huehues (elders) with traditional masks'}</li>
                  <li>{'Comparsas and night processions with traditional music'}</li>
                  <li>{'Ancestral rituals in cemeteries'}</li>
                  <li>{'Typical gastronomy: tamales, zacahuil, pemoles, and pan de muerto'}</li>
                  <li>{'Monumental floral arches at home entrances'}</li>
                  <li>{'Traditional vigils and prayers'}</li>
                  <li>{'Artisan markets with local products'}</li>
                  <li>{'Live huapango and son huasteco music'}</li>
                  <li>{'Mask and traditional crafts workshops'}</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-3 text-orange-900">{'Main Activities'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-orange-800">{'October 31'}</h4>
                    <p className="text-gray-600 text-sm">{'Arrival of children souls (little angels)'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-orange-800">{'November 1'}</h4>
                    <p className="text-gray-600 text-sm">{'All Saints Day - Adult souls'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-orange-800">{'November 2'}</h4>
                    <p className="text-gray-600 text-sm">{'All Souls Day - Farewell'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-orange-800">{'Dance of Huehues'}</h4>
                    <p className="text-gray-600 text-sm">{'During all three days in public squares'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-orange-800">{'Vigils'}</h4>
                    <p className="text-gray-600 text-sm">{'Nights in cemeteries with candles and offerings'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-orange-800">{'Processions'}</h4>
                    <p className="text-gray-600 text-sm">{'Night walks with traditional music'}</p>
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
                      <p className="text-gray-600">{'October 31 - November 2, 2025'}</p>
                      <p className="text-gray-500 text-sm">{'3 days of continuous celebration'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{'Main Municipalities'}</p>
                      <p className="text-gray-600">{'Tancanhuitz'}</p>
                      <p className="text-gray-600">{'Aquismón'}</p>
                      <p className="text-gray-600">{'Xilitla'}</p>
                      <p className="text-gray-600">{'Tamazunchale'}</p>
                      <p className="text-gray-600">{'Ciudad Valles'}</p>
                      <p className="text-gray-600">{'Tanquián de Escobedo'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <TicketIcon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{'Access'}</p>
                      <div className="space-y-2 mt-2">
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium">{'Public Events'}</p>
                          <p className="text-gray-600 text-sm">{'Free in squares and streets'}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium">{'Guided Tours'}</p>
                          <p className="text-gray-600 text-sm">{'Available with local operators'}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium">{'Workshops'}</p>
                          <p className="text-gray-600 text-sm">{'Prior registration required'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href="https://slp.gob.mx/turismo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-orange-800 hover:bg-orange-900 text-white font-medium px-4 py-3 rounded-lg text-center transition-colors"
                  >
                    {'More Tourist Information'}
                  </a>
                  <Link
                    href="/cultural-tours"
                    className="block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-3 rounded-lg text-center transition-colors"
                  >
                    {'Cultural Tours'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-serif">{'Xantolo Gallery'}</h2>
            <p className="text-lg text-gray-600">
              {'Captured moments from this ancestral celebration'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src="/images/events/xantolo-image-1.jpg"
                alt="Grupo de Huehues con máscaras tradicionales"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium">Dance of the Huehues</p>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src="/images/events/xantolo-image-2.jpg"
                alt="Máscaras coloridas de Xantolo"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium">Traditional Masks</p>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src="/images/events/xantolo-image-3.jpg"
                alt="Procesión nocturna de Xantolo"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium">Night Procession</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-serif">{'Unmissable Xantolo Experiences'}</h2>
            <p className="text-lg text-gray-600">
              {'Immerse yourself in the most authentic Day of the Dead traditions in Huasteca Potosina.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l6-6v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm6-5c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{'Dance of the Huehues'}</h3>
              <p className="text-gray-600">
                {'Witness traditional dances with elaborate masks representing ancestors and spirits.'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{'Traditional Gastronomy'}</h3>
              <p className="text-gray-600">
                {'Taste the giant zacahuil, tamales, pemoles, atole, and traditional Huastecan pan de muerto.'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h4a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4a2 2 0 012-2h2l2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{'Offerings and Altars'}</h3>
              <p className="text-gray-600">
                {'Admire the impressive altars of the dead decorated with marigold flowers and monumental arches.'}
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
              {'Everything you need to know to experience Xantolo in Huasteca to the fullest.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Getting There Section */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-900">{'Getting There'}</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-primary">{'From San Luis Potosí Capital'}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {'4-5 hours by road. Take Highway 70 towards Ciudad Valles, then connect to the different municipalities.'}
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-primary">{'Public Transportation'}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {'Direct buses depart from Terminal Terrestre Potosina to Ciudad Valles, Xilitla, and Tamazunchale.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">{'Organized Tours'}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {'Several agencies offer special Xantolo tours with transportation, guide, and cultural experiences included.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Tips for Visitors */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-900">{'Tips for Visitors'}</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-primary">{'Respect for Traditions'}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {'Xantolo is a sacred celebration. Ask permission before photographing private offerings or rituals.'}
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-primary">{'What to Bring'}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {'Comfortable clothes, insect repellent, cash (many places do not accept cards), and camera.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">{'Accommodation'}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {'Book in advance. Hotels in Huasteca fill up quickly during Xantolo.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-800 to-purple-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 font-serif">Experience Xantolo 2025!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {'Discover the most authentic Day of the Dead celebration in Mexico. A spiritual and cultural experience that connects the world of the living with the world of the dead.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/cultural/festivals"
              className="bg-white hover:bg-white/90 text-orange-900 font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-colors"
            >
              {'Discover More Traditions'}
              <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            </Link>
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