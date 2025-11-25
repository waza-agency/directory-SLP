import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { BlogPost, getBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import SEO from '@/components/common/SEO';
import Breadcrumbs from '@/components/common/Breadcrumbs';

interface BlogPostPageProps {
  post: BlogPost;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getBlogPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: 'blocking', // or true if you want to show a loading state
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async (context) => {
  const slug = context.params?.slug as string;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // Re-generate the page every minute
  };
};

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.tags?.join(', ')}
        ogImage={post.imageUrl || '/og-image.jpg'}
        ogType="article"
        article={{
          publishedTime: post.publishedAt,
          modifiedTime: post.createdAt,
          tags: post.tags
        }}
      />

      {/* Article Structured Data */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": post.title,
              "description": post.excerpt,
              "image": post.imageUrl || "https://www.sanluisway.com/og-image.jpg",
              "datePublished": post.publishedAt,
              "dateModified": post.createdAt,
              "author": {
                "@type": "Organization",
                "name": "San Luis Way",
                "url": "https://www.sanluisway.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "San Luis Way",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.sanluisway.com/og-image.jpg"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://www.sanluisway.com/blog/${post.slug}`
              },
              "keywords": post.tags?.join(', ') || '',
              "articleSection": post.category || "Expat Guide"
            })
          }}
        />
      </Head>

      <main className="bg-white">
        {post.imageUrl && (
          <div className="relative h-96 w-full">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="max-w-4xl text-center text-4xl font-bold text-white md:text-5xl">
                {post.title}
              </h1>
            </div>
          </div>
        )}

        <div className="container mx-auto max-w-3xl px-4 py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.title, href: `/blog/${post.slug}` }
            ]}
            className="mb-8"
          />
        </div>

        <div className="container mx-auto max-w-3xl px-4 pb-12">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-2 text-lg font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}