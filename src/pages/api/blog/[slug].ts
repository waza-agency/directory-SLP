import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogPostBySlug } from '@/lib/blog';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { slug } = req.query;

    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: 'Invalid slug parameter' });
    }

    console.log('🔍 [API] Looking for blog post with slug:', slug);

    const post = await getBlogPostBySlug(slug);

    if (!post) {
      console.log('❌ [API] Blog post not found:', slug);
      return res.status(404).json({ error: 'Blog post not found' });
    }

    console.log('✅ [API] Blog post found:', post.title);

    // Set cache headers for better performance
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

    return res.status(200).json({
      success: true,
      post
    });
  } catch (error) {
    console.error('❌ [API] Error fetching blog post:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}