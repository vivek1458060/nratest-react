import { Menu } from 'antd';
import { QuestionCircleOutlined, PlaySquareOutlined, SettingOutlined } from '@ant-design/icons';
import { history } from '../../App';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const { SubMenu } = Menu;

function SubHeader() {
    const user = useSelector((state) => state.auth.user);
    const pathname = history.location.pathname;
    useEffect(() => {
        setCurrent(pathname)
    }, [pathname]);
    const [current, setCurrent] = useState('mail');
    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
        history.push(e.key);
    };
    return (
        <Menu 
            onClick={handleClick} 
            selectedKeys={[current]} 
            mode="horizontal" 
            className="showunderlgscreen"
            style={{marginTop: '20px'}}
        >
            <Menu.Item key="/question/list" icon={<QuestionCircleOutlined />}>
                Doubts
            </Menu.Item>
            <Menu.Item key="/classes" icon={<PlaySquareOutlined />}>
                Live Class
            </Menu.Item>
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Test">
                <Menu.Item key="/quizzes">Quiz</Menu.Item>
                <Menu.Item key="/online-test">Online Tests</Menu.Item>
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