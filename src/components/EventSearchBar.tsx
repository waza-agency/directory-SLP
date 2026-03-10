import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface EventSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * Polished search bar for the events page.
 * Includes a clear button and focus ring using the secondary color.
 */
export default function EventSearchBar({ value, onChange, className = '' }: EventSearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Buscar eventos por nombre, ubicación..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm
                   placeholder-gray-400 shadow-card
                   focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50
                   transition-all duration-200"
        id="event-search-input-001"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Limpiar búsqueda"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
