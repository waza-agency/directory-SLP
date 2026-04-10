# Event Pages & Carousel Banner — Design Spec

**Date:** 2026-04-10
**Status:** Approved
**Scope:** 3 dedicated event pages + 1 carousel banner component for sanluisway.com

---

## Goal

Create three high-quality, SEO/GEO/AEO-optimized event landing pages and a homepage carousel banner to capture search traffic for major upcoming events in San Luis Potosí. Replicate the success pattern of the Copa Potosí page (21 clicks / 1,229 impressions from a single event page).

### SEO/GEO/AEO Strategy

- **SEO:** Typed Schema.org markup per event, optimized meta tags per locale, breadcrumbs, keyword-rich content
- **GEO (Generative Engine Optimization):** Rich editorial content with context, history, and practical info that AI search engines can cite as authoritative
- **AEO (Answer Engine Optimization):** FAQPage schema with 8-12 Q&As per page, structured so Google/AI assistants surface direct answers

---

## Architecture

### Approach: Static dedicated pages (Approach A)

Each event gets its own `.tsx` file with hardcoded content sections and full i18n via `next-i18next`. This follows the existing pattern of `fenapo-2025.tsx`, `san-luis-en-primavera-2025.tsx`, and `xantolo-2025.tsx`.

**Why not a dynamic template:** Each event has fundamentally different content needs (race routes vs. band lineups vs. fair areas). A generic template would compromise content quality and SEO.

### New Files

| File | Purpose |
|------|---------|
| `src/components/EventCarouselBanner.tsx` | Rotating banner for homepage |
| `src/pages/events/maraton-tangamanga-2026.tsx` | Marathon event page |
| `src/pages/events/san-luis-metal-fest-2026.tsx` | Metal Fest event page |
| `src/pages/events/fenapo-2026.tsx` | FENAPO 2026 event page (replaces 2025) |

### Modified Files

| File | Change |
|------|--------|
| `src/pages/index.tsx` | Replace `FestivalPrimaveraBanner` with `EventCarouselBanner` |
| `public/locales/en/common.json` | Add ~500-650 translation keys |
| `public/locales/es/common.json` | Add ~500-650 translation keys |
| `public/locales/de/common.json` | Add ~500-650 translation keys |
| `public/locales/ja/common.json` | Add ~500-650 translation keys |

---

## Component: EventCarouselBanner

**Replaces:** `FestivalPrimaveraBanner` in homepage
**Position:** Same slot — after `TodayInSLP`, before `EventsPreview`

### Behavior
- Auto-advances every 6 seconds
- Pauses on hover/touch
- Dot indicators for navigation
- Swipe support on mobile
- Orders events by chronological proximity (nearest first): Metal Fest → Maratón → FENAPO

### Per-slide content
- Unique color theme/gradient per event
- Badge with date range
- Event title (h3)
- 1-line description
- Stats row (3-4 data points)
- CTA button linking to event page

### Slide themes
| Event | Gradient | Accent |
|-------|----------|--------|
| Metal Fest | Black → dark red/purple | Red |
| Maratón Tangamanga | Green → teal | Amber/gold (40th anniversary) |
| FENAPO 2026 | Blue → purple | White/gold |

### i18n
- Translation keys under `eventCarousel.*`
- ~20 keys total (title, description, stats, CTA per event)

---

## Page: Maratón Tangamanga 2026

**URL:** `/events/maraton-tangamanga-2026`
**Date:** June 28, 2026
**Schema:** `SportsEvent` + `FAQPage` + `BreadcrumbList`

### Sections

1. **Hero** — Green/teal sport gradient, badge "40th Anniversary", date, location Parque Tangamanga, CTA to official registration (maratontangamanga.com)

2. **Key stats** — Grid: 40th edition, 4 distances (5K/10K/21K/42K), 15,000+ runners, World Athletics/FMAA certified

