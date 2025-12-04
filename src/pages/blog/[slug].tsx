import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
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

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [showToc, setShowToc] = useState(true);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Extract TOC from content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content;

    const headings = tempDiv.querySelectorAll('h2, h3');
    const items: TocItem[] = [];

    headings.forEach((heading, index) => {
      const text = heading.textContent || '';
      const id = `section-${index}`;
      heading.id = id;

      items.push({
        id,
        text,
        level: parseInt(heading.tagName.charAt(1))
      });
    });

    setTocItems(items);

    // Handle scroll to hide/show TOC
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Hide TOC when scrolling down past 300px, show when scrolling up
          if (currentScrollY > 300 && currentScrollY > lastScrollY) {
            setShowToc(false);
          } else if (currentScrollY < lastScrollY) {
            setShowToc(true);
          }

          lastScrollY = currentScrollY;
          ticking = false;

          // Update active section
          const sections = document.querySelectorAll('h2[id], h3[id]');
          sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= 200) {
              setActiveSection(section.id);
            }
          });
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post.content]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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

        {/* Table of Contents - Sticky with hide on scroll */}
        {tocItems.length > 0 && (
          <div
            className={`sticky top-20 z-40 transition-all duration-300 ${
              showToc ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
            }`}
          >
            <div className="container mx-auto max-w-7xl px-4">
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Table of Contents</h2>
                  <button
                    onClick={() => setShowToc(false)}
                    className="text-gray-500 hover:text-gray-700 p-2"
                    aria-label="Close table of contents"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {tocItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        item.level === 2 ? 'font-medium' : 'pl-6 text-gray-600'
                      } ${
                        activeSection === item.id
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {item.text}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Show TOC Button (when hidden) */}
        {!showToc && (
          <button
            onClick={() => setShowToc(true)}
            className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 z-50"
            aria-label="Show table of contents"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

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
