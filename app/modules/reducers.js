import { combineReducers } from 'redux-immutable';
//<-- IMPORT LIB REDUCER -->

import { reducer as routerReducer } from './router/router.redux';
import { reducer as localesReducer } from './locales/locales.redux';
import { reducer as maintainersReducer } from './maintainers/maintainers.redux';
//<-- IMPORT MODULE REDUCER -->

export default function createReducer() {
  return combineReducers({
    //<-- INJECT LIB REDUCER -->
    route: routerReducer,
    maintainers: maintainersReducer,
    locales: localesReducer,
    //<-- INJECT MODULE REDUCER -->
  });
}
