# Jenkins Email Credentials Setup

## 🚨 **PROBLEMA IDENTIFICADO**

Los emails del formulario de contacto **NO funcionan en producción** porque las credenciales de email no están configuradas en Jenkins.

- ✅ **En desarrollo**: Funciona (variables en `.env`)
- ❌ **En producción**: NO funciona (falta configuración en Jenkins)

## 🛠️ **SOLUCIÓN: Configurar Credenciales en Jenkins**

### **Paso 1: Acceder a Jenkins Dashboard**
1. Ve a tu Jenkins Dashboard
2. Click en **"Manage Jenkins"**
3. Click en **"Manage Credentials"**

### **Paso 2: Agregar las Credenciales de Email**

Necesitas agregar estas 3 credenciales:

#### **1. RESEND_API_KEY** (Recomendado)
- **ID**: `RESEND_API_KEY`
- **Description**: `Resend API Key for email sending`
- **Kind**: `Secret text`
- **Secret**: `re_GZqYCpA6_7pQsuo7fsgnvmiqy2SyN5vDv`

#### **2. GMAIL_USER** (Fallback)
- **ID**: `GMAIL_USER`
- **Description**: `Gmail user for email fallback`
- **Kind**: `Secret text`
- **Secret**: `santiago@waza.baby`

#### **3. GMAIL_APP_PASSWORD** (Fallback)
- **ID**: `GMAIL_APP_PASSWORD`
- **Description**: `Gmail app password for email fallback`
- **Kind**: `Secret text`
- **Secret**: `[TU_GMAIL_APP_PASSWORD]` (necesitas generarla)

### **Paso 3: Generar Gmail App Password (Si es necesario)**

1. Ve a https://myaccount.google.com/apppasswords
2. Genera una contraseña de aplicación para "Mail"
3. Copia la contraseña de 16 caracteres
4. Úsala como `GMAIL_APP_PASSWORD`

### **Paso 4: Verificar la Configuración**

Después de agregar las credenciales:

1. **Commit y push** los cambios al repositorio
2. **Ejecuta el pipeline** de Jenkins
3. **Verifica los logs** para confirmar que las variables están disponibles

### **Paso 5: Probar los Emails**

1. Ve a https://sanluisway.com/contact
2. Llena el formulario de contacto
3. Verifica que el email llegue a `info@sanluisway.com`

## ✅ **Estados Esperados**

### **Con RESEND_API_KEY configurado:**
- ✅ Emails enviados via Resend
- ✅ Mejor deliverability
- ✅ Emails llegan a `info@sanluisway.com`

### **Sin RESEND_API_KEY (fallback a Gmail):**
- ⚠️ Emails enviados via Gmail SMTP
- ⚠️ Posible filtrado como spam
- ✅ Emails llegan pero desde Gmail

### **Sin ninguna configuración:**
- ❌ Emails NO se envían
- ❌ Solo se guardan en la base de datos

## 🔍 **Verificación de Logs**

Los logs de producción mostrarán:

```
Environment check: {
  NODE_ENV: 'production',
  RESEND_API_KEY: 'SET',
  GMAIL_USER: 'SET',
  GMAIL_APP_PASSWORD: 'SET'
}
```

## 📋 **Checklist de Configuración**

- [ ] `RESEND_API_KEY` agregado en Jenkins
- [ ] `GMAIL_USER` agregado en Jenkins
- [ ] `GMAIL_APP_PASSWORD` agregado en Jenkins
- [ ] Pipeline ejecutado exitosamente
- [ ] Formulario de contacto probado
- [ ] Emails llegando a `info@sanluisway.com`

## 🎯 **Próximos Pasos (Opcional)**

Para mejorar la deliverability:

1. **Verificar dominio en Resend** (como explicamos antes)
2. **Usar `info@sanluisway.com`** como remitente
3. **Configurar SPF/DKIM** en Cloudflare

¡Una vez configuradas estas credenciales, los emails del formulario de contacto funcionarán perfectamente en producción!