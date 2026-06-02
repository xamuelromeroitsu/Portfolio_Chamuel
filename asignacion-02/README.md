# 🏋️‍♂️ Bitácora de Entrenamiento - PRO

Aplicación web frontend interactiva para el registro, seguimiento y control de rutinas de acondicionamiento físico semanal. El proyecto ha culminado exitosamente su **Fase 3 (Refactorización)**, transformando un monolito funcional en una arquitectura modular desacoplada en capas mediante ES Modules nativos.

## 👥 Integrantes
* **Xamuel Romero**
* **Alexis González**

## 🚀 Arquitectura del Proyecto (Fase 3 Consolidada)
La aplicación se rige bajo una separación estricta de responsabilidades, distribuyendo el código en módulos especializados:

* **Punto de Entrada (`src/app.js`):** Funciona como un orquestador estricto (*Entry Point*). No contiene lógica procedural ni manipulación directa del DOM; su única función es inicializar los módulos secundarios y coordinar el flujo de renderizado.
* **Capa de Configuración (`src/config/`):** Contiene `data.js`, archivo que encapsula de forma aislada los datos estáticos (`WEEKLY_GOAL`) y el modelo base de la rutina (`weeklyRoutine`).
* **Capa de Dominio (`src/domain/`):** * `timer.js`: Gestiona de forma pura la matemática del temporizador y la cuenta regresiva mediante *callbacks*.
  * `progress.js`: Controla las mutaciones del estado de los ejercicios y calcula el progreso global de la semana de forma independiente a la interfaz.
* **Capa de Interfaz de Usuario (`src/ui/`):**
  * `components.js`: Presentación visual declarativa. Genera las estructuras HTML mediante *Template Literals* y actualiza la barra de progreso.
  * `layout.js`: Centraliza las utilidades globales de la interfaz, como el comportamiento del Menú Lateral (*Sidebar*), la capa *Overlay* y el interruptor de Modo Oscuro.
  * `events.js`: Concentra la captura y delegación de eventos del DOM, comunicando las interacciones del usuario hacia el dominio a través de funciones *callback* (`onStateChange`).

## 🛠️ Tecnologías Utilizadas
* **HTML5:** Estructura semántica, maquetación de componentes e importación nativa de módulos JS (`type="module"`).
* **CSS3:** Diseño responsivo adaptativo mediante CSS Grid y Flexbox, animaciones de interfaz y variables dinámicas para Modo Oscuro.
* **JavaScript (ES6+):** Programación modular nativa, arquitectura desacoplada por eventos, funciones puras de mutación y API de síntesis de voz (*Text-to-Speech*).

## 📋 Instrucciones para Ampliar la Plantilla Semanal
Debido a la total separación de la capa de presentación, cualquier modificación en los entrenamientos, adición de días o actualización de recursos multimedia se realiza **exclusivamente** en el módulo de configuración:

1. Abra el archivo `src/config/data.js`.
2. Ubique el arreglo principal exportado denominado `weeklyRoutine`.
3. Inserte un nuevo objeto respetando la siguiente estructura técnica estándar:

```javascript
{
    id: 7, // Identificador único secuencial del día
    name: "Domingo - Descanso Activo", // Nombre visible en la tarjeta de la interfaz
    exercises: [
        { 
            id: 701, // ID único (Convención: ID_DIA + Secuencial)
            name: "Estiramientos Flexibilidad", 
            details: "20 minutos de movilidad", 
            completed: false, // Debe iniciar obligatoriamente en false
            videoUrl: "URL_DE_NUBE" // Opcional (si se omite, el enlace no se renderiza)
        }
    ]
}