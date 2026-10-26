// Header transparente con menú escalonado. Sin logo ni nombre: navegación,
// tema y redes viven dentro del panel. Inicio usa la dirección normal "/".
import StaggeredMenu from './StaggeredMenu.jsx';
import { useTheme } from '../../hooks/useTheme';
import profile from '../../data/profile';

const menuItems = [
  { label: 'Inicio', ariaLabel: 'Ir al inicio', link: '/' },
  { label: 'Contacto', ariaLabel: 'Ir a la sección de contacto', link: '#contacto' }
];

const socialItems = [
  { label: 'GitHub', link: profile.social.github },
  { label: 'LinkedIn', link: profile.social.linkedin },
  { label: 'Instagram', link: profile.social.instagram }
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  // El control se pasa al panel para que el cambio de tema viva dentro del menú.
  const themeControl = (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      aria-pressed={isDark}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      <span className="theme-toggle__icons" aria-hidden="true">
        <svg className={`theme-toggle__sun${isDark ? ' is-active' : ''}`} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
        <svg className={`theme-toggle__moon${!isDark ? ' is-active' : ''}`} viewBox="0 0 24 24">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </span>
    </button>
  );

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <StaggeredMenu
        isFixed
        position="right"
        desktopInline
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        themeControl={themeControl}
        menuLabel="Menú"
        closeLabel="Cerrar"
      />
    </>
  );
}
