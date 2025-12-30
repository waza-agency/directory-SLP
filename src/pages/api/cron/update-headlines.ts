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

  const today = new Date().toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    timeZone: 'America/Mexico_City'
  });

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
  return [
    {
      title_es: 'Mercado Tangamanga: punto de encuentro artesanal',
      title_en: 'Tangamanga Market: artisan meeting point',
      summary_es: 'El mercado artesanal ofrece productos locales cada fin de semana.',
      summary_en: 'The artisan market offers local products every weekend.',
      category: 'community',
      priority: 1
    },
    {
      title_es: 'Parque Tangamanga I renueva áreas verdes',
      title_en: 'Tangamanga I Park renews green areas',
      summary_es: 'Nuevas áreas de recreación y senderos para corredores.',
      summary_en: 'New recreation areas and trails for runners.',
      category: 'local',
      priority: 2
    },
    {
      title_es: 'Centro Cultural celebra exposición de arte local',
      title_en: 'Cultural Center hosts local art exhibition',
      summary_es: 'Artistas potosinos presentan obras durante todo el mes.',
      summary_en: 'Local artists present works throughout the month.',
      category: 'culture',
      priority: 3
    }
  ];
}

function getDefaultHeadlines(): HeadlineWithSummary[] {
  return [
    {
      text_es: 'SLP destino turístico destacado en México 2025',
      text_en: 'SLP top tourist destination in Mexico 2025',
      summary_es: 'La Huasteca Potosina y el Centro Histórico lideran las preferencias de viajeros nacionales e internacionales.',
      summary_en: 'Huasteca Potosina and Historic Center lead preferences of national and international travelers.',
      source: 'Turismo SLP', priority: 1
    },
    {
      text_es: 'Centro Histórico iluminado para temporada festiva',
      text_en: 'Historic Center lit up for holiday season',
      summary_es: 'Plaza de Armas y calles principales lucen decoraciones especiales hasta el 6 de enero.',
      summary_en: 'Plaza de Armas and main streets display special decorations until January 6th.',
      source: 'Municipio', priority: 2
    },
    {
      text_es: 'Nuevas rutas de transporte público en zona metropolitana',
      text_en: 'New public transit routes in metro area',
      summary_es: 'Tres nuevas líneas conectan colonias del sur con el centro de la ciudad.',
      summary_en: 'Three new lines connect southern neighborhoods with the city center.',
      source: 'Movilidad', priority: 3
    },
    {
      text_es: 'Gastronomía potosina gana reconocimiento nacional',
      text_en: 'Potosino gastronomy gains national recognition',
      summary_es: 'Enchiladas potosinas y tacos rojos destacan en guía de cocina tradicional mexicana.',
      summary_en: 'Enchiladas potosinas and red tacos featured in traditional Mexican cuisine guide.',
      source: 'Cultura', priority: 4
    },
    {
      text_es: 'Zona industrial atrae nuevas inversiones',
      text_en: 'Industrial zone attracts new investments',
      summary_es: 'Sector automotriz y logístico generan empleos en la zona metropolitana.',
      summary_en: 'Automotive and logistics sectors create jobs in the metropolitan area.',
      source: 'Economía', priority: 5
    },
  ];
}
