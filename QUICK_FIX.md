# Fix Rápido - Aplicar Cambios en www.sanluisway.com

## Problema: No tienes permisos para purgar caché en Cloudflare

Error recibido: "Sorry, you do not have access to purge cache for that zone id"

## Solución Temporal: Development Mode

1. En el panel de Cloudflare donde estás:
   - Busca **"Development Mode"**
   - Activa el toggle a **ON** (verde)
   - Esto bypasea el caché por **3 horas**

2. Ahora haz el deploy en el servidor (instrucciones abajo)

3. Después de las 3 horas, desactiva Development Mode
   - El caché nuevo se habrá guardado con la versión actualizada

## Deploy en el Servidor (HAZLO AHORA)

### Conéctate al servidor SSH:

```bash
ssh usuario@tu-servidor-ip
```

### Ejecuta estos comandos (copia todo de una vez):

```bash
cd /var/www/directory-SLP
git pull origin main
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

**Nota:** Si no sabes la ruta exacta, prueba estas ubicaciones comunes:
```bash
# Opción 1
cd /var/www/directory-SLP

# Opción 2
cd /home/usuario/directory-SLP

# Opción 3
cd /opt/directory-SLP

# Para encontrar la ruta:
find / -name "directory-SLP" 2>/dev/null
```

### Después del deploy, purga el caché de Next.js:

Desde tu computadora local, ejecuta:

```bash
# Revalidar homepage
curl -X POST "https://www.sanluisway.com/api/revalidate?path=/"

# Revalidar páginas de idiomas
curl -X POST "https://www.sanluisway.com/api/revalidate?path=/en"
curl -X POST "https://www.sanluisway.com/api/revalidate?path=/es"
```

## Verificación

Después de hacer todo (Development Mode + Deploy + Revalidate):

1. **Espera 2-3 minutos** (para que Docker termine de levantar)

2. **Limpia el caché de tu navegador:**
   - `Ctrl + Shift + R` (Windows/Linux)
   - `Cmd + Shift + R` (Mac)
   - O abre en modo incógnito

3. **Verifica que funcione:**
   - Ve a https://www.sanluisway.com
   - Mira la navbar
   - Deberías ver "Search places, events..." en lugar de "nav.searchPlaceholder"
   - No deberías ver los botones de Sign In / Sign Up

4. **Desde terminal (opcional):**
   ```bash
   curl https://www.sanluisway.com | grep "Search places"
   ```
   Si ves `placeholder="Search places, events..."` → ✅ FUNCIONA!

## Si aún no funciona después de 3 horas

**Opción 1: Pedir permisos al administrador de Cloudflare**

Contacta a quien administra la cuenta de Cloudflare y pídele que:
- Te dé rol de "Administrator" en el dominio sanluisway.com
- O que purgue el caché manualmente (Caching → Purge Everything)

**Opción 2: Usar la API de Cloudflare con credenciales del admin**

Si el admin te da su API Key, puedes purgar desde terminal:

```bash
ZONE_ID="obtener-de-cloudflare"
API_KEY="api-key-del-admin"
EMAIL="email-del-admin@example.com"

curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
  -H "X-Auth-Email: $EMAIL" \
  -H "X-Auth-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

Para obtener el ZONE_ID:
1. En Cloudflare dashboard
2. Selecciona sanluisway.com
3. En la barra lateral derecha, bajo "API" verás el Zone ID

**Opción 3: Cambiar configuración de caché en Cloudflare (si tienes permisos)**

Si puedes editar configuraciones pero no purgar:

1. **Caching** → **Configuration**
2. Cambia **Browser Cache TTL** de "5 minutes" a **"30 minutes"** (o cualquier otro valor)
3. Guarda
4. Cámbialo de vuelta a **"5 minutes"**
5. Esto forzará una invalidación parcial

## Timeline

**0:00** - Activar Development Mode en Cloudflare
**0:05** - Deploy en servidor (git pull, docker build, docker up)
**0:08** - Revalidar páginas con curl
**0:10** - Limpiar caché del navegador y verificar
**3:00** - Desactivar Development Mode (el caché nuevo ya está guardado)

## Contacto con el Admin de Cloudflare

Si no sabes quién administra Cloudflare, busca en:
- Emails con dominio @cloudflare.com
- Credenciales en el servidor (puede haber .env con CF_API_KEY)
- Pregunta a tu equipo/cliente quién configuró el dominio

## Resumen

✅ **Paso 1:** Activar Development Mode (AHORA)
✅ **Paso 2:** Deploy en servidor SSH
✅ **Paso 3:** Revalidar con curl
✅ **Paso 4:** Verificar en navegador (modo incógnito)
✅ **Paso 5:** Desactivar Development Mode después de 3 horas
✅ **Paso 6:** Pedir permisos de admin en Cloudflare para futuros deploys

## Estado Actual

- ✅ Código actualizado en GitHub (commit 43fab69b)
- ⚠️ Falta deploy en servidor de producción
- ⚠️ Development Mode te da 3 horas para deployar sin caché
- ❌ Sin permisos de admin en Cloudflare (contactar admin)
