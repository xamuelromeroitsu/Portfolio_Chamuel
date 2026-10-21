// React Hook Form administra valores/errores y zodResolver conecta el formulario con el esquema Zod.
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Las reglas de campos están en data/contactSchema.js y también se usan en el servidor.
import { contactSchema } from '../../data/contactSchema';

export default function ContactForm() {
  const [status, setStatus] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values) => {
    setStatus(null);
    try {
      // El endpoint guarda el mensaje a través del backend; modifica la ruta solo si cambia la API.
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      if (!response.ok) throw new Error('Error en el servidor');
      setStatus({ type: 'success', text: 'Mensaje enviado correctamente. ¡Gracias!' });
      reset();
    } catch {
      setStatus({ type: 'error', text: 'No se pudo enviar el mensaje. Inténtalo de nuevo.' });
    }
  };

  return (
    <form className="form" id="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label>
        Nombre
        <input type="text" {...register('name')} />
        {errors.name && <small className="field-error">{errors.name.message}</small>}
      </label>
      <label>
        Correo
        <input type="email" {...register('email')} />
        {errors.email && <small className="field-error">{errors.email.message}</small>}
      </label>
      <label>
        Mensaje
        <textarea rows="5" {...register('message')} />
        {errors.message && <small className="field-error">{errors.message.message}</small>}
      </label>
      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </button>
      {status && (
        <p className={`form-message${status.type === 'error' ? ' form-message--error' : ''}`}>
          {status.text}
        </p>
      )}
    </form>
  );
}
