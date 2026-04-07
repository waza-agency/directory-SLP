#!/usr/bin/env node
/**
 * SEO sitemap report generator.
 *
 * Scans every file under src/pages (excluding API routes, _app/_document,
 * and dynamic segments) and verifies the page exposes the three SEO
 * signals that every indexed URL needs:
 *   1. a <title> (either via the shared <SEO> component or a raw <title>)
 *   2. a meta description
 *   3. a canonical URL (via <SEO>, `<link rel="canonical">`, or the
 *      global HreflangAlternates + SEO component flow in _app.tsx)
 *
 * Writes sitemaps-report.json at the repo root with a pass/fail breakdown
 * and exits 1 when required signals are missing — designed to be wired
 * into CI so regressions fail the build.
 */

const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '..', 'src', 'pages');
const APP_FILE = path.join(PAGES_DIR, '_app.tsx');
const OUTPUT_PATH = path.join(__dirname, '..', 'sitemaps-report.json');

// Pages we deliberately skip: Next.js framework files, API routes,
// dynamic segments (their SEO is generated from data), and non-indexable
// admin/auth pages.
const SKIP_PATTERNS = [
  /[\\/]_app\.tsx$/,
  /[\\/]_document\.tsx$/,
  /[\\/]_error\.tsx$/,
  /[\\/]404\.tsx$/,
  /[\\/]500\.tsx$/,
  /[\\/]api[\\/]/,
  /[\\/]admin[\\/]/,
  /[\\/]signin\.tsx$/,
  /[\\/]signup\.tsx$/,
  /[\\/]checkout[\\/]?/,
  /[\\/]account[\\/]/,
  /[\\/]forgot-password\.tsx$/,
  /[\\/]reset-password\.tsx$/,
  /\[[^\]]+\]/, // dynamic routes like [slug], [id], [...params]
  /sitemap\.xml\.tsx$/,
];

function collectPageFiles(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
        continue;
      }
      if (!/\.(tsx|jsx|ts|js)$/.test(entry.name)) continue;
      if (SKIP_PATTERNS.some((re) => re.test(full))) continue;
      out.push(full);
    }
  }
  return out;
}

function toRoute(filePath) {
  const rel = path.relative(PAGES_DIR, filePath).replace(/\\/g, '/');
  const noExt = rel.replace(/\.(tsx|jsx|ts|js)$/, '');
  if (noExt === 'index') return '/';
  if (noExt.endsWith('/index')) return `/${noExt.slice(0, -'/index'.length)}`;
  return `/${noExt}`;
}

function hasGlobalCanonical() {
  // HreflangAlternates (mounted in _app.tsx) is the single source of
  // truth for canonical tags. If it's imported AND rendered, every page
  // automatically gets a canonical.
  const src = fs.readFileSync(APP_FILE, 'utf8');
  const imported = /HreflangAlternates/.test(src);
  const rendered = /<HreflangAlternates\b/.test(src);
  return imported && rendered;
}

