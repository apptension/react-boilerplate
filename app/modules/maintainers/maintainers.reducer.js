import { fromJS, Record } from 'immutable';
import { createReducer } from 'reduxsauce';

import { ACTION_TYPES } from './maintainers.constants';


const StateRecord = new Record({
  data: null,
});

export const INITIAL_STATE = new StateRecord({});

export const getSuccessHandler = (state = INITIAL_STATE, action) => state.set('data', fromJS(action.data));

export const HANDLERS = {
  [ACTION_TYPES.GET_SUCCESS]: getSuccessHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
