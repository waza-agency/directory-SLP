import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import AdUnit from '@/components/common/AdUnit';
import { BlogPost, getBlogPosts } from '@/lib/blog';

interface BlogIndexProps {
  posts: BlogPost[];
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async ({ locale = 'en' }) => {
  try {
    const dynamicPosts = await getBlogPosts();

    // Add hardcoded blog posts that exist as static pages
    const staticPosts: BlogPost[] = [
      {
        id: 'static-corazon',
        slug: 'corazon-de-xoconostle',
        title: 'Corazón de Xoconostle: Your Gateway to Adventure in San Luis Potosí',
        excerpt: 'Discover San Luis Potosí\'s premier adventure travel company offering guided tours, outdoor experiences, and unforgettable journeys through Mexico\'s most stunning landscapes.',
        content: '',
        imageUrl: 'https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/corazon-de-xoconostle-adventure.jpg',
        category: 'Adventure Travel',
        publishedAt: '2024-03-20T00:00:00Z',
        createdAt: '2024-03-20T00:00:00Z'
      },
      {
        id: 'static-lagranvia',
        slug: 'la-gran-via',
        title: 'La Gran Vía: A Legacy of Spanish Cuisine in San Luis Potosí',
        excerpt: 'Experience over 36 years of Spanish culinary tradition at La Gran Vía, one of Mexico\'s 100 must-visit restaurants. Discover authentic Spanish cuisine with a local twist.',
        content: '',
        imageUrl: 'https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/la-gran-via-restaurant.jpg',
        category: 'Restaurants',
        publishedAt: '2024-03-20T00:00:00Z',
        createdAt: '2024-03-20T00:00:00Z'
      },
      {
        id: 'static-tranvia',
        slug: 'san-luis-rey-tranvia',
        title: 'San Luis Rey: The Perfect Way to Discover Our Historic City',
        excerpt: 'Join the San Luis Rey tourist trolley for a charming journey through the historic center of San Luis Potosí, discovering centuries of history, architecture, and culture.',
        content: '',
        imageUrl: '/images/tours/tranvia-san-luis-rey.jpg',
        category: 'Tours',
        publishedAt: '2024-03-20T00:00:00Z',
        createdAt: '2024-03-20T00:00:00Z'
      }
    ];

    // Check for duplicates and only add static posts if they don't exist in dynamic posts
    const dynamicSlugs = new Set(dynamicPosts.map(post => post.slug));
    const uniqueStaticPosts = staticPosts.filter(post => !dynamicSlugs.has(post.slug));

    // Combine dynamic and unique static posts, sort by published date
    const allPosts = [...dynamicPosts, ...uniqueStaticPosts].sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt);
      const dateB = new Date(b.publishedAt || b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        posts: allPosts
      },
      revalidate: 60 // Revalidate every 60 seconds
    };
    } catch (error) {
    console.warn('Error in blog getStaticProps:', error instanceof Error ? error.message : 'Unknown error');
    // Return static posts as fallback only - no duplicates possible here since dynamicPosts failed
    const staticPosts: BlogPost[] = [
      {
        id: 'static-corazon',
        slug: 'corazon-de-xoconostle',
        title: 'Corazón de Xoconostle: Your Gateway to Adventure in San Luis Potosí',
        excerpt: 'Discover San Luis Potosí\'s premier adventure travel company offering guided tours, outdoor experiences, and unforgettable journeys through Mexico\'s most stunning landscapes.',
        content: '',
        imageUrl: 'https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/corazon-de-xoconostle-adventure.jpg',
        category: 'Adventure Travel',
        publishedAt: '2024-03-20T00:00:00Z',
        createdAt: '2024-03-20T00:00:00Z'
      },
      {
        id: 'static-lagranvia',
        slug: 'la-gran-via',
        title: 'La Gran Vía: A Legacy of Spanish Cuisine in San Luis Potosí',
        excerpt: 'Experience over 36 years of Spanish culinary tradition at La Gran Vía, one of Mexico\'s 100 must-visit restaurants. Discover authentic Spanish cuisine with a local twist.',
        content: '',
        imageUrl: 'https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/la-gran-via-restaurant.jpg',
        category: 'Restaurants',
        publishedAt: '2024-03-20T00:00:00Z',
        createdAt: '2024-03-20T00:00:00Z'
      },
      {
        id: 'static-tranvia',
        slug: 'san-luis-rey-tranvia',
        title: 'San Luis Rey: The Perfect Way to Discover Our Historic City',
        excerpt: 'Join the San Luis Rey tourist trolley for a charming journey through the historic center of San Luis Potosí, discovering centuries of history, architecture, and culture.',
        content: '',
        imageUrl: '/images/tours/tranvia-san-luis-rey.jpg',
        category: 'Tours',
        publishedAt: '2024-03-20T00:00:00Z',
        createdAt: '2024-03-20T00:00:00Z'
      }
    ];

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        posts: staticPosts
      },
      revalidate: 60
    };
  }
};

export default function BlogIndex({ posts }: BlogIndexProps) {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('navigation.blog')} - San Luis Way</title>
        <meta
          name="description"
          content={t('navigation.blog_description')}
        />
      </Head>

      <main className="bg-gray-50 min-h-screen py-12">
        {/* Hero Section */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('navigation.blog')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              {t('navigation.blog_description')}
            </p>
          </div>
        </section>

        {/* Ad Unit after hero */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <AdUnit style={{ display: 'block', margin: '0 auto', maxWidth: '728px' }} />
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="container mx-auto px-4 py-12">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <Link href={`/blog/${post.slug}`}>
                    {post.imageUrl && (
                      <div className="relative h-48">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {post.category && (
                        <span className="text-sm text-primary font-medium">
                          {post.category}
                        </span>
                      )}
                      <h2 className="text-xl font-semibold text-gray-900 mt-2 mb-3">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <time className="text-sm text-gray-500">
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                        </time>
                        <span className="text-primary font-medium">Read more →</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Coming Soon!
              </h2>
              <p className="text-gray-600">
                We're working on creating amazing content for you. Check back soon!
              </p>
            </div>
          )}
        </section>

        {/* Bottom Ad Unit */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <AdUnit
              isRelaxed={true}
              style={{ display: 'block', margin: '0 auto', maxWidth: '728px' }}
            />
          </div>
        </section>
      </main>
    </>
  );
}