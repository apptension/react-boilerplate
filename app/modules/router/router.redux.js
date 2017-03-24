import { Record } from 'immutable';
import { createReducer } from 'reduxsauce';
import { LOCATION_CHANGE } from 'react-router-redux';


const RouterRecord = new Record({
  locationBeforeTransitions: null,
});

export const INITIAL_STATE = new RouterRecord({});

export const locationChangeHandler = (state = INITIAL_STATE, action) => state.merge({
  locationBeforeTransitions: action.payload,
});

export const HANDLERS = {
  [LOCATION_CHANGE]: locationChangeHandler,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);
