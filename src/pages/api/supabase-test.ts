import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Testing Supabase connection...');

    // Test 1: Basic connection
    const { data: connectionTest, error: connectionError } = await supabase
      .from('blog_posts')
      .select("*")
      .limit(1);

    if (connectionError) {
      console.error('Connection test failed:', connectionError);
      return res.status(500).json({
        success: false,
        error: 'Connection failed',
        details: connectionError
      });
    }

    // Test 2: Check blog_posts table structure
    const { data: tableTest, error: tableError } = await supabase
      .from('blog_posts')
      .select("*")
      .limit(3);

    if (tableError) {
      console.error('Table test failed:', tableError);
      return res.status(500).json({
        success: false,
        error: 'Table access failed',
        details: tableError
      });
    }

    // Test 3: Count published posts
    const { count, error: countError } = await supabase
      .from('blog_posts')
      .select("*")
      .eq('status', 'published');

    if (countError) {
      console.error('Count test failed:', countError);
    }

    console.log('Supabase connection test successful');

    return res.status(200).json({
      success: true,
      connection: 'OK',
      tableAccess: 'OK',
      publishedPostsCount: count || 0,
      samplePosts: tableTest?.map(post => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        status: post.status
      })) || [],
      environment: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
        nodeEnv: process.env.NODE_ENV
      }
    });
  } catch (error) {
    console.error('Supabase test error:', error);
    return res.status(500).json({
      success: false,
      error: 'Unexpected error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}