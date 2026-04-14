# Twins Digital IA — Landing Page

Página web oficial de **Twins Digital IA**, agencia especializada en consultoría de Claude AI y automatización para empresas en LATAM.

## Variables de Entorno

| Variable | Requerida | Descripción |
| --- | --- | --- |
| `GEMINI_API_KEY` | Sí | API Key de Google Gemini (usado por el ChatWidget y RealEstateDemo). Obtener en [makersuite.google.com](https://makersuite.google.com/app/apikey) |
| `VITE_GEMINI_API_KEY` | Opcional | Alias de `GEMINI_API_KEY` para Vite. Si se define `GEMINI_API_KEY`, este campo se mapea automáticamente en `vite.config.ts`. |

> **Nota:** No se utiliza `WEBHOOK_URL` en este proyecto. El formulario de contacto fue reemplazado por el widget de booking directo de LeadConnector.

## Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
# Crear .env.local y agregar: GEMINI_API_KEY=tu_api_key

# 3. Iniciar servidor de desarrollo
npm run dev
```

## Build de Producción

```bash
npm run build   # Genera /dist
npm run start   # Sirve con Express (node server.js)
```

## Deploy en Render

El archivo `render.yaml` contiene la configuración completa. Ver [DEPLOY.md](DEPLOY.md) para el paso a paso.

**Variables a configurar en el dashboard de Render:**

- `GEMINI_API_KEY` → tu API Key de Google Gemini

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS (CDN)
- Lucide React (iconos)
- Google Gemini 2.5 Flash (ChatWidget + RealEstateDemo)
- Express (servidor de producción)
- LeadConnector (widget de booking)
