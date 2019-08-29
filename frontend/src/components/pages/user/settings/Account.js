import React from 'react';
import { Button } from 'antd';

export default () => {
  return (
    <div className="settings-pane">
      <div>
        <h1>
          <b>Delete Account</b>
        </h1>
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
