import axios from 'axios';
import React, { Component } from 'react';

class Zoom extends Component {
    state = {
        joinUrl: undefined
    }
    joinMeeting = async () => {
        const meetingConfig = {
            mn: 8371743121,
            name: 'Vivek kumar',
            pwd: 'dHVtUXM1MGplWEZnNFc3bTVSclhPdz09',
            role: 1,
            email: 'vivek1458060@gmail.com',
            lang: 'en-US',
            china: 0,
            apiKey: 'uhuFIaHKTNSQJo8NEw1_ug',
        };

        try {
            const res = await axios.get(`/zoom/signature?meetingNumber=${meetingConfig.mn}&role=${meetingConfig.role}`);
            meetingConfig.signature = res.data.signature;
            let joinUrl =
                window.testTool.getCurrentDomain() +
                "/meeting.html?" +
                window.testTool.serialize(meetingConfig);
            this.setState({ joinUrl });
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <div>
                <button onClick={this.joinMeeting}>Join Meeting</button>
                {this.state.joinUrl && (
                    <iframe
                        id="zoom-iframe"
                        src={this.state.joinUrl}
                        width="100%"
                        height="583px"
                        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                        allow="microphone; camera; fullscreen;"
                    ></iframe>
                )}
            </div>
        );
    }
}

export default Zoom;