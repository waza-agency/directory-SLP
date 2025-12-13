import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, getBlogPosts } from '@/lib/blog';
import SEO from '@/components/common/SEO';
import NewsletterBanner from '@/components/NewsletterBanner';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface BlogIndexProps {
  posts: BlogPost[];
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async ({ locale }) => {
  const posts = await getBlogPosts();

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
      posts,
    },
    revalidate: 60 * 5, // Re-generate the page every 5 minutes
  };
};

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} legacyBehavior>
      <a className="block overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl">
        <div className="relative h-48 w-full">
          <Image
            src={post.imageUrl || '/images/blog-placeholder.jpg'}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="mb-2 text-xl font-bold">{post.title}</h2>
          <p className="text-gray-600">{post.excerpt}</p>
          <div className="mt-4 text-sm text-gray-500">
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            {post.category && <span> • {post.category}</span>}
          </div>
        </div>
      </a>
    </Link>
  );
}

export default function BlogIndexPage({ posts }: BlogIndexProps) {
  return (
    <>
      <SEO
        title="Expat Blog & Living Guide"
        description="Discover insider tips, local recommendations, and expat experiences in San Luis Potosí. From finding apartments to the best tacos - we've got you covered."
        keywords="san luis potosi blog, expat blog mexico, living in slp, expat guide, mexico relocation, expat tips"
      />

      {/* Blog Collection Structured Data */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "San Luis Way Blog",
              "description": "Your complete guide to living as an expat in San Luis Potosí",
              "url": "https://www.sanluisway.com/blog",
              "publisher": {
                "@type": "Organization",
                "name": "San Luis Way",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.sanluisway.com/og-image.jpg"
                }
              },
              "blogPost": posts.slice(0, 10).map(post => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.excerpt,
                "url": `https://www.sanluisway.com/blog/${post.slug}`,
                "datePublished": post.publishedAt,
                "image": post.imageUrl || "https://www.sanluisway.com/og-image.jpg"
              }))
            })
          }}
        />
      </Head>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <SparklesIcon className="w-4 h-4" />
            Your Guide to SLP
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Stories, Tips & Local Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Whether you're planning your move, settling in, or just curious about life in San Luis Potosí —
            we're here to help you navigate it all. Real talk, practical advice, and the inside scoop
            from people who've been there.
          </p>
        </div>

        {/* Fact-Checking Disclaimer */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <ShieldCheckIcon className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Our Commitment to Accuracy</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  We take facts seriously. Our articles go through a verification process where key claims
                  are cross-referenced with official sources, local data, and expert input. We're not perfect,
                  but we're committed to getting it right.
                </p>
                <Link
                  href="/blog/factchecks"
                  className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 text-sm font-medium transition-colors"
                >
                  View our fact-check reports
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No blog posts found. Check back later!</p>
        )}

        {/* Newsletter CTA */}
        <NewsletterBanner variant="mid-content" className="mt-16" />
      </main>
    </>
  );
}