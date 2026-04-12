import { resolveKey } from '../i18n';

describe('resolveKey', () => {
  it('resolves a valid dot-separated key in English', () => {
    const result = resolveKey('homepage.practical.family.title', 'en');
    expect(result).toBe('Family Activities');
  });

  it('returns actual text, not the raw key', () => {
    const result = resolveKey('homepage.culture.history.title', 'en');
    expect(typeof result).toBe('string');
    expect(result).not.toContain('.');
  });

  it('falls back to English when key is missing in requested language', () => {
    // 'xx' is not a valid locale, so it should fall back to English
    const result = resolveKey('homepage.practical.family.title', 'xx');
    expect(result).toBe('Family Activities');
  });

  it('returns the key itself when not found in English either', () => {
    const result = resolveKey('nonexistent.deeply.nested.key', 'en');
    expect(result).toBe('nonexistent.deeply.nested.key');
  });

  it('defaults lang to en when not provided', () => {
    const result = resolveKey('homepage.practical.family.title');
    expect(result).toBe('Family Activities');
  });

  it('resolves Spanish keys when lang=es', () => {
    const result = resolveKey('homepage.practical.family.title', 'es');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
