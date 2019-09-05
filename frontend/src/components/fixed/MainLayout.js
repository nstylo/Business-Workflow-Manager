import React from 'react';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

export default props => {
  return (
    <Layout>
      <Content style={{ padding: '0 50px', height: '100vh' }}>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', height: '100%' }}>
            {props.children}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>backend.ml ©2019</Footer>
    </Layout>
  );
};
