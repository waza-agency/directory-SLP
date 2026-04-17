import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost, getBlogPosts, getBlogPostBySlug, SupportedLocale } from '@/lib/blog';
import SEO from '@/components/common/SEO';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Byline from '@/components/common/Byline';
import NewsletterBanner from '@/components/NewsletterBanner';
import GuideCTA from '@/components/common/GuideCTA';
import ShareButton from '@/components/sharing/ShareButton';
import AdUnit from '@/components/common/AdUnit';
import AffiliateGrid from '@/components/affiliate/AffiliateGrid';
import { getAffiliateProductsForPost } from '@/data/affiliate-products';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: Pick<BlogPost, 'slug' | 'title' | 'imageUrl' | 'category'>[];
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
  const blogLocale = (locale || 'en') as SupportedLocale;
  const post = await getBlogPostBySlug(slug, blogLocale);

  if (!post) {
    return {
      notFound: true,
    };
  }

  // Fetch related posts by matching category
  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3)
    .map(({ slug, title, imageUrl, category }) => ({ slug, title, imageUrl, category }));

  // If fewer than 3 category matches, fill with recent posts
  if (relatedPosts.length < 3) {
    const fillPosts = allPosts
      .filter((p) => p.slug !== slug && !relatedPosts.some((r) => r.slug === p.slug))
      .slice(0, 3 - relatedPosts.length)
      .map(({ slug, title, imageUrl, category }) => ({ slug, title, imageUrl, category }));
    relatedPosts.push(...fillPosts);
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
      post,
      relatedPosts,
    },
    revalidate: 60,
  };
};

/**
 * Render the full blog post page including SEO metadata, Article structured data,
 * hero image, breadcrumbs, post content, tags, and a newsletter call-to-action.
 *
 * @param post - The blog post data used to populate page content, SEO fields, metadata, and structured data
 * @returns A JSX element representing the rendered blog post page
 */
export default function BlogPostPage({ post, relatedPosts }: BlogPostPageProps) {
  // Use dedicated SEO fields when available, fallback to title/excerpt
  const seoTitle = post.metaTitle || post.title;
  const seoDescription = post.metaDescription || post.excerpt;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
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
              "headline": seoTitle,
              "description": seoDescription,
              "image": post.imageUrl || "https://www.sanluisway.com/og-image.jpg",
              "datePublished": post.publishedAt,
              "dateModified": post.createdAt,
              "author": {
                "@type": "Person",
                "@id": "https://www.sanluisway.com/about#editorial-team",
                "name": "San Luis Way Editorial",
                "url": "https://www.sanluisway.com/about",
                "jobTitle": "Editorial Team",
                "worksFor": {
                  "@type": "Organization",
                  "@id": "https://www.sanluisway.com/#organization",
                  "name": "San Luis Way"
                }
              },
              "publisher": {
                "@type": "Organization",
                "@id": "https://www.sanluisway.com/#organization",
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col items-center justify-center">
              <h1 className="max-w-4xl text-center text-4xl font-bold text-white md:text-5xl px-4">
                {post.title}
              </h1>
              <div className="mt-6">
                <ShareButton 
                  title={post.title} 
                  text={post.excerpt ? `Read "${post.title}": ` : undefined}
                  size="lg"
                />
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto max-w-3xl px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.title, href: `/blog/${post.slug}` }
            ]}
            className="mb-6"
          />
          <Byline
            publishedAt={post.publishedAt}
            modifiedAt={post.createdAt}
            className="text-gray-600"
          />
        </div>

        <div className="container mx-auto max-w-3xl px-4 pb-12">
          <div className="mb-8">
            <AdUnit placement="top-banner" />
          </div>

          <div
            className="prose prose-lg max-w-none prose-headings:scroll-mt-24"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="my-10">
            <AdUnit placement="in-article" />
          </div>

          {(() => {
            const matchedProducts = getAffiliateProductsForPost({
              tags: post.tags,
              category: post.category,
              slug: post.slug,
              limit: 3,
            });
            if (matchedProducts.length === 0) return null;
            return (
              <AffiliateGrid
                productIds={matchedProducts.map((p) => p.id)}
                titleKey="affiliate.sectionTitle"
                subtitleKey="affiliate.sectionSubtitle"
              />
            );
          })()}

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

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="mb-6 text-xl font-bold text-gray-900">You might also like</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    {rp.imageUrl && (
                      <div className="relative h-32 w-full">
                        <Image src={rp.imageUrl} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="(max-width: 640px) 100vw, 33vw" />
                      </div>
                    )}
                    <div className="p-3">
                      <p className="text-xs text-blue-600 font-medium mb-1">{rp.category}</p>
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2">{rp.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter CTA - End of Article */}
          <NewsletterBanner variant="blog-end" />

          <GuideCTA relatedLinks={[
            { href: '/resources/safety-guide', label: 'Is SLP Safe?', labelEs: '¿Es Seguro SLP?' },
            { href: '/resources/living-guide', label: 'Living Guide', labelEs: 'Guía de Vida' },
            { href: '/resources/expat-guide', label: 'Expat Essentials', labelEs: 'Guía Expat' },
            { href: '/blog', label: 'All Blog Posts', labelEs: 'Todos los Artículos' },
          ]} />
        </div>
      </main>
    </>
  );
}