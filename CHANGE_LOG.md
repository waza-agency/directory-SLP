# Change Log

Log de todos los cambios exitosos realizados en el proyecto San Luis Way.

---

## [2025-11-21] Verificación de configuración de imágenes en sección Discover Hidden Gems

**Archivos verificados:**
- src/pages/index.tsx
- src/lib/blog.ts
- next.config.js
- check_blog_images.js

**Verificación realizada:**
- Confirmado que las imágenes de blog posts están correctamente almacenadas en tabla `blog_posts` de Supabase
- URLs de imágenes verificadas para:
  * La Gran Vía: https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/la-gran-via-restaurant.jpg
  * Corazón de Xoconostle: https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/corazon-de-xoconostle-adventure.jpg
  * San Luis Rey Tranvía: https://static.wixstatic.com/media/... (desde Wix)
- Configuración de dominios en next.config.js confirmada (líneas 16-44)
- Código en getBlogPostsBySlugs (src/lib/blog.ts:131-167) funciona correctamente
- Mapeo de datos en index.tsx (líneas 38-47) correcto

**Resultado:** ✅ Exitoso
- Las imágenes se obtienen correctamente desde la base de datos Supabase
- No se requirieron cambios en el código (ya estaba configurado correctamente)
- Script check_blog_images.js agregado para verificaciones futuras
- Sitemap actualizado durante el build

**Commit:** 71c06649

---

## [2025-11-20] Conexión de página de Brands a base de datos Supabase

**Archivos modificados:**
- src/pages/brands/index.tsx
- scripts/check-brands-table.js (nuevo)
- scripts/get-supabase-project-info.js (nuevo)

**Cambios realizados:**
- Removido código de fallback con datos hardcodeados (200+ líneas eliminadas)
- Página ahora obtiene todos los brands directamente de la tabla `brands` en Supabase
- Verificado que los 21 brands se cargan correctamente desde la base de datos
- Agregado ISR con revalidación cada 60 segundos
- Creados scripts de utilidad para verificar datos en Supabase
- Confirmado que todas las imágenes cargan desde Supabase Storage

**Resultado:** ✅ Exitoso
- La página carga 21 brands reales desde Supabase
- Todas las imágenes provienen de Supabase Storage (buckets: brand-images/ y images/brands/)
- Campo `image_url` de la base de datos se usa correctamente
- Página se regenera automáticamente cada 60 segundos con datos actualizados
- Ya no hay dependencia de datos hardcodeados

**Commit:** 1d7017a9

---

## [2025-11-19] Actualización de página de Potosino Brands con URLs de imágenes correctas

**Archivos modificados:**
- src/pages/brands/index.tsx
- supabase/migrations/20250119000000_create_brands_table.sql (nuevo)

**Cambios realizados:**
- Actualizado el fallback de brands con todas las imágenes disponibles en `/public/images/brands`
- Agregadas nuevas marcas: Aeroméxico, Corazón de Xoconostle, La Gran Vía, La Legendaria, Las Sevillanas, Productos Don Tacho, Ron Potosí, San Luis Rey Tranvía
- Corregida URL de imagen de Ron Potosí (ron-potosino.jpg → ron-potosi.jpg)
- Removidas marcas sin imágenes disponibles (Quesos Carranco, Cajeta Coronado, Canel's)
- Creada migración SQL para tabla de brands en Supabase con estructura completa

**Resultado:** ✅ Exitoso
- Todas las imágenes de brands ahora cargan correctamente en la página
- Total de 13 marcas potosinas con imágenes válidas
- Migración lista para aplicar cuando se configure acceso a Supabase
- Página de brands muestra contenido completo sin imágenes rotas

**Commit:** 296e5785

---

## [2025-11-06] Corrección de AdSense CSP y carga de imágenes en Hidden Gems

**Archivos modificados:**
- src/pages/_document.tsx
- src/pages/index.tsx
- src/pages/_app.tsx

**Cambios realizados:**
- Agregado `https://fundingchoicesmessages.google.com` al Content Security Policy
- Actualizado CSP con directivas completas: default-src, style-src, img-src, font-src, connect-src, frame-src
- Cambiado placeholder de imagen de `/images/placeholder.jpg` (no existente) a URL de Unsplash
- Movido viewport meta tag de _document.tsx a _app.tsx (Next.js best practices)

**Resultado:** ✅ Exitoso
- Google AdSense ya no es bloqueado por CSP en producción
- Imágenes de Hidden Gems ahora tienen fallback válido
- Eliminado warning de Next.js sobre viewport en _document.tsx
- Anuncios de AdSense funcionan correctamente en producción

**Commit:** aecffe42

---

## [2025-11-05] Optimización de carga de imágenes en Places/Hidden Gems

**Archivos modificados:**
- next.config.js
- src/components/PlaceImage.tsx
- src/pages/places/index.tsx
- src/types/index.ts

**Cambios realizados:**
- Corregido PlaceImage.tsx para soportar tanto `image_url` (Supabase) como `imageUrl` (legacy)
- Removido flag `unoptimized=true` para activar optimización de imágenes de Next.js
- Reemplazados tags `<img>` por componente `Image` optimizado de Next.js en página de places
- Agregado dominio `images.unsplash.com` a next.config.js para imágenes de fallback
- Actualizado tipo `Place` para incluir campo `image_url`

**Resultado:** ✅ Exitoso
- Imágenes ahora cargan correctamente
- Optimización automática habilitada (WebP/AVIF, lazy loading, responsive)
- Mejor rendimiento en carga de páginas
- Servidor corriendo sin errores en http://localhost:3000

**Commit:** 2e5b5f6c
