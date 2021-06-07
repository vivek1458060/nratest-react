import React, { Component } from 'react';
import { List, Avatar, Row, Typography, Button, Card, message, Menu, Dropdown, Modal, Collapse, Image } from 'antd';
import { LikeOutlined, LikeFilled, SettingOutlined, ExclamationCircleOutlined, EditOutlined, DeleteOutlined, MessageOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import QuestionWrapper from './Solutions.style';
import Comments from '../../components/Comments/QuestionComments';
import AnswerForm from '../../components/AnswerForm/AnswerForm';
import RenderAuthModal from '../../components/RenderAuthModal';

const { Text, Title } = Typography;
const { Meta } = Card;
const { confirm } = Modal;

class Solutions extends Component {
    question_id = this.props.match.params.question_id;
    state = {
        showCommentForm: false,
        fileList: [],
        question: null,
        answers: [],
        [`activeKey${this.question_id}`]: "0"
    }
    handleCommentFormDisplay = () => {
        this.setState({ showCommentForm: !this.state.showCommentForm })
    }
    getAnswers = async () => {
        try {
            const res = await axios.get("/answers/list/" + this.question_id);
            const answers = res.data.answers;
            this.setState({ answers });
        } catch (e) {
            console.log(e);
        }
    }
    getQuestion = async () => {
        try {
            const res = await axios.get("/questions/" + this.question_id);
            const question = res.data.question;
            this.setState({ 
                question, 
                [`activeKey${this.question_id}`]: question.commentCount > 0 ? "1" : "0"
            });
        } catch (e) {
            console.log(e);
        }
    }
    async componentDidMount() {
        this.getAnswers();
        this.getQuestion();
    }

    onAddAnswer = async (answer) => {
        this.setState({
            answers: [{
                ...answer,
                createdBy: this.props.user,
            },
            ...this.state.answers
            ],
            question: {
                ...this.state.question,
                answerCount: this.state.question.answerCount + 1,
            }
        })
    };

    onAddComment = () => {
        this.setState({
            question: {
                ...this.state.question,
                commentCount: this.state.question.commentCount + 1
            },
        })
    }
    deleteAnswer = (answer) => {
        try {
            confirm({
                title: 'Do you want to delete this answer?',
                icon: <ExclamationCircleOutlined />,
                content: answer.text,
                onOk: async () => {
                    try {
                        await axios.delete(`/answers/${answer._id}`);
                        this.setState({
                            answers: this.state.answers.filter(({ _id }) => _id !== answer._id),
                            question: {
                                ...this.state.question,
                                commentCount: this.state.question.commentCount - 1
                            },
                        });
                        message.success("Answer deleted successfully");
                    } catch (e) {
                        console.log(e);
                    }
                },
                onCancel() { },
            });
        } catch (e) {
            console.log(e);
        }
    }
    onAnswerSettingClick = ({ key }, answer) => {
        if (key === 'answer_edit') {
            this.props.history.push(`/answer/${answer._id}`);
        } else if (key === 'answer_delete') {
            this.deleteAnswer(answer);
        }
    }
    onQuestionSettingClick = ({ key }, question) => {
        if (key === 'question_edit') {
            this.props.history.push(`/question/edit/${question._id}`);
        } else if (key === 'question_delete') {
            this.deleteQuestion(question);
        }
    }
    handleCommentCollapse = (key) => {
        this.setState({ [key]: !this.state[key] || this.state[key] === "0" ? "1" : "0" })
    }
    handleLike = async (question, action) => {
        if (!this.props.user) return this.showLoginModal();
        try {
            const res = await axios.get(`questions/${question._id}/${action}`);
            this.setState({
                question: {
                    ...this.state.question,
                    likeCount: res.data.question.likeCount,
                    likes: res.data.question.likes,
                }
            })
        } catch (e) {
            console.log(e);
        }
    }
    showLoginModal = () => this.setState({ showSigninModal: true });
    render() {
        const { question, answers } = this.state;
        const { user } = this.props;
        return (
            <QuestionWrapper>
                <List
                    itemLayout="vertical"
                    size="small"
                    dataSource={question ? [question] : []}
                    // footer={
                    //     <div>
                    //         <b>ant design</b> footer part
                    //     </div>
                    // }
                    renderItem={question => (
                        <List.Item
                            size="small"
                            key={question._id}
                            actions={[
                                this.props.user && question.likes.includes(this.props.user._id) ? (
                                    <Button
                                        type="text"
                                        style={{ color: '#1890ff' }}
                                        onClick={() => this.handleLike(question, 'REMOVE_LIKE')}
                                    >
                                        <LikeFilled /> {question.likeCount}
                                    </Button>
                                ) : (
                                    <Button
                                        type="text"
                                        shape="circle"
                                        onClick={() => this.handleLike(question, 'LIKE')}
                                    >
                                        <LikeOutlined /> {question.likeCount}
                                    </Button>
                                ),
                                <Button
                                    type="text"
                                    shape="circle"
                                    onClick={() => this.handleCommentCollapse("activeKey" + question._id)}
                                >
                                    <MessageOutlined /> {question.commentCount}
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta
                                className="list-meta"
                                avatar={<Avatar src={question.createdBy?.dpUrl} />}
                                title={
                                    <>
                                        <div className="custom-meta-title">
                                            <span>{question.createdBy.fullName}</span>
                                            <span style={{ fontSize: '12px' }}>
                                                <Text type="secondary">Asked: {moment(question.createdAt).format('LLL')}</Text>
                                            </span>
                                        </div>
                                        {
                                            user && (user._id === question.createdBy._id || user.role === 'admin') && <Dropdown
                                                overlay={
                                                    <Menu style={{ minWidth: '150px' }} onClick={(e) => this.onQuestionSettingClick(e, question)}>
                                                        <Menu.Item key="question_edit" icon={<EditOutlined />}>
                                                            Edit
                                                            </Menu.Item>
                                                        <Menu.Item key="question_delete" icon={<DeleteOutlined />}>
                                                            Delete
                                                            </Menu.Item>
                                                    </Menu>
                                                }
                                                trigger={['click']}
                                            >
                                                <Button
                                                    type="text"
                                                    icon={<SettingOutlined />}
                                                    onClick={e => e.preventDefault()}
                                                >
                                                </Button>
                                            </Dropdown>
                                        }
                                    </>
                                }
                            />
                            {question.text && <div>
                                <Typography.Paragraph className="pre-wrap">
                                    {question.text}
                                </Typography.Paragraph>
                            </div>}
                            <Image
                                className="contain-image"
                                src={question.imageUrl}
                            />
                        </List.Item>
                    )}
                />
                <Collapse collapsible="header" activeKey={this.state["activeKey" + this.question_id]} className="comment-collapse">
                    <Collapse.Panel header="This panel can only be collapsed by clicking text" key="1">
                        <Comments
                            user={this.props.user}
                            question_id={this.question_id}
                            onAddComment={this.onAddComment}
                        />
                    </Collapse.Panel>
                </Collapse>
                <Title level={4} style={{ paddingLeft: '12px', marginTop: '40px', fontWeight: 300, }}>{answers.length} Answers</Title>
                {
                    answers.map((answer) => (
                        <Card
                            size="small"
                            bordered={true}
                            style={{ marginTop: '20px' }}
                            key={answer._id}
                            title={
                                <Meta
                                    style={{ padding: '8px 0px' }}
                                    avatar={
                                        <Avatar src={answer.createdBy.dpUrl} />
                                    }
                                    title={
                                        <div className="custom-meta-title">
                                            <span>{answer.createdBy?.fullName}</span>
                                            <span style={{ fontSize: '12px' }} className="subtitle">
                                                <Text type="secondary">Asked: </Text>{moment(answer.createdAt).format('LLL')}
                                            </span>
                                        </div>
                                    }
                                //description={<Text type="secondary">- {moment(answer.createdAt).format('LLL')}</Text>}
                                />}
                            extra={
                                user &&
                                (
                                    user.role === 'admin' ||
                                    user._id === answer.createdBy._id ||
                                    user._id === answer.createdBy
                                ) &&
                                <Dropdown
                                    overlay={
                                        <Menu
                                            style={{ minWidth: '150px' }}
                                            onClick={(e) => this.onAnswerSettingClick(e, answer)}
                                        >
                                            <Menu.Item key="answer_edit" icon={<EditOutlined />}>
                                                Edit
                                                    </Menu.Item>
                                            <Menu.Item key="answer_delete" icon={<DeleteOutlined />}>
                                                Delete
                                                    </Menu.Item>
                                        </Menu>
                                    }
                                    trigger={['click']}
                                >
                                    <Button type="link" onClick={e => e.preventDefault()} size="large">
                                        <SettingOutlined />
                                    </Button>
                                </Dropdown>
                            }
                        >
                            <p className="pre-wrap">{answer.text}</p>
                            {answer.imageUrl && <Image
                                className="contain-image"
                                style={{ marginBottom: answer.videoUrl ? '10px' : '' }}
                                src={answer.imageUrl}
                            />}
                            {answer.videoUrl && 
                            <iframe 
                                width="100%" 
                                height="400" 
                                title="video solution"
                                src={answer.videoUrl}
                                allow="fullscreen;"
                            >
                            </iframe>}
                        </Card>
                    ))
                }
                <Card style={{ marginTop: '40px' }}>
                    <Title level={4} style={{ fontWeight: 300 }}>Write an answer</Title>
                    <AnswerForm
                        user={this.props.user}
                        onAddAnswer={this.onAddAnswer}
                        question_id={this.question_id}
                    />
                </Card>
                <RenderAuthModal
                    show={this.state.showSigninModal}
                    onClose={() => this.setState({ showSigninModal: false })}
                />
            </QuestionWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(Solutions);