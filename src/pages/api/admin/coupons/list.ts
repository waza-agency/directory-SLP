import { NextApiRequest, NextApiResponse } from 'next';
import { withAdminApiAuth } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/api/supabase-admin';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { data: coupons, error } = await supabaseAdmin
      .from('admin_coupons')
      .select(`
        *,
        coupon_usage(
          id,
          user_id,
          applied_at,
          users(email)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching coupons:', error);
      return res.status(500).json({
        message: 'Error fetching coupons'
      });
    }

    return res.status(200).json({
      coupons: coupons || []
    });

  } catch (error: any) {
    console.error('Error listing coupons:', error);
    return res.status(500).json({
      message: error.message || 'Error listing coupons'
    });
  }
}

export default withAdminApiAuth(handler);