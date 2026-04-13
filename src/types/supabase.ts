export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type SponsorAdType = 'html' | 'image';
export type AdPlacement = 'top' | 'middle' | 'bottom';
export type LinkTarget = '_blank' | '_self';

export interface SponsorAd {
  id: string;
  name: string;
  description: string | null;
  ad_type: SponsorAdType;
  html_content: string | null;
  image_url: string | null;
  image_alt: string | null;
  link_url: string | null;
  link_target: LinkTarget;
  width: string;
  height: string | null;
  placement: AdPlacement;
  section_anchor: string | null;
  priority: number;
  active: boolean;
  start_date: string | null;
  end_date: string | null;
  impressions_limit: number | null;
  impressions_count: number;
  clicks_count: number;
  rotation_group: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewsletterAdPlacement {
  id: string;
  newsletter_id: string;
  sponsor_ad_id: string;
  placement: AdPlacement;
  impressions_count: number;
  clicks_count: number;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      places: {
        Row: {
          id: string
          name: string
          category: string
          address: string
          city: string | null
          phone: string | null
          website: string | null
          instagram: string | null
          latitude: number | null
          longitude: number | null
          description: string | null
          image_url: string | null
          hours: string | null
          featured: boolean
          rating: number | null
          price_level: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          address: string
          city?: string | null
          phone?: string | null
          website?: string | null
          instagram?: string | null
          latitude?: number | null
          longitude?: number | null
          description?: string | null
          image_url?: string | null
          hours?: string | null
          featured?: boolean
          rating?: number | null
          price_level?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          address?: string
          city?: string | null
          phone?: string | null
          website?: string | null
          instagram?: string | null
          latitude?: number | null
          longitude?: number | null
          description?: string | null
          image_url?: string | null
          hours?: string | null
          featured?: boolean
          rating?: number | null
          price_level?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      photos: {
        Row: {
          id: string
          url: string
          alt: string | null
          place_id: string | null
          event_id: string | null
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          url: string
          alt?: string | null
          place_id?: string | null
          event_id?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          url?: string
          alt?: string | null
          place_id?: string | null
          event_id?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          author: string
          rating: number
          text: string
          place_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author: string
          rating: number
          text: string
          place_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author?: string
          rating?: number
          text?: string
          place_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          start_date: string
          end_date: string
          location: string
          category: string
          image_url: string | null
          featured: boolean
          place_id: string | null
          created_at: string
          updated_at: string
          show_in_cultural_calendar: boolean | null
          family_friendly: boolean
          cost: string | null
          organizer: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          start_date: string
          end_date: string
          location: string
          category: string
          image_url?: string | null
          featured?: boolean
          place_id?: string | null
          created_at?: string
          updated_at?: string
          show_in_cultural_calendar?: boolean | null
          family_friendly?: boolean
          cost?: string | null
          organizer?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          start_date?: string
          end_date?: string
          location?: string
          category?: string
          image_url?: string | null
          featured?: boolean
          place_id?: string | null
          created_at?: string
          updated_at?: string
          show_in_cultural_calendar?: boolean | null
          family_friendly?: boolean
          cost?: string | null
          organizer?: string | null
        }
      }
      featured_photos: {
        Row: {
          id: string
          title: string
          subtitle: string | null
          image_url: string
          link: string | null
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle?: string | null
          image_url: string
          link?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string | null
          image_url?: string
          link?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      news_headlines: {
        Row: {
          id: string
          text_es: string
          text_en: string
          source: string | null
          source_url: string | null
          active: boolean
          priority: number
          created_at: string
          updated_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          text_es: string
          text_en: string
          source?: string | null
          source_url?: string | null
          active?: boolean
          priority?: number
          created_at?: string
          updated_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          text_es?: string
          text_en?: string
          source?: string | null
          source_url?: string | null
          active?: boolean
          priority?: number
          created_at?: string
          updated_at?: string
          expires_at?: string | null
        }
      }
      community_news: {
        Row: {
          id: string
          title_es: string
          title_en: string
          summary_es: string
          summary_en: string
          category: 'social' | 'community' | 'culture' | 'local'
          image_url: string | null
          source: string | null
          priority: number
          active: boolean
          published_at: string
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title_es: string
          title_en: string
          summary_es: string
          summary_en: string
          category?: 'social' | 'community' | 'culture' | 'local'
          image_url?: string | null
          source?: string | null
          priority?: number
          active?: boolean
          published_at?: string
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title_es?: string
          title_en?: string
          summary_es?: string
          summary_en?: string
          category?: 'social' | 'community' | 'culture' | 'local'
          image_url?: string | null
          source?: string | null
          priority?: number
          active?: boolean
          published_at?: string
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      sponsor_ads: {
        Row: SponsorAd
        Insert: Omit<SponsorAd, 'created_at' | 'updated_at' | 'impressions_count' | 'clicks_count'> & {
          created_at?: string
          updated_at?: string
          impressions_count?: number
          clicks_count?: number
        }
        Update: Partial<Omit<SponsorAd, 'id' | 'created_at'>>
      }
      newsletter_ad_placements: {
        Row: NewsletterAdPlacement
        Insert: Omit<NewsletterAdPlacement, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Omit<NewsletterAdPlacement, 'id' | 'created_at'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 