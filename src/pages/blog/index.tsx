import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, getBlogPosts } from '@/lib/blog';

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
      <Head>
        <title>Blog - San Luis Way</title>
        <meta name="description" content="Explore articles and stories about San Luis Potosí." />
      </Head>
      <main className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-center text-4xl font-bold">From the Blog</h1>
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