# Mi portafolio

Sitio personal construido con React, Vite y un servidor Express para proyectos. El contacto se envía directamente mediante EmailJS. La interfaz está disponible en español, inglés y portugués mediante URLs `/es/`, `/en/` y `/pt/`.

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

- `npm run build`: genera la versión de producción en `dist/` y ejecuta `postbuild`, que crea las shells de idioma.
- `npm test`: ejecuta pruebas de locales, esquema de contacto y servicio EmailJS simulado; no envía correos reales.
- `npm run preview`: sirve localmente el build para revisarlo.
- `npm start`: inicia Express para servir la API y, si existe, el build de `dist/`.

Para generar `canonical`, `hreflang`, `sitemap.xml` y `robots.txt`, define `SITE_URL` antes del build:

```bash
SITE_URL=https://midominio.com npm run build
```

## Dónde hacer cambios

```text
src/
├── App.jsx                     # Composición general de las secciones
├── main.jsx                    # Router, rutas de idioma y carga de estilos
├── i18n/
│   ├── index.js                # Configuración de i18next
│   ├── languages.js            # Idiomas y helpers de URL
│   ├── locales/                # es.json, en.json, pt.json
│   ├── locales.test.js         # Paridad de claves
│   └── index.test.js           # Configuración y proyectos
├── components/
│   ├── layout/                 # Header y Footer compartidos
│   ├── routing/                # LanguageRoute y ScrollToHash
│   ├── hero/                   # Hero, Lanyard y ajuste responsive de la tarjeta
│   ├── projects/               # Catálogo visual, búsqueda y tarjetas de proyectos
│   └── contact/                # Sección, formulario y estilos de contacto
│       └── contact.css         # Estilos locales del módulo
├── data/
│   ├── profile.js              # Datos neutrales: nombre, email, skills y redes
│   ├── projects.js             # Catálogo neutral de respaldo
│   ├── contactSubjects.js      # Códigos de materia del formulario
│   ├── contactSchema.js        # Reglas de validación del formulario
│   └── contactSchema.test.js   # Pruebas de validación
├── services/
│   ├── contactService.js       # Envío EmailJS
│   └── contactService.test.js  # Pruebas con EmailJS simulado
├── hooks/
│   └── useTheme.js             # Preferencia de tema claro/oscuro
└── css/
    ├── variables.css           # Colores, fuentes, radios y sombras
    ├── global.css              # Reglas base del documento
    ├── layout.css              # Distribución, capas y estilos responsive
    └── components.css          # Botones y elementos visuales reutilizables
scripts/
└── build-language-shells.mjs   # Shells HTML por idioma
docs/
└── i18n.md                     # Documentación de internacionalización
```

El servidor está en `server/index.js` y solo sirve el catálogo de proyectos y el build de producción. `vite.config.js` configura el servidor de desarrollo y el proxy `/api`. El contacto tiene un único flujo oficial: EmailJS desde el navegador; no se guardan mensajes en archivos locales.

## Idiomas

- Rutas: `/es/`, `/en/` y `/pt/`; `/` redirige a `/es/`.
- El idioma se toma de la URL; no hay selector visual.
- Los textos están en `src/i18n/locales/`. Si añades una clave, agrégala a los tres archivos.
- Los datos de `src/data/` son neutrales; no incluyas copy traducido ahí.
- Los enlaces internos deben ser absolutos (`/en/#contacto`) para no depender de la ruta actual.
- `npm run build` genera las shells `dist/es`, `dist/en` y `dist/pt`. Define `SITE_URL` para canonical, `hreflang`, sitemap y robots.
- La estrategia completa está en `docs/i18n.md`.

## Constantes y dónde van

Los códigos son constantes estables: no se traducen y se usan como claves en los locales. Cambiar uno obliga a actualizar todos sus consumidores.

