# Purgar Caché - www.sanluisway.com

## Problema Identificado

Los dos dominios están sirviendo versiones diferentes porque:
1. ❌ nginx NO está redirigiendo (ambos retornan 200 OK en lugar de 301)
2. ⚠️ HAY un CDN en uso (header: X-Supersonic-CDN)
3. ⚠️ www.sanluisway.com tiene CACHÉ VIEJO
4. ⚠️ Next.js tiene caché con duración de 1 año

## Paso 1: Purgar Caché del CDN (Cloudflare o similar)

### Si usas Cloudflare:

1. Ve a https://dash.cloudflare.com
2. Selecciona el dominio `sanluisway.com`
3. Ve a **Caching** → **Configuration**
4. Click en **Purge Everything**
5. Confirma

**O purgar solo www.sanluisway.com:**
1. En Caching → Custom Purge
2. Purge by: **URL**
3. Agrega:
   - https://www.sanluisway.com
   - https://www.sanluisway.com/en
   - https://www.sanluisway.com/es
4. Click **Purge**

### Desde la terminal (API de Cloudflare):

```bash
# Reemplaza con tus credenciales
ZONE_ID="tu-zone-id"
API_KEY="tu-api-key"
EMAIL="tu-email@example.com"

# Purgar todo el caché
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
  -H "X-Auth-Email: $EMAIL" \
  -H "X-Auth-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

### Si NO usas Cloudflare:

Identifica tu CDN:
```bash
# Ver headers completos
curl -I https://www.sanluisway.com

# Busca headers como:
# - X-Cache (Fastly, Akamai)
# - CF-Cache-Status (Cloudflare)
# - X-Served-By (Fastly, Varnish)
# - Server (cloudfront - AWS)
```

## Paso 2: Rebuild del contenedor Docker para purgar caché de Next.js

Conéctate al servidor de producción:

```bash
ssh usuario@servidor

cd /ruta/al/proyecto/directory-SLP

# Detener contenedor
docker-compose down

# Rebuild sin caché
docker-compose build --no-cache

# Levantar de nuevo
docker-compose up -d

# Ver logs
docker-compose logs -f --tail=50
```

## Paso 3: Verificar que nginx esté aplicando redirects

```bash
# En el servidor, verificar que nginx esté corriendo
sudo systemctl status nginx

# Verificar configuración
sudo nginx -t

# Si está bien, reload
sudo systemctl reload nginx
```

## Paso 4: Forzar rebuild de páginas estáticas en Next.js

Si el problema persiste, necesitas invalidar el caché de ISR (Incremental Static Regeneration):

**Opción A: Vía API de Next.js (On-Demand Revalidation)**

```bash
# Revalidar la homepage
curl -X POST "https://www.sanluisway.com/api/revalidate?path=/" \
  -H "Content-Type: application/json"

# Revalidar páginas específicas
curl -X POST "https://www.sanluisway.com/api/revalidate?path=/en" \
  -H "Content-Type: application/json"
```

**Opción B: Crear endpoint de revalidación**

Crea el archivo `src/pages/api/revalidate.ts`:

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const path = req.query.path as string;

  if (!path) {
    return res.status(400).json({ message: 'Missing path parameter' });
  }

  try {
    await res.revalidate(path);
    return res.json({ revalidated: true, path });
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating' });
  }
}
```

Luego ejecuta:
```bash
curl -X POST "https://www.sanluisway.com/api/revalidate?path=/"
curl -X POST "https://www.sanluisway.com/api/revalidate?path=/en"
curl -X POST "https://www.sanluisway.com/api/revalidate?path=/es"
```

**Opción C: Eliminar caché de Next.js manualmente**

En el servidor:
```bash
# Entrar al contenedor
docker exec -it <container-id> sh

# Eliminar caché de Next.js
rm -rf .next/cache

# Salir
exit

# Restart del contenedor
docker-compose restart
```

## Paso 5: Verificación

### Verifica que las redirecciones funcionen:

```bash
# Desde tu computadora
curl -I https://sanluisway.com

# Deberías ver:
# HTTP/1.1 301 Moved Permanently
# Location: https://www.sanluisway.com/
```

### Verifica que el caché esté purgado:

```bash
# Desde tu computadora
curl -I https://www.sanluisway.com

# Busca estos headers:
# X-Cache-Status: MISS (primera vez después de purgar)
# X-Cache-Status: HIT (siguientes veces)
# x-nextjs-cache: MISS (primera vez)
```

### Verifica el contenido con un timestamp:

```bash
# Ver el HTML y buscar las traducciones
curl https://www.sanluisway.com | grep -i "nav.search"

# Si ves "nav.searchPlaceholder" → CACHÉ VIEJO ❌
# Si ves "Search places, events" → CACHÉ NUEVO ✅
```

## Troubleshooting

### Si aún ves contenido viejo después de purgar:

1. **Verifica que el build se hizo correctamente:**
   ```bash
   docker-compose logs | grep -i "build"
   ```

2. **Verifica la versión del código en el servidor:**
   ```bash
   cd /ruta/al/proyecto/directory-SLP
   git log -1 --oneline
   # Debería mostrar: 6ee7c0a1 fix: Corregir traducciones navbar...
   ```

3. **Verifica que el puerto 3007 esté sirviendo la versión nueva:**
   ```bash
   curl http://localhost:3007 | grep -i "nav.search"
   ```

4. **Limpia el caché del navegador:**
   - Chrome: `Ctrl + Shift + Delete` → Borrar todo
   - O usa modo incógnito: `Ctrl + Shift + N`

### Si nginx NO está redirigiendo:

El problema puede ser que nginx NO esté corriendo. Verifica:

```bash
# ¿Nginx está instalado?
which nginx

# ¿Nginx está corriendo?
sudo systemctl status nginx

# ¿Qué está escuchando en el puerto 443?
sudo netstat -tlnp | grep :443

# ¿Qué configuración está usando nginx?
sudo nginx -T | grep "server_name"
```

Si nginx NO está corriendo, es posible que Docker esté expuesto directamente al puerto 443/80.

### Si Docker está expuesto directamente (sin nginx):

Necesitas configurar las redirecciones en Next.js. Agrega esto a `next.config.js`:

```javascript
async redirects() {
  return [
    // Redirect non-www to www
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'sanluisway.com',
        },
      ],
      destination: 'https://www.sanluisway.com/:path*',
      permanent: true,
    },
  ];
},
```

## Resumen de Acciones

1. ✅ Purgar caché del CDN (Cloudflare dashboard)
2. ✅ Rebuild del contenedor Docker sin caché
3. ✅ Reload de nginx
4. ✅ Purgar caché de Next.js (.next/cache)
5. ✅ Verificar redirects con curl
6. ✅ Limpiar caché del navegador

**Tiempo estimado:** 5-10 minutos

**Resultado esperado:** www.sanluisway.com muestra la versión actualizada
