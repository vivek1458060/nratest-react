import React, { Component } from 'react';
import { List, Avatar, Row, Col, Typography, Button, Card, message, Menu, Dropdown, Modal, Collapse, Image } from 'antd';
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
        [`activeKey${this.question_id}`]: "1"
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
            this.setState({ question });
        } catch (e) {
            console.log(e);
        }
    }
    async componentDidMount() {
        this.getAnswers();
        this.getQuestion();
    }
    onAddAnswer = async () => this.getAnswers();

    onAddComment = (question_id, comments) => {
        this.setState({
            question: { ...this.state.question, comments },
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
                            answers: this.state.answers.filter(({ _id }) => _id !== answer._id)
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
    onSettingMenuItemClick = ({ key }, answer) => {
        if (key === 'answer_edit') {
            this.props.history.push(`/answer/${answer._id}`);
        } else if (key === 'answer_delete') {
            this.deleteAnswer(answer);
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
                <Row>
                    <Col md={{ span: 14, offset: 5 }} xs={24}>
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
                                                icon={<LikeFilled />}
                                                onClick={() => this.handleLike(question, 'REMOVE_LIKE')}
                                            >
                                                {String(question.likeCount)}
                                            </Button>
                                        ) : (
                                            <Button
                                                type="text"
                                                shape="circle"
                                                icon={<LikeOutlined />}
                                                onClick={() => this.handleLike(question, 'LIKE')}
                                            >
                                                {String(question.likeCount)}
                                            </Button>
                                        ),
                                        <Button
                                            type="text"
                                            shape="circle"
                                            icon={<MessageOutlined />}
                                            onClick={() => this.handleCommentCollapse("activeKey" + question._id)}
                                        >
                                            {String(question.comments.length)}
                                        </Button>,
                                    ]}
                                    extra={
                                        question.imageUrl &&
                                        <Image
                                            width={200}
                                            src={question.imageUrl}
                                        />
                                    }
                                >
                                    <List.Item.Meta
                                        className="list-meta"
                                        avatar={<Avatar src={question.createdBy?.dpUrl} />}
                                        title={
                                            <div className="custom-meta-title">
                                                <span>{question.createdBy?.fullName}</span>
                                                <span style={{ fontSize: '12px' }}>
                                                    <Text type="secondary">Asked</Text>: {moment(question.createdAt).format('LLL')}
                                                </span>
                                            </div>
                                        }
                                    />
                                    {question.text}
                                </List.Item>
                            )}
                        />
                        <Collapse collapsible="header" activeKey={this.state["activeKey" + this.question_id]} className="comment-collapse">
                            <Collapse.Panel header="This panel can only be collapsed by clicking text" key="1">
                                <Comments
                                    user={this.props.user}
                                    comments={question?.comments || []}
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
                                        user && (user._id === answer.createdBy._id || user.role === 'admin') && <Dropdown
                                            overlay={
                                                <Menu
                                                    style={{ minWidth: '150px' }}
                                                    onClick={(e) => this.onSettingMenuItemClick(e, answer)}
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
                                        width="100%"
                                        height="315"
                                        style={{ marginBottom: answer.videoUrl ? '10px' : '' }}
                                        src={answer.imageUrl}
                                    />}
                                    {answer.videoUrl && <iframe width="100%" height="315"
                                        src={answer.videoUrl}>
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
                    </Col>
                </Row>
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