function analyzeFile(filePath, canonicalIsGlobal) {
  const src = fs.readFileSync(filePath, 'utf8');

  // Redirect-only pages (return { redirect } from getServerSideProps/
  // getStaticProps and render null) don't need SEO signals. Also skip
  // pages that explicitly mark themselves noindex.
  const isRedirectOnly = /redirect\s*:\s*\{/.test(src) && /return\s+null/.test(src);
  const isNoIndex =
    /noIndex\s*=\s*\{?\s*true/.test(src) ||
    /content=["']noindex/i.test(src);
  if (isRedirectOnly || isNoIndex) {
    return { skip: true, reason: isRedirectOnly ? 'redirect' : 'noindex' };
  }

  // <SEO> component from src/components/common/SEO.tsx guarantees title
  // and description when the corresponding props are passed.
  const usesSeoComponent = /<SEO\b/.test(src) && /from\s+['"]@\/components\/common\/SEO['"]/.test(src);

  const hasTitleProp = /<SEO[^>]*\btitle\s*=/.test(src);
  const hasDescriptionProp = /<SEO[^>]*\bdescription\s*=/.test(src);
  const hasRawTitle = /<title\b/.test(src);
  const hasMetaDescription = /<meta\b[^>]*name=["']description["']/.test(src);
  const hasCanonicalTag = /<link\b[^>]*rel=["']canonical["']/.test(src);

  const hasTitle = (usesSeoComponent && hasTitleProp) || hasRawTitle;
  const hasDescription = (usesSeoComponent && hasDescriptionProp) || hasMetaDescription;
  // Canonical is emitted globally via HreflangAlternates — if _app.tsx
  // mounts it, every page has one. Pages may still emit their own as a
  // fallback.
  const hasCanonical = canonicalIsGlobal || hasCanonicalTag;

  return { usesSeoComponent, hasTitle, hasDescription, hasCanonical };
}

function main() {
  const canonicalIsGlobal = hasGlobalCanonical();
  const pageFiles = collectPageFiles(PAGES_DIR);
  const report = {
    generatedAt: new Date().toISOString(),
    canonicalIsGlobal,
    totalPages: pageFiles.length,
    pagesSkipped: [],
    pagesWithFullSeo: 0,
    pagesMissingTitle: [],
    pagesMissingDescription: [],
    pagesMissingCanonical: [],
    pagesMissingAny: [],
  };

  if (!canonicalIsGlobal) {
    console.warn('[sitemap-report] WARN: HreflangAlternates is not mounted in _app.tsx — canonical tags are NOT emitted globally. Every page must emit its own.');
  }

  for (const file of pageFiles) {
    const route = toRoute(file);
    const result = analyzeFile(file, canonicalIsGlobal);

    if (result.skip) {
      report.pagesSkipped.push({ route, reason: result.reason });
      continue;
    }

    const missing = [];
    if (!result.hasTitle) missing.push('title');
    if (!result.hasDescription) missing.push('description');
    if (!result.hasCanonical) missing.push('canonical');

    if (missing.length === 0) {
      report.pagesWithFullSeo += 1;
    } else {
      report.pagesMissingAny.push({ route, missing });
      if (!result.hasTitle) report.pagesMissingTitle.push(route);
      if (!result.hasDescription) report.pagesMissingDescription.push(route);
      if (!result.hasCanonical) report.pagesMissingCanonical.push(route);
    }
  }

  // Exclude skipped pages from the success rate so noindex/redirect files
  // don't inflate or deflate the reported number.
  const indexablePages = report.totalPages - report.pagesSkipped.length;

  // Sort route lists so diffs stay stable across runs.
  report.pagesMissingTitle.sort();
  report.pagesMissingDescription.sort();
  report.pagesMissingCanonical.sort();
  report.pagesMissingAny.sort((a, b) => a.route.localeCompare(b.route));
  report.pagesSkipped.sort((a, b) => a.route.localeCompare(b.route));

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2) + '\n');

  const failed = report.pagesMissingAny.length;
  const passed = report.pagesWithFullSeo;
  const skipped = report.pagesSkipped.length;
  const rate = indexablePages > 0 ? ((passed / indexablePages) * 100).toFixed(1) : '0.0';

  console.log(`[sitemap-report] Scanned ${report.totalPages} pages (${skipped} skipped)`);
  console.log(`[sitemap-report] Full SEO: ${passed}/${indexablePages} (${rate}%)`);
  console.log(`[sitemap-report] Missing: ${failed}`);
  console.log(`[sitemap-report] Report written to ${path.relative(process.cwd(), OUTPUT_PATH)}`);

  if (failed > 0) {
    console.error(`\n[sitemap-report] FAIL: ${failed} page(s) missing required SEO signals:`);
    for (const entry of report.pagesMissingAny) {
      console.error(`  ${entry.route} — missing: ${entry.missing.join(', ')}`);
    }
    // Gate CI: exit non-zero when any page is missing required signals.
    // Set ALLOW_SEO_GAPS=1 to soft-fail while triaging regressions.
    if (!process.env.ALLOW_SEO_GAPS) {
      process.exit(1);
    }
  }
}

main();
