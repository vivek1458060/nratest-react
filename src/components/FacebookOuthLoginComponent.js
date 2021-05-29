import React, { useState } from 'react';
import { Button, Space, message } from 'antd';
import { FacebookProvider, Login } from 'react-facebook';

export default function FacebookOuthLoginComponent(props) {
    const responseSuccess = (response) => {
        props.handleLogin({ access_token: response.tokenDetail.accessToken, mood: "facebook" });
    };
    const responseFailure = (response) => {
        console.log(response);
    };
    return (
        <FacebookProvider appId="903435296868459">
            <Login
                onCompleted={responseSuccess}
                onError={responseFailure}
            >
                {({ loading, handleClick, error, data }) => (
                    <Button
                        onClick={handleClick}
                        block
                        shape="round"
                        size="large"
                        style={{ borderColor: '#1890ff' }}
                    >
                        <Space>
                            <img src="/facebook.svg" alt="" width={28} height={28} /> Sign in with Facebook
                        </Space>
                    </Button>
                )}
            </Login>
        </FacebookProvider>
    )
}