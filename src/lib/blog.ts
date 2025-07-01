import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  category?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Add timeout and retry logic
    const { data, error } = await Promise.race([
      supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .order('created_at', { ascending: false }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 10000)
      )
    ]) as any;

    if (error) {
      console.error('Error fetching blog posts:', error.message, error);
      return [];
    }

    // Map database fields to interface fields
    const mappedData = data?.map((post: any) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      imageUrl: post.image_url,
      category: post.category,
      publishedAt: post.published_at,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      tags: post.tags
    })) || [];

    return mappedData;
  } catch (error) {
    console.error('Error in getBlogPosts:', error instanceof Error ? error.message : 'Unknown error', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await Promise.race([
      supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 10000)
      )
    ]) as any;

    if (error) {
      console.error('Error fetching blog post:', error.message, error);
      return null;
    }

    // Map database fields to interface fields
    const mappedPost = data ? {
      id: data.id,
      slug: data.slug,
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      imageUrl: data.image_url,
      category: data.category,
      publishedAt: data.published_at,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      tags: data.tags
    } : null;

    return mappedPost;
  } catch (error) {
    console.error('Error in getBlogPostBySlug:', error instanceof Error ? error.message : 'Unknown error', error);
    return null;
  }
}

export async function getRecentBlogPosts(limit = 3): Promise<BlogPost[]> {
  try {
    const { data, error } = await Promise.race([
      supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(limit),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 10000)
      )
    ]) as any;

    if (error) {
      console.warn('Error fetching recent blog posts:', error.message);
      return [];
    }

    // Map database fields to interface fields
    const mappedData = data?.map((post: any) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      imageUrl: post.image_url,
      category: post.category,
      publishedAt: post.published_at,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      tags: post.tags
    })) || [];

    return mappedData;
  } catch (error) {
    console.warn('Error in getRecentBlogPosts:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const { data, error } = await Promise.race([
      supabase
        .from('blog_posts')
        .select('*')
        .eq('category', category)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .order('created_at', { ascending: false }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 10000)
      )
    ]) as any;

    if (error) {
      console.warn('Error fetching blog posts by category:', error.message);
      return [];
    }

    // Map database fields to interface fields
    const mappedData = data?.map((post: any) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      imageUrl: post.image_url,
      category: post.category,
      publishedAt: post.published_at,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      tags: post.tags
    })) || [];

    return mappedData;
  } catch (error) {
    console.warn('Error in getBlogPostsByCategory:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}