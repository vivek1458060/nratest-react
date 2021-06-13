import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { QuestionCircleOutlined, PlaySquareOutlined, SettingOutlined } from '@ant-design/icons';
import { history } from '../../App';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const { SubMenu } = Menu;

function SubHeader() {
    const pathname = history.location.pathname;
    const [current, setCurrent] = useState(pathname);

    useEffect(() => {
        setCurrent(pathname);
    }, [pathname])

    const handleClick = e => {
        setCurrent(e.key);
        history.push(e.key);
    };

    const user = useSelector((state) => state.auth.user);
    return (
        <Menu 
            onClick={handleClick} 
            selectedKeys={[current]} 
            mode="horizontal" 
            style={{ position: 'relative' ,display: 'flex', justifyContent: 'center' }}
        >
            <Menu.Item key="/question/list" icon={<QuestionCircleOutlined />}>
                Doubts
            </Menu.Item>
            <Menu.Item key="/classes" icon={<PlaySquareOutlined />}>
                Live Class
            </Menu.Item>
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="More">
                <Menu.Item key="/quizzes">Quiz</Menu.Item>
                <Menu.Item key="/online-test">Online Tests</Menu.Item>
                <Menu.Item key="/current-affairs">Current Affairs</Menu.Item>
                {
                    user?.role === 'admin' && (
                        <Menu.Item key="/create-online-test">Create Online Test</Menu.Item>
                    )
                }
            </SubMenu>
        </Menu>
    )
}

export default SubHeader;