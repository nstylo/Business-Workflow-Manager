import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import './App.css';

import NotFound from './components/pages/main/NotFound';
import AuthRouter from './routers/AuthRouter';
import UserRouter from './routers/UserRouter';
import MainRouter from './routers/MainRouter';

import ReactGA from 'react-ga';

ReactGA.initialize('UA-145153613-1');
ReactGA.pageview(window.location.pathname + window.location.search);
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

// <Route component={MainLayout}>
//   <Route exact path="/" component={MainPage} />
// </Route>
// <Route path="/user/" component={UserLayout}>
//   <Route exact path="/upload/" component={FileUploadPage} />
// </Route>
// <Route component={NotFound} />
