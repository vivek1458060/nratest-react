import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Row, Col, Typography, Button, Card, Collapse, Dropdown, Menu, Modal, message, Image } from 'antd';
import { MessageOutlined, LikeOutlined, LikeFilled, SettingOutlined, ExclamationCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import QuestionWrapper from './QuestionList.style';
import Comments from '../../components/Comments/QuestionComments';
import RenderAuthModal from '../../components/RenderAuthModal';

const { Text, Title } = Typography;
const { Panel } = Collapse;
const { confirm } = Modal;

class QuestionList extends Component {
    state = {
        showCommentForm: false,
        questions: [],
    }
    getQuestions = async (filters) => {
        try {
            const res = await axios.get("/questions/list", {
                params: filters
            });
            const questions = res.data.questions;
            this.setState({ questions });
        } catch (e) {
            console.log(e);
        }
    }
    async componentDidMount() {
        this.getQuestions();
    }
    handleCommentCollapse = (key) => {
        this.setState({ [key]: !this.state[key] || this.state[key] === "0" ? "1" : "0" })
    }
    handleCommentFormDisplay = () => {
        this.setState({ showCommentForm: !this.state.showCommentForm })
    }
    onAddComment = (question_id, comments) => {
        this.setState({
            questions: this.state.questions.map((question) => {
                if (question._id === question_id) {
                    question.comments = comments;
                }
                return question;
            })
        });
    }
    deleteQuestion = (question) => {
        try {
            confirm({
                title: 'Do you want to delete this question?',
                icon: <ExclamationCircleOutlined />,
                content: question.text,
                onOk: async () => {
                    try {
                        await axios.delete(`/questions/${question._id}`);
                        this.setState({
                            questions: this.state.questions.filter(({ _id }) => _id !== question._id)
                        });
                        message.success("Question deleted successfully");
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
    onSettingMenuItemClick = ({ key }, question) => {
        if (key === 'question_edit') {
            this.props.history.push(`/question/edit/${question._id}`);
        } else if (key === 'question_delete') {
            this.deleteQuestion(question);
        }
    }
    handleLike = async (question, action) => {
        if (!this.props.user) return this.showLoginModal();

        try {
            const res = await axios.get(`questions/${question._id}/${action}`);
            this.setState({
                questions: this.state.questions.map((elem) => {
                    if (elem._id === question._id) {
                        return {
                            ...elem,
                            likeCount: res.data.question.likeCount,
                            likes: res.data.question.likes
                        };
                    };
                    return elem;
                })
            })
        } catch (e) {
            console.log(e);
        }
    }
    showLoginModal = () => this.setState({ showSigninModal: true });
    render() {
        const { questions } = this.state;
        const { user } = this.props;
        return (
            <QuestionWrapper>
                <Row>
                    <Col md={{ span: 14, offset: 5 }} xs={24}>
                        <Card bordered={false} className="title-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Title level={2} className="title">Questions</Title>
                                <Link to="/question/ask">
                                    <Button type="primary" danger>Ask Question</Button>
                                </Link>
                            </div>
                            <Title type="secondary" className="subtitle" level={4}>Don't hesitate to ask for help...</Title>
                        </Card>
                        <div className="ant-btn-group filters">
                            <Button onClick={() => this.getQuestions({ tab: 'newest' })}>Newest</Button>
                            <Button onClick={() => this.getQuestions({ tab: 'answered' })}>Answered</Button>
                        </div>
                        <List
                            itemLayout="vertical"
                            size="small"
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 3,
                            }}
                            dataSource={questions}
                            // footer={
                            //     <div>
                            //         <b>ant design</b> footer part
                            //     </div>
                            // }
                            renderItem={question => (
                                <List.Item
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
                                        user && (user._id === question.createdBy._id || user.role === 'admin') && <Dropdown
                                            overlay={
                                                <Menu style={{ minWidth: '150px' }} onClick={(e) => this.onSettingMenuItemClick(e, question)}>
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
                                                onClick={e => e.preventDefault()}
                                                type="text"
                                                shape="circle"
                                            >
                                                <SettingOutlined />
                                            </Button>
                                        </Dropdown>,
                                        <Collapse collapsible="header" activeKey={this.state["activeKey" + question._id]} className="comment-collapse">
                                            <Panel header="This panel can only be collapsed by clicking text" key="1">
                                                <Comments
                                                    user={this.props.user}
                                                    question_id={question._id}
                                                    comments={question.comments}
                                                    onAddComment={this.onAddComment}
                                                />
                                            </Panel>
                                        </Collapse>
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
                                        avatar={<Avatar src={question.createdBy.dpUrl} />}
                                        title={
                                            <div className="custom-meta-title">
                                                <span>{question.createdBy.fullName}</span>
                                                <span style={{ fontSize: '12px' }}>
                                                    <Text type="secondary">Asked: {moment(question.createdAt).format('LLL')}</Text>
                                                </span>
                                            </div>
                                        }
                                    />
                                    <Link to={`/${question._id}/solutions`} className="custom-anchor pre-wrap">{question.text}</Link>
                                </List.Item>
                            )}
                        />
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

export default connect(mapStateToProps)(QuestionList);