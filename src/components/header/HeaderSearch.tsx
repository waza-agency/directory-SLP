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
    <div className="relative flex-1 max-w-xl mx-6">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchResults.length > 0 && setShowResults(true)}
          placeholder={t('nav.searchPlaceholder')}
          className="w-full px-5 py-3 pl-12 rounded-full border-2 border-gray-200 focus:border-primary focus:outline-none transition-all duration-200 text-base shadow-sm hover:shadow-md"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </form>

      {showResults && searchResults.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowResults(false)}
          />
          <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-elegant border border-gray-100 py-2 z-20 max-h-96 overflow-y-auto animate-scale-in">
            {loading && (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                {t('nav.searching')}...
              </div>
            )}
            {!loading && searchResults.map((place) => (
              <button
                key={place.id}
                onClick={() => handleResultClick(place.id)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-b border-gray-50 last:border-0"
              >
                <div className="font-medium text-gray-900">{place.name}</div>
                <div className="text-sm text-gray-500">{place.category}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
});

export default HeaderSearch;
