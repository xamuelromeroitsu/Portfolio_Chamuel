// Esta composición define el orden de las secciones; los detalles de cada una viven en su carpeta.
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/hero/Hero.jsx';
import Lanyard from './components/hero/Lanyard.jsx';
// El hook concentra las medidas responsive para mantener App enfocado en la estructura de página.
import useLanyardLayout from './components/hero/useLanyardLayout.js';
import Projects from './components/projects/Projects.jsx';
import ContactSection from './components/contact/ContactSection.jsx';

export default function App() {
  const lanyardLayout = useLanyardLayout();

  return (
    <div className="site-shell">
      <main>
        {/* El área común permite que la tarjeta se superponga al encabezado y al hero sin seguir el scroll. */}
        <div className="lanyard-area">
          <div className="lanyard-overlay">
            {/*
              Personaliza las imágenes desde public/. size/anchor son responsive;
              damping, elasticity y breeze ajustan el movimiento de la física.
            */}
            <Lanyard
              frontImage="/card-front.png"
              backImage="/card-back.png"
              strapImage="/band.png"
              cardColor="#06b6d4"
              finish="metallic"
              anchor={lanyardLayout.anchor}
              strapColor="#000000"
              size={lanyardLayout.size}
              damping={0.35}
              elasticity={0.65}
              breeze={0.55}
              intro
              interactive
            />
          </div>
          <Header />
          <div className="site-main site-main--hero">
            <Hero />
          </div>
        </div>
        <div className="site-main">
          <Projects />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
