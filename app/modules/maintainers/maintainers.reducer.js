import { fromJS, Record } from 'immutable';
import { GET_MAINTAINERS, GET_MAINTAINERS_SUCCESS, GET_MAINTAINERS_FAIL } from './maintainers.constants';


const StateRecord = new Record({
  data: null,
});

const initialState = new StateRecord({});

function maintainersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MAINTAINERS:
      return state;
    case GET_MAINTAINERS_SUCCESS:
      return state
        .set('data', fromJS(action.data));
    case GET_MAINTAINERS_FAIL:
      return state;
    default:
      return state;
  }
}

export default maintainersReducer;
