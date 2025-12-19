/**
 * Manual script to update community news in Supabase
 * Run: node scripts/update-community-news.js
 *
 * Requires:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Sample community news - Edit these to update the news
const communityNews = [
  {
    title_es: 'Mercado Tangamanga celebra su 5to aniversario',
    title_en: 'Tangamanga Market celebrates 5th anniversary',
    summary_es: 'El mercado artesanal más querido de SLP festeja con actividades especiales este fin de semana.',
    summary_en: 'SLP\'s beloved artisan market celebrates with special activities this weekend.',
    category: 'community',
    priority: 1
  },
  {
    title_es: 'Nueva ruta ciclista conecta Lomas con el Centro',
    title_en: 'New bike route connects Lomas to Downtown',
    summary_es: 'La ciclovía de 8km promete facilitar el transporte sustentable en la ciudad.',
    summary_en: 'The 8km bike lane promises to facilitate sustainable transportation in the city.',
    category: 'local',
    priority: 2
  },
  {
    title_es: 'Voluntarios limpian el Parque de Morales',
    title_en: 'Volunteers clean up Morales Park',
    summary_es: 'Más de 200 ciudadanos participaron en la jornada de limpieza comunitaria.',
    summary_en: 'Over 200 citizens participated in the community cleanup day.',
    category: 'social',
    priority: 3
  }
];

async function updateCommunityNews() {
  try {
    console.log('Deactivating old community news...');

    // Deactivate old news
    await supabase
      .from('community_news')
      .update({ active: false })
      .eq('active', true);

    console.log('Inserting new community news...');

    // Insert new news
    const { data, error } = await supabase
      .from('community_news')
      .insert(communityNews.map(news => ({
        ...news,
        active: true,
        published_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      })))
      .select();

    if (error) throw error;

    console.log(`✅ Successfully updated ${data.length} community news items`);
    data.forEach(item => {
      console.log(`  - ${item.title_en} (${item.category})`);
    });
  } catch (error) {
    console.error('❌ Error updating community news:', error);
    process.exit(1);
  }
}

updateCommunityNews();
