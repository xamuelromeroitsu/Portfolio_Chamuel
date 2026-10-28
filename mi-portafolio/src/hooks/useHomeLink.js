// Gestiona el enlace «Inicio». Dentro de la página principal evita recargar la
// ruta, limpia el hash de sección y sube hasta arriba. En otra ruta deja que el
// enlace navegue normalmente.
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

export function useHomeLink() {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lang = i18n.resolvedLanguage || 'es';
  const href = `/${lang}/`;

  // `/es` y `/es/` son la misma página; el hash no altera el pathname.
  const isHome = pathname.replace(/\/+$/, '') === `/${lang}`;

  const handleClick = (event) => {
    if (!isHome) return;

    event.preventDefault();

    // Quita #contacto u otro hash para que recargar no vuelva a la sección.
    if (window.location.hash) {
      navigate(href, { replace: true });
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return { href, isHome, handleClick };
}
