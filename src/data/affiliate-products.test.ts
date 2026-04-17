import {
  AFFILIATE_PRODUCTS,
  getAffiliateProduct,
  getAffiliateProductsByTag,
  getAffiliateProductsByAudience,
  getAffiliateProductsForPost,
} from './affiliate-products';

describe('affiliate-products data', () => {
  it('exports exactly 8 products', () => {
    expect(AFFILIATE_PRODUCTS).toHaveLength(8);
  });

  it('every product has required fields with non-empty values', () => {
    for (const p of AFFILIATE_PRODUCTS) {
      expect(p.id).toMatch(/^[a-z0-9-]+$/);
      expect(['expat', 'tourist', 'mixed']).toContain(p.audience);
      expect(p.titleKey.startsWith('affiliate.products.')).toBe(true);
      expect(p.descriptionKey.startsWith('affiliate.products.')).toBe(true);
      expect(p.priceRangeMxn).toMatch(/MXN/);
      expect(p.affiliateUrl.startsWith('https://meli.la/')).toBe(true);
      expect(p.image.src.startsWith('/images/affiliate/')).toBe(true);
      expect(p.tags.length).toBeGreaterThan(0);
    }
  });

  it('product ids are unique', () => {
    const ids = AFFILIATE_PRODUCTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('affiliate urls are unique', () => {
    const urls = AFFILIATE_PRODUCTS.map((p) => p.affiliateUrl);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('getAffiliateProduct returns product by id', () => {
    const product = getAffiliateProduct('brita-jarra-filtro');
    expect(product).toBeDefined();
    expect(product?.audience).toBe('expat');
  });

  it('getAffiliateProduct returns undefined for unknown id', () => {
    expect(getAffiliateProduct('does-not-exist')).toBeUndefined();
  });

  it('getAffiliateProductsByTag filters correctly', () => {
    const hiking = getAffiliateProductsByTag('hiking');
    expect(hiking.length).toBeGreaterThan(0);
    hiking.forEach((p) => expect(p.tags).toContain('hiking'));
  });

  it('getAffiliateProductsForPost returns empty when no tags/category/slug given', () => {
    expect(getAffiliateProductsForPost({})).toEqual([]);
  });

  it('getAffiliateProductsForPost matches huasteca-tagged products via tag', () => {
    const results = getAffiliateProductsForPost({ tags: ['huasteca'] });
    expect(results.length).toBeGreaterThan(0);
    results.forEach((p) => {
      expect(p.tags.some((t) => t.includes('huasteca'))).toBe(true);
    });
  });

  it('getAffiliateProductsForPost matches via slug keyword', () => {
    const results = getAffiliateProductsForPost({ slug: 'real-de-catorce-camping-guide' });
    expect(results.length).toBeGreaterThan(0);
  });

  it('getAffiliateProductsForPost respects limit', () => {
    const results = getAffiliateProductsForPost({
      tags: ['outdoor', 'hiking', 'hydration', 'camping'],
      limit: 2,
    });
    expect(results.length).toBeLessThanOrEqual(2);
  });

  it('getAffiliateProductsByAudience includes mixed products for every audience', () => {
    const expatProducts = getAffiliateProductsByAudience('expat');
    const touristProducts = getAffiliateProductsByAudience('tourist');
    const mixed = AFFILIATE_PRODUCTS.filter((p) => p.audience === 'mixed');
    mixed.forEach((p) => {
      expect(expatProducts).toContainEqual(p);
      expect(touristProducts).toContainEqual(p);
    });
  });
});
