# Descargas del CV en el portafolio

## Recomendación

Sí, es adecuado ofrecer el CV desde la página principal: es una acción útil para reclutadores y visitantes, y el hero es un lugar fácil de encontrar. Para mantener la tarjeta ordenada, conviene mostrar dos opciones claras junto a las estadísticas del hero:

- **CV compatible con ATS**: versión sencilla, de una columna, con texto seleccionable, secciones y encabezados convencionales. Evitar tablas, columnas, iconos como sustitutos de texto, gráficos y elementos decorativos que puedan dificultar la lectura automática.
- **CV visual**: versión diseñada para lectura humana, donde se puede usar una composición y elementos visuales más cuidados.

Ambos documentos deben contener la misma información profesional actualizada. Un formato simplificado puede facilitar la lectura de algunos sistemas ATS, pero no garantiza que un sistema específico lo procese correctamente.

## Proceso para incorporarlos

1. Preparar y revisar ambos CV en PDF; comprobar que el texto se puede seleccionar y copiar, que los enlaces funcionan y que el contenido está actualizado.
2. Guardarlos en `public/documents/` con nombres descriptivos y estables:
   - `cv-xamuel-romero-ats.pdf`
   - `cv-xamuel-romero-visual.pdf`
3. Añadir enlaces de descarga dentro de `div.hero-card` en `src/components/hero/Hero.jsx`. Al estar en `public/`, se referencian desde la raíz del sitio:
   - `/documents/cv-xamuel-romero-ats.pdf`
   - `/documents/cv-xamuel-romero-visual.pdf`
4. Usar enlaces HTML `<a>` con el atributo `download` en vez de botones sin destino. Esto permite descargar el PDF sin JavaScript y conserva el comportamiento accesible por teclado.
5. Añadir las etiquetas de los dos enlaces a los tres archivos de traducción (`es`, `en` y `pt`) para que la tarjeta mantenga el idioma de la página.
6. Ejecutar `npm test` y `npm run build`. Después, probar ambas descargas en la vista previa y en el despliegue, incluyendo la navegación por teclado.

## Estado actual

Los PDF todavía no están en `public/`, así que no se añadieron enlaces a la interfaz para evitar descargas rotas. Cuando estén listos, se pueden colocar en la ruta indicada e implementar las dos opciones en la tarjeta del hero siguiendo este proceso.
