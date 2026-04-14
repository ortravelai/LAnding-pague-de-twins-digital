# Guía de Despliegue en Render

## 📋 Archivos Necesarios Creados

Se han creado los siguientes archivos para el despliegue:

1. **render.yaml** - Configuración de Render
2. **server.js** - Servidor Express para servir la aplicación
3. **package.json** - Actualizado con scripts y dependencias necesarias

## 🚀 Paso a Paso para Desplegar en Render

### 1. Preparar el Repositorio Git

Primero, inicializa un repositorio Git y súbelo a GitHub:

```bash
# Inicializar repositorio
git init

# Agregar archivos
git add .

# Hacer commit
git commit -m "Initial commit - Twins Digital IA"

# Crear repositorio en GitHub y conectarlo
git remote add origin https://github.com/TU-USUARIO/twins-digital-ia.git
git branch -M main
git push -u origin main
```

### 2. Crear Cuenta en Render

1. Ve a [https://render.com](https://render.com)
2. Regístrate con tu cuenta de GitHub (recomendado)
3. Autoriza a Render para acceder a tus repositorios

### 3. Crear Nuevo Web Service

1. Haz clic en **"New +"** → **"Web Service"**
2. Conecta tu repositorio de GitHub
3. Selecciona el repositorio **twins-digital-ia**

### 4. Configurar el Web Service

Render debería detectar automáticamente la configuración de `render.yaml`, pero verifica estos datos:

**Configuración básica:**
- **Name:** twins-digital-ia (o el nombre que prefieras)
- **Runtime:** Node
- **Branch:** main
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start`

**Plan:**
- Selecciona **Free** (gratis, perfecto para empezar)

### 5. Configurar Variables de Entorno

⚠️ **IMPORTANTE:** Debes configurar tu API Key de Gemini

1. En la página de configuración, ve a la sección **"Environment"**
2. Haz clic en **"Add Environment Variable"**
3. Agrega la siguiente variable:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** [Tu API Key de Google Gemini]

Para obtener tu API Key de Gemini:
- Ve a [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
- Crea una nueva API Key
- Cópiala y pégala en Render

### 6. Desplegar

1. Haz clic en **"Create Web Service"**
2. Render comenzará a construir y desplegar tu aplicación automáticamente
3. El proceso puede tardar entre 5-10 minutos la primera vez

### 7. Verificar el Despliegue

Una vez completado:
- Render te proporcionará una URL como: `https://twins-digital-ia.onrender.com`
- Haz clic en la URL para ver tu sitio en vivo
- Verifica que todo funcione correctamente

## 🔄 Actualizaciones Automáticas

Una vez configurado, cada vez que hagas push a tu repositorio en GitHub:

```bash
git add .
git commit -m "Descripción de cambios"
git push
```

Render **automáticamente** detectará los cambios y desplegará la nueva versión.

## ⚙️ Configuración Adicional (Opcional)

### Custom Domain (Dominio Personalizado)

1. Ve a **Settings** → **Custom Domains**
2. Haz clic en **"Add Custom Domain"**
3. Sigue las instrucciones para conectar tu dominio

### HTTPS

Render proporciona HTTPS automáticamente para todos los dominios (gratis).

### Logs y Monitoreo

- Ve a la pestaña **"Logs"** para ver los registros en tiempo real
- Ve a **"Metrics"** para ver el uso de recursos

## 🐛 Solución de Problemas

### El build falla
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs en la pestaña "Logs" de Render

### La aplicación no carga
- Verifica que `GEMINI_API_KEY` esté configurada correctamente
- Revisa los logs del servidor

### Error 404 en rutas
- El archivo `server.js` ya maneja esto. Si persiste, verifica que el build haya completado correctamente

## 📞 Soporte

- Documentación oficial de Render: [https://render.com/docs](https://render.com/docs)
- Dashboard de Render: [https://dashboard.render.com](https://dashboard.render.com)

## ✅ Checklist de Despliegue

- [ ] Repositorio Git creado y subido a GitHub
- [ ] Cuenta de Render creada
- [ ] Web Service creado en Render
- [ ] Variable `GEMINI_API_KEY` configurada
- [ ] Despliegue exitoso
- [ ] Sitio verificado y funcionando
- [ ] URL compartida con el equipo

¡Listo! Tu sitio Twins Digital IA está ahora en producción 🚀
