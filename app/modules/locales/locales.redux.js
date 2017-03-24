import { Record } from 'immutable';
import { createReducer, createActions } from 'reduxsauce';


export const DEFAULT_LOCALE = 'en';

export const { Types: LocalesTypes, Creators: LocalesActions } = createActions({
  setLanguage: ['language'],
}, { prefix: 'LOCALES_' });

const LocalesRecord = new Record({
  language: null,
});

export const INITIAL_STATE = new LocalesRecord({});

export const setLanguageHandler = (state = INITIAL_STATE, action) => state.set('language', action.language);

export const HANDLERS = {
  [LocalesTypes.SET_LANGUAGE]: setLanguageHandler,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);

