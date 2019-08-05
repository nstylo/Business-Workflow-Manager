import React from 'react';
import { Route, Switch } from 'react-router-dom';

import FileUploadPage from '../components/pages/user/FileUploadPage';

import UserLayout from '../components/fixed/UserLayout';
import NotFound from '../components/pages/main/NotFound';

export default ({ match }) => {
  return (
    <UserLayout>
      <Switch>
        <Route exact path={`${match.url}/upload`} component={FileUploadPage} />
        <Route component={NotFound} />
      </Switch>
    </UserLayout>
  );
};
