import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Testing Supabase connection...');
    console.log('Supabase URL:', supabaseUrl);
    console.log('Has Anon Key:', !!supabaseAnonKey);

    // Test 1: Check table existence
    const { data: tableData, error: tableError } = await supabase
      .from('blog_posts')
      .select("*")
      .limit(1);

    console.log('Table check result:', { tableData, tableError });

    // Test 2: Get all posts (including drafts for debugging)
    const { data: allPosts, error: allError } = await supabase
      .from('blog_posts')
      .select;

    console.log('All posts result:', { count: allPosts?.length, allError });

    // Test 3: Get published posts only
    const { data: publishedPosts, error: publishedError } = await supabase
      .from('blog_posts')
      .select("*")
      .eq('status', 'published');

    console.log('Published posts result:', { count: publishedPosts?.length, publishedError });

    // Test 4: Test one specific slug
    const { data: singlePost, error: singleError } = await supabase
      .from('blog_posts')
      .select("*")
      .eq('slug', 'welcome-to-san-luis-way')
      .eq('status', 'published')
      .single();

    console.log('Single post result:', { singlePost: !!singlePost, singleError });

    return res.status(200).json({
      success: true,
      debug: {
        supabaseUrl,
        hasAnonKey: !!supabaseAnonKey,
        tableExists: !tableError,
        tableError: tableError?.message,
        allPostsCount: allPosts?.length || 0,
        allPostsError: allError?.message,
        publishedPostsCount: publishedPosts?.length || 0,
        publishedPostsError: publishedError?.message,
        samplePosts: publishedPosts?.slice(0, 3).map(p => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          status: p.status,
          published_at: p.published_at
        })),
        singlePostExists: !!singlePost,
        singlePostError: singleError?.message
      }
    });
  } catch (error) {
    console.error('Debug error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}