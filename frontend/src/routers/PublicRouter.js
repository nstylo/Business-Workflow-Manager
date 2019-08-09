import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from '../components/pages/public/LandingPage';
import NotFound from '../components/pages/public/NotFound';

import MainLayout from '../components/fixed/MainLayout';

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
