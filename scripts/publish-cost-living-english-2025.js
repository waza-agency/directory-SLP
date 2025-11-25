const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables must be set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function publishPost() {
  try {
    // Read the markdown content
    const contentPath = path.join(__dirname, '..', 'blog-post-cost-living-2025.md');
    const markdownContent = fs.readFileSync(contentPath, 'utf-8');

    // Convert markdown to basic HTML (simple conversion for now)
    let htmlContent = markdownContent
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      // Tables (basic conversion)
      .replace(/\|/g, '</td><td>')
      .replace(/<td>(.*?)<\/td>/g, (match, p1) => {
        if (p1.includes('---')) return '';
        return match;
      });

    // Wrap in paragraph tags
    htmlContent = '<div class="blog-content"><p>' + htmlContent + '</p></div>';

    // Clean up excessive paragraph tags
    htmlContent = htmlContent
      .replace(/<p><\/p>/g, '')
      .replace(/<p>\s*<h/g, '<h')
      .replace(/<\/h([1-6])>\s*<\/p>/g, '</h$1>');

    const postData = {
      title: 'Cost of Living in San Luis Potosí, Mexico 2025: Complete Budget Breakdown for Expats',
      slug: 'cost-of-living-san-luis-potosi-2025',
      excerpt: 'You can live comfortably in San Luis Potosí for $800-$1,500 USD/month. Complete breakdown of rent, food, healthcare, and transportation costs. Real budget examples and comparisons with US cities.',
      content: htmlContent,
      category: 'Expat Guide',
      tags: ['cost of living', 'expats', 'budget', 'relocation', 'San Luis Potosí', 'housing', 'healthcare', 'retirement'],
      image_url: 'https://images.unsplash.com/photo-1554224311-beee2c97ee47?w=1600&h=900&fit=crop&q=80',
      title_en: 'Cost of Living in San Luis Potosí, Mexico 2025: Complete Budget Breakdown for Expats',
      excerpt_en: 'You can live comfortably in San Luis Potosí for $800-$1,500 USD/month. Complete breakdown of rent, food, healthcare, and transportation costs. Real budget examples and comparisons with US cities.',
      content_en: htmlContent,
      status: 'published',
      published_at: new Date().toISOString()
    };

    console.log('Checking if post already exists...');
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('slug, title')
      .eq('slug', postData.slug)
      .single();

    if (existingPost) {
      console.log(`⚠️  Post with slug "${postData.slug}" already exists.`);
      console.log(`Existing title: "${existingPost.title}"`);
      console.log('\nIf you want to update the post, you must delete it first or use a different slug.');
      return;
    }

    console.log('Inserting new post into database...');
    const { data: insertedPost, error: insertError } = await supabase
      .from('blog_posts')
      .insert(postData)
      .select()
      .single();

    if (insertError) {
      console.error('❌ Error inserting post:', insertError.message);
      throw insertError;
    }

    console.log('\n✅ Post published successfully!');
    console.log('\nPost details:');
    console.log('─'.repeat(60));
    console.log(`ID: ${insertedPost.id}`);
    console.log(`Title: ${insertedPost.title}`);
    console.log(`Slug: ${insertedPost.slug}`);
    console.log(`Category: ${insertedPost.category}`);
    console.log(`Tags: ${insertedPost.tags.join(', ')}`);
    console.log(`Published: ${new Date(insertedPost.published_at).toLocaleString('en-US')}`);
    console.log('─'.repeat(60));
    console.log(`\n🔗 Post URL: /blog/${insertedPost.slug}`);
    console.log(`\nYou can view the post at: http://localhost:3000/blog/${insertedPost.slug}`);
    console.log('\nRemember to run "npm run build" to regenerate static pages.');

  } catch (error) {
    console.error('\n❌ Error publishing post:', error.message);
    process.exit(1);
  }
}

publishPost();
