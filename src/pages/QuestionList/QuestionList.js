import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Row, Typography, Button, Empty, Collapse, Dropdown, Menu, Modal, message, Image, Radio, Spin } from 'antd';
import { MessageOutlined, LikeOutlined, LikeFilled, SettingOutlined, ExclamationCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import QuestionWrapper from './QuestionList.style';
import Comments from '../../components/Comments/QuestionComments';
import RenderAuthModal from '../../components/RenderAuthModal';
import { InView } from 'react-intersection-observer';
import InfiniteScroll from 'react-infinite-scroller';
import SEO from '../../components/SEO';

const { Text, Title } = Typography;
const { Panel } = Collapse;
const { confirm } = Modal;

class QuestionList extends Component {
    state = {
        showCommentForm: false,
        questions: [],
        loading: false,
        hasMore: true,
        skip: 0,
        limit: 10
    }
    getQuestions = (query = {
        skip: this.state.skip,
        limit: this.state.limit
    }) => {
        return axios.get("/questions/list", {
            params: query
        });
    }
    componentDidMount() {
        this.handleInfiniteOnLoad();
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
                    question.commentCount += 1;
                }
                return question;
            })
        });
    }
    handleFilterTabChange = async (e) => {
        this.setState({ loading: true, hasMore: true, questions: [] });
        try {
            const skip = 0; 
            const res = await this.getQuestions({ tab: e.target.value, skip, limit: this.state.limit });
            const questions = res.data.questions;
            this.setState({
                questions,
                skip: skip + this.state.limit,
                hasMore: !!questions.length,
            })
        } catch (e) {
            console.log(e);
        }
        this.setState({ loading: false });
    }
    handleInfiniteOnLoad = async () => {
        this.setState({ loading: true });
        if (!this.state.hasMore) return;
        try {
            const res = await this.getQuestions();
            const questions = res.data.questions;
            this.setState({
                questions: this.state.questions.concat(questions),
                skip: this.state.skip + this.state.limit,
                hasMore: questions.length > 0,
            })
        } catch (e) {
            console.log(e);
        }
        this.setState({ loading: false });
    };
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
                <SEO title="Question Answers" />
                <div bordered="false" className="title-card">
                    <div className="title-container">
                        <Title level={2} className="title">Questions</Title>
                        <Link to="/question/ask">
                            <Button type="primary" danger>Ask Question</Button>
                        </Link>
                    </div>
                    <Title type="secondary" className="subtitle" level={4}>Don't hesitate to ask for help...</Title>
                </div>
                <Radio.Group
                    defaultValue="newest"
                    onChange={this.handleFilterTabChange}
                    className="filters"
                >
                    <Radio.Button style={{padding: '0 12px'}} value="newest">Newest</Radio.Button>
                    <Radio.Button style={{padding: '0 12px'}} value="answered">Answered</Radio.Button>
                    {user && <Radio.Button style={{padding: '0 12px'}} value="my_questions">My Questions</Radio.Button>}
                </Radio.Group>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={true}
                >
                    <List
                        itemLayout="vertical"
                        size="small"
                        dataSource={questions}
                        renderItem={question => (
                            <List.Item
                                key={question._id}
                                actions={[
                                    this.props.user && question.likes.includes(this.props.user._id) ? (
                                        <Button
                                            type="text"
                                            size="small"
                                            onClick={() => this.handleLike(question, 'REMOVE_LIKE')}
                                            style={{ color: '#1890ff' }}
                                        >
                                            <LikeFilled /> {question.likeCount}
                                        </Button>
                                    ) : (
                                        <Button
                                            type="text"
                                            size="small"
                                            onClick={() => this.handleLike(question, 'LIKE')}
                                        >
                                            <LikeOutlined /> {question.likeCount}
                                        </Button>
                                    ),
                                    <Button
                                        type="text"
                                        size="small"
                                        onClick={() => this.handleCommentCollapse("activeKey" + question._id)}
                                    >
                                        <MessageOutlined /> {question.commentCount}
                                    </Button>,
                                    <Link to={`/${question._id}/solutions`}>
                                        <Button
                                        // type="primary"
                                        >
                                            {question.answerCount} Answers
                                            </Button>
                                    </Link>,
                                    <Collapse collapsible="header" activeKey={this.state["activeKey" + question._id]} className="comment-collapse">
                                        <Panel header="This panel can only be collapsed by clicking text" key="1">
                                            <Comments
                                                user={this.props.user}
                                                question_id={question._id}
                                                onAddComment={this.onAddComment}
                                            />
                                        </Panel>
                                    </Collapse>
                                ]}
                            >
                                <List.Item.Meta
                                    className="list-meta"
                                    avatar={<Avatar src={question.createdBy?.dpUrl} />}
                                    title={
                                        <>
                                            <div className="custom-meta-title">
                                                <span>{question.createdBy?.fullName}</span>
                                                <span style={{ fontSize: '12px' }}>
                                                    <Text type="secondary">Asked: {moment(question.createdAt).format('LLL')}</Text>
                                                </span>
                                            </div>
                                            {
                                                user && (user._id === question.createdBy?._id || user.role === 'admin') && <Dropdown
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
                                <Row>
                                    {question.text && <div style={{ flex: 1 }}>
                                        <Typography.Paragraph className="pre-wrap">
                                            {question.text}
                                        </Typography.Paragraph>
                                    </div>}
                                    <InView triggerOnce={true}>
                                        {({ inView, ref, entry }) => {
                                            return (
                                                <div ref={ref}>
                                                    <Image
                                                        className="contain-image"
                                                        src={inView ? question.imageUrl : ''}
                                                    />
                                                </div>
                                            )
                                        }}
                                    </InView>
                                </Row>
                            </List.Item>
                        )}
                    >
                        {this.state.loading && this.state.hasMore && (
                            <div className="demo-loading-container">
                                <Spin size="large" />
                            </div>
                        )}
                        {
                            !this.state.loading && !this.state.hasMore && (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description="No more questions"
                                />
                            )
                        }
                    </List>
                </InfiniteScroll>
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