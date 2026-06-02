import { WEEKLY_GOAL, weeklyRoutine } from './src/config/data.js';
import { calculateWeeklyProgress } from './src/domain/progress.js';
import { createDayCardHTML, updateWeeklySummaryUI } from './src/ui/components.js';
import { initLayout } from './src/ui/layout.js';
import { initGlobalEvents } from './src/ui/events.js';

const appContainer = document.getElementById('app-container');

function updateWeeklySummary() {
    const stats = calculateWeeklyProgress(weeklyRoutine);
    updateWeeklySummaryUI(stats, WEEKLY_GOAL);
}

function renderApp() {
    // Renderizado declarativo: Mapeamos los datos directamente a componentes visuales
    appContainer.innerHTML = weeklyRoutine.map(day => createDayCardHTML(day)).join('');
    updateWeeklySummary();
}

/**
 * Orquesta las actualizaciones visuales en respuesta a los cambios de estado del dominio.
 * @param {HTMLElement} dayCard - El contenedor DOM del día modificado.
 * @param {number} dayId - El identificador del día.
 * @param {boolean} fullRender - Indica si se requiere un re-renderizado completo de la aplicación.
 */
function handleStateChange(dayCard = null, dayId = null, fullRender = false) {
    if (fullRender) {
        renderApp();
    } else if (dayCard && dayId) {
        // Actualización parcial (solo el texto de progreso del día específico)
        const day = weeklyRoutine.find(d => d.id === dayId);
        const newCompletedCount = day.exercises.filter(ex => ex.completed).length;
        dayCard.querySelector('.day-progress').textContent = `${newCompletedCount} de ${day.exercises.length} completados`;
        
        // Actualización del resumen general
        updateWeeklySummary();
    }
}

// Inicialización de la aplicación
initLayout();
initGlobalEvents(handleStateChange);
renderApp();