// Fuente única de idiomas del sitio. Los códigos (`es`, `en`, `pt`) viajan en la
// URL y en el nombre de `src/i18n/locales/<code>.json`: no los traduzcas ni los
// cambies sin actualizar locales, shells y tests a la vez.
// Consumidores: `src/i18n/index.js` (configuración), `LanguageRoute` (validación),
// los componentes (enlaces con prefijo) y `scripts/build-language-shells.mjs`.

// Idioma de respaldo y destino de `/`. Si añades un idioma, decide si este cambia.
export const DEFAULT_LANGUAGE = 'es';

// Metadatos de cada idioma. `code` debe coincidir con el JSON del locale y con
// la carpeta generada en `dist/<code>/`. Añadir uno aquí obliga a:
// locale nuevo + import en `index.js` + ruta/shell + `hreflang` + tests.
export const LANGUAGES = [
  {
    code: 'es',
    label: 'Español',
    htmlLang: 'es',
    ogLocale: 'es_ES',
    dir: 'ltr'
  },
  {
    code: 'en',
    label: 'English',
    htmlLang: 'en',
    ogLocale: 'en_US',
    dir: 'ltr'
  },
  {
    code: 'pt',
    label: 'Português',
    htmlLang: 'pt',
    ogLocale: 'pt_BR',
    dir: 'ltr'
  }
];

// Lista derivada de `LANGUAGES`; no la escribas a mano en otros archivos. La usan
// i18next (`supportedLngs`), los tests y el script de shells.
export const LANGUAGE_CODES = LANGUAGES.map(({ code }) => code);

// Valida un segmento de URL. Siempre se compara en minúsculas.
export const isSupportedLanguage = (value) =>
  typeof value === 'string' && LANGUAGE_CODES.includes(value.toLowerCase());

// Lee el primer segmento de la URL (`/en/#contacto` -> `en`). Si no es un idioma
// soportado devuelve `DEFAULT_LANGUAGE`; por eso `/asignacion-01/` cae en español.
export const getLanguageFromPath = (pathname = '') => {
  const firstSegment = pathname.split('/').filter(Boolean)[0]?.toLowerCase();

  return isSupportedLanguage(firstSegment) ? firstSegment : DEFAULT_LANGUAGE;
};

// Devuelve los metadatos completos de un idioma. Lo usa el script de build para
// rellenar `lang`, `og:locale` y `hreflang` de cada shell.
export const getLanguage = (code) =>
  LANGUAGES.find((language) => language.code === code) ?? LANGUAGES[0];
