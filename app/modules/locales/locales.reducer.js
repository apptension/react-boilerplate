import { Record } from 'immutable';
import { createReducer } from 'reduxsauce';

import { ACTION_TYPES } from './locales.constants';


const StateRecord = new Record({
  language: null,
});

export const INITIAL_STATE = new StateRecord({});

export const setLanguageHandler = (state = INITIAL_STATE, action) => state.set('language', action.payload);

export const HANDLERS = {
  [ACTION_TYPES.SET_LANGUAGE]: setLanguageHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);

