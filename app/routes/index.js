import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './app.container';
import Home from './home';
import NotFound from './notFound';

export class RootContainer extends PureComponent {
  render() {
    return (
      <App>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/:lang" component={Home} />

          <Route component={NotFound} />
        </Switch>
      </App>
    );
  }
}

export default RootContainer;
