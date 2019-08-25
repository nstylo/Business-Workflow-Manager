import React from 'react';
import UserLayout from '../components/fixed/UserLayout';
import { Route } from 'react-router-dom';

export default props => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props => (
        <UserLayout>
          <Component {...props} />
        </UserLayout>
      )}
    />
  );
};
