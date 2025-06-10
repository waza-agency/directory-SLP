import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogPosts, getBlogPostBySlug } from '@/lib/blog';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get all blog posts
    const posts = await getBlogPosts();

    // Get a specific post if slug is provided
    let specificPost = null;
    if (req.query.slug) {
      specificPost = await getBlogPostBySlug(req.query.slug as string);
    }

    const response = {
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not Set',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not Set',
      },
      blog: {
        totalPosts: posts.length,
        posts: posts.map(post => ({
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt?.substring(0, 100) + '...',
          imageUrl: post.imageUrl,
          category: post.category,
          publishedAt: post.publishedAt,
          createdAt: post.createdAt
        })),
        specificPost: specificPost ? {
          id: specificPost.id,
          slug: specificPost.slug,
          title: specificPost.title,
          excerpt: specificPost.excerpt?.substring(0, 100) + '...',
          contentLength: specificPost.content?.length || 0,
          imageUrl: specificPost.imageUrl,
          category: specificPost.category,
          publishedAt: specificPost.publishedAt,
          createdAt: specificPost.createdAt
        } : null
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Debug blog error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}