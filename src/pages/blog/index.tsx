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

      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section with Background */}
        <section className="relative h-96 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/cultural/san-luis-potosi-cathedral.jpg"
              alt="San Luis Potosí Cathedral"
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-purple-900/60 to-indigo-900/70"></div>

          {/* Content */}
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {t('navigation.blog')}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                {t('navigation.blog_description')}
              </p>
              <div className="mt-8">
                <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-white font-medium">
                    Discover San Luis Potosí through our stories
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
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