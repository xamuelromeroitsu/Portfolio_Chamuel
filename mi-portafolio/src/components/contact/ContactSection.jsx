import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContactForm from './ContactForm.jsx';
import profile from '../../data/profile.js';

export default function ContactSection() {
  const { t } = useTranslation();
  const [copyStatus, setCopyStatus] = useState(null);
  const copyFeedbackTimer = useRef(null);

  // Limpia el temporizador si se abandona la sección antes de que desaparezca el aviso.
  useEffect(() => () => clearTimeout(copyFeedbackTimer.current), []);

  const copyEmail = async () => {
    clearTimeout(copyFeedbackTimer.current);

    try {
      // La API Clipboard requiere un contexto seguro (HTTPS o localhost); el mailto sigue disponible.
      await navigator.clipboard.writeText(profile.contactEmail);
      setCopyStatus({ type: 'success' });
    } catch (error) {
      console.error('No se pudo copiar el correo al portapapeles:', error);
      setCopyStatus({ type: 'error' });
    }

    copyFeedbackTimer.current = setTimeout(() => setCopyStatus(null), 2200);
  };

  return (
    <section className="contact" id="contacto" aria-labelledby="contact-title">
      <div className="contact-intro">
        <span className="contact-eyebrow">{t('contact.eyebrow')}</span>
        <h2 id="contact-title">{t('contact.title')}</h2>
        <p>{t('contact.description')}</p>
        <div className="contact-email">
          <span className="contact-email-label">{t('contact.emailLabel')}</span>
          <div className="contact-email-actions">
            <a className="contact-email-link" href={`mailto:${profile.contactEmail}`}>
              {profile.contactEmail}
            </a>
            <button
              className="copy-email-button"
              type="button"
              onClick={copyEmail}
              aria-label={
                copyStatus?.type === 'success'
                  ? t('contact.copiedAria')
                  : t('contact.copyAria')
              }
            >
              {copyStatus?.type === 'success' ? (
                t('contact.copied')
              ) : (
                <>
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <rect x="8" y="8" width="12" height="13" rx="2" />
                    <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3" />
                  </svg>
                  {t('contact.copy')}
                </>
              )}
            </button>
          </div>
          {copyStatus && (
            <p className={`copy-email-status copy-email-status--${copyStatus.type}`} role="status">
              {copyStatus.type === 'error'
                ? t('contact.copyError')
                : t('contact.copySuccess')}
            </p>
          )}
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
