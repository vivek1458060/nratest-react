import React, { Component } from 'react';
import { Button, Form, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { history } from '../../App';
import RenderAuthModal from '../RenderAuthModal';

const normFile = (e) => {
    if (Array.isArray(e)) return e;

    return e && e.fileList;
};

class AnswerForm extends Component {
    formRef = React.createRef();
    state = {
        loading: false,
    }
    componentDidMount() {
        if (this.props.answer) {
            this.formRef.current.setFieldsValue({
                text: this.props.answer.text,
                videoUrl: this.props.answer.videoUrl,
                image: this.props.answer.imageUrl ? [{
                    uid: this.props.answer.imageUrl,
                    name: this.props.answer.imageUrl,
                    url: this.props.answer.imageUrl
                }] : null
            });
        }
    }
    onSubmit = async (values) => {
        if(!this.props.user) return this.showLoginModal();

        const { text, videoUrl, image } = values;
        if (!text && !videoUrl && (!image || image.length === 0)) {
            return message.error("Any one field is required");
        }
        this.setState({ loading: true })
        try {
            const formData = new FormData();
            if (image && image.length > 0) formData.append('image', values.image[0].url || values.image[0].originFileObj);
            if (text) formData.append('text', text);
            if (videoUrl) formData.append('videoUrl', videoUrl);

            if (this.props.answer) {
                await axios.put('/answers/' + this.props.answer._id, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                message.success("Your answer updated successfully");
                history.push(`/${this.props.answer.questionId}/solutions`);
            } else {
                await axios.post('/answers/' + this.props.question_id, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                this.formRef.current.resetFields();
                this.props.onAddAnswer()
                message.success("Your answer added successfully");
            }
        } catch (e) {
            message.error("Something went wrong!");
            console.log(e);
        }
        this.setState({ loading: false })
    }
    showLoginModal = () => this.setState({ showSigninModal: true });
    render() {
        return (
            <Form layout="vertical" ref={this.formRef} onFinish={this.onSubmit}>
                <Form.Item label="Answer Text" name="text">
                    <Input.TextArea placeholder="Type your quesetion here..." autoSize={{ minRows: 4 }} />
                </Form.Item>
                <Form.Item label="Video URL" name="videoUrl">
                    <Input placeholder="Post video url" />
                </Form.Item>
                <Form.Item
                    label="Upload Image"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        beforeUpload={() => false}
                        accept="image/png,image/jpeg,image/jpg"
                        listType="picture"
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button
                        loading={this.state.loading}
                        type="primary"
                        htmlType="submit"
                    >
                        {this.props.answer ? 'Edit Answer' : 'Post Answer'}
                    </Button>
                </Form.Item>
                <RenderAuthModal 
                    show={this.state.showSigninModal}
                    onClose={() => this.setState({ showSigninModal: false })}
                />
            </Form>
        );
    }
}

export default AnswerForm;