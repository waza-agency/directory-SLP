#!/usr/bin/env node
/**
 * Script to fix blog posts with incorrect language content in base fields
 * Base fields should contain English, _es fields should contain Spanish
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const Anthropic = require('@anthropic-ai/sdk');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function isSpanish(text) {
  if (!text) return false;
  const spanishPatterns = /[áéíóúñ¿¡]|^(El|La|Los|Las|Un|Una|Cómo|Qué|Por qué|Desde|Arte|Guía|Inversión|Fin de|Checklist)/i;
  return spanishPatterns.test(text);
}

function isEnglish(text) {
  if (!text) return false;
  const englishPatterns = /^(The|A|An|How|What|Why|Top|Cost|Complete|Your|Foreign)/i;
  return englishPatterns.test(text);
}

async function translateToEnglish(text) {
  if (!text) return '';

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: `Translate the following Spanish text to English. Keep the same tone and style. Only return the translation, no explanations:\n\n${text}`
    }]
  });

  return response.content[0].text.trim();
}

async function translateToSpanish(text) {
  if (!text) return '';

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: `Translate the following English text to Spanish (Mexican Spanish). Keep the same tone and style. Only return the translation, no explanations:\n\n${text}`
    }]
  });

  return response.content[0].text.trim();
}

async function fixPosts() {
  console.log('Fetching blog posts...\n');

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, title_es, excerpt, excerpt_es, content, content_es')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }

  let fixedCount = 0;

  for (const post of posts) {
    const baseIsSpanish = isSpanish(post.title);
    const esIsEnglish = isEnglish(post.title_es);
    const baseIsEnglish = isEnglish(post.title);

    // Case 1: Content is swapped (Spanish in base, English in _es)
    if (baseIsSpanish && esIsEnglish) {
      console.log(`\n[SWAP] ${post.slug}`);
      console.log(`  Base: "${post.title.substring(0, 50)}..."`);
      console.log(`  ES: "${post.title_es?.substring(0, 50)}..."`);

      // Swap: move English from _es to base, Spanish from base to _es
      const updates = {
        title: post.title_es,
        title_es: post.title,
        excerpt: post.excerpt_es || post.excerpt,
        excerpt_es: post.excerpt,
        content: post.content_es || post.content,
        content_es: post.content
      };

      const { error: updateError } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', post.id);

      if (updateError) {
        console.log(`  ❌ Error: ${updateError.message}`);
      } else {
        console.log(`  ✅ Swapped successfully`);
        fixedCount++;
      }
    }
    // Case 2: Both base and _es are Spanish (need to translate base to English)
    else if (baseIsSpanish && !esIsEnglish && !baseIsEnglish) {
      console.log(`\n[TRANSLATE] ${post.slug}`);
      console.log(`  Base (Spanish): "${post.title.substring(0, 50)}..."`);

      try {
        const englishTitle = await translateToEnglish(post.title);
        const englishExcerpt = await translateToEnglish(post.excerpt);
        const englishContent = await translateToEnglish(post.content);

        const updates = {
          title: englishTitle,
          title_es: post.title, // Keep original Spanish
          excerpt: englishExcerpt,
          excerpt_es: post.excerpt,
          content: englishContent,
          content_es: post.content
        };

        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(updates)
          .eq('id', post.id);

        if (updateError) {
          console.log(`  ❌ Error: ${updateError.message}`);
        } else {
          console.log(`  ✅ Translated to English: "${englishTitle.substring(0, 50)}..."`);
          fixedCount++;
        }
      } catch (err) {
        console.log(`  ❌ Translation error: ${err.message}`);
      }
    }
    // Case 3: Base is English but _es is empty or same as base
    else if (baseIsEnglish && (!post.title_es || post.title_es === post.title)) {
      console.log(`\n[TRANSLATE ES] ${post.slug}`);
      console.log(`  Base (English): "${post.title.substring(0, 50)}..."`);

      try {
        const spanishTitle = await translateToSpanish(post.title);
        const spanishExcerpt = await translateToSpanish(post.excerpt);
        const spanishContent = await translateToSpanish(post.content);

        const updates = {
          title_es: spanishTitle,
          excerpt_es: spanishExcerpt,
          content_es: spanishContent
        };

        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(updates)
          .eq('id', post.id);

        if (updateError) {
          console.log(`  ❌ Error: ${updateError.message}`);
        } else {
          console.log(`  ✅ Spanish added: "${spanishTitle.substring(0, 50)}..."`);
          fixedCount++;
        }
      } catch (err) {
        console.log(`  ❌ Translation error: ${err.message}`);
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`Fixed ${fixedCount} posts`);
  console.log(`========================================`);
}

fixPosts().catch(console.error);
