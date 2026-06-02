/**
 * Genera el HTML para la lista de ejercicios de un día específico.
 * @param {Object} day - El objeto que contiene la información del día y sus ejercicios.
 * @returns {string} El HTML en formato string.
 */
export function createExerciseListHTML(day) {
    return day.exercises.map(exercise => {
        // Nota: Mantén aquí el texto que ajustaste manualmente en tu código local
        const videoLinkHTML = exercise.videoUrl 
            ? `<a href="${exercise.videoUrl}" target="_blank" class="video-link">🎥 Ver ejecución correcta</a>` 
            : '';

        return `
        <li class="exercise-item ${exercise.completed ? 'is-completed' : ''}" data-exercise-id="${exercise.id}">
            <input type="checkbox" id="ex-${exercise.id}" class="exercise-checkbox" ${exercise.completed ? 'checked' : ''}>
            <label for="ex-${exercise.id}" class="exercise-label">
                <span class="exercise-name">${exercise.name}</span>
                <span class="exercise-details">${exercise.details}</span>
                ${videoLinkHTML}
            </label>
        </li>
        `;
    }).join('');
}

/**
 * Genera el HTML completo para la tarjeta de un día.
 * @param {Object} day - El objeto del día.
 * @returns {string} El HTML completo de la sección.
 */
export function createDayCardHTML(day) {
    const completedCount = day.exercises.filter(ex => ex.completed).length;
    
    return `
        <section class="day-card" id="day-${day.id}" data-day-id="${day.id}">
            <header class="day-card-header">
                <h2 class="day-title">${day.name}</h2>
                <p class="day-progress">${completedCount} de ${day.exercises.length} completados</p>
            </header>
            <ul class="exercise-list">
                ${createExerciseListHTML(day)}
            </ul>
        </section>
    `;
}

/**
 * Actualiza visualmente el resumen semanal en el DOM.
 * @param {Object} stats - Las estadísticas calculadas (total, completados, porcentaje).
 * @param {number} weeklyGoal - La meta semanal de ejercicios.
 */
export function updateWeeklySummaryUI(stats, weeklyGoal) {
    document.getElementById('weekly-progress-text').textContent = `${stats.completedExercises} de ${stats.totalExercises} ejercicios completados`;
    document.getElementById('weekly-progress-bar').style.width = `${stats.percentage}%`;

    const achievementMessage = document.getElementById('achievement-message');
    if (stats.completedExercises >= weeklyGoal) {
        achievementMessage.classList.remove('hidden');
    } else {
        achievementMessage.classList.add('hidden');
    }
}