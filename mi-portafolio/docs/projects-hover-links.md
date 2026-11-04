# Proyectos con vista previa al pasar el cursor

La sección `#proyectos` presenta Consola del Programador y Mecánica Dental en una lista vertical. Al pasar el cursor por cada fila, una vista previa sigue el movimiento con un resorte y una inclinación leve. El botón `Ver más proyectos` con el símbolo `∞` también tiene vista previa y dirige a `/:lang/projects/`, que se mantiene vacía por ahora. No despliega el catálogo.

La interacción usa `motion/react`, ya incluido en las dependencias del proyecto. Respeta la preferencia del sistema para reducir el movimiento y muestra un texto de respaldo si todavía no existe la imagen.

## Cómo se organiza el catálogo

`src/data/projects.js` es la única fuente de los proyectos que aparecen en la lista. Cada objeto contiene el ID, el enlace, la ruta de captura y `featured`:

- `featured: true`: aparece en la portada.

El orden del arreglo es el orden en que se muestran los proyectos. Este catálogo es estático y se guarda con el código en Git, no en una base de datos. El botón `∞` tiene una imagen de vista previa propia en `public/images/projects/more-projects.jpg`; el clic solo navega a la página vacía.

## Carpeta de imágenes

Guarda las capturas en `public/images/projects/` con estos nombres:

| Proyecto | Archivo |
| --- | --- |
| Consola del Programador | `consola-programador.jpg` |
| Página de Mecánica Dental | `mecanica-dental.jpg` |
| Vista previa del botón ∞ | `more-projects.jpg` |

Las imágenes públicas se referencian desde la raíz del sitio, por eso las rutas correspondientes empiezan con `/images/projects/`. Se recomienda usar capturas horizontales con proporción cercana a 3:2; el componente recorta la imagen para llenar el marco.

## Agregar o cambiar un proyecto

1. Añade el objeto al arreglo de `src/data/projects.js` con un `id` único, el enlace `link`, la ruta pública `image` y `featured: true`.
2. Agrega textos con la misma clave (`projects.items.<id>`) en `src/i18n/locales/es.json`, `en.json` y `pt.json`. Cada objeto necesita `title` y `description`.
3. Guarda la captura en `public/images/projects/` y asegúrate de que el nombre y la extensión coincidan con `image`.
4. Ejecuta `npm test` para verificar que las traducciones estén completas y `npm run build` para validar la versión de producción.

Ejemplo de entrada:

```js
{
  id: 'mi-proyecto',
  link: 'https://ejemplo.com/',
  image: '/images/projects/mi-proyecto.jpg',
  featured: true
}
```

Los enlaces se abren en una pestaña nueva. Mantén `rel="noopener noreferrer"` si modificas el componente.
