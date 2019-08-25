import React from 'react';
import history from '../../history';
import RoutingMenuItem from '../other/RoutingMenuItem';
import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default props => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Content>
        <Layout
          style={{ padding: '24px 0', background: '#fff', height: '100%' }}
        >
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              style={{ height: '100%' }}
              defaultSelectedKeys={[
                // extract last word of url, if valid menu item key => highlight
                history.location.pathname.replace(/\/$/, '').match(/\w*$/)[0]
              ]}
            >
              <SubMenu
                key="projects"
                title={
                  <span>
                    <Icon type="folder" theme="twoTone" />
                    Projects
                  </span>
                }
              >
                <RoutingMenuItem key="upload" to="/user/upload/">
                  <Icon type="file-add" theme="twoTone" />
                  Add project
                </RoutingMenuItem>
                <RoutingMenuItem key="projects" to="/user/projects/">
                  <Icon type="container" theme="twoTone" />
                  All projects
                </RoutingMenuItem>
              </SubMenu>
              <SubMenu
                key="settings"
                title={
                  <span>
                    <Icon type="setting" theme="twoTone" />
                    Settings
                  </span>
                }
              >
                <RoutingMenuItem key="account" to="/user/settings/account">
                  <Icon type="file-add" theme="twoTone" />
                  Account
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
