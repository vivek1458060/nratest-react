import React, { useEffect, useState } from 'react';
import { Row, Col, Menu } from 'antd';
import { MailOutlined, SettingOutlined, QuestionCircleOutlined, PlaySquareOutlined } from '@ant-design/icons';
import { history } from '../../App';
import LayoutWrapper from './Layout.style';
import CustomHeader from '../../components/Header/Header';
import { useSelector } from 'react-redux';

const { SubMenu } = Menu;

function LayoutCom(props) {
    const rootSubmenuKeys = ['testsubmenu'];
    const pathname = history.location.pathname;

    const [openKeys, setOpenKeys] = React.useState(rootSubmenuKeys);
    const [current, setCurrent] = useState(pathname);

    useEffect(() => {
        setCurrent(pathname);
    }, [pathname])

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    const handleClick = ({ key }) => {
        setCurrent(key);
        history.push(key);
    }
    const user = useSelector((state) => state.auth.user);
    return (
        <LayoutWrapper>
            <Row>
                <Col lg={{ span: 22, offset: 1 }} xs={24}>
                    <CustomHeader />
                </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Col lg={{ span: 22, offset: 1 }} xl={{ span: 18, offset: 3 }} xs={24}>
                    <Row>
                        <Col lg={{ span: 5 }} className="showabovelgscreen">
                            <Menu
                                style={{ maxWidth: 250, height: '100vh' }}
                                mode="inline"
                                onClick={handleClick}
                                openKeys={openKeys}
                                onOpenChange={onOpenChange}
                                selectedKeys={[current]}
                                // theme="dark"
                            >
                                <Menu.Item key="/question/list" icon={<QuestionCircleOutlined />}>Doubts</Menu.Item>
                                <SubMenu key="testsubmenu" icon={<MailOutlined />} title="Test" icon={<SettingOutlined />}>
                                    <Menu.Item key="/quizzes">Quiz</Menu.Item>
                                    <Menu.Item key="/online-test">Online Test</Menu.Item>
                                    {
                                        user?.role === 'admin' && (
                                            <Menu.Item key="/create-online-test">Create Online Test</Menu.Item>
                                        )
                                    }
                                </SubMenu>
                                {user?.role === 'admin' && <Menu.Item key="/current-affairs">Current Affairs</Menu.Item>}
                                <Menu.Item key="/classes" icon={<PlaySquareOutlined />}>Live Class</Menu.Item>
                            </Menu>
                        </Col>
                        <Col lg={{ span: 19 }} xs={24}>
                            <div style={{ padding: '10px 10px 80px 10px' }}>
                                {props.children}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </LayoutWrapper>
    )
}

export default LayoutCom;