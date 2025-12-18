require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Headlines to add/update - modify these as needed
const headlines = [
  {
    text_es: 'ECOM Expocomic San Luis 2025 llega el 18 y 19 de diciembre al Centro de Convenciones',
    text_en: 'ECOM Expocomic San Luis 2025 arrives Dec 18-19 at Convention Center',
    source: 'Local Events',
    priority: 1
  },
  {
    text_es: 'Nuevo hospital IMSS-Bienestar iniciará construcción en 2026 para SLP',
    text_en: 'New IMSS-Bienestar hospital construction begins 2026 for SLP',
    source: 'Government',
    priority: 2
  },
  {
    text_es: 'SLP entre los 10 mejores destinos turísticos de México para 2025',
    text_en: 'SLP among top 10 tourist destinations in Mexico for 2025',
    source: 'Tourism',
    priority: 3
  },
  {
    text_es: 'Inversión extranjera en SLP crece 15% en el último trimestre',
    text_en: 'Foreign investment in SLP grows 15% in last quarter',
    source: 'Economy',
    priority: 4
  },
  {
    text_es: 'Festival de la Luz 2025: más de 50 eventos culturales en diciembre',
    text_en: 'Festival of Light 2025: over 50 cultural events in December',
    source: 'Culture',
    priority: 5
  }
];

async function updateHeadlines() {
  console.log('Updating headlines...');

  try {
    // Option 1: Replace all (deactivate old, insert new)
    const { error: deactivateError } = await supabase
      .from('news_headlines')
      .update({ active: false })
      .eq('active', true);

    if (deactivateError) {
      console.error('Error deactivating old headlines:', deactivateError);
    }

    // Insert new headlines
    const { data, error } = await supabase
      .from('news_headlines')
      .insert(headlines)
      .select();

    if (error) throw error;

    console.log(`✅ Successfully added ${data.length} headlines`);
    data.forEach((h, i) => console.log(`  ${i + 1}. ${h.text_en}`));
  } catch (error) {
    console.error('Error updating headlines:', error);
    process.exit(1);
  }
}

updateHeadlines().then(() => {
  console.log('Done!');
  process.exit(0);
});
