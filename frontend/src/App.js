import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import { checkAuthenticated } from './utils/requests';
import './App.less';

import NotFound from './components/pages/public/NotFound';
import AuthRouter from './routers/AuthRouter';
import UserRouter from './routers/UserRouter';
import PublicRouter from './routers/PublicRouter';
import ProtectedRoute from './routers/ProtectedRoute';

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
              <Route path="/auth" component={AuthRouter} />
              <ProtectedRoute path="/user" component={UserRouter} />
              <Route path="/" component={PublicRouter} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </AuthContext.Provider>
      );
    } else {
      return <p>loading...</p>;
    }
  }
}
