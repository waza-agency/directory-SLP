import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET method
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Initialize Supabase client
    const supabase = createServerSupabaseClient({ req, res });
    
    // Get the user session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Set default status filter to active
    const status = Array.isArray(req.query.status) 
      ? req.query.status.join(',') 
      : req.query.status || 'active';
    
    // Build the query to fetch subscriptions
    let query = supabase
      .from('business_subscriptions')
      .select(`
        *,
        subscription_plans(*)
      `)
      .eq('user_id', session.user.id);
    
    // Apply status filter if provided
    if (status !== 'all') {
      if (status.includes(',')) {
        query = query.in('status', status.split(','));
      } else {
        query = query.eq('status', status);
      }
    }
    
    // Order by created_at descending
    query = query.order('created_at', { ascending: false });
    
    // Execute the query
    const { data: subscriptions, error } = await query;
    
    if (error) {
      console.error('Error fetching subscriptions:', error);
      return res.status(500).json({ message: 'Error retrieving subscriptions' });
    }
    
    return res.status(200).json({
      message: 'Subscriptions retrieved successfully',
      subscriptions: subscriptions || []
    });
  } catch (error) {
    console.error('List subscriptions error:', error);
    return res.status(500).json({ message: 'Error retrieving subscriptions' });
  }
} 