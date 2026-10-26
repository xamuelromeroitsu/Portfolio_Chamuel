import { describe, expect, it } from 'vitest';
import i18n, { getLanguageFromPath } from './index.js';

describe('i18n configuration', () => {
  it('starts in Spanish outside the browser', () => {
    expect(i18n.language).toBe('es');
    expect(i18n.t('nav.home')).toBe('Inicio');
  });

  it('resolves the language from the URL path', () => {
    expect(getLanguageFromPath('/es/')).toBe('es');
    expect(getLanguageFromPath('/en/#contacto')).toBe('en');
    expect(getLanguageFromPath('/pt/')).toBe('pt');
    expect(getLanguageFromPath('/')).toBe('es');
    expect(getLanguageFromPath('/asignacion-01/')).toBe('es');
  });

  it('returns project copies as objects', () => {
    const project = i18n.t('projects.items.asignacion-01', { returnObjects: true });

    expect(project).toMatchObject({
      title: expect.any(String),
      description: expect.any(String),
      tags: expect.any(Array)
    });
  });
});
