import React, { useContext } from 'react';
import { AuthContext } from '../../App';
import logo from '../../res/***REMOVED***.png';
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
        <div className="logo-wrapper">
          {/*center logo*/}
          <span className="helper"></span>
          <img className="logo-main" src={logo} alt="***REMOVED*** logo" />
        </div>
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
      defaultSelectedKeys={['2']}
    >
      <Menu.Item className="section-item" key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item className="section-item" key="2">
        <Link to="/">Solutions</Link>
      </Menu.Item>
      <Menu.Item className="section-item" key="3">
        <Link to="/">About</Link>
      </Menu.Item>
      <Menu.Item className="section-item" key="4">
        <Link to="/">Contact</Link>
      </Menu.Item>
    </Menu>
  );
};

const Utils = () => {
  const { isAuthenticated, setAuthenticated } = useContext(AuthContext);

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
            onSearch={value => console.log(value)} // TODO: global search
          />
        </div>
        {isAuthenticated === true ? (
          <>
            <Dropdown
              overlay={UserMenu({ setAuthenticated })}
              placement="bottomRight"
              trigger={['click']}
            >
              <Button style={{ height: '80%' }} type="primary">
                <Icon type="user" />
              </Button>
            </Dropdown>
          </>
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

const UserMenu = props => {
  return (
    <Menu style={{ width: '200px' }}>
      <RoutingMenuItem to="/user">
        <span>My Profile</span>
      </RoutingMenuItem>
      <RoutingMenuItem to="/user/settings">
        <span>Settings</span>
      </RoutingMenuItem>
      <hr style={{ width: '90%' }} />
      <Menu.Item onClick={() => logout() && props.setAuthenticated()}>
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );
};
