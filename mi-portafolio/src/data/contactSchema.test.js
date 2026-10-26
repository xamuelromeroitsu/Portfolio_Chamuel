import { describe, expect, it } from 'vitest';
import { contactSchema } from './contactSchema.js';
import { CONTACT_SUBJECTS } from './contactSubjects.js';

describe('contactSchema', () => {
  it('accepts valid contact data and trims text fields', () => {
    const result = contactSchema.safeParse({
      name: '  Chamuel Romero  ',
      email: '  chamuel@example.com  ',
      subject: 'freelance',
      message: '  Me gustaría conversar sobre un proyecto.  '
    });

    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      name: 'Chamuel Romero',
      email: 'chamuel@example.com',
      subject: 'freelance',
      message: 'Me gustaría conversar sobre un proyecto.'
    });
  });

  it('rejects invalid and missing contact fields with translation keys', () => {
    const result = contactSchema.safeParse({
      name: 'A',
      email: 'correo-invalido',
      subject: 'invalid',
      message: 'corto'
    });

    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors).toMatchObject({
      name: ['contact.errors.name'],
      email: ['contact.errors.email'],
      subject: ['contact.errors.subject'],
      message: ['contact.errors.message']
    });
  });

  it('accepts all configured contact reasons', () => {
    for (const subject of CONTACT_SUBJECTS) {
      expect(
        contactSchema.safeParse({
          name: 'Chamuel',
          email: 'chamuel@example.com',
          subject,
          message: 'Mensaje de prueba válido.'
        }).success
      ).toBe(true);
    }
  });
});
