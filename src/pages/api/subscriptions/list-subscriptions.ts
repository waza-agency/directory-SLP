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
    
    // Set default status filter to active
    const status = Array.isArray(req.query.status) 
      ? req.query.status.join(',') 
      : req.query.status || 'active';
    
    // Build the query to fetch subscriptions
    let query = client
      .from('business_subscriptions')
      .select(`
        *,
        subscription_plans(*)
      `)
      .eq('user_id', targetUserId);
    
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