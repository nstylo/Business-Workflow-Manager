import React from 'react';
import ResetForm from '../../forms/auth/ResetForm';
import { getQueryParams } from '../../../utils/requests';

const RegistrationPage = props => {
  return <ResetForm getQueryParams={getQueryParams} />;
};

export default RegistrationPage;
