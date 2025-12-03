# Change Log

Log de todos los cambios exitosos realizados en el proyecto San Luis Way.

---

## [2025-12-03] Nuevo blog post: Inversión Extranjera Directa en SLP

**Descripción:**
Creación de un artículo deep dive sobre inversión extranjera directa y oportunidades laborales para profesionistas extranjeros en San Luis Potosí.

**Archivos creados:**
- scripts/publish-fdi-deep-dive.js - Script para publicar el blog post

**Contenido del post (18 min read):**
1. **FDI Overview** - $3B+ proyectados para 2025, principales países inversores
2. **Key Industries** - Automotriz, manufactura, energía, logística
3. **Nearshoring Effect** - SLP como hub estratégico
4. **Job Opportunities** - Perfiles más demandados para extranjeros
5. **Visa Requirements** - Proceso paso a paso para visa de trabajo
6. **Salary Expectations** - Rangos salariales por posición
7. **Cost of Living** - Comparación con CDMX (26% más barato)
8. **Practical Tips** - Recursos y recomendaciones

**URL del post:** /blog/foreign-direct-investment-slp-job-market-foreign-professionals

**Fuentes utilizadas:**
- Secretaría de Desarrollo Económico SLP
- Gobierno del Estado de SLP
- Instituto Nacional de Migración
- Glassdoor, Indeed México
- Mexico Industry, Líder Empresarial
- Expatistan, Numbeo

**Resultado:** ✅ Exitoso - Post publicado correctamente en la base de datos

---

## [2025-12-03] Migración de imágenes de blog a Supabase Storage

**Descripción:**
Migración completa de imágenes del blog post "Top 5 Cozy Cafés" desde el filesystem local a Supabase Storage para que las imágenes vivan en la base de datos.

**Archivos creados/usados:**
- scripts/upload-cafe-images-to-bucket.js - Script para subir imágenes a Supabase Storage
- scripts/update-cozy-cafes-image.js - Script para actualizar el header image
- scripts/update-cozy-cafes-post.js - Script para actualizar URLs en el contenido

**Imágenes migradas a Supabase Storage (bucket: blog-post-images):**
- cozy-cafes-slp-header.jpg (header image)
- cafes/capital-coffee.jpg
- cafes/cafe-sideral.jpg
- cafes/500-noches.jpg
- cafes/las-castanas.jpg
- cafes/halva-cafe.png
- cafes/hot-chocolate-slp.jpg

**Cambios en base de datos:**
- Blog post `top-5-cozy-cafes-winter-san-luis-potosi` actualizado con:
  - image_url: https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-post-images/cozy-cafes-slp-header.jpg
  - content: Todas las 6 imágenes internas ahora usan URLs de Supabase Storage

**Resultado:** ✅ Exitoso
- 7 imágenes migradas a Supabase Storage
- Blog post ahora carga imágenes desde la base de datos
- Imágenes locales ya no son necesarias para producción

---

## [2025-12-02] Nuevo blog post: Top 5 Cozy Cafés for Winter in SLP

**Descripción:**
Creación de un nuevo artículo de blog sobre los 5 mejores cafés acogedores para el invierno en San Luis Potosí.

**Archivos creados:**
- scripts/publish-cozy-cafes-post.js - Script para publicar el blog post
- public/images/blog/cozy-cafes-slp-header.jpg - Imagen header del post

**Archivos modificados:**
- src/pages/api/blog/create-post.ts - Actualizado para usar SUPABASE_SERVICE_ROLE_KEY (bypass RLS)

**Contenido del post:**
1. **Capital Coffee** - Café moderno con terraza, opciones veganas, WiFi excelente
2. **Café Sideral** - "El café más bonito de San Luis", murales artísticos
3. **500 Noches** - Café de Chiapas con música trova en vivo
4. **Las Castañas** - Repostería histórica frente a la iglesia de Tequis
5. **Halva Café** - Pastelería francesa experimental, super-instagrammable

