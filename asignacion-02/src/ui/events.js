import { weeklyRoutine } from '../config/data.js';
import { startCountdown } from '../domain/timer.js';
import { toggleExerciseCompletion, resetAllProgress } from '../domain/progress.js';

/**
 * Inicializa los manejadores de eventos globales de la aplicación.
 * @param {Function} onStateChange - Callback que se ejecuta cuando el estado requiere actualización visual.
 */
export function initGlobalEvents(onStateChange) {
    const appContainer = document.getElementById('app-container');

    appContainer.addEventListener('change', (event) => {
        if (event.target.classList.contains('exercise-checkbox')) {
            const checkbox = event.target;
            const exerciseItem = checkbox.closest('.exercise-item');
            const dayCard = checkbox.closest('.day-card');
            
            const exerciseId = parseInt(exerciseItem.dataset.exerciseId);
            const dayId = parseInt(dayCard.dataset.dayId);

            // Mutación de estado en el dominio
            toggleExerciseCompletion(weeklyRoutine, dayId, exerciseId, checkbox.checked);

            // Actualización visual parcial para rendimiento
            exerciseItem.classList.toggle('is-completed', checkbox.checked);
            
            // Disparo del callback para re-renderizar componentes dependientes (ej. resumen semanal)
            onStateChange(dayCard, dayId);
        }
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
        const confirmar = confirm("¿Estás seguro de que quieres reiniciar todos tus progresos de esta semana?");
        if (confirmar) {
            resetAllProgress(weeklyRoutine);
            // Renderizado completo tras purga de estado
            onStateChange(null, null, true); 
        }
    });

    document.getElementById('btn-timer').addEventListener('click', (event) => {
        const btnTimer = event.target;
        const timerDisplay = document.getElementById('timer-display');
        const duration = 45; 

        btnTimer.disabled = true;

        startCountdown(
            duration,
            (timeLeft) => {
                timerDisplay.textContent = `⏳ ${timeLeft}s`;
            },
            () => {
                timerDisplay.textContent = "";
                btnTimer.disabled = false;
                
                const speech = new SpeechSynthesisUtterance("Tiempo de descanso finalizado. ¡A darle!");
                window.speechSynthesis.speak(speech);
                
                alert("¡Tiempo de descanso finalizado! Prepárate para la siguiente serie.");
            }
        );
    });
}