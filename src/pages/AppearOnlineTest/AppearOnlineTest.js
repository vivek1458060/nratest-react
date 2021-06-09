import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Layout, Steps, Button, message, Radio, Space, Divider, Modal, Result, Spin, Tag } from 'antd';
import { ExclamationCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AppearOnlineTestWrapper from './AppearOnlineTest.style';
import axios from 'axios';
import Countdown from 'react-countdown';
import { connect } from 'react-redux';
import SEO from '../../components/SEO';

class Timer extends React.Component {
    state = {}
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <Countdown
                onComplete={this.props.onComplete}
                date={Date.now() + this.props.duration}
                renderer={({ hours, minutes, seconds, completed }) => {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            Time Left: <span>{hours}:{minutes}:{seconds}</span>
                        </div>
                    )
                }}
            />
        );
    }
}

class AppearOnlineTest extends React.Component {
    state = {
        test: null,
        questions: [],
        current: 0,
        submission: {},
        submitted: false,
        submitLoading: false,
    };
    testId = this.props.match.params.testId;
    getTest = async () => {
        try {
            const res = await axios.get(`/test/${this.testId}`);
            this.setState({ test: res.data.test, submission: res.data.test.submission?.[0]?.submission || {} });
        } catch (e) {
            console.log(e);
        }
    }
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
    async componentDidMount() {
        this.getTest();
        this.getQuestions();
    }
    next = () => {
        this.setState({ current: this.state.current + 1 });
    };
    prev = () => {
        this.setState({ current: this.state.current - 1 });
    };
    onChange = (e, key) => {
        if (this.state.test.submission?.length > 0) {
            return message.warning("Test is view Only")
        }
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
            const { test, submission, questions } = this.state;
            const reqObj = { testId: this.testId, submission };
            let score = 0;
            for (let key in submission) {
                const question = questions.filter(({ _id }) => _id == key)[0];
                if (question.correctOption === submission[key]) {
                    score++;
                } else {
                    score -= 0.25;
                }
            }
            reqObj.score = score;

            if (this.props.user) {
                await axios.post("/test-submission", reqObj);
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
            title: 'Do you want to Submit this Test?',
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
            if (questions[i].section === key) {
                this.setState({ current: i });
                break
            }
        }
    }
    render() {
        const { test, current, questions, submission, sections } = this.state;
        const currentQuestion = questions[current];
        if (!currentQuestion) return <span>Loading...</span>;
        const hasSubmitted = test?.submission?.length > 0;
        if (!test) return "Loading..."
        return (
            <AppearOnlineTestWrapper>
                <SEO title="Online test" meta={[{ property: 'robots', content: 'noindex' }]} />
                <Row>
                    <Col lg={{ span: 18, offset: 2 }} xs={24}>
                        <Layout.Header className="header" style={{ marginBottom: '45px' }}>
                            <img className="logo" src="/cover2.png" width="250" alt="logo" />
                        </Layout.Header>
                        {!hasSubmitted && <div style={{ marginBottom: '10px' }}>
                            <Timer onComplete={this.onComplete} duration={test?.testDuration*60000} /> {/*  duration is in minutes */}
                        </div>}
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
                                value={String(submission[currentQuestion._id])}
                            >
                                <Space direction="vertical">
                                    {
                                        currentQuestion.options.map((option, index) => (
                                            <Radio
                                                value={String(index + 1)}
                                                key={index}
                                            >
                                                <span style={{marginRight: '10px'}} dangerouslySetInnerHTML={{ __html: option }}></span>
                                                {
                                                    hasSubmitted && index + 1 == submission[currentQuestion._id] && (
                                                        index + 1 ==  currentQuestion.correctOption ?
                                                        <CheckCircleOutlined style={{color: 'green'}} /> :
                                                        <CloseCircleOutlined style={{color: 'red'}} />  
                                                    )
                                                }
                                            </Radio>
                                        ))
                                    }
                                </Space>
                            </Radio.Group>
                            <div style={{ marginTop: '15px' }}>
                                { hasSubmitted && <Tag color="geekblue">Correct Option: {currentQuestion.correctOption}</Tag>}
                            </div>
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
                        {!hasSubmitted && (
                            <div>
                                <Divider />
                                <Button
                                    onClick={this.onSubmitClick}
                                    size="large" type="primary"
                                    style={{ background: 'green', borderColor: 'green' }}
                                >
                                    Submit Test
                                </Button>
                            </div>
                        )}
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