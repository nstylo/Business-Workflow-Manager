import React, { useContext } from 'react';
import { AuthContext } from '../../App';
import logo from '../../res/***REMOVED***.png';
import { Layout, Menu, Divider, Input } from 'antd';
import { Link } from 'react-router-dom';
import { logout } from '../../utils/requests';

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
        {isAuthenticated === true ? (
          <>
            <Link to="/user">My Account</Link>
            <Divider type="vertical" />
            <Link to="/" onClick={() => logout() && setAuthenticated(false)}>
              logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/auth/register">register</Link>
            <Divider type="vertical" />
            <Link to="/auth/login">login</Link>
          </>
        )}
      </div>
      <div className="util-item">
        <Search
          placeholder="search"
          enterButton="Go"
          size="small"
          style={{ width: 200 }}
          onSearch={value => console.log(value)}
        />
      </div>
    </div>
  );
};
