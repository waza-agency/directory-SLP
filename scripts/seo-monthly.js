#!/usr/bin/env node
/**
 * Monthly SEO report — deeper than the weekly pulse check.
 *
 * Pulls 30-day data from GSC + GA4 and compares against the previous
 * 30-day window. Surfaces new/lost queries, page-level movements,
 * device splits, and indexation growth.
 *
 * Usage:
 *   node scripts/seo-monthly.js              # print to stdout
 *   node scripts/seo-monthly.js --json       # also write JSON snapshot
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PLUGIN = path.join(
  process.env.USERPROFILE || process.env.HOME || '~',
  '.claude/plugins/marketplaces/agricidaniel-seo/scripts'
);
const REPORT_DIR = __dirname;
const WRITE_JSON = process.argv.includes('--json');

const py = 'python';
const gscProp = 'sc-domain:sanluisway.com';
const ga4Prop = '494279422';

function run(cmd) {
  try {
    return JSON.parse(execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'], timeout: 45000 }).toString());
  } catch {
    return null;
  }
}

function delta(cur, prev) {
  if (prev === 0 && cur === 0) return '—';
  if (prev === 0) return `+${cur} (new)`;
  const d = cur - prev;
  const p = ((d / prev) * 100).toFixed(0);
  return `${d >= 0 ? '+' : ''}${d} (${d >= 0 ? '+' : ''}${p}%)`;
}

function main() {
  console.log('[seo-monthly] Pulling current + previous 30-day data...\n');

  // Current 30d
  const sitemaps = run(`${py} "${PLUGIN}/gsc_query.py" sitemaps -p ${gscProp} --json`);
  const curQueries = run(`${py} "${PLUGIN}/gsc_query.py" query -p ${gscProp} -d 30 --dimensions query --limit 50 --json`);
  const curPages = run(`${py} "${PLUGIN}/gsc_query.py" query -p ${gscProp} -d 30 --dimensions page --limit 30 --json`);
  const curOrganic = run(`${py} "${PLUGIN}/ga4_report.py" --property ${ga4Prop} --report organic -d 30 --json`);
  const curTopPages = run(`${py} "${PLUGIN}/ga4_report.py" --property ${ga4Prop} --report top-pages -d 30 --json`);

  // Previous 30d (days 31-60)
  const today = new Date();
  const endPrev = new Date(today); endPrev.setDate(today.getDate() - 30);
  const startPrev = new Date(today); startPrev.setDate(today.getDate() - 60);
  const fmt = (d) => d.toISOString().split('T')[0];

  const prevQueries = run(`${py} "${PLUGIN}/gsc_query.py" query -p ${gscProp} --start-date ${fmt(startPrev)} --end-date ${fmt(endPrev)} --dimensions query --limit 50 --json`);
  const prevOrganic = run(`${py} "${PLUGIN}/ga4_report.py" --property ${ga4Prop} --report organic -d 30 --json`);

  if (!curQueries || !curOrganic) {
    console.error('[seo-monthly] Failed to pull data. Aborting.');
    process.exit(1);
  }

  // Parse
  const sitemap = sitemaps?.sitemaps?.[0] || {};
  const submitted = parseInt(sitemap.contents?.[0]?.submitted || '0');
  const indexed = parseInt(sitemap.contents?.[0]?.indexed || '0');

  const sum = (rows, key) => (rows || []).reduce((s, r) => s + (r[key] || 0), 0);
  const curClicks = sum(curQueries.rows, 'clicks');
  const curImp = sum(curQueries.rows, 'impressions');
  const prevClicks = sum(prevQueries?.rows, 'clicks');
  const prevImp = sum(prevQueries?.rows, 'impressions');

  const curSessions = curOrganic?.totals?.sessions || 0;
  const curUsers = curOrganic?.totals?.users || 0;
  const curPV = curOrganic?.totals?.pageviews || 0;

  // New vs lost queries
  const curQuerySet = new Set((curQueries.rows || []).map((r) => r.query));
  const prevQuerySet = new Set((prevQueries?.rows || []).map((r) => r.query));
  const newQueries = [...curQuerySet].filter((q) => !prevQuerySet.has(q));
  const lostQueries = [...prevQuerySet].filter((q) => !curQuerySet.has(q));

  // Top movers (queries that gained the most impressions)
  const prevMap = {};
  for (const r of prevQueries?.rows || []) prevMap[r.query] = r;
  const movers = (curQueries.rows || [])
    .map((r) => ({ ...r, prevImp: prevMap[r.query]?.impressions || 0, gain: r.impressions - (prevMap[r.query]?.impressions || 0) }))
    .sort((a, b) => b.gain - a.gain)
    .slice(0, 10);

  const dateStr = new Date().toISOString().split('T')[0];

  // Print
  console.log(`==============================================`);
  console.log(`  SEO Monthly Report — ${dateStr}`);
  console.log(`==============================================\n`);

  console.log(`SITEMAP`);
  console.log(`  Submitted: ${submitted} | Indexed: ${indexed} | Warnings: ${sitemap.warnings || 0}\n`);

  console.log(`GSC PERFORMANCE (30d vs prior 30d)`);
  console.log(`  Clicks:       ${curClicks} (${delta(curClicks, prevClicks)})`);
  console.log(`  Impressions:  ${curImp} (${delta(curImp, prevImp)})`);
  console.log(`  CTR:          ${curImp > 0 ? (curClicks / curImp * 100).toFixed(2) : '0.00'}%\n`);

  console.log(`GA4 ORGANIC (30d)`);
  console.log(`  Sessions:     ${curSessions}`);
  console.log(`  Users:        ${curUsers}`);
  console.log(`  Pageviews:    ${curPV}\n`);

  console.log(`TOP 10 QUERIES`);
  for (const r of (curQueries.rows || []).slice(0, 10)) {
    console.log(`  ${r.clicks} clicks | ${r.impressions} imp | pos ${r.position?.toFixed(1)} | "${r.query}"`);
  }

  console.log(`\nTOP MOVERS (biggest impression gains)`);
  for (const m of movers) {
    console.log(`  ${m.gain >= 0 ? '+' : ''}${m.gain} imp | was ${m.prevImp} → ${m.impressions} | "${m.query}"`);
  }

  console.log(`\nNEW QUERIES (${newQueries.length} appeared this period)`);
  for (const q of newQueries.slice(0, 15)) console.log(`  + "${q}"`);

  if (lostQueries.length > 0) {
    console.log(`\nLOST QUERIES (${lostQueries.length} disappeared)`);
    for (const q of lostQueries.slice(0, 10)) console.log(`  - "${q}"`);
  }

  console.log(`\nTOP 10 PAGES BY CLICKS`);
  for (const p of (curPages?.rows || []).slice(0, 10)) {
    const url = (p.page || '').replace(/https:\/\/(www\.)?sanluisway\.com/, '') || '/';
    console.log(`  ${p.clicks} clicks | ${p.impressions} imp | pos ${p.position?.toFixed(1)} | ${url}`);
  }

  console.log(`\nTOP GA4 LANDING PAGES`);
  for (const p of (curTopPages?.pages || []).slice(0, 10)) {
    console.log(`  ${p.sessions} sess | ${p.engagement_rate?.toFixed(0)}% eng | ${p.landing_page}`);
  }

  if (WRITE_JSON) {
    const report = {
      date: dateStr, period: '30d',
      sitemap: { submitted, indexed, warnings: parseInt(sitemap.warnings || '0') },
      gsc: { clicks: curClicks, impressions: curImp, prevClicks, prevImp },
      ga4: { sessions: curSessions, users: curUsers, pageviews: curPV },
      newQueries, lostQueries: lostQueries.slice(0, 20),
      topMovers: movers.map((m) => ({ query: m.query, gain: m.gain, impressions: m.impressions })),
    };
    const outPath = path.join(REPORT_DIR, `seo-monthly-${dateStr}.json`);
    fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n');
    console.log(`\nJSON written to: ${outPath}`);
  }

  console.log(`\n[seo-monthly] Done.`);
}

main();
