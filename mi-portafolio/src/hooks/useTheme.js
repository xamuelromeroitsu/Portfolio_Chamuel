import { useEffect, useState } from 'react';

// Hook reutilizable por los componentes que necesiten leer o cambiar el tema.
export function useTheme() {
  // Lee la preferencia guardada una vez; si no existe, comienza en modo claro.
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // CSS usa data-theme para cambiar las variables; localStorage conserva la elección al recargar.
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // El tema se alterna entre los dos valores que definen variables.css.
  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}
