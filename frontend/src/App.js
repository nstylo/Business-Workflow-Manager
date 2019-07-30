import React from 'react';
import LoginPage from './components/auth/LoginPage';
import LogoutPage from './components/auth/LogoutPage';
import RegistrationPage from './components/auth/RegistrationPage';
import FileUpload from './components/user/FileUpload';
import TopNav from './components/fixed/TopNav';
import NotFound from './components/NotFound';
import MainPage from './components/MainPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route path="/user/upload" component={FileUpload} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
