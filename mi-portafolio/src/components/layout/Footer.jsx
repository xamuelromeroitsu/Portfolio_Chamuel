import { useTranslation } from 'react-i18next';
import { useHomeLink } from '../../hooks/useHomeLink.js';
import { useContactLink } from '../../hooks/useContactLink.js';
import profile from '../../data/profile';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const { name, social } = profile;
  const lang = i18n.resolvedLanguage || 'es';
  const { href: homeHref, handleClick: handleHomeClick } = useHomeLink();
  const { href: contactHref, handleClick: handleContactClick } = useContactLink(lang);

  const navLinks = [
    { label: t('nav.home'), href: homeHref, home: true },
    { label: t('nav.about'), href: `/${lang}/about/` },
    { label: t('nav.projects'), href: `/${lang}/#proyectos` },
    { label: t('nav.contact'), href: contactHref, contact: true }
  ];

  const socialLinks = [
    { label: 'GitHub', href: social.github },
    { label: 'LinkedIn', href: social.linkedin },
    { label: 'Instagram', href: social.instagram }
  ];

  const legalLinks = [
    t('footer.privacy'),
    t('footer.terms'),
    t('footer.cookies')
  ];

  const resourceLinks = [
    t('footer.resume'),
    t('footer.blog')
  ];

  const renderInactiveLinks = (links) => (
    <ul>
      {links.map((label) => (
        <li key={label}>
          <a
            className="footer-link--inactive"
            href="#"
            aria-disabled="true"
            aria-label={`${label} · ${t('footer.comingSoon')}`}
            title={t('footer.comingSoon')}
            onClick={(event) => event.preventDefault()}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-branding">
            <a
              className="footer-brand"
              href={homeHref}
              onClick={handleHomeClick}
              aria-label={name}
            >
              {t('footer.brand')}
            </a>
          </div>

          <div className="footer-columns">
            <nav className="footer-column" aria-label={t('footer.pages')}>
              <h2>{t('footer.pages')}</h2>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={
                        link.contact
                          ? handleContactClick
                          : link.home
                            ? handleHomeClick
                            : undefined
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="footer-column" aria-label={t('footer.socials')}>
              <h2>{t('footer.socials')}</h2>
              <ul>
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="footer-column" aria-label={t('footer.legal')}>
              <h2>{t('footer.legal')}</h2>
              {renderInactiveLinks(legalLinks)}
            </nav>

            <nav className="footer-column" aria-label={t('footer.resources')}>
              <h2>{t('footer.resources')}</h2>
              {renderInactiveLinks(resourceLinks)}
            </nav>
          </div>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          {t('footer.brand')}
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {name}. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
