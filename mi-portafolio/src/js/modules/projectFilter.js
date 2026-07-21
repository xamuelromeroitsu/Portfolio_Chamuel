const projects = [
  {
    title: 'Asignación 01: Vanilla JS (Fase 1 y 2)',
    description: 'Proyecto completo que incluye UI, interacciones y seguimiento de estado en vanilla JavaScript.',
    tags: ['JavaScript', 'UI', 'Fase 1', 'Fase 2'],
    link: './asignacion-01/index.html'
  },
  {
    title: 'Asignación 02: JS Modular (Refactorización)',
    description: 'Versión refactorizada con módulos, mejor estructura y experiencia de usuario más limpia.',
    tags: ['JS Modular', 'Refactorización', 'Arquitectura'],
    link: './asignacion-02/index.html'
  },
  {
    title: 'LunaShop: Tienda de Artículos',
    description: 'Tienda en línea para la venta de artículos con catálogo, carrito de compras y pasarela de pago.',
    tags: ['E-commerce', 'UI', 'React'],
    link: 'https://asignacion-5.vercel.app/',
    external: true
  },
  {
    title: 'Auditoría e Ingeniería del Caos',
    description: 'Práctica de auditoría y aplicación de ingeniería del caos para evaluar resiliencia de sistemas.',
    tags: ['Auditoría', 'DevOps', 'Resiliencia'],
    link: 'https://xamuelromeroitsu.github.io/practica_de_auditoria-e-ing_del_caos/',
    external: true
  },
  {
    title: 'Consola del Programador',
    description: 'Herramienta web para evaluar y diagnosticar páginas web, similar a las DevTools del navegador.',
    tags: ['Herramientas', 'DevTools', 'JavaScript'],
    link: 'https://developerstools-console.vercel.app/',
    external: true
  },
  {
    title: 'Página de Mecánica Dental',
    description: 'Sitio web para laboratorio de mecánica dental con catálogo de servicios, procedimientos y contacto.',
    tags: ['Dental', 'Landing Page', 'UI'],
    link: 'https://proyecto-mec-dental.vercel.app/',
    external: true
  },
  {
    title: 'Más proyectos',
    description: 'Explora más trabajos, mejoras y proyectos en desarrollo próximamente.',
    tags: ['Portfolio', 'Próximamente'],
    link: null
  }
];

export function initProjectFilter() {
  const grid = document.getElementById('project-grid');
  const filterInput = document.getElementById('project-filter');

  function render(list) {
    if (!grid) return;

    if (list.length === 0) {
      grid.innerHTML = '<p class="no-results">No se encontraron proyectos con esa búsqueda.</p>';
      return;
    }

    grid.innerHTML = list.map(project => {
      return `
        <div class="project-card">
          <div class="project-card-content">
            <div>
              <h3>${project.title}</h3>
              <p>${project.description}</p>
            </div>
            <div class="project-footer">
              <div class="project-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
              ${project.link ? `<a class="project-link" href="${project.link}" ${project.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>${project.external ? 'Ver en vivo ↗' : 'Ver proyecto'}</a>` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function filterProjects() {
    const query = filterInput?.value.toLowerCase() || '';
    const filtered = projects.filter(project =>
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some(tag => tag.toLowerCase().includes(query))
    );
    render(filtered);
  }

  render(projects);
  filterInput?.addEventListener('input', filterProjects);
}
