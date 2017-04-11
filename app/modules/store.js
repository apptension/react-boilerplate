import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import { fromJS, Iterable } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import rootSaga from './sagas';


const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [];

  if (process.env.NODE_ENV === 'development') {
    const { persistState } = require('redux-devtools');

    const stateTransformer = (state) => {
      if (Iterable.isIterable(state)) {
        return state.toJS();
      }
      return state;
    };

    middlewares.push(createLogger({ stateTransformer }));

    const getDebugSessionKey = () => {
      const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
      return (matches && matches.length > 0) ? matches[1] : null;
    };

    Array.prototype.push.apply(enhancers, [
      require('../utils/devtools.component').default.instrument(),
      persistState(getDebugSessionKey(), (state) => fromJS(state)),
    ]);
  }

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    compose(
      applyMiddleware(...middlewares),
      ...enhancers,
    )
  );

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const createReducers = require('./reducers').default;
      const nextReducers = createReducers(store.asyncReducers);

      store.replaceReducer(nextReducers);
    });
  }

  return store;
}
