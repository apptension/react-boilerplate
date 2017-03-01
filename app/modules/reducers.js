import { combineReducers } from 'redux-immutable';

import routerReducer from './router/router.reducer';
import localesReducer from './locales/locales.reducer';
import userReducer from './user/user.reducer';


export default function createReducer() {
  return combineReducers({
    route: routerReducer,
    user: userReducer,
    locales: localesReducer,
  });
}
