import { expect } from 'chai';
import { fromJS } from 'immutable';

import { reducer as maintainersReducer, MaintainersActions, MaintainersTypes } from '../maintainers.redux';


describe('Maintainers: redux', () => {
  const state = fromJS({
    items: [],
  });

  describe('reducer', () => {
    it('should return initial state', () => {
      expect(maintainersReducer(undefined, {}).toJS()).to.deep.equal(state.toJS());
    });

    it('should return state on unknown action', () => {
      expect(maintainersReducer(state, { type: 'unknown-action' }).toJS()).to.deep.equal(state.toJS());
    });

    it('should set data on FETCH_SUCCESS', () => {
      const data = ['object-1', 'object-2'];
      const expectedState = state.set('items', data);
      const action = { data, type: MaintainersTypes.FETCH_SUCCESS };
      expect(maintainersReducer(state, action).toJS()).to.deep.equal(expectedState.toJS());
    });
  });

  describe('fetch', () => {
    it('should return correct type', () => {
      expect(MaintainersActions.fetch().type).to.equal(MaintainersTypes.FETCH);
    });

    it('should return proper payload', () => {
      const language = 'en';
      expect(MaintainersActions.fetch(language).language).to.deep.equal(language);
    });
  });

  describe('fetchSuccess', () => {
    it('should return correct type', () => {
      expect(MaintainersActions.fetchSuccess().type).to.equal(MaintainersTypes.FETCH_SUCCESS);
    });

    it('should return proper payload', () => {
      const data = { key: 'value' };
      expect(MaintainersActions.fetchSuccess(data).data).to.equal(data);
    });
  });

  describe('fetchError', () => {
    it('should return correct type', () => {
      expect(MaintainersActions.fetchError().type).to.equal(MaintainersTypes.FETCH_ERROR);
    });

    it('should return proper payload', () => {
      const error = { prop: 'value' };
      expect(MaintainersActions.fetchError(error).payload).to.equal(error);
    });
  });
});
