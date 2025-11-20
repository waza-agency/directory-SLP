-- Script para hacer los buckets de Storage públicos en Supabase
-- Ejecutar este script en el SQL Editor del dashboard de Supabase

-- 1. Hacer el bucket 'brand-images' público
UPDATE storage.buckets
SET public = true
WHERE id = 'brand-images';

-- 2. Hacer el bucket 'images' público (si existe)
UPDATE storage.buckets
SET public = true
WHERE id = 'images';

-- 3. Crear política pública para 'brand-images' (lectura)
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT
USING (bucket_id = 'brand-images');

-- 4. Crear política pública para 'images/brands' (lectura)
CREATE POLICY "Public Access to brands folder" ON storage.objects
FOR SELECT
USING (bucket_id = 'images' AND (storage.foldername(name))[1] = 'brands');

-- Verificar que los buckets ahora son públicos
SELECT id, name, public
FROM storage.buckets
WHERE id IN ('brand-images', 'images');
