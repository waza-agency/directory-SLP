-- Migration: Create tables for Practical Guides and Food Experiences
-- This migration creates the database structure to migrate static guide content to Supabase

-- =============================================
-- PRACTICAL GUIDES TABLES
-- =============================================

-- Main guides table (for living-guide, expat-guide, etc.)
CREATE TABLE IF NOT EXISTS practical_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT,
  description_en TEXT,
  guide_type TEXT NOT NULL CHECK (guide_type IN ('living', 'expat', 'relocation', 'newcomer', 'other')),
  hero_image_url TEXT,
  meta_title TEXT,
  meta_title_en TEXT,
  meta_description TEXT,
  meta_description_en TEXT,
  meta_keywords TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Guide sections (culture, food, shopping, emergency, healthcare, etc.)
CREATE TABLE IF NOT EXISTS guide_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id UUID NOT NULL REFERENCES practical_guides(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT,
  description_en TEXT,
  icon TEXT,
  section_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(guide_id, section_key)
);

-- Guide content items (flexible content within sections)
CREATE TABLE IF NOT EXISTS guide_content_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES guide_sections(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK (item_type IN (
    'text', 'list', 'card', 'contact', 'location',
    'festival', 'restaurant', 'tip', 'resource', 'hospital',
    'bank', 'utility', 'transport', 'phrase', 'area'
  )),
  title TEXT,
  title_en TEXT,
  description TEXT,
  description_en TEXT,
  -- Flexible JSON field for type-specific data
  metadata JSONB DEFAULT '{}',
  image_url TEXT,
  link_url TEXT,
  item_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- FOOD EXPERIENCES TABLES (Savor the Flavors)
-- =============================================

-- Main food experiences table
CREATE TABLE IF NOT EXISTS food_experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT,
  description_en TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'traditional', 'modern-fusion', 'street-food',
    'wine', 'craft-beer', 'fine-dining', 'casual', 'markets'
  )),
  hero_image_url TEXT,
  pairings TEXT,
  pairings_en TEXT,
  best_for TEXT,
  best_for_en TEXT,
  cultural_notes TEXT,
  cultural_notes_en TEXT,
  -- Sponsor/partner information
  sponsor_id UUID REFERENCES places(id) ON DELETE SET NULL,
  sponsor_name TEXT,
  sponsor_logo_url TEXT,
  sponsor_website TEXT,
  -- SEO and display
  meta_title TEXT,
  meta_description TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Food experience sections (for detailed content within each experience)
CREATE TABLE IF NOT EXISTS food_experience_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id UUID NOT NULL REFERENCES food_experiences(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL CHECK (section_type IN (
    'intro', 'what-to-expect', 'must-try', 'cultural-insight',
    'locations', 'tips', 'pairings', 'video'
  )),
  title TEXT,
  title_en TEXT,
  content TEXT,
  content_en TEXT,
  media_url TEXT,
  media_type TEXT CHECK (media_type IN ('image', 'video', 'youtube')),
  section_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Food locations (restaurants/vendors associated with experiences)
CREATE TABLE IF NOT EXISTS food_experience_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id UUID NOT NULL REFERENCES food_experiences(id) ON DELETE CASCADE,
  place_id UUID REFERENCES places(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  specialty_dish TEXT,
  specialty_dish_en TEXT,
  pairing_recommendation TEXT,
  pairing_recommendation_en TEXT,
  location_type TEXT CHECK (location_type IN ('restaurant', 'market', 'street-vendor', 'bar', 'cafe')),
  price_range TEXT CHECK (price_range IN ('$', '$$', '$$$', '$$$$')),
  item_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX IF NOT EXISTS idx_practical_guides_slug ON practical_guides(slug);
CREATE INDEX IF NOT EXISTS idx_practical_guides_type ON practical_guides(guide_type);
CREATE INDEX IF NOT EXISTS idx_practical_guides_status ON practical_guides(status);

CREATE INDEX IF NOT EXISTS idx_guide_sections_guide_id ON guide_sections(guide_id);
CREATE INDEX IF NOT EXISTS idx_guide_sections_key ON guide_sections(section_key);

CREATE INDEX IF NOT EXISTS idx_guide_content_items_section_id ON guide_content_items(section_id);
CREATE INDEX IF NOT EXISTS idx_guide_content_items_type ON guide_content_items(item_type);

CREATE INDEX IF NOT EXISTS idx_food_experiences_slug ON food_experiences(slug);
CREATE INDEX IF NOT EXISTS idx_food_experiences_category ON food_experiences(category);
CREATE INDEX IF NOT EXISTS idx_food_experiences_status ON food_experiences(status);

CREATE INDEX IF NOT EXISTS idx_food_experience_sections_experience ON food_experience_sections(experience_id);
CREATE INDEX IF NOT EXISTS idx_food_experience_locations_experience ON food_experience_locations(experience_id);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS
ALTER TABLE practical_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE guide_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE guide_content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_experience_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_experience_locations ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can read published guides" ON practical_guides
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read guide sections" ON guide_sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM practical_guides
      WHERE practical_guides.id = guide_sections.guide_id
      AND practical_guides.status = 'published'
    )
  );

CREATE POLICY "Public can read guide content items" ON guide_content_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM guide_sections
      JOIN practical_guides ON practical_guides.id = guide_sections.guide_id
      WHERE guide_sections.id = guide_content_items.section_id
      AND practical_guides.status = 'published'
    )
  );

CREATE POLICY "Public can read published food experiences" ON food_experiences
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read food experience sections" ON food_experience_sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM food_experiences
      WHERE food_experiences.id = food_experience_sections.experience_id
      AND food_experiences.status = 'published'
    )
  );

CREATE POLICY "Public can read food experience locations" ON food_experience_locations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM food_experiences
      WHERE food_experiences.id = food_experience_locations.experience_id
      AND food_experiences.status = 'published'
    )
  );

-- Admin write access (authenticated users can manage content)
CREATE POLICY "Authenticated users can manage guides" ON practical_guides
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage guide sections" ON guide_sections
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage guide content" ON guide_content_items
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage food experiences" ON food_experiences
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage food experience sections" ON food_experience_sections
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage food experience locations" ON food_experience_locations
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- UPDATED_AT TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic updated_at
CREATE TRIGGER update_practical_guides_updated_at
  BEFORE UPDATE ON practical_guides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guide_sections_updated_at
  BEFORE UPDATE ON guide_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guide_content_items_updated_at
  BEFORE UPDATE ON guide_content_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_food_experiences_updated_at
  BEFORE UPDATE ON food_experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
