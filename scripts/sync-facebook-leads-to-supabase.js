/**
 * Script para respaldar leads de Facebook en Supabase newsletter_subscribers
 * Ejecutar: node scripts/sync-facebook-leads-to-supabase.js
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const facebookLeads = [
  { email: 'smedina@altersa.com.mx', first_name: 'Salvador' },
  { email: 'francisco-emilio.ramirez@valeo.com', first_name: 'Francisco' },
  { email: 'dannyelgto@hotmail.com', first_name: 'Daniel' },
  { email: 'ngasga@izzi.mx', first_name: 'Nee-yuu' },
  { email: 'audiologiaslp@gmail.com', first_name: 'Javier' },
  { email: 'promocionesacmk@gmail.com', first_name: 'Alesander' },
  { email: 'juliojuliom@yahoo.es', first_name: 'Julio César' },
  { email: 'igarcia74de@gmail.com', first_name: 'Vivi' },
  { email: 'maya78220@gmail.com', first_name: 'Maetha' },
  { email: 'tere_p@yahoo.com', first_name: 'Tere' },
  { email: 'juanyyake8@gmail.com', first_name: 'Juan Carlos' },
  { email: 'ys313931@gmail.com', first_name: 'Pau' },
  { email: 'jozztb87@gmail.com', first_name: 'José' },
  { email: 'balieiro.aisatours@gmail.com', first_name: 'Claudia' },
  { email: 'm.fersa70@gmail.com', first_name: 'Miguel' },
  { email: 'marcmarin71@gmail.com', first_name: 'Marco' },
];

async function main() {
  console.log('=== Sincronizando leads de Facebook a Supabase ===\n');

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const lead of facebookLeads) {
    // Check if already exists
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', lead.email)
      .single();

    if (existing) {
      console.log(`⏭️  ${lead.email} - Ya existe en Supabase`);
      skipped++;
      continue;
    }

    // Insert new subscriber
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: lead.email,
        first_name: lead.first_name,
        status: 'active',
        source: 'facebook_ads',
        confirmed_at: new Date().toISOString(),
        preferences: {
          weekly_digest: true,
          event_alerts: true,
          promotions: false
        }
      });

    if (error) {
      console.log(`❌ ${lead.email} - Error: ${error.message}`);
      failed++;
    } else {
      console.log(`✅ ${lead.email} - ${lead.first_name}`);
      success++;
    }
  }

  console.log(`\n=== Resumen ===`);
  console.log(`✅ Agregados: ${success}`);
  console.log(`⏭️  Ya existían: ${skipped}`);
  console.log(`❌ Fallidos: ${failed}`);
}

main();
