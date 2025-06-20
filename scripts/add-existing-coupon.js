const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addExistingCoupon() {
  try {
    console.log('Adding existing AMIGOSSLPWAY coupon to database...');

    // Check if coupon already exists
    const { data: existingCoupon, error: checkError } = await supabase
      .from('admin_coupons')
      .select('id')
      .eq('coupon_code', 'AMIGOSSLPWAY')
      .single();

    if (existingCoupon) {
      console.log('Coupon AMIGOSSLPWAY already exists in database');
      return;
    }

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking for existing coupon:', checkError);
      return;
    }

    // Insert the existing coupon
    const { data: coupon, error: insertError } = await supabase
      .from('admin_coupons')
      .insert({
        coupon_code: 'AMIGOSSLPWAY',
        stripe_coupon_id: 'promo_1RbsClIg6TQpITo3QPJNyqzF',
        name: 'Amigos SLP Way Discount',
        description: 'Special discount for SLP community members - 100% off for 3 months',
        discount_type: 'percent',
        discount_value: 100,
        duration: 'repeating',
        duration_in_months: 3,
        max_redemptions: 100,
        times_redeemed: 0,
        is_active: true
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting coupon:', insertError);
      return;
    }

    console.log('Successfully added coupon to database:');
    console.log('- Code:', coupon.coupon_code);
    console.log('- Name:', coupon.name);
    console.log('- Discount:', `${coupon.discount_value}% off`);
    console.log('- Duration:', `${coupon.duration_in_months} months`);
    console.log('- Max redemptions:', coupon.max_redemptions);
    console.log('- Stripe ID:', coupon.stripe_coupon_id);

  } catch (error) {
    console.error('Error adding coupon:', error);
  }
}

// Run the script
addExistingCoupon();