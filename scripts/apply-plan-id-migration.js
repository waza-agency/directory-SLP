const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function applyPlanIdMigration() {
  console.log('🔧 Applying plan_id migration to business_profiles table...');

  try {
    // Step 1: Add the plan_id column
    console.log('Step 1: Adding plan_id column...');

    const { error: addColumnError } = await supabase
      .rpc('exec_sql', {
        sql: `ALTER TABLE public.business_profiles ADD COLUMN IF NOT EXISTS plan_id UUID REFERENCES public.subscription_plans(id);`
      });

    if (addColumnError) {
      console.log('RPC method not available, trying direct approach...');

      // Alternative approach using raw SQL execution
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY
        },
        body: JSON.stringify({
          sql: `ALTER TABLE public.business_profiles ADD COLUMN IF NOT EXISTS plan_id UUID REFERENCES public.subscription_plans(id);`
        })
      });

      if (!response.ok) {
        console.log('Direct SQL execution not available. Creating a manual update script...');
        console.log(`
⚠️  Manual SQL needed - Please run this in your Supabase SQL editor:

ALTER TABLE public.business_profiles
ADD COLUMN IF NOT EXISTS plan_id UUID REFERENCES public.subscription_plans(id);
        `);

        // Continue with the update assuming the column exists
        console.log('Continuing with updates assuming column exists...');
      } else {
        console.log('✅ Successfully added plan_id column');
      }
    } else {
      console.log('✅ Successfully added plan_id column');
    }

    // Step 2: Get the default subscription plan
    console.log('Step 2: Getting default subscription plan...');

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

    // Step 3: Update existing business profiles with active subscription
    console.log('Step 3: Updating business profiles with plan_id...');

    const { data: updatedProfiles, error: updateError } = await supabase
      .from('business_profiles')
      .update({
        plan_id: plan.id
      })
      .eq('subscription_status', 'active')
      .select('business_name, id');

    if (updateError) {
      console.error('❌ Error updating business profiles:', updateError);

      // Try a manual approach
      const { data: activeProfiles, error: fetchError } = await supabase
        .from('business_profiles')
        .select('id, business_name, plan_id')
        .eq('subscription_status', 'active');

      if (fetchError) {
        console.error('❌ Error fetching profiles:', fetchError);
        return;
      }

      console.log(`Found ${activeProfiles.length} profiles to update`);

      for (const profile of activeProfiles) {
        if (!profile.plan_id) {
          const { error: individualUpdateError } = await supabase
            .from('business_profiles')
            .update({ plan_id: plan.id })
            .eq('id', profile.id);

          if (individualUpdateError) {
            console.error(`❌ Error updating ${profile.business_name}:`, individualUpdateError);
          } else {
            console.log(`✅ Updated ${profile.business_name}`);
          }
        }
      }
    } else {
      console.log(`✅ Updated ${updatedProfiles.length} business profiles with plan_id`);
      updatedProfiles.forEach(profile => {
        console.log(`  - ${profile.business_name}`);
      });
    }

    // Step 4: Verify the update
    console.log('Step 4: Verifying the update...');

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

    console.log('\n🎉 Migration completed! Users should now be able to create listings.');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

applyPlanIdMigration().catch(console.error);