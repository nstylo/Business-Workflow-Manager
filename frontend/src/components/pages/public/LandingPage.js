import React from 'react';
import { Redirect } from 'react-router-dom';

export default props => {
  return (
    <div>
      <Redirect to="/home" />
      MainPage
    </div>
  );
};
