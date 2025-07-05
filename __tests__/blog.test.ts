import { getBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { supabase } from '@/lib/supabase';

// Mock the Supabase client
jest.mock('@/lib/supabase');

const mockPost = {
  id: '1',
  slug: 'test-post',
  title: 'Test Post Spanish',
  content: '<p>Hola Mundo</p>',
  excerpt: 'Un extracto',
  title_en: 'Test Post English',
  content_en: '<p>Hello World</p>',
  excerpt_en: 'An excerpt',
  image_url: 'http://example.com/image.jpg',
  category: 'Testing',
  published_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  status: 'published',
  tags: ['test', 'mock'],
};

const mockPostWithoutTranslation = {
    ...mockPost,
    id: '2',
    slug: 'test-post-no-translation',
    title_en: null,
    content_en: null,
    excerpt_en: null,
};

describe('Blog Data Fetching', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (supabase.from as jest.Mock).mockClear();
  });

  // Test getBlogPosts
  it('should fetch all published blog posts correctly', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      // Mock the resolved value for the query
      then: (resolve) => resolve({ data: [mockPost, mockPostWithoutTranslation], error: null }),
    });

    const posts = await getBlogPosts();

    expect(supabase.from).toHaveBeenCalledWith('blog_posts');
    expect(posts).toHaveLength(2);
    expect(posts[0].title).toBe('Test Post English');
    expect(posts[0].imageUrl).toBe(mockPost.image_url);
    expect(posts[1].title).toBe('Test Post Spanish');
  });

  // Test getBlogPostBySlug
  it('should fetch a single post by slug and return English content', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockPost, error: null }),
    });

    const post = await getBlogPostBySlug('test-post');

    expect(supabase.from).toHaveBeenCalledWith('blog_posts');
    expect(post).not.toBeNull();
    expect(post?.slug).toBe('test-post');
    expect(post?.content).toBe('<p>Hello World</p>');
  });

  it('should fetch a single post by slug and fallback to Spanish content', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockPostWithoutTranslation, error: null }),
    });

    const post = await getBlogPostBySlug('test-post-no-translation');

    expect(supabase.from).toHaveBeenCalledWith('blog_posts');
    expect(post).not.toBeNull();
    expect(post?.slug).toBe('test-post-no-translation');
    expect(post?.content).toBe('<p>Hola Mundo</p>');
  });

  // Test getBlogPostBySlug with a non-existent slug
  it('should return null if post is not found', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Not found', code: 'PGRST116' } }),
    });

    const post = await getBlogPostBySlug('non-existent-slug');
    expect(post).toBeNull();
  });

  // Test handling of database errors
  it('should return an empty array if there is a database error in getBlogPosts', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      then: (resolve) => resolve({ data: null, error: new Error('Database connection failed') }),
    });

    const posts = await getBlogPosts();
    expect(posts).toEqual([]);
  });
});