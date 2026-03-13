import { useTranslation } from 'next-i18next';

export type SortOption = 'newest' | 'rating' | 'name';

export interface FilterState {
  search: string;
  category: string;
  minRating: number;
  priceLevel: number;
  sort: SortOption;
}

interface PlaceFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  categories: string[];
  activeTab: 'places' | 'services';
  resultCount: number;
  totalCount: number;
}

export default function PlaceFilters({
  filters, onChange, categories, activeTab, resultCount, totalCount,
}: PlaceFiltersProps) {
  const { t } = useTranslation('common');

  const update = (partial: Partial<FilterState>) => onChange({ ...filters, ...partial });

  return (
    <div className="space-y-4 mb-6">
      {/* Search + Category row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder={t('filters.searchPlaceholder', `Search ${activeTab}...`)}
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={filters.category}
          onChange={(e) => update({ category: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all'
                ? t('filters.allCategories', 'All Categories')
                : cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </option>
          ))}
        </select>
      </div>

      {/* Advanced filters row */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* Min rating */}
        {activeTab === 'places' && (
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
            <span className="text-sm text-gray-600">{t('filters.minRating', 'Min Rating')}</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => update({ minRating: filters.minRating === star ? 0 : star })}
                  className="focus:outline-none"
                >
                  <svg
                    className={`w-5 h-5 transition-colors ${star <= filters.minRating ? 'text-amber-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price level */}
        {activeTab === 'places' && (
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
            <span className="text-sm text-gray-600">{t('filters.priceLevel', 'Price')}</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => update({ priceLevel: filters.priceLevel === level ? 0 : level })}
                  className={`px-2 py-0.5 text-sm rounded font-medium transition-colors ${
                    level <= filters.priceLevel
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {'$'.repeat(level)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sort */}
        <select
          value={filters.sort}
          onChange={(e) => update({ sort: e.target.value as SortOption })}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="newest">{t('filters.sortNewest', 'Newest First')}</option>
          <option value="rating">{t('filters.sortRating', 'Highest Rated')}</option>
          <option value="name">{t('filters.sortName', 'A-Z')}</option>
        </select>

        {/* Clear filters */}
        {(filters.minRating > 0 || filters.priceLevel > 0 || filters.search || filters.category !== 'all') && (
          <button
            onClick={() => onChange({ search: '', category: 'all', minRating: 0, priceLevel: 0, sort: filters.sort })}
            className="text-sm text-red-500 hover:text-red-700 underline"
          >
            {t('filters.clearAll', 'Clear filters')}
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-gray-600 text-center text-sm">
        {t('filters.showing', 'Showing')} {resultCount} {t('filters.of', 'of')} {totalCount} {activeTab}
      </p>
    </div>
  );
}
