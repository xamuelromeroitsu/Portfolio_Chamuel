export default function ProjectCard({ project }) {
  // Cada tarjeta recibe un objeto de data/projects.js; external decide si abre otra pestaña.
  const { title, description, tags, link, external } = project;

  return (
    <article className="project-card">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="project-footer">
        <div className="project-tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {link && (
          <a
            className="project-link"
            href={link}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {external ? 'Ver en vivo ↗' : 'Ver proyecto'}
          </a>
        )}
      </div>
    </article>
  );
}
