require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// SEO data for posts that need fixing
const seoFixes = [
  {
    slug: 'leonora-carrington-san-luis-potosi-museo-centro-artes-surrealism',
    meta_title: 'Leonora Carrington in SLP | Surrealism Museum Guide',
    meta_description: 'Discover Leonora Carrington\'s surrealist legacy in San Luis Potosí. Visit the museum, explore her art, and learn why this British-Mexican artist made SLP her home.'
  },
  {
    slug: 'san-luis-potosi-mining-history-baroque-architecture-cultural-legacy',
    meta_title: 'SLP Mining History & Baroque Architecture Guide',
    meta_description: 'Explore San Luis Potosí\'s rich mining heritage and stunning baroque architecture. Discover the cultural legacy that shaped this historic Mexican city.'
  },
  {
    slug: 'top-5-cozy-cafes-winter-san-luis-potosi',
    meta_title: 'Top 5 Cozy Cafés in San Luis Potosí | Winter Guide',
    meta_description: 'Find the coziest cafés in San Luis Potosí for winter. From specialty coffee to warm atmospheres, discover the best spots to escape the cold in SLP.'
  },
  {
    slug: 'cost-of-living-san-luis-potosi-2025',
    meta_title: 'Cost of Living in SLP 2025 | Expat Budget Guide',
    meta_description: 'Complete 2025 cost of living breakdown for San Luis Potosí. Housing, food, transport, healthcare costs explained for expats and digital nomads.'
  },
  {
    slug: 'san-luis-rey-tranvia',
    meta_title: 'San Luis Rey Tranvía | Historic City Tour Guide',
    meta_description: 'Take the San Luis Rey tranvía tour through historic San Luis Potosí. Discover landmarks, learn history, and see the city\'s best attractions by trolley.',
    tags: ['tranvía', 'tours', 'historic center', 'San Luis Rey', 'city tour', 'attractions', 'sightseeing']
  },
  {
    slug: 'la-gran-via',
    meta_title: 'La Gran Vía Restaurant SLP | Spanish Cuisine Review',
    meta_description: 'La Gran Vía brings authentic Spanish cuisine to San Luis Potosí. Discover this historic restaurant\'s menu, atmosphere, and why locals love it.',
    tags: ['restaurant', 'Spanish cuisine', 'La Gran Vía', 'dining', 'historic restaurant', 'Centro Histórico', 'tapas']
  },
  {
    slug: 'corazon-de-xoconostle',
    meta_title: 'Corazón de Xoconostle | Adventure Tours in SLP',
    meta_description: 'Experience adventure with Corazón de Xoconostle in San Luis Potosí. Hiking, cultural tours, and authentic experiences in the Potosino highlands.',
    tags: ['adventure', 'tours', 'Corazón de Xoconostle', 'hiking', 'ecotourism', 'Real de Catorce', 'Huasteca Potosina', 'outdoor activities']
  }
];

/**
 * Apply the predefined SEO updates in `seoFixes` to matching blog posts in the Supabase `blog_posts` table.
 *
 * For each entry in `seoFixes`, updates `meta_title`, `meta_description`, and `updated_at`, and sets `tags` when provided.
 * Logs per-item progress and errors to the console.
 */
async function fixBlogSEO() {
  console.log('🔧 Fixing Blog Posts SEO...\n');

  for (const fix of seoFixes) {
    console.log(`\nUpdating: ${fix.slug}`);

    const updateData = {
      meta_title: fix.meta_title,
      meta_description: fix.meta_description,
      updated_at: new Date().toISOString()
    };

    // Add tags if specified
    if (fix.tags) {
      updateData.tags = fix.tags;
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('slug', fix.slug)
      .select('slug, meta_title, meta_description, tags')
      .single();

    if (error) {
      console.error(`  ❌ Error: ${error.message}`);
    } else {
      console.log(`  ✅ Updated successfully`);
      console.log(`     Meta Title: ${data.meta_title}`);
      console.log(`     Meta Desc: ${data.meta_description.substring(0, 50)}...`);
      if (fix.tags) {
        console.log(`     Tags: ${data.tags.length} tags added`);
      }
    }
  }

  console.log('\n✅ SEO fixes complete!');
}

fixBlogSEO().catch(console.error);