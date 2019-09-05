import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from '../components/pages/public/LandingPage';
import Solutions from '../components/pages/public/Solutions';
import About from '../components/pages/public/About';
import Contact from '../components/pages/public/Contact';
import NotFound from '../components/pages/public/NotFound';

import MainLayout from '../components/fixed/MainLayout';

export default ({ match }) => {
  return (
    <MainLayout>
      <Switch>
        <Route exact path={`${match.url}home`} component={LandingPage} />
        <Route exact path={`${match.url}solutions`} component={Solutions} />
        <Route exact path={`${match.url}about`} component={About} />
        <Route exact path={`${match.url}contact`} component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
};
