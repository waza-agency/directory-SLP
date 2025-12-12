require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const SLUG = 'san-luis-potosi-mining-history-baroque-architecture-cultural-legacy';

async function fixOrder() {
  console.log('Fetching current post...');

  const { data: post, error: fetchError } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', SLUG)
    .single();

  if (fetchError || !post) {
    console.error('Error fetching post:', fetchError);
    process.exit(1);
  }

  console.log('Post found. Reorganizing sections...');

  let updatedContent = reorderContent(post.content, 'ES');
  let updatedContentEn = reorderContent(post.content_en, 'EN');

  console.log('Updating post...');

  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      content: updatedContent,
      content_en: updatedContentEn,
      updated_at: new Date().toISOString()
    })
    .eq('slug', SLUG)
    .select()
    .single();

  if (error) {
    console.error('Error updating post:', error);
    process.exit(1);
  }

  console.log('\nPost updated successfully!');
  return data;
}

function reorderContent(content, lang) {
  // Find markers
  const huastecaSectionStart = content.indexOf('<!-- HUASTECA POTOSINA SECTION -->');
  const keyTakeawaysStart = content.indexOf('<!-- KEY TAKEAWAYS -->');
  const conclusionStart = content.indexOf('<!-- CONCLUSION -->');
  const ctaStart = content.indexOf('<!-- CTA -->');

  if (huastecaSectionStart === -1) {
    console.log(`${lang}: Huasteca section not found`);
    return content;
  }

  if (keyTakeawaysStart === -1) {
    console.log(`${lang}: Key Takeaways not found`);
    return content;
  }

  console.log(`${lang}: Found all markers`);
  console.log(`  - Huasteca at: ${huastecaSectionStart}`);
  console.log(`  - Key Takeaways at: ${keyTakeawaysStart}`);
  console.log(`  - Conclusion at: ${conclusionStart}`);
  console.log(`  - CTA at: ${ctaStart}`);

  // Current order is wrong: ... -> Key Takeaways -> Conclusion -> Huasteca -> CTA
  // We want: ... -> Huasteca -> Key Takeaways -> Conclusion -> CTA

  // Extract the Huasteca section (from marker to CTA)
  const huastecaSection = content.substring(huastecaSectionStart, ctaStart);

  // Get content before Key Takeaways
  const beforeKeyTakeaways = content.substring(0, keyTakeawaysStart);

  // Get Key Takeaways + Conclusion (from Key Takeaways to Huasteca section)
  const keyTakeawaysAndConclusion = content.substring(keyTakeawaysStart, huastecaSectionStart);

  // Get CTA and after
  const ctaAndAfter = content.substring(ctaStart);

  // Rebuild in correct order
  const newContent = beforeKeyTakeaways + huastecaSection + keyTakeawaysAndConclusion + ctaAndAfter;

  console.log(`${lang}: Content reordered`);
  return newContent;
}

fixOrder()
  .then(() => {
    console.log('\nNew order:');
    console.log('  1. Introduction & Chapters 1-6');
    console.log('  2. Huasteca Potosina (expanded)');
    console.log('  3. Key Takeaways');
    console.log('  4. Conclusion');
    console.log('  5. CTA');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\nFailed:', err.message);
    process.exit(1);
  });
