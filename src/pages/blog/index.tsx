import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { BlogPost, getBlogPosts } from '@/lib/blog';
import SEO from '@/components/common/SEO';
import NewsletterBanner from '@/components/NewsletterBanner';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  FireIcon,
  TagIcon
} from '@heroicons/react/24/outline';

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

const CATEGORY_COLORS: Record<string, string> = {
  'Culture & History': 'bg-purple-100 text-purple-700 border-purple-200',
  'Food & Dining': 'bg-orange-100 text-orange-700 border-orange-200',
  'Expat Life': 'bg-blue-100 text-blue-700 border-blue-200',
  'Things to Do': 'bg-green-100 text-green-700 border-green-200',
  'Travel': 'bg-pink-100 text-pink-700 border-pink-200',
  'default': 'bg-gray-100 text-gray-700 border-gray-200'
};

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function getCategoryColor(category?: string): string {
  if (!category) return CATEGORY_COLORS.default;
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
}

function FeaturedPostHero({ post }: { post: BlogPost }) {
  const readTime = estimateReadTime(post.content);

  return (
    <Link href={`/blog/${post.slug}`} legacyBehavior>
      <a className="group block overflow-hidden rounded-3xl bg-white shadow-elegant hover:shadow-card-hover transition-all duration-500">
        <div className="grid lg:grid-cols-5 gap-0">
          <div className="lg:col-span-3 relative h-64 lg:h-[400px] overflow-hidden">
            <Image
              src={post.imageUrl || '/images/blog-placeholder.jpg'}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/10 lg:to-black/40" />
            {post.category && (
              <div className="absolute top-6 left-6">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-4">
              <FireIcon className="w-5 h-5" />
              Featured Article
            </div>

            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-secondary transition-colors duration-300">
              {post.title}
            </h2>

            <p className="text-gray-600 text-lg mb-6 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
              <span className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                {readTime} min read
              </span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

function PostCard({ post, index }: { post: BlogPost; index?: number }) {
  const readTime = estimateReadTime(post.content);

  return (
    <Link href={`/blog/${post.slug}`} legacyBehavior>
      <a
        className="group block overflow-hidden rounded-2xl bg-white shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
        style={{ animationDelay: `${(index || 0) * 50}ms` }}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.imageUrl || '/images/blog-placeholder.jpg'}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {post.category && (
            <div className="absolute top-4 left-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getCategoryColor(post.category)}`}>
                {post.category}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="font-display text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-secondary transition-colors duration-300">
            {post.title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </time>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-3.5 h-3.5" />
              {readTime} min
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
}

function MiniPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} legacyBehavior>
      <a className="group flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
        <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={post.imageUrl || '/images/blog-placeholder.jpg'}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-secondary transition-colors">
            {post.title}
          </h4>
          <time className="text-xs text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </time>
        </div>
      </a>
    </Link>
  );
}

function CategorySilo({ title, posts, viewMoreHref }: {
  title: string;
  posts: BlogPost[];
  viewMoreHref?: string;
}) {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl font-bold text-gray-900">{title}</h2>
        {viewMoreHref && (
          <Link
            href={viewMoreHref}
            className="text-secondary hover:text-secondary/80 font-semibold text-sm flex items-center gap-1 transition-colors"
          >
            View More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post, idx) => (
          <PostCard key={post.id} post={post} index={idx} />
        ))}
      </div>
    </section>
  );
}

export default function BlogIndexPage({ posts }: BlogIndexProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Map<string, number>();
    posts.forEach(post => {
      if (post.category) {
        cats.set(post.category, (cats.get(post.category) || 0) + 1);
      }
    });
    return Array.from(cats.entries()).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const allTags = useMemo(() => {
    const tags = new Map<string, number>();
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        tags.set(tag, (tags.get(tag) || 0) + 1);
      });
    });
    return Array.from(tags.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const featuredPost = filteredPosts[0];
  const popularPosts = useMemo(() => [...posts].slice(0, 5), [posts]);

  const postsByCategory = useMemo(() => {
    const grouped = new Map<string, BlogPost[]>();
    filteredPosts.forEach(post => {
      if (post.category) {
        if (!grouped.has(post.category)) {
          grouped.set(post.category, []);
        }
        grouped.get(post.category)!.push(post);
      }
    });
    return grouped;
  }, [filteredPosts]);

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
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Stories, Tips & Local Insights
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Whether you're planning your move, settling in, or just curious about life in San Luis Potosí —
              we're here to help you navigate it all.
            </p>
          </div>

          {/* Fact-Check Banner - Compact */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <ShieldCheckIcon className="w-10 h-10 text-emerald-600 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Fact-Checked Content</h3>
                  <p className="text-gray-600 text-sm">
                    Our articles are verified for accuracy.{' '}
                    <Link href="/blog/factchecks" className="text-emerald-700 hover:text-emerald-800 font-medium">
                      View reports →
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="max-w-6xl mx-auto mb-16">
              <FeaturedPostHero post={featuredPost} />
            </div>
          )}

          {/* Main Layout: Content + Sidebar */}
          <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
            {/* Main Content Area */}
            <div className="lg:col-span-8">
              {/* Category Silos */}
              {!selectedCategory && !searchQuery ? (
                <>
                  {Array.from(postsByCategory.entries()).map(([category, categoryPosts]) => (
                    <CategorySilo
                      key={category}
                      title={category}
                      posts={categoryPosts}
                      viewMoreHref={`/blog?category=${encodeURIComponent(category)}`}
                    />
                  ))}
                </>
              ) : (
                /* Filtered Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.slice(1).map((post, idx) => (
                    <PostCard key={post.id} post={post} index={idx} />
                  ))}
                </div>
              )}

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">No posts found. Try a different search or category.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-8 space-y-8">
                {/* Search */}
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <h3 className="font-bold text-gray-900 mb-4">Search Articles</h3>
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-colors ${
                        !selectedCategory
                          ? 'bg-secondary text-white'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="font-medium">All Posts</span>
                      <span className={`text-sm px-2 py-0.5 rounded-full ${
                        !selectedCategory ? 'bg-white/20' : 'bg-gray-200'
                      }`}>
                        {posts.length}
                      </span>
                    </button>
                    {categories.map(([category, count]) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-colors ${
                          selectedCategory === category
                            ? 'bg-secondary text-white'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <span className="font-medium">{category}</span>
                        <span className={`text-sm px-2 py-0.5 rounded-full ${
                          selectedCategory === category ? 'bg-white/20' : 'bg-gray-200'
                        }`}>
                          {count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Posts */}
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <FireIcon className="w-5 h-5 text-orange-500" />
                    <h3 className="font-bold text-gray-900">Popular Posts</h3>
                  </div>
                  <div className="space-y-1">
                    {popularPosts.map(post => (
                      <MiniPostCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>

                {/* Tags Cloud */}
                {allTags.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-card">
                    <div className="flex items-center gap-2 mb-4">
                      <TagIcon className="w-5 h-5 text-gray-600" />
                      <h3 className="font-bold text-gray-900">Popular Tags</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(([tag, count]) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors cursor-pointer"
                        >
                          {tag}
                          <span className="text-xs text-gray-500">({count})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Newsletter Signup - Compact */}
                <div className="bg-gradient-to-br from-secondary to-secondary/90 rounded-2xl p-6 text-white shadow-card">
                  <h3 className="font-bold text-lg mb-2">Weekly Newsletter</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Get practical tips & local insights every Sunday.
                  </p>
                  <Link
                    href="#newsletter"
                    className="block w-full text-center px-4 py-3 bg-primary text-secondary font-bold rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Subscribe Free
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Newsletter CTA */}
          <div id="newsletter" className="max-w-5xl mx-auto">
            <NewsletterBanner variant="mid-content" className="mt-16" />
          </div>
        </div>
      </main>
    </>
  );
}
