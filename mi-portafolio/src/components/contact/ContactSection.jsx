// La sección agrupa el encabezado y el formulario para que App.jsx solo organice páginas.
import ContactForm from './ContactForm.jsx';

export default function ContactSection() {
  return (
    <section className="contact" id="contacto">
      <h2>Contacto</h2>
      <p>¿Tienes un proyecto en mente o una oportunidad laboral? Escríbeme y te respondo.</p>
      <ContactForm />
    </section>
  );
}
