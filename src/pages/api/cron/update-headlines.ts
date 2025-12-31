import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

interface CommunityNews {
  title_es: string;
  title_en: string;
  summary_es: string;
  summary_en: string;
  category: 'social' | 'community' | 'culture' | 'local';
  priority: number;
}

interface NewsHeadline {
  text_es: string;
  text_en: string;
  summary_es?: string;
  summary_en?: string;
  source: string;
  priority: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization;
  const isAuthorized = authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const isDev = process.env.NODE_ENV !== 'production';

  if (!isAuthorized && !isDev) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: 'Missing Supabase credentials' });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const results = { headlines: 0, communityNews: 0, errors: [] as string[], usedAI: false };

  try {
    let communityNews: CommunityNews[] = [];
    let headlines: NewsHeadline[] = [];

    // Use Claude AI to search and generate news
    if (anthropicApiKey) {
      const aiResults = await fetchNewsWithClaude();
      if (aiResults) {
        communityNews = aiResults.communityNews;
        headlines = aiResults.headlines;
        results.usedAI = true;
      }
    }

    // Fallback to defaults if AI didn't return results
    if (communityNews.length === 0) {
      communityNews = getDefaultCommunityNews();
    }
    if (headlines.length === 0) {
      headlines = getDefaultHeadlines();
    }

    // Update community_news table
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
    } else {
      results.communityNews = communityNews.length;
    }

    // Update news_headlines table
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
    } else {
      results.headlines = headlines.length;
    }

    return res.status(200).json({
      success: results.errors.length === 0,
      message: `Updated ${results.communityNews} community news, ${results.headlines} headlines`,
      usedAI: results.usedAI,
      errors: results.errors.length > 0 ? results.errors : undefined,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Cron error:', error);
    return res.status(500).json({ error: 'Failed to update news' });
  }
}

interface HeadlineWithSummary extends NewsHeadline {
  summary_es: string;
  summary_en: string;
}

