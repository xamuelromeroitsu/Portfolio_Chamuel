import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'El nombre es muy corto.'),
  email: z.string().trim().email('Ingresa un correo válido.'),
  message: z.string().trim().min(10, 'El mensaje debe tener al menos 10 caracteres.')
});
