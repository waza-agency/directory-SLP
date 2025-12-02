import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

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
      return getSubscribers(req, res);
    case 'DELETE':
      return deleteSubscriber(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getSubscribers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { status, limit = 50, offset = 0, search } = req.query;

    let query = supabase
      .from('newsletter_subscribers')
      .select('id, email, first_name, status, source, subscribed_at, unsubscribed_at', { count: 'exact' })
      .order('subscribed_at', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (search && typeof search === 'string') {
      query = query.ilike('email', `%${search}%`);
    }

    const { data, count, error } = await query;

    if (error) throw error;

    // Get counts by status
    const { data: statusCounts } = await supabase
      .from('newsletter_subscribers')
      .select('status')
      .then(result => {
        const counts = { active: 0, unsubscribed: 0, bounced: 0 };
        result.data?.forEach(s => {
          if (s.status in counts) counts[s.status as keyof typeof counts]++;
        });
        return { data: counts };
      });

    return res.status(200).json({
      subscribers: data,
      total: count,
      counts: statusCounts
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    return res.status(500).json({ message: 'Failed to fetch subscribers' });
  }
}

async function deleteSubscriber(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Subscriber ID is required' });
    }

    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return res.status(200).json({ message: 'Subscriber deleted successfully' });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    return res.status(500).json({ message: 'Failed to delete subscriber' });
  }
}
