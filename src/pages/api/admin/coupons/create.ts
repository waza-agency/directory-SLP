import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { withAdminApiAuth } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/api/supabase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      coupon_code,
      name,
      description,
      discount_type, // 'percent' or 'amount'
      discount_value,
      duration, // 'once', 'repeating', 'forever'
      duration_in_months,
      max_redemptions,
      currency = 'mxn'
    } = req.body;

    // Validate required fields
    if (!coupon_code || !name || !discount_type || !discount_value || !duration) {
      return res.status(400).json({
        message: 'Missing required fields: coupon_code, name, discount_type, discount_value, duration'
      });
    }

    // Validate discount type and value
    if (discount_type === 'percent' && (discount_value < 1 || discount_value > 100)) {
      return res.status(400).json({
        message: 'Percent discount must be between 1 and 100'
      });
    }

    if (discount_type === 'amount' && discount_value <= 0) {
      return res.status(400).json({
        message: 'Amount discount must be greater than 0'
      });
    }

    // Check if coupon code already exists
    const { data: existingCoupon } = await supabaseAdmin
      .from('admin_coupons')
      .select("*")
      .eq('coupon_code', coupon_code.toUpperCase())
      .single();

    if (existingCoupon) {
      return res.status(400).json({
        message: 'Coupon code already exists'
      });
    }

    // Create coupon in Stripe
    const stripeCouponData: any = {
      id: coupon_code.toUpperCase(),
      name: name,
      duration: duration,
    };

    if (discount_type === 'percent') {
      stripeCouponData.percent_off = discount_value;
    } else {
      stripeCouponData.amount_off = Math.round(discount_value * 100); // Stripe expects cents
      stripeCouponData.currency = currency;
    }

    if (duration === 'repeating' && duration_in_months) {
      stripeCouponData.duration_in_months = duration_in_months;
    }

    if (max_redemptions) {
      stripeCouponData.max_redemptions = max_redemptions;
    }

    console.log('Creating Stripe coupon:', stripeCouponData);
    const stripeCoupon = await stripe.coupons.create(stripeCouponData);

    // Save coupon to database
    const { data: dbCoupon, error: dbError } = await supabaseAdmin
      .from('admin_coupons')
      .insert({
        coupon_code: coupon_code.toUpperCase(),
        stripe_coupon_id: stripeCoupon.id,
        name: name,
        description: description || null,
        discount_type: discount_type,
        discount_value: discount_value,
        duration: duration,
        duration_in_months: duration_in_months || null,
        max_redemptions: max_redemptions || null,
        is_active: true
      })
      .select()
      .single();

    if (dbError) {
      console.error('Error saving coupon to database:', dbError);
      // Try to delete the Stripe coupon if database save failed
      try {
        await stripe.coupons.del(stripeCoupon.id);
      } catch (stripeDeleteError) {
        console.error('Error deleting Stripe coupon after database failure:', stripeDeleteError);
      }
      return res.status(500).json({
        message: 'Error saving coupon to database'
      });
    }

    return res.status(201).json({
      message: 'Coupon created successfully',
      coupon: dbCoupon,
      stripe_coupon: stripeCoupon
    });

  } catch (error: any) {
    console.error('Error creating coupon:', error);
    return res.status(500).json({
      message: error.message || 'Error creating coupon'
    });
  }
}

export default withAdminApiAuth(handler);