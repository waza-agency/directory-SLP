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
  metaTitle?: string;
  metaDescription?: string;
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
 * Fetches published blog posts ordered by published date (newest first).
 *
 * Each returned post prefers English localized fields (`title_en`, `content_en`, `excerpt_en`) when present
 * and maps database snake_case fields to camelCase (including `imageUrl`, `publishedAt`, `createdAt`, `metaTitle`, and `metaDescription`).
 *
 * @returns An array of BlogPost objects; returns an empty array if no posts are found or on failure.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('blog_posts')
      .select('id, slug, title, content, excerpt, image_url, category, published_at, created_at, tags, title_en, content_en, excerpt_en, meta_title, meta_description')
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
      title: post.title_en || post.title,
      content: post.content_en || post.content,
      excerpt: post.excerpt_en || post.excerpt,
      imageUrl: post.image_url,
      publishedAt: post.published_at,
      createdAt: post.created_at,
      metaTitle: post.meta_title,
      metaDescription: post.meta_description,
    }));
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error(`Failed to get blog posts: ${errorMessage}`);
    return [];
  }
}

/**
 * Retrieve a published blog post that matches the given slug.
 *
 * @param slug - The slug identifying the blog post.
 * @returns The matching `BlogPost` with English title/content/excerpt preferred and database fields mapped to `imageUrl`, `publishedAt`, `createdAt`, `metaTitle`, and `metaDescription`, or `null` if no published post is found.
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
      .select('id, slug, title, content, excerpt, image_url, category, published_at, created_at, tags, title_en, content_en, excerpt_en, meta_title, meta_description')
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
      title: data.title_en || data.title,
      content: data.content_en || data.content,
      excerpt: data.excerpt_en || data.excerpt,
      imageUrl: data.image_url,
      publishedAt: data.published_at,
      createdAt: data.created_at,
      metaTitle: data.meta_title,
      metaDescription: data.meta_description,
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error(`Failed to get post by slug "${slug}": ${errorMessage}`);
    return null;
  }
}

/**
 * Fetches published blog posts that match the provided slugs.
 *
 * @param slugs - An array of post slugs to retrieve; if empty or falsy, the function returns an empty array.
 * @returns An array of `BlogPost` objects for the matching published posts, or an empty array if none are found or an error occurs.
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
      .select('id, slug, title, content, excerpt, image_url, category, published_at, created_at, tags, title_en, content_en, excerpt_en, meta_title, meta_description')
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
      title: post.title_en || post.title,
      content: post.content_en || post.content,
      excerpt: post.excerpt_en || post.excerpt,
      imageUrl: post.image_url,
      publishedAt: post.published_at,
      createdAt: post.created_at,
      metaTitle: post.meta_title,
      metaDescription: post.meta_description,
    }));
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error(`Failed to get posts by slugs: ${errorMessage}`);
    return [];
  }
}