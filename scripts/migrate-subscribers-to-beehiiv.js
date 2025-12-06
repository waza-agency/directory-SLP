/**
 * One-time migration script to sync existing Supabase subscribers to Beehiiv
 *
 * Run with: node scripts/migrate-subscribers-to-beehiiv.js
 */

require('dotenv').config();

const BEEHIIV_API_BASE = 'https://api.beehiiv.com/v2';
const BATCH_DELAY_MS = 500; // Delay between batches to avoid rate limiting

async function main() {
  console.log('🚀 Starting Beehiiv subscriber migration...\n');

  // Check required env vars
  if (!process.env.BEEHIIV_API_KEY || !process.env.BEEHIIV_PUBLICATION_ID) {
    console.error('❌ Missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID in .env');
    process.exit(1);
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing Supabase credentials in .env');
    process.exit(1);
  }

  // Initialize Supabase
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Fetch active subscribers from Supabase
  console.log('📥 Fetching subscribers from Supabase...');
  const { data: subscribers, error } = await supabase
    .from('newsletter_subscribers')
    .select('email, first_name, source, subscribed_at')
    .eq('status', 'active');

  if (error) {
    console.error('❌ Supabase error:', error.message);
    process.exit(1);
  }

  console.log(`📊 Found ${subscribers.length} active subscribers\n`);

  if (subscribers.length === 0) {
    console.log('✅ No subscribers to migrate');
    return;
  }

  // Migrate to Beehiiv
  let imported = 0;
  let failed = 0;
  const errors = [];

  for (let i = 0; i < subscribers.length; i++) {
    const sub = subscribers[i];

    try {
      const response = await fetch(
        `${BEEHIIV_API_BASE}/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: sub.email,
            reactivate_existing: true,
            send_welcome_email: false,
            utm_source: sub.source || 'migration',
            utm_medium: 'supabase_migration',
            referring_site: 'https://www.sanluisway.com',
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        imported++;
        process.stdout.write(`\r✅ Progress: ${imported + failed}/${subscribers.length} (${imported} imported, ${failed} failed)`);
      } else {
        failed++;
        errors.push(`${sub.email}: ${result.message || 'Unknown error'}`);
        process.stdout.write(`\r❌ Progress: ${imported + failed}/${subscribers.length} (${imported} imported, ${failed} failed)`);
      }
    } catch (err) {
      failed++;
      errors.push(`${sub.email}: ${err.message}`);
    }

    // Small delay to avoid rate limiting
    if (i < subscribers.length - 1) {
      await new Promise(resolve => setTimeout(resolve, BATCH_DELAY_MS));
    }
  }

  console.log('\n\n📊 Migration Summary:');
  console.log(`   ✅ Imported: ${imported}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📧 Total: ${subscribers.length}`);

  if (errors.length > 0) {
    console.log('\n⚠️ Errors:');
    errors.slice(0, 10).forEach(e => console.log(`   - ${e}`));
    if (errors.length > 10) {
      console.log(`   ... and ${errors.length - 10} more`);
    }
  }

  console.log('\n✨ Migration complete!');
}

main().catch(console.error);
