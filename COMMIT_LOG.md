# Commit Log

Log detallado de todos los commits realizados en el proyecto San Luis Way.

---

## Commit: 1d7017a9 - 2025-11-20

**Mensaje:** fix: connect brands page to Supabase database instead of using fallback

**Archivos modificados:**
- src/pages/brands/index.tsx (modificado, -318 líneas, +55 líneas)
- scripts/check-brands-table.js (nuevo)
- scripts/get-supabase-project-info.js (nuevo)
- EMAIL_SETUP_GUIDE.md (eliminado)

**Descripción detallada:**

Este commit completa la integración real con Supabase para la página de brands, eliminando el código de fallback hardcodeado y conectando directamente a la base de datos.

1. **brands/index.tsx:**
   - ANTES: Tenía 200+ líneas de datos de fallback hardcodeados con solo 13 brands
   - DESPUÉS: Removido todo el fallback, ahora solo retorna array vacío en caso de error
   - Agregado `revalidate: 60` para ISR (Incremental Static Regeneration)
   - Agregado logging detallado: "Fetched brands from Supabase: 21"
   - Verificación de que fetchedBrands no sea vacío antes de continuar
   - El código ahora confía en que Supabase está correctamente configurado

2. **check-brands-table.js (nuevo):**
   - Script de utilidad para verificar la tabla brands en Supabase
   - Muestra todos los brands con su información completa
   - Identifica brands sin imágenes configuradas
   - Útil para debugging y verificación de datos

3. **get-supabase-project-info.js (nuevo):**
   - Script para obtener información del proyecto Supabase
   - Decodifica el JWT token para mostrar metadata del proyecto
   - Muestra project reference, issuer, role, fechas de emisión/expiración
   - Proporciona instrucciones para obtener info de organización/owner

**Datos verificados:**
- La tabla `brands` existe en Supabase con 21 registros
- Todos los brands tienen el campo `image_url` configurado
- Imágenes almacenadas en dos buckets de Supabase Storage:
  * brand-images/ (para algunas marcas como aguas-de-lourdes.jpg)
  * images/brands/ (para otras marcas con UUIDs como nombres)
- El dominio de Supabase ya está configurado en next.config.js
- La página usa correctamente `brand.image_url` en líneas 136 y 279

**Propósito/Razón:**

El código anterior usaba un fallback extenso que nunca debía ejecutarse porque Supabase está correctamente configurado. Este fallback:
- Añadía 200+ líneas de código innecesario
- Contenía solo 13 brands vs 21 reales en la base de datos
- No se sincronizaba con la app que alimenta la base de datos
- Creaba confusión sobre la fuente de verdad de los datos

Al eliminar el fallback y conectar directamente a Supabase:
- La página ahora muestra los 21 brands reales de la base de datos
- Cualquier cambio en la app de gestión se refleja automáticamente (cada 60 segundos)
- El código es más limpio y mantenible
- La fuente de verdad es clara: la tabla brands en Supabase

**Co-Authored-By:** Claude <noreply@anthropic.com>

---

## Commit: 296e5785 - 2025-11-19

**Mensaje:** fix: update Potosino brands page with correct image URLs and add brands table migration

**Archivos modificados:**
- src/pages/brands/index.tsx
- supabase/migrations/20250119000000_create_brands_table.sql (nuevo)

**Descripción detallada:**

Este commit soluciona el problema de imágenes faltantes en la página de Potosino Brands y establece la base para la gestión de marcas en la base de datos.

