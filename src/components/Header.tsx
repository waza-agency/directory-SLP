import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/supabase-auth';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import HeaderNavigation from './header/HeaderNavigation';
import HeaderSearch from './header/HeaderSearch';
import HeaderUserMenu from './header/HeaderUserMenu';

export default function Header() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { t } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-r from-primary to-secondary h-1 animate-pulse-slow"></div>

      <div className="bg-background/95 shadow-elegant border-b border-gray-100/50 relative z-20">
        <div className="container-responsive flex justify-between items-center py-5">
          <Link href="/" className="flex items-center hover-scale transition-transform duration-200">
            <Image
              src="/images/logo.jpeg"
              alt="SLP Descubre Logo"
              width={600}
              height={60}
              className="h-20 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <HeaderNavigation />

          {/* Search Bar */}
          <HeaderSearch />

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            <HeaderUserMenu user={user} signOut={signOut} />
            <LanguageSwitcher variant="desktop" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-500 hover:text-primary transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 focus-ring"
            onClick={toggleMenu}
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
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-elegant border-t border-gray-100 animate-slide-down">
          <nav className="container-responsive py-4 space-y-2">
            <Link
              href="/"
              onClick={closeMenu}
              className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/places"
              onClick={closeMenu}
              className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
            >
              {t('nav.explore')}
            </Link>
            <Link
              href="/blog"
              onClick={closeMenu}
              className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
            >
              {t('nav.blog')}
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
            >
              {t('nav.about')}
            </Link>
            <Link
              href="/faq"
              onClick={closeMenu}
              className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
            >
              {t('nav.faq')}
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
            >
              {t('nav.contact')}
            </Link>

            <div className="pt-4 border-t border-gray-200">
              <LanguageSwitcher variant="mobile" />
            </div>

            {user ? (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  href="/account"
                  onClick={closeMenu}
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                >
                  {t('nav.dashboard')}
                </Link>
                <button
                  onClick={async () => {
                    await signOut();
                    closeMenu();
                    router.push('/');
                  }}
                  className="w-full text-left py-3 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                >
                  {t('nav.signout')}
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  href="/signin"
                  onClick={closeMenu}
                  className="block py-3 px-4 text-center text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                >
                  {t('nav.signin')}
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="block py-3 px-4 text-center bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-150"
                >
                  {t('nav.getStarted')}
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
