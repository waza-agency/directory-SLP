import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

interface CommunityNews {
  title_es: string;
  title_en: string;
  title_de: string;
  title_ja: string;
  summary_es: string;
  summary_en: string;
  summary_de: string;
  summary_ja: string;
  category: 'social' | 'community' | 'culture' | 'local';
  priority: number;
}

interface NewsHeadline {
  text_es: string;
  text_en: string;
  text_de: string;
  text_ja: string;
  summary_es?: string;
  summary_en?: string;
  summary_de?: string;
  summary_ja?: string;
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
        title_es: n.title_es,
        title_en: n.title_en,
        title_de: n.title_de || n.title_en,
        title_ja: n.title_ja || n.title_en,
        summary_es: n.summary_es,
        summary_en: n.summary_en,
        summary_de: n.summary_de || n.summary_en,
        summary_ja: n.summary_ja || n.summary_en,
        category: n.category,
        priority: n.priority,
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
        text_de: h.text_de || h.text_en,
        text_ja: h.text_ja || h.text_en,
        summary_es: h.summary_es || '',
        summary_en: h.summary_en || '',
        summary_de: h.summary_de || h.summary_en || '',
        summary_ja: h.summary_ja || h.summary_en || '',
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
    logger.error('Cron error:', error);
    return res.status(500).json({ error: 'Failed to update news' });
  }
}

