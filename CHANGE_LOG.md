# Change Log

Log de todos los cambios exitosos realizados en el proyecto San Luis Way.

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
