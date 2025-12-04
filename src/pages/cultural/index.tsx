import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Event } from '@/types';
import { supabase } from '@/lib/supabase';
import { CalendarIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import EventList from '@/components/EventList';
import SEO from '@/components/common/SEO';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface CulturalPageProps {
  events: Event[];
}

export default function CulturalPage({ events }: CulturalPageProps) {

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <>
      <SEO
        title="Cultural Heritage of San Luis Potosí"
        description="Discover the rich cultural heritage, traditions, arts, and customs of San Luis Potosí - a comprehensive guide for expatriates and visitors."
        keywords="San Luis Potosí culture, traditions, museums, arts, cultural events, Mexican heritage, festivals, historical sites, colonial architecture, local customs"
        ogImage="/images/cultural/san-luis-potosi-cathedral.jpg"
        ogType="website"
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] bg-gradient-to-r from-blue-900 to-blue-700">
          <div className="absolute inset-0">
            <Image
              src="/images/cultural/san-luis-potosi-cathedral.jpg"
              alt="San Luis Potosí Cathedral"
              fill
              className="object-cover mix-blend-overlay opacity-60"
              unoptimized
              loading="eager"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/cultural/cultural-default.jpg';
                target.onerror = null;
              }}
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl text-white">
              <h1 className="text-5xl font-bold mb-6">Cultural Heritage</h1>
              <p className="text-xl">
                Explore the rich traditions, arts, and customs that make San Luis Potosí a cultural treasure of Mexico.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          {/* Introduction Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Cultural Richness</h2>
              <p className="text-lg text-gray-700 mb-8">
                San Luis Potosí is a treasure trove of Mexican cultural heritage, blending indigenous traditions with Spanish colonial influences. From its stunning baroque architecture to traditional festivities and culinary delights, the region offers a fascinating glimpse into the rich tapestry of Mexican culture.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Historical Heritage</h3>
                  <p className="text-gray-600">
                    Explore colonial architecture, UNESCO World Heritage sites, and museums showcasing the region's rich history.
                  </p>
                  <Link
                    href="/cultural/history"
                    className="inline-flex items-center text-primary mt-4 font-medium hover:underline"
                  >
                    Learn more <ArrowRightIcon className="ml-1 w-4 h-4" />
                  </Link>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Festivals & Traditions</h3>
                  <p className="text-gray-600">
                    Experience vibrant local festivities, from traditional religious celebrations to contemporary cultural events.
                  </p>
                  <Link
                    href="/cultural/festivals"
                    className="inline-flex items-center text-primary mt-4 font-medium hover:underline"
                  >
                    Learn more <ArrowRightIcon className="ml-1 w-4 h-4" />
                  </Link>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Music & Dance</h3>
                  <p className="text-gray-600">
                    Experience the rich musical traditions and folk dances that define San Luis Potosí's cultural heritage.
                  </p>
                  <Link
                    href="/cultural/music-dance"
                    className="inline-flex items-center text-primary mt-4 font-medium hover:underline"
                  >
                    Learn more <ArrowRightIcon className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Cultural Attractions */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Must-Visit Cultural Attractions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Explore these emblematic sites to deepen your understanding of San Luis Potosí's cultural heritage
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src="/images/cultural/teatro-de-la-paz.jpg"
                    alt="Teatro de la Paz"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/cultural/cultural-default.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Teatro de la Paz</h3>
                  <p className="text-gray-600 mb-4">
                    This majestic neoclassical theater, built in 1894, is one of the most beautiful in Mexico. It continues to host world-class performances and cultural events.
                  </p>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    <span>Centro Histórico, San Luis Potosí</span>
                  </div>
                  <Link
                    href="/places/e5b31195-79a2-439b-aff5-971aa415a715"
                    className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src="/images/cultural/museo-federico-silva.jpg"
                    alt="Museo Federico Silva"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/cultural/cultural-default.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Museo Federico Silva</h3>
                  <p className="text-gray-600 mb-4">
                    Housed in a former prison, this contemporary art museum showcases the monumental sculptures and artistic works of renowned Mexican sculptor Federico Silva.
                  </p>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    <span>Álvaro Obregón 80, Centro Histórico</span>
                  </div>
                  <Link
                    href="/places/9ee476c9-5902-4382-97e2-9fd63cafa118"
                    className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/cultural-attractions"
                className="inline-block px-6 py-3 bg-white border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                View All Cultural Attractions
              </Link>
            </div>
          </section>

          {/* Cultural Events Section - Only show if there are events */}
          {events.length > 0 && (
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Cultural Events</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Don't miss these cultural events happening in San Luis Potosí
                </p>
              </div>
              <EventList events={events} />
              <div className="text-center mt-8">
                <Link
                  href="/events"
                  className="inline-block px-6 py-3 bg-white border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  View All Events
                </Link>
              </div>
            </section>
          )}

          {/* Local Legends & Folklore Section */}
          <section className="mb-16 bg-gradient-to-br from-purple-50 to-indigo-50 -mx-4 px-4 py-16 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">Local Legends & Folklore</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Discover the mystical tales, ghost stories, and legends that have shaped San Luis Potosí's cultural identity for centuries
                </p>
              </div>

              {/* Featured Legends Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* La Llorona de SLP */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-56">
                    <Image
                      src="/images/cultural/la-llorona.jpg"
                      alt="La Llorona legend"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/cultural/cultural-default.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="inline-block px-3 py-1 bg-purple-500/90 text-white text-xs font-semibold rounded-full mb-2">Ghost Story</div>
                      <h3 className="font-serif text-2xl font-bold text-white">La Llorona de los Puentes</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      The weeping woman is said to haunt the old bridges of San Luis Potosí, especially near the Río Santiago. Locals report hearing her mournful cries on foggy nights, searching eternally for her lost children. The legend dates back to colonial times and remains one of the city's most enduring ghost stories.
                    </p>
                    <div className="flex items-center text-sm text-purple-600">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      <span className="font-medium">Puente de San Francisco area</span>
                    </div>
                  </div>
                </div>

                {/* El Tesoro del Cerro de San Pedro */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-56">
                    <Image
                      src="/images/cultural/cerro-san-pedro.jpg"
                      alt="Cerro de San Pedro treasure legend"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/cultural/cultural-default.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="inline-block px-3 py-1 bg-amber-500/90 text-white text-xs font-semibold rounded-full mb-2">Historical Legend</div>
                      <h3 className="font-serif text-2xl font-bold text-white">El Tesoro del Cerro de San Pedro</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      During the mining boom, miners discovered vast silver and gold deposits in Cerro de San Pedro. Legend tells of a hidden treasure chamber sealed by a collapse in the 1700s, containing riches beyond imagination. Many have searched, but the treasure remains undiscovered, guarded by the mountain itself.
                    </p>
                    <div className="flex items-center text-sm text-amber-600">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      <span className="font-medium">Cerro de San Pedro ghost town</span>
                    </div>
                  </div>
                </div>

                {/* El Fantasma del Teatro de la Paz */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-56">
                    <Image
                      src="/images/cultural/teatro-de-la-paz.jpg"
                      alt="Teatro de la Paz ghost"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/cultural/cultural-default.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="inline-block px-3 py-1 bg-purple-500/90 text-white text-xs font-semibold rounded-full mb-2">Urban Legend</div>
                      <h3 className="font-serif text-2xl font-bold text-white">El Fantasma del Teatro</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Theater workers and performers report unexplained phenomena at Teatro de la Paz: phantom footsteps in empty corridors, a mysterious woman in Victorian dress appearing in Box 13, and the sound of applause when the theater is empty. Some say it's the spirit of Ángela Peralta, the famous soprano, still drawn to the stage.
                    </p>
                    <div className="flex items-center text-sm text-purple-600">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      <span className="font-medium">Teatro de la Paz, Centro Histórico</span>
                    </div>
                  </div>
                </div>

                {/* La Cueva de los Espíritus */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-56">
                    <Image
                      src="/images/cultural/cave-legends.jpg"
                      alt="Cave of Spirits"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/cultural/cultural-default.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="inline-block px-3 py-1 bg-emerald-500/90 text-white text-xs font-semibold rounded-full mb-2">Mystical Place</div>
                      <h3 className="font-serif text-2xl font-bold text-white">La Cueva de los Espíritus</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Near the Huasteca Potosina region, indigenous communities speak of sacred caves where ancient spirits dwell. These caves were used for pre-Hispanic rituals and are said to be portals between worlds. Locals warn against entering without proper respect and offerings, as the spirits guard their territory fiercely.
                    </p>
                    <div className="flex items-center text-sm text-emerald-600">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      <span className="font-medium">Huasteca Potosina region</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Storytelling Tradition */}
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Living Tradition of Storytelling</h3>
                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                      In Mexican culture, storytelling is more than entertainment—it's a sacred act of preserving history, teaching values, and connecting generations. These legends serve as cautionary tales, historical records, and spiritual teachings passed down through centuries.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      The oral tradition remains strong in San Luis Potosí, with grandparents sharing tales around the dinner table, and communities gathering during festivals to recount the stories of their ancestors. Each telling adds new layers, keeping the legends alive and relevant to contemporary life.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="font-semibold text-purple-900 mb-1">Cultural Memory</div>
                        <p className="text-sm text-purple-700">Legends preserve historical events and cultural values across generations</p>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-4">
                        <div className="font-semibold text-indigo-900 mb-1">Moral Lessons</div>
                        <p className="text-sm text-indigo-700">Stories teach respect for nature, family, and community bonds</p>
                      </div>
                      <div className="bg-violet-50 rounded-lg p-4">
                        <div className="font-semibold text-violet-900 mb-1">Identity & Belonging</div>
                        <p className="text-sm text-violet-700">Shared stories create connection and sense of place</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center mt-10">
                <p className="text-gray-600 mb-4">Experience these legends through local tours and storytelling events</p>
                <Link
                  href="/events?category=cultural-tours"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Explore Cultural Tours
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>

          {/* Cultural Guides Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cultural Guides for Newcomers</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Essential resources to help you understand and navigate local customs and traditions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="relative h-48">
                  <Image
                    src="/images/cultural/customs-etiquette.jpg"
                    alt="Local Customs & Etiquette"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/cultural/cultural-default.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Local Customs & Etiquette</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Understanding local customs, social norms, and etiquette will help you integrate smoothly and avoid cultural misunderstandings.
                  </p>
                  <Link href="/cultural/customs-etiquette" className="text-primary font-medium text-sm hover:underline">
                    Read Guide →
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="relative h-48">
                  <Image
                    src="/images/cultural/culinary-traditions.jpg"
                    alt="Culinary Traditions"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/cultural/cultural-default.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Culinary Traditions</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Discover the traditional dishes, ingredients, and culinary practices of San Luis Potosí's rich gastronomic heritage.
                  </p>
                  <Link href="/cultural/culinary-traditions" className="text-primary font-medium text-sm hover:underline">
                    Read Guide →
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="relative h-48">
                  <Image
                    src="/images/cultural/religious-practices.jpg"
                    alt="Religious Practices"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/cultural/cultural-default.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">Religious Practices</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">
                    Learn about the religious traditions, celebrations, and the role of faith in the cultural fabric of San Luis Potosí.
                  </p>
                  <Link href="/cultural/religious-practices" className="text-primary font-medium text-sm hover:underline">
                    Read Guide →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    // Fetch events marked for cultural calendar
    const { data: events, error } = await supabase
      .from('events')
      .select("*")
      .eq('add_to_cultural_calendar', true)
      .gte('end_date', new Date().toISOString())
      .order('start_date', { ascending: true })
      .limit(6);

    if (error) {
      console.error('Supabase error:', error);
      // Return empty events array instead of throwing
      return {
        props: {
          ...(await serverSideTranslations(locale ?? 'es', ['common'])),
          events: [],
        },
      };
    }

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        events: events || [],
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    // Return empty events array on any error
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        events: [],
      },
    };
  }
};