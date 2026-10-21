import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import ContactForm from './components/ContactForm.jsx';
import Footer from './components/Footer.jsx';
import Lanyard from './components/Lanyard.jsx';

export default function App() {
  const [lanyardLayout, setLanyardLayout] = useState({ size: 0.56, anchor: 'right' });

  useEffect(() => {
    const updateLanyardLayout = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width <= 520) {
        setLanyardLayout({
          size: height <= 650 ? 0.28 : 0.34,
          anchor: 'center',
        });
      } else if (width <= 760 || height <= 600) {
        setLanyardLayout({ size: 0.42, anchor: 'right' });
      } else {
        setLanyardLayout({ size: 0.56, anchor: 'right' });
      }
    };

    updateLanyardLayout();
    window.addEventListener('resize', updateLanyardLayout);
    return () => window.removeEventListener('resize', updateLanyardLayout);
  }, []);

  return (
    <div className="site-shell">
      <div className="lanyard-area">
        <div className="lanyard-overlay">
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
        <section className="site-main site-main--hero">
          <Hero />
        </section>
      </div>
      <main className="site-main">
        <Projects />
        <section className="contact" id="contacto">
          <h2>Contacto</h2>
          <p>¿Tienes un proyecto en mente o una oportunidad laboral? Escríbeme y te respondo.</p>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
