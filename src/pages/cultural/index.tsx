import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Event } from '@/types';
import { supabase } from '@/lib/supabase';
import Footer from '@/components/Footer';
import { CalendarIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import EventList from '@/components/EventList';
import SEO from '@/components/common/SEO';

interface CulturalPageProps {
  events: Event[];
}

export default function CulturalPage({ events }: CulturalPageProps) {
  const { t } = useTranslation('common');

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
              priority
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Language & Arts</h3>
                  <p className="text-gray-600">
                    Discover local artistic expressions, language resources, and opportunities to engage with the local culture.
                  </p>
                  <Link 
                    href="/cultural/language" 
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
                    href="/places/teatro-de-la-paz" 
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
                    href="/places/museo-federico-silva" 
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

          {/* Cultural Events Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Cultural Events</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Don't miss these cultural events happening in San Luis Potosí
              </p>
            </div>
            {events.length > 0 ? (
              <EventList events={events} />
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <div className="max-w-md mx-auto">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Found</h3>
                  <p className="text-gray-600 mb-6">
                    There are no upcoming cultural events at the moment. Check back later for new events!
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-dark transition-colors"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            )}
            <div className="text-center mt-8">
              <Link
                href="/events"
                className="inline-block px-6 py-3 bg-white border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                View All Events
              </Link>
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

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  try {
    // Fetch cultural events from Supabase
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .eq('category', 'cultural')
      .gte('end_date', new Date().toISOString())
      .order('start_date', { ascending: true })
      .limit(6);

    if (error) throw error;

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        events: events || [],
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching cultural events:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        events: [],
      },
      revalidate: 3600,
    };
  }
}; 