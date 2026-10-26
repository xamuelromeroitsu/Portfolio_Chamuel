// useTheme comparte la preferencia de tema; profile aporta el nombre mostrado en la navegación.
import { useTheme } from '../../hooks/useTheme';
import profile from '../../data/profile';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="site-header">
      <strong>{profile.name}</strong>
      <nav className="site-nav">
        <a href="#inicio">Inicio</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#contacto">Contacto</a>
      </nav>
      {/* El botón recibe el evento para que useTheme calcule el origen del revelado circular.
          aria-label describe la acción (no el estado) y aria-pressed expone el modo actual. */}
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
        aria-pressed={isDark}
        title={isDark ? 'Modo claro' : 'Modo oscuro'}
      >
        <span className="theme-toggle__icons" aria-hidden="true">
          {/* En oscuro se muestra el sol porque el clic llevará al modo claro. */}
          <svg className={`theme-toggle__sun${isDark ? ' is-active' : ''}`} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
          {/* En claro se muestra la luna porque el clic llevará al modo oscuro. */}
          <svg className={`theme-toggle__moon${!isDark ? ' is-active' : ''}`} viewBox="0 0 24 24">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </span>
      </button>
    </header>
  );
}
