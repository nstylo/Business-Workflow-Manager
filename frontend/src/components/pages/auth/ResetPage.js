import React from 'react';
import ResetForm from '../../forms/auth/ResetForm';
import { getQueryParams } from '../../utils/auth_api';

const RegistrationPage = props => {
  return <ResetForm getQueryParams={getQueryParams} />;
};

export default RegistrationPage;
