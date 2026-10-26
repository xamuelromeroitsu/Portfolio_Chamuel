import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { LANGUAGE_CODES, getLanguage } from '../src/i18n/languages.js';

// Los idiomas salen de `LANGUAGE_CODES`, no de una lista local: la fuente única
// es `src/i18n/languages.js`. Cada código debe tener su JSON en `locales/`.
const languages = LANGUAGE_CODES;
const root = process.cwd();
const distDir = path.join(root, 'dist');
const baseHtml = await readFile(path.join(distDir, 'index.html'), 'utf8');
const siteUrl = (process.env.SITE_URL || '').replace(/\/+$/, '');

if (siteUrl) {
  try {
    new URL(siteUrl);
  } catch {
    throw new Error('SITE_URL debe ser una URL absoluta, por ejemplo https://midominio.com');
  }
}

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const replaceRequired = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) {
    throw new Error(`No se encontró ${label} en dist/index.html`);
  }

  return html.replace(pattern, replacement);
};

for (const lang of languages) {
  const locale = JSON.parse(
    await readFile(path.join(root, 'src', 'i18n', 'locales', `${lang}.json`), 'utf8')
  );
  const language = getLanguage(lang);
  const title = escapeHtml(locale.meta.title);
  const description = escapeHtml(locale.meta.description);
  const url = siteUrl ? `${siteUrl}/${lang}/` : '';

  let html = baseHtml;
  html = replaceRequired(html, /<html lang="[^"]*">/, `<html lang="${lang}">`, '<html lang>');
  html = replaceRequired(html, /<title>.*?<\/title>/s, `<title>${title}</title>`, '<title>');
  html = replaceRequired(
    html,
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}" />`,
    'meta description'
  );

  const headTags = [
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:locale" content="${language.ogLocale}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`
  ];

  if (siteUrl) {
    headTags.unshift(
      `<link rel="canonical" href="${url}" />`,
      ...languages.map(
        (code) =>
          `<link rel="alternate" hreflang="${code}" href="${siteUrl}/${code}/" />`
      ),
      `<link rel="alternate" hreflang="x-default" href="${siteUrl}/es/" />`,
      `<meta property="og:url" content="${url}" />`
    );
  }

  html = html.replace('</head>', `    ${headTags.join('\n    ')}\n  </head>`);

  const langDir = path.join(distDir, lang);
  await mkdir(langDir, { recursive: true });
  await writeFile(path.join(langDir, 'index.html'), html, 'utf8');
}

if (siteUrl) {
  const paths = [
    ...languages.map((lang) => `/${lang}/`),
    '/asignacion-01/',
    '/asignacion-02/'
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (pathname) =>
      `  <url>\n    <loc>${escapeHtml(`${siteUrl}${pathname}`)}</loc>\n  </url>`
  )
  .join('\n')}
</urlset>
`;

  await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
  await writeFile(
    path.join(distDir, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
    'utf8'
  );
} else {
  console.warn(
    '[i18n] SITE_URL no definido: se generaron las shells sin canonical, hreflang ni sitemap.'
  );
}

console.log(`[i18n] Shells generadas para: ${languages.join(', ')}`);
