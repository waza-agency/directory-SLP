import { memo, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { searchPlaces } from '@/lib/supabase';
import { logger } from '@/lib/logger';
import { useTranslation } from 'next-i18next';

const HeaderSearch = memo(function HeaderSearch() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  // Memoized search function
  const performSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const results = await searchPlaces(query);
      setSearchResults(results.slice(0, 5));
      setShowResults(true);
    } catch (error) {
      logger.error('Error searching places:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => performSearch(searchQuery), 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/places?search=${encodeURIComponent(searchQuery)}`);
    }
  }, [searchQuery, router]);

  const handleResultClick = useCallback((placeId: string) => {
    router.push(`/places/${placeId}`);
    setShowResults(false);
    setSearchQuery('');
  }, [router]);

  return (
    <div className="relative flex-1 max-w-md mx-4 hidden lg:block">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchResults.length > 0 && setShowResults(true)}
          placeholder={t('nav.searchPlaceholder')}
          className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 text-sm placeholder:text-gray-400 bg-gray-50/50 hover:bg-white"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="animate-spin h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </form>

      {showResults && searchResults.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowResults(false)}
            aria-hidden="true"
          />
          <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20 max-h-80 overflow-y-auto animate-fadeIn">
            {searchResults.map((place) => (
              <button
                key={place.id}
                onClick={() => handleResultClick(place.id)}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150 border-b border-gray-50 last:border-0 focus-ring"
              >
                <div className="font-medium text-sm text-gray-900">{place.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{place.category}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
});

export default HeaderSearch;
