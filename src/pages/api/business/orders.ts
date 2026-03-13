import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { logger } from '@/lib/logger';

export type SellerOrder = {
  id: string;
  buyer_id: string;
  total_amount: number;
  platform_fee: number;
  seller_payout: number;
  status: string;
  shipping_status: string | null;
  tracking_number: string | null;
  created_at: string;
};

export type SellerOrdersResponse = {
  orders: SellerOrder[];
  totalEarnings: number;
  pendingPayouts: number;
  totalOrders: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createServerSupabaseClient({ req, res });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Get the user's business profile
    const { data: profile } = await supabase
      .from('business_profiles')
      .select('id')
      .eq('user_id', session.user.id)
      .single();

    if (!profile) {
      return res.status(404).json({ error: 'No business profile found' });
    }

    // Fetch marketplace transactions for this business
    const { data: transactions, error: txError } = await supabase
      .from('marketplace_transactions')
      .select('*')
      .eq('business_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (txError) {
      logger.error('Error fetching seller orders:', txError);
      return res.status(500).json({ error: txError.message });
    }

    const orders = transactions || [];

    const totalEarnings = orders
      .filter((o) => o.status === 'completed')
      .reduce((sum: number, o: any) => sum + (o.seller_payout || 0), 0);

    const pendingPayouts = orders
      .filter((o) => o.status === 'pending')
      .reduce((sum: number, o: any) => sum + (o.seller_payout || 0), 0);

    const response: SellerOrdersResponse = {
      orders,
      totalEarnings,
      pendingPayouts,
      totalOrders: orders.length,
    };

    return res.status(200).json(response);
  } catch (error: any) {
    logger.error('Error in seller orders API:', error);
    return res.status(500).json({ error: error.message });
  }
}
