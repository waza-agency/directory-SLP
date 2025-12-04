import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { searchPlaces } from '@/lib/supabase';
// import Cart from './common/Cart'; // MARKETPLACE DISABLED
import { useAuth } from '@/lib/supabase-auth';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { t } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        setLoading(true);
        const results = await searchPlaces(searchQuery);
        setSearchResults(results.slice(0, 5)); // Show only first 5 results
        setShowResults(true);
      } catch (error) {
        console.error('Error searching places:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/places?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleResultClick = (placeId: string) => {
    router.push(`/places/${placeId}`);
    setShowResults(false);
    setSearchQuery('');
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    setIsUserMenuOpen(false);
  };

  // Don't render anything until component is mounted
  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm">
      {/* San Luis color accent line with subtle animation */}
      <div className="bg-gradient-to-r from-primary to-secondary h-1 animate-pulse-slow"></div>

      {/* Main Navigation Bar */}
      <div className="bg-background/95 backdrop-blur-md shadow-elegant border-b border-gray-100/50">
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
          <nav className="hidden lg:flex items-center space-x-10">
            <Link
              href="/"
              className="nav-link text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium relative py-2 hover:scale-105"
            >
              {t('nav.home')}
            </Link>

            <Link
              href="/places"
              className="nav-link text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium relative py-2 hover:scale-105"
            >
              {t('nav.explore')}
            </Link>

            <Link
              href="/blog"
              className="nav-link text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium relative py-2 hover:scale-105"
            >
              {t('nav.blog')}
            </Link>

            <Link
              href="/about"
              className="nav-link text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium relative py-2 hover:scale-105"
            >
              {t('nav.about')}
            </Link>

            <Link
              href="/faq"
              className="nav-link text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium relative py-2 hover:scale-105"
            >
              {t('nav.faq')}
            </Link>

            <Link
              href="/contact"
              className="nav-link text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium relative py-2 hover:scale-105"
            >
              {t('nav.contact')}
            </Link>

            {/* MARKETPLACE DISABLED - Shopping Cart removed */}

            {/* Authentication Buttons or User Menu */}
            {user ? (
              <div className="relative z-[60]">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="text-gray-700 hover:text-primary transition-all duration-200 flex items-center hover:scale-105 focus-ring"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark text-white rounded-full flex items-center justify-center text-base font-semibold mr-3 shadow-md hover:shadow-lg transition-all duration-200">
                    {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm hidden lg:inline">
                    {user.email?.split[0]}
                  </span>
                  <svg
                    className={`ml-1 w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-xl shadow-strong py-2 z-[100] animate-scaleIn">
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                    >
                      {t('nav.myAccount')}
                    </Link>
                    <Link
                      href="/account/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                    >
                      {t('nav.myOrders')}
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                    >
                      {t('nav.signOut')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/signin"
                  className="text-gray-700 hover:text-primary text-base font-medium transition-all duration-200 hover:scale-105 focus-ring py-2 px-3 rounded-lg"
                >
                  {t('nav.signIn')}
                </Link>
                <Link
                  href="/signup"
                  className="btn-primary btn-sm"
                >
                  {t('nav.signUp')}
                </Link>
              </div>
            )}

            {/* Language Selector */}
            <LanguageSwitcher variant="desktop" />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-500 hover:text-primary transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 focus-ring"
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
      </div>

      {/* Categories Navigation Bar */}
      <div className="bg-background-alt/90 backdrop-blur-sm border-b border-gray-100 hidden lg:block">
        <div className="container-responsive">
          <div className="flex items-center justify-between h-14">
            {/* Categories */}
            <div className="flex space-x-10">
              <Link href="/cultural" className="inline-flex items-center px-2 pt-1 text-base font-semibold text-gray-700 hover:text-primary border-b-3 border-transparent hover:border-primary transition-all duration-200 hover:scale-105">
                {t('categories.cultural')}
                <span className="ml-2 px-2.5 py-0.5 text-xs font-bold bg-primary/15 text-primary rounded-full animate-pulse-slow">{t('categories.new')}</span>
              </Link>
              <Link href="/places" className="inline-flex items-center px-2 pt-1 text-base font-semibold text-gray-700 hover:text-primary border-b-3 border-transparent hover:border-primary transition-all duration-200 hover:scale-105">
                {t('categories.places')}
              </Link>
              {/* TEMPORARILY HIDDEN - LISTINGS */}
              {/* MARKETPLACE DISABLED - Shop link removed */}
              <Link href="/events" className="inline-flex items-center px-2 pt-1 text-base font-semibold text-gray-700 hover:text-primary border-b-3 border-transparent hover:border-primary transition-all duration-200 hover:scale-105">
                {t('categories.events')}
              </Link>
              <Link href="/services" className="inline-flex items-center px-2 pt-1 text-base font-semibold text-gray-700 hover:text-primary border-b-3 border-transparent hover:border-primary transition-all duration-200 hover:scale-105">
                {t('categories.services')}
              </Link>
            </div>

            {/* Search Bar */}
            <div className="relative w-72">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  className="w-full pl-10 pr-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowResults(true)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </form>

              {/* Search Results Dropdown */}
              {showResults && (searchQuery.length >= 2) && (
                <div className="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-strong z-50 animate-scaleIn backdrop-blur-sm">
                  {loading ? (
                    <div className="p-4 text-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mx-auto"></div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-1">
                      {searchResults.map((place) => (
                        <button
                          key={place.id}
                          onClick={() => handleResultClick(place.id)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                        >
                          {place.name}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-sm text-gray-500 text-center">
                      {t('search.noResults')}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md py-6 px-6 mx-4 mt-2 rounded-xl shadow-strong border border-gray-100 animate-fadeInUp">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium py-2 px-3 rounded-lg hover:bg-primary/10"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>

            <Link
              href="/places"
              className="text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium py-2 px-3 rounded-lg hover:bg-primary/10"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.explore')}
            </Link>

            <Link
              href="/blog"
              className="text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium py-2 px-3 rounded-lg hover:bg-primary/10"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.blog')}
            </Link>

            <Link
              href="/about"
              className="text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium py-2 px-3 rounded-lg hover:bg-primary/10"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>

            <Link
              href="/faq"
              className="text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium py-2 px-3 rounded-lg hover:bg-primary/10"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.faq')}
            </Link>

            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium py-2 px-3 rounded-lg hover:bg-primary/10"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>

            {/* Authentication Links for Mobile */}
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">{t('account.title')}</p>
              {user ? (
                <div className="space-y-2">
                  <Link
                    href="/account"
                    className="block text-sm text-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.myAccount')}
                  </Link>
                  <Link
                    href="/account/orders"
                    className="block text-sm text-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.myOrders')}
                  </Link>
                  <button
                    onClick={async () => {
                      await handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="block text-sm text-gray-700 hover:text-primary"
                  >
                    {t('nav.signOut')}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/signin"
                    className="block text-sm text-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.signIn')}
                  </Link>
                  <Link
                    href="/signup"
                    className="block bg-primary hover:bg-primary-dark text-white text-sm px-3 py-1.5 rounded-md transition-colors inline-block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.signUp')}
                  </Link>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">{t('categories.cultural')}</p>
              <div className="space-y-2">
                <Link href="/cultural" className="block text-sm text-gray-700 hover:text-primary">
                  {t('categories.cultural')} <span className="ml-1 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">{t('categories.new')}</span>
                </Link>
                <Link href="/places" className="block text-sm text-gray-700 hover:text-primary">
                  {t('categories.places')}
                </Link>
                <Link href="/events" className="block text-sm text-gray-700 hover:text-primary">
                  {t('categories.events')}
                </Link>
                <Link href="/services" className="block text-sm text-gray-700 hover:text-primary">
                  {t('categories.services')}
                </Link>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">{t('languages.select')}</p>
              <LanguageSwitcher variant="mobile" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}