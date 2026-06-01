const projects = [
  { title: 'Proyecto 1', description: 'Descripción breve del proyecto.', tags: ['JavaScript', 'UI'] },
  { title: 'Proyecto 2', description: 'Descripción breve del proyecto.', tags: ['CSS', 'Responsive'] },
  { title: 'Proyecto 3', description: 'Descripción breve del proyecto.', tags: ['HTML', 'Accesibilidad'] }
];

export function initProjectFilter() {
  const grid = document.getElementById('project-grid');
  const filterInput = document.getElementById('project-filter');

  function render(list) {
    if (!grid) return;
    grid.innerHTML = list.map(project => `
      <article class="project-card">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <small>${project.tags.join(' · ')}</small>
      </article>
    `).join('');
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
