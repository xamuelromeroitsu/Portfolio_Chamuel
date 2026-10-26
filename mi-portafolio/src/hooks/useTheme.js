import { useEffect, useState } from 'react';

// Clave única de persistencia. Puede contener 'light', 'dark' o 'system' (implícito).
const STORAGE_KEY = 'theme';
const MEDIA = '(prefers-color-scheme: dark)';

// Devuelve el tema que prefiere el sistema operativo en este momento.
const systemTheme = () => (window.matchMedia(MEDIA).matches ? 'dark' : 'light');

// Resuelve el tema inicial: una elección explícita manda; si no existe, usa el sistema.
// Se mantiene fuera del hook para reutilizar la misma lógica que el script de index.html.
const readTheme = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return systemTheme();
};

// Hook reutilizable por los componentes que necesiten leer o cambiar el tema.
export function useTheme() {
  // El estado guarda el tema ya resuelto ('light' | 'dark'), no la preferencia 'system'.
  const [theme, setTheme] = useState(readTheme);

  // Refleja el estado en el atributo que consumen las variables CSS.
  // Se ejecuta también al montar por si el tema cambió antes de que React cargara.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sigue los cambios del sistema solo mientras el usuario no haya elegido manualmente.
  // Así se conserva el comportamiento "system" de rbp-portfolio hasta el primer clic.
  useEffect(() => {
    const query = window.matchMedia(MEDIA);
    const handleChange = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored || stored === 'system') {
        setTheme(query.matches ? 'dark' : 'light');
      }
    };

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  // Aplica el tema de forma síncrona. Es importante hacerlo así dentro de
  // startViewTransition: React actualiza el estado de forma asíncrona y la captura
  // nueva debe reflejar el tema antes de que el navegador tome la instantánea.
  const commitTheme = (next) => {
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  };

  // `event` es el clic del botón: su posición define el centro del círculo del revelado.
  const toggleTheme = (event) => {
    const next = theme === 'dark' ? 'light' : 'dark';

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const supportsViewTransition =
      typeof document.startViewTransition === 'function';

    // Fallback accesible: sin API o con movimiento reducido se cambia al instante.
    if (
      !supportsViewTransition ||
      prefersReducedMotion ||
      !event?.currentTarget
    ) {
      commitTheme(next);
      return;
    }

    // Centro del botón pulsado.
    const rect = event.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Radio necesario para cubrir la esquina más lejana de la pantalla.
    const radius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );

    // Las variables CSS alimentan el keyframe theme-reveal de global.css.
    const root = document.documentElement;
    root.style.setProperty('--theme-cx', `${cx}px`);
    root.style.setProperty('--theme-cy', `${cy}px`);
    root.style.setProperty('--theme-r', `${radius}px`);
    root.dataset.themeAnim = '1';

    const transition = document.startViewTransition(() => {
      commitTheme(next);
    });

    // Se limpia el flag para que el próximo cambio vuelva a animar desde cero.
    transition.finished.finally(() => {
      delete root.dataset.themeAnim;
    });
  };

  return { theme, toggleTheme };
}
