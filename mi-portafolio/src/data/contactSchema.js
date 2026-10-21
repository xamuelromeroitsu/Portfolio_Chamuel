import { z } from 'zod';

// Zod valida y normaliza el formulario tanto en el cliente como en la API de Express.
export const contactSchema = z.object({
  // Cambia estos límites y mensajes si decides permitir otros formatos o longitudes.
  name: z.string().trim().min(2, 'El nombre es muy corto.'),
  email: z.string().trim().email('Ingresa un correo válido.'),
  message: z.string().trim().min(10, 'El mensaje debe tener al menos 10 caracteres.')
});
