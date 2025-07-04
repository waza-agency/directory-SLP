import { createClient, SupabaseClient } from '@supabase/supabase-js';

// --- Type Definitions ---
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  category?: string;
  publishedAt: string;
  createdAt: string;
  tags?: string[];
}

// --- Supabase Client Initialization ---
let supabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (supabase) {
    return supabase;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('CRITICAL: Supabase environment variables are missing.');
    throw new Error('Supabase environment variables are not set.');
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey);
  return supabase;
}

// --- Data Fetching Functions ---

/**
 * Fetches all published blog posts, ordered by publication date.
 * @returns {Promise<BlogPost[]>} A promise that resolves to an array of blog posts.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('blog_posts')
      .select('id, slug, title, content, excerpt, image_url, category, published_at, created_at, tags')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error.message);
      throw new Error(`Database error: ${error.message}`);
    }

    if (!data) {
      return [];
    }

    return data.map((post) => ({
      ...post,
      imageUrl: post.image_url,
      publishedAt: post.published_at,
      createdAt: post.created_at,
    }));
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error(`Failed to get blog posts: ${errorMessage}`);
    return [];
  }
}

/**
 * Fetches a single blog post by its slug.
 * @param {string} slug - The slug of the blog post to fetch.
 * @returns {Promise<BlogPost | null>} A promise that resolves to the blog post or null if not found.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!slug) {
    console.error('getBlogPostBySlug: Slug is required.');
    return null;
  }

  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('blog_posts')
      .select('id, slug, title, content, excerpt, image_url, category, published_at, created_at, tags')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // PostgREST error for "exact one row not found"
        console.warn(`Blog post with slug "${slug}" not found.`);
      } else {
        console.error(`Error fetching post by slug "${slug}":`, error.message);
      }
      return null;
    }

    if (!data) {
      return null;
    }

    return {
      ...data,
      imageUrl: data.image_url,
      publishedAt: data.published_at,
      createdAt: data.created_at,
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error(`Failed to get post by slug "${slug}": ${errorMessage}`);
    return null;
  }
}

/**
 * Fetches multiple blog posts by their slugs.
 * @param {string[]} slugs - An array of slugs to fetch.
 * @returns {Promise<BlogPost[]>} A promise that resolves to an array of blog posts.
 */
export async function getBlogPostsBySlugs(slugs: string[]): Promise<BlogPost[]> {
  if (!slugs || slugs.length === 0) {
    console.error('getBlogPostsBySlugs: Slugs array is required.');
    return [];
  }

  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('blog_posts')
      .select('id, slug, title, content, excerpt, image_url, category, published_at, created_at, tags')
      .in('slug', slugs)
      .eq('status', 'published');

    if (error) {
      console.error('Error fetching posts by slugs:', error.message);
      return [];
    }

    if (!data) {
      return [];
    }

    return data.map((post) => ({
      ...post,
      imageUrl: post.image_url,
      publishedAt: post.published_at,
      createdAt: post.created_at,
    }));
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error(`Failed to get posts by slugs: ${errorMessage}`);
    return [];
  }
}