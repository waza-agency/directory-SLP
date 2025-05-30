import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const SanLuisReyTranviaBlog: NextPage = () => {
  const { t } = useTranslation('common');

  const tourHighlights = [
    {
      title: 'Convenient Schedule',
      details: [
        'Daily tours from Monday to Sunday',
        'Operating hours: 10:00 AM to 7:30 PM',
        'Departures every 25 minutes',
        'Starting point: Jardín de San Juan de Dios'
      ]
    },
    {
      title: 'Accessible Pricing',
      details: [
        'Adults: $120 MXN',
        'Children and INAPAM: $100 MXN',
        'Tickets available directly at the trolleys',
        'No advance booking required'
      ]
    },
    {
      title: 'Tour Experience',
      details: [
        'Professional tour guides',
        'Historical and cultural commentary',
        'Comfortable trolley cars',
        'UNESCO World Heritage site exploration'
      ]
    }
  ];

  const certifications = [
    {
      name: 'Secretaría de Turismo',
      description: "Official recognition from Mexico's Tourism Ministry"
    },
    {
      name: 'Distintivo M',
      description: 'Quality and service excellence certification'
    },
    {
      name: 'Ciudad Patrimonio',
      description: 'UNESCO World Heritage Site approved service provider'
    }
  ];

  return (
    <>
      <Head>
        <title>San Luis Rey Tourist Trolley: The Best Way to Explore San Luis Potosí | Directory SLP</title>
        <meta name="description" content="Discover San Luis Potosí's historic center aboard San Luis Rey's traditional trolley tours. Daily departures, expert guides, and unforgettable experiences through our UNESCO World Heritage city." />
        <meta property="og:title" content="San Luis Rey Tourist Trolley: The Best Way to Explore San Luis Potosí" />
        <meta property="og:description" content="Discover San Luis Potosí's historic center aboard San Luis Rey's traditional trolley tours. Daily departures, expert guides, and unforgettable experiences through our UNESCO World Heritage city." />
        <meta property="og:image" content="/images/tours/tranvia-san-luis-rey.jpg" />
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
                src="/images/tours/tranvia-san-luis-rey.jpg"
                alt="San Luis Rey Tourist Trolley"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="text-gray-500">Tours</span>
                <span className="mx-2 text-gray-300">•</span>
                <time className="text-gray-500">March 20, 2024</time>
              </div>
              <h1 className="text-4xl font-bold mb-6">San Luis Rey: The Perfect Way to Discover Our Historic City</h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-4">Tour Information</h2>
                <ul className="list-disc pl-6">
                  <li><a href="#about">About San Luis Rey</a></li>
                  <li><a href="#experience">Tour Experience</a></li>
                  <li><a href="#schedule">Schedule & Pricing</a></li>
                  <li><a href="#route">Tour Route</a></li>
                  <li><a href="#booking">How to Book</a></li>
                </ul>
              </div>

              <section id="about">
                <h2>About San Luis Rey Tourist Trolley</h2>
                <p>
                  San Luis Rey offers the most comprehensive and enjoyable way to explore San Luis Potosí's historic center.
                  Our traditional trolley tours combine comfort, convenience, and expert guidance to help you discover the
                  rich history and cultural heritage of our UNESCO World Heritage city.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg my-6">
                  <h3 className="font-semibold mb-4">Why Choose San Luis Rey?</h3>
                  <ul className="list-disc pl-6">
                    <li>Expert guides with deep knowledge of local history and culture</li>
                    <li>Comfortable, traditional-style trolley cars</li>
                    <li>Convenient daily schedule with frequent departures</li>
                    <li>Comprehensive tour of the historic center's main attractions</li>
                  </ul>
                </div>
              </section>

              <section id="experience">
                <h2>Tour Experience</h2>
                {tourHighlights.map((highlight) => (
                  <div key={highlight.title} className="mb-8 border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold mb-2">{highlight.title}</h3>
                    <ul className="list-disc pl-6">
                      {highlight.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              <section id="schedule">
                <h2>Schedule & Pricing</h2>
                <div className="bg-blue-50 p-6 rounded-lg my-6">
                  <h3 className="font-semibold mb-4">Operating Hours</h3>
                  <p>
                    We operate daily from Monday to Sunday, with tours running from 10:00 AM to 7:30 PM.
                    Trolleys depart every 25 minutes from our main station at Jardín de San Juan de Dios,
                    ensuring you can start your tour at a time that suits your schedule.
                  </p>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Ticket Prices:</h4>
                    <ul className="list-disc pl-6">
                      <li>Adults: $120 MXN per person</li>
                      <li>Children and INAPAM cardholders: $100 MXN per person</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="route">
                <h2>Tour Route & Attractions</h2>
                <p>
                  Our carefully planned route takes you through the most significant landmarks and historic sites
                  of San Luis Potosí's UNESCO World Heritage center. The tour includes major plazas, historic
                  buildings, churches, and cultural institutions that tell the story of our city's rich heritage.
                </p>
              </section>

              <section id="certifications" className="my-8">
                <h2>Quality & Recognition</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {certifications.map((cert) => (
                    <div key={cert.name} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">{cert.name}</h3>
                      <p className="text-sm text-gray-600">{cert.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="booking" className="bg-gray-50 p-6 rounded-lg mt-8">
                <h2>Start Your Journey</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">How to Book</h3>
                    <p>
                      No advance booking is required! Simply visit our main station at Jardín de San Juan de Dios
                      and purchase your tickets directly at the trolley. Our friendly staff will be happy to assist
                      you and answer any questions.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Contact Information</h3>
                    <p>
                      For more information about our tours or special group rates, please contact us through
                      our website or visit us at Jardín de San Juan de Dios.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link href="/places/san-luis-rey-tranvia" className="text-blue-600 hover:text-blue-800">
                    View Full Tour Details →
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

export default SanLuisReyTranviaBlog;