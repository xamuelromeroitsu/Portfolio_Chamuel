import profile from '../data/profile';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' }
];

export default function Footer() {
  const { name, role, social } = profile;

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-branding">
          <strong>{name}</strong>
          <p className="footer-specialties">{role}</p>
        </div>
        <nav className="footer-nav">
          <h3>Navegación</h3>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-connections">
          <h3>Redes</h3>
          <ul>
            <li>
              <a href={social.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
