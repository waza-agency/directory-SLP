const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Environment variables must be set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixAndCleanup() {
  try {
    // First, let's check the current English post content
    console.log('Checking English post...');
    const { data: englishPost, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', 'cost-of-living-san-luis-potosi-2025')
      .single();

    if (fetchError) {
      console.error('Error fetching English post:', fetchError.message);
      throw fetchError;
    }

    console.log('✅ English post found');
    console.log(`Title: ${englishPost.title}`);
    console.log(`Content length: ${englishPost.content.length} characters`);
    console.log(`First 200 chars: ${englishPost.content.substring(0, 200)}...`);

    // Delete Spanish version
    console.log('\nDeleting Spanish version...');
    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('slug', 'costo-de-vida-san-luis-potosi-2025');

    if (deleteError) {
      console.log('Note: Spanish post might not exist or already deleted');
    } else {
      console.log('✅ Spanish post deleted successfully');
    }

    // Check if content needs HTML wrapper
    const needsWrapper = !englishPost.content.includes('<div') &&
                        !englishPost.content.includes('class="');

    if (needsWrapper) {
      console.log('\n⚠️  Content appears to be missing HTML structure');
      console.log('The content needs proper HTML formatting with Tailwind classes');
      console.log('\nWould you like me to regenerate the content with proper HTML?');
      console.log('Run: node scripts/regenerate-blog-content.js');
    } else {
      console.log('\n✅ Content has HTML structure');
    }

    console.log('\n📊 Post Summary:');
    console.log('─'.repeat(60));
    console.log(`English Post: /blog/${englishPost.slug}`);
    console.log(`Image: ${englishPost.image_url}`);
    console.log(`Category: ${englishPost.category}`);
    console.log(`Tags: ${englishPost.tags.join(', ')}`);
    console.log('─'.repeat(60));

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

fixAndCleanup();
