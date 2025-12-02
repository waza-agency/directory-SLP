import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Simple auth check - require admin key for newsletter management
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.NEWSLETTER_ADMIN_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      return getNewsletters(req, res);
    case 'POST':
      return createNewsletter(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getNewsletters(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { status, limit = 20, offset = 0 } = req.query;

    let query = supabase
      .from('newsletters')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, count, error } = await query;

    if (error) throw error;

    return res.status(200).json({ newsletters: data, total: count });
  } catch (error) {
    console.error('Get newsletters error:', error);
    return res.status(500).json({ message: 'Failed to fetch newsletters' });
  }
}

async function createNewsletter(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { subject, preview_text, html_content, plain_text_content, week_start, week_end } = req.body;

    if (!subject || !html_content) {
      return res.status(400).json({ message: 'Subject and HTML content are required' });
    }

    const { data, error } = await supabase
      .from('newsletters')
      .insert([{
        subject,
        preview_text,
        html_content,
        plain_text_content,
        week_start,
        week_end,
        status: 'draft'
      }])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({ newsletter: data });
  } catch (error) {
    console.error('Create newsletter error:', error);
    return res.status(500).json({ message: 'Failed to create newsletter' });
  }
}
