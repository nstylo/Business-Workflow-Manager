import React from 'react';
import history from '../../history';
import { parsePathName } from '../../utils/helpers';
import RoutingMenuItem from '../other/RoutingMenuItem';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer } = Layout;

export default props => {
  return (
    <Layout>
      <Header className="auth-header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '48px', float: 'right' }}
          defaultSelectedKeys={[parsePathName(history.location.pathname)]}
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
      <Footer style={{ textAlign: 'center' }}>backend.ml ©2019</Footer>
    </Layout>
  );
};
