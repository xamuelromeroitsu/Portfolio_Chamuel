// Catálogo neutral de proyectos. Los títulos, descripciones y tags viven en los locales.
// Los enlaces locales son absolutos para que funcionen bajo /es/, /en/ y /pt/.
// `id` es la constante que une este catálogo con la copia: debe existir como
// `projects.items.<id>` en los tres locales. La API (`server/index.js`) solo
// expone `id`, `link`, `external` y `stack`; el resto se resuelve en el cliente.
const projects = [
  {
    id: 'asignacion-01',
    link: '/asignacion-01/index.html',
    external: false,
    stack: ['JavaScript']
  },
  {
    id: 'asignacion-02',
    link: '/asignacion-02/index.html',
    external: false,
    stack: ['JavaScript']
  },
  {
    id: 'lunashop',
    link: 'https://asignacion-5.vercel.app/',
    external: true,
    stack: ['React']
  },
  {
    id: 'auditoria-caos',
    link: 'https://xamuelromeroitsu.github.io/practica_de_auditoria-e-ing_del_caos/',
    external: true,
    stack: ['DevOps']
  },
  {
    id: 'consola-programador',
    link: 'https://developerstools-console.vercel.app/',
    external: true,
    stack: ['JavaScript']
  },
  {
    id: 'mecanica-dental',
    link: 'https://proyecto-mec-dental.vercel.app/',
    external: true,
    stack: []
  },
  {
    id: 'mas-proyectos',
    link: null,
    external: false,
    stack: []
  }
];

export default projects;
