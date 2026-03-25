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
    case 'GET':
      return getAvailableAds(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getAvailableAds(req: NextApiRequest, res: NextApiResponse) {
  try {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('sponsor_ads')
      .select('*')
      .eq('active', true)
      .or(`start_date.is.null,start_date.lte.${today}`)
      .or(`end_date.is.null,end_date.gte.${today}`)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;

    const adsByPlacement = {
      top: data.filter(ad => ad.placement === 'top'),
      middle: data.filter(ad => ad.placement === 'middle'),
      bottom: data.filter(ad => ad.placement === 'bottom')
    };

    const rotationGroups = Array.from(new Set(data.filter(ad => ad.rotation_group).map(ad => ad.rotation_group)));
    const rotationSelections: Record<string, any> = {};

    for (const group of rotationGroups) {
      const groupAds = data.filter(ad => ad.rotation_group === group);
      const randomAd = groupAds[Math.floor(Math.random() * groupAds.length)];
      rotationSelections[group] = randomAd;
    }

    return res.status(200).json({ 
      ads: data, 
      byPlacement: adsByPlacement,
      rotationSelections,
      total: data.length
    });
  } catch (error) {
    logger.error('Get available ads error:', error);
    return res.status(500).json({ message: 'Failed to fetch available ads' });
  }
}
