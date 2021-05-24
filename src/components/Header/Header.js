import React, { useState } from 'react';
import { Col, Layout, Drawer, Space, Button, Typography, Dropdown, message } from 'antd';
import { MenuOutlined, PhoneOutlined, DownOutlined, MailOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu } from 'antd';
import axios from 'axios';

import HeaderWrapper from './Header.style';
import { SiderMenu } from '../Layout/Layout';

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
            <Layout.Header className="header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/question/list">
                        <img className="logo" src="/cover2.png" width="250" alt="logo" />
                    </Link>
                </div>
                <div className="menu-right">
                    <Button
                        size="large"
                        className="menu-unfold-icon"
                        onClick={() => showDrawer(true)}
                        icon={<MenuOutlined
                            style={{ fontSize: '20px' }}
                        />}
                    ></Button>
                    <Space className="menu-right-items">
                        <Button type="text"><PhoneOutlined style={{ transform: 'rotate(100deg)' }} />+91 7980527922</Button>
                        <Button type="text"><MailOutlined />iamprincebhakt@gmail.com</Button>
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
                <Drawer
                    title={<img src="/cover.png" style={{ maxWidth: '200px' }} />}
                    placement="left"
                    closable={false}
                    onClose={() => showDrawer(false)}
                    visible={visible}
                    footer={
                        user ? (
                            <div>
                                <div style={{ marginBottom: '20px' }}>
                                    <Typography.Text>Contact Us</Typography.Text>
                                    <Button type="text" size="small" style={{ padding: 0 }}><PhoneOutlined style={{ transform: 'rotate(100deg)' }} />+91 7980527922</Button>
                                    <Button type="text" size="small" style={{ padding: 0 }}><MailOutlined />iamprincebhakt@gmail.com</Button>
                                </div>
                                <Typography.Text type="secondary">Welcome {user.fullName}. </Typography.Text>
                                <br />
                                <Link to="/question/list" onClick={logout}>Logout</Link>
                            </div>
                        ) : (
                            <div>
                                <div style={{ marginBottom: '20px' }}>
                                    <Typography.Text>Contact Us</Typography.Text>
                                    <Button type="text" size="small" style={{ padding: 0 }}><PhoneOutlined style={{ transform: 'rotate(100deg)' }} />+91 7980527922</Button>
                                    <Button type="text" size="small" style={{ padding: 0 }}><MailOutlined />iamprincebhakt@gmail.com</Button>
                                </div>
                                <Space>
                                    <Link to="/login"><Button type="primary">Login</Button></Link>
                                    <Link to="/login"><Button>Sign Up</Button></Link>
                                </Space>
                            </div>
                        )
                    }
                    footerStyle={{ paddingBottom: '30px' }}
                    bodyStyle={{ padding: 0 }}
                >
                    <SiderMenu onClick={() => showDrawer(false)} />
                </Drawer>
            </Layout.Header>
        </HeaderWrapper>
    )
}

export default Navbar;