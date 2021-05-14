import React, { Component } from "react";
import { Form, Input, Button, Card, Typography, message, Divider, } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SignupWrapper from "./Signup.style";
import axios from 'axios';
import { connect } from 'react-redux';
import OuthLoginComponent from "../../components/OuthLoginComponent";

class Signup extends Component {
    state = {
        loading: false,
    }
    isParentModal = this.props.parent === 'modal';
    handleSignup = async (data) => {
        try {
            const url = data.mood ? "/users/login" : "/users";
            const res = await axios.post(url, data);
            const user = res.data;
            localStorage.setItem("user", JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = user.token;
            this.props.login(user);
            message.success(data.mood ? "Logged In" : "Signed Up");
            if(this.isParentModal) {
                this.props.closeParentModal();
            } else {
                this.props.history.push("/question/list");
            }
        } catch(e) {
            if(e.response?.status === 409) {
                message.error("Email Id already exists");
            } else {
                message.error("Something went wrong!!")
            }
            console.log(e);
        }
    };

    onFinish = async (values) => {
        this.setState({ loading: true });
        try {
            await this.handleSignup({ 
                fullName: values.fullName, 
                email: values.email, 
                password: values.password 
            });
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
            <SignupWrapper style={{minHeight: this.isParentModal ? 'unset' : '100vh', maxWidth: '450px'}}>
                <Card className="container" bordered={this.isParentModal ? false : true}>
                    {!this.isParentModal && <div className="image-container">
                        <img src="/cover.png" alt="logo" />
                    </div>}
                    <Typography.Title level={4} style={{ textAlign: 'center', fontWeight: 300 }}>Sign Up</Typography.Title>
                    <Typography.Text style={{ display: 'block', textAlign: 'center', marginBottom: '15px' }}>Fill in the fields below to create your account.</Typography.Text>
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
                            label="Full name"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your full name!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter you name" prefix={<UserOutlined />} />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input prefix={<MailOutlined />} />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
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

                        <Form.Item style={{ marginBottom: '10px' }} loading={this.state.loading}>
                            <Button type="primary" htmlType="submit" block>
                                Submit
                            </Button>
                            Already have an account  { this.isParentModal ? (
                                <Link onClick={() => this.props.onAuthTypeChange('login')}>Login</Link>
                            ): (
                                <Link to="/login">Login</Link>
                            ) }
                        </Form.Item>
                    </Form>
                    <Divider>OR</Divider>
                    <OuthLoginComponent handleLogin={this.handleSignup} />
                </Card>
            </SignupWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch({ type: 'LOGIN', user, })
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);