# Instrucciones de Deploy para www.sanluisway.com

## Problema Actual
Los cambios aparecen en sanluisway.com pero no en www.sanluisway.com porque el código Docker necesita ser actualizado en el servidor de producción.

## Solución: Deploy Completo

### 1. Conectar al servidor vía SSH

```bash
ssh usuario@servidor-ip
# O si tienes un alias configurado:
ssh sanluisway-server
```

### 2. Navegar al directorio del proyecto

```bash
cd /ruta/al/proyecto/directory-SLP
# Ejemplo común:
# cd /var/www/directory-SLP
# cd /home/user/directory-SLP
```

### 3. Pull de los cambios desde GitHub

```bash
git pull origin main
```

### 4. Rebuild del contenedor Docker

```bash
docker-compose build --no-cache
```

El flag `--no-cache` asegura que se construya todo desde cero.

### 5. Restart del contenedor

```bash
docker-compose down
docker-compose up -d
```

### 6. Reload de nginx

**IMPORTANTE:** Después de actualizar el contenedor, debes recargar nginx para que aplique las redirecciones:

```bash
# Verificar configuración de nginx
sudo nginx -t

# Si la verificación es exitosa, recargar nginx
sudo systemctl reload nginx

# O si no usas systemd:
sudo nginx -s reload
```

### 7. Verificar que esté funcionando

```bash
# Ver logs del contenedor
docker-compose logs -f --tail=50

# Verificar que el contenedor está corriendo
docker-compose ps

# Test de las redirecciones
curl -I http://sanluisway.com
curl -I https://sanluisway.com
curl -I http://www.sanluisway.com
```

Las tres deberían retornar `301 Moved Permanently` o `200 OK` apuntando a https://www.sanluisway.com

## Comandos Resumidos (Copy-Paste)

```bash
# Deploy completo en una sola línea
cd /ruta/al/proyecto/directory-SLP && \
git pull origin main && \
docker-compose build --no-cache && \
docker-compose down && \
docker-compose up -d && \
sudo nginx -t && \
sudo systemctl reload nginx
```

## Limpiar Cachés

### 1. Caché de nginx (en el servidor)

```bash
# Si tienes configurado cache de nginx
sudo rm -rf /var/cache/nginx/*
sudo systemctl reload nginx
```

### 2. Caché del navegador (en tu computadora)

**Chrome/Edge:**
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

**O borrar todo:**
- Chrome: `Ctrl + Shift + Delete` → Seleccionar "Imágenes y archivos en caché"

### 3. Caché de CDN (si usas Cloudflare u otro)

Si usas Cloudflare:
1. Ir al dashboard de Cloudflare
2. Seleccionar el dominio sanluisway.com
3. Caching → Purge Everything

## Verificación de Redirecciones

### Desde tu computadora local:

```bash
# Test redirect HTTP → HTTPS www
curl -I http://sanluisway.com

# Test redirect HTTPS sin www → HTTPS www
curl -I https://sanluisway.com

# Test dominio principal
curl -I https://www.sanluisway.com
```

**Resultado esperado:**
- Primeras dos deberían mostrar `301 Moved Permanently` con `Location: https://www.sanluisway.com`
- La tercera debería mostrar `200 OK`

## SEO: Concentrar tráfico en www

Tu configuración actual ya hace esto correctamente con **redirects 301 permanentes**:

✅ **Ventajas:**
- Google reconoce www.sanluisway.com como la URL canónica
- Todo el "link juice" y ranking se consolida en un solo dominio
- Evita contenido duplicado (penalización SEO)
- Los usuarios siempre ven la misma URL

## Troubleshooting

### Si los cambios aún no aparecen:

1. **Verificar que nginx está usando el archivo correcto:**
   ```bash
   sudo nginx -T | grep "server_name"
   ```
   Debería mostrar: `server_name sanluisway.com www.sanluisway.com;`

2. **Verificar que el puerto 3007 está corriendo:**
   ```bash
   netstat -tlnp | grep 3007
   # O
   lsof -i :3007
   ```

3. **Verificar logs de Docker:**
   ```bash
   docker-compose logs -f
   ```

4. **Verificar logs de nginx:**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   sudo tail -f /var/log/nginx/access.log
   ```

### Si nginx no está instalado/configurado:

El sitio podría estar corriendo solo con Docker sin nginx. En ese caso:

```bash
# Verificar si nginx está instalado
which nginx

# Verificar si nginx está corriendo
sudo systemctl status nginx
```

Si nginx NO está corriendo, Docker está sirviendo directamente y necesitas configurar las redirecciones a nivel de Next.js o usar nginx.

## Next.js Redirects (alternativa si no usas nginx)

Si prefieres manejar las redirecciones desde Next.js en lugar de nginx, agrega esto a `next.config.js`:

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

## Resumen

1. ✅ Tu nginx.conf ya está bien configurado
2. ⚠️ Necesitas aplicar los cambios en el servidor
3. 🔄 Reload nginx después del deploy
4. 🧹 Limpiar cachés (navegador, nginx, CDN)
5. ✅ Verificar que las redirecciones funcionen con curl

**Dominio canónico elegido:** www.sanluisway.com ✅
