import { describe, expect, it } from 'vitest';
import {
  getNextLanguage,
  replaceLanguageInPath
} from './languages.js';

describe('language helpers', () => {
  it('cycles through the supported languages', () => {
    expect(getNextLanguage('es').code).toBe('en');
    expect(getNextLanguage('en').code).toBe('pt');
    expect(getNextLanguage('pt').code).toBe('es');
    expect(getNextLanguage('unknown').code).toBe('es');
  });

  it('replaces the language segment of a path', () => {
    expect(replaceLanguageInPath('/es/', 'en')).toBe('/en/');
    expect(replaceLanguageInPath('/pt/', 'es')).toBe('/es/');
    expect(replaceLanguageInPath('/es', 'pt')).toBe('/pt/');
  });

  it('adds the language segment when the path has none', () => {
    expect(replaceLanguageInPath('/', 'en')).toBe('/en/');
    expect(replaceLanguageInPath('', 'pt')).toBe('/pt/');
  });
});
