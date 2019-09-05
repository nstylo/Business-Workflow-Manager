import React from 'react';
import { Button } from 'antd';

// TODO: delete account does not work yet
export default () => {
  return (
    <div className="settings-pane">
      <div>
        <h2>
          <b>Delete Account</b>
        </h2>
        <p>This action will irreversibly remove your user account.</p>
      </div>
      <div>
        <Button type="danger">Delete Account</Button>
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
