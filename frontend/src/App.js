import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import { checkAuthenticated } from './utils/requests';
import './App.less';

import NotFound from './components/pages/public/NotFound';
import AuthRouter from './routers/AuthRouter';
import UserRouter from './routers/UserRouter';
import PublicRouter from './routers/PublicRouter';
import ProtectedRoute from './routers/ProtectedRoute';
import Header from './components/fixed/Header';

// create global context
export const AuthContext = React.createContext();

/**
 * return and export this app
 */
export default class App extends Component {
  state = {
    isAuthenticated: null // null indicates that there was no response yet
  };

  /**
   * queries backend if user is authenticated and sets state accordingly
   */
  async componentDidMount() {
    const isAuthenticated = await checkAuthenticated();
    this.setState({
      isAuthenticated
    });
  }

  render() {
    if (this.state.isAuthenticated !== null) {
      return (
        <AuthContext.Provider
          value={{
            setAuthenticated: bool => this.setState({ isAuthenticated: bool }),
            ...this.state
          }}
        >
          <Router history={history}>
            <Switch>
              {/* Reroute to home when enter index */}
              <Route
                exact
                path={'/'}
                component={() => <Redirect to="/home" />}
              />
              <Route path="/auth" component={AuthRouter} />
              <Header>
                <Switch>
                  <ProtectedRoute path="/user" component={UserRouter} />
                  <Route path="/" component={PublicRouter} />
                  <Route component={NotFound} />
                </Switch>
              </Header>
            </Switch>
          </Router>
        </AuthContext.Provider>
      );
    } else {
      // TODO: show placeholders on load
      return <p>loading...</p>;
    }
  }
}
