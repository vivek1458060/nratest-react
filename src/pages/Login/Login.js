import React, { Component } from "react";
import { connect } from 'react-redux';
import { Form, Input, Button, Card, Typography, message, Divider } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import LoginWrapper from "./Login.style";
import axios from 'axios';
import OuthLoginComponent from "../../components/OuthLoginComponent";

class Login extends Component {
    state = {
        loading: false
    };
    isParentModal = this.props.parent === 'modal';
    handleLogin = async (data) => {
        try {
            const res = await axios.post("/users/login", data);
            const user = res.data;
            localStorage.setItem("user", JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = user.token;
            this.props.login(user);
            message.success("Logged In");
            if(this.isParentModal) {
                this.props.closeParentModal();
            } else {
                this.props.history.push("/question/list");
            }
        } catch(e) {
            if(e.response?.status == 400) {
                message.error("Email or password is invalid")
            } else {
                message.error("Something went wrong")
            }
            console.log(e);
        }
    };

    onFinish = async (values) => {
        this.setState({ loading: true });
        try {
            await this.handleLogin({ email: values.email, password: values.password });
        } catch(e) {
            console.log(e);
        }
        this.setState({ loading: false });
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    render() {
        return (
            <LoginWrapper style={{minHeight: this.isParentModal ? 'unset' : '100vh', maxWidth: '450px'}}>
                <Card className="container" bordered={this.isParentModal ? false : true}>
                    {!this.isParentModal && <div className="image-container">
                        <img src="/cover.png" alt="logo" />
                    </div>}
                    <Typography.Title level={4} style={{ textAlign: 'center', fontWeight: 300 }}>Sign In</Typography.Title>
                    <Typography.Text style={{ display: 'block', textAlign: 'center', marginBottom: '15px' }}>Fill in the fields below to sign into your account.</Typography.Text>
                    <Form
                        size="large"
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input prefix={<MailOutlined />} />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{}}
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: '10px' }}>
                            <Button type="primary" htmlType="submit" block loading={this.state.loading}>
                                Submit
                            </Button>
                            Don't have an account? { this.isParentModal ? (
                                <Link onClick={() => this.props.onAuthTypeChange('signup')}>Sign Up</Link>
                            ): (
                                <Link to="/signup">Sign Up</Link>
                            ) }
                        </Form.Item>
                    </Form>
                    <Divider>OR</Divider>
                    <OuthLoginComponent handleLogin={this.handleLogin} />
                </Card>
            </LoginWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch({ type: 'LOGIN', user })
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);