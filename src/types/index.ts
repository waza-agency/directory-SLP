export interface Place {
  id: string;
  name: string;
  category: string;
  address: string;
  city?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  imageUrl?: string;
  hours?: string;
  featured: boolean;
  tags?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  rating?: number;
  priceLevel?: number;
  reviews?: {
    author: string;
    rating: number;
    text: string;
  }[];
}

export type PlaceCategory = 
  | 'restaurant' 
  | 'cafe' 
  | 'bar' 
  | 'hotel' 
  | 'museum' 
  | 'park' 
  | 'shop' 
  | 'service' 
  | 'other';

export interface FilterOptions {
  category?: PlaceCategory | 'all';
  searchTerm?: string;
} 