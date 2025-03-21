import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

export default function Header() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  
  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  // Map of language codes to display names
  const languages = {
    en: 'English',
    es: 'Español',
    de: 'Deutsch',
    ja: '日本語'
  };

  return (
    <header className="bg-white border-b border-gray-100 py-4 px-6 shadow-elegant sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="font-serif text-2xl font-bold text-gray-900">SLP <span className="text-primary">Descubre</span></span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            href="/"
            className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
          >
            {t('home')}
          </Link>
          
          <Link 
            href="/places"
            className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
          >
            {t('explore')}
          </Link>
          
          <Link 
            href="/about"
            className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
          >
            {t('about')}
          </Link>
          
          <Link 
            href="/contact"
            className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
          >
            {t('contact')}
          </Link>
          
          {/* Desktop Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="text-gray-700 hover:text-gray-900 transition-colors px-3 py-1 text-sm border border-gray-200 rounded-md hover:border-gray-300 flex items-center"
            >
              {languages[router.locale as keyof typeof languages] || 'English'}
              <svg 
                className={`ml-2 w-4 h-4 transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {isLanguageMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
                {Object.entries(languages).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => {
                      changeLanguage(code);
                      setIsLanguageMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${router.locale === code ? 'bg-gray-100 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-500 hover:text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 mt-2 rounded-md shadow-md animate-fadeIn">
          <div className="flex flex-col space-y-3">
            <Link 
              href="/"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('home')}
            </Link>
            
            <Link 
              href="/places"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('explore')}
            </Link>
            
            <Link 
              href="/about"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('about')}
            </Link>
            
            <Link 
              href="/contact"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('contact')}
            </Link>
            
            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">{t('language')}</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(languages).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => {
                      changeLanguage(code);
                      setIsMenuOpen(false);
                    }}
                    className={`text-sm px-3 py-2 border rounded-md transition-colors ${
                      router.locale === code 
                        ? 'bg-primary/10 text-primary border-primary' 
                        : 'text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 