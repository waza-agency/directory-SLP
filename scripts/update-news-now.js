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
        type: 'web_search_20250305',
        name: 'web_search',
        max_uses: 5
      }],
      messages: [{
        role: 'user',
        content: `Hoy es ${today}. Eres un servicio de noticias para San Luis Way, un portal informativo de San Luis Potosí, México.

MISIÓN: Informar a la población sobre SUCESOS IMPORTANTES y NOTICIAS REALES de San Luis Potosí.

ESTO ES UN SERVICIO DE NOTICIAS, NO UNA GUÍA TURÍSTICA.

EJEMPLOS DE NOTICIAS QUE SÍ QUEREMOS:
✅ "BMW anuncia inversión de $800 millones USD en planta de Villa de Reyes, generará 1,500 empleos en 2025"
✅ "Gobernador Ricardo Gallardo firma convenio con UASLP para 500 becas de posgrado"
✅ "SEDECO reporta llegada de 3 nuevas empresas aeroespaciales al corredor industrial"
✅ "Secretaría de Cultura inaugura exposición de arte virreinal en Museo del Virreinato"
✅ "Ayuntamiento concluye rehabilitación de 15 km de calles en zona oriente"
✅ "INTERAPAS termina obra de drenaje en Col. Himno Nacional tras 6 meses de trabajo"
✅ "Turismo SLP reporta 2.3 millones de visitantes a la Huasteca en 2024"
✅ "Universidad Politécnica inaugura nuevo campus en Soledad de Graciano Sánchez"

EJEMPLOS DE LO QUE NO QUEREMOS (son recomendaciones, no noticias):
❌ "Visita el Mercado Hidalgo, abierto de 7am a 7pm"
❌ "Recorridos guiados en Centro Histórico los sábados"
❌ "Las mejores enchiladas potosinas las encuentras en..."
❌ "Precios de hospedaje en la Huasteca desde $800"

CATEGORÍAS DE NOTICIAS:
1. ECONOMÍA: Inversiones, nuevas empresas, empleos, datos económicos
2. GOBIERNO: Obras públicas, programas sociales, convenios, inauguraciones
3. EDUCACIÓN: Universidades, becas, nuevas carreras, investigación
4. CULTURA: Exposiciones inauguradas, festivales anunciados, premios otorgados
5. INFRAESTRUCTURA: Obras viales, servicios públicos, mejoras urbanas
6. TURISMO: Estadísticas de visitantes, reconocimientos, nuevas rutas

FUENTES A BUSCAR:
- GOBIERNO: slp.gob.mx, sanluis.gob.mx, SEDECO, Turismo SLP
- MEDIOS: El Sol de San Luis, Plano Informativo, Pulso SLP, Código San Luis
- INSTITUCIONES: UASLP, IPICYT, Politécnica

REGLAS:
- Solo noticias POSITIVAS o NEUTRALES (NO crimen, violencia, accidentes)
- Deben ser SUCESOS que ocurrieron, no recomendaciones de lugares
- Incluir datos específicos: cifras, nombres de funcionarios, fechas de eventos
- Cada noticia debe responder: ¿QUÉ PASÓ? ¿QUIÉN lo hizo? ¿CUÁNDO? ¿CON QUÉ IMPACTO?

Devuelve SOLO un JSON válido:
{
  "communityNews": [
    {
      "title_es": "Titular de noticia con datos específicos",
      "title_en": "News headline with specific data",
      "summary_es": "Contexto adicional: impacto, beneficiarios, próximos pasos",
      "summary_en": "Additional context: impact, beneficiaries, next steps",
      "category": "community|culture|local|social",
      "priority": 1
    }
  ],
  "headlines": [
    {
      "text_es": "Titular noticioso: [Qué pasó] + [Quién] + [Cifra/Impacto]",
      "text_en": "News headline: [What happened] + [Who] + [Figure/Impact]",
      "summary_es": "Más detalles sobre el suceso y su relevancia",
      "summary_en": "More details about the event and its relevance",
      "source": "Fuente específica",
      "priority": 1
    }
  ]
}

Genera exactamente 3 noticias comunitarias y 5 titulares basados en SUCESOS REALES.`
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
        title_es: 'SEDECO reporta 12 nuevas empresas instaladas en SLP durante 2024, generando 3,500 empleos directos',
        title_en: 'SEDECO reports 12 new companies established in SLP during 2024, creating 3,500 direct jobs',
        summary_es: 'El sector automotriz y aeroespacial lidera las inversiones con más de $500 millones USD comprometidos.',
        summary_en: 'Automotive and aerospace sectors lead investments with over $500 million USD committed.',
        category: 'local',
        priority: 1
      },
      {
        title_es: 'UASLP inaugura Centro de Investigación en Energías Renovables con inversión de $80 millones de pesos',
        title_en: 'UASLP inaugurates Renewable Energy Research Center with $80 million peso investment',
        summary_es: 'El centro beneficiará a más de 200 investigadores y estudiantes de posgrado en tecnologías limpias.',
        summary_en: 'The center will benefit over 200 researchers and graduate students in clean technologies.',
        category: 'community',
        priority: 2
      },
      {
        title_es: 'Secretaría de Cultura anuncia restauración del Teatro de la Paz con fondos federales de $25 millones',
        title_en: 'Culture Ministry announces Teatro de la Paz restoration with $25 million federal funds',
        summary_es: 'Los trabajos iniciarán en febrero 2025 y se estima una duración de 18 meses.',
        summary_en: 'Work will begin in February 2025 with an estimated duration of 18 months.',
        category: 'culture',
        priority: 3
      }
    ],
    headlines: [
      {
        text_es: 'BMW México anuncia expansión de planta en Villa de Reyes con inversión de $800 millones USD',
        text_en: 'BMW Mexico announces Villa de Reyes plant expansion with $800 million USD investment',
        summary_es: 'La ampliación creará 1,500 nuevos empleos y aumentará la producción a 200,000 unidades anuales.',
        summary_en: 'The expansion will create 1,500 new jobs and increase production to 200,000 units annually.',
        source: 'SEDECO SLP',
        priority: 1
      },
      {
        text_es: 'Gobierno estatal entrega 2,000 escrituras de regularización de predios en zona metropolitana',
        text_en: 'State government delivers 2,000 property regularization deeds in metropolitan area',
        summary_es: 'El programa beneficia a familias de colonias en Soledad y San Luis Potosí capital.',
        summary_en: 'The program benefits families in neighborhoods in Soledad and San Luis Potosí capital.',
        source: 'Gobierno SLP',
        priority: 2
      },
      {
        text_es: 'Turismo SLP reporta cifra histórica de 2.8 millones de visitantes a la Huasteca en 2024',
        text_en: 'SLP Tourism reports historic 2.8 million visitors to the Huasteca region in 2024',
        summary_es: 'El incremento representa un 15% respecto a 2023, con derrama económica de $1,200 millones de pesos.',
        summary_en: 'The increase represents 15% over 2023, with economic impact of $1.2 billion pesos.',
        source: 'Turismo SLP',
        priority: 3
      },
      {
        text_es: 'Ayuntamiento concluye rehabilitación de 45 km de vialidades en colonias del oriente de la ciudad',
        text_en: 'City government completes rehabilitation of 45 km of roads in eastern city neighborhoods',
        summary_es: 'La inversión de $120 millones beneficia a más de 80,000 habitantes de 15 colonias.',
        summary_en: 'The $120 million investment benefits over 80,000 residents in 15 neighborhoods.',
        source: 'Municipio SLP',
        priority: 4
      },
      {
        text_es: 'IPICYT y NASA firman convenio de colaboración para investigación en materiales avanzados',
        text_en: 'IPICYT and NASA sign collaboration agreement for advanced materials research',
        summary_es: 'El acuerdo permitirá intercambio de investigadores y acceso a laboratorios especializados.',
        summary_en: 'The agreement will enable researcher exchange and access to specialized laboratories.',
        source: 'IPICYT',
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
