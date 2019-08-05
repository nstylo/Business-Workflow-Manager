import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from '../components/pages/main/MainPage';

import MainLayout from '../components/fixed/MainLayout';
import NotFound from '../components/pages/main/NotFound';

export default ({ match }) => {
  return (
    <MainLayout>
      <Switch>
        <Route exact path={`${match.url}`} component={MainPage} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
};
