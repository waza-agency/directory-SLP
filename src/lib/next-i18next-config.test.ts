const path = require('path');

// Using require here because next-i18next.config.js is a CommonJS module
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextI18NextConfig = require('../../next-i18next.config.js');

describe('next-i18next configuration', () => {
  it('exports i18n settings with expected locales and default locale', () => {
    expect(nextI18NextConfig).toBeDefined();
    expect(nextI18NextConfig.i18n).toBeDefined();
    expect(nextI18NextConfig.i18n.defaultLocale).toBe('es');
    expect(nextI18NextConfig.i18n.locales).toEqual(
      expect.arrayContaining(['es', 'en', 'zh', 'ja', 'de'])
    );
  });

  it('defines namespaces and default namespace', () => {
    expect(nextI18NextConfig.ns).toBeDefined();
    expect(nextI18NextConfig.defaultNS).toBeDefined();
    expect(nextI18NextConfig.defaultNS).toBe('common');
    expect(nextI18NextConfig.ns).toEqual(expect.arrayContaining(['common']));
  });

  it('sets localePath to the public/locales directory', () => {
    const expectedPath = path.resolve('./public/locales');
    expect(nextI18NextConfig.localePath).toBe(expectedPath);
  });
});

