import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from '../modules/locales/locales.redux';

import App from './app.container';
import { Home } from './home';
import { NotFound } from './notFound';

import { ConfirmEmail } from './userAuth/confirmEmail';
import { ResetPassword } from './userAuth/resetPassword';
import { Login } from './userAuth/login';
import { RecoverPassword } from './userAuth/recoverPassword';
import { Register } from './userAuth/register';
//<-- IMPORT ROUTE -->

export class RootContainer extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to={DEFAULT_LOCALE} />} />

        <Route exact path="/404" component={NotFound} />

        <Route path="/:lang">
          <App>
            <Switch>
              <Route exact path="/:lang" component={Home} />

              <Route exact path="/:lang/login" component={Login} />

              <Route exact path="/:lang/register" component={Register} />

              <Route exact path="/:lang/confirm-email/:uid/:token/" component={ConfirmEmail} />

              <Route exact path="/:lang/reset-password-confirm" component={ResetPassword} />

              <Route exact path="/:lang/reset-password-confirm/:user/:token/" render={({ match }) => {
                const location = {
                  pathname: '/reset-password-confirm',
                  state: {
                    user: match.params.user,
                    token: match.params.token,
                  },
                };

                return <Redirect to={location} />;
              }}
              />

              <Route path="/:lang/recover-password" component={RecoverPassword} />

              <Route component={NotFound} />
            </Switch>
          </App>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(RootContainer);
