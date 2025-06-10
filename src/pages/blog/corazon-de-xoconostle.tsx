import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CorazonDeXoconostleBlog: NextPage = () => {
  const { t } = useTranslation('common');

  const featuredDestinations = [
    {
      name: 'Real de Catorce',
      description: 'A magical town in the Sierra del Altiplano Potosino, famous for its cobblestone streets and rich mining history.',
      activities: ['4x4 Willy Tours', 'Cultural Walks', 'Historical Sites']
    },
    {
      name: 'Huasteca Potosina',
      description: 'A natural paradise with stunning waterfalls, rivers, and lush landscapes.',
      activities: ['Tamul Waterfall', 'Rappelling', 'River Activities']
    },
    {
      name: 'Sierra de San Miguelito',
      description: 'Beautiful mountain range perfect for hiking and outdoor adventures.',
      activities: ['Hiking', 'Rock Climbing', 'Mountain Biking']
    }
  ];

  const upcomingExperiences = [
    {
      date: 'February 15, 2025',
      name: 'Picacho de Bernalejo + Casa Fronda',
      description: 'Hiking adventure combined with wine tasting experience',
      type: 'Day Trip'
    },
    {
      date: 'March 7-9, 2025',
      name: 'Trek Nevado de Toluca to Valle de Bravo',
      description: '40km trek through stunning landscapes',
      type: 'Multi-day Adventure'
    },
    {
      date: 'March 21-23, 2025',
      name: 'Sótano del Cepillo Rappelling',
      description: 'Descend into a 160-meter deep natural pit',
      type: 'Technical Adventure'
    }
  ];

  return (
    <>
      <Head>
        <title>Corazón de Xoconostle: Adventure Travel Experts in San Luis Potosí | Directory SLP</title>
        <meta name="description" content="Discover San Luis Potosí's premier adventure travel company offering guided tours, outdoor experiences, and unforgettable journeys through Mexico's most stunning landscapes." />
        <meta property="og:title" content="Corazón de Xoconostle: Adventure Travel Experts in San Luis Potosí" />
        <meta property="og:description" content="Discover San Luis Potosí's premier adventure travel company offering guided tours, outdoor experiences, and unforgettable journeys through Mexico's most stunning landscapes." />
        <meta property="og:image" content="https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/corazon-de-xoconostle-adventure.jpg" />
        <meta property="og:type" content="article" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
            ← Back to Blog
          </Link>

          <article>
            <div className="relative w-full h-96 mb-8">
              <Image
                src="https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/corazon-de-xoconostle-adventure.jpg"
                alt="Corazón de Xoconostle Adventures - Hiking in San Luis Potosí"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="text-gray-500">Adventure Travel</span>
                <span className="mx-2 text-gray-300">•</span>
                <time className="text-gray-500">March 20, 2024</time>
              </div>
              <h1 className="text-4xl font-bold mb-6">Corazón de Xoconostle: Your Gateway to Adventure in San Luis Potosí</h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-4">In This Guide</h2>
                <ul className="list-disc pl-6">
                  <li><a href="#about">About Corazón de Xoconostle</a></li>
                  <li><a href="#destinations">Featured Destinations</a></li>
                  <li><a href="#experiences">Upcoming Experiences</a></li>
                  <li><a href="#expertise">Our Expertise</a></li>
                  <li><a href="#booking">How to Book</a></li>
                </ul>
              </div>

              <section id="about">
                <h2>About Corazón de Xoconostle</h2>
                <p>
                  Founded in 2014, Corazón de Xoconostle has grown from a local hospitality project into San Luis Potosí's
                  premier adventure travel company. With a decade of experience, our certified guides and travel experts
                  specialize in creating unforgettable outdoor experiences that combine adventure, culture, and natural beauty.
                </p>
                <p>
                  Our passion for nature, outdoor activities like climbing and hiking, and our deep connection to local
                  culture drives us to showcase the incredible richness of our region's natural and cultural heritage.
                </p>
              </section>

              <section id="destinations">
                <h2>Featured Destinations</h2>
                {featuredDestinations.map((destination) => (
                  <div key={destination.name} className="mb-8 bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">{destination.name}</h3>
                    <p className="mb-4">{destination.description}</p>
                    <div>
                      <h4 className="font-medium mb-2">Popular Activities:</h4>
                      <ul className="list-disc pl-6">
                        {destination.activities.map((activity) => (
                          <li key={activity}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </section>

              <section id="experiences">
                <h2>Upcoming Experiences for 2025</h2>
                <p className="mb-6">
                  Join us for carefully curated adventures that combine outdoor activities with unique cultural experiences.
                  Our 2025 calendar features exciting destinations both within Mexico and internationally.
                </p>
                {upcomingExperiences.map((experience) => (
                  <div key={experience.name} className="mb-6 border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold">{experience.name}</h3>
                    <p className="text-gray-600">{experience.date} | {experience.type}</p>
                    <p>{experience.description}</p>
                  </div>
                ))}
                <div className="bg-blue-50 p-6 rounded-lg my-6">
                  <h3 className="font-semibold mb-4">More Adventures Await</h3>
                  <p>
                    Our full 2025 calendar includes treks in Guatemala, Peru, and various locations throughout Mexico.
                    Visit our website or contact us to learn about all available experiences.
                  </p>
                </div>
              </section>

              <section id="expertise">
                <h2>Our Expertise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Certified Guides</h3>
                    <p>All our guides are certified under NOM-09-TUR-2002 standards</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Traveler Insurance</h3>
                    <p>Comprehensive coverage for peace of mind during your adventures</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Custom Experiences</h3>
                    <p>Tailored adventures designed to match your interests and skill level</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Transportation</h3>
                    <p>Comfortable and safe transportation throughout your journey</p>
                  </div>
                </div>
              </section>

              <section id="booking" className="bg-gray-50 p-6 rounded-lg mt-8">
                <h2>Start Your Adventure</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Contact Information</h3>
                    <p>
                      Visit us at our office in San Luis Potosí's historic center or reach out through our various channels:
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li><strong>Address:</strong> Independencia 1585, Barrio de San Miguelito</li>
                      <li><strong>WhatsApp:</strong> +52 1 444 657 1872</li>
                      <li><strong>Email:</strong> info@corazondexoconostle.com</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Book Your Experience</h3>
                    <p>
                      Ready to explore? Visit our website or contact us directly to book your next adventure. Whether you're
                      looking for a day trip or an extended journey, we're here to make your experience unforgettable.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link href="/places/corazon-de-xoconostle" className="text-blue-600 hover:text-blue-800">
                    View Full Details and Book →
                  </Link>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default CorazonDeXoconostleBlog;