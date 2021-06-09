import React, { Component } from 'react';
import { Typography, Card, Upload, Button, message, Form, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import axios from 'axios';

import AddQuestionWrapper from './AddQuestion.style'
import RenderAuthModal from '../../components/RenderAuthModal';
import SEO from '../../components/SEO';

const normFile = (e) => {
    if (Array.isArray(e)) return e;

    return e && e.fileList;
};

class AddQuestion extends Component {
    formRef = React.createRef();
    state = {
        loading: false,
        showSigninModal: false
    }
    question_id = this.props.match.params.question_id;
    getQuestion = async () => {
        try {
            const res = await axios.get("/questions/" + this.question_id);
            const question = res.data.question;
            this.setState({ question });
            this.formRef.current.setFieldsValue({
                text: question.text,
                image: question.imageUrl ? [{
                    uid: question.imageUrl,
                    name: question.imageUrl,
                    url: question.imageUrl
                }] : null
            });
        } catch (e) {
            console.log(e);
        }
    }
    componentDidMount() {
        if (this.question_id) {
            this.getQuestion();
        }
    }
    onFinish = async (values) => {
        try {
            if (!this.props.user) {
                return this.setState({ showSigninModal: true });
            }

            const { text, image } = values;
            if (!text && (!image || image.length === 0)) {
                return message.error("Any one field is required");
            }
            this.setState({ loading: true })
            const formData = new FormData();
            if (image && image.length > 0) formData.append('image', values.image[0].url || values.image[0].originFileObj);
            if (text) formData.append('text', text);
            if (this.question_id) {
                await axios.put('/questions/' + this.question_id, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                message.success("Your question updated successfully");
            } else {
                await axios.post('/questions', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                message.success("Your question added successfully");
            }
            this.props.history.push("/question/list");
        } catch (e) {
            message.error("Something went wrong!");
            console.log(e);
        }
        this.setState({ loading: false })
    }
    render() {
        return (
            <AddQuestionWrapper>
                <SEO title="Ask a Question" />
                <Typography.Title level={3} className="title" style={{ fontWeight: 300, marginBottom: '25px' }}>
                    {this.question_id ? 'Update Question' : 'Ask a public question'}
                </Typography.Title>
                <Form layout="vertical" ref={this.formRef} onFinish={this.onFinish}>
                    <Form.Item label="Question Text" name="text">
                        <Input.TextArea placeholder="Type your quesetion here..." autoSize={{ minRows: 4 }} />
                    </Form.Item>
                    <Form.Item
                        label="Upload Image"
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload beforeUpload={() => false} listType="picture" accept="image/png,image/jpeg,image/jpg" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            loading={this.state.loading}
                            type="primary"
                            htmlType="submit"
                        >
                            {this.question_id ? 'Update Question' : 'Add Question'}
                        </Button>
                        <RenderAuthModal
                            show={this.state.showSigninModal}
                            onClose={() => this.setState({ showSigninModal: false })}
                        />
                    </Form.Item>
                </Form>
            </AddQuestionWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(AddQuestion);