interface HeadlineWithSummary extends NewsHeadline {
  summary_es: string;
  summary_en: string;
  summary_de: string;
  summary_ja: string;
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
          type: 'web_search_20250305',
          name: 'web_search',
          max_uses: 5
        }],
        messages: [{
          role: 'user',
          content: `HOY ES: ${today}

Busca noticias POSITIVAS/NEUTRALES de San Luis Potosí, México para HOY.

IMPORTANTE - RESÚMENES DETALLADOS:
Cada summary debe tener 2-3 oraciones con:
- Cifras específicas (montos, empleos, fechas)
- Nombres de empresas, funcionarios o instituciones involucradas
- Fechas de cuándo ocurrirá o cuándo se anunció
- Impacto o beneficio para la población

IMPORTANTE - 4 IDIOMAS:
Cada campo de texto debe tener versiones en español (_es), inglés (_en), alemán (_de) y japonés (_ja).

Devuelve EXACTAMENTE este formato JSON:

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

Genera exactamente 3 communityNews y 5 headlines. NO cambies los nombres de los campos.`
        }]
      })
    });

    if (!response.ok) {
      logger.error('Anthropic API error:', response.status);
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
    logger.error('Claude fetch error:', error);
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
      title_de: `SLP-Regierung eröffnet Stipendienanträge für ${nextYear}, über 5.000 Plätze verfügbar`,
      title_ja: `SLP州政府が${nextYear}年の大学奨学金を募集開始、5,000枠以上`,
      summary_es: 'Registro abierto en linea. Incluye apoyo para transporte, materiales y manutención mensual.',
      summary_en: 'Online registration open. Includes support for transportation, materials and monthly stipend.',
      summary_de: 'Online-Registrierung offen. Beinhaltet Unterstützung für Transport, Materialien und monatliches Stipendium.',
      summary_ja: 'オンライン登録受付中。交通費、教材、月額生活費の支援を含みます。',
      category: 'community',
      priority: 1
    },
    {
      title_es: 'Centro de las Artes presenta nueva exposición de artistas potosinos este mes',
      title_en: 'Arts Center presents new exhibition by local artists this month',
      title_de: 'Kunstzentrum präsentiert neue Ausstellung lokaler Künstler diesen Monat',
      title_ja: '芸術センターが今月、地元アーティストの新展覧会を開催',
      summary_es: 'Entrada gratuita de martes a domingo. Incluye obras de pintura, escultura y fotografía.',
      summary_en: 'Free entry Tuesday to Sunday. Features painting, sculpture and photography works.',
      summary_de: 'Freier Eintritt Dienstag bis Sonntag. Zeigt Malerei, Skulptur und Fotografie.',
      summary_ja: '火曜日から日曜日まで入場無料。絵画、彫刻、写真作品を展示。',
      category: 'culture',
      priority: 2
    },
    {
      title_es: 'Ayuntamiento inaugura nuevo parque lineal en zona sur de la ciudad',
      title_en: 'City government inaugurates new linear park in southern zone',
      title_de: 'Stadtverwaltung eröffnet neuen Linearpark im Süden der Stadt',
      title_ja: '市政府が市南部に新しいリニアパークを開園',
      summary_es: 'Incluye ciclovía, áreas de ejercicio y zona de juegos infantiles. Abierto al público.',
      summary_en: 'Includes bike path, exercise areas and playground. Open to the public.',
      summary_de: 'Beinhaltet Radweg, Sportbereiche und Spielplatz. Öffentlich zugänglich.',
      summary_ja: '自転車道、運動エリア、遊び場を含みます。一般公開中。',
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
      text_de: `BMW Villa de Reyes eröffnet Stellenangebote für ${nextYear}, über 500 Positionen verfügbar`,
      text_ja: `BMWビジャ・デ・レジェスが${nextYear}年の求人を開始、500以上のポジション`,
      summary_es: 'Postulaciones en línea. Puestos para técnicos, ingenieros y operadores de producción.',
      summary_en: 'Online applications. Positions for technicians, engineers and production operators.',
      summary_de: 'Online-Bewerbungen. Stellen für Techniker, Ingenieure und Produktionsmitarbeiter.',
      summary_ja: 'オンライン応募受付中。技術者、エンジニア、生産オペレーターのポジション。',
      source: 'BMW Group', priority: 1
    },
    {
      text_es: 'Gobierno estatal anuncia programa de pavimentación para colonias de la zona metropolitana',
      text_en: 'State government announces paving program for metropolitan area neighborhoods',
      text_de: 'Landesregierung kündigt Straßenbauprogramm für Stadtteile an',
      text_ja: '州政府が都市圏地区の舗装プログラムを発表',
      summary_es: 'Beneficiará a más de 50 colonias con inversión de recursos estatales y federales.',
      summary_en: 'Will benefit over 50 neighborhoods with state and federal investment.',
      summary_de: 'Wird über 50 Stadtteile mit staatlicher und föderaler Investition begünstigen.',
      summary_ja: '州と連邦の投資により50以上の地区が恩恵を受ける予定。',
      source: 'Gobierno SLP', priority: 2
    },
    {
      text_es: 'UASLP abre inscripciones para cursos de educación continua y diplomados',
      text_en: 'UASLP opens enrollment for continuing education courses and certificates',
      text_de: 'UASLP eröffnet Einschreibung für Weiterbildungskurse und Zertifikate',
      text_ja: 'UASLPが継続教育コースと修了証プログラムの登録を開始',
      summary_es: 'Más de 30 opciones en áreas de tecnología, negocios, salud y humanidades.',
      summary_en: 'Over 30 options in technology, business, health and humanities areas.',
      summary_de: 'Über 30 Optionen in Technologie, Wirtschaft, Gesundheit und Geisteswissenschaften.',
      summary_ja: 'テクノロジー、ビジネス、医療、人文科学分野で30以上のオプション。',
      source: 'UASLP', priority: 3
    },
    {
      text_es: 'Secretaría de Turismo lanza campaña para promover la Huasteca Potosina a nivel nacional',
      text_en: 'Tourism Ministry launches campaign to promote Huasteca Potosina nationwide',
      text_de: 'Tourismusministerium startet Kampagne zur nationalen Förderung der Huasteca Potosina',
      text_ja: '観光省がウアステカ・ポトシーナの全国プロモーションキャンペーンを開始',
      summary_es: 'Destaca cascadas, gastronomía y cultura de la región como destino imperdible.',
      summary_en: 'Highlights waterfalls, gastronomy and regional culture as must-visit destination.',
      summary_de: 'Hebt Wasserfälle, Gastronomie und regionale Kultur als Muss-Reiseziel hervor.',
      summary_ja: '滝、グルメ、地域文化を必見の観光地として紹介。',
      source: 'Turismo SLP', priority: 4
    },
    {
      text_es: 'Zona Industrial de SLP registra llegada de nuevas empresas del sector automotriz',
      text_en: 'SLP Industrial Zone registers arrival of new automotive sector companies',
      text_de: 'SLP-Industriezone verzeichnet Ankunft neuer Automobilunternehmen',
      text_ja: 'SLP工業団地に自動車セクターの新企業が進出',
      summary_es: 'Las inversiones generarán empleos directos e indirectos en la zona metropolitana.',
      summary_en: 'Investments will create direct and indirect jobs in the metropolitan area.',
      summary_de: 'Investitionen werden direkte und indirekte Arbeitsplätze im Stadtgebiet schaffen.',
      summary_ja: '投資により都市圏で直接的・間接的な雇用が創出される見込み。',
      source: 'SEDECO', priority: 5
    },
  ];
}
