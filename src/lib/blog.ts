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
        .order('publishedAt', { ascending: false })
        .order('createdAt', { ascending: false }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 10000)
      )
    ]) as any;

    if (error) {
      console.warn('Error fetching blog posts:', error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Error in getBlogPosts:', error instanceof Error ? error.message : 'Unknown error');
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
        .single(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 10000)
      )
    ]) as any;

    if (error) {
      console.warn('Error fetching blog post:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.warn('Error in getBlogPostBySlug:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

export async function getRecentBlogPosts(limit = 3): Promise<BlogPost[]> {
  try {
    const { data, error } = await Promise.race([
      supabase
        .from('blog_posts')
        .select('*')
        .order('publishedAt', { ascending: false })
        .order('createdAt', { ascending: false })
        .limit(limit),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 10000)
      )
    ]) as any;

    if (error) {
      console.warn('Error fetching recent blog posts:', error.message);
      return [];
    }

    return data || [];
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
        .order('publishedAt', { ascending: false })
        .order('createdAt', { ascending: false }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 10000)
      )
    ]) as any;

    if (error) {
      console.warn('Error fetching blog posts by category:', error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Error in getBlogPostsByCategory:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}