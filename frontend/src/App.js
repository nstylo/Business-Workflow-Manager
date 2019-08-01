import React from 'react';
import LoginPage from './components/auth/LoginPage';
import ResetPage from './components/auth/ResetPage';
import SuccessfulRegisterPage from './components/auth/SuccessfulRegisterPage';
import SuccessfulResetPage from './components/auth/SuccessfulResetPage';
import LogoutPage from './components/auth/LogoutPage';
import RegistrationPage from './components/auth/RegistrationPage';
import FileUploadPage from './components/user/FileUploadPage';
import TopNav from './components/fixed/TopNav';
import NotFound from './components/NotFound';
import MainPage from './components/MainPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

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
        <Route exact path="/register_successful" component={SuccessfulRegisterPage} />
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/reset" component={ResetPage} />
        <Route exact path="/reset_successful" component={SuccessfulResetPage} />
        <Route path="/user/upload" component={FileUploadPage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
