# Footer de Xamuel

El footer se renderiza en todas las rutas desde `src/components/layout/SiteLayout.jsx`. Su componente está en `src/components/layout/Footer.jsx` y sus estilos en `src/css/layout.css`.

## Estructura

- Fondo a todo el ancho, con gradientes basados en los colores del tema.
- Identidad “Xamuel” y una marca de agua grande que cruza el ancho del footer.
- Cuatro columnas: Páginas, Redes, Legal y Recursos.
- Barra inferior con copyright y la tecnología utilizada.
- Enlaces legales, currículum y blog visibles pero inactivos hasta que existan sus páginas o recursos.

La columna “Recursos” se usa en lugar de “Registro/Cuenta”, ya que este portafolio no ofrece cuentas de usuario. Para activar un enlace placeholder, reemplaza su `href="#"` y el comportamiento `aria-disabled` por el destino real.

## Adaptación a pantallas

El contenido usa un ancho máximo para facilitar la lectura, mientras que el fondo del componente cubre toda la ventana. En pantallas menores a 760 px, las columnas se disponen en dos columnas; en móviles, la barra inferior se apila. Las reglas responsive del footer están consolidadas junto al resto de estilos en `layout.css`.

## Traducciones y datos

Las etiquetas del footer están en los objetos `footer` de `src/i18n/locales/es.json`, `src/i18n/locales/en.json` y `src/i18n/locales/pt.json`. Los enlaces sociales y el nombre completo se toman de `src/data/profile.js`.

## Validación

Ejecuta `npm test` y `npm run build`. Comprueba en desktop y móvil que el fondo llegue a ambos bordes, que la marca de agua no tape los enlaces y que los placeholders no naveguen.
