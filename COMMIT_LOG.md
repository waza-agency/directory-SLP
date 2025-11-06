# Commit Log

Log detallado de todos los commits realizados en el proyecto San Luis Way.

---

## Commit: 2e5b5f6c - 2025-11-05

**Mensaje:** fix: optimize image loading for places and hidden gems

**Archivos modificados:**
- DESIGN_SYSTEM.md (new file)
- HOMEPAGE_REDESIGN.md (new file)
- REDESIGN_SUMMARY.md (new file)
- next.config.js
- public/sitemap.xml
- sitemap.xml
- src/components/Footer.tsx
- src/components/PlaceImage.tsx
- src/pages/cultural/index.tsx
- src/pages/cultural/music-dance.tsx (renamed from language.tsx)
- src/pages/index-backup-20251021-155913.tsx (new file)
- src/pages/index-redesign.tsx (new file)
- src/pages/places/index.tsx
- src/types/index.ts
- tsconfig.tsbuildinfo (new file)

**Descripción detallada:**

Este commit soluciona múltiples problemas críticos con la carga de imágenes en la sección de Places y Hidden Gems:

1. **PlaceImage.tsx (línea 40):**
   - ANTES: Buscaba solo `place.imageUrl` (camelCase)
   - DESPUÉS: Busca primero `place.image_url` (Supabase) y luego `place.imageUrl` (legacy)
   - Esto soluciona el problema donde las imágenes de Supabase no se mostraban

2. **PlaceImage.tsx (línea 62):**
   - ANTES: Tenía `unoptimized={true}` desactivando optimización
   - DESPUÉS: Removido el flag para activar optimización automática de Next.js
   - Beneficios: WebP/AVIF automático, lazy loading, responsive images

3. **places/index.tsx (líneas 127-135, 235-245):**
   - ANTES: Usaba tags `<img>` directos sin optimización
   - DESPUÉS: Usa componente `Image` de Next.js con atributo `fill` y `sizes`
   - Mejora significativa en performance y SEO

4. **next.config.js (líneas 22, 41-44):**
   - Agregado dominio `images.unsplash.com` a `domains` y `remotePatterns`
   - Permite cargar imágenes de fallback desde Unsplash

5. **types/index.ts (línea 14):**
   - Agregado campo `image_url?: string` al interface Place
   - Mantiene compatibilidad con ambos formatos de nombres

**Propósito/Razón:**

El sitio no estaba cargando las imágenes de lugares y hidden gems debido a:
- Incompatibilidad en nombres de campos entre Supabase (snake_case) y código (camelCase)
- Optimización de imágenes desactivada causando problemas de carga
- Uso de tags HTML raw en lugar de componentes optimizados de Next.js
- Falta de configuración para imágenes de fallback de Unsplash

Este commit restaura la funcionalidad de visualización de imágenes y mejora significativamente el rendimiento de la aplicación.

**Co-Authored-By:** Claude <noreply@anthropic.com>
