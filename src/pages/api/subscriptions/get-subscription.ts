import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { supabaseAdmin } from '@/lib/api/supabase-admin';

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
    
    // Check if this is an admin request
    const isAdmin = req.query.admin === 'true';
    const targetUserId = req.query.userId as string || session.user.id;
    
    // For non-admin users, only allow accessing their own subscriptions
    if (!isAdmin && targetUserId !== session.user.id) {
      return res.status(403).json({
        error: 'forbidden',
        description: 'You can only access your own subscription details'
      });
    }
    
    // If admin, verify admin status before proceeding
    if (isAdmin) {
      const { data: adminRoleData } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single();
        
      if (adminRoleData?.role !== 'admin') {
        return res.status(403).json({
          error: 'forbidden',
          description: 'Admin access required'
        });
      }
    }
    
    // Use the appropriate client
    const client = isAdmin ? supabaseAdmin : supabase;
    
    // Get the current subscription for the user
    const { data: subscriptions, error: subscriptionError } = await client
      .from('business_subscriptions')
      .select(`
        *,
        subscription_plan:subscription_plan_id (
          name,
          description,
          features,
          price,
          currency,
          interval
        )
      `)
      .eq('user_id', targetUserId)
      .order('created_at', { ascending: false });

    if (subscriptionError) {
      console.error('Error fetching subscription:', subscriptionError);
      return res.status(500).json({ 
        message: 'Error fetching subscription details' 
      });
    }
    
    // Find the active or cancelling subscription
    const currentSubscription = subscriptions.find(
      sub => ['active', 'cancelling'].includes(sub.status)
    );
    
    return res.status(200).json({
      subscription: currentSubscription || null
    });
  } catch (error) {
    console.error('Subscription fetch error:', error);
    return res.status(500).json({ 
      message: 'Error retrieving subscription' 
    });
  }
} 