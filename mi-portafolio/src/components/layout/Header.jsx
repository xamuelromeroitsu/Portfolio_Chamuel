// Header transparente con menú escalonado. Sin logo ni nombre: navegación,
// tema y redes viven dentro del panel. Los enlaces respetan el idioma de la URL.
import { useTranslation } from 'react-i18next';
import StaggeredMenu from './StaggeredMenu.jsx';
import LanguageSlingButton from './LanguageSlingButton.jsx';
import { useTheme } from '../../hooks/useTheme';
import { useHomeLink } from '../../hooks/useHomeLink.js';
import { useContactLink } from '../../hooks/useContactLink.js';
import profile from '../../data/profile';

const socialItems = [
  { label: 'GitHub', link: profile.social.github },
  { label: 'LinkedIn', link: profile.social.linkedin },
  { label: 'Instagram', link: profile.social.instagram }
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const lang = i18n.resolvedLanguage || 'es';
  const { handleClick: handleHomeClick } = useHomeLink();
  const { href: contactHref, handleClick: handleContactClick } = useContactLink(lang);

  const menuItems = [
    {
      id: 'home',
      label: t('nav.home'),
      ariaLabel: t('nav.homeAria'),
      link: `/${lang}/`
    },
    {
      label: t('nav.projects'),
      ariaLabel: t('nav.projectsAria'),
      link: `/${lang}/projects/`
    },
    {
      label: t('nav.about'),
      ariaLabel: t('nav.aboutAria'),
      link: `/${lang}/about/`
    },
    {
      id: 'contact',
      label: t('nav.contact'),
      ariaLabel: t('nav.contactAria'),
      link: contactHref
    }
  ];

  // El control de idioma se reutiliza en el header de escritorio y en el panel.
  const languageControl = <LanguageSlingButton />;

  // El control se pasa al panel para que el cambio de tema viva dentro del menú.
  const themeControl = (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? t('theme.activateLight') : t('theme.activateDark')}
      aria-pressed={isDark}
      title={isDark ? t('theme.light') : t('theme.dark')}
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
        {t('common.skipToContent')}
      </a>
      <StaggeredMenu
        isFixed
        position="right"
        desktopInline
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        languageControl={languageControl}
        languageLabel={t('nav.language')}
        themeControl={themeControl}
        menuLabel={t('nav.menuLabel')}
        closeLabel={t('nav.closeLabel')}
        navLabel={t('nav.mainAria')}
        menuAriaLabel={t('nav.menuAria')}
        openMenuLabel={t('nav.openMenu')}
        closeMenuLabel={t('nav.closeMenu')}
        noLinksLabel={t('nav.noLinks')}
        themeLabel={t('nav.theme')}
        socialsLabel={t('nav.socials')}
        onItemClick={(event, item) => {
          if (item.id === 'home') {
            handleHomeClick(event);
            return;
          }
          if (item.id === 'contact') {
            handleContactClick(event);
            return;
          }
        }}
      />
    </>
  );
}
