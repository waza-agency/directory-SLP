import { useTranslation } from 'next-i18next';
import { PlaceCategory } from '@/types';
import Link from 'next/link';

interface SidebarProps {
  selectedCategory?: PlaceCategory;
  onCategorySelect: (category: PlaceCategory | undefined) => void;
}

export default function Sidebar({ selectedCategory, onCategorySelect }: SidebarProps) {
  const { t } = useTranslation('common');

  const categories: { id: PlaceCategory; icon: string; label: string }[] = [
    { id: 'restaurant', icon: '🍽️', label: 'Restaurantes' },
    { id: 'bar', icon: '🍸', label: 'Bares' },
    { id: 'cafe', icon: '☕', label: 'Cafeterías' },
    { id: 'hotel', icon: '🏨', label: 'Hoteles' },
    { id: 'museum', icon: '🏛️', label: 'Museos' },
    { id: 'park', icon: '🌳', label: 'Parques' },
    { id: 'shop', icon: '🛍️', label: 'Tiendas' },
    { id: 'service', icon: '🔧', label: 'Servicios' },
    { id: 'other', icon: '📍', label: 'Otros' },
  ];

  return (
    <div className="bg-white border-r border-gray-200 w-64 min-h-screen px-4 py-6">
      <div className="mb-8">
        <div className="text-center mb-6">
          <h2 className="font-serif text-2xl text-secondary font-bold">Explora por Categoría</h2>
          <p className="text-sm text-gray-600 mt-2">
            Encuentra los mejores lugares de San Luis Potosí
          </p>
        </div>
        <div className="space-y-1">
          <button
            onClick={() => onCategorySelect(undefined)}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
              !selectedCategory
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Todas las categorías
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors flex items-center space-x-3 ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-secondary mb-2">
          ¿Necesitas ayuda?
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Contáctanos para cualquier duda o sugerencia
        </p>
        <Link
          href="/contact"
          className="inline-block w-full text-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark transition-colors"
        >
          Contáctanos
        </Link>
      </div>
    </div>
  );
} 