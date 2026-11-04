# Descargas del CV en el portafolio

## CV ATS

El hero incluye un botón para descargar el CV ATS en el idioma activo. Los PDF se guardan en `public/documents/`:

- `Curriculum ATS ES- Xamuel Romero.pdf`
- `Curriculum ATS EN- Xamuel Romero.pdf`
- `Curriculum ATS PT - Xamuel Romero.pdf`

El enlace usa una ruta distinta para español, inglés y portugués, con el atributo `download` para descargar el PDF directamente. Mantén sincronizados los nombres de los archivos con el mapa de documentos en `src/components/hero/Hero.jsx`.

Un formato simplificado puede facilitar la lectura de algunos sistemas ATS, pero no garantiza que un sistema específico lo procese correctamente.

Al actualizar un idioma, comprueba que el PDF se puede abrir y que su texto se puede seleccionar y copiar.
