# Mi portafolio

Sitio personal construido con React, Vite y un servidor Express para proyectos y mensajes de contacto.

## Ejecutar el proyecto

Desde esta carpeta:

```bash
npm install
npm run dev:all
```

`npm run dev:all` inicia Vite y Express juntos. Si prefieres iniciarlos por separado, usa dos terminales:

```bash
npm run dev
npm run dev:server
```

Vite muestra la dirección del sitio (por defecto `http://localhost:5173`). El servidor API usa el puerto `3001`.

Otros comandos disponibles:

- `npm run build`: genera la versión de producción en `dist/`.
- `npm run preview`: sirve localmente el build para revisarlo.
- `npm start`: inicia Express para servir la API y, si existe, el build de `dist/`.

## Dónde hacer cambios

```text
src/
├── App.jsx                     # Orden y composición general de las secciones
├── main.jsx                    # Punto de entrada React y carga de estilos
├── components/
│   ├── layout/                 # Header y Footer compartidos
│   ├── hero/                   # Hero, Lanyard y ajuste responsive de la tarjeta
│   ├── projects/               # Catálogo visual, búsqueda y tarjetas de proyectos
│   └── contact/                # Sección y formulario de contacto
├── data/
│   ├── profile.js              # Nombre, descripción, habilidades y redes
│   ├── projects.js             # Proyectos locales de respaldo
│   └── contactSchema.js        # Reglas de validación del formulario
├── hooks/
│   └── useTheme.js             # Preferencia de tema claro/oscuro
└── css/
    ├── variables.css           # Colores, fuentes, radios y sombras
    ├── global.css              # Reglas base del documento
    ├── layout.css              # Distribución, capas y estilos responsive
    └── components.css          # Botones, formularios y elementos reutilizables
```

El servidor está en `server/index.js`. `vite.config.js` configura el servidor de desarrollo y el proxy `/api`.

## Personalizar el contenido

- Para cambiar el nombre, el texto del hero, las habilidades, estadísticas o enlaces sociales, edita `src/data/profile.js`.
- Para añadir o modificar una tarjeta, edita `src/data/projects.js`. Usa enlaces relativos para páginas locales y `external: true` para enlaces externos.
- Para ajustar el tamaño y posición responsive del Lanyard, cambia los cortes y valores de `src/components/hero/useLanyardLayout.js`.
- Para cambiar sus imágenes, colores, acabado o movimiento, revisa las props de `<Lanyard />` en `src/App.jsx`. Las imágenes configuradas deben estar en la carpeta pública `public/`.
- Para cambiar la apariencia global, empieza por los tokens de `src/css/variables.css`; para distribución, usa `src/css/layout.css`.
- El formulario usa el mismo esquema Zod en el frontend y en el backend. Si cambias sus campos, revisa `src/data/contactSchema.js` y el formulario en `src/components/contact/ContactForm.jsx`.

Los comentarios en los archivos explican decisiones específicas y los ajustes más habituales. La regla general es mantener juntos los componentes que forman una sección y extraer lógica compartida solo cuando sea útil.
