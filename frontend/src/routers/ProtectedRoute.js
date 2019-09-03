import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../App';

/**
 * Redirects to login if not authenticated
 *
 * @param { component } component component to wrap
 * @param { object } rest everything else you want to pass on
 */
export default props => {
  const { isAuthenticated } = useContext(AuthContext);
  const { component: Component, ...rest } = props;
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
