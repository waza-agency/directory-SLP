import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'Session ID is required' });
  }

  try {
    // Create authenticated Supabase client
    const supabase = createServerSupabaseClient({ req, res });
    
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return res.status(401).json({
        error: 'not_authenticated',
        description: 'The user does not have an active session or is not authenticated',
      });
    }

    // Get the order by Stripe session ID
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select("*")
      .eq('stripe_session_id', session_id)
      .eq('user_id', session.user.id)
      .single();

    if (orderError) {
      console.error('Error fetching order:', orderError);
      return res.status(500).json({ error: orderError.message });
    }

    if (!orderData) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Return the order
    return res.status(200).json({ order: orderData });
  } catch (error: any) {
    console.error('Error getting order:', error);
    return res.status(500).json({ error: error.message });
  }
} 