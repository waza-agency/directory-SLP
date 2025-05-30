import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const BlogIndex: NextPage = () => {
  const { t } = useTranslation('common');

  const blogPosts = [
    {
      slug: 'san-luis-rey-tranvia',
      title: 'San Luis Rey: Discover the City by Historic Trolley',
      description: "Experience San Luis Potosí's rich heritage through San Luis Rey's tourist trolley tours. Journey through the historic center with daily departures and expert guides, making it the perfect way to explore our UNESCO World Heritage city.",
      imageUrl: '/images/tours/tranvia-san-luis-rey.jpg',
      category: 'Tours',
      publishDate: '2024-03-20'
    },
    {
      slug: 'corazon-de-xoconostle',
      title: 'Corazón de Xoconostle: Adventure Travel Experts in San Luis Potosí',
      description: "Discover San Luis Potosí's premier adventure travel company offering guided tours, outdoor experiences, and unforgettable journeys through Mexico's most stunning landscapes.",
      imageUrl: '/images/outdoors/adventure-tours.jpg',
      category: 'Adventure Travel',
      publishDate: '2024-03-20'
    },
    {
      slug: 'la-gran-via',
      title: 'La Gran Vía: A Legacy of Spanish Cuisine in San Luis Potosí',
      description: "Experience over 36 years of Spanish culinary tradition at La Gran Vía, one of Mexico's 100 must-visit restaurants. Discover authentic Spanish cuisine with a local twist in the heart of San Luis Potosí.",
      imageUrl: '/images/restaurants-and-bars/la-gran-via.jpg',
      category: 'Restaurants',
      publishDate: '2024-03-20'
    }
  ];

  return (
    <>
      <Head>
        <title>Blog | Directory SLP - Discover San Luis Potosí</title>
        <meta name="description" content="Explore stories, guides, and features about San Luis Potosí's best places, cultural experiences, and local businesses." />
        <meta property="og:title" content="Blog | Directory SLP - Discover San Luis Potosí" />
        <meta property="og:description" content="Explore stories, guides, and features about San Luis Potosí's best places, cultural experiences, and local businesses." />
        <meta property="og:type" content="website" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Directory SLP Blog</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-48">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-gray-500">{post.category}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <time className="text-sm text-gray-500">{new Date(post.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</time>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="mt-4">
                      <span className="text-blue-600 hover:text-blue-800 transition-colors">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
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

export default BlogIndex;