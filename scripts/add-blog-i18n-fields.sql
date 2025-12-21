-- Script para agregar campos de idioma español y alemán a blog_posts
-- Ejecutar en Supabase SQL Editor
-- Estructura: campos base (title, content, excerpt) = INGLÉS
--             _es = español, _de = alemán

-- Agregar columnas para contenido en español
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS title_es TEXT,
ADD COLUMN IF NOT EXISTS content_es TEXT,
ADD COLUMN IF NOT EXISTS excerpt_es TEXT,
ADD COLUMN IF NOT EXISTS meta_title_es TEXT,
ADD COLUMN IF NOT EXISTS meta_description_es TEXT;

-- Agregar columnas para contenido en alemán
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS title_de TEXT,
ADD COLUMN IF NOT EXISTS content_de TEXT,
ADD COLUMN IF NOT EXISTS excerpt_de TEXT,
ADD COLUMN IF NOT EXISTS meta_title_de TEXT,
ADD COLUMN IF NOT EXISTS meta_description_de TEXT;

-- Comentarios para documentación
COMMENT ON COLUMN blog_posts.title_es IS 'Título del post en español';
COMMENT ON COLUMN blog_posts.content_es IS 'Contenido del post en español (HTML)';
COMMENT ON COLUMN blog_posts.excerpt_es IS 'Extracto/resumen del post en español';
COMMENT ON COLUMN blog_posts.meta_title_es IS 'Meta título SEO en español';
COMMENT ON COLUMN blog_posts.meta_description_es IS 'Meta descripción SEO en español';

COMMENT ON COLUMN blog_posts.title_de IS 'Título del post en alemán';
COMMENT ON COLUMN blog_posts.content_de IS 'Contenido del post en alemán (HTML)';
COMMENT ON COLUMN blog_posts.excerpt_de IS 'Extracto/resumen del post en alemán';
COMMENT ON COLUMN blog_posts.meta_title_de IS 'Meta título SEO en alemán';
COMMENT ON COLUMN blog_posts.meta_description_de IS 'Meta descripción SEO en alemán';

-- Eliminar columnas antiguas de inglés si existen (el inglés ahora es el base)
-- NOTA: Descomentar solo si estás seguro de que no necesitas estos datos
-- ALTER TABLE blog_posts DROP COLUMN IF EXISTS title_en;
-- ALTER TABLE blog_posts DROP COLUMN IF EXISTS content_en;
-- ALTER TABLE blog_posts DROP COLUMN IF EXISTS excerpt_en;
