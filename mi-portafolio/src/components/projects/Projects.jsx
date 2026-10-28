// useState guarda la búsqueda y useMemo evita filtrar proyectos sin cambios.
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard.jsx';
// El catálogo local es la única fuente de proyectos.
import localProjects from '../../data/projects';

export default function Projects() {
  const { t, i18n } = useTranslation();
  const projects = localProjects;
  const [query, setQuery] = useState('');

  const localizedProjects = useMemo(
    () =>
      projects.map((project) => {
        const copy = project.id
          ? t(`projects.items.${project.id}`, {
              returnObjects: true,
              defaultValue: {}
            })
          : {};
        const translated =
          copy && typeof copy === 'object' && !Array.isArray(copy) ? copy : {};

        return {
          ...project,
          ...translated,
          title: translated.title ?? project.id ?? '',
          description: translated.description ?? '',
          tags: Array.isArray(translated.tags) ? translated.tags : []
        };
      }),
    [projects, t, i18n.resolvedLanguage]
  );

  const filtered = useMemo(() => {
    // La búsqueda se aplica al título, la descripción y las etiquetas de cada proyecto.
    const search = query.trim().toLowerCase();
    if (!search) return localizedProjects;

    return localizedProjects.filter((project) => {
      const searchable = [project.title, project.description, ...project.tags]
        .join(' ')
        .toLowerCase();

      return searchable.includes(search);
    });
  }, [localizedProjects, query]);

  return (
    <section className="projects" id="proyectos">
      <div className="projects-header">
        <h2>{t('projects.title')}</h2>
        <input
          id="project-filter"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('projects.searchPlaceholder')}
          aria-label={t('projects.searchAria')}
        />
      </div>

      <div className="project-grid">
        {filtered.length === 0 ? (
          <p className="no-results">{t('projects.empty')}</p>
        ) : (
          filtered.map((project) => (
            <ProjectCard key={project.id ?? project.link} project={project} />
          ))
        )}
      </div>
    </section>
  );
}
