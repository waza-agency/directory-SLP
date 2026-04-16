# Affiliate Products Integration — Design Spec

**Date:** 2026-04-16
**Status:** Draft — pending user approval
**Owner:** @drunkenscreener

## Goal

Integrate 8 Mercado Libre affiliate products into sanluisway.com to generate commission revenue. Target: existing audience mix of expats/digital nomads living in SLP and tourists researching visits to SLP, Huasteca, Real de Catorce, Xilitla.

## Products

Source of truth: `Affiliate-products/links.txt`

| # | Product | Audience | Affiliate link |
|---|---|---|---|
| 1 | Jarra filtro agua Brita | Expat | meli.la/2s9PKrz |
| 2 | Termo Tinec 40oz inoxidable | Mixed | meli.la/1Pv4EmD |
| 3 | Tenis Columbia senderismo | Tourist | meli.la/2jQtBwk |
| 4 | Mochila hidratación táctica 3L | Tourist | meli.la/1dN2H5K |
| 5 | Lentes polarizados Dubery D620 | Mixed | meli.la/1GDLhE4 |
| 6 | Sandalias acuáticas todo terreno | Tourist | meli.la/2xznpGL |
| 7 | Purificador aire Levoit HEPA | Expat | meli.la/2Pc1BMy |
| 8 | Lámpara frontal Black Diamond | Tourist | meli.la/2dAa6rm |

## Approach: Reusable Component, Mixed Placement

One component `<AffiliateCard>` used in three display modes, embedded contextually across existing pages. No dedicated "products" page — products appear where purchase intent is highest.

### Display modes

1. **Grid** — 2-column (desktop) / 1-column (mobile) section of 2–4 cards. Used on `/outdoors`, `/expat-guide`, `/visit-guide`, `/digital-nomad-guide`.
2. **Inline** — single card, full width, embedded mid-article in blog posts / long-form pages.
3. **Checklist item** — compact horizontal variant for `/resources/arrival-checklist` (slots into existing checklist structure).

Rejected alternative: sidebar banners. Low CTR, interrupts reading flow.

## Product → Page Mapping

| Product | Primary placements |
|---|---|
| 1. Brita | arrival-checklist (checklist), expat-guide (grid), blog post on water quality |
| 2. Termo | outdoors (grid), digital-nomad-guide (grid), Huasteca blog posts (inline) |
| 3. Columbia tenis | outdoors (grid), Real de Catorce blog (inline), Huasteca blog (inline) |
| 4. Mochila hidratación | outdoors (grid), Tamul/Sierra blog posts (inline) |
| 5. Lentes Dubery | outdoors (grid), visit-guide (grid), Real de Catorce blog (inline) |
| 6. Sandalias acuáticas | Media Luna / Huasteca / Puente de Dios blog posts (inline) |
| 7. Levoit | expat-guide (grid), arrival-checklist (checklist), spouse-hub (inline) |
| 8. Lámpara frontal | outdoors (grid), Real de Catorce camping blog (inline) |

## Rollout: MVP → Expand

**Phase 1 (MVP):** Ship on `/outdoors` + `/resources/arrival-checklist` only. Covers 7 of 8 products in grid/checklist form (products 1, 2, 3, 4, 5, 7, 8). Product #6 (sandalias acuáticas) ships in Phase 2 because its primary placements are all blog posts (Media Luna, Huasteca, Puente de Dios). Phase 1 lets us measure CTR and conversion before expanding.

**Phase 2:** Add inline placements — including product #6 — in the top 5 most-trafficked blog posts (determined from GA4 after Phase 1).

**Phase 3:** Expand grid to `/expat-guide`, `/visit-guide`, `/digital-nomad-guide`, `/spouse-hub`.

## Technical Design

### Data layer

File: `src/data/affiliate-products.ts`

```ts
export type AffiliateProduct = {
  id: string;                    // slug-id, e.g. "brita-jarra-filtro"
  category: 'expat' | 'tourist' | 'mixed';
  titleKey: string;              // i18n key, e.g. "affiliate.products.brita.title"
  descriptionKey: string;        // i18n key
  affiliateUrl: string;          // meli.la/...
  image: {
    src: string;                 // /images/affiliate/brita-jarra.webp (local)
    alt: string;                 // generic fallback, not localized
  };
  priceRange: string;            // display-only, e.g. "$400–800 MXN"
  tags: string[];                // for filtering/matching to pages
};

export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [ /* 8 entries */ ];
```

### Component

File: `src/components/affiliate/AffiliateCard.tsx`

Props:
```ts
type Props = {
  productId: string;             // looks up AFFILIATE_PRODUCTS
  variant: 'grid' | 'inline' | 'checklist';
  locale?: string;               // falls back to useRouter().locale
};
```

Renders:
- Product image (local, optimized via next/image)
- Title (from i18n)
- Short description (from i18n)
- Price range (display-only)
- CTA button "Ver en Mercado Libre" (localized) → `affiliateUrl`
- Disclosure text "Enlace de afiliado" (localized, below CTA)

Link attributes (required by ML affiliate TOS + SEO hygiene):
- `target="_blank"`
- `rel="sponsored nofollow noopener noreferrer"`
- `onClick` fires GA4 event `affiliate_click` with `{ product_id, placement, page }`

Parent wrapper `<AffiliateGrid>` handles 2-col responsive layout and section heading.

### Images

Downloaded locally to `public/images/affiliate/{product-id}.webp`. Source: `mlstatic.com` URLs captured from meli.la page metadata. Local hosting chosen over CDN hotlinking because:
- Prevents external URL rot if ML changes image paths
- Faster LCP (served from our CDN)
- Avoids the CORS/referrer weirdness of hotlinking mlstatic

### i18n

Add to `public/locales/{en,es,de,ja}/common.json`:

```json
{
  "affiliate": {
    "disclosure": "Affiliate link — we may earn a commission at no extra cost to you.",
    "cta": "View on Mercado Libre",
    "sectionTitle": "Essentials for SLP",
    "products": {
      "brita": { "title": "...", "description": "..." },
      /* ...8 products */
    }
  }
}
```

All 4 locales required (project ships real content in en/es/de/ja).

### Analytics

GA4 event on click:
```ts
window.gtag?.('event', 'affiliate_click', {
  product_id: product.id,
  placement: variant,        // grid | inline | checklist
  page_path: router.asPath
});
```

This lets us measure CTR per placement and optimize Phase 2/3.

## Testing Strategy

- **Unit:** `AffiliateCard` renders each variant with correct i18n, link attributes, and fires analytics on click (jest + RTL).
- **Integration:** `/outdoors` and `/arrival-checklist` smoke tests verify products render and links point to meli.la domain.
- **Manual:** Click each of the 8 links in a deployed preview; confirm meli.la redirect works and ML tracking fires.

## Out of Scope

- Admin UI to edit affiliate products (YAGNI — 8 static products, edit the data file)
- Price scraping from ML (prices drift; display is a range, not live)
- Dedicated `/products` or `/essentials` page (Phase 1 stays embedded; revisit in Phase 3)
- A/B testing of placements (add only if Phase 1 data shows ambiguity)

## Open Questions

None — all resolved in brainstorm:
- Format: D (mixed)
- Rollout: MVP first
- Images: local
