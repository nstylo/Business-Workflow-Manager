import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getQueryParams, post } from '../../../utils/requests';

const VerifyRegistrationPage = props => {
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const params = getQueryParams();
    post('/auth/verify-registration/', params)
      .then(response =>
        response.status === 200 ? setIsVerified(true) : setIsVerified(false)
      )
      .catch(err => null); // TODO: handle error
  }, []);

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
