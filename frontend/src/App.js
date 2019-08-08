import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import './App.css';

import NotFound from './components/pages/main/NotFound';
import AuthRouter from './routers/AuthRouter';
import UserRouter from './routers/UserRouter';
import MainRouter from './routers/MainRouter';

/**
 * return and export this app
 */
export default () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/auth" component={AuthRouter} />
        <Route path="/user" component={UserRouter} />
        <Route path="/" component={MainRouter} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