**URL del post:** /blog/top-5-cozy-cafes-winter-san-luis-potosi

**Fuentes utilizadas:**
- Tripadvisor (Capital Coffee, Café Sideral, 500 Noches, Las Castañas)
- Tourbly.com.mx
- LíderLife
- Restaurant Guru
- Instagram oficial de cada café

**Resultado:** ✅ Exitoso - Post publicado correctamente en la base de datos

---

## [2025-12-01] Implementación completa del sistema de Newsletter

**Archivos creados:**
- src/pages/api/newsletter/subscribe.ts - API para suscripción con email de bienvenida
- src/pages/api/newsletter/unsubscribe.ts - API para desuscripción (GET/POST)
- src/pages/api/newsletter/newsletters.ts - CRUD para newsletters
- src/pages/api/newsletter/newsletters/[id].ts - Operaciones por newsletter individual
- src/pages/api/newsletter/send.ts - Envío masivo de newsletters
- src/pages/api/newsletter/subscribers.ts - Gestión de suscriptores
- src/pages/newsletter/unsubscribed.tsx - Página de confirmación de desuscripción
- src/pages/admin/newsletter.tsx - Panel de administración de newsletters
- supabase/migrations/newsletter_tables.sql - Migración SQL para las tablas
- scripts/create-newsletter-tables.js - Script de creación de tablas

**Archivos modificados:**
- src/components/NewsletterSignup.tsx - Integración con API en lugar de localStorage
- .env.example - Agregado NEWSLETTER_ADMIN_KEY

**Sistema implementado:**
1. **Base de datos (3 tablas):**
   - newsletter_subscribers: suscriptores con estado, preferencias, tracking
   - newsletters: contenido HTML, estadísticas, estado de envío
   - newsletter_sends: tracking individual por envío

2. **API Routes:**
   - POST /api/newsletter/subscribe: Suscripción con email de bienvenida via Resend
   - GET/POST /api/newsletter/unsubscribe: Desuscripción desde email o sitio
   - GET/POST /api/newsletter/newsletters: Listar y crear newsletters
   - GET/PUT/DELETE /api/newsletter/newsletters/[id]: Operaciones CRUD
   - POST /api/newsletter/send: Envío masivo o test email
   - GET /api/newsletter/subscribers: Listar suscriptores con filtros

3. **Panel Admin (/admin/newsletter):**
   - Autenticación con NEWSLETTER_ADMIN_KEY
   - Dashboard con contadores (active, unsubscribed, bounced)
   - Tabla de suscriptores con filtros por estado
   - Tabla de newsletters con estado y fechas

4. **Componente NewsletterSignup actualizado:**
   - Llamada a API real en lugar de localStorage
   - Manejo de estados: nuevo suscriptor, ya suscrito, resuscripción

**Resultado:** ✅ Exitoso - Build compilado correctamente

---

## [2025-12-01] Creación de páginas legales, newsletter style guide y corrección de social links

**Archivos modificados:**
- src/components/Footer.tsx

**Archivos creados:**
- src/pages/newsletter.tsx
- src/pages/privacy.tsx
- src/pages/terms.tsx
- src/pages/cookies.tsx
- src/pages/sitemap.tsx

