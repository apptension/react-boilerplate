import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './app.container';
import HomeRoute from './home';
import NotFoundRoute from './notFound';

export default (
  <Switch>
    <Route component={App}>
      <Route path="/" component={HomeRoute} />

      <Route path="/:lang" component={HomeRoute} />

      <Route path="*" component={NotFoundRoute} />
    </Route>
  </Switch>
);
