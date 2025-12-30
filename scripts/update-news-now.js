require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMigration() {
  console.log('1. Verificando estructura de tabla...');

  const { data: columns } = await supabase
    .from('news_headlines')
    .select('*')
    .limit(1);

  if (columns && columns[0] && !('summary_es' in columns[0])) {
    console.log('   ⚠️  Ejecuta esta SQL en Supabase Dashboard (SQL Editor):');
    console.log('   ALTER TABLE news_headlines ADD COLUMN IF NOT EXISTS summary_es TEXT DEFAULT \'\';');
    console.log('   ALTER TABLE news_headlines ADD COLUMN IF NOT EXISTS summary_en TEXT DEFAULT \'\';\n');
  } else {
    console.log('   ✓ Tabla lista');
  }
}

async function fetchNewsWithClaude() {
  if (!anthropicApiKey) {
    console.log('   No hay API key de Anthropic');
    return null;
  }

  const today = new Date().toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    timeZone: 'America/Mexico_City'
  });

  console.log(`   Fecha actual: ${today}`);
  console.log('   Buscando noticias reales con web search...');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': anthropicApiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      tools: [{
        type: 'web_search',
        name: 'web_search',
        max_uses: 5
      }],
      messages: [{
        role: 'user',
        content: `Hoy es ${today}. Eres un editor de noticias para San Luis Way, un portal de San Luis Potosí, México.

TAREA: Busca noticias REALES y RECIENTES de San Luis Potosí usando web search. Enfócate en:
- Noticias de los últimos 7 días
- Eventos culturales, festivales, conciertos
- Economía local, inversiones, nuevos negocios
- Mejoras urbanas, infraestructura
- Turismo, gastronomía
- Deportes locales

IMPORTANTE:
- Solo noticias POSITIVAS o NEUTRALES (NO crimen, violencia, accidentes)
- Cada noticia debe incluir información ESPECÍFICA y ÚTIL (fechas, lugares, nombres)
- Incluye un resumen informativo de 1-2 oraciones

Busca en estas fuentes:
GOBIERNO ESTATAL: slp.gob.mx, Secretaría de Turismo SLP, Secretaría de Cultura SLP, SEDECO SLP, @GobEdoSLP
GOBIERNO MUNICIPAL: sanluis.gob.mx, @SLPMunicipio
MEDIOS: El Sol de San Luis, Plano Informativo, Pulso SLP, Potosí Noticias, Código San Luis

Después de buscar, devuelve SOLO un JSON válido con este formato:
{
  "communityNews": [
    {
      "title_es": "Título específico con detalles",
      "title_en": "Specific title with details",
      "summary_es": "Resumen informativo de 1-2 oraciones con datos concretos",
      "summary_en": "Informative summary of 1-2 sentences with concrete data",
      "category": "community",
      "priority": 1
    }
  ],
  "headlines": [
    {
      "text_es": "Titular específico con información real",
      "text_en": "Specific headline with real information",
      "summary_es": "Resumen breve con datos útiles (fechas, lugares, cifras)",
      "summary_en": "Brief summary with useful data (dates, places, figures)",
      "source": "Nombre del medio",
      "priority": 1
    }
  ]
}

Genera exactamente 3 noticias comunitarias y 5 titulares basados en información REAL que encuentres.`
      }]
    })
  });

  if (!response.ok) {
    console.error('   Error de API:', response.status);
    return null;
  }

  const data = await response.json();

  let content = '';
  for (const block of data.content || []) {
    if (block.type === 'text') {
      content = block.text;
    }
  }

  if (!content) return null;

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;

  return JSON.parse(jsonMatch[0]);
}

