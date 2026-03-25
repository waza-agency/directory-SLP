import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.NEWSLETTER_ADMIN_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  switch (req.method) {
    case 'POST':
      return setAdPlacements(req, res);
    case 'GET':
      return getAdPlacements(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function setAdPlacements(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { newsletter_id, placements } = req.body;

    if (!newsletter_id || !placements || !Array.isArray(placements)) {
      return res.status(400).json({ message: 'Newsletter ID and placements array are required' });
    }

    await supabase
      .from('newsletter_ad_placements')
      .delete()
      .eq('newsletter_id', newsletter_id);

    const inserts = placements.map((p: { ad_id: string; placement: string }) => ({
      newsletter_id,
      sponsor_ad_id: p.ad_id,
      placement: p.placement,
      impressions_count: 0,
      clicks_count: 0
    }));

    const { data, error } = await supabase
      .from('newsletter_ad_placements')
      .insert(inserts)
      .select();

    if (error) throw error;

    for (const p of placements) {
      try {
        await supabase.rpc('increment', {
          table_name: 'sponsor_ads',
          column_name: 'impressions_count',
          row_id: p.ad_id
        });
      } catch (e) {
        logger.error('Failed to increment impressions:', e);
      }
    }

    return res.status(200).json({ placements: data });
  } catch (error) {
    logger.error('Set ad placements error:', error);
    return res.status(500).json({ message: 'Failed to set ad placements' });
  }
}

async function getAdPlacements(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { newsletter_id } = req.query;

    if (!newsletter_id) {
      return res.status(400).json({ message: 'Newsletter ID is required' });
    }

    const { data, error } = await supabase
      .from('newsletter_ad_placements')
      .select(`
        *,
        sponsor_ads (*)
      `)
      .eq('newsletter_id', newsletter_id);

    if (error) throw error;

    return res.status(200).json({ placements: data });
  } catch (error) {
    logger.error('Get ad placements error:', error);
    return res.status(500).json({ message: 'Failed to get ad placements' });
  }
}
