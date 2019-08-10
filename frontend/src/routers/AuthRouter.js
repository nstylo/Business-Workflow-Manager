import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../components/pages/auth/LoginPage';
import LogoutPage from '../components/pages/auth/LogoutPage';
import RegistrationPage from '../components/pages/auth/RegistrationPage';
import SuccessfulRegisterPage from '../components/pages/auth/SuccessfulRegisterPage';
import ResetPage from '../components/pages/auth/ResetPage';
import SuccessfulResetPage from '../components/pages/auth/SuccessfulResetPage';
import RequestResetPage from '../components/pages/auth/RequestResetPage';
import SuccessfulRequestResetPage from '../components/pages/auth/SuccessfulRequestResetPage';

import AuthLayout from '../components/fixed/AuthLayout';
import NotFound from '../components/pages/public/NotFound';

import VerificationEmailSentPage from '../components/pages/auth/VerificationEmailSentPage';
import VerifyRegistrationPage from '../components/pages/auth/VerifyRegistrationPage';

export default ({ match }) => {
  return (
    <AuthLayout>
      <Switch>
        <Route exact path={`${match.url}/login`} component={LoginPage} />
        <Route
          exact
          path={`${match.url}/register`}
          component={RegistrationPage}
        />
        <Route
          exact
          path={`${match.url}/register-successful`}
          component={SuccessfulRegisterPage}
        />
        <Route exact path={`${match.url}/logout`} component={LogoutPage} />
        <Route exact path={`${match.url}/reset`} component={ResetPage} />
        <Route
          exact
          path={`${match.url}/request-reset`}
          component={RequestResetPage}
        />
        <Route
          exact
          path={`${match.url}/request-reset-successful`}
          component={SuccessfulRequestResetPage}
        />
        <Route
          exact
          path={`${match.url}/reset-successful`}
          component={SuccessfulResetPage}
        />
        <Route
          path={`${match.url}/verification-email-sent`}
          component={VerificationEmailSentPage}
        />
        <Route
          path={`${match.url}/verify-user`}
          component={VerifyRegistrationPage}
        />
        <Route component={NotFound} />
      </Switch>
    </AuthLayout>
  );
};
