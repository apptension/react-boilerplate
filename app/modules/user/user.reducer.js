import { fromJS, Record } from 'immutable';
import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAIL } from './user.constants';


const StateRecord = new Record({
  data: null,
});

const initialState = new StateRecord({});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return state;
    case GET_USERS_SUCCESS:
      return state
        .set('data', fromJS(action.data));
    case GET_USERS_FAIL:
      return state;
    default:
      return state;
  }
}

export default userReducer;
