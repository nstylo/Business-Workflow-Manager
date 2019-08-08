import React from 'react';
import { Route, Switch } from 'react-router-dom';

import UserUploadPage from '../components/pages/user/UserUploadPage';
import UserMainPage from '../components/pages/user/UserMainPage';

import UserLayout from '../components/fixed/UserLayout';
import NotFound from '../components/pages/public/NotFound';

export default ({ match }) => {
  return (
    <UserLayout>
      <Switch>
        <Route exact path={`${match.url}`} component={UserMainPage} />
        <Route exact path={`${match.url}/upload`} component={UserUploadPage} />
        <Route component={NotFound} />
      </Switch>
    </UserLayout>
  );
};
