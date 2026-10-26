// Guardia de ruta `/:lang`: valida contra `LANGUAGE_CODES`, sincroniza i18next
// con la URL y actualiza `lang`, `title` y `meta description`. Si el idioma no
// existe redirige a `/es/`; no guarda preferencia en localStorage.
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isSupportedLanguage } from '../../i18n/languages.js';

export default function LanguageRoute({ children }) {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  const valid = isSupportedLanguage(lang);

  useEffect(() => {
    if (valid && i18n.resolvedLanguage !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n, lang, valid]);

  useEffect(() => {
    if (!valid) return;

    document.documentElement.lang = lang;
    document.title = t('meta.title');

    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', t('meta.description'));
  }, [lang, t, valid]);

  if (!valid) return <Navigate to="/es/" replace />;

  return children;
}
