import React from 'react';
import { Route } from 'react-router';

import App from './app.container';
import HomeRoute from './home';
import NotFoundRoute from './notFound';

const routes = (
  <Route>
    {HomeRoute}

    <Route path="404">
      {NotFoundRoute}
    </Route>
  </Route>
);

export default (
  <Route component={App}>
    <Route path="/">
      {routes}
    </Route>

    <Route path="/:lang">
      {routes}
    </Route>

    <Route path="*">
      {NotFoundRoute}
    </Route>
  </Route>
);
