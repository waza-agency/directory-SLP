import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ElRicardito: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>El Ricardito - Authentic Mexican Restaurant in San Luis Potosí | Directory SLP</title>
        <meta name="description" content="Discover El Ricardito, a hidden gem in San Luis Potosí offering authentic Mexican cuisine. Experience traditional flavors, warm hospitality, and a cozy atmosphere in the heart of the city." />
        <meta property="og:title" content="El Ricardito - Authentic Mexican Restaurant in San Luis Potosí" />
        <meta property="og:description" content="Discover El Ricardito, a hidden gem in San Luis Potosí offering authentic Mexican cuisine. Experience traditional flavors, warm hospitality, and a cozy atmosphere in the heart of the city." />
        <meta property="og:image" content="/images/restaurants-and-bars/traditional-restaurants.jpg" />
        <meta property="og:type" content="article" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <div className="relative w-full h-96 mb-8">
            <Image
              src="/images/restaurants-and-bars/traditional-restaurants.jpg"
              alt="El Ricardito Restaurant"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          <h1 className="text-4xl font-bold mb-6">El Ricardito: A Taste of Authentic Mexican Tradition</h1>

          <div className="prose prose-lg max-w-none">
            <p className="lead">
              Nestled in the vibrant streets of San Luis Potosí, El Ricardito stands as a testament to authentic Mexican culinary traditions, offering a warm and inviting atmosphere where every meal tells a story of heritage and flavor.
            </p>

            <h2>A Culinary Journey</h2>
            <p>
              El Ricardito brings together the best of traditional Mexican cuisine with a modern twist. Our menu features carefully crafted dishes that highlight local ingredients and time-honored recipes passed down through generations. From sizzling fajitas to handmade tortillas, every dish is prepared with attention to detail and a commitment to authenticity.
            </p>

            <h2>Our Specialties</h2>
            <ul>
              <li>Hand-crafted tortillas made fresh daily</li>
              <li>Traditional Mexican breakfast options</li>
              <li>Regional specialties from San Luis Potosí</li>
              <li>Fresh salsas and condiments</li>
              <li>House-made aguas frescas</li>
            </ul>

            <h2>The Experience</h2>
            <p>
              At El Ricardito, we believe dining is more than just a meal—it's an experience. Our welcoming staff, comfortable atmosphere, and dedication to quality create the perfect setting for family gatherings, casual lunches, or special celebrations. The restaurant's decor reflects the rich cultural heritage of Mexico, creating an immersive dining experience that complements our authentic cuisine.
            </p>

            <h2>Location & Hours</h2>
            <p>
              Located in the heart of San Luis Potosí, El Ricardito is easily accessible and offers both indoor and outdoor seating options. We're open daily from 7:00 AM to 10:00 PM, serving breakfast, lunch, and dinner.
            </p>

            <div className="mt-8 bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
              <p>
                Come experience the authentic flavors and warm hospitality at El Ricardito. Whether you're a local or visitor, our doors are always open to those seeking genuine Mexican cuisine in a welcoming atmosphere.
              </p>
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

export const getStaticProps = async ({ locale = 'en' }: { locale?: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default ElRicardito;