| Constante | Vive en | Consumidores |
|---|---|---|
| `DEFAULT_LANGUAGE` (`es`) | `src/i18n/languages.js` | fallback de i18next y redirección de `/` |
| `LANGUAGES` / `LANGUAGE_CODES` | `src/i18n/languages.js` | `src/i18n/index.js`, `LanguageRoute`, enlaces con prefijo, tests y `scripts/build-language-shells.mjs` |
| `CONTACT_SUBJECTS` | `src/data/contactSubjects.js` | `contactSchema` (enum), `ContactForm` (select) y `contactService` (`subjectCode`) |
| `project.id` | `src/data/projects.js` | `projects.items.<id>` en los tres locales, `key` de React y API neutral |
| `stat.id` | `src/data/profile.js` | `hero.stats.<id>` en los tres locales |
| `ContactServiceError.code` | `src/services/contactService.js` | `contact.errors.<code>` en los tres locales |

Reglas:

- Un código nuevo se añade primero en su archivo de constantes y después en `es.json`, `en.json` y `pt.json`; los tests de locales fallan si falta una clave.
- Los textos visibles nunca viven en `src/data/` ni en `server/`; solo en `src/i18n/locales/`.
- Los IDs de ancla (`inicio`, `proyectos`, `contacto`, `contenido`) tampoco se traducen.
- `scripts/build-language-shells.mjs` importa `LANGUAGE_CODES`; no dupliques la lista de idiomas.
- Los tokens CSS (`--color-*`, `--radius`, `--shadow`, etc.) viven solo en `src/css/variables.css` y se consumen con `var(--token)`; no escribas colores sueltos en los componentes.

## Personalizar el contenido

- `src/data/` guarda datos neutrales y reglas reutilizables: `profile.js` contiene identidad y valores, `projects.js` el catálogo y `contactSchema.js` la validación. Los textos traducibles viven en `src/i18n/locales/`.
- Para cambiar el nombre, las habilidades, estadísticas o enlaces sociales, edita `src/data/profile.js`. Para cambiar role, descripción o labels de stats, edita los tres locales.
- Para añadir o modificar una tarjeta, edita `src/data/projects.js` y añade su copia en los tres locales. Usa enlaces absolutos para páginas locales (`/asignacion-01/index.html`) y `external: true` para enlaces externos.
- Para ajustar el tamaño y posición responsive del Lanyard, cambia los cortes y valores de `src/components/hero/useLanyardLayout.js`.
- Para cambiar sus imágenes, colores, acabado o movimiento, revisa las props de `<Lanyard />` en `src/components/hero/HeroExperience.jsx`. Las imágenes configuradas deben estar en la carpeta pública `public/`.
- Para cambiar la apariencia global, empieza por los tokens de `src/css/variables.css`; para distribución general, usa `src/css/layout.css`. Los estilos del contacto están en `src/components/contact/contact.css`.
- Si cambias los campos del formulario, actualiza `src/data/contactSchema.js`, `src/components/contact/ContactForm.jsx` y los parámetros esperados por las plantillas EmailJS.
- El formulario envía `name`, `email`, `subjectCode`, `subjectLabel`, `subjectLabelEs`, `language`, `message` y `to_email` a dos plantillas EmailJS. La notificación del administrador usa `{{subject}}` en español; la autorespuesta usa `{{subject}}` en el idioma del visitante. Configura `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ADMIN_ID`, `VITE_EMAILJS_TEMPLATE_USER_ID` y `VITE_EMAILJS_PUBLIC_KEY` en `.env` (consulta `.env.example`). La plantilla de autorespuesta debe enviar a `{{to_email}}`.
- La dirección pública de contacto está centralizada en `src/data/profile.js` (`contactEmail`); actualízala ahí para cambiar el enlace `mailto:` y la acción de copiar.
- Las pruebas del servicio de contacto reemplazan EmailJS por un mock para comprobar los errores sin enviar correos reales.

Los comentarios en los archivos explican decisiones específicas y los ajustes más habituales. La regla general es mantener juntos los componentes que forman una sección y extraer lógica compartida solo cuando sea útil.
