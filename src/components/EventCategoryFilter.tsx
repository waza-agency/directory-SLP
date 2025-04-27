import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export type EventCategory = 'sports' | 'cultural' | 'arts-culture' | 'music' | 'culinary' | 'other' | 'all';

interface EventCategoryFilterProps {
  selectedCategory: EventCategory;
  onChange?: (category: EventCategory) => void;
  className?: string;
  showCounts?: boolean;
  counts?: Record<string, number>;
}

export default function EventCategoryFilter({
  selectedCategory = 'all',
  onChange,
  className = '',
  showCounts = false,
  counts = {}
}: EventCategoryFilterProps) {
  const { t } = useTranslation('common');
  
  // Definición de categorías con iconos y textos
  const categories: { id: EventCategory; icon: string; label: string; href?: string }[] = [
    { id: 'all', icon: '🗓️', label: t('allEvents') },
    { id: 'sports', icon: '🏆', label: t('sportsEvents'), href: '/events/sports' },
    { id: 'cultural', icon: '🎭', label: t('culturalEvents'), href: '/events/cultural' },
    { id: 'music', icon: '🎵', label: t('musicEvents') || 'Music', href: '/events/music' },
    { id: 'culinary', icon: '🍽️', label: t('culinaryEvents') || 'Food & Drinks', href: '/events/culinary' },
    { id: 'other', icon: '✨', label: t('otherEvents'), href: '/events/other' },
  ];

  return (
    <div className={`overflow-x-auto pb-3 ${className}`}>
      <div className="flex space-x-2 min-w-max">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const count = showCounts && counts[category.id] ? counts[category.id] : null;
          
          // Si hay un onChange, usamos botones; si no, usamos enlaces
          if (onChange) {
            return (
              <button
                key={category.id}
                onClick={() => onChange(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors flex items-center ${
                  isSelected
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                <span>{category.label}</span>
                {count !== null && (
                  <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          } else if (category.href) {
            return (
              <Link
                key={category.id}
                href={category.href}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors flex items-center ${
                  isSelected
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                <span>{category.label}</span>
                {count !== null && (
                  <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {count}
                  </span>
                )}
              </Link>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
} 