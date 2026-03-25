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

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Ad ID is required' });
  }

  switch (req.method) {
    case 'GET':
      return getSponsorAd(req, res, id);
    case 'PUT':
      return updateSponsorAd(req, res, id);
    case 'DELETE':
      return deleteSponsorAd(req, res, id);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getSponsorAd(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    const { data, error } = await supabase
      .from('sponsor_ads')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Ad not found' });

    return res.status(200).json({ ad: data });
  } catch (error) {
    logger.error('Get sponsor ad error:', error);
    return res.status(500).json({ message: 'Failed to fetch sponsor ad' });
  }
}

async function updateSponsorAd(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    const updates = req.body;
    delete updates.id;
    delete updates.created_at;
    delete updates.impressions_count;
    delete updates.clicks_count;

    if (updates.ad_type === 'html') {
      updates.html_content = updates.html_content;
      updates.image_url = null;
      updates.image_alt = null;
    } else if (updates.ad_type === 'image') {
      updates.image_url = updates.image_url;
      updates.html_content = null;
      updates.image_alt = updates.image_alt;
    }

    const { data, error } = await supabase
      .from('sponsor_ads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Ad not found' });

    return res.status(200).json({ ad: data });
  } catch (error) {
    logger.error('Update sponsor ad error:', error);
    return res.status(500).json({ message: 'Failed to update sponsor ad' });
  }
}

async function deleteSponsorAd(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    const { error } = await supabase
      .from('sponsor_ads')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return res.status(200).json({ message: 'Ad deleted successfully' });
  } catch (error) {
    logger.error('Delete sponsor ad error:', error);
    return res.status(500).json({ message: 'Failed to delete sponsor ad' });
  }
}
