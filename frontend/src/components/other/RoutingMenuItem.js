import React from 'react';
import history from '../../history';

import { Menu } from 'antd';
const MenuItem = Menu.Item;

/**
 * Wrapper for antd Menu.Item, routes to url
 * @param { string } to where to route
 * @param { object } props anything else you might want to pass on
 */
export default ({ to, ...props }) => {
  return <MenuItem {...props} onClick={() => history.push(to)} />;
};
