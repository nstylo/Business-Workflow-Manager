import React from 'react';
import history from '../../history';
import RoutingMenuItem from '../other/RoutingMenuItem';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer } = Layout;

export default props => {
  // extract last word of url, if valid menu item key => highlight
  const pathKey = history.location.pathname.replace(/\/$/, '').match(/\w*$/)[0];

  return (
    <Layout>
      <Header className="auth-header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '48px', float: 'right' }}
          defaultSelectedKeys={[pathKey]}
        >
          <RoutingMenuItem to="/auth/login" key="login">
            <Icon type="unlock" />
            <span>Log in</span>
          </RoutingMenuItem>
          <RoutingMenuItem to="/auth/register" key="register">
            <Icon type="user-add" />
            <span>Register</span>
          </RoutingMenuItem>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', height: '100vh' }}>
        {props.children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>***REMOVED***.ml ©2019</Footer>
    </Layout>
  );
};
