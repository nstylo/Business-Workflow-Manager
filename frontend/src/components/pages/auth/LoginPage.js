import React, { useContext } from 'react';
import LoginForm from '../../forms/auth/LoginForm';
import { AuthContext } from '../../../App';

export default () => {
  const { setAuthenticated } = useContext(AuthContext);
  return <LoginForm setAuthenticated={setAuthenticated} />;
};
