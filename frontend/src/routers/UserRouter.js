import React from 'react';
import { Route, Switch } from 'react-router-dom';

import UserUploadPage from '../components/pages/user/UserUploadPage';
import UserProjectPage from '../components/pages/user/UserProjectPage';
import UserMainPage from '../components/pages/user/UserMainPage';

import UserRoute from './UserRoute';
import NotFound from '../components/pages/public/NotFound';

export default ({ match }) => {
  return (
    <Switch>
      <UserRoute exact path={`${match.url}`} component={UserMainPage} />
      <UserRoute
        exact
        path={`${match.url}/upload/`}
        component={UserUploadPage}
      />
      <UserRoute
        exact
        path={`${match.url}/projects/`}
        component={UserProjectPage}
      />
      <Route component={NotFound} />
    </Switch>
  );
};
