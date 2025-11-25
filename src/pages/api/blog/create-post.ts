import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface CreatePostBody {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category?: string;
  tags?: string[];
  image_url?: string;
  title_en?: string;
  excerpt_en?: string;
  content_en?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const postData: CreatePostBody = req.body;

    if (!postData.title || !postData.slug || !postData.excerpt || !postData.content) {
      return res.status(400).json({
        error: 'Missing required fields: title, slug, excerpt, and content are required'
      });
    }

    const { data: existingPost, error: checkError } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('slug', postData.slug)
      .single();

    if (existingPost) {
      return res.status(409).json({
        error: 'A post with this slug already exists',
        slug: postData.slug
      });
    }

    const { data: insertedPost, error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        title: postData.title,
        slug: postData.slug,
        excerpt: postData.excerpt,
        content: postData.content,
        category: postData.category || 'General',
        tags: postData.tags || [],
        image_url: postData.image_url,
        title_en: postData.title_en || postData.title,
        excerpt_en: postData.excerpt_en || postData.excerpt,
        content_en: postData.content_en || postData.content,
        status: 'published',
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting post:', insertError);
      return res.status(500).json({
        error: 'Error creating post',
        details: insertError.message
      });
    }

    return res.status(201).json({
      message: 'Blog post created successfully',
      post: {
        id: insertedPost.id,
        title: insertedPost.title,
        slug: insertedPost.slug,
        url: `/blog/${insertedPost.slug}`
      }
    });
  } catch (error) {
    console.error('Error in create-post:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
