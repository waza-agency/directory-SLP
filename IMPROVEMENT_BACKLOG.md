# Improvement Backlog — sanluisway.com

Future improvements to prioritize in upcoming sessions. Ordered by estimated impact.

---

## #3 Content Depth Audit (HIGH IMPACT)

**Why:** Google now finds our pages (sitemap fixed 2026-04-08), but thin content won't rank. Pages with <500 words are at risk of being classified as "shallow" by Google.

**What to do:**
- [ ] Run word count audit on all indexable pages — identify <500 word pages
- [ ] Cross-reference with GA4 bounce rate — pages with high bounce = thin or mismatched intent
- [ ] Priority expansion targets:
  - `/places/*` detail pages (most are auto-generated from DB, likely thin)
  - `/cultural/*` subpages (festivals, music-dance, culinary-traditions, customs-etiquette, religious-practices)
  - Older blog posts that may lack depth
- [ ] Add more FAQs to pages that already rank (safety-guide, living-guide already have FAQs — replicate pattern)
- [ ] Add data tables to data-heavy pages (pricing, comparisons, schedules)

**Estimated effort:** 2-3 sessions (content review + expansion)

---

## #4 AdSense Placement Optimization (MEDIUM IMPACT)

**Current state:** AdUnit component only mounted on 3 pages: expat-guide (x2), services. High-traffic pages have zero ads.

**What to do:**
- [ ] Add `<AdUnit>` to these high-traffic pages (in-content, between sections):
  - `/events/all` (19 organic sessions/28d)
  - `/resources/safety-guide` (11 sessions, 63.6% engagement)
  - `/parque-tangamanga` (6 sessions, 66.7% engagement)
  - `/resources/living-guide`
  - `/blog/[slug]` (after article body, before related posts)
- [ ] Test "autorelaxed" format on long guide pages (safety, living, neighborhoods)
- [ ] Do NOT add ads to: landing pages < 1 month old (Google may penalize), checkout/auth flows
- [ ] Monitor AdSense policy center for violations after each placement
- [ ] Track revenue impact per page via AdSense reporting

**Estimated effort:** 1 session (30 min placement + 1 week monitoring)

---

## #5 Editorial Content Pipeline (HIGH IMPACT, ONGOING)

**Why:** A blog that publishes consistently ranks better than one that doesn't. Current blog cadence is irregular.

**What to do:**
- [ ] Create blog post template with pre-filled SEO structure (Article schema, FAQPage, Byline, LastUpdated)
- [ ] Build editorial calendar from GSC query data — keywords at position 11-20 are the sweet spot (already ranking, need one more push)
- [ ] Target 1-2 posts per week on:
  - Seasonal content (FENAPO 2026, Procesión del Silencio, San Luis en Primavera)
  - Evergreen guides (cost of living updates, neighborhood deep-dives)
  - Event recaps (drive social shares + backlinks)
- [ ] Set up Beehiiv newsletter integration to auto-promote new posts

**Estimated effort:** Setup 1 session, ongoing commitment ~2 hours/week

---

## #6 Affiliate Revenue Setup (MEDIUM IMPACT)

**Why:** Travel content is perfectly positioned for affiliate commissions. The infrastructure is ready (ConversionEvents.outboundAffiliateClick tracking already exists in analytics.ts).

**What to do:**
- [ ] Sign up for Booking.com Affiliate Partner Program (https://www.booking.com/affiliate-program)
- [ ] Sign up for GetYourGuide Partner Program (https://partner.getyourguide.com)
- [ ] After approval, add affiliate links to:
  - `/weekend-getaways` — hotel recommendations for Real de Catorce, Huasteca, Media Luna
  - `/resources/living-guide` — temporary housing/Airbnb for new arrivals
  - `/parque-tangamanga` — nearby accommodation
  - `/centro-historico` — boutique hotels in Centro
- [ ] Use `rel="sponsored noopener"` on all affiliate links (required by Google)
- [ ] Track clicks via `ConversionEvents.outboundAffiliateClick()` (already wired)

**Estimated effort:** 1 hour for signup + 1 session for implementation

---

## #7 Microsoft Clarity Activation (LOW EFFORT)

**Status:** Script is installed and CSP is ready. Just needs a project ID.

**Steps:**
1. Go to https://clarity.microsoft.com
2. Sign up with Microsoft account
3. Create new project → enter www.sanluisway.com
4. Copy the project ID (alphanumeric string)
5. Add to Netlify env vars: `NEXT_PUBLIC_CLARITY_ID=your-project-id`
6. Redeploy → Clarity starts recording sessions automatically

**What you get:** Free heatmaps, scroll depth, session replay, rage-click detection, dead-click detection. No sampling limit.

**Estimated effort:** 10 minutes

---

## #8 Internal Linking Audit (MEDIUM IMPACT)

**Why:** Strong internal links help Google discover and value pages. Our new landing pages link to each other via GuideCTA, but older pages don't link to the new ones.

**What to do:**
- [ ] Add contextual links from high-authority pages to new landing pages:
  - Homepage → farmers-markets, free-events, breakfast-spots, food-festivals
  - Blog posts about food → breakfast-spots, farmers-markets
  - Cultural pages → free-events, food-festivals
- [ ] Review hub-and-spoke architecture: every landing page should link to 3-4 related pages and BE linked from 3-4 existing pages

**Estimated effort:** 1 session

---

## Monitoring cadence

| When | What to run | What to look for |
|---|---|---|
| Weekly | `npm run seo:weekly` | indexed count growing, impression trends |
| Bi-weekly | GSC → Sitemaps | warnings/errors returning |
| Monthly | `npm run seo:weekly:json` | save snapshot, compare to baseline |
| Monthly | AdSense → Reports | revenue per page |
| After each deploy | `npm run seo:report` | 97/97 pages still passing |
| After each deploy | `npm run lastupdated:check` | no stale LastUpdated dates |
