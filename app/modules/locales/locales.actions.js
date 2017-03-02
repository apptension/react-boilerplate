import { ACTION_TYPES } from './locales.constants';


export function setLanguage(data) {
  return {
    type: ACTION_TYPES.SET_LANGUAGE,
    payload: data,
  };
}
