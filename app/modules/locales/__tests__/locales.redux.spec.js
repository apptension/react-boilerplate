import { expect } from 'chai';
import { fromJS } from 'immutable';

import { reducer as localesReducer, LocalesActions, LocalesTypes } from '../locales.redux';


describe('Locales: redux', () => {
  const state = fromJS({
    language: null,
  });

  describe('reducer', () => {
    it('should return initial state', () => {
      expect(localesReducer(undefined, {}).toJS()).to.deep.equal(state.toJS());
    });

    it('should return state on unknown action', () => {
      expect(localesReducer(state, { type: 'unknown-action' }).toJS()).to.deep.equal(state.toJS());
    });

    it('should set data on SET_LANGUAGE', () => {
      const language = 'en';
      const expectedState = state.set('language', language);
      const action = { language, type: LocalesTypes.SET_LANGUAGE };
      expect(localesReducer(state, action).toJS()).to.deep.equal(expectedState.toJS());
    });
  });

  describe('setLanguage', () => {
    it('should return correct type', () => {
      expect(LocalesActions.setLanguage().type).to.equal(LocalesTypes.SET_LANGUAGE);
    });

    it('should return proper payload', () => {
      const language = 'en';
      expect(LocalesActions.setLanguage(language).language).to.deep.equal(language);
    });
  });
});
