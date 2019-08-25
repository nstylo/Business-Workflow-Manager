import React from 'react';
import history from '../../history';
import RoutingMenuItem from '../other/RoutingMenuItem';
import { Layout, Menu, Icon } from 'antd';

const { Content, Sider } = Layout;

export default props => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Content>
        <Layout
          style={{ padding: '24px 0', background: '#fff', height: '100%' }}
        >
          <Sider width={200} style={{ background: '#fff' }}>
            <UserMenu />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {props.children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

const UserMenu = props => {
  // extract last word of url, if valid menu item key => highlight
  const pathKey = history.location.pathname.replace(/\/$/, '').match(/\w*$/)[0];

  return (
    <Menu
      mode="inline"
      style={{ height: '100%' }}
      defaultSelectedKeys={[pathKey]}
    >
      <RoutingMenuItem key="upload" to="/user/upload/">
        <Icon type="file-add" theme="twoTone" />
        Add project
      </RoutingMenuItem>
      <RoutingMenuItem key="projects" to="/user/projects/">
        <Icon type="container" theme="twoTone" />
        All projects
      </RoutingMenuItem>
    </Menu>
  );
};
