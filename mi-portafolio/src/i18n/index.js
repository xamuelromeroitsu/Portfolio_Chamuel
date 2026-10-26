import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es.json';
import en from './locales/en.json';
import pt from './locales/pt.json';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_CODES,
  getLanguageFromPath
} from './languages.js';

// Se importa una sola vez desde `src/main.jsx`. El idioma inicial sale de la URL
// (no de localStorage); en tests/prerender, sin `window`, cae en `DEFAULT_LANGUAGE`.
const initialLanguage =
  typeof window === 'undefined'
    ? DEFAULT_LANGUAGE
    : getLanguageFromPath(window.location.pathname);

// Las claves de `resources` deben coincidir con `LANGUAGE_CODES` y con los JSON
// de `src/i18n/locales/`. Si añades un idioma, impórtalo aquí también.
i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
    pt: { translation: pt }
  },
  lng: initialLanguage,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: LANGUAGE_CODES,
  load: 'languageOnly',
  interpolation: {
    escapeValue: false
  },
  returnNull: false,
  react: {
    useSuspense: false
  }
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLanguage;
}

i18n.on('languageChanged', (language) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = language;
  }
});

export { getLanguageFromPath };
export default i18n;
