import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const LaGranViaBlog: NextPage = () => {
  const { t } = useTranslation('common');

  const specialties = [
    {
      category: 'Spanish Cuisine',
      description: 'Authentic Spanish recipes that showcase the best of Mediterranean flavors',
      highlights: [
        'Traditional paellas',
        'Regional Spanish specialties',
        'Mediterranean-inspired dishes'
      ]
    },
    {
      category: 'Local Fusion',
      description: 'Creative combinations of Spanish cuisine with San Luis Potosí flavors',
      highlights: [
        'Regional adaptations',
        'Local ingredient specialties',
        'Unique fusion dishes'
      ]
    },
    {
      category: 'Wine Selection',
      description: 'Carefully curated wine list to complement your dining experience',
      highlights: [
        'Spanish wines',
        'International varieties',
        'Perfect pairings'
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>La Gran Vía - Premier Spanish Restaurant in San Luis Potosí | Directory SLP</title>
        <meta name="description" content="Experience over 36 years of Spanish culinary tradition at La Gran Vía, one of Mexico's 100 must-visit restaurants. Discover authentic Spanish cuisine with a local twist in San Luis Potosí." />
        <meta property="og:title" content="La Gran Vía - Premier Spanish Restaurant in San Luis Potosí" />
        <meta property="og:description" content="Experience over 36 years of Spanish culinary tradition at La Gran Vía, one of Mexico's 100 must-visit restaurants. Discover authentic Spanish cuisine with a local twist in San Luis Potosí." />
        <meta property="og:image" content="https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/la-gran-via-restaurant.jpg" />
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
                src="https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/la-gran-via-restaurant.jpg"
                alt="La Gran Vía Restaurant - Traditional Spanish Cuisine in San Luis Potosí"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="text-gray-500">Restaurants</span>
                <span className="mx-2 text-gray-300">•</span>
                <time className="text-gray-500">March 20, 2024</time>
              </div>
              <h1 className="text-4xl font-bold mb-6">La Gran Vía: A Legacy of Spanish Cuisine in San Luis Potosí</h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-4">Discover La Gran Vía</h2>
                <ul className="list-disc pl-6">
                  <li><a href="#history">Our History</a></li>
                  <li><a href="#cuisine">Culinary Excellence</a></li>
                  <li><a href="#specialties">Our Specialties</a></li>
                  <li><a href="#recognition">Awards & Recognition</a></li>
                  <li><a href="#visit">Visit Us</a></li>
                </ul>
              </div>

              <section id="history">
                <h2>Our History</h2>
                <p>
                  Founded in 1979, La Gran Vía has been a cornerstone of Spanish cuisine in San Luis Potosí for over 36 years.
                  Our journey began with a passion for authentic Spanish gastronomy and has evolved into a culinary institution
                  that perfectly balances tradition with innovation.
                </p>
                <p>
                  Through decades of dedication to culinary excellence, we have earned our place in the hearts and palates
                  of our guests, becoming one of the most respected Spanish restaurants in the region.
                </p>
              </section>

              <section id="cuisine">
                <h2>Culinary Excellence</h2>
                <p>
                  At La Gran Vía, we maintain an unwavering commitment to quality and authenticity. Our kitchen combines
                  original Spanish recipes with carefully selected local ingredients, creating a unique fusion of Mediterranean
                  flavors and the rich culinary heritage of San Luis Potosí's highlands.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg my-6">
                  <h3 className="font-semibold mb-4">Our Commitment</h3>
                  <ul className="list-disc pl-6">
                    <li>Fresh, high-quality ingredients in every dish</li>
                    <li>Authentic Spanish recipes with local influences</li>
                    <li>Carefully curated wine selection</li>
                    <li>Exceptional dining experience</li>
                  </ul>
                </div>
              </section>

              <section id="specialties">
                <h2>Our Specialties</h2>
                {specialties.map((specialty) => (
                  <div key={specialty.category} className="mb-8 border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold mb-2">{specialty.category}</h3>
                    <p className="mb-4">{specialty.description}</p>
                    <ul className="list-disc pl-6">
                      {specialty.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              <section id="recognition">
                <h2>Awards & Recognition</h2>
                <div className="bg-blue-50 p-6 rounded-lg my-6">
                  <h3 className="font-semibold mb-4">100 Must-Visit Places in Mexico</h3>
                  <p>
                    In 2017, La Gran Vía received the prestigious recognition of being named one of the 100 must-visit
                    places in Mexico in the gastronomy category, a testament to our commitment to culinary excellence
                    and exceptional dining experiences.
                  </p>
                </div>
              </section>

              <section id="visit" className="bg-gray-50 p-6 rounded-lg mt-8">
                <h2>Visit Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Location & Contact</h3>
                    <ul className="mt-4 space-y-2">
                      <li><strong>Address:</strong> Av. Venustiano Carranza #560, 78233 San Luis Potosí</li>
                      <li><strong>Phone:</strong> 444 812 2899</li>
                      <li><strong>Email:</strong> contacto@lagranviaslp.com</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Experience La Gran Vía</h3>
                    <p>
                      We invite you to experience the finest Spanish cuisine in San Luis Potosí. Each visit promises
                      a unique gastronomic journey that will delight your palate and create lasting memories.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link href="/places/la-gran-via" className="text-blue-600 hover:text-blue-800">
                    View Restaurant Details →
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

export default LaGranViaBlog;