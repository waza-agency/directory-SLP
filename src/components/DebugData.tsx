import { Place } from '@/types';

interface DebugDataProps {
  places: Place[];
}

export default function DebugData({ places }: DebugDataProps) {
  // Count featured places
  const featuredPlaces = places.filter(p => p.featured);
  
  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6 border border-gray-300">
      <h3 className="text-lg font-bold mb-2">Debug Data</h3>
      <p>Total places: {places.length}</p>
      <p>Featured places: {featuredPlaces.length}</p>
      
      {featuredPlaces.length > 0 ? (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Featured Places:</h4>
          <ul className="list-disc pl-5">
            {featuredPlaces.map(place => (
              <li key={place.id}>{place.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-red-500 mt-2">No featured places found</p>
      )}
      
      <details className="mt-4">
        <summary className="cursor-pointer font-medium">Raw data for first 2 places</summary>
        <pre className="bg-gray-800 text-white p-2 mt-2 rounded text-xs overflow-auto max-h-60">
          {JSON.stringify(places.slice(0, 2), null, 2)}
        </pre>
      </details>
    </div>
  );
} 