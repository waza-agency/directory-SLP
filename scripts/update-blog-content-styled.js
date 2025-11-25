const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { marked } = require('marked');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Environment variables must be set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateContent() {
  try {
    console.log('Reading markdown content...');
    const contentPath = path.join(__dirname, '..', 'blog-post-cost-living-2025.md');
    const markdownContent = fs.readFileSync(contentPath, 'utf-8');

    console.log('Converting markdown to HTML with marked...');

    // Configure marked for better HTML output
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: true,
      mangle: false
    });

    const htmlContent = marked.parse(markdownContent);

    console.log(`Generated HTML length: ${htmlContent.length} characters`);

    // Update the blog post
    console.log('\nUpdating blog post with styled content...');
    const { data: updateData, error: updateError } = await supabase
      .from('blog_posts')
      .update({
        content: htmlContent,
        content_en: htmlContent,
        updated_at: new Date().toISOString()
      })
      .eq('slug', 'cost-of-living-san-luis-potosi-2025')
      .select();

    if (updateError) {
      console.error('❌ Update error:', updateError.message);
      throw updateError;
    }

    console.log('✅ Blog post updated successfully with styled content!');
    console.log('\nUpdated post:');
    console.log('─'.repeat(60));
    console.log(`Title: ${updateData[0].title}`);
    console.log(`Content length: ${updateData[0].content.length} characters`);
    console.log(`First 300 chars: ${updateData[0].content.substring(0, 300)}...`);
    console.log('─'.repeat(60));
    console.log('\n🔗 View post at: http://localhost:3000/blog/cost-of-living-san-luis-potosi-2025');
    console.log('\nThe prose classes in the blog template will handle styling automatically!');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

updateContent();
