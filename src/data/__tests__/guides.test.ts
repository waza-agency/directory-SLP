import { guides, Guide } from '../guides';
import { outdoorActivities, OutdoorActivity } from '../outdoor';
import { cultureSites, CultureSite } from '../culture';

describe('guides data', () => {
  it('exports a non-empty array', () => {
    expect(guides.length).toBeGreaterThan(0);
  });

  it('every item has required fields', () => {
    guides.forEach((g: Guide) => {
      expect(g.slug).toBeTruthy();
      expect(g.titleKey).toBeTruthy();
      expect(g.descriptionKey).toBeTruthy();
      expect(g.image).toBeTruthy();
      expect(g.path).toBeTruthy();
      expect(Array.isArray(g.tags)).toBe(true);
      expect(g.tags.length).toBeGreaterThan(0);
    });
  });

  it('has unique slugs', () => {
    const slugs = guides.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('paths start with /', () => {
    guides.forEach((g) => {
      expect(g.path.startsWith('/')).toBe(true);
    });
  });
});

describe('outdoorActivities data', () => {
  it('exports a non-empty array', () => {
    expect(outdoorActivities.length).toBeGreaterThan(0);
  });

  it('every item has required fields', () => {
    outdoorActivities.forEach((a: OutdoorActivity) => {
      expect(a.slug).toBeTruthy();
      expect(a.titleKey).toBeTruthy();
      expect(a.descriptionKey).toBeTruthy();
      expect(a.image).toBeTruthy();
      expect(a.path).toBeTruthy();
      expect(a.linkTextKey).toBeTruthy();
      expect(a.badgeKey).toBeTruthy();
      expect(a.badgeColor).toBeTruthy();
    });
  });

  it('has unique slugs', () => {
    const slugs = outdoorActivities.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('paths start with /', () => {
    outdoorActivities.forEach((a) => {
      expect(a.path.startsWith('/')).toBe(true);
    });
  });
});

describe('cultureSites data', () => {
  it('exports a non-empty array', () => {
    expect(cultureSites.length).toBeGreaterThan(0);
  });

  it('every item has required fields', () => {
    cultureSites.forEach((c: CultureSite) => {
      expect(c.slug).toBeTruthy();
      expect(c.titleKey).toBeTruthy();
      expect(c.descriptionKey).toBeTruthy();
      expect(c.image).toBeTruthy();
      expect(c.path).toBeTruthy();
    });
  });

  it('has unique slugs', () => {
    const slugs = cultureSites.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('paths start with /', () => {
    cultureSites.forEach((c) => {
      expect(c.path.startsWith('/')).toBe(true);
    });
  });
});
