import React from 'react';
import { Route } from 'react-router-dom';

/**
 * wraps a component within a layout and a route
 * @param { component } component component to wrap
 * @param { component } layout layout in which component gets wrapped
 * @param { object } rest everything else you want to pass on
 */
export default props => {
  const { component: Component, layout: Layout, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};
