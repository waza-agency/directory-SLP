import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const supabase = createServerSupabaseClient({ req, res });

    // Get the user session
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { coupon_code } = req.body;

    if (!coupon_code) {
      return res.status(400).json({ message: 'Coupon code is required' });
    }

    // Check if coupon exists in our database
    const { data: dbCoupon, error: dbError } = await supabase
      .from('admin_coupons')
      .select("*")
      .eq('coupon_code', coupon_code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (dbError || !dbCoupon) {
      return res.status(404).json({
        message: 'Invalid or inactive coupon code'
      });
    }

    // Check if user has already used this coupon
    const { data: existingUsage } = await supabase
      .from('coupon_usage')
      .select("*")
      .eq('user_id', session.user.id)
      .eq('coupon_code', coupon_code.toUpperCase())
      .single();

    if (existingUsage) {
      return res.status(400).json({
        message: 'You have already used this coupon'
      });
    }

    // Validate with Stripe
    try {
      const stripeCoupon = await stripe.coupons.retrieve(dbCoupon.stripe_coupon_id);

      if (!stripeCoupon.valid) {
        return res.status(400).json({
          message: 'Coupon is no longer valid'
        });
      }

      // Check max redemptions
      if (stripeCoupon.max_redemptions && stripeCoupon.times_redeemed >= stripeCoupon.max_redemptions) {
        return res.status(400).json({
          message: 'Coupon has reached its maximum usage limit'
        });
      }

      return res.status(200).json({
        message: 'Coupon is valid',
        coupon: {
          code: dbCoupon.coupon_code,
          name: dbCoupon.name,
          description: dbCoupon.description,
          discount_type: dbCoupon.discount_type,
          discount_value: dbCoupon.discount_value,
          duration: dbCoupon.duration,
          duration_in_months: dbCoupon.duration_in_months
        }
      });

    } catch (stripeError: any) {
      console.error('Error validating coupon with Stripe:', stripeError);
      return res.status(400).json({
        message: 'Invalid coupon code'
      });
    }

  } catch (error: any) {
    console.error('Error validating coupon:', error);
    return res.status(500).json({
      message: error.message || 'Error validating coupon'
    });
  }
}