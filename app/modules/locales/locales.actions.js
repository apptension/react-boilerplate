import { SET_LANG } from './locales.constants';


export function setLang(data) {
  return {
    type: SET_LANG,
    payload: data,
  };
}
