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
  | 'live-music'
  | 'other';

export interface FilterOptions {
  category?: PlaceCategory | 'all';
  searchTerm?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  location: string;
  category: 'sports' | 'cultural' | 'arts-culture' | 'music' | 'culinary' | 'other';
  image_url: string | null;
  featured: boolean;
  place_id?: string | null;
  created_at?: string;
  updated_at?: string;
  show_in_cultural_calendar?: boolean;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  contact_name?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  address?: string | null;
  service_area?: string | null;
  hours?: string | null;
  image_url?: string | null;
  featured: string | boolean; // Can be string "true"/"false" or boolean
  created_at: string;
  updated_at: string;
  duration?: string;
  facebook?: string | null;
  instagram?: string | null;
  provider?: string | null;
  price?: string | null;
  location?: string | null;
}