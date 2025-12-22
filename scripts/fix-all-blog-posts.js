#!/usr/bin/env node
/**
 * Comprehensive script to fix ALL blog posts
 * Ensures base fields are in English, _es fields have Spanish
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const Anthropic = require('@anthropic-ai/sdk');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function detectLanguage(text) {
  if (!text || text.length < 10) return 'unknown';

  // Check for broken translations (Claude error messages)
  if (text.includes('I notice') || text.includes('already in English') ||
      text.includes('provided is') || text.includes('Here is')) {
    return 'broken';
  }

  const spanishChars = (text.match(/[áéíóúñ¿¡ü]/gi) || []).length;
  const spanishWords = ['el', 'la', 'los', 'las', 'de', 'en', 'que', 'un', 'una',
    'es', 'por', 'con', 'para', 'del', 'al', 'como', 'más', 'pero', 'sus', 'su',
    'esta', 'este', 'desde', 'hasta', 'sobre', 'entre', 'cuando', 'donde',
    'descubre', 'guía', 'todo', 'vida', 'ciudad', 'años', 'méxico', 'potosí'];
  const englishWords = ['the', 'is', 'are', 'and', 'of', 'to', 'in', 'for',
    'with', 'on', 'at', 'from', 'by', 'an', 'your', 'how', 'what', 'this',
    'that', 'have', 'has', 'been', 'will', 'can', 'all', 'about', 'which',
    'discover', 'guide', 'living', 'city', 'years', 'mexico'];

  const words = text.toLowerCase().split(/\s+/);
  let spanishScore = spanishChars * 2;
  let englishScore = 0;

  for (const word of words) {
    if (spanishWords.includes(word)) spanishScore += 2;
    if (englishWords.includes(word)) englishScore += 2;
  }

  if (spanishScore > englishScore + 5) return 'es';
  if (englishScore > spanishScore + 5) return 'en';

  // If close, check for Spanish-specific patterns
  if (/^(el|la|los|las|un|una|cómo|qué|por qué|desde|guía|descubre)/i.test(text)) return 'es';
  if (/^(the|a|an|how|what|why|your|our|this|discover|guide|living|complete)/i.test(text)) return 'en';

  return spanishChars > 2 ? 'es' : 'en';
}

async function translateText(text, targetLang, fieldType) {
  if (!text || text.length < 5) return text;

  const maxTokens = fieldType === 'content' ? 8000 : 1000;
  const maxInputLength = fieldType === 'content' ? 20000 : 1000;

  const inputText = text.substring(0, maxInputLength);

  const langName = targetLang === 'en' ? 'English' : 'Spanish (Mexican)';

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      messages: [{
        role: 'user',
        content: `Translate the following text to ${langName}.
IMPORTANT:
- Return ONLY the translation, no explanations or comments
- Preserve all HTML tags, links, and formatting exactly
- Do not add any prefix like "Here is" or "The translation is"
- If the text is already in ${langName}, return it unchanged

Text:
${inputText}`
      }]
    });

    const result = response.content[0].text.trim();

    // Validate result doesn't contain error patterns
    if (result.includes('I notice') || result.includes('already in') ||
        result.includes('provided is') || result.startsWith('Here')) {
      console.log(`    ⚠️  Translation returned commentary, using original`);
      return null;
    }

    return result;
  } catch (error) {
    console.error(`    ❌ Translation error: ${error.message}`);
    return null;
  }
}

async function fixAllPosts() {
  console.log('🔍 Fetching all blog posts...\n');

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error.message);
    return;
  }

  console.log(`📝 Found ${posts.length} published posts\n`);
  console.log('='.repeat(60));

  let fixedCount = 0;
  let errorCount = 0;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    console.log(`\n[${i + 1}/${posts.length}] ${post.slug}`);

    const titleLang = detectLanguage(post.title);
    const excerptLang = detectLanguage(post.excerpt);
    const contentLang = detectLanguage(post.content?.substring(0, 500));

    console.log(`    Title: ${titleLang} | Excerpt: ${excerptLang} | Content: ${contentLang}`);

    const updates = {};
    let needsUpdate = false;

    // Fix broken titles
    if (titleLang === 'broken') {
      console.log(`    🔧 Fixing broken title...`);
      // Try to get from Spanish version or translate
      if (post.title_es && detectLanguage(post.title_es) === 'es') {
        const englishTitle = await translateText(post.title_es, 'en', 'title');
        if (englishTitle) {
          updates.title = englishTitle;
          needsUpdate = true;
        }
      }
    }
    // Fix Spanish title in base
    else if (titleLang === 'es') {
      console.log(`    🔧 Title is Spanish, translating to English...`);
      const englishTitle = await translateText(post.title, 'en', 'title');
      if (englishTitle) {
        updates.title = englishTitle;
        if (!post.title_es || detectLanguage(post.title_es) !== 'es') {
          updates.title_es = post.title;
        }
        needsUpdate = true;
      }
    }

    // Fix broken excerpts
    if (excerptLang === 'broken') {
      console.log(`    🔧 Fixing broken excerpt...`);
      if (post.excerpt_es && detectLanguage(post.excerpt_es) === 'es') {
        const englishExcerpt = await translateText(post.excerpt_es, 'en', 'excerpt');
        if (englishExcerpt) {
          updates.excerpt = englishExcerpt;
          needsUpdate = true;
        }
      }
    }
    // Fix Spanish excerpt in base
    else if (excerptLang === 'es') {
      console.log(`    🔧 Excerpt is Spanish, translating to English...`);
      const englishExcerpt = await translateText(post.excerpt, 'en', 'excerpt');
      if (englishExcerpt) {
        updates.excerpt = englishExcerpt;
        if (!post.excerpt_es || detectLanguage(post.excerpt_es) !== 'es') {
          updates.excerpt_es = post.excerpt;
        }
        needsUpdate = true;
      }
    }

    // Fix Spanish content in base
    if (contentLang === 'es' || contentLang === 'broken') {
      console.log(`    🔧 Content needs fixing, translating to English...`);
      const englishContent = await translateText(post.content, 'en', 'content');
      if (englishContent) {
        updates.content = englishContent;
        if (!post.content_es || detectLanguage(post.content_es?.substring(0, 500)) !== 'es') {
          updates.content_es = post.content;
        }
        needsUpdate = true;
      }
    }

    // Ensure Spanish translations exist
    if (!post.title_es || post.title_es === post.title) {
      const baseTitle = updates.title || post.title;
      if (detectLanguage(baseTitle) === 'en') {
        console.log(`    🔧 Adding Spanish title...`);
        const spanishTitle = await translateText(baseTitle, 'es', 'title');
        if (spanishTitle) {
          updates.title_es = spanishTitle;
          needsUpdate = true;
        }
      }
    }

    if (!post.excerpt_es || post.excerpt_es === post.excerpt) {
      const baseExcerpt = updates.excerpt || post.excerpt;
      if (detectLanguage(baseExcerpt) === 'en') {
        console.log(`    🔧 Adding Spanish excerpt...`);
        const spanishExcerpt = await translateText(baseExcerpt, 'es', 'excerpt');
        if (spanishExcerpt) {
          updates.excerpt_es = spanishExcerpt;
          needsUpdate = true;
        }
      }
    }

    if (needsUpdate && Object.keys(updates).length > 0) {
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', post.id);

      if (updateError) {
        console.log(`    ❌ Update error: ${updateError.message}`);
        errorCount++;
      } else {
        console.log(`    ✅ Updated: ${Object.keys(updates).join(', ')}`);
        fixedCount++;
      }
    } else {
      console.log(`    ✓ Already correct`);
    }

    // Rate limiting - wait between API calls
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n✅ Complete! Fixed ${fixedCount} posts, ${errorCount} errors`);
}

fixAllPosts().catch(console.error);
