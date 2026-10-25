# Mi portafolio

Sitio personal construido con React, Vite y un servidor Express para proyectos. El contacto se envía directamente mediante EmailJS.

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
- `npm test`: ejecuta pruebas del esquema de contacto y del servicio EmailJS simulado; no envía correos reales.
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
│   └── contact/                # Sección, formulario y estilos de contacto
│       └── contact.css         # Estilos locales del módulo
├── data/
│   ├── profile.js              # Nombre, descripción, habilidades y redes
│   ├── projects.js             # Proyectos locales de respaldo
│   ├── contactSchema.js        # Reglas de validación del formulario
│   └── contactSchema.test.js   # Pruebas de validación
├── services/
│   ├── contactService.js       # Envío EmailJS y traducción de errores
│   └── contactService.test.js  # Pruebas con EmailJS simulado
├── hooks/
│   └── useTheme.js             # Preferencia de tema claro/oscuro
└── css/
    ├── variables.css           # Colores, fuentes, radios y sombras
    ├── global.css              # Reglas base del documento
    ├── layout.css              # Distribución, capas y estilos responsive
    └── components.css          # Botones y elementos visuales reutilizables
```

El servidor está en `server/index.js` y solo sirve el catálogo de proyectos y el build de producción. `vite.config.js` configura el servidor de desarrollo y el proxy `/api`. El contacto tiene un único flujo oficial: EmailJS desde el navegador; no se guardan mensajes en archivos locales.

## Personalizar el contenido

- `src/data/` guarda datos y reglas reutilizables del portafolio, no componentes ni efectos: `profile.js` contiene contenido editable y `contactSchema.js` define qué datos de contacto son válidos. Separarlos permite reutilizar esos valores y reglas sin mezclarlos con la interfaz o el servicio de correo.
- Para cambiar el nombre, el texto del hero, las habilidades, estadísticas o enlaces sociales, edita `src/data/profile.js`.
- Para añadir o modificar una tarjeta, edita `src/data/projects.js`. Usa enlaces relativos para páginas locales y `external: true` para enlaces externos.
- Para ajustar el tamaño y posición responsive del Lanyard, cambia los cortes y valores de `src/components/hero/useLanyardLayout.js`.
- Para cambiar sus imágenes, colores, acabado o movimiento, revisa las props de `<Lanyard />` en `src/App.jsx`. Las imágenes configuradas deben estar en la carpeta pública `public/`.
- Para cambiar la apariencia global, empieza por los tokens de `src/css/variables.css`; para distribución general, usa `src/css/layout.css`. Los estilos del contacto están en `src/components/contact/contact.css`.
- Si cambias los campos del formulario, actualiza `src/data/contactSchema.js`, `src/components/contact/ContactForm.jsx` y los parámetros esperados por las plantillas EmailJS.
- El formulario de contacto envía los campos `name`, `email`, `subject` y `message` a dos plantillas EmailJS: una notificación para el administrador y una autorespuesta para quien escribió. Configura `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ADMIN_ID`, `VITE_EMAILJS_TEMPLATE_USER_ID` y `VITE_EMAILJS_PUBLIC_KEY` en `.env` (consulta `.env.example`). En ambas plantillas puedes usar `{{name}}`, `{{email}}`, `{{subject}}` y `{{message}}`; configura la plantilla de autorespuesta para enviar a `{{to_email}}`.
- La dirección pública de contacto está centralizada en `src/data/profile.js` (`contactEmail`); actualízala ahí para cambiar el enlace `mailto:` y la acción de copiar.
- Las pruebas del servicio de contacto reemplazan EmailJS por un mock para comprobar los errores sin enviar correos reales.

Los comentarios en los archivos explican decisiones específicas y los ajustes más habituales. La regla general es mantener juntos los componentes que forman una sección y extraer lógica compartida solo cuando sea útil.
