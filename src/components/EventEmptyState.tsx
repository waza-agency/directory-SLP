import { CalendarIcon } from '@heroicons/react/24/outline';

interface EventEmptyStateProps {
  onClear: () => void;
}

/**
 * Friendly empty state shown when no events match the current filters.
 */
export default function EventEmptyState({ onClear }: EventEmptyStateProps) {
  return (
    <div className="text-center py-20 bg-white rounded-2xl shadow-card">
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-5 rounded-2xl bg-secondary/5">
          <CalendarIcon className="w-8 h-8 text-secondary/40" />
        </div>
        <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
          No se encontraron eventos
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          No hay eventos que coincidan con tus criterios de búsqueda. Prueba con otros filtros.
        </p>
        <button
          onClick={onClear}
          className="inline-flex items-center px-6 py-3 bg-secondary text-white text-sm font-semibold rounded-lg hover:bg-secondary-light transition-colors"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}
