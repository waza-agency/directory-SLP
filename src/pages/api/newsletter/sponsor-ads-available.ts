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

    if (error) {
      logger.error('Supabase query error:', error);
      return res.status(500).json({ 
        message: 'Database query failed', 
        error: error.message,
        ads: [],
        byPlacement: { top: [], middle: [], bottom: [] },
        total: 0
      });
    }

    const validAds = (data || []).filter((ad: any) => {
      const startOk = !ad.start_date || ad.start_date <= today;
      const endOk = !ad.end_date || ad.end_date >= today;
      return startOk && endOk;
    });

    const adsByPlacement = {
      top: validAds.filter((ad: any) => ad.placement === 'top'),
      middle: validAds.filter((ad: any) => ad.placement === 'middle'),
      bottom: validAds.filter((ad: any) => ad.placement === 'bottom')
    };

    const rotationGroups = Array.from(new Set(validAds.filter((ad: any) => ad.rotation_group).map((ad: any) => ad.rotation_group)));
    const rotationSelections: Record<string, any> = {};

    for (const group of rotationGroups) {
      const groupAds = validAds.filter((ad: any) => ad.rotation_group === group);
      if (groupAds.length > 0) {
        const randomAd = groupAds[Math.floor(Math.random() * groupAds.length)];
        rotationSelections[group] = randomAd;
      }
    }

    logger.log(`Found ${validAds.length} available ads (of ${(data || []).length} total):`, adsByPlacement);

    return res.status(200).json({ 
      ads: validAds, 
      byPlacement: adsByPlacement,
      rotationSelections,
      total: validAds.length
    });
  } catch (error) {
    logger.error('Get available ads error:', error);
    return res.status(500).json({ 
      message: 'Failed to fetch available ads', 
      error: String(error),
      ads: [],
      byPlacement: { top: [], middle: [], bottom: [] },
      total: 0
    });
  }
}
