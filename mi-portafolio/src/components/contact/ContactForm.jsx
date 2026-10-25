import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '../../data/contactSchema.js';
import {
  ContactServiceError,
  sendContactMessage
} from '../../services/contactService.js';

export default function ContactForm() {
  const [status, setStatus] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(contactSchema),
    // Valida mientras se escribe para corregir errores antes de intentar el envío.
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const onSubmit = async (values) => {
    setStatus(null);

    try {
      await sendContactMessage(values);
      reset();
      setStatus({
        type: 'success',
        text: '¡Gracias por tu mensaje! Te responderé en menos de 24-48 horas.'
      });
    } catch (error) {
      console.error('No se pudo enviar el mensaje de contacto:', error);
      if (error instanceof ContactServiceError && error.code === 'autoresponder') {
        // La notificación ya se entregó; limpiar evita que el usuario reenvíe y duplique el mensaje.
        reset();
        setStatus({
          type: 'warning',
          text: 'Tu mensaje llegó correctamente, pero no se pudo enviar el correo de confirmación. No necesitas volver a enviarlo.'
        });
        return;
      }

      setStatus({
        type: 'error',
        text: error instanceof ContactServiceError
          ? error.userMessage
          : 'No se pudo enviar el mensaje. Revisa tu conexión e inténtalo de nuevo.'
      });
    }
  };

  return (
    <form className="form contact-form" id="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-heading">
        <span className="contact-eyebrow">Formulario de contacto</span>
        <h3>Cuéntame sobre tu idea</h3>
        <p>Completa tus datos y me pondré en contacto contigo pronto.</p>
      </div>

      <div className="form-group">
        <label htmlFor="contact-name">Nombre</label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder="Tu nombre"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          {...register('name')}
        />
        {errors.name && (
          <span className="field-error" id="contact-name-error">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="contact-email">Correo electrónico</label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="tu@correo.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <span className="field-error" id="contact-email-error">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="contact-subject">Asunto / Motivo de contacto</label>
        <select
          id="contact-subject"
          defaultValue=""
          required
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          {...register('subject')}
        >
          <option value="" disabled>Selecciona un motivo</option>
          <option value="Oferta laboral">Oferta laboral</option>
          <option value="Proyecto freelance">Proyecto freelance</option>
          <option value="Consulta">Consulta</option>
          <option value="Colaboración / Otro">Colaboración / Otro</option>
        </select>
        {errors.subject && (
          <span className="field-error" id="contact-subject-error">
            {errors.subject.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="contact-message">Mensaje</label>
        <textarea
          id="contact-message"
          rows="5"
          placeholder="¿En qué puedo ayudarte?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <span className="field-error" id="contact-message-error">
            {errors.message.message}
          </span>
        )}
      </div>

      <button className="button contact-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting && <span className="contact-spinner" aria-hidden="true" />}
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
        {!isSubmitting && <span aria-hidden="true">→</span>}
      </button>

      {/* Errores requieren alerta inmediata; éxitos y avisos se anuncian como estados no intrusivos. */}
      {status && (
        <p
          className={`form-status form-status--${status.type}`}
          role={status.type === 'error' ? 'alert' : 'status'}
        >
          {status.text}
        </p>
      )}
    </form>
  );
}
