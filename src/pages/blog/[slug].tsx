import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import AdUnit from '@/components/common/AdUnit';
import { BlogPost, getBlogPosts, getBlogPostBySlug } from '@/lib/blog';

interface BlogPostPageProps {
  post: BlogPost | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    console.log('🔍 [getStaticPaths] Starting to get blog posts...');

    // In production, don't pre-generate paths to avoid build issues
    // Use fallback: 'blocking' to generate on-demand
    if (process.env.NODE_ENV === 'production') {
      console.log('🔍 [getStaticPaths] Production mode: using empty paths with blocking fallback');
      return {
        paths: [],
        fallback: 'blocking'
      };
    }

    const posts = await getBlogPosts();
    console.log('🔍 [getStaticPaths] Got posts:', posts.length);

    const paths = posts.map((post) => ({
      params: { slug: post.slug }
    }));

    console.log('🔍 [getStaticPaths] Generated paths:', paths);

    return {
      paths,
      fallback: 'blocking' // Enable ISR with blocking fallback
    };
  } catch (error) {
    console.error('❌ [getStaticPaths] Error getting static paths for blog:', error instanceof Error ? error.message : 'Unknown error');
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params, locale = 'en' }) => {
  try {
    console.log('🔍 [getStaticProps] Starting with params:', params);
    const slug = params?.slug as string;
    if (!slug) {
      console.log('❌ [getStaticProps] No slug provided');
      return {
        notFound: true
      };
    }

    console.log('🔍 [getStaticProps] Looking for slug:', slug);
    const post = await getBlogPostBySlug(slug);
    console.log('🔍 [getStaticProps] Found post:', !!post);

    if (!post) {
      console.log('❌ [getStaticProps] Post not found, returning 404');
      return {
        notFound: true // This will show the 404 page
      };
    }

    console.log('✅ [getStaticProps] Returning post:', post.title);
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        post
      },
      revalidate: 60 // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('❌ [getStaticProps] Error getting blog post:', error instanceof Error ? error.message : 'Unknown error', error);
    return {
      notFound: true
    };
  }
};

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const { t } = useTranslation('common');

  if (!post) {
    return null; // This shouldn't happen because of notFound: true above, but TypeScript needs it
  }

  return (
    <>
      <Head>
        <title>{post.title} - San Luis Way</title>
        <meta
          name="description"
          content={post.excerpt || post.title}
        />
        {post.imageUrl && (
          <meta property="og:image" content={post.imageUrl} />
        )}
      </Head>

      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section with Image */}
        {post.imageUrl && (
          <div className="relative h-96 w-full">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center max-w-4xl mx-auto">
                  {post.title}
                </h1>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Post Meta */}
            <div className="flex items-center justify-between mb-8">
              <div>
                {post.category && (
                  <span className="text-primary font-medium">
                    {post.category}
                  </span>
                )}
                <time className="text-gray-500 ml-4">
                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                </time>
              </div>
              <Link
                href="/blog"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                ← Back to Blog
              </Link>
            </div>

            {/* Ad Unit */}
            <div className="mb-8">
              <AdUnit style={{ display: 'block', margin: '0 auto', maxWidth: '728px' }} />
            </div>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Bottom Ad Unit */}
            <div className="mt-12">
              <AdUnit
                isRelaxed={true}
                style={{ display: 'block', margin: '0 auto', maxWidth: '728px' }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}