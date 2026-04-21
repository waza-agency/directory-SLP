/**
 * Paginates ALL Beehiiv subscribers and writes them to a CSV + JSON backup
 * under backups/beehiiv/<timestamp>/. Only requires BEEHIIV_API_KEY — does
 * not need dashboard login (useful when locked out of the account).
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

const BEEHIIV_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUB = process.env.BEEHIIV_PUBLICATION_ID;
const API_BASE = 'https://api.beehiiv.com/v2';
const PAGE_LIMIT = 100;

if (!BEEHIIV_KEY || !BEEHIIV_PUB) {
  console.error('Missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID in .env');
  process.exit(1);
}

async function fetchPage(page) {
  const url = `${API_BASE}/publications/${BEEHIIV_PUB}/subscriptions?limit=${PAGE_LIMIT}&page=${page}&expand[]=custom_fields`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${BEEHIIV_KEY}` },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Beehiiv ${res.status}: ${text}`);
  return JSON.parse(text);
}

function csvEscape(val) {
  if (val === null || val === undefined) return '';
  const s = String(val);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function toIsoDate(unix) {
  if (!unix) return '';
  return new Date(unix * 1000).toISOString();
}

function getCustomField(customFields, name) {
  if (!Array.isArray(customFields)) return '';
  const f = customFields.find((c) => c?.name === name);
  return f?.value ?? '';
}

async function main() {
  console.log('Paginating Beehiiv subscribers...');

  const all = [];
  let page = 1;
  let totalPages = null;
  let totalResults = null;

  while (true) {
    const res = await fetchPage(page);
    const rows = res.data || [];
    all.push(...rows);
    totalPages = res.total_pages ?? totalPages;
    totalResults = res.total_results ?? totalResults;

    console.log(`  Page ${page}/${totalPages ?? '?'} — fetched ${rows.length} (total so far: ${all.length}${totalResults ? '/' + totalResults : ''})`);

    if (!rows.length) break;
    if (totalPages && page >= totalPages) break;
    page += 1;

    // Polite rate limiting
    await new Promise((r) => setTimeout(r, 150));
  }

  if (totalResults && all.length !== totalResults) {
    console.warn(`⚠️  Fetched ${all.length} but Beehiiv reports ${totalResults} total.`);
  }

  // Write outputs
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T').join('_').slice(0, 19);
  const outDir = path.join(__dirname, '..', 'backups', 'beehiiv', timestamp);
  fs.mkdirSync(outDir, { recursive: true });

  // Full raw JSON (keeps every field + custom_fields nested)
  const jsonPath = path.join(outDir, 'subscribers-raw.json');
  fs.writeFileSync(jsonPath, JSON.stringify(all, null, 2));

  // Flattened CSV
  // Discover every custom field name that appears in any subscriber
  const customFieldNames = new Set();
  for (const s of all) {
    for (const cf of s.custom_fields || []) {
      if (cf?.name) customFieldNames.add(cf.name);
    }
  }
  const customFieldCols = Array.from(customFieldNames).sort();

  const baseCols = [
    'id',
    'email',
    'status',
    'subscription_tier',
    'created',
    'created_iso',
    'subscribed_at',
    'subscribed_at_iso',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'referring_site',
    'referral_code_used',
    'referrals',
    'send_welcome_email_on_activation',
  ];
  const headers = [...baseCols, ...customFieldCols.map((n) => `cf_${n}`)];

  const csvLines = [headers.map(csvEscape).join(',')];
  for (const s of all) {
    const row = [
      s.id,
      s.email,
      s.status,
      s.subscription_tier,
      s.created,
      toIsoDate(s.created),
      s.subscribed_at ?? '',
      toIsoDate(s.subscribed_at),
      s.utm_source ?? '',
      s.utm_medium ?? '',
      s.utm_campaign ?? '',
      s.referring_site ?? '',
      s.referral_code_used ?? '',
      s.referrals ?? '',
      s.send_welcome_email_on_activation ?? '',
    ];
    for (const cf of customFieldCols) {
      row.push(getCustomField(s.custom_fields, cf));
    }
    csvLines.push(row.map(csvEscape).join(','));
  }
  const csvPath = path.join(outDir, 'subscribers.csv');
  fs.writeFileSync(csvPath, csvLines.join('\r\n'));

  // Emails-only (simplest, for diffs/re-imports)
  const emailsPath = path.join(outDir, 'emails.txt');
  fs.writeFileSync(
    emailsPath,
    all
      .map((s) => s.email)
      .filter(Boolean)
      .sort()
      .join('\n')
  );

  // Summary stats
  const stats = {
    fetched: all.length,
    reported_total: totalResults,
    by_status: {},
    by_tier: {},
    top_utm_sources: {},
    generated_at: new Date().toISOString(),
    publication_id: BEEHIIV_PUB,
  };
  for (const s of all) {
    stats.by_status[s.status || 'unknown'] = (stats.by_status[s.status || 'unknown'] || 0) + 1;
    stats.by_tier[s.subscription_tier || 'unknown'] = (stats.by_tier[s.subscription_tier || 'unknown'] || 0) + 1;
    const src = s.utm_source || '(none)';
    stats.top_utm_sources[src] = (stats.top_utm_sources[src] || 0) + 1;
  }
  const statsPath = path.join(outDir, 'stats.json');
  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));

  console.log('\n✅ Backup complete');
  console.log(`   Directory: ${outDir}`);
  console.log(`   subscribers-raw.json  (${all.length} records, every field preserved)`);
  console.log(`   subscribers.csv       (flattened + custom fields as columns)`);
  console.log(`   emails.txt            (${all.length} emails, one per line)`);
  console.log(`   stats.json            (counts by status, tier, utm_source)`);
  console.log('\n   Status breakdown:', stats.by_status);
  console.log('   Tier breakdown:  ', stats.by_tier);
}

main().catch((e) => {
  console.error('\n❌', e.message);
  process.exit(1);
});
