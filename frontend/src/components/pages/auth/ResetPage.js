import React from 'react';
import ResetForm from '../../forms/auth/ResetForm';

const RegistrationPage = props => {
  const getQueryParams = () => {
    var urlParams = new URLSearchParams(window.location.search);
    return {
      user_id: urlParams.get('user_id'),
      timestamp: urlParams.get('timestamp'),
      signature: urlParams.get('signature')
    };
  };

  return <ResetForm getQueryParams={getQueryParams} />;
};

export default RegistrationPage;
