import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const hasApiKey = !!process.env.BEEHIIV_API_KEY;
  const hasPubId = !!process.env.BEEHIIV_PUBLICATION_ID;

  // Test API connection if credentials exist
  let apiTest = null;
  if (hasApiKey && hasPubId) {
    try {
      const response = await fetch(
        `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`,
          },
        }
      );
      const data = await response.json();
      apiTest = response.ok ? 'connected' : data.message || 'failed';
    } catch (err) {
      apiTest = 'error: ' + (err instanceof Error ? err.message : 'unknown');
    }
  }

  return res.status(200).json({
    beehiiv_api_key: hasApiKey ? 'SET ✅' : 'MISSING ❌',
    beehiiv_publication_id: hasPubId ? 'SET ✅' : 'MISSING ❌',
    api_connection: apiTest || 'not tested',
  });
}
