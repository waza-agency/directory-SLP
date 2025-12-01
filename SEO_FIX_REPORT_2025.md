# Informe de Diagnóstico y Solución de Indexación SEO

He analizado tu código para identificar por qué Google Search Console muestra cientos de páginas no indexadas. Aquí están los hallazgos y las soluciones aplicadas.

## 🔍 Diagnóstico del Problema

1.  **Inconsistencia de Dominio (Causa Principal):**
    *   **Sitemap:** El script generaba URLs con `https://sanluisway.com` (sin `www`).
    *   **Etiquetas Canónicas:** El componente `SEO.tsx` forzaba `https://www.sanluisway.com` (con `www`).
    *   **Resultado:** Google recibía señales contradictorias. El sitemap le decía "indexa esta página sin www", pero al visitar la página, esta le decía "mi versión oficial es con www". Esto causa que Google las marque como "Duplicada" o "Descubierta, actualmente sin indexar".

2.  **Robots.txt Desactualizado:**
    *   El archivo `robots.txt` apuntaba al sitemap en la versión sin `www`.

3.  **Riesgo de "Páginas Huérfanas" en Construcción:**
    *   El script de sitemap requiere credenciales de Supabase para añadir páginas dinámicas (blog, marcas). Si tu proceso de build (en Vercel/GitHub) no tiene estas variables de entorno, el sitemap se genera vacío de contenido dinámico.

## ✅ Soluciones Aplicadas

He realizado los siguientes cambios en tu código para unificar la estrategia SEO:

1.  **Unificación de Dominio:**
    *   Actualicé `scripts/generate-sitemap.js` para usar `process.env.NEXT_PUBLIC_SITE_URL` o `https://www.sanluisway.com` por defecto.
    *   Actualicé `src/components/common/SEO.tsx` para usar la misma lógica. Ahora ambos componentes "hablan el mismo idioma".

2.  **Corrección de Robots.txt:**
    *   Actualicé la URL del sitemap en `public/robots.txt` para que coincida con el dominio canónico (`www`).

## 🚀 Pasos Siguientes para Ti

Para que estos cambios surtan efecto y recuperes el tráfico, debes realizar lo siguiente:

1.  **Verificar Variables de Entorno:**
    *   Asegúrate de que en tu plataforma de despliegue (Vercel, Netlify, etc.) tengas definida la variable `NEXT_PUBLIC_SITE_URL` con el valor `https://www.sanluisway.com`.
    *   **CRÍTICO:** Asegúrate de que `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` también estén disponibles durante el proceso de **Build**, no solo en Runtime. Si no están, el script de sitemap no podrá leer tu base de datos y generará un sitemap incompleto.

2.  **Redespliegue (Deploy):**
    *   Haz un nuevo deploy de tu aplicación para que se regenere el sitemap y se actualicen las etiquetas canónicas.

3.  **Validación en Google Search Console:**
    *   Entra a GSC y vuelve a enviar tu sitemap (`https://www.sanluisway.com/sitemap.xml`).
    *   Usa la herramienta de "Inspección de URL" en una página que antes no se indexaba (ej. un post del blog) y solicita la indexación.
    *   Espera de 3 a 7 días para ver cambios en el reporte de cobertura.

## 💡 Recomendación Adicional

He notado que tu `next.config.js` tiene `trailingSlash: false`. Esto es correcto y consistente con el sitemap. No lo cambies a menos que configures redirecciones 301 masivas, ya que podrías perder posicionamiento temporalmente.

---
*Informe generado por tu Asistente de IA*

