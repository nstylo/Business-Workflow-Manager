import React from 'react';
import ChangePasswordForm from '../../../forms/user/ChangePasswordForm';
import ChangeProfileForm from '../../../forms/user/ChangeProfileForm';

export default () => {
  return (
    <div className="settings-pane">
      <div>
        <h2>
          <b>Reset Your Password</b>
        </h2>
        <p>
          After successfully changing your password, you will be logged out and
          redirected to the login page.
        </p>
      </div>
      <div>
        <ChangePasswordForm />
      </div>
      <hr
        style={{
          gridColumn: 'span 2',
          width: '100%'
        }}
      />
      <div>
        <h2>
          <b>Change Your Profile Settings</b>
        </h2>
        <p>
          You will receive a confirmation email after successfully updating your
          credentials. In case you changed your Email, the confirmation will be
          sent to your new Email.
        </p>
      </div>
      <div>
        <ChangeProfileForm />
      </div>
      <hr
        style={{
          gridColumn: 'span 2',
          width: '100%'
        }}
      />
    </div>
  );
};
