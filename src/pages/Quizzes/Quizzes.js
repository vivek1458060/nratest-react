import React, { Component } from 'react';
import { Card, Typography, Radio, Space, Button, Result, Statistic, Modal, Spin, Tag, Form, Input, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import QuizzzesWrapper from './Quizzes.style';

const quizList = [
    {
        "id": 1,
        "createdAt": "May 24, 2021",
        "questionList": [
            {
                "id": 1,
                "text": "If an electricity bill is paid before due date, one gets a  reduction of 4% on the amount of the bill. By paying the bill  before due date a person got a reduction of ` 13. The amount  of his electricity bill was",
                "options": [
                    {
                        "id": 1,
                        "text": "Rs. 125"
                    },
                    {
                        "id": 2,
                        "text": "Rs. 225"
                    },
                    {
                        "id": 3,
                        "text": "Rs. 325"
                    },
                    {
                        "id": 4,
                        "text": "Rs. 425"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 2,
                "text": "A certain amount of money is divided among x, y and z. If x  receives 25% more than y and y receives 25% less than z,  then x: y: z is equal to?",
                "options": [
                    {
                        "id": 1,
                        "text": "12:10:11"
                    },
                    {
                        "id": 2,
                        "text": "14:12:13"
                    },
                    {
                        "id": 3,
                        "text": "15:12:16"
                    },
                    {
                        "id": 4,
                        "text": "10:9:12"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 3,
                "text": "72% of the students of a certain class took Biology and  44% took Mathematics. If each student took Biology or  Mathematics and 40 took both, the total number of students  in the class was?",
                "options": [
                    {
                        "id": 1,
                        "text": "200"
                    },
                    {
                        "id": 2,
                        "text": "210"
                    },
                    {
                        "id": 3,
                        "text": "230"
                    },
                    {
                        "id": 4,
                        "text": "250"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 4,
                "text": "Two persons contested an election of Parliament. The  winning candidate secured 57% of the total votes polled  and won by a majority of 42,000 votes. The number of total  votes polled is?",
                "options": [
                    {
                        "id": 1,
                        "text": "400000"
                    },
                    {
                        "id": 2,
                        "text": "500000"
                    },
                    {
                        "id": 3,
                        "text": "600000"
                    },
                    {
                        "id": 4,
                        "text": "300000"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 5,
                "text": "In a big garden 60% of the trees are coconut trees, 25% of  the number of coconut trees are mango trees and 20% of  the number of mango trees are apple trees. If the number of  apple trees are 1500. then the number of trees in the garden  is:?",
                "options": [
                    {
                        "id": 1,
                        "text": "4800"
                    },
                    {
                        "id": 2,
                        "text": "5100"
                    },
                    {
                        "id": 3,
                        "text": "4500"
                    },
                    {
                        "id": 4,
                        "text": "5000"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 6,
                "text": "In an examination, a student must get 36% marks to pass. A  student who gets 190 marks failed by 35 marks. The total  marks in that examination is: ",
                "options": [
                    {
                        "id": 1,
                        "text": "500"
                    },
                    {
                        "id": 2,
                        "text": "625"
                    },
                    {
                        "id": 3,
                        "text": "810"
                    },
                    {
                        "id": 4,
                        "text": "550"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 7,
                "text": "In a motor of 120 machine parts, 5% parts were defective. In  another motor of 80 machine parts, 10% parts were defective.  For the two motors considered together, the percentage of  defective machine parts were",
                "options": [
                    {
                        "id": 1,
                        "text": "6.5"
                    },
                    {
                        "id": 2,
                        "text": "7"
                    },
                    {
                        "id": 3,
                        "text": "7.5"
                    },
                    {
                        "id": 4,
                        "text": "8"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 8,
                "text": "The monthly salaries of A and B together amount to ` 40,000.  A spends 85% of his salary and B, 95% of his salary. If now  their savings are the same, then the salary (in `) of A is ",
                "options": [
                    {
                        "id": 1,
                        "text": "10000"
                    },
                    {
                        "id": 2,
                        "text": "12000"
                    },
                    {
                        "id": 3,
                        "text": "16000"
                    },
                    {
                        "id": 4,
                        "text": "18000"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 9,
                "text": "80 litre mixture of milk and water contains 10% milk. How  much milk (in litres) must be added to make water percentage  in the mixture as 80%?  ",
                "options": [
                    {
                        "id": 1,
                        "text": "8"
                    },
                    {
                        "id": 2,
                        "text": "9"
                    },
                    {
                        "id": 3,
                        "text": "10"
                    },
                    {
                        "id": 4,
                        "text": "12"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 10,
                "text": "The population of a city increases at the rate of 5% per  annum. If the present population of the city is 3,70,440.  It population 3 years ago was: ",
                "options": [
                    {
                        "id": 1,
                        "text": "280000"
                    },
                    {
                        "id": 2,
                        "text": "360000"
                    },
                    {
                        "id": 3,
                        "text": "32000"
                    },
                    {
                        "id": 4,
                        "text": "30000"
                    }
                ],
                "correctOption": 3
            }
        ]
    },
    {
        "id": 2,
        "createdAt": "May 25, 2021",
        "questionList": [
            {
                "id": 1,
                "text": " A shopkeeper earns a profit of 12% on selling a book at 10%  discount on the printed price. The ratio for the cost price and  the printed price of the book is",
                "options": [
                    {
                        "id": 1,
                        "text": "45:46"
                    },
                    {
                        "id": 2,
                        "text": "45:51"
                    },
                    {
                        "id": 3,
                        "text": "47:56"
                    },
                    {
                        "id": 4,
                        "text": "47:51"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 2,
                "text": "A manufacturer marked an article at `50 and sold it allowing  20% discount. If his profit was 25% then the cost price of the  article was?",
                "options": [
                    {
                        "id": 1,
                        "text": "40"
                    },
                    {
                        "id": 2,
                        "text": "35"
                    },
                    {
                        "id": 3,
                        "text": "32"
                    },
                    {
                        "id": 4,
                        "text": "30"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 3,
                "text": "If on a marked price, the difference of selling prices with a  discount of 30% and two successive discounts of 20% and  10% is ` 72, then the marked price (in rupees) is  ?",
                "options": [
                    {
                        "id": 1,
                        "text": "3600"
                    },
                    {
                        "id": 2,
                        "text": "3000"
                    },
                    {
                        "id": 3,
                        "text": "2500"
                    },
                    {
                        "id": 4,
                        "text": "2400"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 4,
                "text": "When the price of sugar decreases by 10%, a man could buy  1 kg more for ` 270. Then the original price of sugar per kg is ?",
                "options": [
                    {
                        "id": 1,
                        "text": "25"
                    },
                    {
                        "id": 2,
                        "text": "30"
                    },
                    {
                        "id": 3,
                        "text": "27"
                    },
                    {
                        "id": 4,
                        "text": "32"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 5,
                "text": "X sells two articles for ` 4,000 each with no loss and no gain  in the interaction. If one was sold at a gain of 25% the other  is sold at a loss of",
                "options": [
                    {
                        "id": 1,
                        "text": "25%"
                    },
                    {
                        "id": 2,
                        "text": "20%"
                    },
                    {
                        "id": 3,
                        "text": "(50/3)%"
                    },
                    {
                        "id": 4,
                        "text": "15%"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 6,
                "text": " A reduction of 20% in the price of sugar enables me to  purchase 5 kg more for ` 600. Find the price of sugar per kg  before reduction of price ",
                "options": [
                    {
                        "id": 1,
                        "text": "24"
                    },
                    {
                        "id": 2,
                        "text": "30"
                    },
                    {
                        "id": 3,
                        "text": "32"
                    },
                    {
                        "id": 4,
                        "text": "36"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 7,
                "text": " A trader has a weighing balance that shows 1,200 gm for a  kilogram. He further marks up his cost price by 10%. Then  the net profit percentage is",
                "options": [
                    {
                        "id": 1,
                        "text": "32%"
                    },
                    {
                        "id": 2,
                        "text": "23%"
                    },
                    {
                        "id": 3,
                        "text": "31.75%"
                    },
                    {
                        "id": 4,
                        "text": "23.75%"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 8,
                "text": " The monthly salaries of A and B together amount to ` 40,000.  A spends 85% of his salary and B, 95% of his salary. If now  their savings are the same, then the salary (in `) of A is ",
                "options": [
                    {
                        "id": 1,
                        "text": "10000"
                    },
                    {
                        "id": 2,
                        "text": "12000"
                    },
                    {
                        "id": 3,
                        "text": "16000"
                    },
                    {
                        "id": 4,
                        "text": "18000"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 9,
                "text": " 36. The printed price of a book is ` 320. A retailer pays ` 244.80  for it. He gets successive discounts of 10% and an another  rate. His second rate is:   ",
                "options": [
                    {
                        "id": 1,
                        "text": "15%"
                    },
                    {
                        "id": 2,
                        "text": "16%"
                    },
                    {
                        "id": 3,
                        "text": "14%"
                    },
                    {
                        "id": 4,
                        "text": "12%"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 10,
                "text": " A fruit seller buys some oranges at the rate of 4 for ` 10 and  an equal number more at 5 for ` 10. He sells the whole lot at  9 for ` 20. What is his loss or gain percent? ",
                "options": [
                    {
                        "id": 1,
                        "text": " Loss percent 1(19/81)%  "
                    },
                    {
                        "id": 2,
                        "text": "Gain percent 1(19/81)%"
                    },
                    {
                        "id": 3,
                        "text": "No profit no loss"
                    },
                    {
                        "id": 4,
                        "text": "Loss of 2 %"
                    }
                ],
                "correctOption": 1
            }
        ]
    }
]

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
            // const res = await axios.get("https://nratest.s3.ap-south-1.amazonaws.com/quiz-list.json", {
            //     headers: {
            //         Authorization: ''
            //     }
            // });
            // const quizList = res.data
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
                    <Form.Item label={<strong style={{ paddingRight: '10px' }}>Select Quiz by date</strong>}>
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