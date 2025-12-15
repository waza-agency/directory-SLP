import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';
import { BlogPost, getBlogPosts } from '@/lib/blog';
import SEO from '@/components/common/SEO';
import NewsletterBanner from '@/components/NewsletterBanner';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ShieldCheckIcon, SparklesIcon, ClockIcon } from '@heroicons/react/24/outline';

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
    revalidate: 60 * 5,
  };
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Culture & History': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  'Food & Dining': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  'Expat Life': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'Things to Do': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'Travel': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
};

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function BlogCard({ post }: { post: BlogPost }) {
  const readTime = estimateReadTime(post.content);
  const colors = post.category ? CATEGORY_COLORS[post.category] : null;

  return (
    <Link href={`/blog/${post.slug}`} legacyBehavior>
      <a className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={post.imageUrl || '/images/blog-placeholder.jpg'}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {post.category && colors && (
            <div className="absolute top-4 left-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}>
                {post.category}
              </span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {readTime} min read
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
}

function FeaturedPost({ post }: { post: BlogPost }) {
  const readTime = estimateReadTime(post.content);
  const colors = post.category ? CATEGORY_COLORS[post.category] : null;

  return (
    <Link href={`/blog/${post.slug}`} legacyBehavior>
      <a className="group block relative rounded-3xl overflow-hidden shadow-elegant hover:shadow-card-hover transition-all duration-500">
        <div className="relative h-[450px] md:h-[500px]">
          <Image
            src={post.imageUrl || '/images/blog-placeholder.jpg'}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <div className="max-w-3xl">
              {post.category && colors && (
                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${colors.bg} ${colors.text} border ${colors.border}`}>
                  {post.category}
                </span>
              )}
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h2>
              <p className="text-white/90 text-lg mb-6 line-clamp-2 max-w-2xl">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  {readTime} min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default function BlogIndexPage({ posts }: BlogIndexProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState<number>(0);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach(post => {
      if (post.category) cats.add(post.category);
    });
    return Array.from(cats);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter(post => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  // Randomly select featured post on page load
  useEffect(() => {
    if (filteredPosts.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredPosts.length);
      setFeaturedIndex(randomIndex);
    }
  }, [filteredPosts.length, selectedCategory]);

  const featuredPost = filteredPosts[featuredIndex];
  const otherPosts = filteredPosts.filter((_, index) => index !== featuredIndex);

  return (
    <>
      <SEO
        title="Expat Blog & Living Guide"
        description="Discover insider tips, local recommendations, and expat experiences in San Luis Potosí. From finding apartments to the best tacos - we've got you covered."
        keywords="san luis potosi blog, expat blog mexico, living in slp, expat guide, mexico relocation, expat tips"
      />

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

      <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <SparklesIcon className="w-4 h-4" />
              Your Guide to SLP
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Stories, Tips & Local Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Whether you're planning your move, settling in, or just curious about life in San Luis Potosí —
              we're here to help you navigate it all. Real talk, practical advice, and the inside scoop
              from people who've been there.
            </p>
          </div>

          {/* Fact-Checking Disclaimer - Original */}
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

          {/* Category Navigation */}
          <div className="max-w-5xl mx-auto mb-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
                  !selectedCategory
                    ? 'bg-secondary text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                All Posts
              </button>
              {categories.map(category => {
                const colors = CATEGORY_COLORS[category];
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-secondary text-white shadow-md'
                        : colors
                          ? `${colors.bg} ${colors.text} border ${colors.border} hover:opacity-80`
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="max-w-5xl mx-auto mb-12">
              <FeaturedPost post={featuredPost} />
            </div>
          )}

          {/* Posts Grid */}
          {otherPosts.length > 0 ? (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          ) : (
            filteredPosts.length === 0 && (
              <p className="text-center text-lg text-gray-500 py-12">No blog posts found. Check back later!</p>
            )
          )}

          {/* Newsletter CTA */}
          <div className="max-w-4xl mx-auto">
            <NewsletterBanner variant="mid-content" className="mt-16" />
          </div>
        </div>
      </main>
    </>
  );
}
