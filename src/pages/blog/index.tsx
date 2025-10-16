import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, getBlogPosts } from '@/lib/blog';
import SEO from '@/components/common/SEO';

interface BlogIndexProps {
  posts: BlogPost[];
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const posts = await getBlogPosts();

  return {
    props: {
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Expat Living in San Luis Potosí</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences, practical advice, and insider tips from expats living in SLP
          </p>
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
      </main>
    </>
  );
}