/**
 * Cambia el estado de completado de un ejercicio específico.
 * @param {Array} routine - El arreglo completo de la rutina semanal.
 * @param {number} dayId - El ID del día.
 * @param {number} exerciseId - El ID del ejercicio a modificar.
 * @param {boolean} isCompleted - El nuevo estado (true/false).
 */
export function toggleExerciseCompletion(routine, dayId, exerciseId, isCompleted) {
    const day = routine.find(d => d.id === dayId);
    if (!day) return;

    const exercise = day.exercises.find(ex => ex.id === exerciseId);
    if (!exercise) return;

    exercise.completed = isCompleted;
}

/**
 * Reinicia todos los ejercicios de la rutina a "no completados".
 * @param {Array} routine - El arreglo completo de la rutina semanal.
 */
export function resetAllProgress(routine) {
    routine.forEach(day => {
        day.exercises.forEach(ex => ex.completed = false);
    });
}
/**
 * Calcula las estadísticas del progreso semanal.
 * @param {Array} routine - El arreglo completo de la rutina semanal.
 * @returns {Object} Un objeto con el total de ejercicios y los completados.
 */
export function calculateWeeklyProgress(routine) {
    let totalExercises = 0;
    let completedExercises = 0;

    routine.forEach(day => {
        totalExercises += day.exercises.length;
        completedExercises += day.exercises.filter(ex => ex.completed).length;
    });

    const percentage = totalExercises === 0 ? 0 : (completedExercises / totalExercises) * 100;

    return { 
        totalExercises, 
        completedExercises,
        percentage
    };
}