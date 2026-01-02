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
  console.log('1. Verificando estructura de tablas para 4 idiomas...');

  const { data: headlineColumns } = await supabase
    .from('news_headlines')
    .select('*')
    .limit(1);

  const missingHeadlineCols = [];
  if (headlineColumns && headlineColumns[0]) {
    if (!('text_de' in headlineColumns[0])) missingHeadlineCols.push('text_de');
    if (!('text_ja' in headlineColumns[0])) missingHeadlineCols.push('text_ja');
    if (!('summary_de' in headlineColumns[0])) missingHeadlineCols.push('summary_de');
    if (!('summary_ja' in headlineColumns[0])) missingHeadlineCols.push('summary_ja');
  }

  const { data: communityColumns } = await supabase
    .from('community_news')
    .select('*')
    .limit(1);

  const missingCommunityCols = [];
  if (communityColumns && communityColumns[0]) {
    if (!('title_de' in communityColumns[0])) missingCommunityCols.push('title_de');
    if (!('title_ja' in communityColumns[0])) missingCommunityCols.push('title_ja');
    if (!('summary_de' in communityColumns[0])) missingCommunityCols.push('summary_de');
    if (!('summary_ja' in communityColumns[0])) missingCommunityCols.push('summary_ja');
  }

  if (missingHeadlineCols.length > 0 || missingCommunityCols.length > 0) {
    console.log('   ⚠️  Ejecuta esta SQL en Supabase Dashboard (SQL Editor):');
    if (missingHeadlineCols.length > 0) {
      console.log('   -- Para news_headlines:');
      missingHeadlineCols.forEach(col => {
        console.log(`   ALTER TABLE news_headlines ADD COLUMN IF NOT EXISTS ${col} TEXT;`);
      });
    }
    if (missingCommunityCols.length > 0) {
      console.log('   -- Para community_news:');
      missingCommunityCols.forEach(col => {
        console.log(`   ALTER TABLE community_news ADD COLUMN IF NOT EXISTS ${col} TEXT;`);
      });
    }
    console.log('');
  } else {
    console.log('   ✓ Tablas listas con soporte para 4 idiomas (es, en, de, ja)');
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
        content: `HOY ES: ${today}

Busca noticias POSITIVAS/NEUTRALES de San Luis Potosí, México para HOY.

IMPORTANTE - TRADUCCIONES A 4 IDIOMAS:
Debes proporcionar TODAS las traducciones en: Español (es), English (en), Deutsch (de), 日本語 (ja).
Cada resumen debe tener 2-3 oraciones con:
- Cifras específicas (montos, empleos, fechas)
- Nombres de empresas, funcionarios o instituciones involucradas
- Fechas de cuándo ocurrirá o cuándo se anunció
- Impacto o beneficio para la población

Ejemplo de buen resumen español:
"BMW invertirá $800 millones USD en su planta de Villa de Reyes, anunció el gobernador Ricardo Gallardo el 28 de diciembre. Se crearán 1,500 empleos directos."

Devuelve EXACTAMENTE este formato JSON con TODOS los campos de idiomas:

{
  "communityNews": [
    {
      "title_es": "Título en español",
      "title_en": "Title in English",
      "title_de": "Titel auf Deutsch",
      "title_ja": "日本語のタイトル",
      "summary_es": "Resumen DETALLADO de 2-3 oraciones",
      "summary_en": "DETAILED summary of 2-3 sentences",
      "summary_de": "DETAILLIERTE Zusammenfassung in 2-3 Sätzen",
      "summary_ja": "2〜3文の詳細な要約",
      "category": "community",
      "priority": 1
    }
  ],
  "headlines": [
    {
      "text_es": "Titular en español",
      "text_en": "Headline in English",
      "text_de": "Schlagzeile auf Deutsch",
      "text_ja": "日本語の見出し",
      "summary_es": "Resumen DETALLADO de 2-3 oraciones",
      "summary_en": "DETAILED summary of 2-3 sentences",
      "summary_de": "DETAILLIERTE Zusammenfassung in 2-3 Sätzen",
      "summary_ja": "2〜3文の詳細な要約",
      "source": "Nombre del medio",
      "priority": 1
    }
  ]
}

Genera exactamente 3 communityNews y 5 headlines. TODOS los campos de idiomas son OBLIGATORIOS.`
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
  const year = new Date().getFullYear();
  const nextYear = year + 1;

  return {
    communityNews: [
      {
        title_es: `Gobierno de SLP abre convocatoria para becas universitarias ${nextYear}, más de 5,000 espacios disponibles`,
        title_en: `SLP Government opens ${nextYear} university scholarship applications, over 5,000 spots available`,
        title_de: `SLP-Regierung eröffnet Stipendienbewerbungen für ${nextYear}, über 5.000 Plätze verfügbar`,
        title_ja: `SLP州政府が${nextYear}年大学奨学金の募集を開始、5,000名以上の枠`,
        summary_es: 'Registro abierto en linea. Incluye apoyo para transporte, materiales y manutención mensual.',
        summary_en: 'Online registration open. Includes support for transportation, materials and monthly stipend.',
        summary_de: 'Online-Registrierung geöffnet. Beinhaltet Unterstützung für Transport, Materialien und monatliches Stipendium.',
        summary_ja: 'オンライン登録受付中。交通費、教材費、月額生活費のサポートを含みます。',
        category: 'community',
        priority: 1
      },
      {
        title_es: 'Centro de las Artes presenta nueva exposición de artistas potosinos este mes',
        title_en: 'Arts Center presents new exhibition by local artists this month',
        title_de: 'Kunstzentrum präsentiert diesen Monat neue Ausstellung lokaler Künstler',
        title_ja: '芸術センターが今月、地元アーティストの新展覧会を開催',
        summary_es: 'Entrada gratuita de martes a domingo. Incluye obras de pintura, escultura y fotografía.',
        summary_en: 'Free entry Tuesday to Sunday. Features painting, sculpture and photography works.',
        summary_de: 'Freier Eintritt Dienstag bis Sonntag. Zeigt Werke der Malerei, Skulptur und Fotografie.',
        summary_ja: '火曜日から日曜日まで入場無料。絵画、彫刻、写真作品を展示。',
        category: 'culture',
        priority: 2
      },
      {
        title_es: 'Ayuntamiento inaugura nuevo parque lineal en zona sur de la ciudad',
        title_en: 'City government inaugurates new linear park in southern zone',
        title_de: 'Stadtverwaltung eröffnet neuen Linearpark in der Südzone',
        title_ja: '市政府が南部地区に新しいリニアパークを開設',
        summary_es: 'Incluye ciclovía, áreas de ejercicio y zona de juegos infantiles. Abierto al público.',
        summary_en: 'Includes bike path, exercise areas and playground. Open to the public.',
        summary_de: 'Beinhaltet Radweg, Fitnessbereiche und Spielplatz. Öffentlich zugänglich.',
        summary_ja: '自転車道、運動エリア、子供の遊び場を含む。一般公開中。',
        category: 'local',
        priority: 3
      }
    ],
    headlines: [
      {
        text_es: `BMW Villa de Reyes abre convocatoria de empleo para ${nextYear}, más de 500 vacantes disponibles`,
        text_en: `BMW Villa de Reyes opens ${nextYear} job applications, over 500 positions available`,
        text_de: `BMW Villa de Reyes eröffnet Stellenbewerbungen für ${nextYear}, über 500 Positionen verfügbar`,
        text_ja: `BMW Villa de Reyesが${nextYear}年の求人募集を開始、500以上のポジション`,
        summary_es: 'Postulaciones en línea. Puestos para técnicos, ingenieros y operadores de producción.',
        summary_en: 'Online applications. Positions for technicians, engineers and production operators.',
        summary_de: 'Online-Bewerbungen. Stellen für Techniker, Ingenieure und Produktionsoperateure.',
        summary_ja: 'オンライン応募受付中。技術者、エンジニア、生産オペレーターを募集。',
        source: 'BMW Group',
        priority: 1
      },
      {
        text_es: 'Gobierno estatal anuncia programa de pavimentación para colonias de la zona metropolitana',
        text_en: 'State government announces paving program for metropolitan area neighborhoods',
        text_de: 'Landesregierung kündigt Asphaltierungsprogramm für Stadtvierteln an',
        text_ja: '州政府が大都市圏の住宅地舗装プログラムを発表',
        summary_es: 'Beneficiará a más de 50 colonias con inversión de recursos estatales y federales.',
        summary_en: 'Will benefit over 50 neighborhoods with state and federal investment.',
        summary_de: 'Wird über 50 Stadtteile mit staatlichen und bundesstaatlichen Investitionen unterstützen.',
        summary_ja: '州と連邦の投資により50以上の地区が恩恵を受ける予定。',
        source: 'Gobierno SLP',
        priority: 2
      },
      {
        text_es: 'UASLP abre inscripciones para cursos de educación continua y diplomados',
        text_en: 'UASLP opens enrollment for continuing education courses and certificates',
        text_de: 'UASLP eröffnet Einschreibung für Weiterbildungskurse und Zertifikate',
        text_ja: 'UASLPが継続教育コースと資格講座の登録を開始',
        summary_es: 'Más de 30 opciones en áreas de tecnología, negocios, salud y humanidades.',
        summary_en: 'Over 30 options in technology, business, health and humanities areas.',
        summary_de: 'Über 30 Optionen in Technologie, Wirtschaft, Gesundheit und Geisteswissenschaften.',
        summary_ja: 'テクノロジー、ビジネス、医療、人文科学分野で30以上のコースを提供。',
        source: 'UASLP',
        priority: 3
      },
      {
        text_es: 'Secretaría de Turismo lanza campaña para promover la Huasteca Potosina a nivel nacional',
        text_en: 'Tourism Ministry launches campaign to promote Huasteca Potosina nationwide',
        text_de: 'Tourismusministerium startet Kampagne zur landesweiten Förderung der Huasteca Potosina',
        text_ja: '観光省がウアステカ・ポトシーナの全国プロモーションキャンペーンを開始',
        summary_es: 'Destaca cascadas, gastronomía y cultura de la región como destino imperdible.',
        summary_en: 'Highlights waterfalls, gastronomy and regional culture as must-visit destination.',
        summary_de: 'Hebt Wasserfälle, Gastronomie und regionale Kultur als Must-See-Reiseziel hervor.',
        summary_ja: '滝、美食、地域文化を必見の観光地としてアピール。',
        source: 'Turismo SLP',
        priority: 4
      },
      {
        text_es: 'Zona Industrial de SLP registra llegada de nuevas empresas del sector automotriz',
        text_en: 'SLP Industrial Zone registers arrival of new automotive sector companies',
        text_de: 'SLP-Industriezone verzeichnet Ankunft neuer Automobilunternehmen',
        text_ja: 'SLP工業地帯に新たな自動車関連企業が進出',
        summary_es: 'Las inversiones generarán empleos directos e indirectos en la zona metropolitana.',
        summary_en: 'Investments will create direct and indirect jobs in the metropolitan area.',
        summary_de: 'Investitionen werden direkte und indirekte Arbeitsplätze im Großraum schaffen.',
        summary_ja: '投資により大都市圏で直接・間接雇用が創出される見込み。',
        source: 'SEDECO',
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

  // Insert new headlines with all language translations
  const headlinesToInsert = newsData.headlines.map(h => ({
    text_es: h.text_es,
    text_en: h.text_en,
    text_de: h.text_de || h.text_en,
    text_ja: h.text_ja || h.text_en,
    summary_es: h.summary_es || '',
    summary_en: h.summary_en || '',
    summary_de: h.summary_de || h.summary_en || '',
    summary_ja: h.summary_ja || h.summary_en || '',
    source: h.source,
    priority: h.priority,
    active: true,
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  }));

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

  // Insert new community news with all language translations
  const communityToInsert = newsData.communityNews.map(n => ({
    title_es: n.title_es,
    title_en: n.title_en,
    title_de: n.title_de || n.title_en,
    title_ja: n.title_ja || n.title_en,
    summary_es: n.summary_es,
    summary_en: n.summary_en,
    summary_de: n.summary_de || n.summary_en || '',
    summary_ja: n.summary_ja || n.summary_en || '',
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
