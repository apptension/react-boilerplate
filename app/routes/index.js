import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';

import IntlProvider from '../utils/IntlProvider.container';
import { DEFAULT_LOCALE } from '../modules/locales/locales.constants';
import App from './app.container';
import HomeRoute from './home';

const appRoutes = (
  <Route path="/" component={App}>
    {HomeRoute}
  </Route>
);

const Root = ({ store, history, render }) => (
  <Provider store={store}>
    <IntlProvider locale={DEFAULT_LOCALE}>
      <Router history={history} routes={appRoutes} render={render} />
    </IntlProvider>
  </Provider>
);


Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  render: PropTypes.func,
};

export default Root;
