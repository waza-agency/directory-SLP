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
      return trackClick(req, res);
    case 'GET':
      return getAnalytics(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function trackClick(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { ad_id, newsletter_id, placement } = req.body;

    if (!ad_id) {
      return res.status(400).json({ message: 'Ad ID is required' });
    }

    try {
      await supabase.rpc('increment', {
        table_name: 'sponsor_ads',
        column_name: 'clicks_count',
        row_id: ad_id
      });
    } catch (e) {
      logger.error('RPC increment failed:', e);
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

    return res.status(200).json({ success: true });
  } catch (error) {
    logger.error('Track click error:', error);
    return res.status(500).json({ message: 'Failed to track click' });
  }
}

async function getAnalytics(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { ad_id, newsletter_id } = req.query;

    if (ad_id) {
      const { data, error } = await supabase
        .from('sponsor_ads')
        .select('id, name, impressions_count, clicks_count')
        .eq('id', ad_id)
        .single();

      if (error) throw error;
      const ctr = data.impressions_count > 0 
        ? ((data.clicks_count / data.impressions_count) * 100).toFixed(2)
        : '0.00';
      
      return res.status(200).json({ ...data, ctr });
    }

    if (newsletter_id) {
      const { data, error } = await supabase
        .from('newsletter_ad_placements')
        .select(`
          *,
          sponsor_ads (id, name, ad_type)
        `)
        .eq('newsletter_id', newsletter_id);

      if (error) throw error;
      return res.status(200).json({ placements: data });
    }

    const { data, error } = await supabase
      .from('sponsor_ads')
      .select('id, name, ad_type, placement, active, impressions_count, clicks_count, start_date, end_date')
      .order('clicks_count', { ascending: false });

    if (error) throw error;

    const adsWithCtr = data.map(ad => ({
      ...ad,
      ctr: ad.impressions_count > 0 
        ? ((ad.clicks_count / ad.impressions_count) * 100).toFixed(2)
        : '0.00'
    }));

    return res.status(200).json({ ads: adsWithCtr });
  } catch (error) {
    logger.error('Get analytics error:', error);
    return res.status(500).json({ message: 'Failed to fetch analytics' });
  }
}
