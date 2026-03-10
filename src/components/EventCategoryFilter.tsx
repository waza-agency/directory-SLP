import {
  CalendarDaysIcon,
  TrophyIcon,
  SparklesIcon,
  MusicalNoteIcon,
  FireIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

export type EventCategory =
  | 'sports'
  | 'cultural'
  | 'arts-culture'
  | 'music'
  | 'culinary'
  | 'community-social'
  | 'all';

interface EventCategoryFilterProps {
  selectedCategory: EventCategory;
  onChange?: (category: EventCategory) => void;
  className?: string;
  showCounts?: boolean;
  counts?: Record<string, number>;
}

const categories: { id: EventCategory; icon: typeof CalendarDaysIcon; label: string }[] = [
  { id: 'all', icon: CalendarDaysIcon, label: 'Todos' },
  { id: 'sports', icon: TrophyIcon, label: 'Deportes' },
  { id: 'cultural', icon: SparklesIcon, label: 'Cultural' },
  { id: 'music', icon: MusicalNoteIcon, label: 'Música' },
  { id: 'culinary', icon: FireIcon, label: 'Gastronomía' },
  { id: 'community-social', icon: UserGroupIcon, label: 'Comunidad' },
];

export default function EventCategoryFilter({
  selectedCategory = 'all',
  onChange,
  className = '',
  showCounts = false,
  counts = {},
}: EventCategoryFilterProps) {
  return (
    <div className={`sticky top-0 z-20 bg-white/80 backdrop-blur-md py-3 -mx-4 px-4 border-b border-gray-100 ${className}`}>
      <nav
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
        role="tablist"
        aria-label="Filtrar eventos por categoría"
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = showCounts ? counts[cat.id] ?? 0 : null;
          const Icon = cat.icon;

          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => onChange?.(cat.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap
                transition-all duration-200 border
                ${isSelected
                  ? 'bg-secondary text-white border-secondary shadow-md shadow-secondary/20'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-secondary/30 hover:text-secondary hover:bg-secondary-50'
                }
              `}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{cat.label}</span>
              {count !== null && (
                <span
                  className={`ml-1 px-1.5 py-0.5 text-xs font-semibold rounded-full leading-none ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
