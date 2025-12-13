require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const SLUG = 'san-luis-potosi-mining-history-baroque-architecture-cultural-legacy';

async function fixHuastecaContent() {
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

  console.log('Current post found:', post.title);

  let updatedContent = post.content;
  let updatedContentEn = post.content_en;

  // 1. Remove the Tamul waterfall image (Spanish)
  const tamulFigureES = /<figure class="my-8">\s*<img src="[^"]*tamul-waterfall\.jpg"[^>]*>\s*<figcaption[^>]*>[^<]*Tamul[^<]*<\/figcaption>\s*<\/figure>/gi;
  updatedContent = updatedContent.replace(tamulFigureES, '');
  console.log('Removed Tamul waterfall image (Spanish)');

  // 2. Remove the Tamul waterfall image (English)
  const tamulFigureEN = /<figure class="my-8">\s*<img src="[^"]*tamul-waterfall\.jpg"[^>]*>\s*<figcaption[^>]*>[^<]*Tamul[^<]*<\/figcaption>\s*<\/figure>/gi;
  updatedContentEn = updatedContentEn.replace(tamulFigureEN, '');
  console.log('Removed Tamul waterfall image (English)');

  // 3. Remove the turquoise river image too (both languages)
  const rioFigure = /<figure class="my-8">\s*<img src="[^"]*rio-huasteca-turquesa\.jpg"[^>]*>\s*<figcaption[^>]*>[^<]*<\/figcaption>\s*<\/figure>/gi;
  updatedContent = updatedContent.replace(rioFigure, '');
  updatedContentEn = updatedContentEn.replace(rioFigure, '');
  console.log('Removed turquoise river images');

  // 4. Fix "Náhuatl" -> "Nahua" when referring to people (Spanish)
  // Header: "Cultura Teenek y Náhuatl" -> "Cultura Teenek y Nahua"
  updatedContent = updatedContent.replace(
    /Cultura Teenek y Náhuatl/g,
    'Cultura Teenek y Nahua'
  );
  // "los Náhuatl de la Sierra" -> "los Nahuas de la Sierra"
  updatedContent = updatedContent.replace(
    /los Náhuatl de la Sierra/g,
    'los Nahuas de la Sierra'
  );

  // 5. Fix English version
  // Header: "Teenek and Náhuatl Culture" -> "Teenek and Nahua Culture"
  updatedContentEn = updatedContentEn.replace(
    /Teenek and Náhuatl Culture/g,
    'Teenek and Nahua Culture'
  );
  // "the Náhuatl of the Sierra" -> "the Nahuas of the Sierra"
  updatedContentEn = updatedContentEn.replace(
    /the Náhuatl of the Sierra/g,
    'the Nahuas of the Sierra'
  );

  console.log('Fixed Náhuatl -> Nahua/Nahuas terminology');

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
  console.log('Post URL: https://www.sanluisway.com/blog/' + data.slug);
  return data;
}

fixHuastecaContent()
  .then(() => {
    console.log('\nChanges made:');
    console.log('1. Removed Tamul waterfall image');
    console.log('2. Removed turquoise river image');
    console.log('3. Fixed Nahua terminology (people are Nahua/Nahuas, language is náhuatl)');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\nFailed:', err.message);
    process.exit(1);
  });
