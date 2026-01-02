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

export type SupportedLocale = 'en' | 'es' | 'de' | 'ja';

// Helper to get localized content with fallback to English (base)
// Structure: base fields (title, content, excerpt) = English, _es = Spanish, _de = German
function getLocalizedField(post: Record<string, unknown>, field: string, locale: SupportedLocale): string {
  // English is the base language (no suffix)
  if (locale === 'en') {
    return (post[field] || '') as string;
  }

  // For es/de, try localized field first, fallback to English (base)
  const localizedValue = post[`${field}_${locale}`];
  if (localizedValue) return localizedValue as string;

  // Fallback to English (base)
  return (post[field] || '') as string;
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
 * @param {SupportedLocale} locale - The locale for content (en, es, de). Defaults to 'en'.
 * @returns {Promise<BlogPost[]>} A promise that resolves to an array of blog posts.
 */
export async function getBlogPosts(locale: SupportedLocale = 'en'): Promise<BlogPost[]> {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('blog_posts')
      .select('id, slug, title, content, excerpt, image_url, category, published_at, created_at, tags, title_es, content_es, excerpt_es, title_de, content_de, excerpt_de, title_ja, content_ja, excerpt_ja, meta_title, meta_description, meta_title_es, meta_description_es, meta_title_de, meta_description_de, meta_title_ja, meta_description_ja')
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
      id: post.id,
      slug: post.slug,
      title: getLocalizedField(post, 'title', locale),
      content: getLocalizedField(post, 'content', locale),
      excerpt: getLocalizedField(post, 'excerpt', locale),
      imageUrl: post.image_url,
      category: post.category,
      publishedAt: post.published_at,
      createdAt: post.created_at,
      tags: post.tags,
      metaTitle: getLocalizedField(post, 'meta_title', locale),
      metaDescription: getLocalizedField(post, 'meta_description', locale),
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
 * @param {SupportedLocale} locale - The locale for content (en, es, de). Defaults to 'en'.
 * @returns {Promise<BlogPost | null>} A promise that resolves to the blog post or null if not found.
 */
export async function getBlogPostBySlug(slug: string, locale: SupportedLocale = 'en'): Promise<BlogPost | null> {
  if (!slug) {
    console.error('getBlogPostBySlug: Slug is required.');
    return null;
  }

  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('blog_posts')
      .select('id, slug, title, content, excerpt, image_url, category, published_at, created_at, tags, title_es, content_es, excerpt_es, title_de, content_de, excerpt_de, title_ja, content_ja, excerpt_ja, meta_title, meta_description, meta_title_es, meta_description_es, meta_title_de, meta_description_de, meta_title_ja, meta_description_ja')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
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
      id: data.id,
      slug: data.slug,
      title: getLocalizedField(data, 'title', locale),
      content: getLocalizedField(data, 'content', locale),
      excerpt: getLocalizedField(data, 'excerpt', locale),
      imageUrl: data.image_url,
      category: data.category,
      publishedAt: data.published_at,
      createdAt: data.created_at,
      tags: data.tags,
      metaTitle: getLocalizedField(data, 'meta_title', locale),
      metaDescription: getLocalizedField(data, 'meta_description', locale),
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
 * @param {SupportedLocale} locale - The locale for content (en, es, de). Defaults to 'en'.
 * @returns {Promise<BlogPost[]>} A promise that resolves to an array of blog posts.
 */
export async function getBlogPostsBySlugs(slugs: string[], locale: SupportedLocale = 'en'): Promise<BlogPost[]> {
  if (!slugs || slugs.length === 0) {
    console.error('getBlogPostsBySlugs: Slugs array is required.');
    return [];
  }

  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('blog_posts')
      .select('id, slug, title, content, excerpt, image_url, category, published_at, created_at, tags, title_es, content_es, excerpt_es, title_de, content_de, excerpt_de, title_ja, content_ja, excerpt_ja, meta_title, meta_description, meta_title_es, meta_description_es, meta_title_de, meta_description_de, meta_title_ja, meta_description_ja')
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
      id: post.id,
      slug: post.slug,
      title: getLocalizedField(post, 'title', locale),
      content: getLocalizedField(post, 'content', locale),
      excerpt: getLocalizedField(post, 'excerpt', locale),
      imageUrl: post.image_url,
      category: post.category,
      publishedAt: post.published_at,
      createdAt: post.created_at,
      tags: post.tags,
      metaTitle: getLocalizedField(post, 'meta_title', locale),
      metaDescription: getLocalizedField(post, 'meta_description', locale),
    }));
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error(`Failed to get posts by slugs: ${errorMessage}`);
    return [];
  }
}