/* =========================================
   [JS-1] MODELO MOCK (Estado de la aplicación)
   ========================================= */
const WEEKLY_GOAL = 15; // Meta de la Fase 2

const weeklyRoutine = [
    {
        id: 1,
        name: "Lunes - Pecho",
        exercises: [
            { id: 101, name: "Press de Pecho Plano", details: "4 series x 10 reps", completed: false, videoUrl: "https://drive.google.com/file/d/1LYf1NHQFNNXnNzzdfgdd26RBofAgJnXe/view?usp=drive_link" },
            { id: 102, name: "Aperturas con Mancuernas", details: "3 series x 12 reps", completed: false, videoUrl: "https://drive.google.com/file/d/1XpqU96Cu8IwcG6-agc5F6p_QqZJosYjk/view?usp=drive_link" },
            { id: 103, name: "Press de Pecho Inclinado", details: "4 series x 10 reps", completed: false, videoUrl: "https://drive.google.com/file/d/1GsbK12_ZbZeBv5-YsaGE8Up4UxqkahVu/view?usp=drive_link" },
            { id: 104, name: "Pullover", details: "3 series x 12 reps", completed: false, videoUrl: "https://drive.google.com/file/d/1gsE6RYqToN3oYq2l4ZjsUq0NcWbtraQR/view?usp=drive_link" }
        ]
    },
    {
        id: 2,
        name: "Martes - Espalda",
        exercises: [
            { id: 201, name: "Dominadas", details: "4 series al fallo", completed: false, videoUrl: "https://drive.google.com/file/d/1AizUmnLCPsZLGLHH-L-yRptDg4bPM75L/view?usp=drive_link" },
            { id: 202, name: "Remo con Barra", details: "4 series x 10 reps", completed: false, videoUrl: "https://drive.google.com/file/d/1mqkYtsYrUrXOpNYgsc4J74l8ebV7NQjW/view?usp=drive_link" },
            { id: 203, name: "Peso Muerto", details: "4 series x 8 reps", completed: false, videoUrl: "https://drive.google.com/file/d/1zd65LxC_eNQ4O9T8Y565qlLwY5BA-vDf/view?usp=drive_link" },
            { id: 204, name: "Jalón al Pecho en Polea Alta", details: "4 series x 12 reps", completed: false, videoUrl: "https://drive.google.com/file/d/1gCIPEJmkl2uhmIRdPw0po5vBB1ZVCFYa/view?usp=drive_link" }
        ]
    },
    {
        id: 3,
        name: "Miércoles - Piernas",
        exercises: [
            { id: 301, name: "Sentadillas", details: "4 series x 12 reps", completed: false, videoUrl: "https://drive.google.com/file/d/1_ymkThNJvLl5QTnEhVs_2uyHGI9H7X01/view?usp=drive_link" },
            { id: 302, name: "Prensa", details: "4 series x 15 reps", completed: false, videoUrl: "https://drive.google.com/file/d/1ksyg2r10WQt2XiOjtkx22fIkR5nybk-O/view?usp=drive_link" },
            { id: 303, name: "Elevación de Talones", details: "4 series x 20 reps", completed: false, videoUrl: "https://drive.google.com/file/d/1sP7xi13cVJHGIpKZiVm-FEc-Ld0131xb/view?usp=drive_link" },
            { id: 304, name: "Curl de Isquiotibiales", details: "4 series x 12 reps", completed: false, videoUrl: "https://drive.google.com/file/d/1jIPfQDTycF0A0T61dS3UDRs-Gs6z2MRD/view?usp=drive_link" }
        ]
    },
    {
        id: 4,
        name: "Jueves - Hombros",
        exercises: [
            { id: 401, name: "Press Militar", details: "4 series x 10 reps", completed: false, videoUrl: "https://drive.google.com/file/d/1UMadyRFQcolCNq1iIZZMAl7mOITAZ6QK/view?usp=drive_link" },
            { id: 402, name: "Elevaciones Laterales", details: "4 series x 15 reps", completed: false, videoUrl: "https://drive.google.com/file/d/1z_oif4ehyZukVUqjgs06jvCEr7Ozcef5/view?usp=drive_link" },
            { id: 403, name: "Press Arnold", details: "4 series x 10 reps", completed: false, videoUrl: "https://drive.google.com/file/d/1_RCEVN2Td-xMdDhwJBEcMND7nYnGsfXc/view?usp=drive_link" },
            { id: 404, name: "Aperturas Inversas", details: "4 series x 15 reps", completed: false, videoUrl: "https://drive.google.com/file/d/1991qtRXOkeR19Vw_YZ_C2dhVge93JQDa/view?usp=drive_link" }
        ]
    },
    {
        id: 5,
        name: "Viernes - Bíceps y Tríceps",
        exercises: [
            { id: 501, name: "Curl de Bíceps", details: "4 series x 12 reps", completed: false, videoUrl: "https://drive.google.com/file/d/1yapUAxGE_dnol6D_HLto3IJ79abMNpl-/view?usp=drive_link" },
            { id: 502, name: "Extensión de Tríceps", details: "4 series x 12 reps", completed: false, videoUrl: "https://drive.google.com/file/d/1DKj5P-78cFgpjktFgTng26DfgGbpDm6M/view?usp=drive_link" },
            { id: 503, name: "Curl de Martillo", details: "4 series x 12 reps", completed: false, videoUrl: "https://drive.google.com/file/d/10c6vkpZ-g_pUi31WmT-tXoqaAZuUZe0m/view?usp=drive_link" },
            { id: 504, name: "Fondos en Paralelas (Dips)", details: "4 series al fallo", completed: false, videoUrl: "https://drive.google.com/file/d/1qiXItKZnrOif2dL7Z1UJ88o-R-bkRTU6/view?usp=drive_link" }
        ]
    },
    {
        id: 6,
        name: "Sábado - Cardio",
        exercises: [
            { id: 601, name: "Trotar", details: "45 minutos a ritmo constante", completed: false },
            { id: 602, name: "Spinning", details: "30 minutos de intervalos", completed: false }
        ]
    }
];

