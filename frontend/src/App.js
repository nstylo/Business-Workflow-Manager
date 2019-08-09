import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import './App.css';

import NotFound from './components/pages/public/NotFound';
import AuthRouter from './routers/AuthRouter';
import UserRouter from './routers/UserRouter';
import PublicRouter from './routers/PublicRouter';
import ProtectedRoute from './routers/ProtectedRoute';

/**
 * return and export this app
 */
export default () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/auth" component={AuthRouter} />
        <ProtectedRoute path="/user" component={UserRouter} />
        <Route path="/" component={PublicRouter} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
