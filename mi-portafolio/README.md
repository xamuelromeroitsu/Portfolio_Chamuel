# Mi Portafolio

Portafolio web construido con HTML, CSS y JavaScript modular.

## Estructura

- `.github/` - Automatizaciones y workflows.
- `node_modules/` - Dependencias instaladas (opcional).
- `src/` - Código fuente del proyecto.
  - `assets/` - Recursos estáticos.
  - `css/` - Estilos organizados.
  - `js/` - Lógica e interactividad.

## Uso

1. Abrir `src/index.html` en el navegador.
2. Personalizar contenido, estilos y módulos.



# 🚀 Plan de Construcción Paso a Paso - Mi Portafolio

Este documento es una guía interactiva para desarrollar y personalizar el portafolio de forma organizada por bloques, respetando la arquitectura modular del proyecto.

---

## 🛠️ Bloque 1: Identidad y Variables Globales (La Base)
Antes de maquetar componentes, definiremos los recursos estáticos y los cimientos del diseño visual.

- [ ] **Organizar Assets (`src/assets/`):**
  - [ ] Colocar logos o isotipos de marca personal en `brand/`.
  - [ ] Guardar el currículum actualizado en formato PDF dentro de `docs/`.
  - [ ] Añadir los íconos de tecnología, texturas o fondos necesarios en `ui/`.
- [ ] **Configurar Paleta de Colores (`src/css/variables.css`):**
  - [ ] Definir los colores base para el tema oscuro (fondo oscuro, acentos de color, tipografía).
  - [ ] Configurar las tipografías globales y los tamaños de fuente.

---

## 📐 Bloque 2: Estructura General y Estilos Base
Maquetaremos el esqueleto y la disposición espacial del sitio sin entrar en detalles de diseño fino.

- [ ] **Configurar Estilos Base (`src/css/global.css`):**
  - [ ] Aplicar el reseteo de estilos CSS.
  - [ ] Configurar las transiciones globales (como el comportamiento del cambio de tema en el `body`).
- [ ] **Maquetar la Estructura Principal (`src/css/layout.css`):**
  - [ ] Diseñar el Header (Menú de navegación y botón de cambio de tema).
  - [ ] Definir las grillas o contenedores para el Main (Secciones del portafolio).
  - [ ] Diseñar el Footer (Enlaces a redes sociales y créditos).
- [ ] **Estructura HTML (`index.html`):**
  - [ ] Asegurar que el archivo esté en la raíz principal y llamar correctamente las hojas de estilo mediante `src/css/...`.

---

## 🎨 Bloque 3: Componentes e Interactividad Core
Diseñaremos las piezas visuales repetibles y daremos vida a la primera gran funcionalidad interactiva.

- [ ] **Estilizar Elementos Reutilizables (`src/css/components.css`):**
  - [ ] Diseñar los botones interactivos (incluyendo los estados hover y active).
  - [ ] Crear el diseño de las tarjetas (cards) para los proyectos.
- [ ] **Activar el Modo Oscuro (`src/js/modules/theme.js`):**
  - [ ] Programar la lógica que añade o remueve las clases del tema en el documento.
  - [ ] Configurar `LocalStorage` para que el navegador recuerde la preferencia del usuario al recargar.
- [ ] **Enlazar la Lógica Principal (`src/js/main.js`):**
  - [ ] Asegurar la importación correcta de `theme.js` y que el script esté vinculado en el HTML como `type="module"`.

---

## 📂 Bloque 4: Galería de Proyectos y Filtros
Añadiremos dinamismo a la sección donde muestras tus habilidades y trabajos reales.

- [ ] **Cargar Recursos Visuales (`src/assets/projects/`):**
  - [ ] Subir capturas de pantalla o previews optimizadas de cada proyecto.
- [ ] **Maquetar la Sección de Proyectos (`index.html`):**
  - [ ] Crear la barra o controles de filtrado.
  - [ ] Añadir las tarjetas de proyectos con sus respectivas etiquetas de tecnologías.
- [ ] **Programar el Filtro Dinámico (`src/js/modules/projectFilter.js`):**
  - [ ] Crear la lógica en JS para ocultar o mostrar las tarjetas según la categoría seleccionada por el usuario.
  - [ ] Importar y ejecutar la función dentro de `src/js/main.js`.

---

## ✉️ Bloque 5: Formulario de Contacto y Validación
El bloque final para permitir que los reclutadores o clientes se comuniquen contigo directamente.

- [ ] **Diseñar el Formulario (`src/css/components.css`):**
  - [ ] Dar estilos a los campos de texto (`input`, `textarea`) y sus etiquetas.
  - [ ] Definir visualmente los estados de error (bordes rojos, mensajes de advertencia).
- [ ] **Validación de Datos (`src/js/modules/formValidation.js`):**
  - [ ] Programar la lógica en JS que verifique que el correo sea válido y los campos no estén vacíos antes de enviar.
  - [ ] Vincular el módulo en `src/js/main.js`.

---

## 🚀 Bloque 6: Despliegue y Control de Cambios
Subir la versión final y optimizada a producción.

- [ ] **Prueba Local:** Verificar el portafolio en el navegador para asegurar que no existan errores en la consola.
- [ ] **Sincronizar Repositorio:** Ejecutar `git add .`, `git commit -m "Bloque X completado"` y `git push origin main`.
- [ ] **Monitorear GitHub Pages:** Confirmar en la pestaña *Actions* de GitHub que el despliegue automático termine de manera exitosa.