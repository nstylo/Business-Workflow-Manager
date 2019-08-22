import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer } = Layout;

export default props => (
  <Layout>
    <Header className="auth-header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '48px', float: 'right' }}
      >
        <Menu.Item key="1">
          <Icon type="unlock" />
          Log in
          <Link to="/auth/login" />
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="unlock" />
          Register
          <Link to="/auth/register" />
        </Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px', height: '100vh' }}>
      {props.children}
    </Content>
    <Footer style={{ textAlign: 'center' }}>***REMOVED***.ml ©2019</Footer>
  </Layout>
);
