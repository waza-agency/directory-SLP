import fs from 'fs';
import path from 'path';

const cache: Record<string, Record<string, unknown>> = {};

function loadLocale(lang: string): Record<string, unknown> {
  if (cache[lang]) return cache[lang];
  const filePath = path.join(process.cwd(), 'public', 'locales', lang, 'common.json');
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    cache[lang] = JSON.parse(content);
    return cache[lang];
  } catch {
    return {};
  }
}

export function resolveKey(key: string, lang = 'en'): string {
  const translations = loadLocale(lang);
  const parts = key.split('.');
  let current: unknown = translations;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      if (lang !== 'en') return resolveKey(key, 'en');
      return key;
    }
  }
  return typeof current === 'string' ? current : key;
}
