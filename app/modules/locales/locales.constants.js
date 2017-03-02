import { createTypes } from 'reduxsauce';


export const DEFAULT_LOCALE = 'en';

export const ACTION_TYPES = createTypes(`
  SET_LANG
`, { prefix: 'LOCALES_' });
