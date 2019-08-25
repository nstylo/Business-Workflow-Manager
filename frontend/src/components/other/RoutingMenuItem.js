import React from 'react';
import history from '../../history';

import { Menu } from 'antd';
const MenuItem = Menu.Item;

export default ({ to, ...rest }) => {
  return <MenuItem {...rest} onClick={() => history.push(to)} />;
};
