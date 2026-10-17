import { useEffect, useMemo, useState } from 'react';
import ProjectCard from './ProjectCard.jsx';
import localProjects from '../data/projects';

export default function Projects() {
  const [projects, setProjects] = useState(localProjects);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/projects')
      .then((response) => {
        if (!response.ok) throw new Error('Respuesta no válida');
        return response.json();
      })
      .then((data) => setProjects(data))
      .catch(() => setError('No se pudo conectar con la API. Mostrando proyectos locales.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return projects;
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search) ||
        project.tags.some((tag) => tag.toLowerCase().includes(search))
    );
  }, [projects, query]);

  return (
    <section className="projects" id="proyectos">
      <div className="projects-header">
        <h2>Proyectos</h2>
        <input
          id="project-filter"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por nombre, descripción o tecnología..."
          aria-label="Buscar proyectos"
        />
      </div>

      {loading ? (
        <p className="no-results">Cargando proyectos...</p>
      ) : (
        <div className="project-grid">
          {filtered.length === 0 ? (
            <p className="no-results">No se encontraron proyectos con esa búsqueda.</p>
          ) : (
            filtered.map((project) => <ProjectCard key={project.title} project={project} />)
          )}
        </div>
      )}

      {error && <p className="form-message form-message--error">{error}</p>}
    </section>
  );
}
