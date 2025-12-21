-- Script para agregar campos de idioma español y alemán a places
-- Ejecutar en Supabase SQL Editor
-- Estructura: campos base (name, description) = INGLÉS
--             _es = español, _de = alemán

-- Agregar columnas para contenido en español
ALTER TABLE places
ADD COLUMN IF NOT EXISTS name_es TEXT,
ADD COLUMN IF NOT EXISTS description_es TEXT;

-- Agregar columnas para contenido en alemán
ALTER TABLE places
ADD COLUMN IF NOT EXISTS name_de TEXT,
ADD COLUMN IF NOT EXISTS description_de TEXT;

-- Comentarios para documentación
COMMENT ON COLUMN places.name_es IS 'Nombre del lugar en español';
COMMENT ON COLUMN places.description_es IS 'Descripción del lugar en español';

COMMENT ON COLUMN places.name_de IS 'Nombre del lugar en alemán';
COMMENT ON COLUMN places.description_de IS 'Descripción del lugar en alemán';