**Problema resuelto:**
Site audit identificó 5 URLs con error 404 (/newsletter, /privacy, /terms, /cookies, /sitemap) y social links con placeholders (#) en el Footer.

**Cambios realizados:**

1. **Página /newsletter con Style Guide completo:**
   - Newsletter Overview: frecuencia semanal, enfoque en eventos de SLP
   - 7 categorías de contenido: Culture, Food, Sports, Educational, Health, Entertainment, Arts
   - Deep Search Prompt Template para encontrar eventos en SLP
   - Writing Instructions: tono, estructura, longitud, formato
   - SEO & Marketing Rules: subject lines, CTAs, link integration
   - Template completo de newsletter con secciones y formato

2. **Páginas legales creadas:**
   - /privacy - Privacy Policy con 10 secciones (data collection, usage, third-party, security, etc.)
   - /terms - Terms of Service con 14 secciones (acceptable use, IP, liability, etc.)
   - /cookies - Cookie Policy con 8 secciones (types, third-party, management, opt-out)
   - /sitemap - HTML sitemap con 6 categorías navegables + link a XML sitemap

3. **Corrección de social links en Footer:**
   - Instagram actualizado: de "#" a "https://www.instagram.com/sanluisway/"
   - Agregado label "@sanluisway" visible junto al icono
   - Removidos iconos de Facebook y YouTube (no hay cuentas activas)

**Resultado:** ✅ Exitoso
- 5 errores 404 resueltos
- Social links funcionales con URL real de Instagram
- Newsletter style guide listo para usar en herramienta externa de generación
- Páginas legales completas y profesionales

**Commit:** c5017d36

---

## [2025-11-25] Rediseño del calendario cultural con carrusel elegante y corrección de categorías

**Archivos modificados:**
- src/pages/index.tsx
- src/pages/events/[category]/index.tsx
- src/components/EventCategoryFilter.tsx

**Archivos creados:**
- scripts/check-music-events.js
- scripts/remove-event-images.js

**Cambios realizados:**

1. **Eliminación de imágenes de eventos:**
   - Ejecutado script para poner image_url = null en todos los eventos
   - 13 eventos actualizados (eventos previos que tenían imágenes)
   - Calendario cultural ahora muestra solo información, sin espacios para imágenes

2. **Rediseño del calendario cultural en homepage:**
   - ANTES: Grid vertical de 4 eventos con imágenes
   - DESPUÉS: Carrusel horizontal auto-scroll con 8 eventos
   - Características del nuevo diseño:
     * Scroll automático continuo (40 segundos por ciclo)
     * Loop infinito con eventos duplicados
     * Tarjetas de 400px de ancho
     * Efecto fade con gradientes en los extremos
     * Badge de fecha grande y destacado
     * Información completa: título, descripción, ubicación, categoría
     * Hover effects elegantes

3. **Corrección del sistema de categorías de eventos:**
   - Problema: Categorías 'cultural' y 'other' no existen en base de datos
   - Categorías válidas en DB: sports, arts-culture, music, culinary, community-social
   - Solución implementada:
     * Agregadas 'music' y 'community-social' como categorías válidas
     * 'cultural' ahora es un alias de 'arts-culture' (compatibilidad retroactiva)
     * Página /events/cultural funciona mostrando eventos de arts-culture
     * Página /events/music ahora funciona correctamente (15 eventos encontrados)

4. **Actualización de EventCategoryFilter:**
   - Tipo EventCategory actualizado con categorías correctas
   - Botones de filtro actualizados:
     * 'Cultural' → mapea a 'arts-culture'
     * 'Music' → agregado
     * 'Community' → reemplaza 'Other'

5. **Scripts de utilidad creados:**
   - check-music-events.js: Verifica eventos de música en la base de datos
   - remove-event-images.js: Remueve image_url de todos los eventos

**Resultado:** ✅ Exitoso
- Calendario cultural con diseño elegante tipo carrusel
- Sistema de categorías corregido y funcional
- Todas las páginas de categorías funcionan correctamente
- Sin espacios vacíos para imágenes
- Mejor experiencia visual y de usuario

**Commit:** e121e3d5

---

## [2025-11-25] Sistema completo de calendario cultural y gestión de eventos

**Archivos modificados:**
- src/pages/index.tsx
- src/pages/cultural/index.tsx
- public/sitemap.xml

**Archivos creados:**
- CULTURAL_EVENTS_RESEARCH_2025.md
- EVENTS_TEMPLATE.json
- EVENTS_TO_IMPORT.json
- HOW_TO_ADD_EVENTS.md
- scripts/add-events-from-template.js
- scripts/add-event-categories.js

**Problema resuelto:**
El calendario cultural aparecia vacio aunque algunos eventos tenian la columna "Add to cultural calendar" marcada como true en Supabase.

**Cambios realizados:**

1. **Correccion de queries en homepage y pagina cultural:**
   - ANTES: Filtraba por categoria o no filtraba correctamente
   - DESPUES: Filtra por `add_to_cultural_calendar = true`
   - Agregado rendering condicional para ocultar secciones vacias completamente
   - src/pages/index.tsx linea 47: `.eq('add_to_cultural_calendar', true)`
   - src/pages/cultural/index.tsx linea 73: `.eq('add_to_cultural_calendar', true)`

2. **Investigacion de eventos culturales:**
   - Realizada busqueda exhaustiva de eventos en San Luis Potosi
   - Documentados 30+ eventos en CULTURAL_EVENTS_RESEARCH_2025.md
   - Categorizados por tipo, fecha y prioridad
   - Fuentes verificadas: sitios oficiales, redes sociales, portales turisticos

3. **Sistema de importacion de eventos:**
   - Creado EVENTS_TEMPLATE.json con estructura completa y ejemplos
   - Desarrollado script add-events-from-template.js con validacion robusta
   - Validaciones incluidas:
     * Campos requeridos: title, start_date, end_date, location, category
     * Formato de fechas ISO 8601: YYYY-MM-DDTHH:MM:SS
     * Categorias validas: sports, arts-culture, music, culinary, community-social
     * Tipo de dato featured: boolean
   - Creado HOW_TO_ADD_EVENTS.md con guia paso a paso

4. **Importacion masiva de eventos:**
   - Procesados 63 eventos culturales desde EVENTS_TO_IMPORT.json
   - Todos los eventos validados e insertados exitosamente
   - Categorias corregidas:
     * "cultural" → "arts-culture" (26 eventos)
     * "other" → "community-social" (17 eventos)
   - Cada evento con: titulo, descripcion, fechas, ubicacion, categoria, featured flag

5. **Correccion de esquema:**
   - Identificado que columna real es `add_to_cultural_calendar` no `show_in_cultural_calendar`
   - Actualizado script para mapear correctamente
   - Actualizado queries en todas las paginas

**Eventos importados (ejemplos):**
- Festival de San Luis 2025 (enero-febrero)
- Feria Nacional de la Mascaras (febrero)
- Festival Internacional de Danza Contemporanea (marzo)
- Festival de Jazz (junio)
- Festival Internacional Barroco (noviembre)
- Y 58 eventos mas...

**Resultado:** ✅ Exitoso
- 63 eventos culturales agregados exitosamente a la base de datos
- Calendario cultural ahora se muestra correctamente en homepage
- Calendario cultural se muestra en pagina /cultural cuando hay eventos
- Secciones vacias completamente ocultas (no muestran "no events")
- Sistema de importacion reutilizable para futuros eventos
- Sitio reconstruido con todas las correcciones aplicadas

**Commit:** 7cd215ab

---

## [2025-11-21] Creación de Style Guides para Blog: Checklists e Itinerarios

**Archivos creados:**
- BLOG_CHECKLIST_STYLE_GUIDE.md
- BLOG_ITINERARY_STYLE_GUIDE.md

**Propósito:**
Establecer guías de estilo completas y consistentes para dos nuevos tipos de contenido de blog: posts de checklists útiles y posts de itinerarios turísticos/guías prácticas.

**Contenido de BLOG_CHECKLIST_STYLE_GUIDE.md:**
- 1,100+ líneas de guía comprehensiva para posts de checklists
- Componentes de checkbox interactivos con HTML/CSS
- Sistema de organización por categorías (documentos, trámites, seguimiento)
- Tracking de progreso visual con indicadores
- Integración de timelines para procesos paso a paso
- Cajas de desglose de costos
- Secciones de errores comunes y advertencias
- Cajas de pro tips y consejos expertos
- Enlaces a recursos oficiales
- Ejemplos completos de código HTML/Tailwind CSS
- Basado en patrones de los 3 style guides de referencia existentes

**Contenido de BLOG_ITINERARY_STYLE_GUIDE.md:**
- 1,100+ líneas de guía comprehensiva para itinerarios turísticos
- Componentes de itinerario día por día con headers visuales
- Layouts de timeline con color-coding por período del día
- Cards de actividades detalladas (restaurantes, outdoor, cultura)
- Sistema de categorización de actividades con iconos
- Desglose de presupuestos por estilo de viaje (budget/mid-range/luxury)
- Integración de mapas y ubicaciones
- Secciones de transporte y logística
- Cajas de información práctica (clima, seguridad, qué empacar)
- Galerías de fotos estratégicas
- Tips de insiders locales y secretos
- Guías climáticas y estacionales
- Ejemplos completos de estructura de posts
- 15+ iconos específicos para itinerarios

**Características compartidas:**
- Ambos guides siguen el sistema de colores semántico establecido:
  * Azul = Información general
  * Verde = Éxito, confirmaciones, CTAs
  * Amarillo = TOC, highlights, advertencias
  * Rojo = Información crítica, errores comunes
  * Purple = Headers especiales, premium info
- Estructura HTML/Tailwind CSS consistente con guides existentes
- Componentes responsive (mobile-first)
- Énfasis en accesibilidad
- Regla crítica: **NUNCA incluir información no verificada**
- Guías para atribución correcta de fuentes
- Secciones FAQ obligatorias
- CTAs finales en verde

**Uso:**
Estas guías servirán como referencia para crear:
1. **Posts de checklists:** Guías paso a paso para procesos (ej: "Checklist completo para mudarse a San Luis Potosí")
2. **Posts de itinerarios:** Guías de viaje día por día (ej: "3 días perfectos en San Luis Potosí: Itinerario completo")

**Resultado:** ✅ Exitoso
- Dos style guides comprehensivos creados y listos para usar
- Expandido el sistema de documentación de blog con 2 nuevos formatos
- Mantenida consistencia con style guides existentes
- Total de 5 style guides disponibles ahora:
  1. BLOG_STYLE_GUIDE.md (general)
  2. BLOG_DEEP_DIVE_STYLE_GUIDE (artículos profundos)
  3. BLOG_COMPARISSON_STYLE_GUIDE (comparaciones de productos)
  4. BLOG_CHECKLIST_STYLE_GUIDE.md (checklists) ✨ NUEVO
  5. BLOG_ITINERARY_STYLE_GUIDE.md (itinerarios) ✨ NUEVO

**Próximos pasos:**
- Usar estos guides para crear contenido de blog de alta calidad
- Actualizar según necesidades emergentes del proyecto

---

## [2025-11-21] Fix: Imágenes de blog no cargaban en producción

**Archivos modificados:**
- next.config.js

**Problema identificado:**
Las imágenes del blog no cargaban en producción (sanluisway.com) con error 400 (Bad Request), aunque funcionaban correctamente en desarrollo local. El error ocurría porque Next.js intentaba optimizar imágenes externas de múltiples dominios y fallaba en el proceso.

**Error en consola:**
```
image:1 Failed to load resource: the server responded with a status of 400 (Bad Request)
```

**Causa raíz:**
- Next.js Image Optimization estaba habilitado (`unoptimized: false`)
- Las imágenes provenían de 3 dominios externos diferentes:
  * Supabase Storage: `omxporaecrqsqhzjzvnx.supabase.co`
  * Seobot AI: `assets.seobotai.com`
  * Wix Static: `static.wixstatic.com`
- El optimizador de Next.js fallaba al procesar estas imágenes externas en producción

**Solución aplicada:**
- Cambiado `unoptimized: false` → `unoptimized: true` en next.config.js línea 15
- Las imágenes ahora se sirven directamente sin pasar por el optimizador de Next.js
- Los dominios ya estaban correctamente configurados en `domains` y `remotePatterns`

**Trade-offs de la solución:**
- ✅ PRO: Las imágenes cargan correctamente en producción
- ✅ PRO: No más errores 400
- ✅ PRO: Solución simple y efectiva
- ⚠️ CON: Las imágenes no se optimizan automáticamente (WebP/AVIF)
- ⚠️ CON: Sin lazy loading automático de Next.js
- ⚠️ CON: Tamaños de imagen no optimizados automáticamente

**Páginas afectadas (ahora funcionan):**
- /blog/ (índice de blog posts)
- /blog/[slug] (posts individuales)
- / (homepage - featured places en "Discover Hidden Gems")

**Resultado:** ✅ Exitoso
- Imágenes de blog cargan correctamente en producción
- Error 400 eliminado
- Todas las imágenes de Supabase, Seobot y Wix se muestran correctamente

**Commit:** 08aba78d

---

## [2025-11-21] Optimización de SEO: Sitemap y Robots.txt

**Archivos modificados/creados:**
- public/sitemap.xml (optimizado)
- public/robots.txt (nuevo)
- scripts/generate-sitemap.js (mejorado)

**Problema resuelto:**
Google Search Console reportaba múltiples páginas con error 404 Not Found y muchas páginas sin indexar debido a un sitemap mal configurado.

**Cambios realizados:**

1. **Sitemap optimizado (79 URLs vs 102 anteriores):**
   - Eliminadas páginas internas de Next.js que causaban 404: `/_app`, `/_document`
   - Eliminadas páginas de desarrollo/backup: `/index-backup-*`, `/index-redesign`
   - Eliminadas páginas privadas que no deberían indexarse: `/account/*`, `/business/*`
   - Eliminadas múltiples versiones de signup/signin creadas para testing
   - Eliminadas páginas de resultados: `/checkout/success`, `/order-confirmation`
   - Agregado campo `<lastmod>` con fecha actual en todas las URLs
   - Mejoradas las prioridades según importancia de páginas
   - Script configurado para obtener páginas dinámicas desde Supabase (brands, blog posts)

2. **Robots.txt creado:**
   - Bloquea acceso de bots a páginas privadas (`/api/`, `/account/`, `/business/`)
   - Bloquea páginas de desarrollo y test (`/index-backup*`, `/signup-*`, etc.)
   - Indica ubicación del sitemap para facilitar indexación
   - Permite acceso a contenido público
   - Configurado `Crawl-delay: 1` para evitar sobrecarga del servidor

3. **Script generate-sitemap.js mejorado:**
   - Sistema de exclusión automática de páginas problemáticas
   - Obtiene páginas dinámicas desde Supabase (21 brands + blog posts)
   - Genera URLs con lastmod, changefreq y prioridades apropiadas
   - Maneja correctamente el caso sin credenciales de Supabase
   - Mejor organización y documentación del código

**Resultado:** ✅ Exitoso
- Reducidas URLs en sitemap de 102 a 79 (eliminadas 23 páginas problemáticas)
- Todos los errores 404 causados por páginas internas resueltos
- Mejora en la indexabilidad del sitio para motores de búsqueda
- Robots.txt optimizado para SEO y seguridad
- Mejor organización de URLs por prioridad e importancia

**Próximos pasos recomendados:**
1. Enviar nuevo sitemap a Google Search Console
2. Verificar que robots.txt sea accesible en https://sanluisway.com/robots.txt
3. Solicitar reindexación de páginas afectadas
4. Monitorear errores 404 en Search Console durante próximos días

**Commit:** be7c86b3

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
