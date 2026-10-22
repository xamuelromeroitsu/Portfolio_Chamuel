// App conserva solo la composición general; los detalles del encabezado y el hero viven en HeroExperience.
import Footer from './components/layout/Footer.jsx';
import HeroExperience from './components/hero/HeroExperience.jsx';
import Projects from './components/projects/Projects.jsx';
import ContactSection from './components/contact/ContactSection.jsx';

export default function App() {
  return (
    <div className="site-shell">
      <main>
        {/* Agrupa el encabezado, el hero y el lanyard para mantener juntos los elementos superpuestos. */}
        <HeroExperience />
        <div className="site-main">
          {/* Las secciones de proyectos y contacto comparten el ancho y el espaciado principal. */}
          <Projects />
          <ContactSection />
        </div>
      </main>
      {/* El pie queda fuera del contenido principal, después de todas las secciones. */}
      <Footer />
    </div>
  );
}
