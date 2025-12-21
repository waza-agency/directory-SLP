#!/usr/bin/env node
/**
 * Script para traducir lugares a español y alemán usando Claude API
 *
 * Uso:
 *   node scripts/translate-places.js                    # Traduce todos los lugares sin traducción
 *   node scripts/translate-places.js --id=abc123       # Traduce un lugar específico
 *   node scripts/translate-places.js --lang=es          # Solo traduce a español
 *   node scripts/translate-places.js --lang=de          # Solo traduce a alemán
 *   node scripts/translate-places.js --dry-run          # Muestra qué se traduciría sin guardar
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
  id: args.find(a => a.startsWith('--id='))?.split('=')[1],
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
async function translateText(text, targetLang) {
  if (!text || text.trim() === '') return '';

  const langInfo = LANGUAGES[targetLang];

  const systemPrompt = `You are a professional translator. Translate the following text to ${langInfo.name} (${langInfo.nativeName}).
IMPORTANT RULES:
- Keep proper nouns, brand names, and place names in their original form unless they have official translations
- Maintain the same tone and style
- For San Luis Potosí specific terms, keep them in Spanish with translations in parentheses if helpful for German
- Return ONLY the translated text, no explanations`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
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
 * Translate a single place
 */
async function translatePlace(place, targetLang) {
  console.log(`\n📍 Translating: "${place.name}" to ${LANGUAGES[targetLang].name}`);

  const translations = {};

  // Translate name
  console.log('   → Translating name...');
  translations[`name_${targetLang}`] = await translateText(place.name, targetLang);

  // Translate description
  if (place.description) {
    console.log('   → Translating description...');
    translations[`description_${targetLang}`] = await translateText(place.description, targetLang);
  }

  return translations;
}

/**
 * Check if place needs translation for a language
 */
function needsTranslation(place, lang) {
  return !place[`name_${lang}`] || !place[`description_${lang}`];
}

/**
 * Main execution
 */
async function main() {
  console.log('🌐 Places Translation Script');
  console.log('============================\n');

  if (options.dryRun) {
    console.log('🔍 DRY RUN MODE - No changes will be saved\n');
  }

  // Fetch places
  let query = supabase
    .from('places')
    .select('id, name, description, name_es, description_es, name_de, description_de');

  if (options.id) {
    query = query.eq('id', options.id);
  }

  const { data: places, error } = await query;

  if (error) {
    console.error('❌ Error fetching places:', error.message);
    process.exit(1);
  }

  if (!places || places.length === 0) {
    console.log('ℹ️  No places found');
    return;
  }

  console.log(`📚 Found ${places.length} place(s)\n`);

  // Determine which languages to translate
  const langsToTranslate = options.lang ? [options.lang] : ['es', 'de'];

  let translatedCount = 0;
  let skippedCount = 0;

  for (const place of places) {
    for (const lang of langsToTranslate) {
      if (!options.force && !needsTranslation(place, lang)) {
        console.log(`⏭️  Skipping "${place.name}" (${lang}) - already translated`);
        skippedCount++;
        continue;
      }

      try {
        const translations = await translatePlace(place, lang);

        if (options.dryRun) {
          console.log(`   ✅ Would save translations for ${lang}:`);
          console.log(`      - name_${lang}: ${translations[`name_${lang}`]?.substring(0, 50)}...`);
        } else {
          // Save to database
          const { error: updateError } = await supabase
            .from('places')
            .update(translations)
            .eq('id', place.id);

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

  console.log('\n============================');
  console.log(`✅ Translated: ${translatedCount}`);
  console.log(`⏭️  Skipped: ${skippedCount}`);
  console.log('============================\n');
}

main().catch(console.error);
