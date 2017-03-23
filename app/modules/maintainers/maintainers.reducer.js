import { fromJS, Record, List } from 'immutable';
import { createReducer } from 'reduxsauce';

import { maintainersActionsTypes } from './maintainers.actions';


const StateRecord = new Record({
  list: List(),
});

export const INITIAL_STATE = new StateRecord({});

export const getSuccessHandler = (state = INITIAL_STATE, action) => state.set('list', fromJS(action.payload));

export const HANDLERS = {
  [maintainersActionsTypes.GET_MAINTAINERS_SUCCESS]: getSuccessHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
