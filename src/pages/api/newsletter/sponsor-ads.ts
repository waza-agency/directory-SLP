import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';
import { SponsorAd, AdPlacement } from '@/types/supabase';

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
      return getSponsorAds(req, res);
    case 'POST':
      return createSponsorAd(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getSponsorAds(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { placement, active, rotation_group } = req.query;

    let query = supabase
      .from('sponsor_ads')
      .select('*')
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false });

    if (placement) {
      query = query.eq('placement', placement);
    }
    if (active !== undefined) {
      query = query.eq('active', active === 'true');
    }
    if (rotation_group) {
      query = query.eq('rotation_group', rotation_group);
    }

    const { data, error } = await query;

    if (error) throw error;
    return res.status(200).json({ ads: data });
  } catch (error) {
    logger.error('Get sponsor ads error:', error);
    return res.status(500).json({ message: 'Failed to fetch sponsor ads' });
  }
}

const emptyToNull = <T>(v: T) => (v === '' || v === undefined ? null : v);

async function createSponsorAd(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      name,
      description,
      ad_type,
      html_content,
      image_url,
      image_alt,
      link_url,
      link_target,
      width,
      height,
      placement,
      section_anchor,
      priority,
      active,
      start_date,
      end_date,
      impressions_limit,
      rotation_group
    } = req.body;

    if (!name || !ad_type) {
      return res.status(400).json({ message: 'Name and ad type are required' });
    }

    if (ad_type === 'html' && !html_content) {
      return res.status(400).json({ message: 'HTML content is required for HTML ads' });
    }

    if (ad_type === 'image' && !image_url) {
      return res.status(400).json({ message: 'Image URL is required for image ads' });
    }

    const { data, error } = await supabase
      .from('sponsor_ads')
      .insert([{
        name,
        description: emptyToNull(description),
        ad_type,
        html_content: ad_type === 'html' ? html_content : null,
        image_url: ad_type === 'image' ? image_url : null,
        image_alt: ad_type === 'image' ? emptyToNull(image_alt) : null,
        link_url: emptyToNull(link_url),
        link_target: link_target || '_blank',
        width: width || '100%',
        height: emptyToNull(height),
        placement: placement || 'middle',
        section_anchor: emptyToNull(section_anchor),
        priority: priority || 0,
        active: active !== false,
        start_date: emptyToNull(start_date),
        end_date: emptyToNull(end_date),
        impressions_limit: emptyToNull(impressions_limit),
        rotation_group: emptyToNull(rotation_group)
      }])
      .select()
      .single();

    if (error) throw error;
    return res.status(201).json({ ad: data });
  } catch (error) {
    logger.error('Create sponsor ad error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create sponsor ad';
    return res.status(500).json({ message });
  }
}
