import { GetStaticPaths, GetStaticProps } from 'next';
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
    console.log('getStaticPaths: Fetching blog posts for path generation...');

    // Always try to get blog posts, even in production
    const posts = await getBlogPosts();
    console.log(`getStaticPaths: Found ${posts.length} blog posts`);

    // Generate paths for all published blog posts
    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }));

    console.log('getStaticPaths: Generated paths:', paths.map(p => p.params.slug));

    return {
      paths,
      fallback: 'blocking' // Generate pages on-demand for new posts
    };
  } catch (error) {
    console.error('getStaticPaths: Error fetching blog posts:', error);
    // Return empty paths with fallback as backup
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    console.log(`getStaticProps: Fetching blog post for slug: ${slug}`);

    if (!slug) {
      console.error('getStaticProps: No slug provided');
      return {
        notFound: true
      };
    }

    const post = await getBlogPostBySlug(slug);
    console.log(`getStaticProps: Blog post result for ${slug}:`, post ? 'Found' : 'Not found');

    if (!post) {
      console.error(`getStaticProps: Blog post not found for slug: ${slug}`);
      return {
        notFound: true
      };
    }

    return {
      props: {
        post,
      },
      revalidate: 300 // Revalidate every 5 minutes
    };
  } catch (error) {
    console.error('getStaticProps: Error fetching blog post:', error);
    return {
      notFound: true
    };
  }
};

export default function BlogPostPage({ post }: BlogPostPageProps) {
  if (!post) {
    return null;
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
                    {typeof post.category === 'object' ? (post.category as any).name || '' : post.category}
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
              {/* Ensure content is always a string to prevent rendering errors */}
              {post.content && typeof post.content === 'string' && (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              )}
            </div>

            {/* Render tags safely */}
            {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {typeof tag === 'object' ? (tag as any).name || '' : tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

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