# Especificaciones del Proyecto: Bitácora de Entrenamiento (Evolución hasta Fase 3)

## Brief / Tema del proyecto
Bitácora de entrenamiento: Registro semanal de rutinas o ejercicios con check de completado.

## Expectativas Generales y Evolución
- **Fase 1:** Semanas + ejercicios + check en GitHub. Restricciones iniciales: Vanilla JavaScript; datos mock; estructura en Github como evidencia de proceso.
- **Fase 2:** Implementación de UI avanzada (Modo Oscuro, Menú Lateral responsivo) y funcionalidades interactivas (Temporizador de descanso, Resumen de Progreso Semanal, APIs del navegador como Text-to-Speech).
- **Fase 3 (Actual):** Refactorización arquitectónica. Transición de un monolito (`app.js`) a una arquitectura modular estricta dividida en 3 capas (Configuración, Dominio, y UI) utilizando ES Modules.

## Requerimientos Funcionales Actualizados
- **Estructura Semanal:** Organización de Lunes a Domingo, incluyendo bloques especiales (ej. Cardio). Cada ejercicio cuenta con detalles y soporte multimedia (URL de videos).
- **Control de Progreso:** Checkbox por ejercicio que actualiza visualmente la tarjeta, un contador dinámico diario y la barra de progreso global semanal que reacciona de forma autónoma.
- **Temporizador:** Contador de descanso asíncrono con alertas visuales y asistencia por voz, matemáticamente aislado de la interfaz.
- **Gestión de Datos:** Los datos (mock data de la rutina semanal) se alojan exclusivamente de manera estática en `src/config/data.js`, eliminando la mutabilidad global.
- **Flujo Unidireccional:** El archivo `app.js` funciona estrictamente como punto de entrada (*Entry Point*), delegando cálculos lógicos a `src/domain/` y la generación visual a `src/ui/`.

## Entregables
- Repositorio en la rama principal (`main`); commits ordenados evidenciando el proceso de refactorización por "oleadas".
- Documentación técnica segmentada y al día (`README.md`, `spec.md`, y reportes en la carpeta `docs/refactor/`).
- Código fuente preparado para la inicialización e integración con el empaquetador Vite.