import React, { useState } from 'react';
import { GoogleLogin } from "react-google-login";
import { Button, Space } from 'antd';

export default function OuthLoginComponent(props) {
    const [isCookie, setCookie] = useState(true);
    const responseGoogleSuccess = (response) => {
        console.log(response);
        props.handleLogin({ access_token: response.accessToken, mood: "google" });
    };
    const responseGoogleFailure = (response) => {
        console.log(response);
        if (response.error === "idpiframe_initialization_failed") {
            setCookie(false);
        }
    };
    return (
        <GoogleLogin
            clientId="66446078788-4vebq2hjpuc5ugim3ufv076hs46pf1n3.apps.googleusercontent.com"
            render={(renderProps) => (
                <Button
                    onClick={renderProps.onClick}
                    className="google-btn"
                    block
                    shape="round"
                    style={{borderColor: '#1890ff'}}
                >
                    <Space>
                        <img src="/google.svg"/> Sign in with Google
                    </Space>
                </Button>
            )}
            buttonText="Login"
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFailure}
            cookiePolicy={"single_host_origin"}
            uxMode={isCookie ? "popup" : "redirect"}
            isSignedIn={!isCookie}
            responseType="token"
            redirectUri="http://nratest.com/question/list"
        />
    )
}