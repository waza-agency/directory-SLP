require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const CUTOFF = process.argv[2] || '2026-04-18';

(async () => {
  const { data: toDelete, error: fetchErr } = await supabase
    .from('events')
    .select('*')
    .lt('end_date', CUTOFF)
    .order('end_date');

  if (fetchErr) { console.error('Fetch:', fetchErr); process.exit(1); }

  if (!toDelete?.length) {
    console.log('Nothing to delete.');
    return;
  }

  console.log(`Found ${toDelete.length} events ending before ${CUTOFF}:`);
  toDelete.forEach((e) => console.log(`  ${e.end_date.slice(0, 10)} | ${e.category.padEnd(16)} | ${e.title}`));

  const backupPath = path.join(__dirname, `deleted-events-backup-${CUTOFF}.json`);
  fs.writeFileSync(backupPath, JSON.stringify(toDelete, null, 2));
  console.log(`\nBackup saved: ${backupPath}`);

  const ids = toDelete.map((e) => e.id);
  const { error: deleteErr } = await supabase.from('events').delete().in('id', ids);
  if (deleteErr) { console.error('Delete:', deleteErr); process.exit(1); }

  const { count: remaining } = await supabase.from('events').select('id', { count: 'exact', head: true });
  const { count: remainingPast } = await supabase.from('events').select('id', { count: 'exact', head: true }).lt('end_date', CUTOFF);

  console.log(`\n✅ Deleted ${toDelete.length} events.`);
  console.log(`   Events remaining: ${remaining}`);
  console.log(`   Past events still in DB: ${remainingPast}`);
})();
