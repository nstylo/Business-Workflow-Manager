import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
    <Router>
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
