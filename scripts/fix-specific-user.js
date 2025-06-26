const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing SUPABASE environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function fixSpecificUser() {
  try {
    const userEmail = 'aldofoyomusica@gmail.com';
    console.log(`🔧 Reparando completamente la cuenta: ${userEmail}\n`);

    // 1. Buscar usuario
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', userEmail)
      .single();

    if (userError) {
      console.error('❌ Error encontrando usuario:', userError);
      return;
    }

    console.log(`✅ Usuario encontrado: ${user.email} (ID: ${user.id})`);

    // 2. Buscar business profile
    const { data: profile, error: profileError } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileError) {
      console.error('❌ Error encontrando business profile:', profileError);
      return;
    }

    console.log(`✅ Business Profile: ${profile.business_name} (ID: ${profile.id})`);

    // 3. Obtener o crear plan de suscripción
    let { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .single();

    if (planError || !plan) {
      console.log('📋 Creando plan de suscripción por defecto...');

      const { data: newPlan, error: createPlanError } = await supabase
        .from('subscription_plans')
        .insert({
          name: 'Business Profile',
          description: 'Create your business profile and list up to 10 services or products',
          price_monthly: 250.00,
          price_yearly: 2500.00,
          max_listings: 10,
          features: {
            custom_profile: true,
            analytics_dashboard: true,
            priority_support: false
          },
          is_active: true
        })
        .select()
        .single();

      if (createPlanError) {
        console.error('❌ Error creando plan:', createPlanError);
        return;
      }

      plan = newPlan;
    }

    console.log(`✅ Plan de suscripción: ${plan.name} (ID: ${plan.id})`);
    console.log(`   Max listings: ${plan.max_listings}`);

    // 4. Crear o actualizar subscription en tabla subscriptions
    const now = new Date();
    const endDate = new Date();
    endDate.setDate(now.getDate() + 30); // 30 días

    const { data: existingSubscription, error: checkSubError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (existingSubscription) {
      console.log('🔄 Actualizando suscripción existente...');

      const { error: updateSubError } = await supabase
        .from('subscriptions')
        .update({
          status: 'active',
          plan_id: plan.id,
          current_period_start: now.toISOString(),
          current_period_end: endDate.toISOString(),
          interval: 'monthly'
        })
        .eq('id', existingSubscription.id);

      if (updateSubError) {
        console.error('❌ Error actualizando suscripción:', updateSubError);
        return;
      }
    } else {
      console.log('➕ Creando nueva suscripción...');

      const { error: createSubError } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          plan_id: plan.id,
          status: 'active',
          current_period_start: now.toISOString(),
          current_period_end: endDate.toISOString(),
          interval: 'monthly',
          stripe_subscription_id: `local_sub_${user.id}`,
          stripe_customer_id: `cus_${user.id}`
        });

      if (createSubError) {
        console.error('❌ Error creando suscripción:', createSubError);
        return;
      }
    }

    // 5. Actualizar usuario
    const { error: userUpdateError } = await supabase
      .from('users')
      .update({
        has_active_subscription: true,
        account_type: 'business',
        is_business: true
      })
      .eq('id', user.id);

    if (userUpdateError) {
      console.error('❌ Error actualizando usuario:', userUpdateError);
      return;
    }

    // 6. Actualizar business profile
    const { error: profileUpdateError } = await supabase
      .from('business_profiles')
      .update({
        subscription_status: 'active',
        plan_id: plan.id,
        subscription_start_date: now.toISOString(),
        subscription_end_date: endDate.toISOString()
      })
      .eq('id', profile.id);

    if (profileUpdateError) {
      console.error('❌ Error actualizando business profile:', profileUpdateError);
      return;
    }

    // 7. Verificar listings actuales
    const { data: listings, error: listingsError } = await supabase
      .from('business_listings')
      .select('*')
      .eq('business_id', profile.id);

    if (!listingsError) {
      console.log(`📝 Listings actuales: ${listings.length}/${plan.max_listings}`);
    }

    console.log('\n🎉 ¡REPARACIÓN COMPLETADA!');
    console.log('✅ Usuario actualizado como business');
    console.log('✅ Business profile activado');
    console.log('✅ Suscripción creada/actualizada en tabla subscriptions');
    console.log('✅ Plan asignado correctamente');
    console.log('\n📱 Ahora deberías poder crear nuevos listings sin problemas.');

  } catch (error) {
    console.error('❌ Error en fixSpecificUser:', error);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  fixSpecificUser().then(() => {
    process.exit(0);
  });
}

module.exports = { fixSpecificUser };