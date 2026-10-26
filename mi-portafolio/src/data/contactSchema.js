import { z } from 'zod';
import { CONTACT_SUBJECTS } from './contactSubjects.js';

// Este esquema vive en data porque define el contrato de entrada del formulario.
// Los mensajes son claves de traducción; `ContactForm` los resuelve con
// `t(message)`. Las materias vienen de `CONTACT_SUBJECTS` para no duplicar códigos.
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'contact.errors.name'),
  email: z.string().trim().email('contact.errors.email'),
  subject: z.enum(CONTACT_SUBJECTS, {
    errorMap: () => ({ message: 'contact.errors.subject' })
  }),
  message: z.string().trim().min(10, 'contact.errors.message')
});
