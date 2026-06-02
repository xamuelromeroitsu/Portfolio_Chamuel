# Lista de Tareas Generada por IA (Fase de Planificación)

## Capa 1: Estructura y Contenido Estático (index.html)
- [x] [HTML-1] Estructura base del documento.
- [x] [HTML-2] Plantilla estática de un Día.
- [x] [HTML-3] Plantilla estática de un Ejercicio.
- [x] [HTML-4] Panel de Resumen Semanal y barra de progreso.
- [x] [HTML-5] Panel de Controles globales (Botones y Timer).
- [x] [HTML-6] Barra de navegación superior, Switch de Modo Oscuro y esqueleto de Menú Lateral.

## Capa 2: Layout, Responsive y Estados Visuales (styles.css)
- [x] [CSS-1] Reset y variables de diseño base.
- [x] [CSS-2] Layout de la bitácora responsiva mediante CSS Grid.
- [x] [CSS-3] Estado visual de ejercicios completados.
- [x] [CSS-4] Estilos de la Barra de Progreso y animaciones de Logro Semanal.
- [x] [CSS-5] Estilos adaptativos para botones y componentes del temporizador.
- [x] [CSS-6] Implementación tipográfica de marca y variables dinámicas para Modo Oscuro.
- [x] [CSS-7] Maquetación del Menú Lateral deslizante y capa de superposición (Overlay).

## Capa 3: Modelo Mock, Render y Eventos (app.js)
- [x] [JS-1] Creación del modelo de datos inicial (Fase 1).
- [x] [JS-2] Función de Renderizado dinámico del DOM.
- [x] [JS-3] Delegación de eventos para optimización de Checkboxes.
- [x] [JS-4] Actualización de estado y contadores de progreso diarios.
- [x] [JS-5] Inyección de 20 recursos multimedia individuales y expansión de ejercicios semanales.
- [x] [JS-6] Lógica de control para la Barra de Progreso Semanal y validación de Meta Global.
- [x] [JS-7] Evento de reinicio masivo con confirmación de seguridad nativa.
- [x] [JS-8] Construcción del Temporizador asíncrono con control de deshabilitación y Text-to-Speech.
- [x] [JS-9] Programación de eventos para la apertura/cierre del Menú Lateral e interruptor de Modo Oscuro.

## Capa 4: Control de Versiones y Entrega
- [x] [GIT-1] Configuración inicial del repositorio, ramas de trabajo colaborativo y despliegue continuo en GitHub Pages.
- [x] [DOCS-1] Elaboración de especificaciones técnicas y guía de mantenimiento del software.

---

# Fase 3: Refactorización (De Monolito a Modular)

## Oleada 1: Extracción de Datos (Completada)
- [x] [REF-1] Crear la estructura de carpetas inicial (`src/config/`).
- [x] [REF-2] Crear el archivo `data.js` para aislar la información.
- [x] [REF-3] Extraer los datos estáticos (mock data) del archivo monolítico `app.js`.
- [x] [REF-4] Implementar ES Modules exportando la data desde `data.js`.
- [x] [REF-5] Importar la data exitosamente dentro de `app.js`.
- [x] [REF-6] Validar que la interfaz renderice correctamente los datos.

## Oleada 2: Modularización del Temporizador de Descanso (Completada)
- [x] [REF-7] Crear el módulo de dominio `src/domain/timer.js`.
- [x] [REF-8] Aislar la lógica matemática del contador (`setInterval` y decremento).
- [x] [REF-9] Eliminar la variable global mutable `timerInterval` de `app.js`.
- [x] [REF-10] Configurar eventos basados en *callbacks* (`onTick`, `onComplete`) para el control de la UI.

## Oleada 3: Centralización del Estado (Completada)
- [x] [REF-11] Crear el módulo de dominio `src/domain/progress.js`.
- [x] [REF-12] Encapsular las funciones de mutación de datos (`toggleExerciseCompletion`, `resetAllProgress`).
- [x] [REF-13] Eliminar iteraciones y alteraciones directas de arrays dentro de los listeners de `app.js`.
- [x] [REF-14] Delegar el control del estado a `progress.js` manteniendo un flujo de datos unidireccional.

## Oleada 4: Modularización de UI y Componentes de Renderizado (Completada)
- [x] [REF-15] Crear el archivo `src/ui/components.js` para la capa de presentación visual.
- [x] [REF-16] Migrar la generación de plantillas HTML a funciones puras (`createExerciseListHTML`, `createDayCardHTML`) usando Template Literals declarativos.
- [x] [REF-17] Reducir la función `renderApp()` en `app.js` a una asignación directa de `innerHTML`.

## Oleada 5: Separación de Lógica de Progreso (Completada)
- [x] [REF-18] Isolar el cálculo matemático del progreso global en la función `calculateWeeklyProgress` dentro de `src/domain/progress.js`.
- [x] [REF-19] Implementar `updateWeeklySummaryUI` en `src/ui/components.js` para desacoplar el DOM de la barra de progreso.

## Oleada 6: Modularización de Layout y Navegación (Completada)
- [x] [REF-20] Crear el módulo `src/ui/layout.js` para la gestión de la interfaz global secundaria.
- [x] [REF-21] Encapsular la lógica operativa del Modo Oscuro, Menú Lateral y Overlay dentro de la función `initLayout()`.

## Oleada 7: Centralización de Eventos y Consolidación del Entry Point (Completada)
- [x] [REF-22] Crear `src/ui/events.js` para centralizar la captura y delegación de eventos del DOM.
- [x] [REF-23] Diseñar el patrón de suscripción mediante un parámetro `callback` (`onStateChange`) para notificar cambios de estado.
- [x] [REF-24] Purgar todos los escuchadores procedurales remanentes del orquestador principal.
- [x] [REF-25] Consolidar `app.js` estrictamente como el Punto de Entrada (Entry Point) del software.

---

# Fase 4: Inicialización y Configuración del Entorno con Vite (Pendiente)

## Configuración del Tooling
- [ ] [VITE-1] Inicializar el proyecto con npm y generar el archivo `package.json`.
- [ ] [VITE-2] Instalar Vite como dependencia de desarrollo e implementar scripts de ejecución (`dev`, `build`, `preview`).
- [ ] [VITE-3] Reestructurar los recursos del proyecto adaptando las rutas relativas al estándar de empaquetado de Vite.
- [ ] [VITE-4] Validar el entorno local mediante el servidor de desarrollo HMR (Hot Module Replacement)