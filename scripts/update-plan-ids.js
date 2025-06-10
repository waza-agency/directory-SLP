const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function updatePlanIds() {
  console.log('🔧 Updating business profiles with plan_id...');

  try {
    // First, let's check if the plan_id column exists by trying to query it
    console.log('Checking if plan_id column exists...');

    const { data: testQuery, error: testError } = await supabase
      .from('business_profiles')
      .select('id, plan_id')
      .limit(1);

    if (testError && testError.message.includes('plan_id')) {
      console.log(`
❌ The plan_id column doesn't exist yet!

Please run this SQL manually in your Supabase SQL editor first:

-----------------------------------------------
ALTER TABLE public.business_profiles
ADD COLUMN IF NOT EXISTS plan_id UUID REFERENCES public.subscription_plans(id);

CREATE INDEX IF NOT EXISTS idx_business_profiles_plan_id ON public.business_profiles(plan_id);
-----------------------------------------------

Then run this script again.
      `);
      return;
    }

    console.log('✅ plan_id column exists, proceeding with updates...');

    // Get the default subscription plan
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .single();

    if (planError || !plan) {
      console.error('❌ Error fetching subscription plan:', planError);
      return;
    }

    console.log(`✅ Found subscription plan: ${plan.name} (ID: ${plan.id})`);
    console.log(`   Max listings: ${plan.max_listings}`);

    // Get business profiles with active subscription but missing plan_id
    const { data: profiles, error: profilesError } = await supabase
      .from('business_profiles')
      .select('id, business_name, plan_id, subscription_status')
      .eq('subscription_status', 'active');

    if (profilesError) {
      console.error('❌ Error fetching business profiles:', profilesError);
      return;
    }

    console.log(`Found ${profiles.length} business profiles with active subscription`);

    let updatedCount = 0;

    for (const profile of profiles) {
      if (!profile.plan_id) {
        console.log(`  - Updating ${profile.business_name}...`);

        const { error: updateError } = await supabase
          .from('business_profiles')
          .update({
            plan_id: plan.id
          })
          .eq('id', profile.id);

        if (updateError) {
          console.error(`❌ Error updating ${profile.business_name}:`, updateError);
        } else {
          console.log(`✅ Updated ${profile.business_name} with plan_id: ${plan.id}`);
          updatedCount++;
        }
      } else {
        console.log(`  - ${profile.business_name} already has plan_id: ${profile.plan_id}`);
      }
    }

    // Verify the update
    console.log('\n🔍 Verifying the update...');
    const { data: verifyProfiles, error: verifyError } = await supabase
      .from('business_profiles')
      .select('business_name, plan_id, subscription_status')
      .eq('subscription_status', 'active');

    if (verifyError) {
      console.error('❌ Error verifying profiles:', verifyError);
    } else {
      console.log('✅ Business profiles with active subscriptions:');
      verifyProfiles.forEach(profile => {
        console.log(`  - ${profile.business_name}: plan_id = ${profile.plan_id || 'NOT SET'}`);
      });
    }

    console.log(`\n🎉 Updated ${updatedCount} business profiles!`);
    console.log('Users should now be able to create listings.');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

updatePlanIds().catch(console.error);