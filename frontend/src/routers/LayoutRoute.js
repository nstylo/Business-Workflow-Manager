import React from 'react';
import { Route } from 'react-router-dom';

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
