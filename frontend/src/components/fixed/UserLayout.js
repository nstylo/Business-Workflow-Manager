import React from 'react';
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