/* =========================================
   [JS-2 y JS-5] RENDERIZADO Y RESUMEN SEMANAL
   ========================================= */
const appContainer = document.getElementById('app-container');

function updateWeeklySummary() {
    let totalExercises = 0;
    let completedExercises = 0;

    weeklyRoutine.forEach(day => {
        totalExercises += day.exercises.length;
        completedExercises += day.exercises.filter(ex => ex.completed).length;
    });

    document.getElementById('weekly-progress-text').textContent = `${completedExercises} de ${totalExercises} ejercicios completados`;
    
    const percentage = totalExercises === 0 ? 0 : (completedExercises / totalExercises) * 100;
    document.getElementById('weekly-progress-bar').style.width = `${percentage}%`;

    const achievementMessage = document.getElementById('achievement-message');
    if (completedExercises >= WEEKLY_GOAL) {
        achievementMessage.classList.remove('hidden');
    } else {
        achievementMessage.classList.add('hidden');
    }
}

function renderApp() {
    appContainer.innerHTML = '';

    weeklyRoutine.forEach(day => {
        const completedCount = day.exercises.filter(ex => ex.completed).length;
        
        const dayCard = document.createElement('section');
        dayCard.className = 'day-card';
        // Agregamos id para que el menú de navegación funcione
        dayCard.id = `day-${day.id}`;
        dayCard.dataset.dayId = day.id;

        dayCard.innerHTML = `
            <header class="day-card-header">
                <h2 class="day-title">${day.name}</h2>
                <p class="day-progress">${completedCount} de ${day.exercises.length} completados</p>
            </header>
            <ul class="exercise-list">
                ${day.exercises.map(exercise => {
                    // Condicional para renderizar el enlace solo si existe videoUrl
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
                }).join('')}
            </ul>
        `;
        appContainer.appendChild(dayCard);
    });

    updateWeeklySummary();
}

/* =========================================
   [NUEVO] LÓGICA DEL MENÚ LATERAL Y MODO OSCURO
   ========================================= */

// Modo Oscuro
const themeCheckbox = document.getElementById('theme-checkbox');
themeCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

// Menú Lateral (Sidebar)
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');

function toggleMenu() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

menuBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Cerrar el menú automáticamente al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', toggleMenu);
});

/* =========================================
   EVENTOS PRINCIPALES (Checkboxes, Reset, Timer)
   ========================================= */

appContainer.addEventListener('change', (event) => {
    if (event.target.classList.contains('exercise-checkbox')) {
        const checkbox = event.target;
        const exerciseItem = checkbox.closest('.exercise-item');
        const dayCard = checkbox.closest('.day-card');
        
        const exerciseId = parseInt(exerciseItem.dataset.exerciseId);
        const dayId = parseInt(dayCard.dataset.dayId);

        const day = weeklyRoutine.find(d => d.id === dayId);
        const exercise = day.exercises.find(ex => ex.id === exerciseId);
        exercise.completed = checkbox.checked;

        exerciseItem.classList.toggle('is-completed', exercise.completed);
        
        const newCompletedCount = day.exercises.filter(ex => ex.completed).length;
        dayCard.querySelector('.day-progress').textContent = `${newCompletedCount} de ${day.exercises.length} completados`;

        updateWeeklySummary();
    }
});

document.getElementById('btn-reset').addEventListener('click', () => {
    const confirmar = confirm("¿Estás seguro de que quieres reiniciar todos tus progresos de esta semana?");
    if (confirmar) {
        weeklyRoutine.forEach(day => {
            day.exercises.forEach(ex => ex.completed = false);
        });
        renderApp(); 
    }
});

let timerInterval;
document.getElementById('btn-timer').addEventListener('click', (event) => {
    const btnTimer = event.target;
    const timerDisplay = document.getElementById('timer-display');
    let timeLeft = 45; 

    btnTimer.disabled = true;
    timerDisplay.textContent = `⏳ ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `⏳ ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "";
            btnTimer.disabled = false;
            
            const speech = new SpeechSynthesisUtterance("Tiempo de descanso finalizado. ¡A darle!");
            window.speechSynthesis.speak(speech);
            
            alert("¡Tiempo de descanso finalizado! Prepárate para la siguiente serie.");
        }
    }, 1000);
});

// Inicializamos la aplicación
renderApp();