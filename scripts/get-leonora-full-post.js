const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function getFullPost() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', 'd2ea0f05-5324-4ced-ad37-19b322be66e1')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  // Save full content to file for review
  fs.writeFileSync('leonora-post-content.html', data.content);
  console.log('Full content saved to leonora-post-content.html');
  console.log('\nPost metadata:');
  console.log('- Title:', data.title);
  console.log('- Slug:', data.slug);
  console.log('- Featured Image:', data.featured_image);
  console.log('- Content length:', data.content?.length, 'characters');
}

getFullPost().cah(console.error);
