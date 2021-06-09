import React, { Component } from 'react';
import { Typography, Card } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';

import EditAnswerWrapper from './EditAnswer.style';
import AnswerForm from '../../components/AnswerForm/AnswerForm';
import SEO from '../../components/SEO';

class EditAnswer extends Component {
    state = {}
    answer_id = this.props.match.params.answer_id;
    async componentDidMount() {
        try {
            const res = await axios.get(`/answers/${this.answer_id}`);
            this.setState({ answer: res.data.answer });
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <EditAnswerWrapper>
                <SEO title="Edit Answer" meta={[{ property: 'robots', content: 'noindex' }]} />
                <Typography.Title level={3} style={{ fontWeight: 300, marginBottom: '25px' }} className="title">Edit Answer</Typography.Title>
                {this.state.answer && <AnswerForm user={this.props.user} answer={this.state.answer} />}
            </EditAnswerWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(EditAnswer);