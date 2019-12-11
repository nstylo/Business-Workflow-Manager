import React, { useContext } from 'react';
import history from '../../history';
import { parsePathName } from '../../utils/helpers';
import { AuthContext } from '../../App';
import { Layout, Menu, Divider, Input, Icon, Button, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { logout } from '../../utils/requests';
import RoutingMenuItem from '../other/RoutingMenuItem';

const { Header } = Layout;
const { Search } = Input;

export default props => {
  return (
    <>
      <Header className="main-header">
        <Utils />
        <Sections />
      </Header>
      {props.children}
    </>
  );
};

const Sections = () => {
  return (
    <Menu
      className="sections"
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[parsePathName(history.location.pathname)]}
    >
      <RoutingMenuItem className="section-item" to="/home" key="home">
        <span>Home</span>
      </RoutingMenuItem>
      <RoutingMenuItem className="section-item" to="/solutions" key="solutions">
        <span>Solutions</span>
      </RoutingMenuItem>
      <RoutingMenuItem className="section-item" to="/about" key="about">
        <span>About</span>
      </RoutingMenuItem>
      <RoutingMenuItem className="section-item" to="/contact" key="contact">
        <span>Contact</span>
      </RoutingMenuItem>
    </Menu>
  );
};

const Utils = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="utils">
      <div className="util-item">
        <div className="util-item">
          <Search
            placeholder="search"
            enterButton="Go"
            size="small"
            style={{
              width: '200px',
              height: '80%'
            }}
            onSearch={() => {}} // TODO: global search
          />
        </div>
        {isAuthenticated ? (
          <UserDropDown />
        ) : (
          <>
            <Link to="/auth/register">register</Link>
            <Divider type="vertical" />
            <Link to="/auth/login">login</Link>
          </>
        )}
      </div>
    </div>
  );
};

const UserDropDown = () => {
  return (
    <Dropdown overlay={UserMenu()} placement="bottomRight" trigger={['hover']}>
      <Button style={{ height: '80%' }} type="primary">
        <Icon type="user" />
      </Button>
    </Dropdown>
  );
};

const UserMenu = props => {
  // global setter
  const { setAuthenticated } = useContext(AuthContext);

  return (
    <Menu style={{ width: '200px' }}>
      <RoutingMenuItem to="/user/upload">
        <span>My Profile</span>
      </RoutingMenuItem>
      <RoutingMenuItem to="/user/settings/account">
        <span>Settings</span>
      </RoutingMenuItem>
      <hr style={{ width: '90%' }} />
      <Menu.Item onClick={() => logout() && setAuthenticated()}>
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );
};
