require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const SLUG = 'san-luis-potosi-historia-minera-arquitectura-barroca-legado-cultural';

async function removeTOC() {
  console.log('Fetching current post content...');
  const { data: post, error: fetchError } = await supabase
    .from('blog_posts')
    .select('content, content_en')
    .eq('slug', SLUG)
    .single();

  if (fetchError) {
    console.error('Error fetching post:', fetchError);
    process.exit(1);
  }

  // Check for any TOC-like elements
  console.log('\nSearching for TOC elements in content...');

  // Pattern to match TOC sections (sticky, not-prose with navigation)
  const tocPatterns = [
    // Sticky TOC with navigation
    /<div class="not-prose sticky[^>]*>[\s\S]*?<\/nav>[\s\S]*?<\/div>/g,
    // Any remaining TOC markers
    /<!-- TABLE OF CONTENTS -->[\s\S]*?(?=<!-- [A-Z]|<section)/g,
  ];

  let updatedContent = post.content;
  let updatedContentEn = post.content_en;

  tocPatterns.forEach((pattern, index) => {
    const matchesEs = updatedContent.match(pattern);
    const matchesEn = updatedContentEn.match(pattern);

    if (matchesEs) {
      console.log(`Found ${matchesEs.length} TOC element(s) in Spanish content (pattern ${index + 1})`);
      updatedContent = updatedContent.replace(pattern, '');
    }
    if (matchesEn) {
      console.log(`Found ${matchesEn.length} TOC element(s) in English content (pattern ${index + 1})`);
      updatedContentEn = updatedContentEn.replace(pattern, '');
    }
  });

  // Also check for any "En Este Artículo" or "In This Article" sections
  const articleTocPattern = /<div[^>]*>[\s\S]*?(?:En Este Artículo|In This Article)[\s\S]*?<\/nav>[\s\S]*?<\/div>/gi;

  if (articleTocPattern.test(updatedContent)) {
    console.log('Found "En Este Artículo" TOC section');
    updatedContent = updatedContent.replace(articleTocPattern, '');
  }

  if (articleTocPattern.test(updatedContentEn)) {
    console.log('Found "In This Article" TOC section');
    updatedContentEn = updatedContentEn.replace(articleTocPattern, '');
  }

  if (updatedContent === post.content && updatedContentEn === post.content_en) {
    console.log('\nNo TOC elements found to remove.');
    console.log('\nFirst 2000 chars of content for inspection:');
    console.log(post.content.substring(0, 2000));
    return;
  }

  console.log('\nUpdating post without TOC...');
  const { error: updateError } = await supabase
    .from('blog_posts')
    .update({
      content: updatedContent,
      content_en: updatedContentEn
    })
    .eq('slug', SLUG);

  if (updateError) {
    console.error('Error updating post:', updateError);
    process.exit(1);
  }

  console.log('\nTOC removed successfully!');
}

removeTOC()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Failed:', err.message);
    process.exit(1);
  });
