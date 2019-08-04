import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { requestVerify, sendVerify } from '../../utils/auth_api';

const verify = async () => {
  const currUrl = window.location.href;
  const payload = await requestVerify(currUrl);
  console.log(payload);
  const response = await sendVerify(payload);

  switch (response.status) {
    case 200:
      return true;
    case 401:
      return false;
    default:
      console.log('something unexpected happened');
      return false;
  }
};

const VerifyRegistrationPage = props => {
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    verify()
      .then(answer => setIsVerified(answer))
      .catch(err => console.log(err));
  }, []);

  if (isVerified === true) {
    return (
      <div>
        <Link to="/login">login now!</Link>
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
