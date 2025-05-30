import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const LaGranVia: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>La Gran Vía - Historic Spanish Bakery in San Luis Potosí | Directory SLP</title>
        <meta name="description" content="Discover La Gran Vía, a historic Spanish bakery in San Luis Potosí known for its authentic pastries, artisanal bread, and century-old recipes. Experience the taste of tradition since 1930." />
        <meta property="og:title" content="La Gran Vía - Historic Spanish Bakery in San Luis Potosí" />
        <meta property="og:description" content="Discover La Gran Vía, a historic Spanish bakery in San Luis Potosí known for its authentic pastries, artisanal bread, and century-old recipes. Experience the taste of tradition since 1930." />
        <meta property="og:image" content="/images/food/bakery-traditional.jpg" />
        <meta property="og:type" content="article" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <div className="relative w-full h-96 mb-8">
            <Image
              src="/images/food/bakery-traditional.jpg"
              alt="La Gran Vía Bakery"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          <h1 className="text-4xl font-bold mb-6">La Gran Vía: A Century of Spanish Baking Tradition</h1>

          <div className="prose prose-lg max-w-none">
            <p className="lead">
              Since 1930, La Gran Vía has been delighting the people of San Luis Potosí with authentic Spanish pastries, artisanal bread, and time-honored recipes that have become a cherished part of the city's culinary heritage.
            </p>

            <h2>A Legacy of Flavor</h2>
            <p>
              Founded by Spanish immigrants who brought their traditional recipes and baking techniques to Mexico, La Gran Vía has maintained its commitment to quality and authenticity for over 90 years. Each pastry and bread is crafted using the same methods and care that have made us a beloved institution in San Luis Potosí.
            </p>

            <h2>Our Specialties</h2>
            <ul>
              <li>Traditional Spanish pastries and sweets</li>
              <li>Artisanal sourdough bread</li>
              <li>Classic Mexican pan dulce</li>
              <li>Special occasion cakes and desserts</li>
              <li>Holiday specialties and seasonal treats</li>
            </ul>

            <h2>The La Gran Vía Experience</h2>
            <p>
              Walking into La Gran Vía is like stepping into a piece of history. The aroma of freshly baked bread, the display cases filled with colorful pastries, and the warm, inviting atmosphere create an experience that has captivated customers for generations. Our skilled bakers work through the night to ensure that every morning begins with fresh, warm bread and pastries.
            </p>

            <h2>Quality and Tradition</h2>
            <p>
              We take pride in using only the finest ingredients and maintaining the traditional methods that have been passed down through generations. Our commitment to quality has earned us a reputation as one of the most respected bakeries in San Luis Potosí, serving both locals and visitors who seek authentic Spanish and Mexican baked goods.
            </p>

            <div className="mt-8 bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Visit Our Historic Bakery</h3>
              <p>
                Experience the magic of traditional Spanish baking at La Gran Vía. Whether you're starting your day with a fresh pastry and coffee, picking up bread for dinner, or selecting special treats for a celebration, we invite you to become part of our century-long tradition.
              </p>
            </div>

            <h2>Location & Hours</h2>
            <p>
              Find us in the heart of San Luis Potosí's historic center. We're open daily from 7:00 AM until 9:00 PM, offering fresh baked goods throughout the day. Special orders for celebrations and events are welcome with advance notice.
            </p>
          </div>
        </article>
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

export default LaGranVia;