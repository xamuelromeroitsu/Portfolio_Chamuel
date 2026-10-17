import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import ContactForm from './components/ContactForm.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main className="site-main">
        <Hero />
        <Projects />
        <section className="contact" id="contacto">
          <h2>Contacto</h2>
          <p>¿Tienes un proyecto en mente o una oportunidad laboral? Escríbeme y te respondo.</p>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
