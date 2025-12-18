import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

interface NewsHeadline {
  text_es: string;
  text_en: string;
  source: string;
  source_url?: string;
  priority: number;
  expires_at?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify cron secret for security (Vercel sends this header)
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Allow manual calls in development
    if (process.env.NODE_ENV === 'production' && req.method !== 'POST') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: 'Missing Supabase credentials' });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // Fetch news from NewsAPI if available
    const newsApiKey = process.env.NEWS_API_KEY;
    let newHeadlines: NewsHeadline[] = [];

    if (newsApiKey) {
      newHeadlines = await fetchFromNewsAPI(newsApiKey);
    }

    // If we got headlines, update the database
    if (newHeadlines.length > 0) {
      // Deactivate old headlines (keep them for history)
      await supabase
        .from('news_headlines')
        .update({ active: false })
        .eq('active', true);

      // Insert new headlines
      const { error } = await supabase
        .from('news_headlines')
        .insert(newHeadlines);

      if (error) throw error;

      return res.status(200).json({
        success: true,
        message: `Updated ${newHeadlines.length} headlines`,
        headlines: newHeadlines.map(h => h.text_en)
      });
    }

    return res.status(200).json({
      success: true,
      message: 'No new headlines found, keeping existing ones'
    });
  } catch (error) {
    console.error('Error updating headlines:', error);
    return res.status(500).json({ error: 'Failed to update headlines' });
  }
}

async function fetchFromNewsAPI(apiKey: string): Promise<NewsHeadline[]> {
  try {
    const query = encodeURIComponent('San Luis Potosí OR SLP México');
    const url = `https://newsapi.org/v2/everything?q=${query}&language=es&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) return [];

    const data = await response.json();
    if (!data.articles?.length) return [];

    // Filter for positive/neutral news only
    const negativeKeywords = ['asesin', 'muerte', 'muerto', 'robo', 'violencia', 'secuestro', 'accidente', 'choque', 'detenido', 'arrest'];

    const filteredArticles = data.articles.filter((article: { title: string }) => {
      const title = article.title.toLowerCase();
      return !negativeKeywords.some(keyword => title.includes(keyword));
    });

    return filteredArticles.slice(0, 5).map((article: { title: string; source: { name: string }; url: string }, idx: number) => ({
      text_es: article.title,
      text_en: article.title, // NewsAPI returns in original language
      source: article.source?.name || 'NewsAPI',
      source_url: article.url,
      priority: idx + 1,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Expires in 24 hours
    }));
  } catch (error) {
    console.error('NewsAPI error:', error);
    return [];
  }
}
