#!/usr/bin/env node
/**
 * AEO (Answer Engine Optimization) Tracker
 *
 * Checks if sanluisway.com is being cited/mentioned by AI search engines
 * when users ask questions about San Luis Potosí.
 *
 * Supported engines:
 *   - Perplexity Sonar API (best — returns explicit citations with URLs)
 *   - OpenAI ChatGPT API (checks for brand mentions in responses)
 *
 * Usage:
 *   node scripts/aeo-tracker.js                    # run with available APIs
 *   node scripts/aeo-tracker.js --json             # also save JSON report
 *   node scripts/aeo-tracker.js --engine perplexity # only one engine
 *
 * Environment variables:
 *   PERPLEXITY_API_KEY — from https://docs.perplexity.ai (Sonar API)
 *   OPENAI_API_KEY     — from https://platform.openai.com (optional)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const SITE_DOMAIN = 'sanluisway.com';
const BRAND_NAME = 'San Luis Way';
const WRITE_JSON = process.argv.includes('--json');
const ENGINE_FILTER = process.argv.find((a) => a.startsWith('--engine='))?.split('=')[1];

// Target queries — mix of informational queries that potential visitors would ask
const TARGET_QUERIES = [
  'best restaurants in San Luis Potosí Mexico',
  'is San Luis Potosí safe for expats',
  'things to do in San Luis Potosí',
  'cost of living San Luis Potosí 2026',
  'farmers markets in San Luis Potosí',
  'free events San Luis Potosí',
  'best neighborhoods to live in San Luis Potosí',
  'Parque Tangamanga guide',
  'Centro Histórico San Luis Potosí what to see',
  'food festivals San Luis Potosí',
  'breakfast spots San Luis Potosí',
  'expat guide San Luis Potosí Mexico',
  'weekend trips from San Luis Potosí',
  'schools for expat children San Luis Potosí',
  'healthcare for expats San Luis Potosí',
];

function httpsPost(url, headers, body) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.request({
      hostname: parsed.hostname,
      path: parsed.pathname,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
    }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    req.write(JSON.stringify(body));
    req.end();
  });
}

async function queryPerplexity(query, apiKey) {
  const res = await httpsPost('https://api.perplexity.ai/chat/completions', {
    Authorization: `Bearer ${apiKey}`,
  }, {
    model: 'sonar',
    messages: [{ role: 'user', content: query }],
  });

  if (res.status !== 200) {
    return { error: `HTTP ${res.status}`, cited: false, brandMention: false, citations: [] };
  }

  const content = res.body.choices?.[0]?.message?.content || '';
  const citations = res.body.citations || [];

  const cited = citations.some((c) =>
    typeof c === 'string' && c.includes(SITE_DOMAIN)
  );
  const brandMention = content.toLowerCase().includes(BRAND_NAME.toLowerCase()) ||
    content.toLowerCase().includes(SITE_DOMAIN);
  const matchingCitations = citations.filter((c) =>
    typeof c === 'string' && c.includes(SITE_DOMAIN)
  );

  return { cited, brandMention, citations: matchingCitations, totalCitations: citations.length };
}

async function queryOpenAI(query, apiKey) {
  const res = await httpsPost('https://api.openai.com/v1/chat/completions', {
    Authorization: `Bearer ${apiKey}`,
  }, {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Answer helpfully about San Luis Potosí, Mexico. If you know of specific websites or resources, mention them.' },
      { role: 'user', content: query },
    ],
    max_tokens: 500,
  });

  if (res.status !== 200) {
    return { error: `HTTP ${res.status}`, cited: false, brandMention: false };
  }

  const content = res.body.choices?.[0]?.message?.content || '';
  const brandMention = content.toLowerCase().includes(BRAND_NAME.toLowerCase()) ||
    content.toLowerCase().includes(SITE_DOMAIN);

  return { cited: false, brandMention, snippet: brandMention ? content.substring(0, 200) : null };
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function main() {
  const perplexityKey = process.env.PERPLEXITY_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  const engines = [];
  if (perplexityKey && (!ENGINE_FILTER || ENGINE_FILTER === 'perplexity')) engines.push('perplexity');
  if (openaiKey && (!ENGINE_FILTER || ENGINE_FILTER === 'openai')) engines.push('openai');

  if (engines.length === 0) {
    console.log(`[aeo-tracker] No API keys found. Set at least one:\n`);
    console.log(`  PERPLEXITY_API_KEY — https://docs.perplexity.ai (recommended, $5 free credit)`);
    console.log(`  OPENAI_API_KEY     — https://platform.openai.com (optional)\n`);
    console.log(`Then run: PERPLEXITY_API_KEY=pplx-xxx node scripts/aeo-tracker.js`);
    process.exit(1);
  }

  const dateStr = new Date().toISOString().split('T')[0];
  console.log(`==========================================`);
  console.log(`  AEO Tracker — ${dateStr}`);
  console.log(`  Domain: ${SITE_DOMAIN}`);
  console.log(`  Engines: ${engines.join(', ')}`);
  console.log(`  Queries: ${TARGET_QUERIES.length}`);
  console.log(`==========================================\n`);

  const results = {};

  for (const engine of engines) {
    console.log(`--- ${engine.toUpperCase()} ---\n`);
    results[engine] = { cited: 0, brandMentions: 0, total: 0, queries: [] };

    for (let i = 0; i < TARGET_QUERIES.length; i++) {
      const query = TARGET_QUERIES[i];
      process.stdout.write(`  [${i + 1}/${TARGET_QUERIES.length}] "${query.substring(0, 50)}..." `);

      let result;
      if (engine === 'perplexity') {
        result = await queryPerplexity(query, perplexityKey);
      } else {
        result = await queryOpenAI(query, openaiKey);
      }

      if (result.error) {
        console.log(`ERROR: ${result.error}`);
        results[engine].queries.push({ query, error: result.error });
      } else {
        const status = result.cited ? 'CITED' : result.brandMention ? 'MENTIONED' : 'not found';
        const icon = result.cited ? '✓✓' : result.brandMention ? '✓' : '✗';
        console.log(`${icon} ${status}${result.citations?.length ? ` (${result.citations.length} citation(s))` : ''}`);

        if (result.cited) results[engine].cited++;
        if (result.brandMention) results[engine].brandMentions++;
        results[engine].total++;
        results[engine].queries.push({
          query,
          cited: result.cited,
          brandMention: result.brandMention,
          citations: result.citations || [],
        });
      }

      // Rate limiting: 1 second between requests
      if (i < TARGET_QUERIES.length - 1) await sleep(1200);
    }

    const e = results[engine];
    console.log(`\n  Summary: ${e.cited} cited / ${e.brandMentions} mentioned / ${e.total} queried`);
    console.log(`  Citation rate: ${e.total > 0 ? (e.cited / e.total * 100).toFixed(0) : 0}%`);
    console.log(`  Mention rate:  ${e.total > 0 ? (e.brandMentions / e.total * 100).toFixed(0) : 0}%\n`);
  }

  // Overall summary
  console.log(`==========================================`);
  console.log(`  OVERALL AEO VISIBILITY`);
  console.log(`==========================================\n`);

  for (const [engine, data] of Object.entries(results)) {
    const citedQueries = data.queries.filter((q) => q.cited).map((q) => q.query);
    const mentionedQueries = data.queries.filter((q) => q.brandMention && !q.cited).map((q) => q.query);
    const missingQueries = data.queries.filter((q) => !q.cited && !q.brandMention && !q.error).map((q) => q.query);

    console.log(`${engine.toUpperCase()}:`);
    if (citedQueries.length) {
      console.log(`  Cited (URL in sources):`);
      for (const q of citedQueries) console.log(`    ✓✓ "${q}"`);
    }
    if (mentionedQueries.length) {
      console.log(`  Mentioned (brand name in text):`);
      for (const q of mentionedQueries) console.log(`    ✓  "${q}"`);
    }
    if (missingQueries.length) {
      console.log(`  Not found (${missingQueries.length} queries):`);
      for (const q of missingQueries.slice(0, 5)) console.log(`    ✗  "${q}"`);
      if (missingQueries.length > 5) console.log(`    ... and ${missingQueries.length - 5} more`);
    }
    console.log();
  }

  if (WRITE_JSON) {
    const report = { date: dateStr, domain: SITE_DOMAIN, engines: results };
    const outPath = path.join(__dirname, `aeo-report-${dateStr}.json`);
    fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n');
    console.log(`JSON written to: ${outPath}`);
  }

  console.log(`[aeo-tracker] Done.`);
}

main().catch(console.error);
