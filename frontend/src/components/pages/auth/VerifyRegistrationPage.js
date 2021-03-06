import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getQueryParams } from '../../../utils/requests';
import { post } from '../../../utils/baseRequests';

const VerifyRegistrationPage = props => {
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const params = getQueryParams();
    // TODO: pull out request definition from component
    post('/auth/verify-registration/', params)
      .then(response =>
        response.status === 200 ? setIsVerified(true) : setIsVerified(false)
      )
      .catch(err => null); // TODO: handle error
  }, []);

  // TODO: flesh out visual representation
  if (isVerified === true) {
    return (
      <div>
        <Link to="/auth/login">login now!</Link>
        verified!
      </div>
    );
  } else if (isVerified === false) {
    return <div>could not verify!</div>;
  } else {
    return <div>verify account ...</div>;
  }
};

export default VerifyRegistrationPage;
