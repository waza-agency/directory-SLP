const { schedule } = require('@netlify/functions');
const { createClient } = require('@supabase/supabase-js');

const handler = async () => {
  console.log('Starting scheduled news update...');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials');
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing Supabase credentials' }) };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const results = { headlines: 0, communityNews: 0, errors: [], usedAI: false };

  try {
    let communityNews = [];
    let headlines = [];

    // Use Claude AI to search and generate news
    if (anthropicApiKey) {
      console.log('Fetching news with Claude AI...');
      const aiResults = await fetchNewsWithClaude(anthropicApiKey);
      if (aiResults) {
        communityNews = aiResults.communityNews;
        headlines = aiResults.headlines;
        results.usedAI = true;
        console.log(`AI returned ${communityNews.length} community news and ${headlines.length} headlines`);
      }
    }

    // Fallback to defaults if AI didn't return results
    if (communityNews.length === 0) {
      console.log('Using default community news');
      communityNews = getDefaultCommunityNews();
    }
    if (headlines.length === 0) {
      console.log('Using default headlines');
      headlines = getDefaultHeadlines();
    }

    // Update community_news table
    console.log('Updating community_news table...');
    await supabase.from('community_news').update({ active: false }).eq('active', true);

    const { error: communityError } = await supabase
      .from('community_news')
      .insert(communityNews.map(n => ({
        ...n,
        active: true,
        published_at: new Date().toISOString(),
        expires_at: getExpiryDate(7)
      })));

    if (communityError) {
      results.errors.push(`Community: ${communityError.message}`);
      console.error('Community news error:', communityError.message);
    } else {
      results.communityNews = communityNews.length;
    }

    // Update news_headlines table
    console.log('Updating news_headlines table...');
    await supabase.from('news_headlines').update({ active: false }).eq('active', true);

    const { error: headlinesError } = await supabase
      .from('news_headlines')
      .insert(headlines.map(h => ({
        text_es: h.text_es,
        text_en: h.text_en,
        summary_es: h.summary_es || '',
        summary_en: h.summary_en || '',
        source: h.source,
        priority: h.priority,
        active: true,
        expires_at: getExpiryDate(1)
      })));

    if (headlinesError) {
      results.errors.push(`Headlines: ${headlinesError.message}`);
      console.error('Headlines error:', headlinesError.message);
    } else {
      results.headlines = headlines.length;
    }

    const response = {
      success: results.errors.length === 0,
      message: `Updated ${results.communityNews} community news, ${results.headlines} headlines`,
      usedAI: results.usedAI,
      errors: results.errors.length > 0 ? results.errors : undefined,
      timestamp: new Date().toISOString()
    };

    console.log('News update completed:', response);
    return { statusCode: 200, body: JSON.stringify(response) };
  } catch (error) {
    console.error('Scheduled news update failed:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to update news' }) };
  }
};

async function fetchNewsWithClaude(apiKey) {
  const today = new Date().toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    timeZone: 'America/Mexico_City'
  });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
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

IMPORTANTE - RESÚMENES DETALLADOS:
Cada summary_es/summary_en debe tener 2-3 oraciones con:
- Cifras específicas (montos, empleos, fechas)
- Nombres de empresas, funcionarios o instituciones involucradas
- Fechas de cuándo ocurrirá o cuándo se anunció
- Impacto o beneficio para la población

Ejemplo de buen resumen:
"BMW invertirá $800 millones USD en su planta de Villa de Reyes, anunció el gobernador Ricardo Gallardo el 28 de diciembre. Se crearán 1,500 empleos directos y la producción aumentará a 200,000 unidades anuales a partir de 2026."

Devuelve EXACTAMENTE este formato JSON:

{
  "communityNews": [
    {
      "title_es": "Título en español",
      "title_en": "Title in English",
      "summary_es": "Resumen DETALLADO de 2-3 oraciones con cifras y nombres específicos",
      "summary_en": "DETAILED summary of 2-3 sentences with specific figures and names",
      "category": "community",
      "priority": 1
    }
  ],
  "headlines": [
    {
      "text_es": "Titular en español",
      "text_en": "Headline in English",
      "summary_es": "Resumen DETALLADO de 2-3 oraciones con cifras y nombres específicos",
      "summary_en": "DETAILED summary of 2-3 sentences with specific figures and names",
      "source": "Nombre del medio",
      "priority": 1
    }
  ]
}

