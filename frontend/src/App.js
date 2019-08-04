import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import TopNav from './components/fixed/TopNav';
import MainPage from './components/pages/main/MainPage';
import LoginPage from './components/pages/auth/LoginPage';
import RegistrationPage from './components/pages/auth/RegistrationPage';
import SuccessfulRegisterPage from './components/pages/auth/SuccessfulRegisterPage';
import ResetPage from './components/pages/auth/ResetPage';
import SuccessfulResetPage from './components/pages/auth/SuccessfulResetPage';
import RequestResetPage from './components/pages/auth/RequestResetPage';
import SuccessfulRequestResetPage from './components/pages/auth/SuccessfulRequestResetPage';
import LogoutPage from './components/pages/auth/LogoutPage';
import FileUploadPage from './components/pages/user/FileUploadPage';
import NotFound from './components/pages/main/NotFound';

// TEMP!!!!
import VerifyRegistrationPage from './components/pages/auth/VerifyRegistrationPage';

/**
 * return and export this app
 */
function App() {
  return (
    <Router>
      <Route path="/" component={TopNav} />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route
          exact
          path="/register-successful"
          component={SuccessfulRegisterPage}
        />
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/reset" component={ResetPage} />
        <Route exact path="/request-reset" component={RequestResetPage} />
        <Route
          exact
          path="/request-reset-successful"
          component={SuccessfulRequestResetPage}
        />
        <Route exact path="/reset-successful" component={SuccessfulResetPage} />
        <Route path="/verify-user/" component={VerifyRegistrationPage} />
        <Route exact path="/user/upload" component={FileUploadPage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
