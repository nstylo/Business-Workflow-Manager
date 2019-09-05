import React from 'react';
import history from '../../history';
import { parsePathName } from '../../utils/helpers';
import RoutingMenuItem from '../other/RoutingMenuItem';
import { Layout, Menu, Icon } from 'antd';

const { Sider, Content } = Layout;

export default props => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Content>
        <Layout
          style={{ padding: '24px 0', background: '#fff', height: '100%' }}
        >
          <Sider width={200} style={{ background: '#fff' }}>
            <Settings />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {props.children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

const Settings = () => {
  return (
    <Menu
      mode="inline"
      style={{ height: '100%' }}
      defaultSelectedKeys={[parsePathName(history.location.pathname)]}
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
