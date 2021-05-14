import { useState } from 'react';
import { List, Button, Form, Input, Typography } from 'antd';
import axios from 'axios';
import moment from 'moment';
import QuestionCommentsWrapper from './QuestionComments.style';
import RenderAuthModal from '../RenderAuthModal';

export default function QuestionComments(props) {
    const { question_id, comments } = props;
    const [showCommentForm, toggleCommentForm] = useState(false);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSigninModal, showSigninModalFunc] = useState(false);

    async function getComments() {
        try {
            const res = await axios.get(`/comments/list/question/${question_id}`);
            const comments = res.data.comments;
            props.onAddComment(question_id, comments);
        } catch (e) {
            console.log(e);
        }
    }

    async function onSubmit() {
        if(!props.user) return showSigninModalFunc(true);

        if (!comment) return;
        setLoading(true);
        try {
            await axios.post(`/comments/question/${question_id}`, { text: comment });
            setComment('');
            getComments();
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }
    return (
        <QuestionCommentsWrapper>
            <List
                // header={<div>Header</div>}
                footer={
                    <div>
                        <a
                            className="custom-anchor"
                            onClick={() => toggleCommentForm(!showCommentForm)}
                        >
                            Add a comment
                        </a>
                        {showCommentForm && (
                            <Form layout="inline" style={{ marginTop: '5px' }} className="comment-form">
                                <Form.Item style={{ flexGrow: 1 }}>
                                    <Input.TextArea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Add a comment"
                                        autoSize
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        className="add-comment-btn"
                                        type="primary"
                                        loading={loading}
                                        // disabled={!comment} 
                                        onClick={onSubmit}
                                    >
                                        Add Comment
                                </Button>
                                </Form.Item>
                            </Form>
                        )}
                    </div>
                }
                bordered
                size="small"
                className="comments"
                dataSource={comments}
                renderItem={comment => (
                    <List.Item key={comment._id}>
                        {comment.text} –
                        <Button type="link">{comment.createdBy.fullName}</Button>
                        <Typography.Text
                            type="secondary"
                            style={{ fontSize: '12px' }}
                        >
                            {moment(comment.createdAt).format('LLL')}
                        </Typography.Text>
                    </List.Item>
                )}
            />
            <RenderAuthModal
                show={showSigninModal}
                onClose={() => showSigninModalFunc(false)}
            />
        </QuestionCommentsWrapper>
    )
}