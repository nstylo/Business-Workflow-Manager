import React from 'react';
import history from '../../history';
import RoutingMenuItem from '../other/RoutingMenuItem';
import { Layout, Menu, Icon } from 'antd';

const { Sider, Content } = Layout;

export default props => {
  // extract last word of url, if valid menu item key => highlight
  const pathKey = history.location.pathname.replace(/\/$/, '').match(/\w*$/)[0];

  return (
    <Layout style={{ height: '100vh' }}>
      <Content>
        <Layout
          style={{ padding: '24px 0', background: '#fff', height: '100%' }}
        >
          <Sider width={200} style={{ background: '#fff' }}>
            <Settings pathKey={pathKey} />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {props.children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

const Settings = props => {
  const { pathKey } = props;

  return (
    <Menu
      mode="inline"
      style={{ height: '100%' }}
      defaultSelectedKeys={[pathKey]}
    >
      <RoutingMenuItem key="account" to="/user/settings/account">
        <Icon type="setting" theme="twoTone" />
        Account
      </RoutingMenuItem>
      <RoutingMenuItem key="profile" to="/user/settings/profile">
        <Icon type="sliders" theme="twoTone" />
        Profile
      </RoutingMenuItem>
      <RoutingMenuItem key="billing" to="/user/settings/billing">
        <Icon type="credit-card" theme="twoTone" />
        Billing
      </RoutingMenuItem>
    </Menu>
  );
};
