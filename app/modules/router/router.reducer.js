import { Record } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';


const StateRecord = new Record({
  locationBeforeTransitions: null,
});

const initialState = new StateRecord({});

function routeReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

export default routeReducer;
