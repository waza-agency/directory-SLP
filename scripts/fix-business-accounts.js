const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing SUPABASE environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function fixBusinessAccounts() {
  try {
    console.log('🔍 Diagnosticando cuentas business...\n');

    // 1. Buscar todos los business_profiles que existen
    const { data: businessProfiles, error: profilesError } = await supabase
      .from('business_profiles')
      .select(`
        id,
        user_id,
        business_name,
        subscription_status,
        subscription_id,
        subscription_start_date,
        subscription_end_date,
        plan_id
      `);

    if (profilesError) {
      console.error('Error fetching business profiles:', profilesError);
      return;
    }

    console.log(`📊 Encontrados ${businessProfiles.length} perfiles de business\n`);

        // 2. Para cada perfil, verificar si está correctamente configurado
    let fixedAccounts = 0;
    let alreadyCorrect = 0;

    for (const profile of businessProfiles) {
      // Obtener datos del usuario por separado
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, email, has_active_subscription, account_type, is_business')
        .eq('id', profile.user_id)
        .single();

      if (userError) {
        console.log(`❌ Error obteniendo usuario para ${profile.business_name}:`, userError.message);
        continue;
      }

      const hasActiveBusiness = user.has_active_subscription && user.account_type === 'business';

      console.log(`\n👤 Usuario: ${user.email}`);
      console.log(`   Business: ${profile.business_name}`);
      console.log(`   Subscription Status: ${profile.subscription_status}`);
      console.log(`   User has_active_subscription: ${user.has_active_subscription}`);
      console.log(`   User account_type: ${user.account_type}`);

      // Determinar si necesita ser reparado
      const needsFix = !hasActiveBusiness || !profile.subscription_status || profile.subscription_status !== 'active';

      if (needsFix) {
        console.log(`   ⚠️  NECESITA REPARACIÓN`);

        // 3. Actualizar el usuario
        const { error: userUpdateError } = await supabase
          .from('users')
          .update({
            has_active_subscription: true,
            account_type: 'business',
            is_business: true
          })
          .eq('id', user.id);

        if (userUpdateError) {
          console.log(`   ❌ Error actualizando usuario:`, userUpdateError.message);
          continue;
        }

        // 4. Actualizar el business profile
        const now = new Date();
        const endDate = new Date();
        endDate.setDate(now.getDate() + 30); // 30 días desde ahora

        const { error: profileUpdateError } = await supabase
          .from('business_profiles')
          .update({
            subscription_status: 'active',
            subscription_start_date: now.toISOString(),
            subscription_end_date: endDate.toISOString()
          })
          .eq('id', profile.id);

        if (profileUpdateError) {
          console.log(`   ❌ Error actualizando business profile:`, profileUpdateError.message);
          continue;
        }

        console.log(`   ✅ REPARADO - Usuario ahora reconocido como business`);
        fixedAccounts++;
      } else {
        console.log(`   ✅ Ya está correcto`);
        alreadyCorrect++;
      }
    }

    // 5. Verificar si hay cuentas con listings pero sin subscription_status
    console.log(`\n🔍 Verificando business listings sin subscription activa...\n`);

    const { data: listingsWithoutSub, error: listingsError } = await supabase
      .from('business_listings')
      .select(`
        id,
        business_id,
        title,
        business_profiles!inner(
          id,
          user_id,
          business_name,
          subscription_status
        )
      `)
      .neq('business_profiles.subscription_status', 'active');

    if (listingsError) {
      console.error('Error checking listings:', listingsError);
    } else {
      console.log(`📊 Encontrados ${listingsWithoutSub.length} listings con business profiles inactivos`);

      for (const listing of listingsWithoutSub) {
        const profile = listing.business_profiles;

        // Obtener datos del usuario
        const { data: user, error: userError } = await supabase
          .from('users')
          .select('id, email, has_active_subscription, account_type')
          .eq('id', profile.user_id)
          .single();

        if (userError) {
          console.log(`❌ Error obteniendo usuario para listing ${listing.title}:`, userError.message);
          continue;
        }

        console.log(`\n📋 Listing: ${listing.title}`);
        console.log(`   Business: ${profile.business_name} (${user.email})`);
        console.log(`   Status actual: ${profile.subscription_status}`);

        // Si tiene listings activos, activar su subscription
        const { error: fixError } = await supabase
          .from('business_profiles')
          .update({
            subscription_status: 'active',
            subscription_start_date: new Date().toISOString(),
            subscription_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          })
          .eq('id', profile.id);

        if (!fixError) {
          // También actualizar el usuario
          await supabase
            .from('users')
            .update({
              has_active_subscription: true,
              account_type: 'business'
            })
            .eq('id', user.id);

          console.log(`   ✅ ACTIVADO - Business con listings ahora activo`);
          fixedAccounts++;
        } else {
          console.log(`   ❌ Error activando:`, fixError.message);
        }
      }
    }

    console.log(`\n📈 RESUMEN:`);
    console.log(`   ✅ Cuentas reparadas: ${fixedAccounts}`);
    console.log(`   ✅ Cuentas ya correctas: ${alreadyCorrect}`);
    console.log(`   📊 Total business profiles: ${businessProfiles.length}`);
    console.log(`\n🎉 Proceso completado. Las cuentas business ahora deberían ser reconocidas correctamente.`);

  } catch (error) {
    console.error('Error en fixBusinessAccounts:', error);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  fixBusinessAccounts().then(() => {
    process.exit(0);
  });
}

module.exports = { fixBusinessAccounts };