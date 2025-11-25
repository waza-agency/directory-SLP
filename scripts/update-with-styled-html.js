const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Environment variables must be set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateWithStyledHTML() {
  try {
    console.log('Reading styled HTML content...');
    const contentPath = path.join(__dirname, '..', 'cost-living-styled-content.html');
    const htmlContent = fs.readFileSync(contentPath, 'utf-8');

    console.log(`Content length: ${htmlContent.length} characters`);

    console.log('\nUpdating blog post with fully styled content...');
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

    console.log('✅ Blog post updated successfully with STYLED content!');
    console.log('\n🎨 Styling includes:');
    console.log('  ✓ Colorful gradient tables (blue headers)');
    console.log('  ✓ Neighborhood cards with colored borders');
    console.log('  ✓ Budget comparison tables with hover effects');
    console.log('  ✓ Statistical highlights with large numbers');
    console.log('  ✓ Colored callout boxes (blue, green, purple, amber)');
    console.log('  ✓ Section dividers with decorative elements');
    console.log('  ✓ FAQ accordions with hover states');
    console.log('  ✓ Key takeaways box with gradient background');
    console.log('  ✓ CTAs with gradient buttons');
    console.log('\n────────────────────────────────────────────────────────────');
    console.log(`Title: ${updateData[0].title}`);
    console.log(`Content length: ${updateData[0].content.length} characters`);
    console.log('────────────────────────────────────────────────────────────');
    console.log('\n🔗 View the beautifully styled post at:');
    console.log('   http://localhost:3000/blog/cost-of-living-san-luis-potosi-2025');
    console.log('\nThe post now follows the Deep Dive Style Guide with rich colors and design!');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

updateWithStyledHTML();
