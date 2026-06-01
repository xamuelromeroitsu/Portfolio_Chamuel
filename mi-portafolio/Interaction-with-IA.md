# Interacción con IA

Resumen sencillo de lo pedido a la IA para crear el portafolio.

## Paso a paso

1. Crear la estructura del proyecto:
   - `.github/`
   - `node_modules/`
   - `src/assets/brand/`
   - `src/assets/docs/`
   - `src/assets/images/projects/`
   - `src/assets/images/ui/`
   - `src/css/` con `variables.css`, `global.css`, `layout.css`, `components.css`
   - `src/js/` con `modules/theme.js`, `modules/projectFilter.js`, `modules/formValidation.js`, `main.js`
   - `src/index.html`
   - `.gitignore`, `README.md`, `package.json`

2. Ajustar rutas para que usen `mi-portafolio/src/...` en los enlaces de CSS y JS.

3. Mejorar la sección inicial (`hero`):
   - título profesional
   - texto claro de lo que hace el desarrollador
   - botón principal de "Ver proyectos"
   - lista de habilidades destacadas
   - tarjeta de resultados/proyectos entregados

4. Ajustar botones y enlaces:
   - eliminar el subrayado del botón principal
   - quitar el botón secundario de contacto en el hero
   - hacer que el enlace de contacto apunte al `h2` de la sección Contacto

5. Añadir un footer completo:
   - columnas para branding, navegación interna y redes profesionales
   - enlaces a GitHub, LinkedIn e Instagram
   - accesos rápidos dentro de la página

## Estructura final recomendada

- `mi-portafolio/`
  - `.github/`
  - `node_modules/`
  - `src/`
    - `assets/brand/`
    - `assets/docs/`
    - `assets/images/projects/`
    - `assets/images/ui/`
    - `css/`
    - `js/`
    - `index.html`
  - `.gitignore`
  - `README.md`
  - `package.json`

## Notas

- Mantener el archivo simple y directo.
- Usar solo un CTA principal en la página.
- Asegurar que los enlaces internos funcionen con `id` en las secciones.
