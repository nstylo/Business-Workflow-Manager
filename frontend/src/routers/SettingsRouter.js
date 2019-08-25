import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LayoutRoute from './LayoutRoute';
import SettingsLayout from '../components/fixed/SettingsLayout';
import SettingsMainPage from '../components/pages/user/settings/SettingsMainPage';
import Account from '../components/pages/user/settings/Account';
import Profile from '../components/pages/user/settings/Profile';
import Billing from '../components/pages/user/settings/Billing';
import NotFound from '../components/pages/public/NotFound';

export default ({ match }) => {
  return (
    <Switch>
      <LayoutRoute
        exact
        path={`${match.url}`}
        layout={SettingsLayout}
        component={SettingsMainPage}
      />
      <LayoutRoute
        exact
        path={`${match.url}/account/`}
        layout={SettingsLayout}
        component={Account}
      />
      <LayoutRoute
        exact
        path={`${match.url}/profile`}
        layout={SettingsLayout}
        component={Profile}
      />
      <LayoutRoute
        exact
        path={`${match.url}/billing`}
        layout={SettingsLayout}
        component={Billing}
      />
      <Route component={NotFound} />
    </Switch>
  );
};
