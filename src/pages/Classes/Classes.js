import React, { useState } from 'react';
import { PageHeader, Tabs, Button, Statistic, Descriptions, Row, Col } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

const renderContent = (column = 1) => (
    <Descriptions size="small" column={column} bordered={true}>
        <Descriptions.Item label="Created By">Prince Bhakt</Descriptions.Item>
        {/* <Descriptions.Item label="Association">
            <a>1 Week</a>
        </Descriptions.Item> */}
        <Descriptions.Item label="Creation Time">2021-19-05</Descriptions.Item>
        <Descriptions.Item label="Course Duration">1 Week</Descriptions.Item>
        <Descriptions.Item label="Topics Covered">
            Percentage, Profit & Loss, Simplification, Linear equation etc...
        </Descriptions.Item>
    </Descriptions>
);

const extraContent = (
    <Row>
        <Statistic
            title="Students Attending"
            value="120"
            style={{
                marginRight: 32,
            }}
        />
        <Statistic
            title="Course type"
            value="Free"
            style={{
                marginRight: 32,
                display: 'block'
            }}
        />
        <Statistic title="Time" value="Everyday at 4:00 PM" />
    </Row>
);

const Content = ({ children, extra }) => (
    <div className="content">
        <div className="main">{children}</div>
        <div className="extra">{extra}</div>
    </div>
);

function Classes(props) {
    const [joinUrl, setJoinUrl] = useState();

    const joinMeeting = async () => {
        const meetingConfig = {
            mn: 8371743121,
            name: props.user.fullName,
            pwd: 'dHVtUXM1MGplWEZnNFc3bTVSclhPdz09',
            role: props.user.role === 'admin' ? 1 : 0,
            email: props.user.email,
            lang: 'en-US',
            china: 0,
            apiKey: 'uhuFIaHKTNSQJo8NEw1_ug',
        };

        try {
            const res = await axios.get(`/zoom/signature?meetingNumber=${meetingConfig.mn}&role=${meetingConfig.role}`);
            meetingConfig.signature = res.data.signature;
            let joinUrl =
                window.testTool.getCurrentDomain() +
                "/meeting.html?" +
                window.testTool.serialize(meetingConfig);
            setJoinUrl(joinUrl);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            <PageHeader
                className="site-page-header-responsive"
                onBack={() => props.history.goBack()}
                title="Aptitude Class"
                subTitle="This is for all level students"
                extra={[
                    <Button key="1" type="primary" onClick={joinMeeting}>
                        Join Class
                    </Button>,
                ]}
            >
                <Content extra={<><br />{extraContent}</>}>{renderContent()}</Content>
            </PageHeader>
            {joinUrl && (
                <iframe
                    id="zoom-iframe"
                    src={joinUrl}
                    width="100%"
                    height="583px"
                    sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                    allow="microphone; camera; fullscreen;"
                ></iframe>
            )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(Classes);