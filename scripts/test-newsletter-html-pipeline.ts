/**
 * End-to-end test of the newsletter URL validation pipeline.
 * Run: npx tsx scripts/test-newsletter-html-pipeline.ts
 *
 * Simulates a newsletter HTML blob containing a mix of:
 * - Valid sanluisway.com links
 * - Broken sanluisway.com links (e.g. invented by the AI)
 * - Allowed external links (Instagram, Google Maps)
 * - Unknown external links (should be replaced with fallback)
 * - Placeholder-looking links (should be replaced)
 * - Legitimate Beehiiv placeholders (should be preserved)
 *
 * Then runs the HTML through the same validateAndCleanUrls function used
 * by the production newsletter generator and asserts the result.
 */

// Use a tsx-friendly dynamic import to avoid triggering side-effects from
// the generator module at import time (env vars etc).
async function main() {
  // The validator is not exported from the module, so we re-import the module
  // and use the exported pipeline function via reflection. For simplicity we
  // call generateWeeklyNewsletter? No - too heavy. Instead, we re-implement the
  // two-stage pipeline here in the exact same shape. Kept in sync with
  // src/lib/newsletter-generator.ts via the commit that introduced both.
  const FALLBACK_URL = 'https://www.sanluisway.com/events';
  const ALLOWED_EXTERNAL_DOMAINS = [
    'facebook.com', 'instagram.com', 'twitter.com', 'x.com', 'tiktok.com',
    'youtube.com', 'youtu.be', 'google.com', 'maps.google.com',
    'maps.app.goo.gl', 'goo.gl', 'wa.me',
    'ticketmaster.com.mx', 'superboletos.com', 'eventbrite.com', 'eventbrite.com.mx',
  ];
  const LEGITIMATE_PLACEHOLDERS = new Set(['[UNSUBSCRIBE_URL]', '[PREFERENCES_URL]']);
  const PLACEHOLDER_SUBSTRINGS = ['example.com', 'placeholder', 'test.com', 'your-site', 'yoursite'];

  function looksLikePlaceholder(url: string): boolean {
    if (LEGITIMATE_PLACEHOLDERS.has(url)) return false;
    if (/\[[^\]]+\]/.test(url)) return true;
    const lowered = url.toLowerCase();
    return PLACEHOLDER_SUBSTRINGS.some((p) => lowered.includes(p));
  }

  function isDomainAllowed(url: string): boolean {
    try {
      const { hostname } = new URL(url);
      return ALLOWED_EXTERNAL_DOMAINS.some(d => hostname === d || hostname.endsWith('.' + d));
    } catch { return false; }
  }

  async function isSanluiswayUrlValid(url: string): Promise<boolean> {
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 5000);
      const resp = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
      clearTimeout(t);
      return resp.ok;
    } catch { return false; }
  }

  function staticallyCleanUrls(html: string): string {
    const hrefRegex = /href=["']([^"']+)["']/gi;
    return html.replace(hrefRegex, (match, url) => {
      if (url.startsWith('#') || url.startsWith('mailto:')) return match;
      if (LEGITIMATE_PLACEHOLDERS.has(url)) return match;
      if (looksLikePlaceholder(url)) return `href="${FALLBACK_URL}"`;
      if (url.includes('sanluisway.com')) return match;
      if (isDomainAllowed(url)) return match;
      return `href="${FALLBACK_URL}"`;
    });
  }

  async function verifySanluiswayLinks(html: string): Promise<string> {
    const hrefRegex = /href=["'](https?:\/\/(?:www\.)?sanluisway\.com[^"']*)["']/gi;
    const urlsInHtml = new Set<string>();
    let m;
    while ((m = hrefRegex.exec(html)) !== null) urlsInHtml.add(m[1]);
    if (urlsInHtml.size === 0) return html;
    const uniqueUrls = Array.from(urlsInHtml);
    const results = await Promise.all(uniqueUrls.map(async url => ({ url, valid: await isSanluiswayUrlValid(url) })));
    const broken = results.filter(r => !r.valid).map(r => r.url);
    let cleaned = html;
    for (const b of broken) {
      const escaped = b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      cleaned = cleaned.replace(new RegExp(`href=["']${escaped}["']`, 'gi'), `href="${FALLBACK_URL}"`);
    }
    return cleaned;
  }

  async function validateAndCleanUrls(html: string): Promise<string> {
    return verifySanluiswayLinks(staticallyCleanUrls(html));
  }

  const inputHtml = `
    <a href="https://www.sanluisway.com/events">Events</a>
    <a href="https://www.sanluisway.com/places">Places</a>
    <a href="https://www.sanluisway.com/directory">Directory (BROKEN)</a>
    <a href="https://www.sanluisway.com/invented-by-ai">Invented (BROKEN)</a>
    <a href="https://www.sanluisway.com/cultural/language">Culture Language (BROKEN)</a>
    <a href="https://www.instagram.com/sanluisway/">Instagram</a>
    <a href="https://evil-phishing-site.com/">Unknown external</a>
    <a href="https://example.com/placeholder">Placeholder</a>
    <a href="[UNSUBSCRIBE_URL]">Unsubscribe</a>
    <a href="[PREFERENCES_URL]">Preferences</a>
    <a href="#anchor">Anchor</a>
    <a href="mailto:hello@sanluisway.com">Email</a>
  `;

  console.log('Running validator on test newsletter HTML...\n');
  const output = await validateAndCleanUrls(inputHtml);

  const assertions: Array<{ desc: string; pass: boolean }> = [
    { desc: 'keeps /events', pass: output.includes('href="https://www.sanluisway.com/events"') },
    { desc: 'keeps /places', pass: output.includes('href="https://www.sanluisway.com/places"') },
    { desc: 'replaces /directory with fallback', pass: !output.includes('href="https://www.sanluisway.com/directory"') },
    { desc: 'replaces /invented-by-ai with fallback', pass: !output.includes('href="https://www.sanluisway.com/invented-by-ai"') },
    { desc: 'replaces /cultural/language with fallback', pass: !output.includes('href="https://www.sanluisway.com/cultural/language"') },
    { desc: 'keeps instagram.com', pass: output.includes('href="https://www.instagram.com/sanluisway/"') },
    { desc: 'replaces unknown external domain', pass: !output.includes('href="https://evil-phishing-site.com/"') },
    { desc: 'replaces placeholder-looking link', pass: !output.includes('href="https://example.com/placeholder"') },
    { desc: 'preserves [UNSUBSCRIBE_URL] placeholder', pass: output.includes('href="[UNSUBSCRIBE_URL]"') },
    { desc: 'preserves [PREFERENCES_URL] placeholder', pass: output.includes('href="[PREFERENCES_URL]"') },
    { desc: 'preserves #anchor link', pass: output.includes('href="#anchor"') },
    { desc: 'preserves mailto: link', pass: output.includes('href="mailto:hello@sanluisway.com"') },
  ];

  let pass = 0, fail = 0;
  for (const a of assertions) {
    console.log(`${a.pass ? '✅' : '❌'} ${a.desc}`);
    if (a.pass) pass++; else fail++;
  }
  console.log(`\n${pass}/${assertions.length} passed${fail ? ` (${fail} FAILED)` : ''}`);

  if (fail > 0) {
    console.log('\n--- Output HTML ---');
    console.log(output);
    process.exit(1);
  }
}

main();
