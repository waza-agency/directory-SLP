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
      .insert(headlines.map(h => ({ ...h, active: true, expires_at: getExpiryDate(1) })));

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

async function fetchNewsWithClaude(): Promise<{ communityNews: CommunityNews[], headlines: NewsHeadline[] } | null> {
  if (!anthropicApiKey) return null;

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
        max_tokens: 2500,
        messages: [{
          role: 'user',
          content: `Eres un editor de noticias para un portal de San Luis Potosí, México.

Genera noticias REALISTAS y POSITIVAS que podrían estar pasando ahora en San Luis Potosí. Basa tus noticias en eventos típicos de la ciudad como:
- Eventos en el Centro Histórico, Parque Tangamanga, Centro de las Artes
- Festivales culturales, gastronómicos o artísticos
- Mejoras urbanas, nuevos negocios, inversiones
- Actividades comunitarias, mercados artesanales
- Eventos deportivos, educativos, de turismo

Devuelve SOLO un JSON válido con este formato exacto (sin texto adicional):
{
  "communityNews": [
    {
      "title_es": "Título en español",
      "title_en": "Title in English",
      "summary_es": "Resumen breve máximo 80 caracteres",
      "summary_en": "Brief summary max 80 characters",
      "category": "community",
      "priority": 1
    },
    {
      "title_es": "Segunda noticia",
      "title_en": "Second news",
      "summary_es": "Resumen de la segunda noticia",
      "summary_en": "Summary of second news",
      "category": "culture",
      "priority": 2
    },
    {
      "title_es": "Tercera noticia",
      "title_en": "Third news",
      "summary_es": "Resumen de tercera noticia",
      "summary_en": "Summary of third news",
      "category": "local",
      "priority": 3
    }
  ],
  "headlines": [
    {"text_es": "Titular 1 en español", "text_en": "Headline 1 in English", "source": "Fuente", "priority": 1},
    {"text_es": "Titular 2 en español", "text_en": "Headline 2 in English", "source": "Fuente", "priority": 2},
    {"text_es": "Titular 3 en español", "text_en": "Headline 3 in English", "source": "Fuente", "priority": 3},
    {"text_es": "Titular 4 en español", "text_en": "Headline 4 in English", "source": "Fuente", "priority": 4},
    {"text_es": "Titular 5 en español", "text_en": "Headline 5 in English", "source": "Fuente", "priority": 5}
  ]
}

Categorías válidas: "social", "community", "culture", "local"
Fuentes ejemplo: "Turismo SLP", "Municipio", "Cultura", "Economía", "Deportes"

IMPORTANTE: Genera exactamente 3 noticias comunitarias y 5 titulares. Solo devuelve el JSON.`
        }]
      })
    });

    if (!response.ok) {
      console.error('Anthropic API error:', response.status);
      return null;
    }

    const data = await response.json();
    const content = data.content?.[0]?.text;

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

function getDefaultHeadlines(): NewsHeadline[] {
  return [
    { text_es: 'SLP destino turístico destacado en México 2025', text_en: 'SLP top tourist destination in Mexico 2025', source: 'Turismo SLP', priority: 1 },
    { text_es: 'Centro Histórico iluminado para temporada navideña', text_en: 'Historic Center lit up for holiday season', source: 'Municipio', priority: 2 },
    { text_es: 'Nuevas rutas de transporte público en zona metropolitana', text_en: 'New public transit routes in metro area', source: 'Movilidad', priority: 3 },
    { text_es: 'Festival gastronómico potosino atrae visitantes', text_en: 'Potosino food festival attracts visitors', source: 'Cultura', priority: 4 },
    { text_es: 'Empresas tecnológicas invierten en SLP', text_en: 'Tech companies invest in SLP', source: 'Economía', priority: 5 },
  ];
}