async function fetchNewsWithClaude(): Promise<{ communityNews: CommunityNews[], headlines: HeadlineWithSummary[] } | null> {
  if (!anthropicApiKey) return null;

  const now = new Date();
  const today = now.toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    timeZone: 'America/Mexico_City'
  });
  const currentYear = now.getFullYear();
  const currentMonth = now.toLocaleDateString('es-MX', { month: 'long', timeZone: 'America/Mexico_City' });

  try {
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
          content: `══════════════════════════════════════════════════════════
⚠️  FECHA ACTUAL: ${today}
⚠️  AÑO ACTUAL: ${currentYear}
⚠️  MES ACTUAL: ${currentMonth} ${currentYear}
══════════════════════════════════════════════════════════

Eres un servicio de noticias para San Luis Way, portal de San Luis Potosí, México.

🚨 REGLA CRÍTICA DE FECHAS 🚨
SOLO incluir noticias sobre:
✅ Eventos de ${currentMonth} ${currentYear} o enero ${currentYear + 1}
✅ Anuncios hechos ESTA SEMANA sobre planes futuros
✅ Cosas que ESTÁN PASANDO AHORA o pasarán PRONTO

RECHAZAR COMPLETAMENTE:
❌ Resúmenes del año ${currentYear - 1} ("lo mejor de ${currentYear - 1}", "balance ${currentYear - 1}")
❌ Estadísticas anuales de ${currentYear - 1} (inversión extranjera ${currentYear - 1}, turismo ${currentYear - 1})
❌ Cualquier dato que diga "${currentYear - 1}" como año de referencia
❌ Artículos de "year in review" o "cierre de año ${currentYear - 1}"

QUEREMOS NOTICIAS ACTUALES COMO:
✅ "Ayuntamiento inaugura HOY nueva plaza en Col. Industrial"
✅ "SEDECO anuncia llegada de empresa X que operará en ${currentYear + 1}"
✅ "Festival de Año Nuevo en Centro Histórico del 31 dic al 2 enero"
✅ "Gobernador presenta plan de infraestructura ${currentYear + 1}"
✅ "BMW abre convocatoria de empleo para enero ${currentYear + 1}"

NO QUEREMOS:
❌ "SLP recibió $3,000 millones en inversión durante ${currentYear - 1}"
❌ "Turismo reporta 2 millones de visitantes en ${currentYear - 1}"
❌ "Balance económico de ${currentYear - 1}"

CATEGORÍAS:
1. ECONOMÍA: Nuevas inversiones, convocatorias de empleo, aperturas
2. GOBIERNO: Inauguraciones, anuncios de programas, obras EN CURSO
3. EVENTOS: Festivales, conciertos, exposiciones PRÓXIMAS
4. INFRAESTRUCTURA: Obras que se ESTÁN haciendo o SE ANUNCIAN

FUENTES: slp.gob.mx, sanluis.gob.mx, El Sol de San Luis, Plano Informativo, Pulso SLP

REGLAS:
- Solo noticias POSITIVAS o NEUTRALES
- Todas las fechas deben ser de ${currentMonth} ${currentYear} o posterior
- Si mencionas cifras, deben ser de ${currentYear} o proyecciones ${currentYear + 1}

Devuelve SOLO JSON válido:
{
  "communityNews": [
    {
      "title_es": "Noticia actual con fecha de ${currentMonth} ${currentYear}",
      "title_en": "Current news with date from ${currentMonth} ${currentYear}",
      "summary_es": "Detalles del evento/anuncio actual",
      "summary_en": "Details of current event/announcement",
      "category": "community|culture|local|social",
      "priority": 1
    }
  ],
  "headlines": [
    {
      "text_es": "Noticia de ESTA SEMANA: [Qué pasa] + [Cuándo]",
      "text_en": "THIS WEEK's news: [What's happening] + [When]",
      "summary_es": "Contexto relevante para HOY",
      "summary_en": "Context relevant for TODAY",
      "source": "Fuente",
      "priority": 1
    }
  ]
}

Genera 3 noticias comunitarias y 5 titulares de ${currentMonth} ${currentYear}.`
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

function getExpiryDate(days = 1): string {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

function getDefaultCommunityNews(): CommunityNews[] {
  const nextYear = new Date().getFullYear() + 1;
  return [
    {
      title_es: `Gobierno de SLP abre convocatoria para becas universitarias ${nextYear}, más de 5,000 espacios disponibles`,
      title_en: `SLP Government opens ${nextYear} university scholarship applications, over 5,000 spots available`,
      summary_es: 'Registro abierto en linea. Incluye apoyo para transporte, materiales y manutención mensual.',
      summary_en: 'Online registration open. Includes support for transportation, materials and monthly stipend.',
      category: 'community',
      priority: 1
    },
    {
      title_es: 'Centro de las Artes presenta nueva exposición de artistas potosinos este mes',
      title_en: 'Arts Center presents new exhibition by local artists this month',
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

function getDefaultHeadlines(): HeadlineWithSummary[] {
  const nextYear = new Date().getFullYear() + 1;
  return [
    {
      text_es: `BMW Villa de Reyes abre convocatoria de empleo para ${nextYear}, más de 500 vacantes disponibles`,
      text_en: `BMW Villa de Reyes opens ${nextYear} job applications, over 500 positions available`,
      summary_es: 'Postulaciones en línea. Puestos para técnicos, ingenieros y operadores de producción.',
      summary_en: 'Online applications. Positions for technicians, engineers and production operators.',
      source: 'BMW Group', priority: 1
    },
    {
      text_es: 'Gobierno estatal anuncia programa de pavimentación para colonias de la zona metropolitana',
      text_en: 'State government announces paving program for metropolitan area neighborhoods',
      summary_es: 'Beneficiará a más de 50 colonias con inversión de recursos estatales y federales.',
      summary_en: 'Will benefit over 50 neighborhoods with state and federal investment.',
      source: 'Gobierno SLP', priority: 2
    },
    {
      text_es: 'UASLP abre inscripciones para cursos de educación continua y diplomados',
      text_en: 'UASLP opens enrollment for continuing education courses and certificates',
      summary_es: 'Más de 30 opciones en áreas de tecnología, negocios, salud y humanidades.',
      summary_en: 'Over 30 options in technology, business, health and humanities areas.',
      source: 'UASLP', priority: 3
    },
    {
      text_es: 'Secretaría de Turismo lanza campaña para promover la Huasteca Potosina a nivel nacional',
      text_en: 'Tourism Ministry launches campaign to promote Huasteca Potosina nationwide',
      summary_es: 'Destaca cascadas, gastronomía y cultura de la región como destino imperdible.',
      summary_en: 'Highlights waterfalls, gastronomy and regional culture as must-visit destination.',
      source: 'Turismo SLP', priority: 4
    },
    {
      text_es: 'Zona Industrial de SLP registra llegada de nuevas empresas del sector automotriz',
      text_en: 'SLP Industrial Zone registers arrival of new automotive sector companies',
      summary_es: 'Las inversiones generarán empleos directos e indirectos en la zona metropolitana.',
      summary_en: 'Investments will create direct and indirect jobs in the metropolitan area.',
      source: 'SEDECO', priority: 5
    },
  ];
}
