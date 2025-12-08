import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState, useRef, useEffect } from 'react';

const languageFlags: Record<string, string> = {
  en: '🇺🇸',
  es: '🇲🇽',
};

const languageNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
};

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile';
}

export default function LanguageSwitcher({ variant = 'desktop' }: LanguageSwitcherProps) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { locales, locale: currentLocale } = router;

  const changeLanguage = (locale: string) => {
    // Build the new path with locale prefix
    const currentPath = router.asPath;
    // Remove existing locale prefix if present
    const pathWithoutLocale = currentPath.replace(/^\/(es|en)/, '') || '/';
    // Build new URL with the selected locale prefix
    const newPath = `/${locale}${pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'mobile') {
    return (
      <div className="grid grid-cols-2 gap-2">
        {locales?.map((locale) => (
          <button
            key={locale}
            onClick={() => changeLanguage(locale)}
            className={`text-sm px-3 py-2 rounded-lg flex items-center gap-2 ${
              currentLocale === locale
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{languageFlags[locale]}</span>
            <span>{languageNames[locale]}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 hover:text-primary transition-all duration-200 px-4 py-2.5 text-base border border-gray-200 rounded-xl hover:border-primary/30 hover:bg-primary/5 flex items-center hover:scale-105 focus-ring"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="mr-2">{languageFlags[currentLocale || 'en']}</span>
        {languageNames[currentLocale || 'en']}
        <svg
          className={`ml-2 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-xl shadow-xl py-2 animate-scaleIn"
          role="listbox"
        >
          {locales?.map((locale) => (
            <button
              key={locale}
              onClick={() => changeLanguage(locale)}
              role="option"
              aria-selected={currentLocale === locale}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 ${
                currentLocale === locale
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <span className="text-lg">{languageFlags[locale]}</span>
              <span>{languageNames[locale]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
