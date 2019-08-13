import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from ''; // TODO: import context

/**
 * either renders the passed on component or reroutes to login page
 */
export default () => {
  const isAuthenticated = useContext(AuthContext);
  const { component: Component, ...rest } = this.props;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Component {...props} /> // render page
        ) : (
          <Redirect to="/auth/login/" /> // user is not logged in
        )
      }
    />
  );
};
