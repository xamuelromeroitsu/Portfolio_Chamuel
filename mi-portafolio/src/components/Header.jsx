import { useTheme } from '../hooks/useTheme';
import profile from '../data/profile';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="site-header">
      <strong>{profile.name}</strong>
      <nav className="site-nav">
        <a href="#inicio">Inicio</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#contacto">Contacto</a>
      </nav>
      <button id="theme-toggle" className="button button-secondary" type="button" onClick={toggleTheme}>
        {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
      </button>
    </header>
  );
}