function getDefaultNews() {
  return {
    communityNews: [
      {
        title_es: 'Centro Histórico de SLP: Patrimonio Cultural de México',
        title_en: 'SLP Historic Center: Mexico Cultural Heritage',
        summary_es: 'El Centro Histórico ofrece recorridos guiados gratuitos los fines de semana desde Plaza de Armas.',
        summary_en: 'The Historic Center offers free guided tours on weekends from Plaza de Armas.',
        category: 'culture',
        priority: 1
      },
      {
        title_es: 'Huasteca Potosina entre los destinos más visitados de 2025',
        title_en: 'Huasteca Potosina among most visited destinations of 2025',
        summary_es: 'Cascadas, ríos y selva atraen a miles de turistas nacionales e internacionales cada semana.',
        summary_en: 'Waterfalls, rivers, and jungle attract thousands of national and international tourists weekly.',
        category: 'local',
        priority: 2
      },
      {
        title_es: 'Gastronomía potosina gana reconocimiento nacional',
        title_en: 'Potosino gastronomy gains national recognition',
        summary_es: 'Enchiladas potosinas, tacos rojos y el tradicional queso de tuna destacan en guías culinarias.',
        summary_en: 'Enchiladas potosinas, red tacos, and traditional tuna cheese featured in culinary guides.',
        category: 'community',
        priority: 3
      }
    ],
    headlines: [
      {
        text_es: 'SLP se posiciona como hub industrial del Bajío',
        text_en: 'SLP positions itself as Bajio industrial hub',
        summary_es: 'Sector automotriz y aeroespacial generan más de 50,000 empleos directos en la zona metropolitana.',
        summary_en: 'Automotive and aerospace sectors generate over 50,000 direct jobs in the metropolitan area.',
        source: 'SEDECO SLP',
        priority: 1
      },
      {
        text_es: 'Turismo en la Huasteca crece 25% este año',
        text_en: 'Huasteca tourism grows 25% this year',
        summary_es: 'Xilitla, Tamasopo y Aquismón lideran las visitas con cascadas y sitios arqueológicos.',
        summary_en: 'Xilitla, Tamasopo and Aquismón lead visits with waterfalls and archaeological sites.',
        source: 'Turismo SLP',
        priority: 2
      },
      {
        text_es: 'Centro de las Artes presenta nueva temporada cultural',
        text_en: 'Arts Center presents new cultural season',
        summary_es: 'Exposiciones, conciertos y talleres gratuitos durante enero y febrero en la ex penitenciaría.',
        summary_en: 'Exhibitions, concerts, and free workshops during January and February at the former penitentiary.',
        source: 'Cultura SLP',
        priority: 3
      },
      {
        text_es: 'Mejoran conectividad vial en zona metropolitana',
        text_en: 'Road connectivity improved in metro area',
        summary_es: 'Nuevos pasos a desnivel y ampliación de carriles reducen tiempos de traslado.',
        summary_en: 'New overpasses and lane expansions reduce commute times.',
        source: 'Gobierno SLP',
        priority: 4
      },
      {
        text_es: 'Festival gastronómico potosino atrae visitantes de todo México',
        text_en: 'Potosino food festival attracts visitors from all over Mexico',
        summary_es: 'Más de 50 restaurantes locales participan con platillos tradicionales y fusión.',
        summary_en: 'Over 50 local restaurants participate with traditional and fusion dishes.',
        source: 'Municipio SLP',
        priority: 5
      }
    ]
  };
}

async function updateNews() {
  console.log('\n2. Actualizando noticias...');

  let newsData = await fetchNewsWithClaude();

  if (!newsData || !newsData.headlines?.length) {
    console.log('   Usando noticias por defecto (no se pudo hacer web search)');
    newsData = getDefaultNews();
  } else {
    console.log('   ✓ Noticias reales obtenidas con web search');
  }

  // Deactivate old headlines
  await supabase.from('news_headlines').update({ active: false }).eq('active', true);

  // Check if summary columns exist
  const { data: testRow } = await supabase.from('news_headlines').select('*').limit(1);
  const hasSummaryColumns = testRow && testRow[0] && 'summary_es' in testRow[0];

  // Insert new headlines
  const headlinesToInsert = newsData.headlines.map(h => {
    const headline = {
      text_es: h.text_es,
      text_en: h.text_en,
      source: h.source,
      priority: h.priority,
      active: true,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
    if (hasSummaryColumns) {
      headline.summary_es = h.summary_es || '';
      headline.summary_en = h.summary_en || '';
    }
    return headline;
  });

  const { error: headlinesError } = await supabase
    .from('news_headlines')
    .insert(headlinesToInsert);

  if (headlinesError) {
    console.error('   Error insertando headlines:', headlinesError.message);
  } else {
    console.log(`   ✓ ${headlinesToInsert.length} titulares insertados`);
  }

  // Deactivate old community news
  await supabase.from('community_news').update({ active: false }).eq('active', true);

  // Insert new community news
  const communityToInsert = newsData.communityNews.map(n => ({
    title_es: n.title_es,
    title_en: n.title_en,
    summary_es: n.summary_es,
    summary_en: n.summary_en,
    category: n.category,
    priority: n.priority,
    active: true,
    published_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  }));

  const { error: communityError } = await supabase
    .from('community_news')
    .insert(communityToInsert);

  if (communityError) {
    console.error('   Error insertando community news:', communityError.message);
  } else {
    console.log(`   ✓ ${communityToInsert.length} noticias comunitarias insertadas`);
  }
}

async function main() {
  console.log('=== Actualizando noticias de San Luis Way ===\n');

  await checkMigration();
  await updateNews();

  console.log('\n✅ Proceso completado. Recarga la página para ver las noticias.');
}

main().catch(console.error);
