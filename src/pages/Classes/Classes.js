import React, { useEffect, useState } from 'react';
import { PageHeader, Button, Statistic, Descriptions, Row, Typography, Collapse, Alert } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import RenderAuthModal from '../../components/RenderAuthModal';
import ClassesWrapper from './Classes.style';

const classes = [
    // {
    //     id: 1,
    //     title: 'Special GS Class by Chandan Sir',
    //     subtitle: '5+ years of Teaching Experience',
    //     studentsAttending: '100',
    //     courseType: 'Free',
    //     topicCovered: 'On-Demand',
    //     timings: `1st June, Evening at 5:00 O'Clock`,
    // },
    // {
    //     id: 1,
    //     title: 'English Class by Pankaj Sir',
    //     subtitle: '5+ years of Teaching Experience',
    //     studentsAttending: '100',
    //     courseType: 'Free',
    //     topicCovered: 'On-Demand',
    //     timings: `Mon, Wed and Fri, Morning at 10:30  O'Clock`,
    // },
    {
        id: 3,
        title: 'Aptitude Class by Prince Sir',
        subtitle: '3+ years of Teaching Experience',
        studentsAttending: '100',
        courseType: 'Free',
        topicCovered: 'According to syllabus',
        createdAt: '24th May, 2021',
        timings: `Monday to Friday, Morning at 9:00 O'Clock`,
    },
    // {
    //     id: 2,
    //     title: 'Reasoning Class by Niraj Sir',
    //     subtitle: '7+ years of Teaching Experience',
    //     studentsAttending: '100',
    //     courseType: 'Free',
    //     topicCovered: 'On-Demand',
    //     createdAt: '27th May, 2021',
    //     timings: `Everyday at 12:00 O'Clock, Tue and Sat Off`,
    //     // message: "Today's class is suspended due to some unavoidable circumstances. Thanks!"
    // }
]

const Content = ({ children, extra }) => (
    <div className="content">
        <div className="main">{children}</div>
        <div className="extra">{extra}</div>
    </div>
);

function Classes(props) {
    const [joinUrl, setJoinUrl] = useState();
    const [showSigninModal, setSigninModal] = useState(false);

    const getJoinUrl = async () => {
        try {
            const res = await axios.get("/meeting/joinUrl");
            setJoinUrl(res.data.joinUrl);
        } catch (e) {
            //message.error("Something went wrong");
            console.log(e);
        }
    }

    useEffect(() => {
        if (props.user && !joinUrl) {
            getJoinUrl();
        }
    }, [props.user])

    const joinMeeting = async () => {
        if (!props.user) return setSigninModal(true);
        window.open(joinUrl, "_blank");

        // const meetingConfig = {
        //     mn: 8371743121,
        //     name: props.user.fullName,
        //     pwd: 'dHVtUXM1MGplWEZnNFc3bTVSclhPdz09',
        //     role: props.user.role === 'admin' ? 1 : 0,
        //     email: props.user.email,
        //     lang: 'en-US',
        //     china: 0,
        //     apiKey: 'uhuFIaHKTNSQJo8NEw1_ug',
        // };

        // try {
        //     const res = await axios.get(`/zoom/signature?meetingNumber=${meetingConfig.mn}&role=${meetingConfig.role}`);
        //     meetingConfig.signature = res.data.signature;
        //     let joinUrl =
        //         window.testTool.getCurrentDomain() +
        //         "/meeting.html?" +
        //         window.testTool.serialize(meetingConfig);
        //     setJoinUrl(joinUrl);
        // } catch (e) {
        //     console.log(e);
        // }
    }
    return (
        <ClassesWrapper>
            {
                classes.map((item) => (
                    <PageHeader
                        style={{ border: '1px solid #f0f0f0', marginBottom: '20px' }}
                        className="site-page-header-responsive"
                        // onBack={() => props.history.goBack()}
                        title={
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>{item.title}</span>
                                <Typography.Text className="mobile-subtitle" type="secondary" style={{ fontSize: '12px' }}>
                                    {item.subtitle}
                                </Typography.Text>
                            </div>
                        }
                        subTitle={item.subtitle}
                        extra={[
                            <Button key="1" type="primary" onClick={joinMeeting}>
                                {props.user?.role === 'admin' ? 'Start Class' : 'Join Class'}
                            </Button>,
                        ]}
                    >
                        <Content extra={
                            <>
                                <br />
                                {
                                    item.message && (
                                        <>
                                            <Alert
                                                message={item.message}
                                                type="info"
                                                showIcon
                                            />
                                            <br />
                                        </>
                                    )
                                }
                                <Row>
                                    <Statistic
                                        title="Students Attending"
                                        value={item.studentsAttending}
                                        style={{
                                            marginRight: 32,
                                        }}
                                    />
                                    <Statistic
                                        title="Course type"
                                        value={item.courseType}
                                        style={{
                                            marginRight: 32,
                                            display: 'block'
                                        }}
                                    />
                                    {/* <Statistic title="Time" value="Monday to Friday, Morning at 8:00 O'Clock" /> */}
                                </Row>
                            </>
                        }>
                            <Descriptions size="small" column={1} bordered={true}>
                                {item.teacherName && <Descriptions.Item label="Created By">{item.teacherName}</Descriptions.Item>}
                                {/* <Descriptions.Item label="Association">
                            <a>1 Week</a>
                        </Descriptions.Item> */}
                                {/* <Descriptions.Item label="Creation Time">2021-19-05</Descriptions.Item> */}
                                {/* <Descriptions.Item label="Course Duration">1 Week</Descriptions.Item> */}
                                <Descriptions.Item label="Topics Covered">
                                    {item.topicCovered}
                                </Descriptions.Item>
                                {item.createdAt && <Descriptions.Item label="Start Date">
                                    {item.createdAt}
                                </Descriptions.Item>}
                                <Descriptions.Item label="Timings">
                                    {item.timings}
                                </Descriptions.Item>
                            </Descriptions>
                        </Content>
                    </PageHeader>
                ))
            }
            {/* {joinUrl && (
                <iframe
                    id="zoom-iframe"
                    src={joinUrl}
                    width="100%"
                    height="583px"
                    sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                    allow="microphone; camera; fullscreen;"
                ></iframe>
            )} */}
            <Collapse defaultActiveKey={['0']} ghost>
                <Collapse.Panel header={<h3>This video will show you how to join a Live Class.</h3>} key="1">
                    <iframe
                        src="https://www.youtube.com/embed/epFguv3JLPE"
                        width="100%"
                        height="400px"
                        allow="fullscreen;"
                    ></iframe>
                </Collapse.Panel>
            </Collapse>
            <RenderAuthModal
                show={showSigninModal}
                onClose={() => setSigninModal(false)}
            />
        </ClassesWrapper>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(Classes);