import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { BlogPost, getBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import SEO from '@/components/common/SEO';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import NewsletterBanner from '@/components/NewsletterBanner';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async (context) => {
  const slug = context.params?.slug as string;
  const locale = context.locale;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
      post,
    },
    revalidate: 60,
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center">
              <h1 className="max-w-4xl text-center text-4xl font-bold text-white md:text-5xl px-4">
                {post.title}
              </h1>
            </div>
          </div>
        )}

        <div className="container mx-auto max-w-3xl px-4 py-8">
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
            className="prose prose-lg max-w-none prose-headings:scroll-mt-24"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="mb-4 text-lg font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter CTA - End of Article */}
          <NewsletterBanner variant="blog-end" />
        </div>
      </main>
    </>
  );
}
