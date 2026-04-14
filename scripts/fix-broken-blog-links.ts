/**
 * Fix broken internal links in blog post content stored in Supabase.
 * Run with: npx tsx scripts/fix-broken-blog-links.ts
 */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Map of broken links to their correct replacements
const linkFixes: Record<string, string> = {
  '/blog/costo-de-vida-san-luis-potosi-2025': '/blog/cost-of-living-san-luis-potosi-2025',
  '/blog/costo-de-vida-san-luis-potosi-guia-completa': '/blog/cost-of-living-san-luis-potosi-2025',
  '/blog/mejores-colonias-san-luis-potosi-donde-vivir': '/resources/neighborhoods-san-luis-potosi',
  '/blog/centro-historico-san-luis-potosi-guia': '/centro-historico',
  '/directory': '/places',
  '/copa-potosi-2026': '/events',
  '/category/tours': '/cultural-tours',
  '/guides"': '/guides/foodie-guide"',
  "/guides'": "/guides/foodie-guide'",
  '/category/restaurants-and-bars': '/restaurants',
};

async function fixBrokenLinks() {
  console.log('Fetching blog posts from Supabase...');

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, slug, content, content_es, content_de, content_ja')
    .eq('status', 'published');

  if (error) {
    console.error('Error fetching posts:', error.message);
    process.exit(1);
  }

  if (!posts || posts.length === 0) {
    console.log('No posts found.');
    return;
  }

  console.log(`Found ${posts.length} published posts. Scanning for broken links...\n`);

  let totalFixes = 0;

  for (const post of posts) {
    const contentFields = ['content', 'content_es', 'content_de', 'content_ja'] as const;
    const updates: Record<string, string> = {};
    let postFixCount = 0;

    for (const field of contentFields) {
      let content = post[field];
      if (!content) continue;

      let modified = false;
      for (const [broken, fixed] of Object.entries(linkFixes)) {
        if (content.includes(broken)) {
          console.log(`  [${post.slug}] ${field}: "${broken}" → "${fixed}"`);
          content = content.split(broken).join(fixed);
          modified = true;
          postFixCount++;
        }
      }

      if (modified) {
        updates[field] = content;
      }
    }

    if (Object.keys(updates).length > 0) {
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', post.id);

      if (updateError) {
        console.error(`  ERROR updating ${post.slug}: ${updateError.message}`);
      } else {
        console.log(`  ✓ Updated ${post.slug} (${postFixCount} fixes)\n`);
        totalFixes += postFixCount;
      }
    }
  }

  console.log(`\nDone. Applied ${totalFixes} fixes across all posts.`);
}

fixBrokenLinks();
