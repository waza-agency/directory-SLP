import { useTranslation } from 'next-i18next';
import { Place } from '@/types';
import PlaceCard from './PlaceCard';

interface PlaceListProps {
  places: Place[];
  onPlaceSelect?: (place: Place) => void;
  selectedPlace?: Place | null;
}

export default function PlaceList({ places, onPlaceSelect, selectedPlace }: PlaceListProps) {
  const { t } = useTranslation('common');

  if (places.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <p className="text-lg text-gray-600">{t('no_places_found')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          place={place}
          isSelected={selectedPlace?.id === place.id}
          onClick={() => onPlaceSelect && onPlaceSelect(place)}
        />
      ))}
    </div>
  );
} 