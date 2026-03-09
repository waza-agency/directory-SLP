import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Catch-all proxy for page-agent LLM requests.
 * page-agent calls: baseURL + /chat/completions
 * This forwards to OpenAI keeping the API key server-side.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  const pathSegments = req.query.path as string[];
  const endpoint = pathSegments.join('/');

  try {
    const response = await fetch(`https://api.openai.com/v1/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Page agent proxy error:', error);
    return res.status(500).json({ error: 'Proxy request failed' });
  }
}
