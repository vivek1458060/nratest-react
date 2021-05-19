import React, { Component } from 'react';
import { Card, Typography, Radio, Space, Button, Result, Statistic, Modal, Spin, Tag, Form, Input, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import QuizzzesWrapper from './Quizzes.style';
import axios from 'axios';

class Quizzes extends Component {
    state = {
        quizList: [],
        selectedQuiz: null,
        submission: {},
        isSubmitted: false,
        score: 0,
        scoreLoading: false,
    };

    async componentDidMount() {
        try {
            const res = await axios.get("https://nratest.s3.ap-south-1.amazonaws.com/quiz-list.json", {
                headers: {
                    Authorization: ''
                }
            });
            const quizList = res.data
            this.setState({
                quizList,
                selectedQuiz: quizList[0]
            })
        } catch (e) {
            console.log(e);
        }
    }

    onChange = (e, key) => {
        this.setState({
            submission: {
                ...this.state.submission,
                [key]: e.target.value
            }
        });
    };
    onSubmit = () => {
        this.setState({ scoreLoading: true });
        const { submission, selectedQuiz } = this.state;
        let score = 0;
        for (let key in submission) {
            const question = selectedQuiz.questionList.filter(({ id }) => id == key)[0];
            if (question.correctOption === submission[key]) {
                score++;
            }
        }
        setTimeout(() => {
            this.setState({ score, isSubmitted: true, scoreLoading: false });
        }, 2000);
        window.scrollTo(0, 0);
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
    handleSelectQuiz = (quizId) => {
        this.resetCurrentQuizState();
        this.setState({
            selectedQuiz: this.state.quizList.filter(({ id }) => id === quizId)[0]
        })
    }
    render() {
        const { quizList, selectedQuiz, isSubmitted, score, scoreLoading } = this.state;
        const questionList = selectedQuiz?.questionList;
        const passingScore = Math.floor(selectedQuiz?.questionList.length * 0.6);
        const showResult = !scoreLoading && isSubmitted;
        return (
            <QuizzzesWrapper>
                {quizList && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Form.Item label={<strong style={{paddingRight: '10px'}}>Select Quiz by date</strong>}>
                        <Select value={selectedQuiz?.id} style={{ width: 200 }} onChange={this.handleSelectQuiz}>
                            {
                                quizList.map((quiz) => (
                                    <Select.Option key={quiz.id} value={quiz.id}>{quiz.createdAt}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </div>}
                {questionList && (
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
                        <Typography.Title level={2}>Quiz</Typography.Title>
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
                            questionList.map((question, index) => (
                                <Card
                                    key={question.id}
                                    bordered={false}
                                    style={{ background: '#f5f5f5', margin: '15px 0' }}
                                >
                                    <Typography.Paragraph strong>{index + 1}. {question.text}</Typography.Paragraph>
                                    <Radio.Group
                                        onChange={(e) => this.onChange(e, question.id)}
                                        value={this.state.submission[question.id]}
                                    >
                                        <Space direction="vertical">
                                            {
                                                question.options.map((option) => (
                                                    <Radio
                                                        value={option.id}
                                                        key={option.id}
                                                    >
                                                        {option.text}
                                                    </Radio>
                                                ))
                                            }
                                        </Space>
                                        {showResult && <div style={{ margin: '10px 0' }}>
                                            <Tag
                                                color={this.state.submission[question.id] === question.correctOption ? 'success' : 'error'}
                                            >
                                                Correct Answer is option ({question.correctOption})
                                                </Tag>
                                        </div>}
                                    </Radio.Group>
                                </Card>
                            ))
                        }
                        <div style={{ margin: '20px 0 100px' }}>
                            <Button type="primary" size="large" onClick={this.onSubmit}>Submit & See result</Button>
                        </div>
                    </div>
                )}
            </QuizzzesWrapper>
        );
    }
}

export default Quizzes;