import { Record } from 'immutable';
import { createReducer } from 'reduxsauce';

import { DEFAULT_LOCALE, ACTION_TYPES } from './locales.constants';


const StateRecord = new Record({
  lang: DEFAULT_LOCALE,
});

export const INITIAL_STATE = new StateRecord({});

export const setLangHandler = (state = INITIAL_STATE, action) => state.set('lang', action.payload);

export const HANDLERS = {
  [ACTION_TYPES.SET_LANG]: setLangHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);

