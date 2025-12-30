require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const realNews = {
  headlines: [
    {
      text_es: 'ECOM 2025: San Luis Potosí fue sede del evento de anime, gaming y K-pop',
      text_en: 'ECOM 2025: San Luis Potosí hosted anime, gaming and K-pop event',
      summary_es: 'El 13 y 14 de diciembre el Centro de Negocios Potosí reunió a fans de anime, manga, videojuegos, e-sports y cosplay, generando importante derrama económica.',
      summary_en: 'On December 13-14, Centro de Negocios Potosí gathered anime, manga, videogame, e-sports and cosplay fans, generating significant economic impact.',
      source: 'Código San Luis',
      priority: 1
    },
    {
      text_es: 'Turismo de reuniones generó más de 740 millones de pesos en SLP',
      text_en: 'Business tourism generated over 740 million pesos in SLP',
      summary_es: 'Más de 150 congresos y 114 eventos posicionan a la capital como destino de turismo de negocios en 2025.',
      summary_en: 'Over 150 congresses and 114 events position the capital as a business tourism destination in 2025.',
      source: 'Líder Empresarial',
      priority: 2
    },
    {
      text_es: 'Centro Histórico de SLP celebra XV aniversario como Patrimonio Mundial',
      text_en: 'SLP Historic Center celebrates 15th anniversary as World Heritage',
      summary_es: 'La capital potosina conmemora su adhesión a las Ciudades Mexicanas del Patrimonio Mundial y su incorporación a la Red Mundial de Turismo Religioso.',
      summary_en: 'The capital commemorates its adhesion to Mexican World Heritage Cities and its incorporation to the World Network of Religious Tourism.',
      source: 'Gobierno SLP',
      priority: 3
    },
    {
      text_es: 'Concierto "Symphonia Hibernalis" en Plaza de los Fundadores',
      text_en: '"Symphonia Hibernalis" Concert at Plaza de los Fundadores',
      summary_es: 'Orquesta Filarmónica Ernesto Báez y soprano Leila Sánchez presentan concierto navideño bajo dirección de François L. Martínez.',
      summary_en: 'Ernesto Báez Philharmonic Orchestra and soprano Leila Sánchez present Christmas concert under François L. Martínez direction.',
      source: 'Secretaría de Cultura SLP',
      priority: 4
    },
    {
      text_es: 'Cultura Municipal benefició a más de 145 mil familias en 2025',
      text_en: 'Municipal Culture benefited over 145,000 families in 2025',
      summary_es: 'Programas inclusivos atendieron a más de 3 mil personas con discapacidad con oferta cultural diversa y accesible.',
      summary_en: 'Inclusive programs served over 3,000 people with disabilities with diverse and accessible cultural offerings.',
      source: 'Municipio SLP',
      priority: 5
    }
  ],
  communityNews: [
    {
      title_es: 'Agenda cultural decembrina: actividades hasta el 6 de enero',
      title_en: 'December cultural agenda: activities until January 6',
      summary_es: 'Plazas públicas, recintos culturales y espacios emblemáticos de la capital ofrecen programación especial para fiestas decembrinas.',
      summary_en: 'Public plazas, cultural venues, and iconic spaces in the capital offer special programming for the holiday season.',
      category: 'culture',
      priority: 1
    },
    {
      title_es: 'Viernes de Danzón congregaron a 36 mil personas en 2025',
      title_en: 'Danzón Fridays gathered 36,000 people in 2025',
      summary_es: '45 ediciones del tradicional evento en el Centro Histórico mantienen viva la tradición del danzón potosino.',
      summary_en: '45 editions of the traditional event in the Historic Center keep the Potosino danzón tradition alive.',
      category: 'community',
      priority: 2
    },
    {
      title_es: 'PECDA 2025 beneficia a 67 artistas potosinos',
      title_en: 'PECDA 2025 benefits 67 Potosino artists',
      summary_es: 'Programa de Estímulos a la Creación Artística invirtió 4.15 millones de pesos en creadores locales.',
      summary_en: 'Artistic Creation Stimulus Program invested 4.15 million pesos in local creators.',
      category: 'local',
      priority: 3
    }
  ]
};

async function insertRealNews() {
  console.log('Insertando noticias reales de SLP...\n');

  // Deactivate old headlines
  await supabase.from('news_headlines').update({ active: false }).eq('active', true);

  // Insert new headlines
  const { error: headlinesError } = await supabase
    .from('news_headlines')
    .insert(realNews.headlines.map(h => ({
      ...h,
      active: true,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    })));

  if (headlinesError) {
    console.error('Error headlines:', headlinesError.message);
  } else {
    console.log('✓ 5 titulares reales insertados');
  }

  // Deactivate old community news
  await supabase.from('community_news').update({ active: false }).eq('active', true);

  // Insert new community news
  const { error: communityError } = await supabase
    .from('community_news')
    .insert(realNews.communityNews.map(n => ({
      title_es: n.title_es,
      title_en: n.title_en,
      summary_es: n.summary_es,
      summary_en: n.summary_en,
      category: n.category,
      priority: n.priority,
      active: true,
      published_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    })));

  if (communityError) {
    console.error('Error community:', communityError.message);
  } else {
    console.log('✓ 3 noticias comunitarias reales insertadas');
  }

  console.log('\n✅ Noticias actualizadas. Recarga la página.');
}

insertRealNews().catch(console.error);
