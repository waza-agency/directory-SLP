import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogPosts, getBlogPostBySlug } from '@/lib/blog';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const results = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    tests: []
  };

  try {
    // Test 1: Get all blog posts
    console.log('🔍 Testing getBlogPosts...');
    const startTime1 = Date.now();
    try {
      const posts = await getBlogPosts();
      results.tests.push({
        test: 'getBlogPosts',
        success: true,
        duration: Date.now() - startTime1,
        result: {
          count: posts.length,
          posts: posts.slice(0, 3).map(p => ({ title: p.title, slug: p.slug }))
        }
      });
    } catch (error) {
      results.tests.push({
        test: 'getBlogPosts',
        success: false,
        duration: Date.now() - startTime1,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 2: Get specific blog post
    console.log('🔍 Testing getBlogPostBySlug...');
    const startTime2 = Date.now();
    try {
      const post = await getBlogPostBySlug('bienvenido-san-luis-way');
      results.tests.push({
        test: 'getBlogPostBySlug',
        success: true,
        duration: Date.now() - startTime2,
        result: {
          found: !!post,
          title: post?.title,
          slug: post?.slug
        }
      });
    } catch (error) {
      results.tests.push({
        test: 'getBlogPostBySlug',
        success: false,
        duration: Date.now() - startTime2,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 3: Supabase connection
    console.log('🔍 Testing Supabase connection...');
    const startTime3 = Date.now();
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase environment variables');
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('count')
        .limit(1);

      results.tests.push({
        test: 'supabaseConnection',
        success: !error,
        duration: Date.now() - startTime3,
        result: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseAnonKey,
          urlPrefix: supabaseUrl?.substring(0, 20) + '...',
          connectionWorking: !error,
          error: error?.message
        }
      });
    } catch (error) {
      results.tests.push({
        test: 'supabaseConnection',
        success: false,
        duration: Date.now() - startTime3,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Blog route tests completed',
      ...results
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      ...results
    });
  }
}