1. **brands/index.tsx (líneas 356-555):**
   - ANTES: Fallback contenía 8 marcas, algunas con URLs incorrectas (ron-potosino.jpg) y referencias a imágenes inexistentes (quesos-carranco.jpg, cajeta-coronado.jpg, canels.jpg)
   - DESPUÉS: Actualizado a 13 marcas con todas las imágenes disponibles en `/public/images/brands`
   - Agregadas nuevas marcas potosinas:
     * Aeroméxico (aeromexico-logo.png) - Categoría: aviation
     * Corazón de Xoconostle (corazon-de-xoconostle-logo.png) - Productos artesanales de xoconostle
     * La Gran Vía (la-gran-via-logo.jpg) - Panadería tradicional
     * La Legendaria (la-legendaria-logo.png) - Cervecería artesanal
     * Las Sevillanas (las-sevillanas.jpg) - Galletas y dulces regionales
     * Productos Don Tacho (productos-don-tacho.jpg) - Mole y salsas tradicionales
     * Ron Potosí (ron-potosi.jpg, antes ron-potosino.jpg) - Destilería
     * San Luis Rey Tranvía (san-luis-rey-tranvia-logo.jpg) - Tours turísticos
   - Removidas marcas sin imágenes disponibles para evitar enlaces rotos

2. **20250119000000_create_brands_table.sql (nuevo archivo):**
   - Creada estructura completa de tabla brands en Supabase
   - Campos: id, name, slug, category, year_founded, address, city, phone, website, instagram, description, notable_products, where_to_buy, image_url, featured, created_at, updated_at
   - Trigger automático para updated_at
   - Row Level Security habilitado con política de lectura pública
   - Índices en slug, category, y featured para búsquedas eficientes
   - Pre-poblada con los 13 brands y sus URLs correctas
   - Lista para aplicar con `supabase db push` cuando se configure acceso

**Propósito/Razón:**

La página de Potosino Brands mostraba imágenes rotas porque:
- No existía la tabla brands en Supabase, forzando uso del fallback
- El código de fallback tenía URLs incorrectas y referencias a imágenes inexistentes
- Faltaban varias marcas potosinas cuyas imágenes ya estaban disponibles en el proyecto

Este commit asegura que todas las 13 imágenes disponibles en `/public/images/brands` se muestren correctamente en la página, mejorando la experiencia del usuario y mostrando más marcas auténticas de San Luis Potosí. La migración permite transición futura a base de datos sin modificar el código.

**Co-Authored-By:** Claude <noreply@anthropic.com>

---

## Commit: aecffe42 - 2025-11-06

**Mensaje:** fix: resolve AdSense CSP blocking and image loading issues

**Archivos modificados:**
- src/pages/_document.tsx
- src/pages/index.tsx
- src/pages/_app.tsx

**Descripción detallada:**

Este commit resuelve problemas críticos que impedían que Google AdSense se cargara en producción y corrige problemas de visualización de imágenes en la sección Hidden Gems.

1. **_document.tsx (línea 10-11):**
   - ANTES: CSP solo especificaba dominios parciales de Google
   - DESPUÉS: Agregado `https://fundingchoicesmessages.google.com` a script-src
   - Agregadas directivas completas de CSP: default-src, style-src, img-src, font-src, connect-src, frame-src
   - Removido viewport meta tag (warning de Next.js)

2. **index.tsx (línea 45):**
   - ANTES: Placeholder `/images/placeholder.jpg` que no existe
   - DESPUÉS: URL de Unsplash como fallback válido
   - Soluciona errores 400 cuando blog posts no tienen imagen

3. **_app.tsx (línea 23):**
   - Agregado viewport meta tag en la ubicación correcta según Next.js best practices
   - Resuelve warning "viewport meta tags should not be used in _document.js"

**Propósito/Razón:**

El sitio en producción mostraba errores de CSP que bloqueaban scripts de Google AdSense, específicamente `fundingchoicesmessages.google.com`. Esto impedía que los anuncios se mostraran correctamente. Además, las imágenes de la sección Hidden Gems fallaban con error 400 porque el placeholder local no existía.

Este commit habilita AdSense en producción y asegura que todas las imágenes tengan un fallback válido.

**Co-Authored-By:** Claude <noreply@anthropic.com>

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
