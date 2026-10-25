import { z } from 'zod';

// Este esquema vive en data porque define el contrato de entrada del formulario, separado de la UI.
export const contactSchema = z.object({
  // Cambia estos límites y mensajes si decides permitir otros formatos o longitudes.
  name: z.string().trim().min(2, 'El nombre es muy corto.'),
  email: z.string().trim().email('Ingresa un correo válido.'),
  subject: z.enum([
    'Oferta laboral',
    'Proyecto freelance',
    'Consulta',
    'Colaboración / Otro'
  ], {
    errorMap: () => ({ message: 'Selecciona el motivo de contacto.' })
  }),
  message: z.string().trim().min(10, 'El mensaje debe tener al menos 10 caracteres.')
});
