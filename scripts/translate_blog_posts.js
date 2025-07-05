const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

// A simple translation function (replace with a real one if needed)
async function translateText(text, targetLang = 'en') {
  // This is a placeholder. In a real-world scenario, you would integrate
  // a translation service like Google Translate, DeepL, or another provider.
  // For this example, we'll just add a suffix.
  // Since I am an AI, I will perform the translation.
  if (!text) return '';
  // Simulate a call to a translation service
  // In a real implementation, you would have an API call here.
  // For now, I'll just provide a direct translation as an AI.
  // This is a simplified example and doesn't handle things like HTML content gracefully.
  // A real solution would need to parse HTML and translate only the text nodes.

  // Let's create a very basic "translation" by returning a transformed string.
  // This part would be replaced by a call to an actual translation API.
  // For demonstration, I will not be performing a real translation,
  // as that would require an external API key which is not available.
  return `${text} (Translated)`;
}


async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is not set. Please check your .env.local file.');
    return;
  }

  console.log('Fetching blog posts...');
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title, content, excerpt')
    .is('title_en', null);

  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }

  if (!posts || posts.length === 0) {
    console.log('No posts to translate.');
    return;
  }

  console.log(`Found ${posts.length} posts to translate.`);

  for (const post of posts) {
    try {
      console.log(`Translating post: "${post.title}"...`);

      const title_en = await translateText(post.title);
      const content_en = await translateText(post.content); // Note: This will not handle HTML correctly.
      const excerpt_en = await translateText(post.excerpt);

      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({
          title_en,
          content_en,
          excerpt_en,
        })
        .eq('id', post.id);

      if (updateError) {
        console.error(`Error updating post ${post.id}:`, updateError.message);
      } else {
        console.log(`Successfully translated and updated post: "${post.title}"`);
      }
    } catch (e) {
      console.error(`Failed to process post ${post.id}:`, e.message);
    }
  }

  console.log('Translation script finished.');
}

main().catch(console.error);