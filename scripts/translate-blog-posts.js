#!/usr/bin/env node
/**
 * Script para traducir blog posts a español y alemán usando Claude API
 *
 * Uso:
 *   node scripts/translate-blog-posts.js                    # Traduce todos los posts sin traducción
 *   node scripts/translate-blog-posts.js --slug=my-post     # Traduce un post específico
 *   node scripts/translate-blog-posts.js --lang=es          # Solo traduce a español
 *   node scripts/translate-blog-posts.js --lang=de          # Solo traduce a alemán
 *   node scripts/translate-blog-posts.js --dry-run          # Muestra qué se traduciría sin guardar
 *
 * Requiere: ANTHROPIC_API_KEY en .env
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const Anthropic = require('@anthropic-ai/sdk');

// Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

if (!anthropicApiKey) {
  console.error('❌ Missing ANTHROPIC_API_KEY in .env');
  console.error('   Add: ANTHROPIC_API_KEY=sk-ant-...');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const anthropic = new Anthropic({ apiKey: anthropicApiKey });

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  slug: args.find(a => a.startsWith('--slug='))?.split('=')[1],
  lang: args.find(a => a.startsWith('--lang='))?.split('=')[1],
  dryRun: args.includes('--dry-run'),
  force: args.includes('--force'),
};

const LANGUAGES = {
  es: { name: 'Spanish', nativeName: 'Español' },
  de: { name: 'German', nativeName: 'Deutsch' },
};

/**
 * Translate text using Claude API
 */
async function translateText(text, targetLang, fieldType = 'content') {
  if (!text || text.trim() === '') return '';

  const langInfo = LANGUAGES[targetLang];
  const isHtml = fieldType === 'content';

  const systemPrompt = isHtml
    ? `You are a professional translator. Translate the following HTML content to ${langInfo.name} (${langInfo.nativeName}).
       IMPORTANT RULES:
       - Preserve ALL HTML tags, attributes, and structure exactly as they are
       - Only translate the text content between tags
       - Keep proper nouns, brand names, and place names in their original form unless they have official translations
       - Maintain the same tone and style
       - For San Luis Potosí specific terms, keep them in Spanish with translations in parentheses if helpful
       - Return ONLY the translated HTML, no explanations`
    : `You are a professional translator. Translate the following text to ${langInfo.name} (${langInfo.nativeName}).
       IMPORTANT RULES:
       - Keep proper nouns, brand names, and place names in their original form unless they have official translations
       - Maintain the same tone and style
       - Return ONLY the translated text, no explanations`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      messages: [
        { role: 'user', content: text }
      ],
      system: systemPrompt,
    });

    return response.content[0].text;
  } catch (error) {
    console.error(`   ❌ Translation error: ${error.message}`);
    throw error;
  }
}

/**
 * Translate a single blog post
 */
async function translatePost(post, targetLang) {
  console.log(`\n📝 Translating: "${post.title}" to ${LANGUAGES[targetLang].name}`);

  const translations = {};

  // Translate title
  console.log('   → Translating title...');
  translations[`title_${targetLang}`] = await translateText(post.title, targetLang, 'title');

  // Translate excerpt
  if (post.excerpt) {
    console.log('   → Translating excerpt...');
    translations[`excerpt_${targetLang}`] = await translateText(post.excerpt, targetLang, 'excerpt');
  }

  // Translate content (can be long, so we handle it carefully)
  if (post.content) {
    console.log('   → Translating content (this may take a moment)...');
    translations[`content_${targetLang}`] = await translateText(post.content, targetLang, 'content');
  }

  // Translate meta fields
  if (post.meta_title) {
    console.log('   → Translating meta title...');
    translations[`meta_title_${targetLang}`] = await translateText(post.meta_title, targetLang, 'title');
  }

  if (post.meta_description) {
    console.log('   → Translating meta description...');
    translations[`meta_description_${targetLang}`] = await translateText(post.meta_description, targetLang, 'description');
  }

  return translations;
}

/**
 * Check if post needs translation for a language
 */
function needsTranslation(post, lang) {
  return !post[`title_${lang}`] || !post[`content_${lang}`];
}

/**
 * Main execution
 */
async function main() {
  console.log('🌐 Blog Post Translation Script');
  console.log('================================\n');

  if (options.dryRun) {
    console.log('🔍 DRY RUN MODE - No changes will be saved\n');
  }

  // Fetch posts
  let query = supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, content, meta_title, meta_description, title_es, content_es, title_de, content_de')
    .eq('status', 'published');

  if (options.slug) {
    query = query.eq('slug', options.slug);
  }

  const { data: posts, error } = await query;

  if (error) {
    console.error('❌ Error fetching posts:', error.message);
    process.exit(1);
  }

  if (!posts || posts.length === 0) {
    console.log('ℹ️  No posts found');
    return;
  }

  console.log(`📚 Found ${posts.length} post(s)\n`);

  // Determine which languages to translate
  const langsToTranslate = options.lang ? [options.lang] : ['es', 'de'];

  let translatedCount = 0;
  let skippedCount = 0;

  for (const post of posts) {
    for (const lang of langsToTranslate) {
      if (!options.force && !needsTranslation(post, lang)) {
        console.log(`⏭️  Skipping "${post.title}" (${lang}) - already translated`);
        skippedCount++;
        continue;
      }

      try {
        const translations = await translatePost(post, lang);

        if (options.dryRun) {
          console.log(`   ✅ Would save translations for ${lang}:`);
          console.log(`      - title_${lang}: ${translations[`title_${lang}`]?.substring(0, 50)}...`);
        } else {
          // Save to database
          const { error: updateError } = await supabase
            .from('blog_posts')
            .update(translations)
            .eq('id', post.id);

          if (updateError) {
            console.error(`   ❌ Error saving: ${updateError.message}`);
          } else {
            console.log(`   ✅ Saved ${lang} translation`);
            translatedCount++;
          }
        }

        // Rate limiting - wait between translations
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error(`   ❌ Failed to translate: ${error.message}`);
      }
    }
  }

  console.log('\n================================');
  console.log(`✅ Translated: ${translatedCount}`);
  console.log(`⏭️  Skipped: ${skippedCount}`);
  console.log('================================\n');
}

main().catch(console.error);