3. **Race categories & distances** — Cards per modality with age requirements, estimated prices, start times

4. **Route map** — Route description (Parque Tangamanga → Centro Histórico → return), hydration points, landmarks. Google Maps embed of the area

5. **Runner's guide** — Practical tips: SLP altitude (1,860m), June weather, kit pickup logistics, warm-up zones, altitude hydration

6. **Runner's kit** — Contents (shirt, bib, chip, medal), pickup location/schedule, required documents

7. **Spectator info** — Best viewing spots, parking, public transit, what to do in SLP while waiting

8. **Accommodation & transport** — Airport/bus station directions, recommended hotel zones near Parque Tangamanga

9. **FAQ** — 8-10 questions: medical requirements, cancellation, pacemakers, time limits, altitude tips, registration deadline, chip timing, results access

10. **Final CTA** — Register + link to other SLP events

### i18n
- Translation keys under `events.maraton2026.*`
- ~150-200 keys per locale

---

## Page: San Luis Metal Fest 2026

**URL:** `/events/san-luis-metal-fest-2026`
**Dates:** May 16-17, 2026
**Schema:** `MusicEvent` + `FAQPage` + `BreadcrumbList`

### Sections

1. **Hero** — Dark black/red/purple gradient, metal aesthetic. Badge "1st Edition", "FREE ENTRY", dates, venue: Teatro del Pueblo (FENAPO grounds)

2. **Key stats** — Grid: 2 days, 30,000+ expected attendees, free admission (registration required), international bands from 8+ countries

3. **Lineup** — Cards by day with confirmed bands:
   - Headliners: Marduk, Metal Church, Possessed, Grave, Armored Saint, Crimson Glory, Pestilence
   - More bands: Sacrifice, Hirax, Hellripper, Blood Feast
   - Each band tagged with subgenre (thrash, death, black, heavy) for AEO

4. **Schedule by day** — Visual timeline for Day 1 (May 16) and Day 2 (May 17) with stage times when available, or "schedule TBC" indicator

5. **How to register** — Step-by-step free registration, official link, what you need (ID, etc.)

6. **Attendee guide** — What to bring (sunscreen, ear plugs, hydration), prohibited items, dress code / pit etiquette, venue zones

7. **Food & culture** — Gastronomy pavilion and Huasteca cultural pavilion (unique differentiator of this fest)

8. **Getting there & parking** — FENAPO grounds location, public transit, parking, rideshare, nearby hotel zones

9. **FAQ** — 8-10 questions: re-entry policy, minors policy, water bottles, ATMs, accessibility, cameras, set times, food/drink policy

10. **Final CTA** — Register free + link to other SLP events

### i18n
- Translation keys under `events.metalFest2026.*`
- ~150-200 keys per locale

---

## Page: FENAPO 2026

**URL:** `/events/fenapo-2026`
**Dates:** August 2026 (exact dates TBD)
**Schema:** `Festival` + `FAQPage` + `BreadcrumbList`

### Early-publish strategy

This page publishes NOW with substantial evergreen content (history, areas, visitor guide, FAQ) plus confirmed artists. It will be updated as the official program is announced. The goal is to rank for "FENAPO 2026" queries before competing sites and establish authority.

### Sections

1. **Hero** — Blue/purple gradient (FENAPO identity), badge "2026 Edition", estimated dates August 2026, CTA to feriafenapo.com. Note: "Full program TBC — this page updates as artists and dates are announced"

2. **Key stats** — Grid: ~24 days, confirmed artists (Sin Bandera, Los Acosta, Grupo Firme), free general admission, venue areas

3. **What is FENAPO** — Rich editorial for AEO: history (linked to fiestas patronales of San Luis Rey de Francia, August 25), why it's Mexico's most important fair, economic/tourism impact. Evergreen content that ranks for "what is FENAPO"

