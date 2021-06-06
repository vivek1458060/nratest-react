import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Layout, Steps, Button, message, Radio, Space, Divider, Modal, Result, Spin } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AppearOnlineTestWrapper from './AppearOnlineTest.style';
import axios from 'axios';
import Countdown from 'react-countdown';
import { connect } from 'react-redux';

class Timer extends React.Component {
    state = {}
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <Countdown
                onComplete={this.props.onComplete}
                date={Date.now() + 1200000}
                renderer={({ hours, minutes, seconds, completed }) => {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            Time Left: <span>{minutes}:{seconds}</span>
                        </div>
                    )
                }}
            />
        );
    }
}

class AppearOnlineTest extends React.Component {
    state = {
        questions: [],
        current: 0,
        submission: {},
        submitted: false,
        submitLoading: false,
    };
    testId = this.props.match.params.testId;
    getQuestions = async () => {
        try {
            const res = await axios.get(`/test-question/${this.testId}`);
            const questions = res.data.testQuestions;
            const sections = {};
            for (let question of questions) {
                if (sections[question.section]) {
                    sections[question.section].push(question);
                } else {
                    sections[question.section] = [question];
                }
            }
            let questionsSeq = [];
            for (let key in sections) {
                questionsSeq = questionsSeq.concat(sections[key]);
            }
            this.setState({ questions: questionsSeq, sections });
        } catch (e) {
            console.log(e);
        }
    }
    async componentDidMount(testId) {
        this.getQuestions();
    }
    next = () => {
        this.setState({ current: this.state.current + 1 });
    };
    prev = () => {
        this.setState({ current: this.state.current - 1 });
    };
    onChange = (e, key) => {
        this.setState({
            submission: {
                ...this.state.submission,
                [key]: e.target.value
            }
        });
    };
    onComplete = () => {
        this.submitTest();
    }
    wait = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 3000);
        })
    }
    submitTest = async () => {
        this.setState({ submitted: true, submitLoading: true });
        try {
            const { submission } = this.state;
            if (this.props.user) {
                await axios.post("/test-submission", { testId: this.testId, submission });
                // await this.wait();
            }
        } catch (e) {
            console.log(e);
            message.error("Something went wrong");
        }
        this.setState({ submitLoading: false });
    }
    onSubmitClick = async () => {
        Modal.confirm({
            title: 'Do you want this Submit Test?',
            icon: <ExclamationCircleOutlined />,
            // content: ""
            onOk: () => {
                this.submitTest();
            },
            onCancel() { },
        });
    }
    onSectionChange = (key) => {
        const { questions, current } = this.state;
        for (let i = 0; i < questions.length; i++) {
            if(questions[i].section === key) {
                this.setState({ current: i });
                break
            }
        }
    }
    render() {
        const { current, questions, submission, sections } = this.state;
        const currentQuestion = questions[current];
        if (!currentQuestion) return <span>Loading...</span>;
        return (
            <AppearOnlineTestWrapper>
                <Row>
                    <Col lg={{ span: 18, offset: 2 }} xs={24}>
                        <Layout.Header className="header">
                            <img className="logo" src="/cover2.png" width="250" alt="logo" />
                        </Layout.Header>
                        <div style={{ marginTop: '30px', marginBottom: '10px' }}>
                            <Timer onComplete={this.onComplete} />
                        </div>
                        <Space>
                            {
                                Object.keys(sections).map((key) => (
                                    <Button
                                        key={key}
                                        onClick={() => this.onSectionChange(key)}
                                    >
                                        {key}: {sections[key].length}
                                    </Button>
                                ))
                            }
                        </Space>
                        <div className="steps-content">
                            <h3>
                                {current + 1}. <span dangerouslySetInnerHTML={{ __html: currentQuestion?.question }}></span>
                            </h3>
                            <Radio.Group
                                onChange={(e) => this.onChange(e, currentQuestion._id)}
                                value={this.state.submission[currentQuestion._id]}
                            >
                                <Space direction="vertical">
                                    {
                                        currentQuestion.options.map((option, index) => (
                                            <Radio
                                                value={index + 1}
                                                key={index}
                                            >
                                                <span dangerouslySetInnerHTML={{ __html: option }}></span>
                                            </Radio>
                                        ))
                                    }
                                </Space>
                            </Radio.Group>
                        </div>
                        <div className="steps-action">
                            {current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                                    Previous
                                </Button>
                            )}
                            {current < questions.length - 1 && (
                                <Button type="primary" onClick={() => this.next()}>
                                    Next
                                </Button>
                            )}
                            {current === questions.length - 1 && (
                                <Button type="primary">
                                    Done
                                </Button>
                            )}
                        </div>
                        <Divider />
                        <Button
                            onClick={this.onSubmitClick}
                            size="large" type="primary"
                            style={{ background: 'green', borderColor: 'green' }}
                        >
                            Submit Test</Button>
                    </Col>
                </Row>
                <Modal visible={this.state.submitted} width={400} closable={false} footer={null}>
                    {
                        this.state.submitLoading ? (
                            <div style={{ textAlign: 'center' }}>
                                Your Test is Being Submitted...<br /><br />
                                <Spin size="large" />
                            </div>
                        ) : (
                            <Result
                                status="success"
                                title="Successfully Submitted"
                                subTitle="Result will be announced shortly"
                                extra={[
                                    <Link to="/online-test">
                                        <Button type="primary" key="console">
                                            Go To Test Dashboard
                                        </Button>
                                    </Link>
                                ]}
                            />
                        )
                    }
                </Modal>
            </AppearOnlineTestWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(AppearOnlineTest);