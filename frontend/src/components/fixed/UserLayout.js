import React from 'react';
import history from '../../history';
import { post } from '../../utils/requests';
import RoutingMenuItem from '../other/RoutingMenuItem';
import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default props => {
  /**
   * logs out the user
   * TODO: handle error
   */
  async function logout() {
    await post('/auth/logout/', { revoke_token: true }).then(response =>
      history.push('/auth/login/')
    );
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="header" style={{ height: '50px' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ height: '100%', float: 'right' }}
        >
          <Menu.Item key="1" onClick={logout}>
            Logout
          </Menu.Item>
          <Menu.Item key="2">Profile</Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Layout
          style={{ padding: '24px 0', background: '#fff', height: '100%' }}
        >
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu mode="inline" style={{ height: '100%' }}>
              <SubMenu
                key="projects"
                title={
                  <span>
                    <Icon type="folder" theme="twoTone" />
                    projects
                  </span>
                }
              >
                <RoutingMenuItem key="1" url="/user/upload/">
                  <Icon type="file-add" theme="twoTone" />
                  Add project
                </RoutingMenuItem>
                <RoutingMenuItem key="2" url="/user/projects/">
                  <Icon type="container" theme="twoTone" />
                  All projects
                </RoutingMenuItem>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {props.children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
