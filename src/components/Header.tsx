import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { searchPlaces } from '@/lib/supabase';
// import Cart from './common/Cart'; // MARKETPLACE DISABLED
import { useAuth } from '@/lib/supabase-auth';

export default function Header() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { });
  };

  // Map of language codes to display names
  const languages = {
    en: 'English',
    es: 'Español',
    de: 'Deutsch',
    ja: '日本語'
  };

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
    <header className="sticky top-0 z-50">
      {/* San Luis color accent line */}
      <div className="bg-gradient-to-r from-primary to-secondary h-1"></div>

      {/* Main Navigation Bar */}
      <div className="bg-background shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.jpeg"
              alt="SLP Descubre Logo"
              width={600}
              height={60}
              className="h-20 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
            >
              Home
            </Link>

            <Link
              href="/places"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
            >
              Explore
            </Link>

            <Link
              href="/blog"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
            >
              Blog
            </Link>

            <Link
              href="/about"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
            >
              About
            </Link>

            <Link
              href="/faq"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
            >
              FAQ
            </Link>

            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
            >
              Contact
            </Link>

            {/* MARKETPLACE DISABLED - Shopping Cart removed */}

            {/* Authentication Buttons or User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="text-gray-700 hover:text-primary transition-colors flex items-center"
                >
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium mr-2">
                    {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm hidden lg:inline">
                    {user.email?.split('@')[0]}
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
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/signin"
                  className="text-gray-700 hover:text-primary text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Language Selector */}
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
          </nav>

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
      </div>

      {/* Categories Navigation Bar */}
      <div className="bg-background-alt border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-12">
            {/* Categories */}
            <div className="flex space-x-8">
              <Link href="/cultural" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
                CULTURAL
                <span className="ml-1 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">NEW</span>
              </Link>
              <Link href="/places" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
                PLACES
              </Link>
              <Link href="/listings" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
                LISTINGS
              </Link>
              {/* MARKETPLACE DISABLED - Shop link removed */}
              <Link href="/events" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
                EVENTS
              </Link>
              <Link href="/services" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
                SERVICES
              </Link>
              {/* <Link href="/community" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
                COMMUNITY
              </Link> */}
            </div>

            {/* Search Bar */}
            <div className="relative w-64">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder={t('search_placeholder')}
                  className="w-full pl-8 pr-4 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowResults(true)}
                />
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </form>

              {/* Search Results Dropdown */}
              {showResults && (searchQuery.length >= 2) && (
                <div className="absolute right-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
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
                      No places found
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
        <div className="md:hidden bg-white py-4 px-6 mt-2 rounded-md shadow-md animate-fadeIn">
          <div className="flex flex-col space-y-3">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/places"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>

            <Link
              href="/blog"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>

            <Link
              href="/about"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            <Link
              href="/faq"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>

            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Authentication Links for Mobile */}
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Account</p>
              {user ? (
                <div className="space-y-2">
                  <Link
                    href="/account"
                    className="block text-sm text-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    href="/account/orders"
                    className="block text-sm text-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={async () => {
                      await handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="block text-sm text-gray-700 hover:text-primary"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/signin"
                    className="block text-sm text-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="block bg-primary hover:bg-primary-dark text-white text-sm px-3 py-1.5 rounded-md transition-colors inline-block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-200">
              {/* MARKETPLACE DISABLED - Shopping Cart removed */}

              <p className="text-xs text-gray-500 mb-2">Categories</p>
              <div className="space-y-2">
                <Link href="/cultural" className="block text-sm text-gray-700 hover:text-primary">
                  Cultural <span className="ml-1 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">NEW</span>
                </Link>
                <Link href="/places" className="block text-sm text-gray-700 hover:text-primary">
                  Places
                </Link>
                <Link href="/listings" className="block text-sm text-gray-700 hover:text-primary">
                  Listings
                </Link>
                {/* MARKETPLACE DISABLED - Shop link removed */}
                <Link href="/events" className="block text-sm text-gray-700 hover:text-primary">
                  Events
                </Link>
                <Link href="/services" className="block text-sm text-gray-700 hover:text-primary">
                  Services
                </Link>
                {/* <Link href="/community" className="block text-sm text-gray-700 hover:text-primary">
                  Community
                </Link> */}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Language</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(languages).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => {
                      changeLanguage(code);
                      setIsMenuOpen(false);
                    }}
                    className={`text-sm px-3 py-1 rounded-md ${
                      router.locale === code
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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