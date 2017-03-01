import { Record } from 'immutable';
import { reduce, isObject, isObjectLike, isEmpty } from 'lodash';

import { DEFAULT_LOCALE, SET_LANG } from './locales.constants';
import en from '../../translations/en.json';
import de from '../../translations/de.json';


const translations = {
  en,
  de,
};

const unpath = (obj, prefix = '', accumulator = {}) => {
  if (!isObjectLike(obj)) {
    throw new TypeError('unpath function: first argument must be an object');
  }
  return reduce(obj, (result, val, key) => {
    const currentKeyName = isEmpty(prefix) ? key : `${prefix}.${key}`;
    if (isObject(val)) {
      return unpath(val, currentKeyName, accumulator);
    }
    accumulator[currentKeyName] = val;
    return { ...result, [currentKeyName]: val };
  }, accumulator);
};

const StateRecord = new Record({
  lang: DEFAULT_LOCALE,
  messages: unpath(translations[DEFAULT_LOCALE]),
});

const initialState = new StateRecord({});

export default function localesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LANG:
      return state.merge({
        lang: action.payload,
        messages: unpath(translations[action.payload]),
      });
    default:
      return state;
  }
}
