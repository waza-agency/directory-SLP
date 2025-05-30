import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import AdUnit from '../../components/common/AdUnit';
import { BlogPost, getBlogPostBySlug, getBlogPostSlugs } from '../../lib/blog';

interface BlogPostPageProps {
  post: BlogPost;
}

export const getStaticPaths: GetStaticPaths = async ({ locales = ['en'] }) => {
  const slugs = await getBlogPostSlugs();

  // Create paths for each slug and locale
  const paths = locales.flatMap(locale =>
    slugs.map(slug => ({
      params: { slug },
      locale
    }))
  );

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({
  params,
  locale = 'en'
}) => {
  try {
    const slug = params?.slug as string;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
      return { notFound: true };
    }

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        post
      },
      revalidate: 60 // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return { notFound: true };
  }
};

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const { t } = useTranslation('common');

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{post.metaTitle || post.title}</title>
        <meta
          name="description"
          content={post.metaDescription || post.excerpt}
        />
        {/* Open Graph tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.imageUrl && (
          <meta property="og:image" content={post.imageUrl} />
        )}
      </Head>

      <main className="bg-white min-h-screen py-12">
        {/* Hero Section */}
        <section className="container mx-auto px-4">
          {post.imageUrl && (
            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-600 mb-8">
            <time dateTime={post.publishedAt || post.createdAt}>
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {post.category && (
              <>
                <span className="mx-2">•</span>
                <span>{post.category}</span>
              </>
            )}
          </div>
          <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>
        </section>

        {/* First ad unit after the hero */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <AdUnit style={{ display: 'block', margin: '20px 0' }} />
          </div>
        </section>

        {/* Post content */}
        <article className="container mx-auto px-4 prose prose-lg max-w-none">
          {/* First half of content */}
          <div
            dangerouslySetInnerHTML={{
              __html: post.content.substring(0, Math.floor(post.content.length / 2))
            }}
          />

          {/* Relaxed ad unit in the middle of the content */}
          <div className="my-8 not-prose">
            <AdUnit isRelaxed={true} style={{ display: 'block', margin: '40px 0' }} />
          </div>

          {/* Second half of content */}
          <div
            dangerouslySetInnerHTML={{
              __html: post.content.substring(Math.floor(post.content.length / 2))
            }}
          />
        </article>

        {/* Bottom ad unit */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <AdUnit style={{ display: 'block', margin: '20px 0' }} />
          </div>
        </section>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <section className="container mx-auto px-4 mt-8">
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}