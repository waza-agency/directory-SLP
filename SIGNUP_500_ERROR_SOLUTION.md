# Solución al Error 500 en Signup - Diagnóstico Completo

## 🎯 PROBLEMA IDENTIFICADO

El error 500 en la página de signup es causado por **políticas RLS (Row Level Security) incorrectas** que bloquean la inserción de registros de usuario durante el proceso de registro.

### Diagnóstico Realizado

✅ **Conexión a Supabase**: Funciona correctamente
✅ **Autenticación**: El signup de auth funciona perfectamente
❌ **Inserción de usuario en tabla `users`**: Bloqueada por RLS
❌ **Inserción en tabla `business_profiles`**: Bloqueada por RLS

### Error Específico
```
new row violates row-level security policy for table "users"
Error code: 42501
```

## 🔧 SOLUCIONES IMPLEMENTADAS

### 1. Diagnóstico Creado
- ✅ Endpoint de diagnóstico: `/api/debug-signup`
- ✅ Script de pruebas: `scripts/test-signup-database.js`
- ✅ Logs detallados de errores implementados

### 2. Migración de Base de Datos
Archivo: `supabase/migrations/20250101000000_fix_signup_rls_policies.sql`

**Cambios implementados:**
- Elimina políticas RLS restrictivas que bloquean el signup
- Crea nuevas políticas que permiten la inserción durante el registro
- Implementa trigger automático para crear registros de usuario
- Otorga permisos necesarios a roles `anon` y `authenticated`

### 3. Código Simplificado
- ✅ Eliminada la creación manual de registros de usuario en `supabase-auth.tsx`
- ✅ Trigger de base de datos maneja automáticamente la creación de registros
- ✅ Mejorado el manejo de errores con logs detallados

## 📋 PASOS PARA APLICAR LA SOLUCIÓN

### Opción 1: CLI de Supabase (Recomendado)
```bash
# Si tienes la CLI de Supabase instalada
supabase db push

# O aplicar migración específica
supabase migration up
```

### Opción 2: Aplicación Manual
1. Conectar a tu proyecto Supabase en [supabase.com](https://supabase.com)
2. Ir a SQL Editor
3. Ejecutar el contenido de `supabase/migrations/20250101000000_fix_signup_rls_policies.sql`

### Opción 3: Script de Node.js
```bash
chmod +x scripts/apply-signup-fix-migration.js
node scripts/apply-signup-fix-migration.js
```

## 🧪 VERIFICACIÓN DE LA SOLUCIÓN

### 1. Ejecutar Diagnóstico
```bash
# Prueba la base de datos
node scripts/test-signup-database.js

# Prueba el endpoint de diagnóstico
curl http://localhost:3000/api/debug-signup
```

### 2. Prueba Manual
1. Ir a la página de signup
2. Crear una cuenta nueva
3. Verificar que no aparece error 500
4. Confirmar que el usuario se crea correctamente

### 3. Verificar Logs
- Los logs del servidor deben mostrar creación exitosa de usuarios
- No debe haber errores de RLS policy violations

## 📊 RESULTADOS ESPERADOS

**Antes del fix:**
- ❌ Error 500 al hacer signup
- ❌ Registros de usuario no se crean
- ❌ Violaciones de políticas RLS

**Después del fix:**
- ✅ Signup funciona sin errores
- ✅ Registros de usuario se crean automáticamente
- ✅ Políticas RLS permiten el flujo correcto

## 🔍 MONITOREO POST-IMPLEMENTACIÓN

### Métricas a Observar
1. **Tasa de éxito de signup**: Debe ser >95%
2. **Errores 500**: Deben desaparecer completamente
3. **Creación de registros de usuario**: Automática tras auth signup
4. **Tiempo de respuesta**: Debe mejorar sin operaciones manuales

### Logs a Verificar
```bash
# Logs de desarrollo
console.log('Auth signup successful, user record will be created automatically by trigger');

# Logs de base de datos (si están habilitados)
# Verificar creación automática de usuarios via trigger
```

## 🚨 ROLLBACK (Si es necesario)

Si la solución causa problemas, puedes hacer rollback:

1. **Restaurar políticas anteriores**:
```sql
-- Ejecutar en SQL Editor de Supabase
DROP POLICY IF EXISTS "Allow user creation during signup" ON public.users;
DROP POLICY IF EXISTS "Allow anonymous user creation for signup" ON public.users;

-- Restaurar política anterior
CREATE POLICY "System can create user profiles" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);
```

2. **Restaurar código anterior**: Usar git para volver a la versión previa

## 💡 MEJORAS FUTURAS

1. **Monitoreo automatizado** de signup success rate
2. **Alertas** en caso de errores de signup
3. **Dashboard** para métricas de registro de usuarios
4. **Tests automatizados** para verificar el flujo de signup

## 📞 SOPORTE

Si el problema persiste después de aplicar estas soluciones:

1. Verificar que la migración se aplicó correctamente
2. Revisar los logs del servidor en tiempo real
3. Ejecutar el diagnóstico completo
4. Verificar políticas RLS en Supabase Dashboard

---

**Fecha de creación**: $(date)
**Estado**: Solución implementada, pendiente aplicación en producción