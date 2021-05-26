import { Button, Tabs } from 'antd';
import { history } from '../../App';
const { TabPane } = Tabs;

function SubHeader() {
    return (
        <Tabs defaultActiveKey={history.location.pathname} onChange={(key) => {
            history.push(key)
        }} 
            centered 
            style={{marginTop: '20px'}}
            className="showunderlgscreen"
            size="large"
        >
            <TabPane tab="Doubts" key="/question/list"></TabPane>
            <TabPane tab="Take Quiz" key="/quizzes"></TabPane>
            <TabPane tab="Live Class" key="/classes"></TabPane>
        </Tabs>
    )
}

export default SubHeader;