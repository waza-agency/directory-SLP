require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const SLUG = 'san-luis-potosi-mining-history-baroque-architecture-cultural-legacy';

async function checkContent() {
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('content, content_en')
    .eq('slug', SLUG)
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  // Extract all h2 headings
  const h2Pattern = /<h2[^>]*>(.*?)<\/h2>/gi;

  console.log('=== SPANISH CONTENT H2 HEADINGS ===');
  let match;
  while ((match = h2Pattern.exec(post.content)) !== null) {
    console.log('-', match[1].replace(/<[^>]*>/g, '').trim());
  }

  console.log('\n=== ENGLISH CONTENT H2 HEADINGS ===');
  h2Pattern.lastIndex = 0;
  while ((match = h2Pattern.exec(post.content_en)) !== null) {
    console.log('-', match[1].replace(/<[^>]*>/g, '').trim());
  }

  // Check if Huasteca is mentioned
  console.log('\n=== HUASTECA MENTIONS ===');
  console.log('Spanish content includes "Huasteca":', post.content.includes('Huasteca'));
  console.log('English content includes "Huasteca":', post.content_en.includes('Huasteca'));

  // Show last 500 chars to see end of content
  console.log('\n=== END OF SPANISH CONTENT (last 1000 chars) ===');
  console.log(post.content.slice(-1000));
}

checkContent();
