import { describe, expect, it } from 'vitest';
import { contactSchema } from './contactSchema.js';

describe('contactSchema', () => {
  it('accepts valid contact data and trims text fields', () => {
    const result = contactSchema.safeParse({
      name: '  Chamuel Romero  ',
      email: '  chamuel@example.com  ',
      subject: 'Proyecto freelance',
      message: '  Me gustaría conversar sobre un proyecto.  '
    });

    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      name: 'Chamuel Romero',
      email: 'chamuel@example.com',
      subject: 'Proyecto freelance',
      message: 'Me gustaría conversar sobre un proyecto.'
    });
  });

  it('rejects invalid and missing contact fields', () => {
    const result = contactSchema.safeParse({
      name: 'A',
      email: 'correo-invalido',
      subject: 'Sin categoría',
      message: 'corto'
    });

    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors).toMatchObject({
      name: ['El nombre es muy corto.'],
      email: ['Ingresa un correo válido.'],
      subject: ['Selecciona el motivo de contacto.'],
      message: ['El mensaje debe tener al menos 10 caracteres.']
    });
  });

  it('accepts all configured contact reasons', () => {
    const subjects = [
      'Oferta laboral',
      'Proyecto freelance',
      'Consulta',
      'Colaboración / Otro'
    ];

    for (const subject of subjects) {
      expect(contactSchema.safeParse({
        name: 'Chamuel',
        email: 'chamuel@example.com',
        subject,
        message: 'Mensaje de prueba válido.'
      }).success).toBe(true);
    }
  });
});
