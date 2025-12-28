import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { data: places, error } = await supabase
      .from('places')
      .select('id, name, category, address, city')
      .order('name', { ascending: true });

    if (error) throw error;

    const categories = [...new Set(places?.map(p => p.category) || [])];

    return res.status(200).json({
      totalCount: places?.length || 0,
      categories,
      places: places || []
    });
  } catch (error) {
    console.error('Error fetching places:', error);
    return res.status(500).json({ error: 'Failed to fetch places' });
  }
}
