import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const CorazonDeXoconostle: NextPage = () => {

  return (
    <>
      <Head>
        <title>Corazón de Xoconostle - Artisanal Products & Cultural Experience | Directory SLP</title>
        <meta name="description" content="Experience the essence of San Luis Potosí through Corazón de Xoconostle's artisanal products. Discover traditional xoconostle delicacies, local crafts, and authentic cultural experiences." />
        <meta property="og:title" content="Corazón de Xoconostle - Artisanal Products & Cultural Experience" />
        <meta property="og:description" content="Experience the essence of San Luis Potosí through Corazón de Xoconostle's artisanal products. Discover traditional xoconostle delicacies, local crafts, and authentic cultural experiences." />
        <meta property="og:image" content="/images/brands/corazon-de-xoconostle-logo.png" />
        <meta property="og:type" content="article" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <div className="relative w-full h-96 mb-8">
            <Image
              src="/images/brands/corazon-de-xoconostle-logo.png"
              alt="Corazón de Xoconostle"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>

          <h1 className="text-4xl font-bold mb-6">Corazón de Xoconostle: A Taste of Potosino Heritage</h1>

          <div className="prose prose-lg max-w-none">
            <p className="lead">
              Corazón de Xoconostle represents the heart and soul of San Luis Potosí's culinary heritage, specializing in artisanal products made from the iconic xoconostle cactus fruit and other local ingredients that tell the story of our region.
            </p>

            <h2>Our Story</h2>
            <p>
              Born from a passion for preserving local traditions and supporting regional producers, Corazón de Xoconostle has become a beacon of Potosino culture. We work directly with local communities to create authentic products that showcase the unique flavors and traditions of San Luis Potosí.
            </p>

            <h2>Artisanal Products</h2>
            <ul>
              <li>Traditional xoconostle preserves and jams</li>
              <li>Gourmet sauces and condiments</li>
              <li>Artisanal candies and sweets</li>
              <li>Natural beauty products</li>
              <li>Local handicrafts and artwork</li>
            </ul>

            <h2>Cultural Impact</h2>
            <p>
              More than just a brand, Corazón de Xoconostle is a cultural movement that celebrates and preserves the rich heritage of San Luis Potosí. Through our products and educational initiatives, we connect people with the traditions, flavors, and stories that make our region unique.
            </p>

            <h2>Sustainable Practices</h2>
            <p>
              We are committed to sustainable practices and supporting local communities. Our products are made using traditional methods that respect both the environment and cultural heritage. By working directly with local producers, we ensure fair trade practices and help preserve traditional knowledge for future generations.
            </p>

            <div className="mt-8 bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Experience Corazón de Xoconostle</h3>
              <p>
                Visit our store to discover the authentic flavors of San Luis Potosí and learn about the rich cultural heritage behind each product. Join us in celebrating and preserving the heart of Potosino traditions.
              </p>
            </div>

            <h2>Location & Hours</h2>
            <p>
              Find us in the historic center of San Luis Potosí, where we offer not just products, but a complete cultural experience. Our store is open Monday through Saturday from 10:00 AM to 7:00 PM, and we regularly host cultural events and tastings.
            </p>
          </div>
        </article>
      </main>
    </>
  );
};

export const getStaticProps = async ({ }: { locale?: string }) => {
  return {
    props: {
    },
  };
};

export default CorazonDeXoconostle;