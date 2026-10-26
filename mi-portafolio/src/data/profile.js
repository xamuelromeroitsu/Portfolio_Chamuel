// Datos neutrales del portafolio. Los textos traducibles viven en src/i18n/locales.
// `name`, `contactEmail`, `skills` y `social` no se traducen.
// Los `id` de `stats` son constantes: cada uno debe existir como
// `hero.stats.<id>` en los tres locales; el valor numérico se muestra tal cual.
const profile = {
  name: 'Xamuel Romero',
  contactEmail: 'xamuelromero.itsu@gmail.com',
  skills: ['JavaScript', 'React', 'Node.js', 'HTML5', 'CSS3', 'Git'],
  stats: [
    { id: 'projects', value: '6+' },
    { id: 'ownCode', value: '100%' }
  ],
  social: {
    github: 'https://github.com/xamuelromeroitsu',
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/'
  }
};

export default profile;
