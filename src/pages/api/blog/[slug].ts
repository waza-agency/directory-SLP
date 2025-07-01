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

    console.log(`API: Fetching blog post for slug: ${slug}`);

    const post = await getBlogPostBySlug(slug);

    if (!post) {
      console.log(`API: Blog post not found for slug: ${slug}`);
      return res.status(404).json({ error: 'Blog post not found' });
    }

    console.log(`API: Successfully fetched blog post: ${post.title}`);

    // Set cache headers
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');

    return res.status(200).json(post);
  } catch (error) {
    console.error('API: Error fetching blog post:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}