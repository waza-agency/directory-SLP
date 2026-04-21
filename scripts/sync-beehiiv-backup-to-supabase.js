/**
 * Reads the most recent Beehiiv backup JSON under backups/beehiiv/*, maps
 * each subscriber to the newsletter_subscribers schema, and upserts by
 * beehiiv_subscription_id. Idempotent — safe to re-run.
 *
 * Status mapping:
 *   beehiiv 'active'   -> 'active'
 *   beehiiv 'inactive' -> 'unsubscribed'
 *   beehiiv 'invalid'  -> 'bounced'
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const STATUS_MAP = {
  active: 'active',
  inactive: 'unsubscribed',
  invalid: 'bounced',
  pending: 'active',
  validating: 'active',
};

function pickLatestBackup() {
  const root = path.join(__dirname, '..', 'backups', 'beehiiv');
  if (!fs.existsSync(root)) {
    throw new Error(`No backups directory at ${root}. Run backup-beehiiv-subscribers.js first.`);
  }
  const dirs = fs
    .readdirSync(root)
    .filter((d) => fs.statSync(path.join(root, d)).isDirectory())
    .sort();
  if (!dirs.length) throw new Error(`No backups found under ${root}`);
  return path.join(root, dirs[dirs.length - 1], 'subscribers-raw.json');
}

function extractFirstName(sub) {
  for (const cf of sub.custom_fields || []) {
    const name = (cf?.name || '').toLowerCase();
    if (name === 'first_name' || name === 'firstname' || name === 'first name' || name === 'name') {
      return String(cf.value || '').trim().split(/\s+/)[0] || null;
    }
  }
  return null;
}

function toIso(unix) {
  if (!unix) return null;
  return new Date(unix * 1000).toISOString();
}

async function upsertBatch(rows) {
  // email has a real UNIQUE constraint in newsletter_subscribers. The partial
  // unique index on beehiiv_subscription_id doesn't satisfy ON CONFLICT, so
  // we upsert by email and let beehiiv_subscription_id ride along.
  const { error } = await supabase
    .from('newsletter_subscribers')
    .upsert(rows, { onConflict: 'email', ignoreDuplicates: false });
  if (error) throw error;
}

async function main() {
  const jsonPath = pickLatestBackup();
  console.log(`Using backup: ${jsonPath}`);
  const subs = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log(`Loaded ${subs.length} Beehiiv subscribers`);

  const rows = subs
    .filter((s) => s.email)
    .map((s) => {
      const status = STATUS_MAP[s.status] ?? 'active';
      return {
        email: s.email.toLowerCase().trim(),
        first_name: extractFirstName(s),
        status,
        source: s.utm_source || 'beehiiv_backfill',
        subscribed_at: toIso(s.subscribed_at ?? s.created),
        unsubscribed_at: status === 'unsubscribed' ? new Date().toISOString() : null,
        beehiiv_subscription_id: s.id,
        updated_at: new Date().toISOString(),
      };
    });

  // Deduplicate by beehiiv_subscription_id just in case the backup ever has dupes
  const seen = new Set();
  const deduped = [];
  for (const r of rows) {
    if (seen.has(r.beehiiv_subscription_id)) continue;
    seen.add(r.beehiiv_subscription_id);
    deduped.push(r);
  }
  console.log(`Prepared ${deduped.length} unique rows for upsert`);

  // Upsert in batches — Supabase has payload limits
  const BATCH = 200;
  let upserted = 0;
  for (let i = 0; i < deduped.length; i += BATCH) {
    const chunk = deduped.slice(i, i + BATCH);
    await upsertBatch(chunk);
    upserted += chunk.length;
    process.stdout.write(`  upserted ${upserted}/${deduped.length}\r`);
  }
  console.log(`\nFirst pass: upserted ${upserted}`);

  const { count, error: countError } = await supabase
    .from('newsletter_subscribers')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.warn(`Could not count final rows: ${countError.message}`);
  } else {
    console.log(`\n✅ newsletter_subscribers now has ${count} rows (was 176 before this run)`);
  }
}

main().catch((e) => {
  console.error('\n❌', e.message);
  if (e.details) console.error('   details:', e.details);
  if (e.hint) console.error('   hint:', e.hint);
  process.exit(1);
});
