import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { get } from '../utils/requests';

/**
 * either renders the passed on component or reroutes to login page
 */
export default class ProtectedRoute extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: null // did not get response yet if null
    };
  }

  /**
   * check if user is logged in, i.e. get 405 back
   */
  componentDidMount() {
    get('/api/auth/logout/').then(response => {
      if (response.status === 405) {
        this.setState({
          isAuthenticated: true
        });
      } else {
        this.setState({
          isAuthenticated: false
        });
      }
    });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    if (this.state.isAuthenticated === null) {
      return <div>loading ...</div>;
    } else {
      return (
        <Route
          {...rest}
          render={props =>
            this.state.isAuthenticated === true ? (
              <Component {...props} /> // render page
            ) : (
              <Redirect to="/auth/login/" /> // user is not logged in
            )
          }
        />
      );
    }
  }
}
