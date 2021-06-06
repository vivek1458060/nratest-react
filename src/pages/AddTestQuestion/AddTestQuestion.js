import React, { Component } from 'react';
import { Button, Space, Card, Typography, List, Modal, message, Select } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import AddTestQuestionForm from '../../components/AddTestQuestion/AddTestQuestionForm';
import axios from 'axios';
import AddTestQuestionWrapper from './AddTestQuestion.style';

class AddTest extends Component {
  state = {
    test: null,
    questions: [],
    show: false,
    editItem: null,
    section: 'APTITUDE'
  }
  testId = this.props.match.params.testId;
  getTest = async () => {
    try {
      const res = await axios.get(`/test/${this.testId}`);
      this.setState({ test: res.data.test });
    } catch (e) {
      console.log(e);
    }
  }
  getQuestions = async () => {
    try {
      const res = await axios.get(`/test-question/${this.testId}`);
      this.setState({ questions: res.data.testQuestions });
    } catch (e) {
      console.log(e);
    }
  }
  async componentDidMount() {
    this.getTest();
    this.getQuestions();
  }
  onSectionChange = (value) => {
    this.setState({ section: value });
  }
  onSubmitQuestion = async (values) => {
    try {
      if (this.state.editItem) {
        const res = await axios.put(`/test-question/${this.state.editItem._id}`, values);
        this.setState({
          questions: this.state.questions.map((question) => {
            if (question._id === this.state.editItem._id) {
              return res.data.testQuestion
            }
            return question;
          }),
          editItem: null,
        });
        message.success(`Test ${values.title} edited successfully`);
      } else {
        const res = await axios.post("/test-question", { ...values, testId: this.testId, section: this.state.section });
        this.setState({
          questions: [...this.state.questions, res.data.testQuestion]
        });
        message.success(`Test ${values.title} created successfully`);
      }
      this.setState({ show: false });
    } catch (e) {
      message.error("Something went wrong!");
      console.log(e);
    }
  }
  handleDelete = (id) => {

  }
  onEdit = (id) => {
    this.setState({
      show: true,
      editItem: this.state.questions.filter(({ _id }) => _id === id)[0]
    });
  }
  onDelete = (item) => {
    Modal.confirm({
      title: 'Do you want to delete this Question?',
      icon: <ExclamationCircleOutlined />,
      content: item.question,
      onOk: async () => {
        try {
          await axios.delete(`/test-question/${item._id}`);
          this.setState({
            questions: this.state.questions.filter(({ _id }) => _id !== item._id)
          });
          message.success(`Question ${item.question} deleted successfully`);
        } catch (e) {
          console.log(e);
        }
      },
      onCancel() { },
    });
  }
  onCancel = () => this.setState({ show: false, editItem: null })
  onShow = () => this.setState({ show: true })
  render() {
    return (
      <AddTestQuestionWrapper>
        <h1 style={{ textAlign: 'center' }}>
          Test: {this.state.test?.title}
        </h1>
        <div style={{ display: 'flex', margin: '20px 0px' }}>
          <Select
            options={[
              { label: 'REASONING', value: 'REASONING' },
              { label: 'APTITUDE', value: 'APTITUDE' },
              { label: 'GS', value: 'GS' },
              { label: 'ENGLISH', value: 'ENGLISH' },
            ]}
            value={this.state.section}
            onChange={this.onSectionChange}
            style={{ width: '200px', marginRight: '10px' }}
            placeholder="Select section"
          />
          <Button type="primary" onClick={this.onShow}>Add Question</Button>
        </div>
        <List
          className="demo-loadmore-list"
          bordered="true"
          // loading={initLoading}
          itemLayout="vertical"
          // loadMore={loadMore}
          dataSource={this.state.questions.filter(({ section }) => section === this.state.section)}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <a onClick={(e) => {
                  e.preventDefault();
                  this.onEdit(item._id)
                }}>Edit</a>,
                <a onClick={(e) => {
                  e.preventDefault();
                  this.onDelete(item)
                }}>Delete</a>
              ]
              }
            >
              {/* <Skeleton avatar title={false} loading={item.loading} active> */}
              <List.Item.Meta
                title={<Typography.Paragraph strong>{index + 1}. <span dangerouslySetInnerHTML={{ __html: item.question }}></span></Typography.Paragraph>}
              />
              <div>
                <Space direction="vertical">
                  {
                    item.options.map((option, i) => (
                      <div key={i}>
                        <Space>
                          <span>({i + 1})</span>
                          <span dangerouslySetInnerHTML={{ __html: option }}></span>
                          <span>{item.correctOption === i + 1 && <CheckCircleOutlined style={{ color: 'green' }} />}</span>
                        </Space>
                      </div>
                    ))
                  }
                </Space>
              </div>
              {/* </Skeleton> */}
            </List.Item>
          )}
        >
        </List>
        <Modal
          title={`${this.state.editItem ? 'Edit' : 'Add'} Question`}
          visible={this.state.show}
          closable={false}
          footer={<></>}
          width={650}
        >
          <AddTestQuestionForm
            values={this.state.editItem}
            onSubmitQuestion={this.onSubmitQuestion}
            onCancel={this.onCancel}
          />
        </Modal>
      </AddTestQuestionWrapper>
    );
  }
}

export default AddTest;