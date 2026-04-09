#!/usr/bin/env node
/**
 * Weekly SEO measurement report.
 *
 * Pulls GSC sitemap status, top queries, top pages, and GA4 organic
 * sessions via the claude-seo plugin scripts. Compares against the saved
 * baseline to show deltas. Writes a JSON report and prints a human-readable
 * summary to stdout.
 *
 * Usage:
 *   node scripts/seo-weekly.js              # print report
 *   node scripts/seo-weekly.js --json       # also write JSON to scripts/
 *   node scripts/seo-weekly.js --baseline   # regenerate baseline from current data
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PLUGIN = path.join(
  process.env.USERPROFILE || process.env.HOME || '~',
  '.claude/plugins/marketplaces/agricidaniel-seo/scripts'
);
const BASELINE_PATH = path.join(__dirname, 'baseline-2026-04-09.json');
const REPORT_DIR = __dirname;
const WRITE_JSON = process.argv.includes('--json');
const REGEN_BASELINE = process.argv.includes('--baseline');

function run(cmd) {
  try {
    const out = execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'], timeout: 30000 });
    return JSON.parse(out.toString());
  } catch (e) {
    console.error(`[seo-weekly] Command failed: ${cmd}`);
    return null;
  }
}

function pct(val, total) {
  return total === 0 ? '0.0' : ((val / total) * 100).toFixed(1);
}

function delta(current, baseline) {
  if (baseline === 0 && current === 0) return '0';
  if (baseline === 0) return `+${current} (new)`;
  const d = current - baseline;
  const pctChange = ((d / baseline) * 100).toFixed(0);
  const sign = d >= 0 ? '+' : '';
  return `${sign}${d} (${sign}${pctChange}%)`;
}

function main() {
  const py = 'python';
  const gscProp = 'sc-domain:sanluisway.com';
  const ga4Prop = '494279422';

  console.log('[seo-weekly] Pulling data...\n');

  const sitemaps = run(`${py} "${PLUGIN}/gsc_query.py" sitemaps -p ${gscProp} --json`);
  const queries = run(`${py} "${PLUGIN}/gsc_query.py" query -p ${gscProp} -d 28 --dimensions query --limit 20 --json`);
  const pages = run(`${py} "${PLUGIN}/gsc_query.py" query -p ${gscProp} -d 28 --dimensions page --limit 20 --json`);
  const organic = run(`${py} "${PLUGIN}/ga4_report.py" --property ${ga4Prop} --report organic -d 28 --json`);

  if (!sitemaps || !queries || !organic) {
    console.error('[seo-weekly] Failed to pull one or more data sources. Aborting.');
    process.exit(1);
  }

  // Parse current metrics
  const sitemap = sitemaps.sitemaps?.[0] || {};
  const submitted = parseInt(sitemap.contents?.[0]?.submitted || '0');
  const indexed = parseInt(sitemap.contents?.[0]?.indexed || '0');
  const warnings = parseInt(sitemap.warnings || '0');

  const gscTotalClicks = (queries.rows || []).reduce((s, r) => s + r.clicks, 0);
  const gscTotalImpressions = (queries.rows || []).reduce((s, r) => s + r.impressions, 0);
  const gscAvgCTR = gscTotalImpressions > 0 ? (gscTotalClicks / gscTotalImpressions * 100) : 0;

  const ga4Sessions = organic.totals?.sessions || 0;
  const ga4Users = organic.totals?.users || 0;
  const ga4Pageviews = organic.totals?.pageviews || 0;

  // Load baseline
  let baseline = null;
  if (fs.existsSync(BASELINE_PATH)) {
    baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'));
  }

  const today = new Date().toISOString().split('T')[0];

  // Print report
  console.log(`==========================================`);
  console.log(`  SEO Weekly Report — ${today}`);
  console.log(`==========================================\n`);

  console.log(`SITEMAP STATUS`);
  console.log(`  Submitted URLs:  ${submitted}`);
  console.log(`  Indexed:         ${indexed}${baseline ? ` (${delta(indexed, baseline.gsc.sitemap.indexed)})` : ''}`);
  console.log(`  Warnings:        ${warnings}`);
  console.log(`  Errors:          ${sitemap.errors || 0}\n`);

  console.log(`GSC SEARCH PERFORMANCE (28 days)`);
  console.log(`  Clicks:          ${gscTotalClicks}${baseline ? ` (${delta(gscTotalClicks, baseline.gsc.totals_28d.clicks)})` : ''}`);
  console.log(`  Impressions:     ${gscTotalImpressions}${baseline ? ` (${delta(gscTotalImpressions, baseline.gsc.totals_28d.impressions)})` : ''}`);
  console.log(`  CTR:             ${gscAvgCTR.toFixed(2)}%\n`);

  console.log(`GA4 ORGANIC (28 days)`);
  console.log(`  Sessions:        ${ga4Sessions}${baseline ? ` (${delta(ga4Sessions, baseline.ga4_organic.sessions)})` : ''}`);
  console.log(`  Users:           ${ga4Users}${baseline ? ` (${delta(ga4Users, baseline.ga4_organic.users)})` : ''}`);
  console.log(`  Pageviews:       ${ga4Pageviews}${baseline ? ` (${delta(ga4Pageviews, baseline.ga4_organic.pageviews)})` : ''}\n`);

  console.log(`TOP 10 QUERIES BY CLICKS`);
  const topQ = (queries.rows || []).slice(0, 10);
  for (const q of topQ) {
    const pos = q.position?.toFixed(1) || '—';
    console.log(`  ${q.clicks} clicks | ${q.impressions} imp | pos ${pos} | "${q.query}"`);
  }

  console.log(`\nTOP 10 PAGES BY CLICKS`);
  const topP = (pages?.rows || []).slice(0, 10);
  for (const p of topP) {
    const url = (p.page || '').replace('https://www.sanluisway.com', '').replace('https://sanluisway.com', '') || '/';
    console.log(`  ${p.clicks} clicks | ${p.impressions} imp | ${url}`);
  }

  // Write JSON
  if (WRITE_JSON) {
    const report = {
      date: today,
      period: '28 days',
      sitemap: { submitted, indexed, warnings, errors: parseInt(sitemap.errors || '0') },
      gsc: { clicks: gscTotalClicks, impressions: gscTotalImpressions, ctr: parseFloat(gscAvgCTR.toFixed(2)) },
      ga4_organic: { sessions: ga4Sessions, users: ga4Users, pageviews: ga4Pageviews },
      baseline_date: baseline ? '2026-04-09' : null,
      deltas: baseline ? {
        indexed: indexed - baseline.gsc.sitemap.indexed,
        clicks: gscTotalClicks - baseline.gsc.totals_28d.clicks,
        impressions: gscTotalImpressions - baseline.gsc.totals_28d.impressions,
        sessions: ga4Sessions - baseline.ga4_organic.sessions,
      } : null,
    };
    const outPath = path.join(REPORT_DIR, `seo-report-${today}.json`);
    fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n');
    console.log(`\nJSON report written to: ${outPath}`);
  }

  console.log(`\n[seo-weekly] Done.`);
}

main();
