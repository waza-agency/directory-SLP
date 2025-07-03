import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with better error handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

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
    console.log('getBlogPosts: Starting fetch...');

    const { data, error } = await supabase
      .from('blog_posts')
      .select("*")
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('getBlogPosts: Database error:', error);
      return [];
    }

    if (!data || data.length === 0) {
      console.warn('getBlogPosts: No blog posts found');
      return [];
    }

    // Map database fields to interface fields
    const mappedData = data.map((post: any) => ({
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
    }));

    console.log(`getBlogPosts: Successfully fetched ${mappedData.length} posts`);
    return mappedData;
  } catch (error) {
    console.error('getBlogPosts: Unexpected error:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    console.log(`getBlogPostBySlug: Fetching post with slug: ${slug}`);

    if (!slug) {
      console.error('getBlogPostBySlug: No slug provided');
      return null;
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select("*")
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      console.error(`getBlogPostBySlug: Could not find post with slug "${slug}".`, error || 'No data returned.');

      // --- DEBUGGING: Let's see what slugs ARE available ---
      console.log('--- DEBUG: Fetching all available published slugs for comparison ---');
      const { data: allPosts, error: allPostsError } = await supabase
        .from('blog_posts')
        .select('slug, title')
        .eq('status', 'published');

      if (allPostsError) {
        console.error('--- DEBUG: Failed to fetch slugs for debugging:', allPostsError);
      } else if (allPosts && allPosts.length > 0) {
        console.log(`--- DEBUG: Found ${allPosts.length} published slugs:`);
        allPosts.forEach(p => console.log(`  -> "${p.slug}" (Title: ${p.title})`));
      } else {
        console.log('--- DEBUG: No published posts with slugs found at all.');
      }
      console.log('--- END DEBUG ---');
      return null;
    }

    // Map database fields to interface fields
    const mappedPost = {
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
    };

    console.log(`getBlogPostBySlug: Successfully fetched post: ${mappedPost.title}`);
    return mappedPost;
  } catch (error) {
    console.error('getBlogPostBySlug: Unexpected error:', error);
    return null;
  }
}

export async function getRecentBlogPosts(limit = 3): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select("*")
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.warn('getRecentBlogPosts: Database error:', error);
      return [];
    }

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
    console.warn('getRecentBlogPosts: Unexpected error:', error);
    return [];
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select("*")
      .eq('category', category)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('getBlogPostsByCategory: Database error:', error);
      return [];
    }

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
    console.warn('getBlogPostsByCategory: Unexpected error:', error);
    return [];
  }
}