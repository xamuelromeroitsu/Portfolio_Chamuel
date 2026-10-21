// profile contiene el texto editable del hero y los datos resumidos que aparecen en la tarjeta visual.
import profile from '../../data/profile';

export default function Hero() {
  const { name, role, description, skills, stats } = profile;

  return (
    <section className="hero" id="inicio">
      {/* El id inicio es el destino de los enlaces del menú y del pie de página. */}
      <div className="hero-content">
        <span className="hero-label">Portafolio</span>
        <h1>
          {name}
          <br />
          {role}
        </h1>
        <p className="hero-description">{description}</p>
        <div className="hero-actions">
          <a className="button" href="#proyectos">
            Ver proyectos
          </a>
        </div>
        <div className="hero-skills">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-card">
          {stats.map((stat) => (
            <p key={stat.label}>
              <strong>{stat.value}</strong> {stat.label}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
