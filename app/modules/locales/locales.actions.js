import { ACTION_TYPES } from './locales.constants';


export function setLang(data) {
  return {
    type: ACTION_TYPES.SET_LANG,
    payload: data,
  };
}
