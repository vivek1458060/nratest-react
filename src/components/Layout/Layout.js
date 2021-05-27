import { Row, Col, Layout, Menu, Affix, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { history } from '../../App';
import LayoutWrapper from './Layout.style';
import CustomHeader from '../../components/Header/Header';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

export const SiderMenu = (props) => {
    const pathname = history.location.pathname;
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={[pathname === '/' ? '/question/list' : pathname]}
            // defaultOpenKeys={['quiz']}
            style={props.menuStyle}
            onClick={props.onClick}
        >
            <Menu.Item key="/question/list">
                <NavLink to="/question/list">Doubts</NavLink>
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
                <NavLink to="/classes">Live Class</NavLink>
            </Menu.Item>
        </Menu>
    )
}

function LayoutCom(props) {
    return (
        <LayoutWrapper>
            <Row>
                <Col lg={{ span: 22, offset: 1 }} xs={24}>
                    <CustomHeader />
                </Col>
            </Row>
            <Row>
                <Col lg={{ span: 20, offset: 2 }} xl={{ span: 18, offset: 3 }} xs={24}>
                    <Layout style={{ background: 'none' }}>
                        <Content style={{ paddingTop: '40px' }}>
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
            <Affix style={{ position: 'fixed', right: 20, bottom: 20 }}>
                <a href="https://t.me/joinchat/JI6tRCVtC1w0NjRl" target="_blank">
                    <img src="/telegram.svg" width={64} height={64}/>
                </a>
            </Affix>
        </LayoutWrapper>
    )
}

export default LayoutCom;