Genera exactamente 3 communityNews y 5 headlines. NO cambies los nombres de los campos.`
        }]
      })
    });

    if (!response.ok) {
      console.error('Anthropic API error:', response.status);
      return null;
    }

    const data = await response.json();

    // Find the text content (may be after tool uses)
    let content = '';
    for (const block of data.content || []) {
      if (block.type === 'text') {
        content = block.text;
      }
    }

    if (!content) return null;

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate structure
    if (!Array.isArray(parsed.communityNews) || !Array.isArray(parsed.headlines)) {
      return null;
    }

    return {
      communityNews: parsed.communityNews.slice(0, 3),
      headlines: parsed.headlines.slice(0, 5)
    };
  } catch (error) {
    console.error('Claude fetch error:', error);
    return null;
  }
}

function getExpiryDate(days = 1) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

function getDefaultCommunityNews() {
  const nextYear = new Date().getFullYear() + 1;
  return [
    {
      title_es: `Gobierno de SLP abre convocatoria para becas universitarias ${nextYear}`,
      title_en: `SLP Government opens ${nextYear} university scholarship applications`,
      summary_es: 'Registro abierto en linea. Incluye apoyo para transporte, materiales y manutención mensual.',
      summary_en: 'Online registration open. Includes support for transportation, materials and monthly stipend.',
      category: 'community',
      priority: 1
    },
    {
      title_es: 'Centro de las Artes presenta nueva exposición de artistas potosinos',
      title_en: 'Arts Center presents new exhibition by local artists',
      summary_es: 'Entrada gratuita de martes a domingo. Incluye obras de pintura, escultura y fotografía.',
      summary_en: 'Free entry Tuesday to Sunday. Features painting, sculpture and photography works.',
      category: 'culture',
      priority: 2
    },
    {
      title_es: 'Ayuntamiento inaugura nuevo parque lineal en zona sur de la ciudad',
      title_en: 'City government inaugurates new linear park in southern zone',
      summary_es: 'Incluye ciclovía, áreas de ejercicio y zona de juegos infantiles. Abierto al público.',
      summary_en: 'Includes bike path, exercise areas and playground. Open to the public.',
      category: 'local',
      priority: 3
    }
  ];
}

function getDefaultHeadlines() {
  const nextYear = new Date().getFullYear() + 1;
  return [
    {
      text_es: `BMW Villa de Reyes abre convocatoria de empleo para ${nextYear}`,
      text_en: `BMW Villa de Reyes opens ${nextYear} job applications`,
      summary_es: 'Postulaciones en línea. Puestos para técnicos, ingenieros y operadores de producción.',
      summary_en: 'Online applications. Positions for technicians, engineers and production operators.',
      source: 'BMW Group', priority: 1
    },
    {
      text_es: 'Gobierno estatal anuncia programa de pavimentación para colonias',
      text_en: 'State government announces paving program for neighborhoods',
      summary_es: 'Beneficiará a más de 50 colonias con inversión de recursos estatales y federales.',
      summary_en: 'Will benefit over 50 neighborhoods with state and federal investment.',
      source: 'Gobierno SLP', priority: 2
    },
    {
      text_es: 'UASLP abre inscripciones para cursos de educación continua',
      text_en: 'UASLP opens enrollment for continuing education courses',
      summary_es: 'Más de 30 opciones en áreas de tecnología, negocios, salud y humanidades.',
      summary_en: 'Over 30 options in technology, business, health and humanities areas.',
      source: 'UASLP', priority: 3
    },
    {
      text_es: 'Secretaría de Turismo lanza campaña para promover la Huasteca Potosina',
      text_en: 'Tourism Ministry launches campaign to promote Huasteca Potosina',
      summary_es: 'Destaca cascadas, gastronomía y cultura de la región como destino imperdible.',
      summary_en: 'Highlights waterfalls, gastronomy and regional culture as must-visit destination.',
      source: 'Turismo SLP', priority: 4
    },
    {
      text_es: 'Zona Industrial de SLP registra llegada de nuevas empresas',
      text_en: 'SLP Industrial Zone registers arrival of new companies',
      summary_es: 'Las inversiones generarán empleos directos e indirectos en la zona metropolitana.',
      summary_en: 'Investments will create direct and indirect jobs in the metropolitan area.',
      source: 'SEDECO', priority: 5
    }
  ];
}

// Run daily at 7am Mexico City time (13:00 UTC)
exports.handler = schedule('0 13 * * *', handler);
