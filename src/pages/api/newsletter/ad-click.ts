import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ad_id, newsletter_id, placement } = req.query;

  if (!ad_id || typeof ad_id !== 'string') {
    return res.status(400).json({ error: 'Ad ID is required' });
  }

  try {
    const { data: ad, error } = await supabase
      .from('sponsor_ads')
      .select('link_url')
      .eq('id', ad_id)
      .single();

    if (error || !ad) {
      logger.error('Ad not found for tracking:', ad_id);
      return res.status(404).json({ error: 'Ad not found' });
    }

    try {
      await supabase.rpc('increment', {
        table_name: 'sponsor_ads',
        column_name: 'clicks_count',
        row_id: ad_id
      });
    } catch (e) {
      logger.error('Failed to increment clicks:', e);
    }

    if (newsletter_id && placement) {
      const { data: existing } = await supabase
        .from('newsletter_ad_placements')
        .select('id, clicks_count')
        .eq('newsletter_id', newsletter_id)
        .eq('sponsor_ad_id', ad_id)
        .eq('placement', placement)
        .single();

      if (existing) {
        await supabase
          .from('newsletter_ad_placements')
          .update({ clicks_count: existing.clicks_count + 1 })
          .eq('id', existing.id);
      }
    }

    if (ad.link_url) {
      return res.redirect(302, ad.link_url);
    }

    return res.status(400).json({ error: 'No link URL configured for this ad' });
  } catch (error) {
    logger.error('Click tracking error:', error);
    return res.status(500).json({ error: 'Tracking failed' });
  }
}
