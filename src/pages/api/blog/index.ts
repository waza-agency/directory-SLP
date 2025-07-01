import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogPosts } from '@/lib/blog';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔍 [API] Fetching all blog posts...');

    const posts = await getBlogPosts();

    console.log('✅ [API] Found blog posts:', posts.length);

    // Set cache headers for better performance
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

    return res.status(200).json({
      success: true,
      posts,
      count: posts.length
    });
  } catch (error) {
    console.error('❌ [API] Error fetching blog posts:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}