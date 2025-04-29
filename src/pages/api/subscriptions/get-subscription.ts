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
    
    // Get the current subscription for the user
    const { data: subscriptions, error: subscriptionError } = await supabase
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
      .eq('user_id', session.user.id)
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