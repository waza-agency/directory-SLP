import type { NextApiRequest, NextApiResponse } from 'next';

// This is a simple endpoint to trigger a rebuild/revalidation
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Revalidate the home page
    await res.revalidate('/');
    
    // Revalidate the events pages
    await res.revalidate('/events');
    await res.revalidate('/events/sports');
    await res.revalidate('/events/cultural');
    
    // For on-demand revalidation, you would typically use a webhook
    // This is a simple version for demonstration
    
    return res.status(200).json({ 
      revalidated: true,
      message: 'Site pages have been revalidated and will rebuild with fresh data'
    });
  } catch (err) {
    // If there was an error, Next.js will continue to show the last 
    // successfully generated page
    return res.status(500).json({ 
      message: 'Error revalidating pages',
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
} 