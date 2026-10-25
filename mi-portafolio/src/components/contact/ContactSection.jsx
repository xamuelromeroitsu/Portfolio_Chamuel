import { useEffect, useRef, useState } from 'react';
import ContactForm from './ContactForm.jsx';
import profile from '../../data/profile.js';

export default function ContactSection() {
  const [copyStatus, setCopyStatus] = useState(null);
  const copyFeedbackTimer = useRef(null);

  // Limpia el temporizador si se abandona la sección antes de que desaparezca el aviso.
  useEffect(() => () => clearTimeout(copyFeedbackTimer.current), []);

  const copyEmail = async () => {
    clearTimeout(copyFeedbackTimer.current);

    try {
      // La API Clipboard requiere un contexto seguro (HTTPS o localhost); el mailto sigue disponible.
      await navigator.clipboard.writeText(profile.contactEmail);
      setCopyStatus({ type: 'success', text: '¡Copiado!' });
    } catch (error) {
      console.error('No se pudo copiar el correo al portapapeles:', error);
      setCopyStatus({
        type: 'error',
        text: 'No se pudo copiar. Puedes seleccionar el correo o abrir el enlace.'
      });
    }

    copyFeedbackTimer.current = setTimeout(() => setCopyStatus(null), 2200);
  };

  return (
    <section className="contact" id="contacto" aria-labelledby="contact-title">
      <div className="contact-intro">
        <span className="contact-eyebrow">Hablemos</span>
        <h2 id="contact-title">¿Tienes un proyecto en mente?</h2>
        <p>
          Estoy disponible para conversar sobre proyectos, colaboraciones y nuevas
          oportunidades. Cuéntame qué tienes en mente.
        </p>
        <div className="contact-email">
          <span className="contact-email-label">Correo directo</span>
          <div className="contact-email-actions">
            <a className="contact-email-link" href={`mailto:${profile.contactEmail}`}>
              {profile.contactEmail}
            </a>
            <button
              className="copy-email-button"
              type="button"
              onClick={copyEmail}
              aria-label={copyStatus?.type === 'success' ? 'Correo copiado' : 'Copiar correo'}
            >
              {copyStatus?.type === 'success' ? (
                '¡Copiado!'
              ) : (
                <>
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <rect x="8" y="8" width="12" height="13" rx="2" />
                    <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3" />
                  </svg>
                  Copiar
                </>
              )}
            </button>
          </div>
          {copyStatus && (
            <p className={`copy-email-status copy-email-status--${copyStatus.type}`} role="status">
              {copyStatus.type === 'error' ? copyStatus.text : 'Correo copiado al portapapeles.'}
            </p>
          )}
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
