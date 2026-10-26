import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { contactSchema } from '../../data/contactSchema.js';
import { CONTACT_SUBJECTS } from '../../data/contactSubjects.js';
import {
  ContactServiceError,
  sendContactMessage
} from '../../services/contactService.js';

export default function ContactForm() {
  const { t, i18n } = useTranslation();
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

  const errorText = (message) => (message ? t(message) : null);

  const onSubmit = async (values) => {
    setStatus(null);

    try {
      await sendContactMessage({
        ...values,
        subjectCode: values.subject,
        subjectLabel: t(`contact.subjects.${values.subject}`),
        subjectLabelEs: t(`contact.subjects.${values.subject}`, { lng: 'es' }),
        language: i18n.resolvedLanguage || 'es'
      });
      reset();
      setStatus({
        type: 'success',
        textKey: 'contact.form.success'
      });
    } catch (error) {
      console.error('No se pudo enviar el mensaje de contacto:', error);

      if (error instanceof ContactServiceError && error.code === 'autoresponder') {
        // La notificación ya se entregó; limpiar evita que el usuario reenvíe y duplique el mensaje.
        reset();
        setStatus({
          type: 'warning',
          textKey: 'contact.form.autoresponderWarning'
        });
        return;
      }

      setStatus({
        type: 'error',
        textKey:
          error instanceof ContactServiceError
            ? `contact.errors.${error.code}`
            : 'contact.form.genericError'
      });
    }
  };

  return (
    <form className="form contact-form" id="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-heading">
        <span className="contact-eyebrow">{t('contact.form.eyebrow')}</span>
        <h3>{t('contact.form.title')}</h3>
        <p>{t('contact.form.description')}</p>
      </div>

      <div className="form-group">
        <label htmlFor="contact-name">{t('contact.form.name')}</label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder={t('contact.form.namePlaceholder')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          {...register('name')}
        />
        {errors.name && (
          <span className="field-error" id="contact-name-error">
            {errorText(errors.name.message)}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="contact-email">{t('contact.form.email')}</label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder={t('contact.form.emailPlaceholder')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <span className="field-error" id="contact-email-error">
            {errorText(errors.email.message)}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="contact-subject">{t('contact.form.subject')}</label>
        <select
          id="contact-subject"
          defaultValue=""
          required
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          {...register('subject')}
        >
          <option value="" disabled>
            {t('contact.form.subjectPlaceholder')}
          </option>
          {CONTACT_SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {t(`contact.subjects.${subject}`)}
            </option>
          ))}
        </select>
        {errors.subject && (
          <span className="field-error" id="contact-subject-error">
            {errorText(errors.subject.message)}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="contact-message">{t('contact.form.message')}</label>
        <textarea
          id="contact-message"
          rows="5"
          placeholder={t('contact.form.messagePlaceholder')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <span className="field-error" id="contact-message-error">
            {errorText(errors.message.message)}
          </span>
        )}
      </div>

      <button className="button contact-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting && <span className="contact-spinner" aria-hidden="true" />}
        {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
        {!isSubmitting && <span aria-hidden="true">→</span>}
      </button>

      {/* Errores requieren alerta inmediata; éxitos y avisos se anuncian como estados no intrusivos. */}
      {status && (
        <p
          className={`form-status form-status--${status.type}`}
          role={status.type === 'error' ? 'alert' : 'status'}
        >
          {t(status.textKey)}
        </p>
      )}
    </form>
  );
}
