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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/95">
      <div className="bg-gradient-to-r from-primary to-secondary h-0.5"></div>

      <div className="shadow-sm border-b border-gray-100/50">
        <div className="container-responsive">
          <div className="flex justify-between items-center py-3">
            <Link
              href="/"
              className="flex items-center transition-transform duration-200 hover:scale-105"
            >
              <Image
                src="/images/logo.jpeg"
                alt="SLP Descubre Logo"
                width={480}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <HeaderNavigation />

            {/* Search Bar */}
            <HeaderSearch />

            {/* Desktop Auth & Language */}
            <div className="hidden lg:flex items-center gap-3">
              <HeaderUserMenu user={user} signOut={signOut} />
              <LanguageSwitcher variant="desktop" />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-600 hover:text-primary transition-all duration-200 p-2 rounded-lg hover:bg-gray-50 active:scale-95 focus-ring"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t border-gray-100 animate-fadeInUp">
          <nav className="container-responsive py-3 space-y-1 max-h-[calc(100vh-60px)] overflow-y-auto">
            <Link
              href="/"
              onClick={closeMenu}
              className="block py-2.5 px-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-all duration-150 active:scale-98 font-medium"
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/places"
              onClick={closeMenu}
              className="block py-2.5 px-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-all duration-150 active:scale-98 font-medium"
            >
              {t('nav.explore')}
            </Link>
            <Link
              href="/resources"
              onClick={closeMenu}
              className="block py-2.5 px-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-all duration-150 active:scale-98 font-medium"
            >
              {t('nav.resources')}
            </Link>
            <Link
              href="/spouse-hub"
              onClick={closeMenu}
              className="block py-2.5 px-3 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-lg transition-all duration-150 active:scale-98 font-medium"
            >
              <span className="flex items-center gap-2">
                {t('nav.spouseHub')}
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-rose-500 to-purple-500 text-white rounded-full uppercase">
                  New
                </span>
              </span>
            </Link>
            <Link
              href="/community"
              onClick={closeMenu}
              className="block py-2.5 px-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-all duration-150 active:scale-98 font-medium"
            >
              <span className="flex items-center gap-2">
                {t('nav.community', 'Community')}
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full uppercase">
                  Soon
                </span>
              </span>
            </Link>
            <Link
              href="/blog"
              onClick={closeMenu}
              className="block py-2.5 px-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-all duration-150 active:scale-98 font-medium"
            >
              {t('nav.blog')}
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="block py-2.5 px-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-all duration-150 active:scale-98 font-medium"
            >
              {t('nav.about')}
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block py-2.5 px-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-all duration-150 active:scale-98 font-medium"
            >
              {t('nav.contact')}
            </Link>

            <div className="pt-3 border-t border-gray-100">
              <LanguageSwitcher variant="mobile" />
            </div>

            {user ? (
              <div className="pt-3 border-t border-gray-100 space-y-1">
                <Link
                  href="/account"
                  onClick={closeMenu}
                  className="block py-2.5 px-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-all duration-150 active:scale-98 font-medium"
                >
                  {t('nav.dashboard')}
                </Link>
                <button
                  onClick={async () => {
                    await signOut();
                    closeMenu();
                    router.push('/');
                  }}
                  className="w-full text-left py-2.5 px-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-150 active:scale-98 font-medium"
                >
                  {t('nav.signout')}
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <Link
                  href="/signin"
                  onClick={closeMenu}
                  className="block py-2.5 px-3 text-center text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-150 active:scale-98 font-medium"
                >
                  {t('nav.signin')}
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="block py-2.5 px-3 text-center bg-primary hover:bg-primary-dark text-white rounded-lg transition-all duration-150 active:scale-98 font-semibold shadow-sm"
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
