import { Row, Col, Tabs, Breadcrumb } from 'antd';

import { Layout, Menu, Card } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { NavLink, Navlink } from 'react-router-dom';
import { history } from '../../App';
import LayoutWrapper from './Layout.style';
import CustomHeader from '../../components/Header/Header';

import { useMediaQuery } from 'react-responsive'

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

export const SiderMenu = ({ menuStyle }) => (
    <Menu
        mode="inline"
        defaultSelectedKeys={[history.location.pathname]}
        defaultOpenKeys={['quiz']}
        style={menuStyle}
        onClick={(e) => console.log(e)}
    >
        <Menu.Item key="/question/list">
            <NavLink to="/question/list">Doubt</NavLink>
        </Menu.Item>
        {/* <SubMenu key="quiz" title="Quiz">
            <Menu.Item key="/add-quiz">
                <NavLink to="/add-quiz">Add Quiz</NavLink>
            </Menu.Item>
            <Menu.Item key="/quizzes">
                <NavLink to="/quizzes">Take Quiz</NavLink>
            </Menu.Item>
        </SubMenu> */}
        <Menu.Item key="/quizzes">
            <NavLink to="/quizzes">Take Quiz</NavLink>
        </Menu.Item>
        <Menu.Item key="/classes">
            <NavLink to="/classes">Classes</NavLink>
        </Menu.Item>
    </Menu>
)

function LayoutCom(props) {
    return (
        <LayoutWrapper>
            <Row>
                <Col lg={{ span: 22, offset: 1 }} xs={24}>
                    <CustomHeader />
                </Col>
            </Row>
            <Row>
                <Col lg={{ span: 20, offset: 2 }} xl={{span: 18, offset: 3}} xs={24}>
                    <Layout style={{ background: 'none' }}>
                        <Content style={{paddingTop: '40px'}}>
                            <Layout style={{ background: 'none' }}>
                                <Sider
                                    className="sider"
                                    width={200}
                                // breakpoint="lg"
                                // collapsedWidth="0"
                                // onBreakpoint={broken => {
                                //     // console.log(broken);
                                // }}
                                // onCollapse={(collapsed, type) => {
                                //     // console.log(collapsed, type);
                                // }}
                                >
                                    <SiderMenu menuStyle={{ height: '100%' }} />
                                </Sider>
                                <Content style={{ minHeight: 280, padding: '0px 10px 60px 10px' }}>
                                    {props.children}
                                </Content>
                            </Layout>
                        </Content>
                    </Layout>
                </Col>
            </Row>
        </LayoutWrapper>
    )
}

export default LayoutCom;