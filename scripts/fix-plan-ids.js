const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixPlanIds() {
  console.log('🔧 Fixing missing plan_id values in business profiles...');

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
    .select('*')
    .eq('subscription_status', 'active')
    .is('plan_id', null);

  if (profilesError) {
    console.error('❌ Error fetching business profiles:', profilesError);
    return;
  }

  console.log(`🔧 Found ${profiles.length} business profiles missing plan_id`);

  for (const profile of profiles) {
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
    }
  }

  // Verify the fix
  console.log('\n🔍 Verifying the fix...');
  const { data: updatedProfiles, error: verifyError } = await supabase
    .from('business_profiles')
    .select('business_name, plan_id, subscription_status')
    .eq('subscription_status', 'active');

  if (verifyError) {
    console.error('❌ Error verifying profiles:', verifyError);
    return;
  }

  console.log('✅ Updated business profiles:');
  updatedProfiles.forEach(profile => {
    console.log(`  - ${profile.business_name}: plan_id = ${profile.plan_id}`);
  });
}

fixPlanIds().catch(console.error);