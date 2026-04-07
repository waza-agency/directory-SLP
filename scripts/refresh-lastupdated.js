#!/usr/bin/env node
/**
 * LastUpdated date refresher.
 *
 * Scans every page file that mounts the <LastUpdated> component and
 * replaces the hardcoded `date="YYYY-MM-DD"` prop with the ISO date of
 * that file's most recent git commit. Run on demand (or as a pre-release
 * step) so "Reviewed on …" signals stay accurate without manual bookkeeping.
 *
 * Usage:
 *   node scripts/refresh-lastupdated.js         # write changes
 *   node scripts/refresh-lastupdated.js --check # exit 1 if any file stale
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PAGES_DIR = path.join(__dirname, '..', 'src', 'pages');
const LASTUPDATED_RE = /<LastUpdated(\s[^>]*?)?\s+date="(\d{4}-\d{2}-\d{2})"/g;
const CHECK_ONLY = process.argv.includes('--check');

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full));
    } else if (/\.(tsx|jsx)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function gitCommitDate(filePath) {
  try {
    // %cs = committer date in YYYY-MM-DD (short ISO), respects --follow
    const rel = path.relative(path.join(__dirname, '..'), filePath);
    const out = execSync(`git log -1 --format=%cs -- "${rel}"`, {
      cwd: path.join(__dirname, '..'),
      stdio: ['ignore', 'pipe', 'pipe'],
    })
      .toString()
      .trim();
    return out || null;
  } catch {
    return null;
  }
}

function main() {
  const files = walk(PAGES_DIR);
  const updates = [];
  const stale = [];

  for (const file of files) {
    const src = fs.readFileSync(file, 'utf8');
    if (!src.includes('<LastUpdated')) continue;

    const gitDate = gitCommitDate(file);
    if (!gitDate) continue;

    let changed = false;
    const next = src.replace(LASTUPDATED_RE, (match, preAttrs, currentDate) => {
      if (currentDate === gitDate) return match;
      changed = true;
      return match.replace(`date="${currentDate}"`, `date="${gitDate}"`);
    });

    if (changed) {
      const rel = path.relative(process.cwd(), file);
      if (CHECK_ONLY) {
        stale.push(rel);
      } else {
        fs.writeFileSync(file, next);
        updates.push(rel);
      }
    }
  }

  if (CHECK_ONLY) {
    if (stale.length === 0) {
      console.log('[refresh-lastupdated] All <LastUpdated> dates match git log.');
      return;
    }
    console.error(`[refresh-lastupdated] ${stale.length} file(s) have stale <LastUpdated> dates:`);
    for (const f of stale) console.error(`  ${f}`);
    console.error('\nRun "npm run lastupdated:refresh" to fix.');
    process.exit(1);
  }

  if (updates.length === 0) {
    console.log('[refresh-lastupdated] Nothing to update.');
    return;
  }

  console.log(`[refresh-lastupdated] Updated ${updates.length} file(s):`);
  for (const f of updates) console.log(`  ${f}`);
}

main();
