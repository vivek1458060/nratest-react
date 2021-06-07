import React, { Component } from 'react';
import { Card, Typography, Radio, Space, Button, Result, Statistic, Modal, Spin, Tag, Form, Select, Alert } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import QuizzzesWrapper from './Quizzes.style';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Quizzes extends Component {
    state = {
        quizList: [],
        selectedQuiz: null,
        questionList: [],
        submission: {},
        isSubmitted: false,
        score: 0,
        scoreLoading: false,
    };

    getScore = async (quizId) => {
        try {
            const res = await axios.get(`/test-submission/${quizId}`);
            const data = res.data.score;
            this.setState({ score: data.score, isSubmitted: true, submission: data.submission || {} })
        } catch (e) {
            console.log(e);
        }
    }

    getQuestionList = async (quizId) => {
        try {
            const res = await axios.get(`/test-question/${quizId}`);
            const questionList = res.data.testQuestions;
            this.setState({ questionList })
        } catch (e) {
            console.log(e);
        }
    }

    getQuizzes = async () => {
        try {
            const res = await axios.get("/test/all", { params: { type: 'QUIZ' } });
            const quizList = res.data.tests;
            this.setState({
                quizList,
                selectedQuiz: quizList[0]
            })
            if (quizList.length) {
                const quizId = quizList[0]._id;
                this.getQuestionList(quizId);
                if (this.props.user) {
                    this.getScore(quizId);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
    async componentDidMount() {
        this.getQuizzes();
    }

    onChange = (e, key) => {
        this.setState({
            submission: {
                ...this.state.submission,
                [key]: e.target.value
            }
        });
    };
    onSubmit = async () => {
        try {
            this.setState({ scoreLoading: true });
            const { submission, selectedQuiz, questionList } = this.state;
            let score = 0;
            for (let key in submission) {
                const question = questionList.filter(({ _id }) => _id == key)[0];
                if (question.correctOption === submission[key]) {
                    score++;
                }
            }
            window.scrollTo(0, 0);
            if (this.props.user) {
                await axios.post("/test-submission", { testId: selectedQuiz._id, score, submission });
            }
            this.setState({ score, isSubmitted: true });
        } catch (e) {
            console.log(e);
        }
        if (this.props.user) {
            this.setState({ scoreLoading: false });
        } else {
            setTimeout(() => {
                this.setState({ scoreLoading: false });
            }, 2000)
        }
    }
    resetCurrentQuizState = () => this.setState({ isSubmitted: false, score: 0, submission: {} })
    resetQuiz = () => {
        Modal.confirm({
            title: 'Do you want to reset this question?',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                this.resetCurrentQuizState()
            },
            onCancel() { },
        });
    }
    handleSelectQuiz = async (value, type) => {
        this.resetCurrentQuizState();
        const selectedQuiz = this.state.quizList.filter((quiz) => {
            return quiz._id === value
        })[0];
        this.setState({
            scoreLoading: true,
            selectedQuiz,
        });
        this.getQuestionList(selectedQuiz._id);
        if (this.props.user) {
            try {
                await this.getScore(selectedQuiz._id);
            } catch (e) { }
        }
        this.setState({
            scoreLoading: false
        });
    }
    render() {
        const { quizList, selectedQuiz, questionList, isSubmitted, score, scoreLoading } = this.state;
        const passingScore = Math.floor(questionList.length * 0.6);
        const showResult = !scoreLoading && isSubmitted;
        return (
            <QuizzzesWrapper>
                {quizList && (
                    <Form
                        layout="vertical"
                        style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', marginBottom: '15px' }}
                    >
                        <Form.Item
                            label={<strong>Select Topic</strong>}
                            style={{ margin: '0px 10px' }}
                        >
                            <Select
                                value={selectedQuiz?._id}
                                style={{ width: 200 }}
                                onChange={(value) => this.handleSelectQuiz(value, "topic")}
                            >
                                {
                                    quizList.map((quiz) => (
                                        <Select.Option key={quiz._id} value={quiz._id}>{quiz.title}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                )}
                {questionList.length > 0 && (
                    <div className="question-list">
                        {scoreLoading && <div className="example">
                            <Spin size="large" />
                        </div>}
                        {showResult &&
                            <Spin spinning={this.state.scoreLoading}>
                                <Result
                                    status={score >= passingScore ? 'success' : 'error'}
                                    title={score >= passingScore ? 'Congratulations. you passed' : 'Sorry. You failed'}
                                    subTitle={<Space>
                                        <Button type="primary" onClick={this.resetQuiz}>Attempt Again</Button>
                                        <Button href="#q_1">View Answer</Button>
                                    </Space>}
                                    extra={[
                                        <Space size="large">
                                            <Statistic title="Your Score" value={score} />
                                            <Statistic title="Passing Score" value={passingScore} />
                                        </Space>
                                    ]}
                                >
                                </Result>
                            </Spin>
                        }
                        <Typography.Title level={2}>{selectedQuiz?.heading}</Typography.Title>
                        <Typography.Text>
                            Responders will see the results and correct answers immediately after submitting the Quiz.
                            </Typography.Text><br />
                        <Typography.Text
                            id="q_1"
                            type="secondary"
                            style={{ fontSize: '16px' }}
                        >
                            (Total Question: {questionList.length})
                            </Typography.Text>
                        {
                            questionList.map((item, index) => (
                                <Card
                                    key={item._id}
                                    bordered={false}
                                    style={{ background: '#f5f5f5', margin: '15px 0' }}
                                >
                                    <Typography.Paragraph strong>{index + 1}. <span dangerouslySetInnerHTML={{ __html: item.question }}></span></Typography.Paragraph>
                                    <Radio.Group
                                        onChange={(e) => this.onChange(e, item._id)}
                                        value={this.state.submission[item._id]}
                                    >
                                        <Space direction="vertical">
                                            {
                                                item.options.map((option, index) => (
                                                    <Radio
                                                        value={index + 1}
                                                        key={index}
                                                    >
                                                        <span dangerouslySetInnerHTML={{ __html: option }}></span>
                                                    </Radio>
                                                ))
                                            }
                                        </Space>
                                        {showResult && <div style={{ margin: '10px 0' }}>
                                            <Tag
                                                color={this.state.submission[item._id] === item.correctOption ? 'success' : 'error'}
                                            >
                                                Correct Answer is option ({item.correctOption})
                                                </Tag>
                                        </div>}
                                    </Radio.Group>
                                </Card>
                            ))
                        }
                        <div>
                            <Button type="primary" size="large" onClick={this.onSubmit}>Submit & See result</Button>
                        </div>
                        {!this.props.user && <Alert
                            style={{ margin: '20px 0px' }}
                            message={<><Link to="/login">Login </Link>to save your choices and results.</>}
                            // description="Additional description and information about copywriting."
                            type="info"
                            showIcon
                        />}
                    </div>
                )}
            </QuizzzesWrapper>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(Quizzes);