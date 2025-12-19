export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

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