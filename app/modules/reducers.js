import { combineReducers } from 'redux-immutable';

import routerReducer from './router/router.reducer';
import localesReducer from './locales/locales.reducer';
import maintainersReducer from './maintainers/maintainers.reducer';


export default function createReducer() {
  return combineReducers({
    route: routerReducer,
    maintainers: maintainersReducer,
    locales: localesReducer,
  });
}
