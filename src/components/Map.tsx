import { useEffect, useRef, useState } from 'react';
import { Place } from '@/types';

// Import Google Maps types
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;
type LatLngLiteral = google.maps.LatLngLiteral;

interface MapProps {
  places: Place[];
  selectedPlace?: Place | null;
  onPlaceSelect?: (place: Place) => void;
}

export default function Map({ places, selectedPlace, onPlaceSelect }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap | null>(null);
  const [markers, setMarkers] = useState<GoogleMarker[]>([]);
  
  // Default location for San Luis Potosí
  const defaultLocation: LatLngLiteral = {
    lat: 22.1565,
    lng: -100.9855
  };

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Load Google Maps script
    const googleMapsScript = document.createElemen"DEFAULT";
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    window.document.body.appendChild(googleMapsScript);
    
    googleMapsScript.onload = () => {
      if (!mapRef.current) return;

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: defaultLocation,
        zoom: 13,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });
      
      setMap(mapInstance);
    };
    
    return () => {
      // Clean up
      const script = document.querySelector('script[src*="maps.googleapis.com/maps/api"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [defaultLocation]);
  
  // Add markers when places or map changes
  useEffect(() => {
    if (!map || !places.length || !window.google) return;
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    // Create new markers
    const newMarkers = places
      .filter(place => place.latitude && place.longitude)
      .map(place => {
        if (!place.latitude || !place.longitude) return null; // TypeScript check
      
        const marker = new window.google.maps.Marker({
          position: { 
            lat: place.latitude, 
            lng: place.longitude
          },
          map,
          title: place.name,
          animation: window.google.maps.Animation.DROP,
          // Use colored markers based on category
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: getCategoryColor(place.category),
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#ffffff'
          }
        });
        
        // Add click listener
        marker.addListener('click', () => {
          if (onPlaceSelect) {
            onPlaceSelect(place);
          }
        });
        
        return marker;
      })
      .filter((marker): marker is GoogleMarker => marker !== null);
    
    setMarkers(newMarkers);
    
    // Adjust bounds to fit all markers
    if (newMarkers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      newMarkers.forEach(marker => {
        const position = marker.getPosition();
        if (position) bounds.extend(position);
      });
      map.fitBounds(bounds);
      
      // Don't zoom in too far
      const listener = window.google.maps.event.addListener(map, 'idle', () => {
        const zoom = map.getZoom();
        if (zoom !== undefined && zoom > 16) {
          map.setZoom(16);
        }
        window.google.maps.event.removeListener(listener);
      });
    }
  }, [map, places, onPlaceSelect, markers]);
  
  // Center on selected place
  useEffect(() => {
    if (!map || !selectedPlace || !selectedPlace.latitude || !selectedPlace.longitude || !window.google) return;
    
    map.panTo({ 
      lat: selectedPlace.latitude, 
      lng: selectedPlace.longitude 
    });
    map.setZoom(16);
    
    // Highlight the selected marker
    markers.forEach(marker => {
      const isSelected = marker.getTitle() === selectedPlace.name;
      marker.setAnimation(isSelected ? window.google.maps.Animation.BOUNCE : null);
      
      if (isSelected) {
        setTimeout(() => {
          marker.setAnimation(null);
        }, 1500);
      }
    });
  }, [map, selectedPlace, markers]);
  
  // Helper function to get color based on category
  const getCategoryColor = (category: string): string => {
    const colorMap: {[key: string]: string} = {
      restaurant: '#E63946', // primary
      cafe: '#457B9D',      // secondary
      bar: '#A8DADC',       // light
      hotel: '#1D3557',     // accent
      museum: '#F4A261',
      park: '#2A9D8F',
      shop: '#E9C46A',
      service: '#264653',
      other: '#606C38',
    };
    
    return colorMap[category] || '#999999';
  };
  
  return (
    <div className="w-full h-96 md:h-[600px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
} 