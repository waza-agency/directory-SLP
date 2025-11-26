import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, TicketIcon, MusicalNoteIcon, FilmIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import SEO from '@/components/common/SEO';

export const getStaticProps: GetStaticProps = async ({ }) => {
  return {
    props: {
    },
  };
};

export default function SanLuisEnPrimavera() {

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <SEO
        title="Festival San Luis en Primavera 2025 | San Luis Way"
        description="Discover the Festival Internacional San Luis en Primavera 2025, one of Mexico's most anticipated cultural events taking place from April 12-19, 2025."
        keywords="Festival San Luis en Primavera, cultural festival San Luis Potosí, events SLP 2025, concerts San Luis Potosí"
        ogImage="/images/festival-primavera.jpg"
      />

      <main className="pt-20 pb-16">
        {/* Hero Banner */}
        <div className="relative h-[50vh] min-h-[400px] mb-8">
          <Image
            src="/images/festival-primavera.jpg"
            alt="Festival San Luis en Primavera 2025"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 font-serif">Festival San Luis en Primavera 2025</h1>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <CalendarIcon className="w-5 h-5" />
                  <span>April 12-19, 2025</span>
                </div>
                <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <MapPinIcon className="w-5 h-5" />
                  <span>San Luis Potosí, Mexico</span>
                </div>
              </div>
              <p className="text-lg max-w-3xl">
                One of Mexico's most anticipated cultural events celebrating art, music, culture, and diversity
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Overview Section */}
          <section className="mb-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 font-serif">Overview</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  The Festival Internacional San Luis en Primavera 2025 is one of the most anticipated cultural events in Mexico,
                  taking place from April 12 to April 19, 2025, in San Luis Potosí, a city renowned for its colonial history and vibrant traditions.
                  This festival aims to promote local economy, tourism, and cultural diversity through an inclusive program of artistic, cultural,
                  and sporting activities.
                </p>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 my-8">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Key Highlights</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Expecting over 300,000 visitors with an economic impact of 500 million pesos</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>All events are free and accessible for everyone, including those with disabilities</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>South Korea is the guest country for 2025, showcasing Korean culture and art</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>25+ venues across San Luis Potosí hosting various events</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Program Details */}
          <section className="mb-16 bg-gray-50 py-12 px-4 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 font-serif">Program Details</h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <MusicalNoteIcon className="w-7 h-7 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Concerts</h3>
                  <p className="text-gray-600 mb-4">
                    Performances by renowned artists including Eugenia León, Fernando de la Mora, Ramón Vargas, Natalia Jiménez,
                    Jorge Drexler, Ana Bárbara, and more.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                    <FilmIcon className="w-7 h-7 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Dance & Theater</h3>
                  <p className="text-gray-600 mb-4">
                    Gala Ballet featuring Elisa Carrillo and Amigos at Teatro de la Paz and the play Leonardo starring Rodrigo Murray.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <UserGroupIcon className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Traditional Events</h3>
                  <p className="text-gray-600 mb-4">
                    The iconic Procesión del Silencio, one of the largest religious processions globally, and the traditional Callejón del Buche.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Complete Schedule */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 font-serif">Complete Event Schedule</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Concerts at Plaza de los Fundadores</h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4 py-2">
                      <p className="font-semibold">April 12 (Inauguration): Eugenia León, Fernando de la Mora, and Ramón Vargas</p>
                      <p className="text-gray-600">Evening</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4 py-2">
                      <p className="font-semibold">April 13: Natalia Jiménez</p>
                      <p className="text-gray-600">Evening</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4 py-2">
                      <p className="font-semibold">April 14: Jorge Drexler</p>
                      <p className="text-gray-600">Evening</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4 py-2">
                      <p className="font-semibold">April 15: Ana Bárbara</p>
                      <p className="text-gray-600">Evening</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4 py-2">
                      <p className="font-semibold">April 16: Piso 21</p>
                      <p className="text-gray-600">Evening</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4 py-2">
                      <p className="font-semibold">April 17: 90's Pop Tour featuring JNS, Kabah, Magneto, and Caló</p>
                      <p className="text-gray-600">Evening</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4 py-2">
                      <p className="font-semibold">April 19 (Closing Ceremony): Cómplices Tour 2025 with Daniel Boaventura & Filippa Giordano</p>
                      <p className="text-gray-600">Evening</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Concerts at Plaza de Aranzazú</h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-400 pl-4 py-2">
                      <p className="font-semibold">April 13: Los Caligaris</p>
                      <p className="text-gray-600">Evening</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4 py-2">
                      <p className="font-semibold">April 14: The Mexican Sound Machine</p>
                      <p className="text-gray-600">Evening</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4 py-2">
                      <p className="font-semibold">April 15: Elsa y Elmar</p>
                      <p className="text-gray-600">Evening</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4 py-2">
                      <p className="font-semibold">April 16: Little Jesus</p>
                      <p className="text-gray-600">Evening</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4 py-2">
                      <p className="font-semibold">April 17: Haggard</p>
                      <p className="text-gray-600">Evening</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Cultural Events & Sports</h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-amber-400 pl-4 py-2">
                      <p className="font-semibold">April 11: Callejón del Buche</p>
                      <p className="text-gray-600">Evening</p>
                    </div>
                    <div className="border-l-4 border-amber-400 pl-4 py-2">
                      <p className="font-semibold">April 14: Gala de Ballet with Elisa Carrillo and Amigos at Teatro de la Paz</p>
                      <p className="text-gray-600">6 PM</p>
                    </div>
                    <div className="border-l-4 border-amber-400 pl-4 py-2">
                      <p className="font-semibold">April 14: Theater play Leonardo starring Rodrigo Murray at Teatro de la Paz</p>
                      <p className="text-gray-600">Evening</p>
                    </div>
                    <div className="border-l-4 border-amber-400 pl-4 py-2">
                      <p className="font-semibold">Procesión del Silencio</p>
                      <p className="text-gray-600">During Semana Santa, Evening</p>
                    </div>
                    <div className="border-l-4 border-green-400 pl-4 py-2">
                      <p className="font-semibold">San Luis Open Challenger (Tennis Tournament)</p>
                      <p className="text-gray-600">Multiple dates during the festival</p>
                    </div>
                    <div className="border-l-4 border-green-400 pl-4 py-2">
                      <p className="font-semibold">Raúl Alcalá Challenge (Cycling Competition)</p>
                      <p className="text-gray-600">Dates to be announced</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* International Participation */}
          <section className="mb-16 bg-gray-50 py-12 px-4 rounded-2xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 font-serif">International Participation</h2>
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/images/south-korea-flag.png"
                    alt="South Korea Flag"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">South Korea: Guest Country 2025</h3>
                <p className="text-gray-600">
                  South Korea will showcase its rich culture and expertise in urban learning through exhibitions and
                  performances by Korean artists throughout the festival.
                </p>
              </div>
            </div>
          </section>

          {/* Significance Section */}
          <section className="mb-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 font-serif">Significance</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  The Festival Internacional San Luis en Primavera is not only an entertainment hub but also a cultural beacon
                  that fosters appreciation for diversity. It strengthens community ties while attracting global attention
                  to San Luis Potosí's rich heritage. By featuring South Korea as a guest nation and emphasizing inclusivity,
                  the festival exemplifies modern cultural diplomacy.
                </p>
                <p>
                  With its blend of art, music, sports, and international collaboration, the Festival Internacional San Luis
                  en Primavera 2025 promises an enriching experience for locals and visitors alike, making it a landmark event
                  in Mexico's cultural calendar.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Join the Celebration!</h2>
                <p className="text-gray-600 mb-6">
                  Don't miss this extraordinary cultural festival. All events are free and accessible to everyone!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="#" className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-full transition-colors">
                    Add to Calendar
                  </a>
                  <Link href="/contact" className="bg-white text-primary border border-primary font-medium px-6 py-3 rounded-full hover:bg-gray-50 transition-colors">
                    Contact for More Info
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