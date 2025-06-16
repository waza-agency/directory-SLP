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
    const posts = await getBlogPosts();

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        posts
      },
      revalidate: 60 // Revalidate every 60 seconds
    };
    } catch (error) {
    console.warn('Error in blog getStaticProps:', error instanceof Error ? error.message : 'Unknown error');
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        posts: []
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