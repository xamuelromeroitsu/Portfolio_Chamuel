import { initTheme } from './modules/theme.js';
import { initProjectFilter } from './modules/projectFilter.js';
import { initFormValidation } from './modules/formValidation.js';

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initProjectFilter();
  initFormValidation();
});
