const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function findPost() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, content')
    .or('title.ilike.%leonora%,title.ilike.%carrington%,slug.ilike.%leonora%,slug.ilike.%carrington%');

  if (error) {
    console.error('Error:', error);
    return;
  }

  if (data && data.length > 0) {
    data.forEach(post => {
      console.log(`\n=== Post Found ===`);
      console.log(`ID: ${post.id}`);
      console.log(`Slug: ${post.slug}`);
      console.log(`Title: ${post.title}`);
      console.log(`\nContent preview (first 2000 chars):`);
      console.log(post.content?.substring(0, 2000));
      console.log('\n... (content continues)');
    });
  } else {
    console.log('No posts found with leonora or carrington');

    // List all posts
    const { data: allPosts } = await supabase
      .from('blog_posts')
      .select('id, slug, title')
      .order('created_at', { ascending: false })
      .limit(20);

    console.log('\nRecent posts:');
    allPosts?.forEach(p => console.log(`- ${p.slug}: ${p.title}`));
  }
}

findPost().catch(console.error);
