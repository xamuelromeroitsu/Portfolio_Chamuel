import { describe, expect, it } from 'vitest';
import en from './locales/en.json';
import es from './locales/es.json';
import pt from './locales/pt.json';

const locales = { en, es, pt };

const compareShape = (reference, candidate, path = 'translation') => {
  if (Array.isArray(reference)) {
    expect(Array.isArray(candidate), `${path} should be an array`).toBe(true);
    expect(candidate, `${path} should have the same length`).toHaveLength(reference.length);
    reference.forEach((value, index) => {
      compareShape(value, candidate[index], `${path}[${index}]`);
    });
    return;
  }

  if (reference && typeof reference === 'object') {
    expect(
      candidate && typeof candidate === 'object' && !Array.isArray(candidate),
      `${path} should be an object`
    ).toBe(true);

    expect(
      Object.keys(candidate).sort(),
      `${path} should have the same keys`
    ).toEqual(Object.keys(reference).sort());

    Object.keys(reference).forEach((key) => {
      compareShape(reference[key], candidate[key], `${path}.${key}`);
    });
    return;
  }

  expect(typeof candidate, `${path} should have the same type`).toBe(typeof reference);
};

describe('locales', () => {
  it('uses Spanish as the reference shape for all languages', () => {
    compareShape(es, en);
    compareShape(es, pt);
  });

  it('keeps the same project ids in every language', () => {
    expect(Object.keys(locales.en.projects.items).sort()).toEqual(
      Object.keys(locales.es.projects.items).sort()
    );
    expect(Object.keys(locales.pt.projects.items).sort()).toEqual(
      Object.keys(locales.es.projects.items).sort()
    );
  });

  it('has a title and description for every language', () => {
    Object.values(locales).forEach((locale) => {
      expect(locale.meta.title).toBeTruthy();
      expect(locale.meta.description).toBeTruthy();
    });
  });
});
