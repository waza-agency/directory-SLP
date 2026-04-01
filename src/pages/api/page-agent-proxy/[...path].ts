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
    const body = { ...req.body };
    // Strip non-standard parameters that page-agent injects via modelPatch()
    const unsupported = ['verbosity', 'enable_thinking', 'thinking', 'reasoning'];
    unsupported.forEach(key => delete body[key]);

    // Force Gemini model
    body.model = 'gemini-2.0-flash';

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
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    logger.error('Page agent proxy error:', error);
    return res.status(500).json({ error: 'Proxy request failed' });
  }
}
