import { expect } from 'chai';
import { fromJS } from 'immutable';

import maintainersReducer from '../maintainers.reducer';
import { ACTION_TYPES } from '../maintainers.constants';


describe('Maintainers: reducer', () => {
  const state = fromJS({
    list: [],
  });

  it('should return initial state', () => {
    expect(maintainersReducer(undefined, {}).equals(state)).to.be.equal(true);
  });

  it('should return state on unknown action', () => {
    expect(maintainersReducer(state, { type: 'unknown-action' })).to.be.equal(state);
  });

  it('should set data on GET_SUCCESS', () => {
    const payload = ['object-1', 'object-2'];
    const expectedState = state.set('list', payload);
    const action = { payload, type: ACTION_TYPES.GET_SUCCESS };
    expect(maintainersReducer(state, action).toJS()).to.deep.equal(expectedState.toJS());
  });
});
