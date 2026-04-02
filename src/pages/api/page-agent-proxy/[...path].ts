import type { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '@/lib/logger';

/**
 * Catch-all proxy for page-agent LLM requests.
 * page-agent calls: baseURL + /chat/completions
 * This forwards to Google Gemini (OpenAI-compatible endpoint) keeping the API key server-side.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Google API key not configured' });
  }

  const pathSegments = req.query.path as string[];
  const endpoint = pathSegments.join('/');

  try {
    const raw = req.body || {};

    // Whitelist: only send parameters Gemini actually supports
    const messages = Array.isArray(raw.messages)
      ? raw.messages
          .filter((m: any) => m.role === 'system' || m.role === 'user' || m.role === 'assistant')
          .map((m: any) => ({ role: m.role, content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) }))
      : [];

    const body: Record<string, any> = {
      model: 'gemini-2.0-flash',
      messages,
      stream: false,
    };

    if (raw.temperature !== undefined) body.temperature = raw.temperature;
    if (raw.max_tokens !== undefined) body.max_tokens = raw.max_tokens;
    if (raw.top_p !== undefined) body.top_p = raw.top_p;
    if (raw.stop !== undefined) body.stop = raw.stop;
    if (raw.n !== undefined) body.n = raw.n;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/openai/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      logger.error('Gemini API error:', response.status, JSON.stringify(data));
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    logger.error('Page agent proxy error:', error);
    return res.status(500).json({ error: 'Proxy request failed' });
  }
}
