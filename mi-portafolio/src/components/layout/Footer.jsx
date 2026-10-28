// El pie reutiliza la identidad y las redes definidas en data/profile.js.
import { useTranslation } from 'react-i18next';
import { useHomeLink } from '../../hooks/useHomeLink.js';
import profile from '../../data/profile';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const { name, social } = profile;
  const lang = i18n.resolvedLanguage || 'es';
  const { handleClick: handleHomeClick } = useHomeLink();

  const navLinks = [
    { label: t('nav.home'), href: `/${lang}/#inicio`, home: true },
    { label: t('nav.projects'), href: `/${lang}/#proyectos` },
    { label: t('nav.contact'), href: `/${lang}/#contacto` }
  ];

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-branding">
          <strong>{name}</strong>
          <p className="footer-specialties">{t('hero.role')}</p>
        </div>
        <nav className="footer-nav">
          <h3>{t('footer.navigation')}</h3>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={link.home ? handleHomeClick : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-connections">
          <h3>{t('footer.socials')}</h3>
          <ul>
            <li>
              <a href={social.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
