# Proyectos con vista previa al pasar el cursor

Esta guía explica cómo funciona y cómo mantener la lista de proyectos con vista previa animada del portfolio.

## Sobre el ejemplo que compartiste

La idea del ejemplo es buena: separar los datos de los proyectos, detectar cuál está activo y mover una imagen junto al cursor. En este repositorio ya aplicamos ese patrón con algunos ajustes:

- El proyecto usa React con archivos `.jsx`; el ejemplo `.tsx` requiere adaptar los tipos de TypeScript.
- El proyecto no usa Tailwind. Los estilos del efecto están en `src/css/layout.css`.
- `motion` ya está instalado y se importa desde `motion/react`; no es necesario instalar otra librería.
- Los IDs de proyecto son estables (`consola-programador`), en vez de usar el índice del arreglo como `key`.
- La imagen se mantiene dentro de la sección y cambia de lado si el cursor está cerca del borde derecho.
- La vista previa se abre también al enfocar una fila o el botón con el teclado. El movimiento se reduce cuando el usuario prefiere movimiento reducido.
- El botón `∞ Ver más proyectos` muestra su propia vista previa, pero al pulsarlo solo navega a `/:lang/projects/`. Esa ruta se mantiene vacía; no despliega una lista.

## Cómo se organiza

La implementación tiene tres partes:

1. **Datos** — `src/data/projects.js` contiene los IDs, enlaces, rutas de imagen y la propiedad `featured`.
2. **Contenido traducido** — `src/i18n/locales/es.json`, `en.json` y `pt.json` contienen título y descripción para cada ID.
3. **Interacción y presentación** — `src/components/projects/Projects.jsx` gestiona el hover, el enfoque por teclado, las coordenadas y el contenido de la vista previa. `src/css/layout.css` define el diseño.

La lista muestra los proyectos que tienen `featured: true`, en el mismo orden del arreglo. Actualmente son Consola del Programador y Mecánica Dental.

## Paso 1: agregar las imágenes

Guarda los archivos en `public/images/projects/`:

| Vista previa | Nombre del archivo |
| --- | --- |
| Consola del Programador | `consola-programador.jpg` |
| Mecánica Dental | `mecanica-dental.jpg` |
| Botón `∞ Ver más proyectos` | `more-projects.jpg` |

Las imágenes de `public/` se usan con una URL desde la raíz del sitio. Por ejemplo, el archivo `public/images/projects/mecanica-dental.jpg` se referencia como:

```text
/images/projects/mecanica-dental.jpg
```

Se recomienda una captura horizontal cercana a 3:2. El marco mide aproximadamente 272 × 182 píxeles y recorta la imagen para llenarlo. Si todavía no hay archivo, se muestra un marcador de texto; cuando agregues la captura, la vista previa la usará automáticamente.

## Paso 2: agregar o editar un proyecto

En `src/data/projects.js`, añade un objeto al arreglo:

```js
{
  id: 'mi-proyecto',
  link: 'https://ejemplo.com/',
  image: '/images/projects/mi-proyecto.jpg',
  featured: true
}
```

Usa un `id` único, sin espacios. `featured: true` hace que aparezca en la lista de Inicio. El orden de los objetos determina el orden visual de las filas.

Los enlaces de proyecto se abren en otra pestaña. La lista ya aplica `target="_blank"` y `rel="noopener noreferrer"`; no hace falta agregarlos a los datos.

## Paso 3: escribir el contenido en los idiomas

Usa el mismo ID en los tres archivos de idioma y agrega `title` y `description`:

```json
"mi-proyecto": {
  "title": "Nombre del proyecto",
  "description": "Descripción breve de lo que hace."
}
```

Agrega el bloque dentro de `projects.items` en:

- `src/i18n/locales/es.json`
- `src/i18n/locales/en.json`
- `src/i18n/locales/pt.json`

Las pruebas comparan la estructura de los idiomas y los IDs del catálogo; fallarán si falta una traducción.

## Paso 4: cambiar la vista previa del botón ∞

El botón se renderiza en `src/components/projects/Projects.jsx` y su imagen se configura ahí como `/images/projects/more-projects.jpg`. Para cambiarla, reemplaza ese archivo manteniendo el nombre o actualiza esa ruta y coloca la imagen nueva en `public/images/projects/`.

El texto visible y accesible del botón vive en `projects.viewMore` en los tres archivos de idioma. El destino se construye con el idioma activo y lleva a `/:lang/projects/`. La página vacía está en `src/pages/ProjectsPage.jsx`; no agregues el catálogo ahí a menos que quieras cambiar ese comportamiento.

## Cómo funciona el movimiento

- Al pasar el cursor sobre un proyecto o enfocar el enlace, `activeProjectId` identifica cuál imagen mostrar.
- `onMouseMove` obtiene las coordenadas del cursor y las convierte a coordenadas relativas a la sección.
- La posición se limita a los bordes de la sección. La imagen aparece al lado del cursor y cambia de lado cuando no cabe a la derecha.
- `useSpring` suaviza el seguimiento. `useVelocity` y `useTransform` convierten la velocidad horizontal en una inclinación pequeña.
- `AnimatePresence` y `motion.div` animan la aparición y salida de la vista previa.
- El contenedor flotante tiene `pointer-events: none`, por lo que no interfiere con el cursor ni con los enlaces.
- Si la imagen no carga, se muestra un marcador. Si el dispositivo prefiere movimiento reducido, se evita el movimiento de resorte e inclinación.

No es necesario copiar el componente TypeScript del ejemplo: `Projects.jsx` ya implementa esa lógica usando los datos y estilos propios del repositorio.

## Verificar los cambios

Desde la carpeta del proyecto ejecuta:

```bash
npm test
npm run build
```

Después abre `/:lang/`, pasa el cursor por cada fila y por el botón `∞`, y comprueba que las vistas previas aparezcan. Haz clic en `Ver más proyectos` y confirma que la ruta `/:lang/projects/` siga vacía.