4. **Confirmed artists** — Cards by venue:
   - **Teatro del Pueblo** (free): Sin Bandera, Los Acosta + TBC
   - **Palenque** (tickets): Grupo Firme + TBC
   - Section marked "Updates as announced" — drives revisits

5. **Fair areas** — Cards per zone: Teatro del Pueblo, Palenque, Gastronomy Zone, Commercial Exhibition, Mechanical Rides, Cultural Pavilion, Livestock Exhibition, Children's Zone

6. **Visitor guide** — Best days to visit (weekdays = less crowded), what to bring, safety, how to navigate the grounds, family tips

7. **Getting there** — Recinto Ferial location (Av. Fco. Martínez de la Vega 255), public transit, parking, distance from centro/airport

8. **Accommodation** — Recommended hotel zones for out-of-town visitors, price ranges, book early (August fills up)

9. **FAQ** — 10-12 questions: exact dates, palenque ticket prices, parking, bringing food, hours, safety, pets, ATMs, children, accessibility, dress code

10. **Final CTA** — Official site + subscribe to newsletter for FENAPO updates + other events

### i18n
- Translation keys under `events.fenapo2026.*`
- ~180-220 keys per locale

---

## Schema.org Details

### SportsEvent (Maratón)
```json
{
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "name": "BMW Maratón Internacional Tangamanga 2026 — 40 Aniversario",
  "startDate": "2026-06-28",
  "endDate": "2026-06-28",
  "sport": "Running",
  "location": {
    "@type": "Place",
    "name": "Parque Tangamanga I",
    "address": { "@type": "PostalAddress", "addressLocality": "San Luis Potosí", "addressRegion": "SLP", "addressCountry": "MX" }
  },
  "organizer": { "@type": "Organization", "name": "Maratón Tangamanga", "url": "https://maratontangamanga.com/" },
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "maximumAttendeeCapacity": 17000
}
```

### MusicEvent (Metal Fest)
```json
{
  "@context": "https://schema.org",
  "@type": "MusicEvent",
  "name": "San Luis Metal Fest 2026",
  "startDate": "2026-05-16",
  "endDate": "2026-05-17",
  "isAccessibleForFree": true,
  "location": {
    "@type": "Place",
    "name": "Teatro del Pueblo — Recinto FENAPO",
    "address": { "@type": "PostalAddress", "addressLocality": "San Luis Potosí", "addressRegion": "SLP", "addressCountry": "MX" }
  },
  "performer": [
    { "@type": "MusicGroup", "name": "Marduk" },
    { "@type": "MusicGroup", "name": "Possessed" },
    { "@type": "MusicGroup", "name": "Metal Church" }
  ],
  "eventStatus": "https://schema.org/EventScheduled"
}
```

### Festival (FENAPO)
```json
{
  "@context": "https://schema.org",
  "@type": "Festival",
  "name": "FENAPO 2026 — Feria Nacional Potosina",
  "startDate": "2026-08-01",
  "endDate": "2026-08-31",
  "location": {
    "@type": "Place",
    "name": "Recinto Ferial de la FENAPO",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Fco. Martinez de la Vega No. 255",
      "addressLocality": "San Luis Potosí",
      "addressRegion": "SLP",
      "addressCountry": "MX"
    }
  },
  "organizer": { "@type": "Organization", "name": "Gobierno de San Luis Potosí" },
  "eventStatus": "https://schema.org/EventScheduled"
}
```

### FAQPage (example structure, each page has its own)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "...",
      "acceptedAnswer": { "@type": "Answer", "text": "..." }
    }
  ]
}
```

---

## Testing

- Verify all 3 pages build with `next build` (no SSG errors)
- Verify all 4 locales render correctly per page (en/es/de/ja)
- Validate Schema.org output with Google Rich Results Test
- Verify carousel banner auto-advance, pause on hover, dot navigation, swipe
- Verify homepage renders correctly with new banner
- Verify no missing translation keys (no fallback warnings)
- Lighthouse check on each page for performance/SEO scores
