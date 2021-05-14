import React, { useState } from 'react';
import { Col, Layout, Drawer, Space, Button, Typography, Dropdown, message } from 'antd';
import { MenuOutlined, PhoneOutlined, DownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu } from 'antd';
import axios from 'axios';

import HeaderWrapper from './Header.style';

function Navbar() {
    const [visible, showDrawer] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const logout = () => {
        showDrawer(false);
        localStorage.removeItem("user");
        dispatch({ type: 'LOGOUT' });
        delete axios.defaults.headers.common['Authorization'];
        message.success(`You've been logged out`);
    }
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Link to="/question/list" onClick={logout}>Logout</Link>
            </Menu.Item>
        </Menu>
    );
    return (
        <HeaderWrapper>
            <Layout.Header style={{ background: 'white', display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                <Col md={{ offset: 3, span: 18 }} xs={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <MenuOutlined 
                            onClick={() => showDrawer(true)} 
                            style={{ fontSize: '20px' }} 
                            className="menu-unfold-icon" 
                        />
                        <Link to="/question/list"><img src="/cover.png" width="250"/></Link>
                    </div>
                    <div className="menu-right">
                        <Space className="menu-right-items">
                            <Button type="text"><PhoneOutlined style={{ transform: 'rotate(100deg)' }} />+91 7980527922</Button>
                            {!user && <Button type="text">
                                <Space>
                                    <Typography.Text type="secondary">Welcome Guest. </Typography.Text>
                                    <Link to="/login">Sign In</Link>
                                </Space>
                            </Button>}
                            {user && <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <Typography.Text type="secondary">Welcome {user.fullName}. </Typography.Text> <DownOutlined />
                                </a>
                            </Dropdown>}
                        </Space>
                    </div>
                </Col>
                <Drawer
                    title={<img src="/cover.png" style={{ maxWidth: '200px' }} />}
                    placement="left"
                    closable={false}
                    onClose={() => showDrawer(false)}
                    visible={visible}
                >
                    <Space direction="vertical">
                        {!user && <Link to="/login">Login</Link>}
                        {!user && <Link to="/login">Sign Up</Link>}
                        <Typography></Typography>
                    </Space>
                    {/* <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p> */}
                    {user && (<>
                        <Typography.Text type="secondary">Welcome {user.fullName}. </Typography.Text>
                        <br />
                        <Link to="/question/list" onClick={logout}>Logout</Link>
                    </>)}
                </Drawer>
            </Layout.Header>
        </HeaderWrapper>
    )
}

export default Navbar;