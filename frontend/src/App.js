import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import TopNav from './components/fixed/TopNav';
import MainPage from './components/MainPage';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import SuccessfulRegisterPage from './components/auth/SuccessfulRegisterPage';
import ResetPage from './components/auth/ResetPage';
import SuccessfulResetPage from './components/auth/SuccessfulResetPage';
import RequestResetPage from './components/auth/RequestResetPage';
import SuccessfulRequestResetPage from './components/auth/SuccessfulRequestResetPage';
import LogoutPage from './components/auth/LogoutPage';
import FileUploadPage from './components/user/FileUploadPage';
import NotFound from './components/NotFound';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-145153613-1');
ReactGA.pageview(window.location.pathname + window.location.search);

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
        <Route exact path="/register-successful" component={SuccessfulRegisterPage} />
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/reset" component={ResetPage} />
        <Route exact path="/request-reset" component={RequestResetPage} />
        <Route exact path="/request-reset-successful" component={SuccessfulRequestResetPage} />
        <Route exact path="/reset-successful" component={SuccessfulResetPage} />
        <Route path="/user/upload" component={FileUploadPage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
