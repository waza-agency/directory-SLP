const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addPlanIdColumn() {
  console.log('🔧 Adding plan_id column to business_profiles table...');

  try {
    // First, let's check the current structure
    const { data: tableInfo, error: infoError } = await supabase
      .rpc('get_table_columns', { table_name: 'business_profiles' })
      .single();

    if (infoError) {
      console.log('Using direct SQL to add column...');
    }

    // Add the plan_id column using SQL
    const { data, error } = await supabase.rpc('execute_sql', {
      sql: `
        ALTER TABLE public.business_profiles
        ADD COLUMN IF NOT EXISTS plan_id UUID REFERENCES public.subscription_plans(id);
      `
    });

    if (error) {
      console.error('❌ Error adding column via RPC:', error);

      // Try using a migration instead
      console.log('Trying direct SQL execution...');

      const { error: migrationError } = await supabase
        .from('migrations')
        .insert({
          name: 'add_plan_id_to_business_profiles',
          query: `
            ALTER TABLE public.business_profiles
            ADD COLUMN IF NOT EXISTS plan_id UUID REFERENCES public.subscription_plans(id);
          `
        });

      if (migrationError) {
        console.error('❌ Error adding migration:', migrationError);
        console.log('Manual SQL execution needed...');
        console.log(`
Please run this SQL manually in your Supabase SQL editor:

ALTER TABLE public.business_profiles
ADD COLUMN IF NOT EXISTS plan_id UUID REFERENCES public.subscription_plans(id);
        `);
        return;
      }
    } else {
      console.log('✅ Successfully added plan_id column');
    }

    // Now update existing profiles with the default plan
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

    // Update business profiles with active subscription but missing plan_id
    const { error: updateError } = await supabase
      .from('business_profiles')
      .update({
        plan_id: plan.id
      })
      .eq('subscription_status', 'active')
      .is('plan_id', null);

    if (updateError) {
      console.error('❌ Error updating business profiles:', updateError);
    } else {
      console.log('✅ Updated business profiles with plan_id');
    }

    // Verify the update
    const { data: profiles, error: verifyError } = await supabase
      .from('business_profiles')
      .select('business_name, plan_id, subscription_status')
      .eq('subscription_status', 'active');

    if (verifyError) {
      console.error('❌ Error verifying profiles:', verifyError);
    } else {
      console.log('✅ Updated business profiles:');
      profiles.forEach(profile => {
        console.log(`  - ${profile.business_name}: plan_id = ${profile.plan_id}`);
      });
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

addPlanIdColumn().catch(console.error);