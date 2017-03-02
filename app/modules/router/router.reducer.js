import { Record } from 'immutable';
import { createReducer } from 'reduxsauce';
import { LOCATION_CHANGE } from 'react-router-redux';


const StateRecord = new Record({
  locationBeforeTransitions: null,
});

export const INITIAL_STATE = new StateRecord({});

export const locationChangeHandler = (state = INITIAL_STATE, action) => state.merge({
  locationBeforeTransitions: action.payload,
});

export const HANDLERS = {
  [LOCATION_CHANGE]: locationChangeHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
