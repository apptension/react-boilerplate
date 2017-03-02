import { Record } from 'immutable';

import { DEFAULT_LOCALE, SET_LANG } from './locales.constants';


const StateRecord = new Record({
  lang: DEFAULT_LOCALE,
});

const initialState = new StateRecord({});

export default function localesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LANG:
      return state.set('lang', action.payload);
    default:
      return state;
  }
}
