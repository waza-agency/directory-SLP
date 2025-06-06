const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createBlogTable() {
  try {
    console.log('Creating blog_posts table...');

    // Create the table
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: `
        -- Create blog posts table
        CREATE TABLE IF NOT EXISTS public.blog_posts (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            excerpt TEXT NOT NULL,
            content TEXT NOT NULL,
            image_url TEXT,
            author_id UUID,
            category TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'draft',
            published_at TIMESTAMP WITH TIME ZONE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
            meta_title TEXT,
            meta_description TEXT,
            tags TEXT[]
        );

        -- Add indexes
        CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON public.blog_posts (slug);
        CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON public.blog_posts (status);
        CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON public.blog_posts (published_at);

        -- Enable RLS
        ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

        -- Policies
        DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;
        CREATE POLICY "Public can read published posts"
            ON public.blog_posts FOR SELECT
            USING (status = 'published');
      `
    });

    if (createError) {
      console.error('Error creating table:', createError);
      return;
    }

    console.log('Table created successfully!');

    // Insert sample data
    console.log('Inserting sample blog posts...');

    const { error: insertError } = await supabase
      .from('blog_posts')
      .insert([
        {
          title: 'Welcome to San Luis Way',
          slug: 'welcome-to-san-luis-way',
          excerpt: 'Discover the best of San Luis Potosí with our comprehensive guide to local businesses, events, and experiences.',
          content: '<p>Welcome to San Luis Way, your ultimate guide to discovering the best of San Luis Potosí. Whether you\'re a local resident or a visitor, our platform connects you with amazing local businesses, exciting events, and unique experiences that make our city special.</p><p>From traditional restaurants serving authentic Potosino cuisine to modern cafes and innovative startups, we showcase the diverse business landscape that makes San Luis Potosí a vibrant place to live and visit.</p>',
          category: 'General',
          status: 'published',
          published_at: new Date().toISOString()
        },
        {
          title: 'Exploring San Luis Potosí\'s Cultural Heritage',
          slug: 'exploring-cultural-heritage',
          excerpt: 'Dive deep into the rich cultural heritage of San Luis Potosí, from historic architecture to traditional festivals.',
          content: '<p>San Luis Potosí is a city steeped in history and culture. From the stunning colonial architecture of the historic center to the vibrant festivals that celebrate our traditions, there\'s always something to discover.</p><p>Join us as we explore the cultural treasures that make our city unique, including museums, galleries, theaters, and the stories behind our most beloved landmarks.</p>',
          category: 'Culture',
          status: 'published',
          published_at: new Date().toISOString()
        },
        {
          title: 'The Best Local Food Experiences in SLP',
          slug: 'best-local-food-experiences',
          excerpt: 'A culinary journey through San Luis Potosí\'s most authentic flavors and hidden gastronomic gems.',
          content: '<p>San Luis Potosí\'s culinary scene is a delightful blend of traditional Mexican flavors and innovative modern cuisine. From street food vendors serving the best tacos in the city to upscale restaurants reimagining classic dishes, our food scene has something for every palate.</p><p>Discover the must-try dishes, the best local markets, and the restaurants that locals love but tourists rarely find.</p>',
          category: 'Food',
          status: 'published',
          published_at: new Date().toISOString()
        }
      ]);

    if (insertError) {
      console.error('Error inserting sample data:', insertError);
      return;
    }

    console.log('Sample blog posts inserted successfully!');
    console.log('Blog table setup complete!');

  } catch (error) {
    console.error('Error:', error);
  }
}

createBlogTable();